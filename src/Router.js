import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Locations from "./pages/Locations";
import ListingDetails from "./pages/ListingDetails";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";

import AdminListings from "./pages/admin/AdminListings";
import ListingForm from "./pages/admin/ListingForm";
import AdminBookings from "./pages/admin/AdminBookings";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/locations/:locationSlug" element={<Locations />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <Reservations />
            </ProtectedRoute>
          }
        />

        {/* Admin routes - admin only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminListings />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="listings/create" element={<ListingForm />} />
          <Route path="listings/:id/edit" element={<ListingForm />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
