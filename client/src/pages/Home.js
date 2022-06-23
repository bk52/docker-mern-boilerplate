import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return <>
        <div>Home Page</div>
        <button onClick={(e) => navigate(`/details/3`, { replace: true })}>Go Details</button>
    </>
}

export default Home;