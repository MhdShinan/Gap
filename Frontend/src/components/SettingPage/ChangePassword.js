import React, { useState, useEffect } from "react";
import "./SettingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { backEndURL } from "../../backendUrl";
import axios from "axios";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import Swal from 'sweetalert2';
import useEnterKeyListener from "../KeyEvent/KeyEvent"; // <-- Import the new listener

function ChangePassword() {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const confirmPasswordMatch = () => {
    return newPassword === confirmPassword;
  };
  
  const handleChangePassword = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${backEndURL}/changePassword`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      );
  
      if (response.data.status === "ok") {
        Swal.fire({
          icon: "success",
          title: "Successful",
          text: "Password changed successfully",
          iconColor: "#4BB543"
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        window.location.href = "/login";
      } else if (response.data.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Incorrect Password",
          text: "The current password is incorrect. Please try again.",
          iconColor: "#FF0000"
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Password change failed",
          iconColor: "#FFC107"
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error (incorrect current password)
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Current password is incorrect or token is invalid. Please try again.",
          iconColor: "#FF0000"
        });
      } else {
        // Handle other errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while changing the password. Please try again later.",
          iconColor: "#FF0000"
        });
      }
      console.error("Error:", error);
    }
  };
  
  
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

  // Use the Enter key listener
  useEnterKeyListener(handleChangePassword); // <-- Added this line

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="nav-colum" id="mySidebar">
            <SideBar />
          </div>
          <div className="col-lg-9 vh-100 overflow-auto">
            <NavBar />
            <br></br>
            <br></br>
            <div className="SettingPage-MainBox fadeInUp">
              <div id="nav" className="nave">
                <div>
                  <h5>
                    <a
                      href="#About"
                      className="navtpic333 nvtpicnew"
                      onClick={() => {
                        window.location.href = "/settings";
                      }}
                    >
                      About Us
                    </a>
                    <a
                      href="#d"
                      className="navtpic333 nvtpicnew nvtpicnewabout"
                      onClick={() => {
                        window.location.href = "/changePass";
                      }}
                    >
                      Change Password
                    </a>
                    <a
                      href="#DeleteAccount"
                      className="navtpic333 nvtpicnew"
                      onClick={() => {
                        window.location.href = "/settingDeleteAccount";
                      }}
                    >
                      Delete Account
                    </a>
                    <a
                      href="#ContactUs"
                      className="navtpic333 nvtpicnew"
                      onClick={() => {
                        window.location.href = "/settingContactUs";
                      }}
                    >
                      Contact Us
                    </a>
                  </h5>
                </div>
              </div>
              <div>
                <div className="col-lg-12 vh-100 overflow-auto">
                  <div>
                    <div className="fullcon">
                      {/*Change Password Section Start*/}
                      <div className="main-box" id="ChangePassword">
                        <div class="Cardsection">
                          <div className="card">
                            <h3 className="card-title fw-bold title-setting">
                              Change your password
                            </h3>
                            <p className="para1-setting">
                              You Should Enter at Least 6 Characters
                            </p>
                            <br></br>
                            <div className="passbox">
                              <InputGroup className="mb-3">
                                <Form.Control
                                  size="medium"
                                  value={currentPassword}
                                  type={showPassword3 ? "text" : "password"}
                                  id="inputPassword"
                                  style={{ textTransform: "none" }}
                                  aria-describedby="passwordHelpBlock1"
                                  placeholder="Current password"
                                  onChange={handleCurrentPasswordChange}
                                />
                                <InputGroup.Text
                                  id="passwordHelpBlock1"
                                  onClick={togglePasswordVisibility3}
                                >
                                  {showPassword3 ? (

                                    <HiOutlineEye />
                                  ) : (
                                    <HiOutlineEyeOff />
                                  )}
                                </InputGroup.Text>
                              </InputGroup>
                              <InputGroup className="mb-3">
                                <Form.Control
                                  size="medium"
                                  value={newPassword}
                                  type={showPassword ? "text" : "password"}
                                  id="inputPassword"
                                  aria-describedby="passwordHelpBlock2"
                                  placeholder="New Password"
                                  style={{ textTransform: "none" }}
                                  onChange={handleNewPasswordChange}
                                />
                                <InputGroup.Text
                                  id="passwordHelpBlock2"
                                  onClick={togglePasswordVisibility}
                                >
                                  {showPassword ? (
                                    <HiOutlineEye />
                                  ) : (

                                    <HiOutlineEyeOff />
                                  )}
                                </InputGroup.Text>
                              </InputGroup>

                              <InputGroup className="mb-3">
                                <Form.Control
                                  size="medium"
                                  value={confirmPassword}
                                  type={showPassword2 ? "text" : "password"}
                                  id="inputConfirmPassword"
                                  aria-describedby="passwordHelpBlock3"
                                  placeholder="Confirm New Password"
                                  style={{ textTransform: "none" }}
                                  onChange={handleConfirmPasswordChange}
                                />
                                <InputGroup.Text
                                  id="passwordHelpBlock3"
                                  onClick={togglePasswordVisibility2}
                                >
                                  {showPassword2 ? (

                                    <HiOutlineEye />
                                  ) : (
                                    <HiOutlineEyeOff />
                                  )}
                                </InputGroup.Text>
                              </InputGroup>
                              {confirmPasswordMatch() ? (
                                <p></p>
                              ) : (
                                <p>Passwords do not match.</p>
                              )}

                              <a
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  window.location.href = "/forgotPassword";
                                }}
                                className="fogotpss"
                              >
                                Forgot password?
                              </a>
                              <button
                                className="changpasss"
                                onClick={handleChangePassword}
                              >
                                Change Password
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*Change Password Section End */}
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

export default ChangePassword;
