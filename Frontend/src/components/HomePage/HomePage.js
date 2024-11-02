import React, { useState, useEffect } from "react";
import Homepage_image from "../HomePage/Img/homepage.png";
import "../HomePage/Home.css";
import Level from "../SettingPage/img/level.png";
import userPic from "./Img/user.png";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { backEndURL, imageURL } from "../../backendUrl";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

const HomePage = () => {
  const [firstName, setFirstName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [recentMentors, setRecentMentor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);



  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    if (token) {
      const decoded = jwtDecode(token);
      setFirstName(decoded.firstName);
      setProfilePic(decoded.profilePhoto); // Set profile picture URL
      localStorage.setItem("jwtToken", token); // Store the token in localStorage
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/user'); // Adjust endpoint as necessary
        setUser(response.data);
        setProfilePic(response.data.profilePhoto); // Set profile picture URL from backend
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, []);

  // Extract token from URL and set user details
  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
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



  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${backEndURL}/recentMentors`);
        setRecentMentor(response.data.mentors);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backEndURL}/getUser`, {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        });

        sessionStorage.setItem("userId", response.data._id)
        sessionStorage.setItem("firstName", response.data.firstName);
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
            <NavBar profilePic={profilePic} />
            <div className="custom_Point fadeInUp">
              <div className="home-bx-one">
                <h4 className="hiname">Hi {firstName}!</h4>
                <h4 className="hipara">
                  Congratulations on earning points, <br />
                  Let's keep stepping forward!
                </h4>
                <div className="">
                  <img src={Level} alt="coint icon" className="coin_box" />
                </div>
              </div>
              <div className="home-bx-2">
                <img
                  src={Homepage_image}
                  alt="YourImage"
                  className="borderimg"
                  style={{ objectFit: "cover", width: "100%", height: "96%" }}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-4 fadeInUp">
              <h4>Recommended Mentors</h4>
              <div>
                <h6
                  className="View-more"
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => {
                    window.location.href = "/mentors";
                  }}
                >
                  <u>View More</u>
                </h6>
              </div>
            </div>
            <div className="card_list_home_metro">
              {recentMentors && recentMentors.length > 0 ? (
                recentMentors.map((mentor) => (
                  <div className="mentro_card_home fadeInUp" key={mentor._id}>
                    <div>
                      <img
                        alt="imguser"
                        className="img_home_bk"
                        variant="top"
                        src={
                          mentor.profilePicture
                            ? `${imageURL}/${mentor.profilePicture}`
                            : userPic
                        }
                      />
                      <div className="div_data_full_home">
                        <div className="name_lble">
                          {mentor.firstName} {mentor.lastName}
                        </div>
                        <div className="position_lble">
                          {mentor.professionalDetails?.position || "Not available"}
                          <div>
                            <button className="req_btn_crd" type="submit" onClick={() => {
                              window.location.href = "/mentorsFilter";
                            }}>
                              Request
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="fadeInUp">
                  <p>No Mentors</p>
                </div>
              )}
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
