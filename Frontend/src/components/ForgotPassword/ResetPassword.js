import React, { useState } from "react";
import "../ForgotPassword/ResetPassword.css";
import Register_image from "../Register/img/register.png";
import Password_image from "../ForgotPassword/Img/password.png";
import Unlock_image from "../ForgotPassword/Img/unlock.png";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import InputGroup from "react-bootstrap/InputGroup";

const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validated, setValidated] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const confirmPasswordMatch = () => {
    return password === confirmPassword;
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>
      <section className="newwitchg">
        <div className="container-fluid container-fluidreg">
          <div className="row bxbxset">
            <div className="col-lg-5 custom-bgregit align-items-center justify-content-center">
              <div className=" text-center">
                <img
                  src={Register_image}
                  alt="YourImage"
                  className="img-fluid custom-image-LI"
                  style={{ maxHeight: "100%", width: "100%" }}
                />
              </div>
            </div>
            <div className="col-lg-6 overflow-auto ">
              <img
                src={Unlock_image}
                alt="YourImage"
                className="img-fluid img-fluid custom-image-ULock mx-auto d-block"
              />
              <h1 className="mt-2 text-center">Create A New Password</h1>
              <div className="row justify-content-center">
                <div className="col-lg-9 sitewyey">
                  <div className="form-outline">
                    <br />

                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <Form.Group controlId="validationCustomUsername">
                        <InputGroup hasValidation>
                          <Form.Control
                            size="medium"
                            type={showPassword ? "text" : "password"}
                            id="inputPassword"
                            aria-describedby="passwordHelpBlock"
                            placeholder="Password"
                            style={{ textTransform: "none" }}
                            value={password}
                            required
                            onChange={handlePasswordChange}
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
                      <br></br>

                      <Form.Group controlId="validationCustomUsername">
                        <InputGroup hasValidation>
                          <Form.Control
                            size="medium"
                            type={showPassword2 ? "text" : "password"}
                            id="inputConfirmPassword"
                            aria-describedby="passwordHelpBlock"
                            style={{ textTransform: "none" }}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            required
                            onChange={handleConfirmPasswordChange}
                          />
                          <InputGroup.Text
                            id="passwordHelpBlock2"
                            onClick={togglePasswordVisibility2}
                          >
                            {!showPassword2 ? (
                              <HiOutlineEyeOff />
                            ) : (
                              <HiOutlineEye />
                            )}
                          </InputGroup.Text>
                          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Form>
                    {confirmPasswordMatch() ? (
                      <p></p>
                    ) : (
                      <p className="pnmt">Passwords do not match.</p>
                    )}
                  </div>
                  <h5 className="mb-4 mt-2 ore">
                    You should enter at least 6 characters{" "}
                  </h5>
                  <div className="text-center">
                    <button
                      className="btn custom-button2rtyu  my-1 my-sm-3"
                      type="submit"
                      onClick={handleShow}
                    >
                      Reset
                    </button>
                  </div>
                  <Modal
                    size="medium"
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Body>
                      <div className="text-center">
                        <img
                          src={Password_image}
                          alt="YourImage"
                          className="img-fluid img-fluid custom-image-ULock2 mx-auto d-block mb-4"
                        />
                        <h2 className="mb-4">Password Changed!</h2>
                        <h4 className="mb-3 ore">
                          Your password has been changed successfully.
                        </h4>
                        <button
                          className="btn  custom-button2rtyu my-1 my-sm-3"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
