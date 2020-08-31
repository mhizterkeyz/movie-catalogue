const { default: Axios } = require("axios");
const { notFoundError } = require("../utils/errorhandler");

const getMovies = () => async (req, res, next) => {
  const { page = 1 } = req.query;

  let externalReq = ((page) => {
    const res = [];
    for (let i = page; i < (parseInt(page, 10) || 1) + 10; i++) {
      res.push(i);
    }
    return res;
  })((parseInt(page, 10) || 1) * 10 - 9);
  try {
    externalReq = await Promise.all(
      externalReq.map((p) => {
        return (async () => {
          try {
            return await Axios.get(
              `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDBAPIKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${p}`
            );
          } catch (error) {
            (async () => {
              //  Log the error much later so we don't block anything important.
              setTimeout(console.log, 3000, error);
            })();
            return {
              data: {
                page: 0,
                results: [],
                total_pages: 0,
                total_results: 0,
              },
            };
          }
        })();
      })
    );
    const data = externalReq.reduce(
      (acc, cur) => {
        acc.results = [...acc.results, ...cur.data.results];
        return acc;
      },
      { page, results: [] }
    );
    return res.status(200).json({
      status: 200,
      message: "Movie list",
      data,
    });
  } catch (error) {
    next(error);
  }
};
const rateMovie = () => async (req, res, next) => {
  const { movie_id } = req.params;
  try {
    if (!req.user.guest_session_id) {
      const request = await Axios.get(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.TMDBAPIKey}`
      );
      const session_id = request.data.guest_session_id;
      req.user.guest_session_id = session_id;
      await req.user.save();
    }
    await Axios.post(
      `https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=${process.env.TMDBAPIKey}&guest_session_id=${req.user.guest_session_id}`,
      {
        value: req.body.value,
      }
    );
    res.status(200).json({
      status: 200,
      message: "success",
      data: req.body.value,
    });
  } catch (error) {
    if (error.response.status === 404) {
      return next(notFoundError("no movie with that ID"));
    }
    next(error);
  }
};

module.exports = {
  getMovies,
  rateMovie,
};
