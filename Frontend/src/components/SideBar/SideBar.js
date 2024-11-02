import React, { useState, useEffect } from "react";
import "../HomePage/Home.css";
import GAP_Image from "../HomePage/Img/GAP_BG.png";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoCalendarOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { TfiBookmarkAlt } from "react-icons/tfi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RxCountdownTimer } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import Swal from 'sweetalert2'
import "./SideBar.css"
import axios from "axios";
import { backEndURL } from "../../backendUrl";
function SideBar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isMentor, setIsMentor] = useState(null);
  const [isReview, setIsReview] = useState(null);
  const [activeKey, setActiveKey] = useState(window.location.pathname);
  const [userEmail, setUserEmail] = useState(null);

  function nav_close(url) {
    document.getElementById("mySidebar");
    window.location.href = url; // Navigate to the specified URL
  }

  function nav_closeside() {
    document.getElementById("mySidebar").style.display = "none";
  }

  function checkNavbarDisplay() {
    const currentPage = window.location.pathname;
    const navbar = document.getElementById("mySidebar");

    // List of pages where navbar should be hidden
    const pagesToHideNavbar = [
      "/home",
      "/mentors",
      "/beAMentor",
      "/mentoringSession",
      "/WeeklySchedulePage",
      "/weeklySchedulePageNotMenter",
      "/historyPage",
      "/settings",
    ];

    // Check if the current page is not in the list of pages to hide the navbar
    if (!pagesToHideNavbar.includes(currentPage)) {
      navbar.style.display = "block";
    }
    // Highlighted change: Set the active key based on the current page
    setActiveKey(currentPage);
  }

  useEffect(() => {
    checkNavbarDisplay();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.clear();
    handleClose();
    window.location.href = "/";
  };

  const alertLogOut = () => {
    Swal.fire({
      title: "Are You sure you want to logout?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#FFC107",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",


    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "logout successfull",
          icon: "success",
          iconColor: "#4BB543",
          timer: 3000
        });

        let timerInterval;
        Swal.fire({
          icon: "warning",
          iconColor: "#ff0000",
          title: "Auto logout Alert!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            handleLogout();
          }
        });

      }
    });
  }
  useEffect(() => {
    console.log('m', isMentor);
    console.log('r', isReview);
  // Highlighted change: Add state to track the active navbar item
  // const [activeKey, setActiveKey] = useState("/home");

  function nav_close(url) {
    // Highlighted change: Set the active key when a navbar item is clicked
    setActiveKey(url); // Set the active key
    window.location.href = url; // Navigate to the specified URL
  }

    const checkIfMentor = async () => {
      const decision = sessionStorage.getItem("isMentor");
      if (decision === "true") {
        setIsMentor(true);
      } else {
        setIsMentor(false);
      }
    };

    checkIfMentor();
  }, []);
  return (
    <div>
      <div id="mySidebar" className="vh-100 navbk-res">
        <div className="">
          <img
            src={GAP_Image}
            alt="logo"
            className="img-fluid custom-image-Gap"
          />
          <button onClick={nav_closeside} class="resclose">
            &times;
          </button>
        </div>
        <Tab.Container
          id="list-group-tabs-example"
          defaultActiveKey="/underConstructionHome"
        >
          <Row className="item_set_sibr">
            <ListGroup>
              <ListGroup.Item
                action
                variant="light"
                className={`list-group-item-custom ${activeKey === "/home" ? "active" : ""
                  }`}
                onClick={() => {
                  nav_close("/home"); // Navigate to the "/home" page
                }}

              >
                <IoHomeOutline
                  style={{ fontSize: "18px", marginRight: "20px" }}
                />
                Home
              </ListGroup.Item>
              <br />
              <ListGroup.Item
                action
                variant="light"
                className={`list-group-item-custom ${activeKey === "/mentorsFilter" ? "active" : ""
                  }`}
                onClick={() => {
                  nav_close("/mentorsFilter");
                }}
              >
                <IoPeopleOutline
                  style={{ fontSize: "18px", marginRight: "20px" }}
                />
                Mentors
              </ListGroup.Item>
              <br />
              <ListGroup.Item
                action
                variant="light"
                className={`list-group-item-custom ${activeKey === "/mentoringSession" ? "active" : ""
                  }`}
                onClick={() => {
                    nav_close("/mentoringSession");
                }}
              >
                <TfiBookmarkAlt
                  style={{ fontSize: "18px", marginRight: "20px" }}
                />
                Mentoring Session
              </ListGroup.Item>
              <br />
              <ListGroup.Item
                action
                variant="light"
                className={`list-group-item-custom ${activeKey === "/beAMentor" ? "active" : ""
                  }`}
                onClick={() => {
                  nav_close("/beAMentor");
                }}
              >
                <MdOutlinePeopleAlt
                  style={{ fontSize: "18px", marginRight: "20px" }}
                />
                Be A Mentor
              </ListGroup.Item>
              <br />
              <ListGroup.Item
                action
                variant="light"
                className={`list-group-item-custom ${activeKey === "/WeeklySchedulePage" ? "active" : ""
                  }`}
                
                onClick={() => { 
                 {
                  const decision = sessionStorage.getItem("isMentor");
                   
                  if(decision === "true"){
                    nav_close("/WeeklySchedulePage");
                  }else{
                    nav_close("/weeklySchedulePageNotMenter");
                  }

                 }
                 // nav_close("/WeeklySchedulePage")
                }}
              >
                <IoCalendarOutline
                  style={{ fontSize: "18px", marginRight: "20px" }}
                />
                Weekly Schedule
              </ListGroup.Item>
              <br />
              <ListGroup.Item
                action
                variant="light"
                className={`list-group-item-custom ${activeKey === "/historyPage" ? "active" : ""
                  }`}
                onClick={() => {
                  nav_close("/historyPage");
                }}
              >
                <RxCountdownTimer
                  style={{ fontSize: "18px", marginRight: "20px" }}
                />
                Mentoring History
              </ListGroup.Item>
              <br />
              <ListGroup.Item
                action
                variant="light"
                className={`list-group-item-custom ${activeKey === "/settings" ? "active" : ""
                  }`}
                onClick={() => {
                  nav_close("/settings");
                }}
              >
                <IoSettingsOutline
                  style={{ fontSize: "18px", marginRight: "20px" }}
                />
                Settings
              </ListGroup.Item>
              <br />
              <br />
              <br />
              <ListGroup.Item
                onClick={alertLogOut}
                action
                variant="light"
                className="list-group-item-custom"
              >
                <IoIosLogOut
                  style={{ fontSize: "18px", marginRight: "20px" }}
                />
                Logout
              </ListGroup.Item>
              <br />
            </ListGroup>
          </Row>
        </Tab.Container>

      </div>
    </div>
  );
}

export default SideBar;
