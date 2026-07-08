import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import NgoDashboard from "./pages/NgoDashboard";
import FoodList from "./pages/FoodList";
import AddFood from "./pages/AddFood";
import EditFood from "./pages/EditFood";
import MyRequests from "./pages/MyRequests";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Donor Routes */}
        <Route
          path="/donor-dashboard"
          element={
            <ProtectedRoute role="Donor">
              <DonorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-food"
          element={
            <ProtectedRoute role="Donor">
              <AddFood />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-food/:id"
          element={
            <ProtectedRoute role="Donor">
              <EditFood />
            </ProtectedRoute>
          }
        />

        {/* NGO Routes */}
        <Route
          path="/ngo-dashboard"
          element={
            <ProtectedRoute role="NGO">
              <NgoDashboard />
            </ProtectedRoute>
          }
        />

        {/* Shared Routes */}
        <Route
          path="/foods"
          element={
            <ProtectedRoute>
              <FoodList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-requests"
          element={
            <ProtectedRoute>
              <MyRequests />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;