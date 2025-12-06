import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import AddDream from "./pages/AddDream.tsx";
import Statistics from "./pages/Statistics.tsx";

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      {location.pathname !== "/login" && <Footer />}

      <Routes>
        {/* עמוד ההתחברות היחיד שלא מוגן */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* כל שאר הנתיבים במערכת מוגנים ודורשים token */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddDream />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
