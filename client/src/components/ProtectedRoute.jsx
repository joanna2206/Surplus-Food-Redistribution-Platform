import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Not logged in
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Wrong role
    if (role && user?.role !== role) {

        if (user?.role === "Donor") {
            return <Navigate to="/donor-dashboard" replace />;
        }

        if (user?.role === "NGO") {
            return <Navigate to="/ngo-dashboard" replace />;
        }

        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;