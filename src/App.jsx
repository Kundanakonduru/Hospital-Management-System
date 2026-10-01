import React, { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Patients from "./Patients";
import Doctors from "./Doctors";
import Home from "./Home";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import SingleDoctor from "./SingleDoctor";
import SinglePatient from "./SinglePatient";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

export const HelloContext = createContext();

function App() {
  const HospitalDetails = {
    hospitalname: "Medicare Hospitals",
    CEO: "Alpha",
    Cofounder: "Beta",
    Location: "Bng"
  };

  return (
    <HelloContext.Provider value={HospitalDetails}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          />

          {/* Single doctor and patient */}
          <Route path="/doctors/:id" element={<SingleDoctor />} />
          <Route path="/patients/:id" element={<SinglePatient />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelloContext.Provider>
  );
}

export default App;