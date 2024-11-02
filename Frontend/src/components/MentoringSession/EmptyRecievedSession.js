import React, { useState } from "react";
import "./MentoringSession.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Bxlg from "./img/bxlg.png";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

function EmptyRecievedSession() {
  const [activeTab, setActiveTab] = useState("Requested");

  return (
    <div className="d-flex">
      <div className="container-fluid">
        <div className="row">
          <div className="nav-colum" id="mySidebar">
            <SideBar />
          </div>
          <div className="col-lg-9 vh-100 overflow-auto">
            <NavBar />
            <br></br>
            <br></br>
            <div
              style={{
                border: "2px solid #63636380",
                width: "95%",
                height: "auto",
                padding: "10px 10px 10px 0px",
                borderRadius: "10px",
                margin: "0 0 50px 20px",
              }}
            >
              <div id="nav" className="nave">
                <div>
                  <h5>
                    <a
                      href="#Requested"
                      className={`mb-0 navtpic ${
                        activeTab === "Requested" ? "select_sedulenav" : ""
                      }`}
                      onClick={() => setActiveTab("Requested")}
                    >
                      Requested
                    </a>
                    <a
                      href="#Received"
                      className={`mb-0 navtpic ${
                        activeTab === "Received" ? "select_sedulenav" : ""
                      }`}
                      onClick={() => setActiveTab("Received")}
                    >
                      Received
                    </a>
                    <a
                      href="#Scheduled"
                      className={`mb-0 navtpic ${
                        activeTab === "Scheduled" ? "select_sedulenav" : ""
                      }`}
                      onClick={() => setActiveTab("Scheduled")}
                    >
                      Scheduled
                    </a>
                  </h5>
                </div>
              </div>
              <div>
                <div className="col-lg-12 vh-100 overflow-auto">
                  <div>
                    <div className="fullcon">
                      {/*Requested Section Start */}
                      <div id="Requested">
                        <div className="Cardsection">
                          <div
                            className="card"
                            style={{
                              borderRadius: "10px",
                              background: "#FFF",
                              border: "2px solid gray",
                              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                            }}
                          >
                            <div>
                              <div className="text-center p-4 mt-3">
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
                                    fontWeight: "bold",
                                    padding: "20px",
                                  }}
                                >
                                  “It appears that you have not scheduled a
                                  mentoring session. If you are looking for the
                                  best mentors, click ‘Mentors’ to find them.”
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
                                  Mentors
                                </button>
                              </div>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Requested Section End*/}
                      {/*Received Section Start*/}
                      <div className="main-box" id="Received">
                        <div className="Cardsection">
                          <div
                            className="card"
                            style={{
                              borderRadius: "10px",
                              background: "#FFF",
                              border: "2px solid gray",
                              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                            }}
                          >
                            <div>
                              <div className="text-center p-4 mt-3">
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
                                    fontWeight: "bold",
                                    padding: "20px",
                                  }}
                                >
                                  “Seems like you haven't received any sessions yet”
                                </p>
                              </div>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*Received Section End */}
                      {/*Scheduled Section Start*/}
                      <div id="Scheduled">
                        <div>
                          <div className="Cardsection">
                            <h5
                              style={{
                                fontFamily: "Poppins",
                                fontSize: "24px",
                                fontWeight: "bold",
                                padding: "30px 0 0 30px",
                              }}
                            >
                              Scheduled Sessions to attend
                            </h5>
                            <div
                              className="card"
                              style={{
                                borderRadius: "10px",
                                background: "#FFF",
                                border: "2px solid gray",
                                boxShadow:
                                  "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              <div>
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
                                      fontWeight: "bold",
                                      padding: "20px",
                                    }}
                                  >
                                    “Seems like you haven't accepted any sessions yet”
                                  </p>
                                </div>
                                <br />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*Scheduled Section End */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyRecievedSession;
