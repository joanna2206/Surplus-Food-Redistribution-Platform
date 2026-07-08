import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function EditFood() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");

    useEffect(() => {
        fetchFood();
    }, []);

    const fetchFood = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(`/foods/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const food = response.data;

            setFoodName(food.foodName);
            setQuantity(food.quantity);
            setCategory(food.category);
            setExpiryDate(food.expiryDate.split("T")[0]);
            setPickupAddress(food.pickupAddress);

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Failed to load food details");

        }

    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/foods/${id}`,
                {
                    foodName,
                    quantity,
                    category,
                    expiryDate,
                    pickupAddress
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Food updated successfully");

            navigate("/foods");

        } catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Update Failed");

        }

    };

    const styles = {

        page:{

            background:"#F5F7F2",

            minHeight:"100vh",

            padding:"40px"

        },

        card:{

            maxWidth:"700px",

            margin:"40px auto",

            background:"#fff",

            padding:"35px",

            borderRadius:"20px",

            boxShadow:"0 12px 30px rgba(0,0,0,.12)"

        },

        heading:{

            color:"#2E7D32",

            textAlign:"center",

            fontSize:"34px",

            marginBottom:"10px"

        },

        subtitle:{

            textAlign:"center",

            color:"#666",

            marginBottom:"30px"

        },

        label:{

            display:"block",

            marginBottom:"8px",

            marginTop:"18px",

            fontWeight:"600",

            color:"#2E7D32"

        },

        input:{

            width:"100%",

            padding:"14px",

            borderRadius:"10px",

            border:"2px solid #E5E7EB",

            fontSize:"16px",

            outline:"none"

        },

        buttonContainer:{

            display:"flex",

            justifyContent:"space-between",

            gap:"15px",

            marginTop:"35px"

        },

        cancelButton:{

            flex:1,

            background:"#FBC02D",

            color:"#2E7D32",

            border:"none",

            padding:"14px",

            borderRadius:"10px",

            fontWeight:"600",

            cursor:"pointer"

        },

        updateButton:{

            flex:1,

            background:"#2E7D32",

            color:"white",

            border:"none",

            padding:"14px",

            borderRadius:"10px",

            fontWeight:"600",

            cursor:"pointer"

        }

    };
    return (

    <>
        <Navbar />

        <div style={styles.page}>

            <div style={styles.card}>

                <h1 style={styles.heading}>
                    Edit Food
                </h1>

                <p style={styles.subtitle}>
                    Update your food donation details.
                </p>

                <form onSubmit={handleUpdate}>

                    <label style={styles.label}>
                        Food Name
                    </label>

                    <input
                        type="text"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>
                        Quantity
                    </label>

                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>
                        Category
                    </label>

                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>
                        Expiry Date
                    </label>

                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>
                        Pickup Address
                    </label>

                    <input
                        type="text"
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <div style={styles.buttonContainer}>

                        <button
                            type="button"
                            style={styles.cancelButton}
                            onClick={() => navigate("/foods")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            style={styles.updateButton}
                        >
                            Update Food
                        </button>

                    </div>

                </form>

            </div>

        </div>

    </>

);

}

export default EditFood;