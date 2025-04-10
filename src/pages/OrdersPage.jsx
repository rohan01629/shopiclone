import React, { useState, useEffect } from "react";
import Orders from "./Orders";
import { auth } from "../firebase"; 

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders on component mount 
  useEffect(() => {
    // Fetch orders from localStorage or your database
    const savedOrders = localStorage.getItem("orders");

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders)); // Parse and set saved orders from localStorage
    }
  }, []);

  return <Orders orders={orders} setOrders={setOrders} />;
};

export default OrdersPage;
