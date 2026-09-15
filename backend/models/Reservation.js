import { model, Schema } from "mongoose";

const reservationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    accommodationId: {
      type: Schema.Types.ObjectId,
      ref: "Accommodation",
      required: true,
    },
    listingTitle: { type: String, required: true },
    location: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    nights: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model("Reservation", reservationSchema);
