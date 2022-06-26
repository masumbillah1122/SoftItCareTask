const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        default: null,
      },
    ],
    isActive: {
      type: Boolean,
      trim: true,
      default: true,
      enum: [true, false],
    },
    indexId: {
      type: Number,
      trim: true,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);
module.exports = Category;