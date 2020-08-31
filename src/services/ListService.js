const MovieList = require("../models/MovieList");
const Movies = require("../models/Movies");
const { default: Axios } = require("axios");
const { notFoundError, badRequestError } = require("../utils/errorhandler");
const { parallelRequests } = require("../utils");

const createSingleList = (data) => MovieList.create(data);
const getAllLists = (param) => MovieList.find(param);
const getSingleList = async (param) => {
  const list = await MovieList.findOne(param);
  if (!list) {
    throw notFoundError("Could not find list with that ID");
  }
  let items = await Movies.find({ list: list._id });
  items = await Promise.all(
    items.map((item) => {
      return (async () => {
        try {
          const req = await Axios.get(
            `https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.TMDBAPIKey}&language=en-US`
          );
          return req.data;
        } catch (error) {
          return null;
        }
      })();
    })
  );
  items = items.filter((elem) => elem !== null);
  return { ...list.toObject(), items };
};
const addToList = async (param, data) => {
  try {
    const [list, check] = await parallelRequests(
      () => MovieList.findOne(param),
      () => Movies.findOne(data),
      () => {
        return Axios.get(
          `https://api.themoviedb.org/3/movie/${data.id}?api_key=${process.env.TMDBAPIKey}&language=en-US`
        );
      }
    );
    if (check) {
      throw badRequestError("Movie already exists in list");
    }
    if (!list) {
      throw notFoundError("Could not find list with that ID");
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw notFoundError("no movie with that id");
    }
    throw error;
  }
  let movie = await Movies.create(data);
  movie = movie.toObject();
  delete movie._id;
  return movie;
};
const removeFromList = async (param) => {
  const [list, movie] = await parallelRequests(
    () => {
      return MovieList.findOne({
        user: param.user_id,
        _id: param.list_id,
      });
    },
    () => {
      return Movies.findOne({
        id: param.movie_id,
        list: param.list_id,
      });
    }
  );
  if (!list) {
    throw notFoundError("Could not find list with that ID");
  }
  if (!movie) {
    throw notFoundError("Could not find movie with that id on your list");
  }
  await movie.remove();
  return null;
};
const getSingleMovieFromList = async (param) => {
  const [list, movie] = await parallelRequests(
    () => {
      return MovieList.findOne({
        user: param.user_id,
        _id: param.list_id,
      });
    },
    () => {
      return Movies.findOne({
        id: param.movie_id,
        list: param.list_id,
      });
    }
  );
  if (!list) {
    throw notFoundError("Could not find list with that ID");
  }
  if (!movie) {
    throw notFoundError("Could not find movie with that id on your list");
  }
  const req = await Axios.get(
    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.TMDBAPIKey}&language=en-US`
  );
  return req.data;
};

module.exports = {
  createSingleList,
  getAllLists,
  getSingleList,
  addToList,
  removeFromList,
  getSingleMovieFromList,
};
