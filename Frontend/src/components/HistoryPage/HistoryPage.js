import React, { useState, useEffect } from "react";
import "./HistoryPage.css";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoTime } from "react-icons/io5";
import axios from "axios";
import { backEndURL } from "../../backendUrl";
import defaultProfilePic from "./img/pro1.png"; 

import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode

function HistoryPage() {
  const [isMentor, setIsMentor] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [meetings, setMeetings] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [userImages, setUserImages] = useState({});
  const [attendedEmails, setAttendedEmails] = useState([]); 
  const [conductedEmails, setConductedEmails] = useState([]);

  // Fetch user images
  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await axios.get(`${backEndURL}/allUserImages`);
        if (response.data.status === "ok") {
          const images = response.data.data.reduce((acc, user) => {
            acc[user.email] = user.profilePicture;
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

  // Fetch logged-in user's email
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get(`${backEndURL}/getUser`, {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        });
        setUserEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };
    fetchUserEmail();
  }, []);

  // Fetch meetings from the /pastmeeting API
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/pastmeeting")
      .then((response) => {
        if (response.data.success) {
          setMeetings(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
      });
  }, []);

  // Check if the user is a mentor
  useEffect(() => {
    const decision = sessionStorage.getItem("isMentor")
    if (decision === "true") {
      setIsMentor(true);
    } else {
      setIsMentor(false);
    }
  }, []);

  // Fetch attended and conducted emails
  useEffect(() => {
    const fetchSeperateEmails = async () => {
      try {
        const response = await axios.get(`${backEndURL}/seperateEmails`);
        if (response.status === 200) {
          const sessions = response.data;
          setAttendedEmails(sessions.map(session => session.userEmail)); // Extract userEmails (attended)
          setConductedEmails(sessions.map(session => session.mentorEmail)); // Extract mentorEmails (conducted)
        }
      } catch (error) {
        console.error("Error fetching attended and conducted emails:", error);
      }
    };
    fetchSeperateEmails();
  }, []);

  useEffect(() => {
    const storedFirstName = sessionStorage.getItem("firstName");
    setFirstName(storedFirstName);
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    if (token) {
      const decoded = jwtDecode(token);
      setFirstName(decoded.firstName);
    }


    const navbar = document.getElementById("mySidebar");
    const screenWidth = window.innerWidth;
    if (navbar) {
      if (screenWidth < 1250) {
        navbar.style.display = "none";
      } else {
        navbar.style.display = "block";
      }
    }

    
  }, []);

  // Filter meetings based on attended emails and user's email
  const filteredMeetings = meetings && attendedEmails
  ? meetings.filter((meeting) =>
      meeting.attendees &&
      meeting.attendees.some(attendee => attendedEmails.includes(attendee) && attendee === userEmail)
    )
  : []; // Fallback to an empty array if meetings or attendedEmails is undefined


  const nav_close = (url) => {
    window.location.href = url;
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
            <br />
            <br />
            <div className="ful_box_sesion_page">
              <div>
                <div className="navbar_mentor_page">
                  <p
                    onClick={() => {
                      window.location.href = "/historyPage";
                    }}
                    className="mb-0 nav_topic_mentro_page select_sedulenav"
                  >
                    Attended
                  </p>
                  {isMentor && (
                    <p
                      onClick={() => nav_close("/conducted")}
                      className="mb-0 nav_topic_mentro_page"
                      style={{ cursor: "pointer" }}
                    >
                      Conducted
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="vh-100 overflow-auto">
                  <div>
                    <div className="">
                      {/* Attended Section Start */}
                      <div id="Attended">
                        <div className="maintopic_atend">
                          <h5 className="">Number of Sessions Attended</h5>
                          <h5 className="">{filteredMeetings.length}</h5>
                        </div>

                        {filteredMeetings.map((meeting) => (
                          <div className="session_box" key={meeting._id}>
                            <div className="combined-images">
                              {meeting.attendees.slice(0, 2).map((attendee) => (
                                <img
                                  key={attendee}
                                  src={
                                    userImages[attendee] || defaultProfilePic
                                  } // Use default image if not found
                                  alt="Attendee"
                                  className="attendee-image"
                                />
                              ))}
                            </div>

                            <div className="border_Ad_sesin">
                              <div className="">
                                <div className="">
                                  <h5 className="name_sesion">
                                    {meeting.summary}
                                  </h5>
                                </div>
                                <p className="bio_sedule">
                                  {meeting.description}
                                </p>
                                <p>Attendees: {meeting.attendees.join(", ")}</p>
                                <div className="">
                                  <div className="liksetnav_sub">
                                    <IoTime />
                                    {meeting.scheduledStartTime} - {meeting.scheduledEndTime}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="border_Ad_sesin">
                              <p className="">
                                <div className="">
                                  <BsCalendar2DateFill />{" "}
                                  {new Date(meeting.scheduledDate).toLocaleDateString()}
                                </div>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Attended Section End */}
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

export default HistoryPage;