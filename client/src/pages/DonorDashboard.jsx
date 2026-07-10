import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import socket from "../socket";
import "../styles/dashboard.css";

function DonorDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    // ===============================
    // Socket Notification
    // ===============================
    useEffect(() => {

        socket.on("newRequest", (data) => {

            alert("🔔 " + data.message);

        });

        return () => {

            socket.off("newRequest");

        };

    }, []);

    return (

        <>

            <Navbar />

            <div className="dashboard">

                {/* Welcome Section */}

                <div className="dashboard-header">

                    <h1>
                        Welcome, {user?.name}
                    </h1>

                    <p>
                        Manage your food donations, track NGO requests, and help reduce food waste.
                    </p>

                </div>

                {/* Dashboard Cards */}

                <div className="dashboard-grid">

                    {/* Add Food */}

                    <div className="dashboard-card add-food">

                        <h2>Add Food</h2>

                        <p>
                            Donate surplus food by creating a new food donation.
                        </p>

                        <button
                            onClick={() => navigate("/add-food")}
                        >
                            Add Food
                        </button>

                    </div>

                    {/* My Foods */}

                    <div className="dashboard-card my-food">

                        <h2>My Foods</h2>

                        <p>
                            View, edit, or remove the food donations you have created.
                        </p>

                        <button
                            onClick={() => navigate("/foods")}
                        >
                            View Foods
                        </button>

                    </div>

                    {/* Food Requests */}

                    <div className="dashboard-card requests">

                        <h2>Food Requests</h2>

                        <p>
                            Review NGO requests and accept or reject food requests.
                        </p>

                        <button
                            onClick={() => navigate("/my-requests")}
                        >
                            View Requests
                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default DonorDashboard;