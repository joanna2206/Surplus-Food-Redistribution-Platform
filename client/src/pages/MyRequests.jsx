import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function MyRequests() {

    const [requests, setRequests] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {

        try {

            const token = localStorage.getItem("token");

            let url = "/requests/my";

            if (user.role === "Donor") {
                url = "/requests/donor";
            }

            const response = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setRequests(response.data);

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Failed to load requests");

        }

    };

    const acceptRequest = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/requests/${id}/accept`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Request Accepted");

            fetchRequests();

        } catch (error) {

            alert(error.response?.data?.message || "Accept Failed");

        }

    };

    const rejectRequest = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/requests/${id}/reject`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(error.response?.data?.message || "Reject Failed");

            fetchRequests();

        } catch (error) {

            alert(error.response?.data?.message || "Reject Failed");

        }

    };

    const styles = {

        page:{

            background:"#F5F7F2",

            minHeight:"100vh",

            padding:"40px"

        },

        container:{

            maxWidth:"1200px",

            margin:"0 auto"

        },

        heading:{

            fontSize:"34px",

            color:"#2E7D32",

            fontWeight:"700",

            marginBottom:"10px"

        },

        subtitle:{

            color:"#666",

            marginBottom:"30px",

            fontSize:"17px"

        },

        card:{

            background:"#fff",

            borderRadius:"18px",

            padding:"25px",

            marginBottom:"25px",

            boxShadow:"0 10px 25px rgba(0,0,0,.10)",

            borderTop:"6px solid #FBC02D"

        },

        title:{

            color:"#2E7D32",

            fontSize:"24px",

            marginBottom:"15px"

        },

        detail:{

            color:"#444",

            marginBottom:"10px",

            fontSize:"16px"

        },

        statusPending:{

            color:"#E65100",

            fontWeight:"700"

        },

        statusAccepted:{

            color:"#2E7D32",

            fontWeight:"700"

        },

        statusRejected:{

            color:"#C62828",

            fontWeight:"700"

        },

        buttonContainer:{

            display:"flex",

            gap:"15px",

            marginTop:"20px"

        },

        acceptButton:{

            flex:1,

            background:"#2E7D32",

            color:"white",

            border:"none",

            padding:"13px",

            borderRadius:"10px",

            fontWeight:"600",

            cursor:"pointer"

        },

        rejectButton:{

            flex:1,

            background:"#FBC02D",

            color:"#2E7D32",

            border:"none",

            padding:"13px",

            borderRadius:"10px",

            fontWeight:"600",

            cursor:"pointer"

        }

    };
    return (

    <>
        <Navbar />

        <div style={styles.page}>

            <div style={styles.container}>

                <h1 style={styles.heading}>
                    My Requests
                </h1>

                <p style={styles.subtitle}>
                    View and manage all food requests.
                </p>

                {requests.length === 0 ? (

                    <div
                        style={{
                            background:"#FFFFFF",
                            padding:"40px",
                            borderRadius:"18px",
                            textAlign:"center",
                            boxShadow:"0 10px 25px rgba(0,0,0,.08)"
                        }}
                    >
                        <h2>No Requests Found</h2>
                    </div>

                ) : (

                    requests.map((request) => (

                        <div
                            key={request._id}
                            style={styles.card}
                        >

                            <h2 style={styles.title}>
                                {request.food?.foodName || "Food Deleted"}
                            </h2>

                            <p style={styles.detail}>
                                <strong>Status : </strong>

                                <span
                                    style={
                                        request.status === "Pending"
                                            ? styles.statusPending
                                            : request.status === "Accepted"
                                            ? styles.statusAccepted
                                            : styles.statusRejected
                                    }
                                >
                                    {request.status}
                                </span>

                            </p>

                            <p style={styles.detail}>
                                <strong>NGO : </strong>
                                {request.ngo?.name}
                            </p>

                            {request.food && (

                                <>
                                    <p style={styles.detail}>
                                        <strong>Quantity : </strong>
                                        {request.food.quantity}
                                    </p>

                                    <p style={styles.detail}>
                                        <strong>Category : </strong>
                                        {request.food.category}
                                    </p>

                                    <p style={styles.detail}>
                                        <strong>Pickup Address : </strong>
                                        {request.food.pickupAddress}
                                    </p>
                                </>

                            )}

                            {user.role === "Donor" &&
                            request.status === "Pending" && (

                                <div style={styles.buttonContainer}>

                                    <button
                                        style={styles.acceptButton}
                                        onClick={() =>
                                            acceptRequest(request._id)
                                        }
                                    >
                                        Accept
                                    </button>

                                    <button
                                        style={styles.rejectButton}
                                        onClick={() =>
                                            rejectRequest(request._id)
                                        }
                                    >
                                        Reject
                                    </button>

                                </div>

                            )}

                        </div>

                    ))

                )}

            </div>

        </div>

    </>

);

}

export default MyRequests;