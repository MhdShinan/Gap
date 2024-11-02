import "../ForgotPassword/ForgotPassword.css";
import Register_image from "../Register/img/register.png";
import Lock_image from "../ForgotPassword/Img/lock.png";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import { backEndURL } from "../../backendUrl";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from 'sweetalert2';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    localStorage.setItem("email", email);

    e.preventDefault();
    const data = {
      email: email,
    };
    await axios
      .post(`${backEndURL}/forgotPassword`, data)
      .then((response) => {
        if(response.data.error === "No User Found"){
          Swal.fire({
            icon: "error",
            title: "Email not found",
            showConfirmButton: false,
            iconColor: "#FF0000",
            timer: 1500
          });
        } else if(response.status === 201){
          Swal.fire({
            icon: "success",
            title: "OTP sent successfully",
            showConfirmButton: false,
            iconColor: "#4BB543",
            timer: 1500
          });
          window.location.href = "/verifyE";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="newwitchg">
        <div className="container-fluid container-fluidreg ">
          <div className="row bxbxset">
            <div className="col-lg-5 custom-bgregit  align-items-center justify-content-center">
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
                src={Lock_image}
                alt="YourImage"
                className="img-fluid img-fluid custom-image-ULock mx-auto d-block"
              />
              <h1 className="text-center mb-2 mt-2 ">Forgot password?</h1>
              <h5 className=" text-center mb-4 custom-text-sendcode">
                Please Enter Your Registered Email To Send The Security Code
              </h5>
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
                            type="email"
                            style={{ textTransform: "none" }}
                            required
                            placeholder="Enter Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Form>
                    <br />
                  </div>
                  <div className="text-center">
                    <button
                      className="btn custom-button2rtyu my-1 my-sm-3"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Send the code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
