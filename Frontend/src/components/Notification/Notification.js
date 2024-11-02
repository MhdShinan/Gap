import React, { useState, useEffect } from "react";
import "./Notification.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBell } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import profileImg from "./img/userNotification.png"; // Default profile image in case of an error
import { backEndURL } from "../../backendUrl";
import axios from "axios";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const userId = sessionStorage.getItem("userId"); // user ID from your authentication context or props

  // Fetch notifications when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${backEndURL}/notificationsGet/${userId}`);
        setNotifications(response.data); // Set the notifications state
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]); // Dependency array to run effect when userId changes

  return (
    <div className="d-flex">
      <div className="container-fluid">
        <div className="row">
          <div className="nav-colum" id="mySidebar">
            <SideBar />
          </div>
          <div className="col-lg-9 vh-100 overflow-auto">
            <NavBar />
            <br />
            <br />
            <h5 className="card-title fw-bold titleneww">Notification</h5>
            <div className="notification-container">
              {notifications.length === 0 ? (
                <p>No notifications found.</p>
              ) : (
                notifications.map((notification) => (
                  <div key={notification._id} className="notification-item"> {/* Use notification._id if that's your unique identifier */}
                    <div className="notification-profile">
                      <img
                        src={notification.profileImg || profileImg} // Fallback to default image
                        alt="Profile"
                        className="profile-img"
                      />
                      <FaBell className="bell-icon" />
                    </div>
                    <div className="notification-content">
                      <p className="notification-text">{notification.message}</p>
                      <HiDotsHorizontal className="dots-icon" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
