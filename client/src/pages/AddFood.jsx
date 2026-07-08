import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AddFood() {

    const navigate = useNavigate();

    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/foods",
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

            alert("Food Added Successfully");

            navigate("/donor-dashboard");

        } catch (error) {

            alert(error.response?.data?.message || "Failed to add food");

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

            background:"#FFFFFF",

            padding:"35px",

            borderRadius:"20px",

            boxShadow:"0 12px 30px rgba(0,0,0,.12)"

        },

        heading:{

            textAlign:"center",

            color:"#2E7D32",

            fontSize:"34px",

            fontWeight:"700",

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

            color:"#2E7D32",

            fontWeight:"600"

        },

        input:{

            width:"100%",

            padding:"14px",

            border:"2px solid #E5E7EB",

            borderRadius:"10px",

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

            fontSize:"16px",

            fontWeight:"600",

            cursor:"pointer"

        },

        addButton:{

            flex:1,

            background:"#2E7D32",

            color:"#FFFFFF",

            border:"none",

            padding:"14px",

            borderRadius:"10px",

            fontSize:"16px",

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
                    Add Food Donation
                </h1>

                <p style={styles.subtitle}>
                    Fill in the details below to donate surplus food.
                </p>

                <form onSubmit={handleSubmit}>

                    <label style={styles.label}>
                        Food Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter Food Name"
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
                        placeholder="Enter Quantity"
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
                        placeholder="Enter Category"
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
                        placeholder="Enter Pickup Address"
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <div style={styles.buttonContainer}>

                        <button
                            type="button"
                            style={styles.cancelButton}
                            onClick={() => navigate("/donor-dashboard")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            style={styles.addButton}
                        >
                            Add Food
                        </button>

                    </div>

                </form>

            </div>

        </div>

    </>

);

}

export default AddFood;