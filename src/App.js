import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";

import { dashboardData } from "./data/dashboard";

import PrivateRoute from "./components/PrivateRoute";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");

    const scrollToSection = () => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    setTimeout(scrollToSection, 0);
  }, [location]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToHash />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <PrivateRoute>
              <Dashboard />
              </PrivateRoute>
              <Footer />
            </>
          }
        />

        <Route
        path="/privacy"
        element={
          <>
            <Navbar />
            <Privacy />
            <Footer />
          </>
        }
      />

      <Route
        path="/cookies"
        element={
          <>
            <Navbar />
            <Cookies />
            <Footer />
          </>
        }
      />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;