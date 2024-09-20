import express, { json, response } from "express";
import axios from "axios";
import e from "express";
import cors from 'cors'

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions))

app.use(express.json())
const port = process.env.PORT || 5000;
const apiKey = '272013ce8e3a006ee0055e8120e3d22f';

app.use((err, req, res, next) => {
  return res.json({ errorMessage: err.message });
});

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.get("/api", (req, res) => {
  res.json({ "tests": ['test1', 'test2', 'test3'] });
})


let titles = [];
// loop through the results and display the title, poster_path, release_date and vote_average
function quickSearch(arr) {
  titles = [];
  arr.forEach((el, inx) => {
    titles.push({
      id: el.id,
      title: el.title,
      poster_path: el.poster_path,
      release_date: el.release_date.split("-")[0],
      vote_average: el.vote_average,
    });
  });
}

app.get("/search", (req, res) => {
  // search movie
  // 'https://api.themoviedb.org/3/search/movie?query=' + res.data +'&api_key=API_KEY'
  // if movie has more than 1 search result:
  // loop through the results and display the title, poster_path, release_date and vote_average
  const inputUser = req.url.split("=")[1];
  const test = { name: 'test' }
  // console.log(res);
  // Movie Details with id given from above query
  // 'https://api.themoviedb.org/3/movie/' + id + '?api_key=API_KEY'
  // WHAT STILL NEEDS TO BE DONE: add page counter with url &page=PAGENUMER
  async function searchReq() {
    const inputUser = req.params.search

    try {
      const result = await axios.get(
        "https://api.themoviedb.org/3/search/movie?query=" +
        inputUser +
        "&api_key=" + apiKey
      )
      if (result.data.results.length > 1) {
        quickSearch(result.data.results);
      } else {
        // res.send(result.data.results);
      }
      result.send(titles);
    } catch (e) {
      console.log(e);

    }

  }
  searchReq()

});

// get singlemovie and send as response
// send another axios get request for the movie cast and send only the cast
app.get("/singleMovie", (req, res) => {
  let movieData = { movieDetails: "", cast: "" };
  const singleMovieId = req.url.split("=")[1];
  axios
    .get(
      "https://api.themoviedb.org/3/movie/" +
      singleMovieId +
      "?api_key=" + apiKey
    )
    .then((movieDetails) => {
      movieData.movieDetails = movieDetails.data;
    })
    .finally(() => {
      axios
        .get(
          "http://api.themoviedb.org/3/movie/" +
          singleMovieId +
          "/casts?api_key=" + apiKey
        )
        .then((castRes) => {
          // this works
          movieData.cast = castRes.data.cast;
          // console.log(movieData);
          res.send(movieData);
        });
    });
});

// request to load the populair movies that day
app.get("/loadPopulair", (req, res) => {
  axios.get("https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=" + apiKey)
    .then((popRes) => {
      // console.log(popRes.data);
      res.send(popRes.data)
    }).catch((err) => {
      console.log(err);
    })
});
// http://api.themoviedb.org/3/movie/14160/casts?api_key=f620c5baed1b777b7b50d6677ef5d5a1

app.get("/getPopulairAll", (req, res) => {
  axios.get("https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=" + apiKey)
    .then((popAllRes) => {
      res.send(popRes.data)
    }).catch((err) => {
      console.log(err)
    })
})

const options = {
  method: 'GET',
  // url: 'https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=' + apiKey,
  url: 'http://localhost:5000/search',
  // headers: {
  //   accept: 'application/json',
  //   // Authorization: 'Bearer '
  // }
};

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
