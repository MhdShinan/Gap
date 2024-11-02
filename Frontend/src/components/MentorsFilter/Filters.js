import React, { useState, useEffect } from "react";
import "./Mentors.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Col from "react-bootstrap/Col";
import { BsStarFill, BsStar } from "react-icons/bs";
import prolog from "./img/pro1.png";
import pro2 from "./img/pro2.png";
import pro3 from "./img/pro3.png";
import pro4 from "./img/pro4.png";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import MentorProfile from "./MentorProfile";
import axios from "axios";
import { backEndURL, imageURL } from "../../backendUrl";
import userPic from "../HomePage/Img/user.png";
import Swal from "sweetalert2";

function Mentors() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [description, setDescription] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [institute, setInstitute] = useState("");
  const [degree, setDegree] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [position, setPosition] = useState("");
  const [empType, setEmpType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [locationType, setLocationType] = useState("");
  const [skills, setSkills] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [linkedinLink, setLinkedinLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [getInterest, setGetInterest] = useState("");
  const [about, setAbout] = useState("");

  const handleClose3 = () => {
    setShow3(false);
    setTitle("");
    setAddress("");
    setTelephone("");
    setGender("");
    setBirthday("");
    setDescription("");
    setPortfolioLink("");
  };
  const handleShow3 = () => setShow3(true);
  const [show3, setShow3] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    academicDetails: [],
    professionalDetails: [],
    socialMedia: [],
    fieldOfInterest: [],
  });

  useEffect(() => {
    getUserDetails(); // Fetch user details on component mount
  }, []);

  const getUserDetails = async (e) => {
    await axios
      .get(`${backEndURL}/getUser`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const {
            firstName,
            lastName,
            email,
            academicDetails,
            professionalDetails,
            socialMedia,
            fieldOfInterest,
          } = response.data;
          localStorage.removeItem("User First Name");
          localStorage.setItem("User First Name", firstName);
          localStorage.removeItem("User Last Name");
          localStorage.setItem("User Last Name", lastName);
          localStorage.removeItem("User Email");
          localStorage.setItem("User Email", email);
          localStorage.removeItem("User Academic Details");
          localStorage.setItem(
            "User Academic Details",
            JSON.stringify(academicDetails)
          );

          if (
            (academicDetails && academicDetails.length > 0) ||
            (professionalDetails && professionalDetails.length > 0) ||
            (socialMedia && socialMedia.length > 0) ||
            (fieldOfInterest && fieldOfInterest.length > 0) ||
            (socialMedia && socialMedia.length > 0)
          ) {
            setUserData({
              firstName,
              lastName,
              email,
              academicDetails,
              professionalDetails,
              socialMedia,
              fieldOfInterest,
            });
          } else {
            setUserData({
              firstName,
              lastName,
              email,
              academicDetails: [],
              professionalDetails: [],
              socialMedia: [],
              fieldOfInterest: [],
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleSaveUserData = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${backEndURL}/personalDetails`,
        {
          title,
          address,
          telephone,
          gender,
          birthday,
          description,
          portfolioLink,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setTitle("");
          setAddress("");
          setTelephone("");
          setGender("");
          setBirthday("");
          setDescription("");
          setPortfolioLink("");
          handleClose3();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Success",
            text: "Personal details saved successfully",
          });
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "Personal details not saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const handleDeleteInterest = (id) => {
    axios
      .delete(`${backEndURL}/deleteInterest/${id}`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // Filter out the deleted interest from userData.fieldOfInterest
          const updatedFieldOfInterest = userData.fieldOfInterest.filter(
            (item) => item.id !== id
          );

          // Update the userData state to reflect the changes
          setUserData((prevState) => ({
            ...prevState,
            fieldOfInterest: updatedFieldOfInterest,
          }));
          getUserDetails();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Successfull",
            text: "Interest Details Deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "Some Error Occured",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting interest:", error);
      });
  };

  const [isVisible, setIsVisible] = useState(null);
  const [visibleProfileIndex, setVisibleProfileIndex] = useState(null);


  // New state to store the selected mentor's email and ID

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedMentorId, setSelectedMentorId] = useState(null);

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${backEndURL}/mentorDetails`);

        console.log("Mentor Details:", response.data.mentors); // Log fetched mentors

        setMentors(response.data.mentors);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error); // Log error details
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    const navbar = document.getElementById("mySidebar");
    const screenWidth = window.innerWidth;

    // Check if the screen width is less than 1250px (responsive view)
    if (screenWidth < 1250) {
      navbar.style.display = "none"; // Hide navbar in responsive view
    } else {
      navbar.style.display = "block"; // Show navbar in desktop view
    }
  }, []);

  const handleViewProfileClick = (index, email, id) => {
    setVisibleProfileIndex(visibleProfileIndex === index ? null : index);
    setSelectedEmail(email); // Update the selectedEmail state with the mentor's email
    setSelectedMentorId(id); // Update the selectedMentorId state with the mentor's ID
    console.log("Selected Mentor ID:", id); // Optional: log the selected mentor's ID
    sessionStorage.setItem("selectedMentorEmail", email)
    sessionStorage.setItem("selectedMentorId", id)

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
            <div
              className="main-box"
              style={{
                border: "2px solid #63636380",
                width: "100%",
                height: "auto",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              {/* Content goes here */}
              {mentors &&
                mentors.map((mentor, index) => (
                  <div className="card" key={index}>
                    <div className="d-md-flex">
                      <Col xs={12} md={2} className="mx-auto">
                        <img
                          src={
                            mentor.profilePicture
                              ? `${imageURL}/${mentor.profilePicture}`
                              : userPic
                          }
                          alt="propic"
                          className="imgr"
                        />
                      </Col>

                      <div className="card-body d-md-flex">
                        <div className="text-section-mentors">
                          <h5 className="card-title fw-bold">
                            {mentor.firstName} {mentor.lastName}
                          </h5>

                          <div className="card-para">
                            <p className="card-para" style={{ margin: 0 }}>
                              {mentor.professionalDetails
                                ? `${mentor.professionalDetails?.position} at ${mentor.professionalDetails?.companyName}`
                                : "Not available"}
                            </p>
                          </div>

                          <div className="container mt-3" style={{ margin: 0, padding: 0 }}>
                            <div className="d-inline-block" style={{ margin: 0 }}>
                              {/* Check if fieldOfInterest has at least one interest */}
                              {mentor.fieldOfInterest && mentor.fieldOfInterest.length > 0 ? (
                                <>
                                  {mentor.fieldOfInterest.map((interest, idx) => (
                                    <button
                                      className="pbtn"
                                      key={idx}
                                      style={{ margin: "0 8px" }} 
                                    >
                                      {interest.interest}
                                    </button>
                                  ))}
                                </>
                              ) : (
                                <button className="pbtn">No Interest</button> // Fallback if no interests are available
                              )}
                            </div>
                          </div>

                        </div>

                        {/* View Profile Section */}
                        <div className="ms-md-auto d-md-flex align-items-end">
                          <div className="box d-flex align-items-center view-btn">
                            <button
                              className="custom-button21 custom-button-reset my-1 my-sm-3 t"
                              type="submit"
                              onClick={() =>
                                handleViewProfileClick(index, mentor.email, mentor._id)
                              }
                            >
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Display the selected profile details */}
                    {visibleProfileIndex === index && (
                      <div className="profile-text">
                        <MentorProfile mentor={mentor} mentorId={mentor._id} />
                      </div>
                    )}
                  </div>
                ))}


              {/* Optionally display the selected email and ID */}
              {/* {selectedEmail && selectedMentorId && (
                <div className="mt-4">
                  <h5>Selected Mentor Email: {selectedEmail}</h5>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mentors;
