import { useState } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/use-auth";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export const Layout = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <div>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:pl-64 flex flex-col flex-1">
        <Navbar onOpen={() => setSidebarOpen(true)} />

        <Outlet />
      </div>
    </div>
  );
};
