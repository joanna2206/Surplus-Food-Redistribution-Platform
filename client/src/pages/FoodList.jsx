import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function FoodList() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [foods, setFoods] = useState([]);
   

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/foods", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setFoods(response.data);

        } catch (error) {

            alert(error.response?.data?.message || "Failed to load foods");

        }

    };

    const deleteFood = async (id) => {

        if (!window.confirm("Delete this food?")) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/foods/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchFoods();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const requestFood = async (foodId) => {

        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/requests",
                { food: foodId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Food requested successfully");

            fetchFoods();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const filteredFoods = foods;

    const styles = {

        page:{

            background:"#F5F7F2",

            minHeight:"100vh"

        },

        container:{

            maxWidth:"1300px",

            margin:"40px auto",

            padding:"20px"

        },

        heading:{

            fontSize:"34px",

            color:"#2E7D32",

            fontWeight:"700",

            marginBottom:"10px"

        },

        subtitle:{

            color:"#666",

            marginBottom:"30px"

        },

        

        grid:{

            display:"grid",

            gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",

            gap:"25px"

        },

        card:{

            background:"#fff",

            borderRadius:"18px",

            padding:"25px",

            boxShadow:"0 10px 25px rgba(0,0,0,.08)",

            borderTop:"6px solid #FBC02D"

        },

        top:{

            display:"flex",

            justifyContent:"space-between",

            alignItems:"center",

            marginBottom:"20px"

        },

        title:{

            color:"#2E7D32",

            fontSize:"24px",

            fontWeight:"700"

        },

        available:{

            background:"#E8F5E9",

            color:"#2E7D32",

            padding:"6px 15px",

            borderRadius:"25px",

            fontWeight:"600",

            fontSize:"13px"

        },

        reserved:{

            background:"#FFF3CD",

            color:"#A15C00",

            padding:"6px 15px",

            borderRadius:"25px",

            fontWeight:"600",

            fontSize:"13px"

        },

        detail:{

            marginBottom:"10px",

            color:"#444"

        },

        buttons:{

            display:"flex",

            gap:"10px",

            marginTop:"20px"

        },

        greenBtn:{

            flex:1,

            background:"#2E7D32",

            color:"white",

            border:"none",

            padding:"12px",

            borderRadius:"10px",

            cursor:"pointer",

            fontWeight:"600"

        },

        yellowBtn:{

            flex:1,

            background:"#FBC02D",

            color:"#2E7D32",

            border:"none",

            padding:"12px",

            borderRadius:"10px",

            cursor:"pointer",

            fontWeight:"600"

        },

        redBtn:{

            flex:1,

            background:"#D32F2F",

            color:"white",

            border:"none",

            padding:"12px",

            borderRadius:"10px",

            cursor:"pointer",

            fontWeight:"600"

        }

    };

    return(

        <>

            <Navbar/>

            <div style={styles.page}>

                <div style={styles.container}>

                    <h1 style={styles.heading}>Food Donations</h1>

                    <p style={styles.subtitle}>
                         Manage food donations
                    </p>

                    

                    <div style={styles.grid}>

                                                {filteredFoods.length === 0 ? (

                            <div
                                style={{
                                    gridColumn: "1 / -1",
                                    textAlign: "center",
                                    background: "#fff",
                                    padding: "40px",
                                    borderRadius: "15px",
                                    boxShadow: "0 10px 25px rgba(0,0,0,.08)"
                                }}
                            >
                                <h2>No Food Donations Found</h2>
                            </div>

                        ) : (

                            filteredFoods.map((food) => (

                                <div
                                    key={food._id}
                                    style={styles.card}
                                >

                                    <div style={styles.top}>

                                        <h2 style={styles.title}>
                                            {food.foodName}
                                        </h2>

                                        <span
                                            style={
                                                food.status === "Available"
                                                    ? styles.available
                                                    : styles.reserved
                                            }
                                        >
                                            {food.status}
                                        </span>

                                    </div>

                                    <p style={styles.detail}>
                                        <strong>Quantity:</strong> {food.quantity}
                                    </p>

                                    <p style={styles.detail}>
                                        <strong>Category:</strong> {food.category}
                                    </p>

                                    <p style={styles.detail}>
                                        <strong>Pickup Address:</strong> {food.pickupAddress}
                                    </p>

                                    <p style={styles.detail}>
                                        <strong>Expiry Date:</strong>{" "}
                                        {new Date(food.expiryDate).toLocaleDateString()}
                                    </p>

                                    <div style={styles.buttons}>

                                        {user?.role === "Donor" ? (

                                            <>

                                                <button
                                                    style={styles.greenBtn}
                                                    onClick={() =>
                                                        navigate(`/edit-food/${food._id}`)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    style={styles.redBtn}
                                                    onClick={() =>
                                                        deleteFood(food._id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </>

                                        ) : (

                                            <button
                                                style={styles.yellowBtn}
                                                onClick={() =>
                                                    requestFood(food._id)
                                                }
                                                disabled={
                                                    food.status !== "Available"
                                                }
                                            >
                                                Request Food
                                            </button>

                                        )}

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>

        </>

    );

}

export default FoodList;