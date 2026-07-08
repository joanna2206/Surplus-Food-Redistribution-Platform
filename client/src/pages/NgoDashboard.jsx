import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function NgoDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

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

        banner:{

            background:"linear-gradient(135deg,#2E7D32,#43A047)",

            color:"white",

            padding:"35px",

            borderRadius:"20px",

            boxShadow:"0 10px 25px rgba(0,0,0,.15)",

            marginBottom:"35px"

        },

        heading:{

            color:"white",

            fontSize:"34px",

            marginBottom:"10px"

        },

        subtitle:{

            color:"#F1F8E9",

            fontSize:"18px"

        },

        cards:{

            display:"grid",

            gridTemplateColumns:"repeat(2,1fr)",

            gap:"30px"

        },

        card:{

            background:"white",

            padding:"35px",

            borderRadius:"20px",

            boxShadow:"0 12px 30px rgba(0,0,0,.10)",

            borderTop:"8px solid #FBC02D",

            cursor:"pointer",

            transition:"0.3s"

        },

        title:{

            color:"#2E7D32",

            fontSize:"28px",

            marginBottom:"15px"

        },

        text:{

            color:"#666",

            lineHeight:"1.7",

            fontSize:"16px"

        }

    };

    return (

    <>
        <Navbar />

        <div style={styles.page}>

            <div style={styles.container}>

                {/* Welcome Banner */}

                <div style={styles.banner}>

                    <h1 style={styles.heading}>
                        Welcome, {user?.name}
                    </h1>

                    <p style={styles.subtitle}>
                        Browse available food donations and manage your requests.
                    </p>

                </div>

                {/* Dashboard Cards */}

                <div style={styles.cards}>

                    {/* Available Food */}

                    <div
                        style={styles.card}
                        onClick={() => navigate("/foods")}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-8px)";
                            e.currentTarget.style.boxShadow =
                                "0 18px 40px rgba(0,0,0,.15)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 12px 30px rgba(0,0,0,.10)";
                        }}
                    >

                        <h2 style={styles.title}>
                            Available Food
                        </h2>

                        <p style={styles.text}>
                            Browse all available food donations from donors and request the food you need.
                        </p>

                    </div>

                    {/* My Requests */}

                    <div
                        style={styles.card}
                        onClick={() => navigate("/my-requests")}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-8px)";
                            e.currentTarget.style.boxShadow =
                                "0 18px 40px rgba(0,0,0,.15)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 12px 30px rgba(0,0,0,.10)";
                        }}
                    >

                        <h2 style={styles.title}>
                            My Requests
                        </h2>

                        <p style={styles.text}>
                            Track the status of all food requests you have submitted.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    </>

);

}

export default NgoDashboard;