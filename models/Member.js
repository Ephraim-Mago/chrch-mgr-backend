import mongoose from "mongoose";

const memberSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    church_apt: {
      type: String,
      default: "Aucune",
    },
    notice: {
      type: String,
      required: true,
      default: "NF",
    },
    workers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Worker",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Member", memberSchema);
