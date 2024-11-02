import React, { useState, useEffect } from "react";
import "./SettingPage.css";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import * as formik from "formik";
import * as yup from "yup";
import err from "./img/err.png";
import { backEndURL } from "../../backendUrl";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import Swal from 'sweetalert2';

function DeleteAccount() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    password: yup.string().required(),
  });

  const [passwordToDelete, setPasswordToDelete] = useState("");

  const [showPassword3, setShowPassword3] = useState(false);
  /*LogOut Model*/
  const [show, setShow] = useState(false);
  /*LogOut Model*/
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${backEndURL}/deleteAccount`,
        {
          password: passwordToDelete,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "error") {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "Incorrect password",
          });
          handleClose4();
        } else if (response.data.status === "ok") {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("firstName");
          localStorage.removeItem("lastName");
          window.location.href = "/";
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "Account deletion failed",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
                      className="navtpic333 nvtpicnew "
                      onClick={() => {
                        window.location.href = "/settings";
                      }}
                    >
                      About Us
                    </a>
                    <a
                      href="#d"
                      className="navtpic333 nvtpicnew "
                      onClick={() => {
                        window.location.href = "/changePass";
                      }}
                    >
                      Change Password
                    </a>
                    <a
                      href="#DeleteAccount"
                      className="navtpic333 nvtpicnew nvtpicnewabout"
                      onClick={() => {
                        window.location.href = "/settingDeleteAccount";
                      }}
                    >
                      Delete Account
                    </a>
                    <a
                      href="#ContactUs"
                      className="navtpic333 nvtpicnew "
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
                      {/*Delete Account Section Start*/}
                      <div className="main-box" id="DeleteAccount">
                        <div class="Cardsection">
                          <div className="card">
                            <h3 className="card-title fw-bold">
                              Are you sure you want to delete your account ?
                            </h3>
                            <p className="para1-setting ">
                              By deleting your account you will lose your
                              progress
                            </p>
                            <br></br>

                            <div className="mb-3">
                              <p className="why">
                                Why do you want to delete your account ?
                              </p>
                              <Form.Check
                                type={"checkbox"}
                                id={""}
                                label={"Privacy Concern"}
                              />
                              <Form.Check
                                type={"checkbox"}
                                id={""}
                                label={"Personal matter"}
                              />
                              <Form.Check
                                type={"checkbox"}
                                id={""}
                                label={"No Longer Need the App"}
                              />
                              <Form.Check
                                type={"checkbox"}
                                id={""}
                                label={"Not satisfied with App Features"}
                              />
                              <Form.Check
                                type={"checkbox"}
                                id={""}
                                label={"Found a Better Alternative"}
                              />
                              <Form.Check
                                type={"checkbox"}
                                id={""}
                                label={"Other (Please Specify):"}
                              />
                            </div>

                            <p href="acb" className="detailssetpack">
                              When you delete your user account, please note
                              that you will lose:
                            </p>
                            <ul>
                              <li>Your progress.</li>
                              <li>All collected coins and rewards.</li>
                              <li>
                                Any stored data , including your profile
                                information and activity history.
                              </li>
                            </ul>
                            <div className="btndletacc">
                              {/*Delete Account Model Start */}
                              <Modal
                                size="lg"
                                show={show2}
                                onHide={handleClose2}
                                aria-labelledby="example-custom-modal-styling-title"
                                centered
                              >
                                <Modal.Header closeButton></Modal.Header>
                                <div
                                  style={{
                                    width: "95%",
                                    height: "auto",
                                    padding: "0px",
                                    borderRadius: "5px",
                                    margin: "0 0 50px 20px",
                                  }}
                                >
                                  <h5 className="dltactntpic">
                                    Delete Account
                                  </h5>
                                  <p className="dltactntpicpara">
                                    Are you sure you want to delete the account?
                                    You will not be able to undo it.
                                  </p>

                                  <Formik
                                    validationSchema={schema}
                                    onSubmit={console.log}
                                    initialValues={{
                                      city: "",
                                    }}
                                  >
                                    {({
                                      handleSubmit,
                                      handleChange,
                                      values,
                                      errors,
                                    }) => (
                                      <Form noValidate onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                          <Form.Group
                                            as={Col}
                                            md="6"
                                            controlId="validationFormik03"
                                          >
                                            <Form.Label className="tipparat">
                                              Please type your password to
                                              confirm
                                            </Form.Label>
                                            <td className="tdlnoty1lewen">
                                              {" "}
                                              <Form.Control
                                                type="text"
                                                className="pwtinpt"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={!!errors.password}
                                              />
                                              <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                              </Form.Control.Feedback>
                                            </td>
                                            <td className="tdlnoty1newr">
                                              <Button
                                                type="submit "
                                                className="pwtbtncong"
                                              >
                                                Confirm
                                              </Button>
                                            </td>
                                          </Form.Group>
                                        </Row>
                                      </Form>
                                    )}
                                  </Formik>
                                </div>
                              </Modal>
                              {/*Delete Account Model End */}
                              {/*Err Occurred Model Start */}
                              <Modal
                                size="medium"
                                show={show3}
                                onHide={handleClose3}
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                              >
                                <Modal.Body>
                                  <div className="text-center">
                                    <img
                                      src={err}
                                      alt="YourImage"
                                      className="img-fluid img-fluid 
                                      custom-image-ULock mx-auto d-block mb-1"
                                    />
                                    <h1 className="mb-4 errbtnclztpi">
                                      An Error occurred
                                    </h1>
                                    <h3 className="mb-5 errbtnclzpara">
                                      The password you entered is incorrect.
                                      Please try again.
                                    </h3>
                                    <button
                                      className="btn  custom-button-resetmew my-1 my-sm-3"
                                      type="submit"
                                    >
                                      OK
                                    </button>
                                  </div>
                                </Modal.Body>
                              </Modal>
                              {/*Err Occurred Model End */}
                              {/*Delete Model Start */}
                              <Modal
                                size="medium"
                                show={show4}
                                onHide={handleClose4}
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                              >
                                <Modal.Body>
                                  <div className="text-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="98"
                                      height="103"
                                      viewBox="0 0 98 103"
                                      fill="none"
                                    >
                                      <ellipse
                                        cx="49"
                                        cy="51.2889"
                                        rx="49"
                                        ry="51.2889"
                                        fill="white"
                                      />
                                      <path
                                        d="M96.5 51.2889C96.5 78.8519 75.1697 101.078 49 101.078C22.8303 101.078 1.5 78.8519 1.5 51.2889C1.5 23.726 22.8303 1.5 49 1.5C75.1697 1.5 96.5 23.726 96.5 51.2889Z"
                                        stroke="#CF1010"
                                        stroke-opacity="0.8"
                                        stroke-width="3"
                                      />
                                      <path
                                        d="M36.4601 74.1621C35.1171 74.1621 33.9671 73.664 33.0099 72.6678C32.0527 71.6716 31.575 70.4755 31.5766 69.0795V36.042H29.1349V30.9593H41.3435V28.418H55.9938V30.9593H68.2025V36.042H65.7607V69.0795C65.7607 70.4772 65.2822 71.6742 64.325 72.6704C63.3678 73.6666 62.2186 74.1638 60.8773 74.1621H36.4601ZM60.8773 36.042H36.4601V69.0795H60.8773V36.042ZM41.3435 63.9968H46.2269V41.1247H41.3435V63.9968ZM51.1104 63.9968H55.9938V41.1247H51.1104V63.9968Z"
                                        fill="#CF1010"
                                        fill-opacity="0.8"
                                      />
                                    </svg>
                                    <h1 className="mb-4 mt-4 errbtnclztpi">
                                      Delete Account
                                    </h1>
                                    <h3 className="mb-5 errbtnclzpara">
                                      The password you entered has been
                                      successfully confirmed, you can delete
                                      your account
                                    </h3>
                                    <button
                                      className="btn custom-button-resetmewdlete my-1 my-sm-3"
                                      type="submit"
                                      onClick={handleDeleteAccount}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </Modal.Body>
                              </Modal>
                              {/*Delete Model End */}
                              <div className="text-center centinpt">
                                <InputGroup
                                  className="mb-3"
                                  style={{ width: "100%" }}
                                >
                                  <Form.Control
                                    size="medium"
                                    type={showPassword3 ? "text" : "password"}
                                    id="inputPassword"
                                    style={{ textTransform: "none" }}
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Enter your password"
                                    onChange={(e) =>
                                      setPasswordToDelete(e.target.value)
                                    }
                                  />
                                  <InputGroup.Text
                                    id="passwordHelpBlock"
                                    onClick={togglePasswordVisibility3}
                                  >
                                    {showPassword3 ? (
                                      <HiOutlineEyeOff />
                                    ) : (
                                      <HiOutlineEye />
                                    )}
                                  </InputGroup.Text>
                                </InputGroup>
                              </div>

                              <button
                                className="btndlt"
                                onChange={handleShow4}
                                onClick={handleShow4}
                              >
                                Delete Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*Delete Account Section End */}
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

export default DeleteAccount;
