import React from "react";
import "./MentoringSession.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Bxlg from "./img/bxlg.png";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
function MentoringSessionEmpty() {
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
                    <a href="#Requested" className="mb-0 navtpic">
                      Requested
                    </a>
                    <a href="#Received" className="mb-0 navtpic">
                      Received
                    </a>
                    <a href="#Scheduled" className="mb-0 navtpic">
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
                        <div class="Cardsection">
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
                        <div class="Cardsection">
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
                                  “Due to the fact that you are not a mentor in
                                  our community, it appears that you have not
                                  received any mentoring sessions.”
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
                      {/*Received Section End */}
                      {/*Scheduled Section Start*/}
                      <div id="Scheduled">
                        <div>
                          <div class="Cardsection">
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
                                    “it appears that you have not scheduled any
                                    mentoring sessions to attend.”
                                  </p>
                                </div>
                                <br />
                              </div>
                            </div>
                            <h5
                              style={{
                                fontFamily: "Poppins",
                                fontSize: "24px",
                                fontWeight: "bold",
                                padding: "30px 0 0 30px",
                              }}
                            >
                              Scheduled Sessions to conduct
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
                                    “Due to the fact that you are not a mentor
                                    in our community, it appears that you have
                                    not scheduled any mentoring sessions to
                                    conduct.”
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

export default MentoringSessionEmpty;
