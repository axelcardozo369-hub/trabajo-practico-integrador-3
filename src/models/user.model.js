import { model, Schema, Types } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      //formato valido(express-validator)
    },
    password: {
      type: String,
      required: true,
      //hash con bcrypt
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      firstName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
      },
      lastName: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
      },
      birthDate: {
        type: Date,
      },
      phone: {
        type: String,
      },
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
userSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "organizer",
});

export const UserModel = model("User", userSchema);
