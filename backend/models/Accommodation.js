import { model, Schema } from "mongoose";

const accommodationSchema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    locationSlug: { type: String, required: true },
    type: { type: String, required: true },
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    amenities: [{ type: String }],
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    price: { type: Number, required: true },
    host: { type: String, required: true },
    hostId: { type: Schema.Types.ObjectId, ref: "User" },
    images: [{ type: String }],
    weeklyDiscount: { type: Number, default: 0 },
    cleaningFee: { type: Number, default: 50 },
    serviceFee: { type: Number, default: 50 },
    occupancyTaxes: { type: Number, default: 30 },
    enhancedCleaning: { type: Boolean, default: true },
    selfCheckIn: { type: Boolean, default: true },
    description: { type: String, required: true },
    specificRatings: {
      cleanliness: { type: Number, default: 4.8 },
      communication: { type: Number, default: 4.7 },
      checkIn: { type: Number, default: 4.9 },
      accuracy: { type: Number, default: 4.6 },
      location: { type: Number, default: 4.9 },
      value: { type: Number, default: 4.5 },
    },
    bedroomImage: { type: String },
    bedroomDescription: { type: String, default: "Spacious bedroom with comfortable bed." },
    userReviews: [
      {
        name: String,
        date: String,
        comment: String,
        avatar: String,
      },
    ],
  },
  { timestamps: true }
);

export default model("Accommodation", accommodationSchema);
