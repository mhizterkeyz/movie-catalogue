const { Router } = require("express");
const { getMovies, rateMovie } = require("../../controllers/movies.controller");
const {
  validateRatingData,
  listCreationValidation,
  validateMovieAdditionData,
} = require("../../validation/movie.validation");
const { jwt } = require("../../utils/jwt");
const {
  createList,
  getLists,
  getList,
  addSingleMovie,
  removeSingleMovie,
  singleMovie,
  rateSingleMovie,
} = require("../../controllers/list.controller");

const router = Router();

//  Protect routes
router.use(jwt());

router.get("/", getMovies());

router
  .route("/lists")
  .get(getLists())
  .post(listCreationValidation(), createList());
router
  .route("/lists/:list_id")
  .get(getList())
  .post(validateMovieAdditionData(), addSingleMovie());
router
  .route("/lists/:list_id/:movie_id")
  .get(singleMovie())
  .post(validateRatingData(), rateSingleMovie())
  .delete(removeSingleMovie());

module.exports = router;
