import { model, Schema } from "mongoose";

const categorySchema = new Schema();
export const CategoryModel = model("Category", categorySchema);
