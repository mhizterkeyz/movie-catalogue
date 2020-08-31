/**
 * This is so we can use the list feature without a session_id
 * on the movie db org
 */

const { Schema, model } = require("mongoose");

const MovieListSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "mhizterkeyz-user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("mhizterkeyz-list", MovieListSchema);
