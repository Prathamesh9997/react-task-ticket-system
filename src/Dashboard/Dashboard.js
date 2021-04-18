import React, { useEffect, useContext } from "react";
import "./Dashboard.css";
import NotificationCard from "./NotificationCard";
import NotificationCardData from "./NotificationCardData";
import TicketContext from "../TicketContext";

const Dashboard = () => {
  let url = "https://6065c6c1b8fbbd00175675a3.mockapi.io/queries";
  let { value1, value2 } = useContext(TicketContext);
  const [data, setData] = value1;

  const getData = async () => {
    const response = await fetch(url);
    const resData = await response.json();
    setData(resData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="dashboard">
      <h2 className="dashboard-heading">
        <strong>Dashboard</strong>
      </h2>
      <div className="notification-cards">
        {NotificationCardData.map((item, index) => {
          return (
            <NotificationCard key={index} item={item} count={data.length} />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
