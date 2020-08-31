const {
  createSingleList,
  getAllLists,
  getSingleList,
  addToList,
  removeFromList,
  getSingleMovieFromList,
} = require("../services/ListService");
const { rateMovie } = require("./movies.controller");

const createList = () => async (req, res, next) => {
  try {
    const data = await createSingleList({
      user: req.user._id,
      ...req.body,
    });
    return res.status(200).json({
      status: 200,
      message: "list created",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getLists = () => async (req, res, next) => {
  try {
    const data = await getAllLists({ user: req.user._id });
    return res.status(200).json({
      status: 200,
      message: "your lists",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getList = () => async (req, res, next) => {
  try {
    const { list_id: _id } = req.params;
    const data = await getSingleList({ user: req.user._id, _id });
    res.status(200).json({
      status: 200,
      message: "your list",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const addSingleMovie = () => async (req, res, next) => {
  try {
    const { list_id: list } = req.params;
    const data = await addToList({ _id: list }, { list, ...req.body });
    res.status(200).json({
      status: 200,
      message: "movie added successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
const removeSingleMovie = () => async (req, res, next) => {
  try {
    const { list_id, movie_id } = req.params;
    await removeFromList({ list_id, movie_id, user_id: req.user._id });
    return res.status(200).json({
      status: 200,
      message: "movie removed from list",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
const rateSingleMovie = () => async (req, res, next) => {
  try {
    const { list_id, movie_id } = req.params;
    await getSingleMovieFromList({ list_id, movie_id, user_id: req.user._id });
    return rateMovie()(req, res, next);
  } catch (error) {
    next(error);
  }
};
const singleMovie = () => async (req, res, next) => {
  try {
    const { list_id, movie_id } = req.params;
    const data = await getSingleMovieFromList({
      list_id,
      movie_id,
      user_id: req.user._id,
    });
    res.status(200).json({
      status: 200,
      message: "your movie",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createList,
  getLists,
  getList,
  addSingleMovie,
  removeSingleMovie,
  rateSingleMovie,
  singleMovie,
};
