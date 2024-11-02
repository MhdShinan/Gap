import Form from "react-bootstrap/Form";
import Homepage_image from "../HomePage/Img/homepage.png";
import "../BeAMentor/BeAMentor.css";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { backEndURL } from "../../backendUrl";
import Swal from 'sweetalert2';

function BeAMentor() {
  const [text, setText] = useState("");
  const [inUsername, setInUsername] = useState("");
  const [expertise, setExpertise] = useState("");
  const [tools, setTools] = useState("");
  const [skills, setSkills] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const maxCharacters = 250;

  const handleTextChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxCharacters) {
      setText(inputValue);
    }
  };

  const [switchValue, setSwitchValue] = useState(false);
  const [isMentor, setIsMentor] = useState(null);
  const [isReview, setIsReview] = useState(null);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };

  /*LogOut Model*/
  const [show2, setShow2] = useState(false);
  /*LogOut Model*/
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


  //function for mentor application
  const handleMentorApplication = async () => {

    try {
      const response = await axios.post(`${backEndURL}/applyMentor`, {
        yearsOfExp: years + months ,
        inUsername: inUsername,
        expertise: expertise,
        tools: tools,
        skills: skills,
        introduction: text,
      },
      {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      });
      if (response.data.status === "ok") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Mentor application submitted successfully to Review",
          iconColor: "#4BB543"
        });
        handleClose2();
        setIsReview(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Application submission failed. Please try again later",
          iconColor: "#FF0000"
        });
      }
    } catch (error) {
      console.error("Error submitting mentor application:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Error submitting mentor application",
        iconColor: "#FF0000"
      });
    }
  };

  useEffect(() => {
    console.log('m', isMentor);
    console.log('r', isReview);
    const navbar = document.getElementById("mySidebar");
    const screenWidth = window.innerWidth;

    // Check if the screen width is less than 1250px (responsive view)
    if (screenWidth < 1250) {
      navbar.style.display = "none"; // Hide navbar in responsive view
    } else {
      navbar.style.display = "block"; // Show navbar in desktop view
    }

    // Function to check if the user is a mentor
    const checkIfMentor = async () => {
      // try {
      //   const response = await axios.get(`${backEndURL}/checkMentorStatus`);
      //   if (response.data.isMentor === true) {
      //     setIsMentor(true);
      //   } else if (response.data.isMentor === false) {
      //     setIsMentor(false);
      //   }
      // } catch (error) {
      //   console.error("Error checking mentor status:", error);
      //   setIsMentor(false);
      // }
      const decision = sessionStorage.getItem("isMentor");

      if(decision === "true"){
        setIsMentor(true);
      } else{
        setIsMentor(false);
      }
    };

    checkIfMentor();
            // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 



  return (
    <div className="d-flex">
      <div className="container-fluid">
        <div className="row">
          <div className="nav-colum" id="mySidebar">
            <SideBar />
          </div>

          <div className="col-lg-9 vh-100 overflow-auto">
            <div>
              <NavBar />
              <br></br>
              <br></br>
              <div className="custom-container2 mt-3">
                <div className="d-flex justify-content-between">
                  {/* <h4 className="m-3">Start Earning By Being A Mentor</h4> */}
                </div>
                <div className="custom-Point2">
                  <div className="itembox_beamentor">
                    {/* <button
                      className="itembox_beamentor_btn"
                      type="submit"
                    >
                      30 Minutes
                    </button> */}
                    {/* <h4 className="h5_bamentor">x.00 /=</h4> */}
                  </div>
                  <div className="itembox_beamentor">
                    {/* <button
                      className="itembox_beamentor_btn"
                      type="submit"
                    >
                      45 Minutes
                    </button>
                    <h4 className="h5_bamentor">Y.00 /=</h4> */}
                  </div>
                  <div className="itembox_beamentor">
                    {/* <button
                      className="itembox_beamentor_btn"
                      type="submit"
                    >
                      1 Hour
                    </button>
                    <h4 className="h5_bamentor">Z.00 /=</h4> */}
                  </div>
                  <div className="">
                    <img
                      src={Homepage_image}
                      alt="YourImage"
                      className="beamentorimg"
                      
                    />
                  </div>
                </div>
                {/* <div className="d-flex justify-content-between mt-5 m-1">
                  <h4 className="custom-text5">
                    When You Become A Mentor, You'll Begin At Level 5 With A
                    Bronze Badge. Your Starting Payment Will Be As Above. As You
                    Progress And Achieve Higher Badges And Levels, Your Payment
                    Will Increase Accordingly.
                  </h4>
                </div> */}


                <div className="d-flex justify-content-between mt-5 m-3 custom-container">
                  <h4 className="custom-text">Be a mentor</h4>
                  <div>
                    <form>
                      <div
                        className="custom-switch-container d-flex align-items-center"
                        style={{ marginRight: "10px" }}
                      >
                        <input
                          type="checkbox"
                          id="custom-switch"
                          className="custom-switch-input"
                          checked={isMentor === true}
                          onChange={handleSwitchChange}
                          disabled={isMentor === false || isMentor === null}
                        />
                        <label
                          htmlFor="custom-switch"
                          className="custom-switch-label"
                        ></label>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="custom-container2 m-3">
                  <div className="brncon">
                    <button
                      className="btn custom-button-slot withsetbtn"
                      onClick={handleShow2}
                      disabled={isMentor === true}
                    >
                      Application
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4 m-3 custom-container">
                  <h4 className="custom-text">Set Your Weekly Schedule</h4>
                  <button
                    className="btn custom-button-slot"
                    disabled={isMentor === false || isMentor === null}
                    onClick={
                      ()=>(window.location.href="/WeeklySchedulePage")
                    }
                  >
                    Time Slot
                  </button>
                </div>

                {isMentor === true && (
                  <div className="alert alert-info mt-3">
                    You are already a mentor.
                  </div>
                )}
                {isReview === true && (
                  <div className="alert alert-warning mt-3">
                    Admins are still reviewing your request, Please wait until they approve it
                  </div>
                )}

                <Modal
                  size="lg"
                  show={show2}
                  onHide={handleClose2}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Body className="m-4 d-flex justify-content-center align-items-center">
                    <div>
                      <h1 className="text-center mt-3 mb-4">
                        Submit Your Mentorship Application
                      </h1>

                      <Form>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Label>Years Of Experience *</Form.Label>
                            <Form.Select
                              onChange={(e) =>
                                setYears(e.target.value)
                              }
                            >
                              <option>Years</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>5+</option>
                            </Form.Select>
                          </div>

                          <div className="col-md-6">
                            <Form.Label>Months</Form.Label>
                            <Form.Select
                              onChange={(e) => setMonths(e.target.value)}
                            >
                              <option>Months</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                            </Form.Select>
                          </div>
                        </div>

                        <Form.Label htmlFor="basic-url">
                          LinkedIn URL *
                        </Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text
                            id="basic-addon3"
                            style={{ textTransform: "none" }}
                          >
                            linkedin.com/in/
                          </InputGroup.Text>

                          <Form.Control
                            id="basic-url"
                            aria-describedby="basic-addon3"
                            placeholder="username"
                            value={inUsername}
                            style={{ textTransform: "none" }}
                            onChange={(e) => setInUsername(e.target.value)}
                          />
                        </InputGroup>
                        <Form.Label>Major Expertise *</Form.Label>
                        <Form.Group controlId="Major Expertise">
                          <InputGroup hasValidation>
                            <Form.Control
                              type="text"
                              placeholder="Major Expertise"
                              style={{ textTransform: "none" }}
                              aria-describedby="inputGroupPrepend"
                              value={expertise}
                              required
                              onChange={(e) => setExpertise(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        {/* <Select
                          name="select"
                          options={options1}
                          labelField="id"
                          valueField="name"
                          multi
                        ></Select> */}

                        <Form.Label className="mt-3">
                          Tools which You Are Expert *
                        </Form.Label>
                        <Form.Group controlId="Expert Are">
                          <InputGroup hasValidation>
                            <Form.Control
                              type="text"
                              placeholder="Tools"
                              style={{ textTransform: "none" }}
                              aria-describedby="inputGroupPrepend"
                              value={tools}
                              required
                              onChange={(e) => setTools(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        <Form.Label className="mt-3">
                          Skill Which You Have Gathered *
                        </Form.Label>
                        <Form.Group controlId="Skills">
                          <InputGroup hasValidation>
                            <Form.Control
                              type="text"
                              placeholder="Skills"
                              style={{ textTransform: "none" }}
                              aria-describedby="inputGroupPrepend"
                              value={skills}
                              required
                              onChange={(e) => setSkills(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        <Form.Group
                          className="mt-3 mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Introduction</Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Describe yourself and why you wish to be a mentor"
                            rows={3}
                            value={text}
                            onChange={handleTextChange}
                          />
                          <div
                            className="text-muted"
                            style={{ position: "absolute", right: 50 }}
                          >
                            {`${text.length}/${maxCharacters}`}
                          </div>
                        </Form.Group>
                      </Form>

                      <div className="text-center">
                        <button
                          className="btn custom-button-reset my-1 my-sm-3"
                          type="submit"
                          onClick={handleMentorApplication}
                        >
                          Send a request
                        </button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>

                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeAMentor;