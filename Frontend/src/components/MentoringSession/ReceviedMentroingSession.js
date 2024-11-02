import React, { useEffect, useState } from "react";
import "./MentoringSession.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsCalendar2DateFill } from "react-icons/bs";
import prolog from "./img/pro1.png";
import { IoTime } from "react-icons/io5";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { backEndURL, imageURL } from "../../backendUrl";
import Swal from "sweetalert2";
import Bxlg from "./img/bxlg.png";
// Convert start and end time to ISO format
function convertToISO(data) {
  const { start, end, date } = data;

  // Create new Date objects by combining time with the date
  const startDateTime = new Date(`${date}T${start}:00`); // Adding seconds for ISO format
  const endDateTime = new Date(`${date}T${end}:00`); // Adding seconds for ISO format

  // Convert to ISO string
  const startISO = startDateTime.toISOString();
  const endISO = endDateTime.toISOString();

  return {
    start: startISO,
    end: endISO,
  };
}
function ReceviedMentroingSession() {
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

    // Handle OAuth redirect and store the token
    handleGoogleOAuthRedirect();
  }, []);

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

  const handleGoogleOAuthRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      try {
        const response = await axios.get(
          `${backEndURL}/google/redirect?code=${code}`
        );
        const token = response.data.tokens;

        // Store the token in localStorage
        localStorage.setItem("googleAuthToken", token.access_token);

        console.log("Logged in and token stored!");
      } catch (error) {
        console.error("Error handling Google OAuth redirect:", error);
      }
    }
  };

  const handleSubmit = async (session) => {
    const token = localStorage.getItem("googleAuthToken");

    if (!token) {
      // Show the confirmation dialog first
      Swal.fire({
        title: "Are You Sure?",
        text: "You Won't Be Able To Revert This!",
        icon: "warning",
        iconColor: "#FFC107",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accept!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Call your meetingSchedule function
          // meetingSchedule();

          // Optionally show a deletion success message
          Swal.fire({
            title: " Accepted!",
            text: "Your Meeting has been Scheduled.",
            icon: "success",
            iconColor: "#4BB543",
          }).then(() => {
            // Redirect to the Google OAuth endpoint after showing the success message
            window.location.href = `${backEndURL}/google`;
            meetingSchedule(token, session);
            statusAccept(session);
          });
        }
      });
    } else {
      // Proceed with the existing logic if the token is available

      meetingSchedule(token, session);
    }
  };

  const statusAccept = async (session) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/sessions/accept/${session._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.message);

      // Show success message
      Swal.fire({
        position: "center",
        iconColor: "#4BB543",
        icon: "success",
        title: "Accepted!",
        text: "The session has been successfully accepted.",
        showConfirmButton: false,
        timer: 1500
      });

      // Optionally refresh the session data or handle UI updates
    } catch (error) {
      console.error("Error accepting session:", error);
    }
  };
  const meetingSchedule = async (token, session) => {
    const scheduledStartTime = session.startTime;
    const scheduledEndTime = session.endTime;
    const scheduledDate = session.date;
    // Convert start and end time to ISO format using the convertToISO function
    // const { start, end } = convertToISO({
    //   start: session.startTime,
    //   end: session.endTime,
    //   date: session.date
    // });

    const eventData = {
      summary: session.summary,
      description: session.description, //"Super man in the House of Haven",
      start: "2024-08-13T10:00:00-07:00",
      end: "2024-08-13T11:00:00-09:00",
      attendees: [{ email: session.userEmail }, { email: session.mentorEmail }],
      userName: session.userName,
      academicDetails: session.academicDetails,
      scheduledStartTime, //"5.00",
      scheduledEndTime, //"6.00pm",
      scheduledDate, //"2024-12-12",
      userEmail: session.userEmail
    };

    try {
      // Pass the token to the backend when calling the scheduleEvent API
      const response = await axios.post(
        "http://localhost:3001/api/scheduleEvent",
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );

      console.log("Event scheduled successfully:", response.data);
    } catch (error) {
      console.error("Error scheduling event:", error);
    }
  };

  const [sessionData, setSessionData] = useState([]); // Initialize as an empty array
  const [emails, setEmails] = useState([
    "",
    sessionStorage.getItem("userEmail"),
  ]); // Example emails

  useEffect(() => {
    // Fetch user email from local storage
    const userEmail = sessionStorage.getItem("userEmail");
    // Post data to the backend
    axios
      .post("http://localhost:3001/api/sessionsReceived", { emails })
      .then((response) => {
        // Log the response to see its structure
        console.log("API Response:", response.data);

        // Check if the response is an array
        if (Array.isArray(response.data)) {
          // Filter the session data where mentorEmail equals userEmail
          const filteredSessions = response.data.filter(
            (session) => session.mentorEmail === userEmail
          );

          // Set the session data to the filtered sessions
          setSessionData(filteredSessions);
        } else {
          // If response is not an array, set an empty array
          setSessionData([]);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the Session data!", error);
      });
  }, [emails]); // Ensure the request is made when `emails` changes

  const handleDecline = async (sessionId) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This Session Will Be Marked As Declined!",
      icon: "warning",
      iconColor: "#FFC107",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes,decline!",
    });

    // If the user confirmed, proceed with the decline action
    if (result.isConfirmed) {
      Swal.fire({
        position: "center",
        iconColor: "#4BB543",
        icon: "success",
        title: "Your Session has been Declined!",
        showConfirmButton: false,
        timer: 1500
      });
      try {
        const response = await axios.post(
          `http://localhost:3001/api/sessions/decline/${sessionId}`
        );
        // Remove the declined session from the frontend state
        setSessionData(
          sessionData.filter((session) => session._id !== sessionId)
        );

      } catch (error) {
        console.error("Error declining session:", error);

        // Show error message
        Swal.fire({
          position: "center",
          iconColor: "#FF0000",
          icon: "error",
          title: "There Was An Error Declining The Session.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

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
              <br />
              <br />
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
                        className="mb-0 nav_topic_mentro_page select_sedulenav"
                      >
                        Received
                      </p>
                      <p
                        onClick={() => {
                          window.location.href = "/schduldmentor";
                        }}
                        className="mb-0 nav_topic_mentro_page"
                      >
                        Scheduled
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="vh-100 overflow-auto">
                    <div>
                      <div className="">
                        {/* Check if there are any received sessions */}
                        {sessionData.length > 0 ? (
                          // Received Section Start
                          sessionData.map((session, index) => (
                            <div id="Received" key={index}>
                              <div className="session_box_update_border">
                                <div className="session_box_update">
                                  <div>
                                    <img
                                      src={userImages[session.userEmail] || prolog}
                                      rounded
                                      alt="propic"
                                      className="img_profile_sesion"
                                      onError={(e) => (e.target.src = prolog)}
                                    />
                                  </div>
                                  <div className="">
                                    <div className="">
                                      <div className="">
                                        <h5 className="name_sesion">
                                          {session.userName}
                                        </h5>
                                      </div>
                                      <p className="bio_sedule">
                                        {session.academicDetails}
                                      </p>
                                      <p className="sub_para_sesion">
                                        {session.summary}
                                      </p>
                                      <p className="">{session.description}</p>
                                      <div className="date_time_sesion">
                                        <div className="date_time_sub_sesion">
                                          <BsCalendar2DateFill />
                                          {session.date}
                                        </div>
                                        <div className="date_time_sub_sesion">
                                          <IoTime />
                                          {session.startTime} -{" "}
                                          {session.endTime}
                                        </div>
                                      </div>
                                      <p className="redclor">
                                        You will be contacted directly by the
                                        admin regarding the payment.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="btnset">
                                    <button
                                      className="aceptbtn"
                                      onClick={() => handleSubmit(session)}
                                    >
                                      Accept
                                    </button>
                                    <button
                                      className="deslin_btn"
                                      onClick={() => handleDecline(session._id)}
                                    >
                                      Decline
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          // No received sessions message
                          <div className="Cardsection">
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
                                <div className="text-center p-4 mt-3">
                                  <img
                                    src={Bxlg} // Ensure Bxlg is defined
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
                                    “Seems like you haven't received any
                                    sessions yet”
                                  </p>
                                </div>
                                <br />
                              </div>
                            </div>
                          </div>
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
    </div>
  );
}

export default ReceviedMentroingSession;
