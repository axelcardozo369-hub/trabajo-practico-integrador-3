import { model, Schema } from "mongoose";

const eventSchema = new Schema({});

export const EventModel = model("Event", eventSchema);
