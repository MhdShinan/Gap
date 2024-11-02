import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import { backEndURL, imageURL } from "../../backendUrl";
import Level from "../SettingPage/img/level.png";
import userPic from "../HomePage/Img/user.png";
import { FaRegBell } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import "../HomePage/Home.css";
import "./nav.css";

const NavBar = ({ profilePic }) => {
  const [firstName, setFirstName] = useState("");
  const [profile, setProfile] = useState(""); // Correct useState declaration
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mentorsList, setMentorsList] = useState([]);
  const [originalMentorsList, setOriginalMentorsList] = useState([]);
  const [highlightedName, setHighlightedName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedFirstName = sessionStorage.getItem("firstName");
    setFirstName(storedFirstName);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() !== "") {
      const filteredMentors = mentors.filter(
        (mentor) =>
          mentor.isMentor && // Check if the user is a mentor
          (mentor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
           mentor.lastName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setHighlightedName(query);
      setMentorsList(filteredMentors);
      setShowDropdown(true);
    } else {
      setHighlightedName("");
      setMentorsList(mentors);
      setShowDropdown(false);
    }
  };

  const handleSelectMentor = (mentorName) => {
    setSearchQuery(mentorName);
    setShowDropdown(false);
    window.location.href = "/mentorsFilter";
  };

  function nav_open() {
    document.getElementById("mySidebar").style.display = "block";
  }

  // Fetch mentors on component mount
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${backEndURL}/mentorDetails`);
        setMentors(response.data.mentors); // Assumes API returns a "mentors" array
        
      } catch (error) {
        setError("Error fetching data");
       
      }
    };

    fetchMentors();
  }, []);

  return (
    <div>
      <Navbar>
        <div className="">
          <div className="serchbox_brode ">
            <div className="search_box">
              <input
                className="serchbarnew"
                type="text"
                required
                placeholder="Find A Mentor... "
                value={searchQuery}
                onChange={handleSearch}
              />
              <IoMdSearch className="serchio" />
            </div>
          </div>
        </div>

        <Navbar.Brand
          href="#"
          className="d-flex align-items-center"
          style={{ marginLeft: "auto" }}
        >
          <img
            src={Level}
            width="60"
            height="40"
            className="d-inline-block "
            alt="React Bootstrap logo"
          />
          &nbsp;&nbsp;
          <div className="ml-auto d-flex align-items-center">
            <a href="/notification">
              <FaRegBell className="bell-nav" />
            </a>
            &nbsp;&nbsp;
            <img
              src={!profilePic ? userPic : profilePic}
              roundedCircle
              width="45"
              height="45"
              style={{ borderRadius: "100000px" }}
              className="d-inline-block"
              alt="Profile"
              onClick={() => {
                window.location.href = "/userProfile";
              }}
            />
          </div>
          <button className="mobile-toggle-btn togelbtn" onClick={nav_open}>
            ☰
          </button>
        </Navbar.Brand>
      </Navbar>
      {/* Navbar Temporary Add */}
      <div className="serchbox_brode_tem ">
        <div className="search_box">
          <input
            className="serchbarnew"
            type="text"
            required
            placeholder="Find A Mentor... "
            value={searchQuery}
            onChange={handleSearch}
          />
          <IoMdSearch className="serchio" />
        </div>
      </div>
      <div className="">
        {showDropdown && (
          <div className="box_drop fadeInUp">
            {mentorsList.map((mentor, index) => (
              <p
                className="itm_deop"
                key={index}
                onClick={() =>
                  handleSelectMentor(`${mentor.firstName} ${mentor.lastName}`)
                }
              >
                {mentor.firstName} {mentor.lastName}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
