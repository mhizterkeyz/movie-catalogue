const { Schema, model } = require("mongoose");

const MoviesSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "mhizterkeyz-list",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("mhizterkeyz-movie", MoviesSchema);
