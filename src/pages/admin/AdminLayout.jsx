import { Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

const AdminLayout = () => {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />

      <main className="container-fluid px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
