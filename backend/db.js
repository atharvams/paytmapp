import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/paytm");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowecase: true,
    minlength: 3,
    maxlength: 30,
  },

  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  firstname: {
    type: String,
    required: true,
    minlength: 4,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 4,
  },
});

const accountSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: {
    type: Number,
    required: true,
  },
});

export const user = mongoose.model("User", userSchema);
export const account = mongoose.model("Account", accountSchema);
