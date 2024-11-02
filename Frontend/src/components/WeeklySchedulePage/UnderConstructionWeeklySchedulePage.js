import React from "react";
import "../MentorsPage/Mentors.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import img1 from "../HomePage/Img/1.png";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

function UnderConstructionWeeklySchedulePage() {
  return (
    <div className="d-flex">
      <div className="container-fluid">
        <div className="row">
          <div className="nav-colum" id="mySidebar">
            <SideBar />
          </div>
          <div className="col-lg-9 vh-100 overflow-auto">
            <div>
              <NavBar />
              <br></br>
              <br></br>
              <div
                className="main-box fadeInUp"
                style={{
                  border: "2px solid #63636380",
                  width: "100%",
                  height: "auto",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="m-3 fnbltunde">Weekly Schedule</h5>
                  </div>
                </div>

                <div className="">
                  <Card style={{ marginRight: "20px", borderRadius: "10px" }}>
                    <div className="text-center">
                      <div>
                        <img src={img1} alt="YourImage" className="conimg" />
                      </div>
                      <div>
                        <h2 className="contpik"> Page Under construction</h2>
                        <p className="conpret">
                          To make things perfect we need some time to build.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnderConstructionWeeklySchedulePage;
