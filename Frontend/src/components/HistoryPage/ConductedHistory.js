import React, { useEffect, useState } from "react";
import "./HistoryPage.css";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoTime } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import axios from "axios";
import { backEndURL, imageURL } from "../../backendUrl";
import defaultProfilePic from "./img/pro1.png";

function ConductedHistory() {
  const [meetings, setMeetings] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [userImages, setUserImages] = useState({});
  const [attendedEmails, setAttendedEmails] = useState([]);
  const [conductedEmails, setConductedEmails] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch user image
    axios
      .get(`${backEndURL}/getUserImage`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.data.profilePicture) {
          const profilePicture = `${imageURL}/${response.data.profilePicture}`;
          setSelectedImage(profilePicture);
        }
      })
      .catch((error) => {
        console.error("Error fetching user image:", error);
      });
  }, []);

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await axios.get(`${backEndURL}/allUserImages`);
        if (response.data.status === "ok") {
          const images = response.data.data.reduce((acc, user) => {
            acc[user.email] = `${imageURL}/${user.profilePicture}`; // Corrected to use user.profilePicture
            return acc;
          }, {});
          setUserImages(images);
          console.log("User Images:", images); // Debug log to check the image URLs
        }
      } catch (error) {
        console.error("Error fetching user images:", error);
      }
    };
    fetchUserImages();
  }, []);

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

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/pastmeeting")
      .then((response) => {
        if (response.data.success) {
          setMeetings(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching conducted meetings:", error);
      });
  }, []);

  useEffect(() => {
    const fetchSeperateEmails = async () => {
      try {
        const response = await axios.get(`${backEndURL}/seperateEmails`);
        if (response.status === 200) {
          const sessions = response.data;
          setAttendedEmails(sessions.map(session => session.userEmail));
          setConductedEmails(sessions.map(session => session.mentorEmail));
        }
      } catch (error) {
        console.error("Error fetching attended and conducted emails:", error);
      }
    };
    fetchSeperateEmails();
  }, []);

  const filteredMeetings = meetings && conductedEmails
    ? meetings.filter((meeting) =>
        meeting.attendees &&
        meeting.attendees.some(
          (attendee) => conductedEmails.includes(attendee) && attendee === userEmail
        )
      )
    : []; // Fallback to empty array if undefined

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
                    className="mb-0 nav_topic_mentro_page "
                  >
                    Attended
                  </p>
                  <p
                    onClick={() => {
                      window.location.href = "/conducted";
                    }}
                    className="mb-0 nav_topic_mentro_page select_sedulenav"
                  >
                    Conducted
                  </p>
                </div>
              </div>
              <div>
                <div className="vh-100 overflow-auto">
                  <div>
                    <div className="">
                      <div id="Conducted">
                        <div className="maintopic_atend">
                          <h5 className="">Number of Sessions Conducted</h5>
                          <h5 className="">{filteredMeetings.length}</h5>
                        </div>

                        {filteredMeetings.map((meeting) => (
                          <div className="session_box" key={meeting._id}>
                            <div className="combined-images">
                              {meeting.attendees.slice(0, 2).map((attendee) => (
                                <img
                                  key={attendee}
                                  src={userImages[attendee] || defaultProfilePic}
                                  alt="Attendee"
                                  className="attendee-image"
                                  onError={(e) => {
                                    console.error("Error loading image for", attendee);
                                    e.target.src = defaultProfilePic; // Fallback in case of an error
                                  }}
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
                                  {meeting.scheduledDate}
                                </div>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
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

export default ConductedHistory;
