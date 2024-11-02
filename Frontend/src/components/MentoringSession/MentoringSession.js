import React, { useEffect, useState } from "react";
import "./MentoringSession.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsCalendar2DateFill } from "react-icons/bs";
import prolog from "./img/pro1.png";
import { IoTime } from "react-icons/io5";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { backEndURL , imageURL  } from "../../backendUrl";
import axios from "axios";
import Swal from "sweetalert2";
import Bxlg from "./img/bxlg.png";
import { Link } from "react-router-dom";

function MentoringSession() {
  const [selectedTab, setSelectedTab] = useState("Requested");
  const [sessions, setSessions] = useState([]); // State to store fetched session data
  const [declinedSessions, setDeclinedSessions] = useState([]);
  const [acceptedSessions, setAcceptedSessions] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userImages, setUserImages] = useState({});

  // Fetch session data from the backend
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve the user email from local storage
      const userEmail = sessionStorage.getItem("userEmail"); // Ensure the key matches what you're storing

      if (!userEmail) {
        console.log("No user email found in local storage.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3001/api/sessions/email/${userEmail}`
        ); // Make API call with userEmail
        setSessions(response.data); // Update the state with fetched sessions
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchData(); // Call the fetch function

    // Responsive navbar logic
    const navbar = document.getElementById("mySidebar");
    const screenWidth = window.innerWidth;
    if (screenWidth < 1250) {
      navbar.style.display = "none";
    } else {
      navbar.style.display = "block";
    }
  }, []);

  useEffect(() => {
    const fetchDeclinedSessions = async () => {
      // Retrieve the user email from local storage
      const userEmail = sessionStorage.getItem("userEmail"); // Ensure this key is correct
      if (!userEmail) {
        console.log("No user email found in local storage.");
        return;
      }

      try {
        // Update the URL to use port 3001 for the backend
        const response = await fetch(
          `http://localhost:3001/api/sessions/declined/${userEmail}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // Check if the response is ok
        }

        const data = await response.json();
        setDeclinedSessions(data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching declined sessions:", error);
      }
    };

    fetchDeclinedSessions();
  }, []);

  useEffect(() => {
    const fetchAcceptedSessions = async () => {
      // Retrieve the user email from local storage
      const userEmail = sessionStorage.getItem("userEmail") // Ensure the key matches what you're storing

      if (!userEmail) {
        console.log("No user email found in local storage.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3001/api/sessions/accepted/${userEmail}` // Pass userEmail to the API
        );
        setAcceptedSessions(response.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching accepted sessions:", error);
      }
    };

    fetchAcceptedSessions(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on component mount

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
  const handleDelete = async (id) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#FFC107",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    // If the user confirmed, proceed with deletion
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/sessions/declined/${id}`);
        setDeclinedSessions(
          declinedSessions.filter((session) => session._id !== id)
        );
        // Show success message
        Swal.fire({
          position: "center",
          iconColor: "#4BB543",
          icon: "success",
          title: "Deleted!",
          text: "Your Session Has Been Deleted.",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error("Error deleting declined session:", error);
        // Show error message
        Swal.fire({
          position: "center",
          iconColor: "#FF0000",
          icon: "error",
          title: "Faield",
          text: "There Was An Error Deleting The Session.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  const handleDeleteNew = async (id) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      iconColor: "#FFC107",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes,Cancel it!",
    });

    // If the user confirmed, proceed with deletion
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/sessions/${id}`); // Make delete request
        setSessions(sessions.filter((session) => session._id !== id)); // Update state after deletion

        // Show success message
        Swal.fire({
          position: "center",
          iconColor: "#4BB543",
          icon: "success",
          title: "Deleted!",
          text: "The session has been deleted By the user.",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error("Error deleting session:", error);

        // Show error message
        Swal.fire({
          position: "center",
          iconColor: "#FF0000",
          icon: "error",
          title: "Faield",
          text: "There Was An Error Deleting The Session.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backEndURL}/getUser`, {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        });

        sessionStorage.setItem("userEmail", response.data.email);
        sessionStorage.setItem("isMentor", response.data.isMentor);
        sessionStorage.setItem("profilePicture", response.data.profilePicture);


      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserData();
  }, []);

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
            <div className="ful_box_sesion_page">
              <div className="navbar_sedule">
                <div>
                  <div className="navbar_mentor_page">
                    <p
                      onClick={() => {
                        window.location.href = "/mentoringSession";
                      }}
                      className="mb-0 nav_topic_mentro_page select_sedulenav"
                    >
                      Requested
                    </p>
                    <p
                      onClick={() => {
                        const isMentor =
                          sessionStorage.getItem("isMentor") === "true"; // Retrieve and check mentor status
                        if (isMentor) {
                          window.location.href = "/receviedmentor";
                          window.location.href = `${backEndURL}/google`; // Navigate to Google if mentor
                        } else {
                          window.location.href = "/weeklySchedulePageNotMenter"; // Navigate to a different page if not mentor
                        }
                      }}
                      className="mb-0 nav_topic_mentro_page"
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
                    <div>
                      {/*Requested Section Start */}
                      <div id="Requested">
                        {acceptedSessions.length === 0 &&
                          sessions.length === 0 &&
                          declinedSessions.length === 0 ? (
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
                                    “It appears that you have not scheduled a
                                    mentoring session. If you are looking for
                                    the best mentors, click ‘Mentors’ to find
                                    them.”
                                  </p>
                                  <Link to="/mentorsFilter">
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
                                  </Link>
                                </div>
                                <br />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>

                            <div>
                              {acceptedSessions.map((session) => (
                                <div className="session_box" key={session._id}>
                                  <div>
                                    <img
                                       src={userImages[session.userEmail] || prolog}
                                      rounded
                                      alt="User profile"
                                      className="img_profile_sesion"
                                      onError={(e) => (e.target.src = prolog)}
                                    />
                                  </div>
                                  <div className="border_Ad_sesin">
                                    <div>
                                      <div>
                                        <h5 className="name_sesion">
                                          {session.userName}
                                        </h5>
                                      </div>
                                      <button className="btn_reques_accept">
                                        Request Approved
                                      </button>
                                      <p className="sub_para_sesion">
                                        {session.summary}
                                      </p>
                                      <p>{session.description}</p>
                                      <div className="date_time_sesion">
                                        <div className="date_time_sub_sesion">
                                          <BsCalendar2DateFill />
                                          {new Date(
                                            session.date
                                          ).toLocaleDateString()}{" "}
                                          |{" "}
                                          {new Date(
                                            session.date
                                          ).toLocaleString("en-US", {
                                            weekday: "long",
                                          })}
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
                                  <div className="border_Ad_sesin">
                                    <p>
                                      <div>
                                       
                                      </div>
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="session_container">
                              {sessions.map((session) => (
                                <div className="session_box" key={session._id}>
                                  <div>
                                    <img
                                       src={userImages[session.userEmail] || prolog}
                                       rounded
                                      alt="propic"
                                      className="img_profile_sesion"
                                    />
                                  </div>
                                  <div className="border_Ad_sesin">
                                    <div>
                                      <h5 className="name_sesion">
                                        {session.userName}
                                      </h5>
                                      <button className="btn_reques_pendin">
                                        Request Pending
                                      </button>
                                      <p className="sub_para_sesion">
                                        {session.summary}
                                      </p>
                                      <p>{session.description}</p>
                                      <div className="date_time_sesion">
                                        <div className="date_time_sub_sesion">
                                          <BsCalendar2DateFill /> {session.date}
                                        </div>
                                        <div className="date_time_sub_sesion">
                                          <IoTime /> {session.startTime} -{" "}
                                          {session.endTime}
                                        </div>
                                      </div>
                                      <p className="redclor">
                                        You will be contacted directly by the
                                        admin regarding the payment.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="border_Ad_sesin">
                                    
                                    <button
                                      className="cnsel_btn_sesion"
                                      onClick={() =>
                                        handleDeleteNew(session._id)
                                      }
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div>
                              {declinedSessions.length > 0 ? (
                                declinedSessions.map((session, index) => (
                                  <div className="session_box" key={index}>
                                    <div>
                                      <img
                                         src={userImages[session.userEmail] || prolog}
                                         rounded
                
                                        alt="propic"
                                        className="img_profile_sesion"
                                      />
                                    </div>
                                    <div className="border_Ad_sesin">
                                      <div>
                                        <h5 className="name_sesion">
                                          {session.userName}
                                        </h5>
                                        <button className="btn_reques_delete">
                                          Request Declined
                                        </button>
                                        <p className="sub_para_sesion">
                                          Expectation of this mentoring session
                                        </p>
                                        <p>{session.description}</p>
                                        <div className="date_time_sesion">
                                          <div className="date_time_sub_sesion">
                                            <BsCalendar2DateFill />
                                            {new Date(
                                              session.date
                                            ).toLocaleDateString()}{" "}
                                            |{" "}
                                            {new Date(
                                              session.date
                                            ).toLocaleString("en-US", {
                                              weekday: "long",
                                            })}
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
                                    <div className="border_Ad_sesin">
                                      <div>
                                       
                                      </div>
                                      <button
                                        className="cnsel_btn_sesion"
                                        onClick={() =>
                                          handleDelete(session._id)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p></p> // Optional fallback if there are no declined sessions
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      {/* Requested Section End*/}
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

export default MentoringSession;
