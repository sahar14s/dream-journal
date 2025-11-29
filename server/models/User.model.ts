import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface Iuser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<Iuser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};
export const UserModel = mongoose.model<Iuser>("User", userSchema);
