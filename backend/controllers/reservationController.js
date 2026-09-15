import Reservation from "../models/Reservation.js";
import Accommodation from "../models/Accommodation.js";

export class ReservationController {
  static async create(req, res, next) {
    try {
      const {
        accommodationId,
        checkIn,
        checkOut,
        adults,
        children,
      } = req.body;

      const listing = await Accommodation.findById(accommodationId);
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.max(
        1,
        Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
      );

      const subtotal = listing.price * nights;
      const weeklyDiscountAmount = listing.weeklyDiscount || 0;
      const total =
        subtotal -
        weeklyDiscountAmount +
        listing.cleaningFee +
        listing.serviceFee +
        listing.occupancyTaxes;

      const reservation = new Reservation({
        userId: req.user.id,
        userName: req.user.username,
        accommodationId,
        listingTitle: listing.title,
        location: listing.location,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        adults: adults || 1,
        children: children || 0,
        nights,
        total,
      });

      await reservation.save();
      res.status(201).json(reservation);
    } catch (err) {
      next(err);
    }
  }

  static async getByUser(req, res, next) {
    try {
      const reservations = await Reservation.find({ userId: req.user.id }).sort({
        createdAt: -1,
      });
      res.status(200).json(reservations);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      const reservations = await Reservation.find()
        .populate("accommodationId", "title location")
        .sort({ createdAt: -1 });
      res.status(200).json(reservations);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const reservation = await Reservation.findByIdAndDelete(req.params.id);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}
