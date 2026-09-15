import Accommodation from "../models/Accommodation.js";

export class AccommodationController {
  static async getAll(req, res, next) {
    try {
      const { locationSlug } = req.query;
      const filter = locationSlug && locationSlug !== "all"
        ? { locationSlug }
        : {};
      const listings = await Accommodation.find(filter).sort({ createdAt: -1 });
      res.status(200).json(listings);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const listing = await Accommodation.findById(req.params.id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      res.status(200).json(listing);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const listing = new Accommodation(req.body);
      await listing.save();
      res.status(201).json(listing);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const listing = await Accommodation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      res.status(200).json(listing);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const listing = await Accommodation.findByIdAndDelete(req.params.id);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }
      res.status(200).json({ message: "Listing deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}
