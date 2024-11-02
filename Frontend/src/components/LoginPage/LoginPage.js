import React from "react";
import "../LoginPage/LoginPage.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register_image from "../Register/img/register.png";
import InputGroup from "react-bootstrap/InputGroup";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { backEndURL } from "../../backendUrl";
import Swal from "sweetalert2";
import Google_image from "./Img/google.png";
import { jwtDecode } from "jwt-decode";
import useEnterKeyListener from "../KeyEvent/KeyEvent"; // <-- Import the new listener

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(""); // Track form errors
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!username || !password) {
      setError("Username and password are required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!validateForm()) {
      return; // Stop submission if form is not valid
    }

    setValidated(true);

    await axios
      .post(`${backEndURL}/login`, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.status === "ok") {
          const token = response.data.token;
          localStorage.setItem("jwtToken", token);

          const decodedToken = jwtDecode(token);
          const userID = decodedToken.userID;
          localStorage.setItem("userID", userID);

          getUserName();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            iconColor: "#4BB543",
            timer: 2000,
          });
          navigate("/home");
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid Username or Password",
            showConfirmButton: false,
            iconColor: "#FF0000",
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log("Login error: ", error);
      });
  };

  const getUserName = async () => {
    await axios
      .get(`${backEndURL}/getUser`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const firstName = response.data.firstName;
          const lastName = response.data.lastName;
          localStorage.setItem("firstName", firstName);
          localStorage.setItem("lastName", lastName);
        }
      });
  };

  const googleAuth = () => {
    window.open("http://localhost:3001/auth/google/callback", "_self");
  };

  // Use the Enter key listener
  useEnterKeyListener(handleSubmit); // <-- Added this line

  return (
    <>
      <section className="newwitchg">
        <div className="container-fluid container-fluidreg">
          <div className="">
            <div className="row bxbxsetlog fadeInUp">
              <div className="col-lg-5 custom-bglog align-items-center justify-content-center">
                <div className="text-center">
                  <img
                    src={Register_image}
                    alt="Log Img"
                    className="img-fluid custom-image-LI"
                    style={{ maxHeight: "100%", width: "100%" }}
                  />
                </div>
              </div>
              <div className="col-lg-6 overflow-auto">
                <br />
                <div className="responsive-border-log-reg">
                  <h1 className="text-center mb-5 mt-5">Login to Account</h1>
                  <div className="row justify-content-center">
                    <div className="col-lg-9 sitewyey-log">
                      <div className="form-outline">
                        <br />
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                          <Form.Group controlId="validationCustomUsername">
                            <InputGroup hasValidation>
                              <Form.Control
                                type="text"
                                placeholder="Username or Email"
                                style={{ textTransform: "none" }}
                                aria-describedby="inputGroupPrepend"
                                required
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                              />
                              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                          <br />

                          <Form.Group controlId="validationCustomUsername">
                            <InputGroup hasValidation>
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                aria-describedby="passwordHelpBlock2"
                                id="inputConfirmPassword"
                                style={{ textTransform: "none" }}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <InputGroup.Text
                                id="passwordHelpBlock"
                                onClick={togglePasswordVisibility}
                              >
                                {!showPassword ? (
                                  <HiOutlineEyeOff />
                                ) : (
                                  <HiOutlineEye />
                                )}
                              </InputGroup.Text>
                              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Form>
                      </div>
                      <h5
                        className="mb-4 mt-2 custom-text-FP ore"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          window.location.href = "/forgotPassword";
                        }}
                      >
                        Forgot password?
                      </h5>
                      <div className="text-center">
                        <button
                          className="custom-button2rtyu my-1 my-sm-3"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Login
                        </button>
                      </div>
                      {error && <p className="text-danger">{error}</p>} {/* Display error */}
                      {
                        // <div className="text-center mb-4">
                        //   <h4 className="mb-4 ore">Or, login with</h4>
                        //   <div className="" onClick={googleAuth}>
                        //     <img src={Google_image} alt="Image1" />
                        //   </div>
                        // </div>
                      }

                      <h6 className="custom-text-AR ore">
                        Don't have an account?{" "}
                        <span
                          style={{ cursor: "pointer", color: "blue" }}
                          onClick={() => {
                            window.location.href = "/register";
                          }}
                        >
                          Register
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
