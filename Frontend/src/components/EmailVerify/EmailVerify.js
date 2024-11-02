import React from "react";
// import Login_image from '../LoginPage/login.png';
import "../ForgotPassword/ResetPassword.css";
import Createpassword_image from "../ForgotPassword/Img/createpassword.png";
import Unlock_image from "../ForgotPassword/Img/unlock.png";
// import Linkedin_image from '../LoginPage/linkedin.png';

const EmailVerify = () => {
  return (
    <>
      <div>
        <div className="row">
          <div className="col-5 text-center custom-bg full-height">
            <h1 className="custom-text1 ">fjvsjfvs</h1>
            <img
              src={Createpassword_image}
              alt="YourImage"
              className="img-fluid image-size1"
            />
            <h1 className=" custom-text2 my-3">Welcome to GAP</h1>
            <h4 className="custom-text3">
              We will help you recover your password
            </h4>
          </div>
          <div className="col-7">
            <img
              src={Unlock_image}
              alt="YourImage"
              className="img-fluid image-size2 mx-auto d-block"
            />

            <h1 className="custom-text4 text-center">Create A New Password</h1>
            <form class="form-inline">
              <input
                type="text"
                class="form-control custom-input2 mb-5"
                placeholder="New Password"
              />
              <input
                type="password"
                id="inputPassword5"
                class="form-control custom-input2 "
                placeholder="Confirm Password"
                aria-describedby="passwordHelpBlock"
              />
            </form>
            <h6 className="custom-text7 mb-4 mt-0">
              You should enter at least 6 characters{" "}
            </h6>
            <div class="text-center">
              <button
                class="btn custom-button-reset my-1 my-sm-3"
                type="submit"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
