import React, { useState } from "react";
import "./HistoryPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Bxlg from "./img/bxlg.png";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

function HistoryPageEmptyUser() {
  const [activeTab, setActiveTab] = useState("Attended");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                      href="#Attended"
                      className={`mb-0 navtpic ${
                        activeTab === "Attended" ? "select_sedulenav" : ""
                      }`}
                      onClick={() => handleTabClick("Attended")}
                    >
                      Attended
                    </a>
                    <a
                      href="#Conducted"
                      className={`mb-0 navtpic ${
                        activeTab === "Conducted" ? "select_sedulenav" : ""
                      }`}
                      onClick={() => handleTabClick("Conducted")}
                    >
                      Conducted
                    </a>
                  </h5>
                </div>
              </div>

              <div>
                <div className="col-lg-12 vh-100 overflow-auto">
                  <div>
                    <div className="fullcon">
                      {/*Attended Section Start */}
                      <div id="Attended">
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
                                  “Due to the fact that mentoring sessions were
                                  not attended, there is no mentoring history.”
                                </p>
                              </div>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Attended Section End */}
                      {/* Conducted Section Start */}
                      <div className="main-box" id="Conducted">
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
                                  “because you are not the mentor in the community”
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
                      {/* Conducted Section End */}
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

export default HistoryPageEmptyUser;
