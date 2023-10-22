import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  email: { type: String },
  avatarUrl: String,
  username: { type: String },
  password: { type: String },
  profileImage: String,
  name: { type: String, required: true },
  socialOnly: { type: Boolean, default: false },
  location: String,
  videos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
})

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5)
})

export const 몽구스유저모델링 = mongoose.model("User", userSchema)
