import React, { useState, useEffect } from "react";
import "./HomeS.css";
import Bxlg from "./img/bxlg.png";
import "../HomePage/Home.css";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
function WeeklySchedulePage() {
  useEffect(() => {
   
    const navbar = document.getElementById("mySidebar");
    const screenWidth = window.innerWidth;

    // Check if the screen width is less than 1250px (responsive view)
    if (screenWidth < 1250) {
      navbar.style.display = "none"; // Hide navbar in responsive view
    } else {
      navbar.style.display = "block"; // Show navbar in desktop view
    }
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <div className="d-flex">
        <div className="container-fluid">
          <div className="row">
            <div className="nav-colum" id="mySidebar">
              <SideBar />
            </div>
            <div className="col-lg-9 vh-100 ">
              <NavBar />
              <br></br>
              <br></br>
              <br></br>
              <div class="container">
                <div class="row">
                  <div className="container-fluid">
                    <div className="row justify-content-center">
                      <div className="col-md-12 col-12">
                        <div
                          style={{
                            borderRadius: "10px",
                            background: "#FFF",
                            border: "2px solid gray",
                            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <h5
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "24px",
                              fontWeight: "bold",
                              padding: "30px 0 0 30px",
                            }}
                          >
                            Weekly Schedule
                          </h5>
                          <div className="text-center p-4">
                            <img
                              src={Bxlg}
                              alt="Example"
                              className="img-fluid"
                              style={{
                                width: "200px",
                              }}
                            />
                            <p
                              className="mt-3"
                              style={{
                                fontFamily: "Poppins",
                                fontSize: "24px",
                               
                                padding: "20px",
                              }}
                            >
                              “Since you are not yet a mentor in our community,
                              your weekly schedule cannot be set up. Get started
                              as a mentor today and unlock the ability to make
                              weekly schedules.”
                            </p>
                            <button
                              className="btn btn-primary"
                              style={{
                                borderRadius: "10px",
                                fontFamily: "Poppins",
                                fontSize: "24px",
                                padding: "10px 41px",
                                border: "5px solid #FFF",
                                background: "#2A2A72",
                                cursor: "pointer",
                              }}
                            >
                              Be a Mentor
                            </button>
                          </div>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <br></br> <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklySchedulePage;
