import React from "react";
import Col from "react-bootstrap/Col";
import "./menterbox.css";
import prolog from "./img/pro1.png";
import { BsStarFill, BsStar } from "react-icons/bs";
function MentorsDetailsBox() {
  return (
    <div>
      <div className="card">
        <div className="d-md-flex">
          {/* Left Column for Image */}
          <Col xs={12} md={2} className="mx-auto">
            <img src={prolog} rounded alt="propic" className="imgr" />
          </Col>

          {/* Right Column for Other Details */}
          <div className="card-body d-md-flex">
            <div className="text-section">
              <h5 className="card-title fw-bold">Mr. Julius Aguirre</h5>
              <p className="card-para">
                Senior Software Engineer at Innovation Lanka
                <br />
                <div className="d-inline-block">
                  <BsStarFill className="text-warning" />
                  <BsStarFill className="text-warning" />
                  <BsStarFill className="text-warning" />
                  <BsStarFill className="text-warning" />
                  <BsStar className="text-warning" />
                </div>
              </p>
              <div className="container mt-3">
                <div className="d-inline-block">
                  <button className="pbtn">IT</button>
                  &nbsp;&nbsp;
                  <button className="pbtn">Programming</button>
                  &nbsp;&nbsp;
                  <button className="pbtn">Technology</button>
                </div>
              </div>
            </div>

            {/* Edit Profile Section */}
            <div className="ms-md-auto d-md-flex align-items-end">
              <div className="box d-flex align-items-center">
                <p className="ptnpara ms-2 mb-0">
                  <button
                    className="custom-button21 custom-button-reset my-1 my-sm-3 t"
                    type="submit"
                  >
                    Request
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorsDetailsBox;
