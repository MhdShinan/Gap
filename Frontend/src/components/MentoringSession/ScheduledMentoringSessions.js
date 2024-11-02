import React, { useState, useEffect } from "react";
import "./MentoringSession.css";
import "bootstrap/dist/css/bootstrap.min.css";
import prolog from "./img/pro1.png";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoTime } from "react-icons/io5";
import SideBar from "../SideBar/SideBar";
import { BsLink45Deg } from "react-icons/bs";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import Bxlg from "./img/bxlg.png";
import { backEndURL, imageURL } from "../../backendUrl";
function ScheduledMentoringSessions() {
  const [userImages, setUserImages] = useState({});
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

  // Fetch all user images
  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await axios.get(`${backEndURL}/allUserImages`);
        if (response.data.status === "ok") {
          const images = response.data.data.reduce((acc, user) => {
            acc[user.email] = `${imageURL}/${user.profilePicture}`;
            return acc;
          }, {});
          setUserImages(images);
        }
      } catch (error) {
        console.error("Error fetching user images:", error);
      }
    };
    fetchUserImages();
  }, []);

  const ScheduledMeetings = ({ userEmails }) => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
      // Fetch meetings for the users/mentors
      axios
        .post("http://localhost:3001/api/meetings", { emails: userEmails })
        .then((response) => {
          setMeetings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching meetings:", error);
        });
    }, [userEmails]);
  };

  const [scheduledData, setScheduledData] = useState([]); // Initialize as an empty array
  const [emails, setEmails] = useState([
    "",
    sessionStorage.getItem("userEmail"),
  ]); // Example emails

  useEffect(() => {
    // Post data to the backend
    axios
      .post("http://localhost:3001/api/meetings", { emails })
      .then((response) => {
        // Log the response to see its structure
        console.log("API Response:", response.data);

        // Check if the response is an array, if not, set an empty array
        setScheduledData(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("There was an error fetching the Scheduled data!", error);
      });
  }, [emails]); // Ensure the request is made when `emails` changes

  return (
    <div>
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
              <div className="ful_box_sesion_page">
                <div className="navbar_sedule">
                  <div>
                    <div className="navbar_mentor_page">
                      <p
                        onClick={() => {
                          window.location.href = "/mentoringSession";
                        }}
                        className="mb-0 nav_topic_mentro_page"
                      >
                        Requested
                      </p>
                      <p
                        onClick={() => {
                          window.location.href = "/receviedmentor";
                        }}
                        className="mb-0 nav_topic_mentro_page "
                      >
                        Received
                      </p>
                      <p
                        onClick={() => {
                          window.location.href = "/schduldmentor";
                        }}
                        className="mb-0 nav_topic_mentro_page select_sedulenav"
                      >
                        Scheduled
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="vh-100 overflow-auto">
                    <div>
                      {/* Check if scheduledData has sessions */}
                      {scheduledData.length === 0 ? (
                        // Show this when no scheduled sessions are available
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
                                  src={Bxlg} // Ensure Bxlg is defined and imported correctly
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
                                  “Seems like you haven't accepted any sessions
                                  yet”
                                </p>
                              </div>
                              <br />
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Show this when there are scheduled sessions
                        scheduledData.map((scheduled, index) => (
                          <div key={index} id="Scheduled">
                            <div>
                              <div className="">
                                <h5 className="sedule_update">
                                  Scheduled Sessions to attend
                                </h5>
                                <div className="session_box_shedule">
                                  <div>
                                    <img
                                      src={
                                        userImages[scheduled.userEmail] ||
                                        prolog
                                      }
                                      rounded
                                      alt="propic"
                                      className="img_profile_sesion"
                                      onError={(e) => (e.target.src = prolog)}
                                    />
                                  </div>
                                  <div className="content_section">
                                    <h5 className="name_sesion">
                                      {scheduled.userName}
                                    </h5>
                                    <p className="bio_sedule">
                                      {scheduled.academicDetails}
                                    </p>
                                    <div className="liksetnav">
                                      <div className="liksetnav_sub">
                                        <BsLink45Deg />
                                        {scheduled.meetLink}
                                      </div>
                                      <div className="liksetnav_sub">
                                        <BsCalendar2DateFill />
                                        {scheduled.scheduledDate}
                                      </div>
                                      <div className="liksetnav_sub">
                                        <IoTime />
                                        {scheduled.scheduledStartTime} -{" "}
                                        {scheduled.scheduledEndTime}
                                      </div>
                                    </div>
                                    <p className="sub_para_sesion">
                                      {scheduled.summary}
                                    </p>
                                    <p>{scheduled.description}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
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

export default ScheduledMentoringSessions;
