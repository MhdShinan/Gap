import { React, useState } from "react";
import "./UserProfile.css";
import Navbar from "react-bootstrap/Navbar";
import GAP_Image from "./img/GAP_BG.png";
import Student_Image from "./img/Student.png";
import Level from "./img/level.png";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import Tab from "react-bootstrap/Tab";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Col from "react-bootstrap/Col";
import prolog from "./img/Student.png";
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoCalendarOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { TfiBookmarkAlt } from "react-icons/tfi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RxCountdownTimer } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
function UserProfile() {
  /*Photo Change Model*/
  const [show, setShow] = useState(false);

  /*Social Media Model Start*/
  const [show2, setShow2] = useState(false);

  /*Edit personal details Model*/
  const [show3, setShow3] = useState(false);

  /*Academic qualification Model*/
  const [show4, setShow4] = useState(false);

  /*Delete Model */
  const [show5, setShow5] = useState(false);

  /*License Model */

  /*professional experience Model */
  const [show7, setShow7] = useState(false);

  /*Photo Change Model*/
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*Social Media Model Start*/
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  /*Edit personal details Model*/
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  /*Academic qualification Model*/
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  /*Delete Model */
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  /*professional experience Model */
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  return (
    <div className="d-flex">
      <div className="container-fluid">
        <div className="row">
          <div className="nav-colum" id="mySidebar">
            <SideBar />
          </div>
          <div className="col-lg-9 vh-100 overflow-auto">
            <NavBar />
            <br></br>
            <br></br>
            <div>
              <div class="carduprofl">
                <Col xs={5} md={3} className="mx-auto position-relative">
                  <img src={prolog} rounded alt="propick" className="imgr" />
                </Col>

                <div class="card-body">
                  <div class="text-section">
                    <h5 class="card-title fw-bold">Mr.julius aguirre</h5>
                    <p className="card-para">
                      Undergraduate | Software Engineering
                    </p>
                    <div class="row mt-4">
                      <div class="col-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          cursor="pointer"
                        >
                          <rect width="30" height="30" rx="5" fill="#E6F6FF" />
                          <path
                            d="M10.8393 12.1759H7.28711V22.664H10.8393V12.1759Z"
                            fill="#2A2A72"
                          />
                          <path
                            d="M20.447 11.9486C20.3161 11.9335 20.1769 11.9259 20.0378 11.9183C18.0489 11.8425 16.9275 12.9338 16.5347 13.4036C16.4283 13.5324 16.3791 13.6082 16.3791 13.6082V12.2063H12.9824V22.6944H16.3791H16.5347C16.5347 21.6259 16.5347 20.5649 16.5347 19.4964C16.5347 18.9205 16.5347 18.3446 16.5347 17.7686C16.5347 17.0563 16.4774 16.2985 16.8621 15.6467C17.1894 15.1011 17.7788 14.8283 18.4417 14.8283C20.4061 14.8283 20.447 16.4728 20.447 16.6243C20.447 16.6319 20.447 16.6395 20.447 16.6395V22.7399H23.9993V15.8968C23.9993 13.5552 22.7142 12.176 20.447 11.9486Z"
                            fill="#2A2A72"
                          />
                          <path
                            d="M9.06258 10.8194C10.2017 10.8194 11.1252 9.96438 11.1252 8.90969C11.1252 7.855 10.2017 7 9.06258 7C7.92345 7 7 7.855 7 8.90969C7 9.96438 7.92345 10.8194 9.06258 10.8194Z"
                            fill="#2A2A72"
                          />
                        </svg>{" "}
                        &nbsp;&nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          cursor="pointer"
                        >
                          <rect width="30" height="30" rx="5" fill="#E6F6FF" />
                          <path
                            d="M24 9.75C24 8.7875 23.19 8 22.2 8H7.8C6.81 8 6 8.7875 6 9.75V20.25C6 21.2125 6.81 22 7.8 22H22.2C23.19 22 24 21.2125 24 20.25V9.75ZM22.2 9.75L15 14.125L7.8 9.75H22.2ZM22.2 20.25H7.8V11.5L15 15.875L22.2 11.5V20.25Z"
                            fill="#2A2A72"
                          />
                        </svg>
                        &nbsp;&nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          cursor="pointer"
                        >
                          <rect width="30" height="30" rx="5" fill="#E6F6FF" />
                          <path
                            d="M15.7545 20.3545C15.8552 20.4548 15.9351 20.574 15.9896 20.7052C16.0441 20.8365 16.0721 20.9772 16.0721 21.1193C16.0721 21.2614 16.0441 21.4021 15.9896 21.5333C15.9351 21.6645 15.8552 21.7837 15.7545 21.884L15.22 22.4184C14.2071 23.4311 12.8334 24 11.4009 24C9.96852 24 8.59477 23.4311 7.5819 22.4184C6.56903 21.4057 6 20.0323 6 18.6001C6 17.168 6.56903 15.7945 7.5819 14.7819L9.75238 12.6127C10.7256 11.6373 12.035 11.0708 13.4124 11.0294C14.7897 10.9879 16.1309 11.4745 17.161 12.3896C17.2674 12.4841 17.3541 12.5986 17.4161 12.7267C17.4782 12.8547 17.5145 12.9937 17.5228 13.1357C17.5312 13.2777 17.5115 13.42 17.4648 13.5544C17.4182 13.6888 17.3455 13.8127 17.251 13.9191C17.1565 14.0254 17.0419 14.1121 16.9138 14.1741C16.7858 14.2362 16.6468 14.2725 16.5047 14.2808C16.3627 14.2892 16.2204 14.2695 16.0859 14.2228C15.9515 14.1762 15.8276 14.1035 15.7212 14.009C15.1035 13.4605 14.2995 13.1687 13.4736 13.1933C12.6478 13.2179 11.8626 13.557 11.2786 14.1413L9.10988 16.3077C8.50225 16.9152 8.16089 17.7392 8.16089 18.5983C8.16089 19.4575 8.50225 20.2814 9.10988 20.8889C9.71751 21.4965 10.5416 21.8377 11.4009 21.8377C12.2603 21.8377 13.0844 21.4965 13.692 20.8889L14.2265 20.3545C14.3268 20.2542 14.4459 20.1745 14.577 20.1202C14.7081 20.0659 14.8486 20.0379 14.9905 20.0379C15.1324 20.0379 15.2729 20.0659 15.404 20.1202C15.5351 20.1745 15.6542 20.2542 15.7545 20.3545ZM22.4207 7.57895C21.407 6.56784 20.0336 6 18.6017 6C17.1698 6 15.7963 6.56784 14.7826 7.57895L14.2481 8.11337C14.0453 8.31619 13.9313 8.59127 13.9313 8.8781C13.9313 9.16493 14.0453 9.44002 14.2481 9.64284C14.451 9.84566 14.7261 9.9596 15.013 9.9596C15.2999 9.9596 15.575 9.84566 15.7779 9.64284L16.3124 9.10842C16.9201 8.50091 17.7442 8.15962 18.6035 8.15962C19.4628 8.15962 20.2869 8.50091 20.8946 9.10842C21.5022 9.71593 21.8435 10.5399 21.8435 11.399C21.8435 12.2582 21.5022 13.0821 20.8946 13.6896L18.725 15.8597C18.1405 16.4437 17.3548 16.7824 16.5288 16.8063C15.7027 16.8302 14.8988 16.5376 14.2814 15.9883C14.1751 15.8938 14.0511 15.8212 13.9167 15.7745C13.7823 15.7279 13.64 15.7082 13.4979 15.7166C13.3558 15.7249 13.2168 15.7612 13.0888 15.8232C12.9607 15.8853 12.8462 15.972 12.7516 16.0783C12.6571 16.1846 12.5844 16.3086 12.5378 16.443C12.4912 16.5774 12.4715 16.7197 12.4798 16.8617C12.4882 17.0037 12.5244 17.1427 12.5865 17.2707C12.6486 17.3987 12.7353 17.5133 12.8416 17.6078C13.8711 18.5226 15.2113 19.0096 16.588 18.9689C17.9648 18.9283 19.2739 18.3632 20.2476 17.3892L22.418 15.22C23.4305 14.2068 23.9995 12.8332 24 11.4009C24.0005 9.96866 23.4325 8.59471 22.4207 7.58075V7.57895Z"
                            fill="#2A2A72"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div class="cardfu">
                <div className="d-flex justify-content-between mt-4">
                  <h4>Fields of interest</h4>
                </div>
                <div class="cardm">
                  <br></br>
                  <div className="container mt-3">
                    <div className="d-inline-block">
                      <button className="pbtn289op">
                        Time Management&nbsp;&nbsp;{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                        >
                          <path
                            d="M0.77955 0.601815C0.958599 0.42282 1.20141 0.322266 1.45459 0.322266C1.70776 0.322266 1.95057 0.42282 2.12962 0.601815L5.50576 3.97796L8.8819 0.601815C9.06198 0.427893 9.30316 0.331655 9.55351 0.33383C9.80385 0.336006 10.0433 0.43642 10.2203 0.613446C10.3974 0.790472 10.4978 1.02995 10.5 1.28029C10.5021 1.53063 10.4059 1.77181 10.232 1.95189L6.85584 5.32803L10.232 8.70417C10.4059 8.88425 10.5021 9.12543 10.5 9.37577C10.4978 9.62611 10.3974 9.86559 10.2203 10.0426C10.0433 10.2196 9.80385 10.3201 9.55351 10.3222C9.30316 10.3244 9.06198 10.2282 8.8819 10.0542L5.50576 6.6781L2.12962 10.0542C1.94955 10.2282 1.70837 10.3244 1.45802 10.3222C1.20768 10.3201 0.968206 10.2196 0.791181 10.0426C0.614155 9.86559 0.51374 9.62611 0.511565 9.37577C0.509389 9.12543 0.605627 8.88425 0.77955 8.70417L4.15569 5.32803L0.77955 1.95189C0.600554 1.77284 0.5 1.53003 0.5 1.27685C0.5 1.02368 0.600554 0.780865 0.77955 0.601815Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                      &nbsp;&nbsp;
                      <button className="pbtn289op">
                        Team Work &nbsp;&nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                        >
                          <path
                            d="M0.77955 0.601815C0.958599 0.42282 1.20141 0.322266 1.45459 0.322266C1.70776 0.322266 1.95057 0.42282 2.12962 0.601815L5.50576 3.97796L8.8819 0.601815C9.06198 0.427893 9.30316 0.331655 9.55351 0.33383C9.80385 0.336006 10.0433 0.43642 10.2203 0.613446C10.3974 0.790472 10.4978 1.02995 10.5 1.28029C10.5021 1.53063 10.4059 1.77181 10.232 1.95189L6.85584 5.32803L10.232 8.70417C10.4059 8.88425 10.5021 9.12543 10.5 9.37577C10.4978 9.62611 10.3974 9.86559 10.2203 10.0426C10.0433 10.2196 9.80385 10.3201 9.55351 10.3222C9.30316 10.3244 9.06198 10.2282 8.8819 10.0542L5.50576 6.6781L2.12962 10.0542C1.94955 10.2282 1.70837 10.3244 1.45802 10.3222C1.20768 10.3201 0.968206 10.2196 0.791181 10.0426C0.614155 9.86559 0.51374 9.62611 0.511565 9.37577C0.509389 9.12543 0.605627 8.88425 0.77955 8.70417L4.15569 5.32803L0.77955 1.95189C0.600554 1.77284 0.5 1.53003 0.5 1.27685C0.5 1.02368 0.600554 0.780865 0.77955 0.601815Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                      &nbsp;&nbsp;
                      <button className="pbtn289op">
                        Work Balance &nbsp;&nbsp;{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                        >
                          <path
                            d="M0.77955 0.601815C0.958599 0.42282 1.20141 0.322266 1.45459 0.322266C1.70776 0.322266 1.95057 0.42282 2.12962 0.601815L5.50576 3.97796L8.8819 0.601815C9.06198 0.427893 9.30316 0.331655 9.55351 0.33383C9.80385 0.336006 10.0433 0.43642 10.2203 0.613446C10.3974 0.790472 10.4978 1.02995 10.5 1.28029C10.5021 1.53063 10.4059 1.77181 10.232 1.95189L6.85584 5.32803L10.232 8.70417C10.4059 8.88425 10.5021 9.12543 10.5 9.37577C10.4978 9.62611 10.3974 9.86559 10.2203 10.0426C10.0433 10.2196 9.80385 10.3201 9.55351 10.3222C9.30316 10.3244 9.06198 10.2282 8.8819 10.0542L5.50576 6.6781L2.12962 10.0542C1.94955 10.2282 1.70837 10.3244 1.45802 10.3222C1.20768 10.3201 0.968206 10.2196 0.791181 10.0426C0.614155 9.86559 0.51374 9.62611 0.511565 9.37577C0.509389 9.12543 0.605627 8.88425 0.77955 8.70417L4.15569 5.32803L0.77955 1.95189C0.600554 1.77284 0.5 1.53003 0.5 1.27685C0.5 1.02368 0.600554 0.780865 0.77955 0.601815Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                      &nbsp;&nbsp;
                      <button className="pbtn289op">
                        Time Management&nbsp;&nbsp;{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                        >
                          <path
                            d="M0.77955 0.601815C0.958599 0.42282 1.20141 0.322266 1.45459 0.322266C1.70776 0.322266 1.95057 0.42282 2.12962 0.601815L5.50576 3.97796L8.8819 0.601815C9.06198 0.427893 9.30316 0.331655 9.55351 0.33383C9.80385 0.336006 10.0433 0.43642 10.2203 0.613446C10.3974 0.790472 10.4978 1.02995 10.5 1.28029C10.5021 1.53063 10.4059 1.77181 10.232 1.95189L6.85584 5.32803L10.232 8.70417C10.4059 8.88425 10.5021 9.12543 10.5 9.37577C10.4978 9.62611 10.3974 9.86559 10.2203 10.0426C10.0433 10.2196 9.80385 10.3201 9.55351 10.3222C9.30316 10.3244 9.06198 10.2282 8.8819 10.0542L5.50576 6.6781L2.12962 10.0542C1.94955 10.2282 1.70837 10.3244 1.45802 10.3222C1.20768 10.3201 0.968206 10.2196 0.791181 10.0426C0.614155 9.86559 0.51374 9.62611 0.511565 9.37577C0.509389 9.12543 0.605627 8.88425 0.77955 8.70417L4.15569 5.32803L0.77955 1.95189C0.600554 1.77284 0.5 1.53003 0.5 1.27685C0.5 1.02368 0.600554 0.780865 0.77955 0.601815Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                      &nbsp;&nbsp;
                      <button className="pbtn289op">
                        Time Management&nbsp;&nbsp;{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                        >
                          <path
                            d="M0.77955 0.601815C0.958599 0.42282 1.20141 0.322266 1.45459 0.322266C1.70776 0.322266 1.95057 0.42282 2.12962 0.601815L5.50576 3.97796L8.8819 0.601815C9.06198 0.427893 9.30316 0.331655 9.55351 0.33383C9.80385 0.336006 10.0433 0.43642 10.2203 0.613446C10.3974 0.790472 10.4978 1.02995 10.5 1.28029C10.5021 1.53063 10.4059 1.77181 10.232 1.95189L6.85584 5.32803L10.232 8.70417C10.4059 8.88425 10.5021 9.12543 10.5 9.37577C10.4978 9.62611 10.3974 9.86559 10.2203 10.0426C10.0433 10.2196 9.80385 10.3201 9.55351 10.3222C9.30316 10.3244 9.06198 10.2282 8.8819 10.0542L5.50576 6.6781L2.12962 10.0542C1.94955 10.2282 1.70837 10.3244 1.45802 10.3222C1.20768 10.3201 0.968206 10.2196 0.791181 10.0426C0.614155 9.86559 0.51374 9.62611 0.511565 9.37577C0.509389 9.12543 0.605627 8.88425 0.77955 8.70417L4.15569 5.32803L0.77955 1.95189C0.600554 1.77284 0.5 1.53003 0.5 1.27685C0.5 1.02368 0.600554 0.780865 0.77955 0.601815Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                      &nbsp;&nbsp;
                      <button className="pbtn289op">
                        Time Management&nbsp;&nbsp;{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                        >
                          <path
                            d="M0.77955 0.601815C0.958599 0.42282 1.20141 0.322266 1.45459 0.322266C1.70776 0.322266 1.95057 0.42282 2.12962 0.601815L5.50576 3.97796L8.8819 0.601815C9.06198 0.427893 9.30316 0.331655 9.55351 0.33383C9.80385 0.336006 10.0433 0.43642 10.2203 0.613446C10.3974 0.790472 10.4978 1.02995 10.5 1.28029C10.5021 1.53063 10.4059 1.77181 10.232 1.95189L6.85584 5.32803L10.232 8.70417C10.4059 8.88425 10.5021 9.12543 10.5 9.37577C10.4978 9.62611 10.3974 9.86559 10.2203 10.0426C10.0433 10.2196 9.80385 10.3201 9.55351 10.3222C9.30316 10.3244 9.06198 10.2282 8.8819 10.0542L5.50576 6.6781L2.12962 10.0542C1.94955 10.2282 1.70837 10.3244 1.45802 10.3222C1.20768 10.3201 0.968206 10.2196 0.791181 10.0426C0.614155 9.86559 0.51374 9.62611 0.511565 9.37577C0.509389 9.12543 0.605627 8.88425 0.77955 8.70417L4.15569 5.32803L0.77955 1.95189C0.600554 1.77284 0.5 1.53003 0.5 1.27685C0.5 1.02368 0.600554 0.780865 0.77955 0.601815Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                      &nbsp;&nbsp;
                      <button className="pbtn289op">
                        Time Management&nbsp;&nbsp;{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                        >
                          <path
                            d="M0.77955 0.601815C0.958599 0.42282 1.20141 0.322266 1.45459 0.322266C1.70776 0.322266 1.95057 0.42282 2.12962 0.601815L5.50576 3.97796L8.8819 0.601815C9.06198 0.427893 9.30316 0.331655 9.55351 0.33383C9.80385 0.336006 10.0433 0.43642 10.2203 0.613446C10.3974 0.790472 10.4978 1.02995 10.5 1.28029C10.5021 1.53063 10.4059 1.77181 10.232 1.95189L6.85584 5.32803L10.232 8.70417C10.4059 8.88425 10.5021 9.12543 10.5 9.37577C10.4978 9.62611 10.3974 9.86559 10.2203 10.0426C10.0433 10.2196 9.80385 10.3201 9.55351 10.3222C9.30316 10.3244 9.06198 10.2282 8.8819 10.0542L5.50576 6.6781L2.12962 10.0542C1.94955 10.2282 1.70837 10.3244 1.45802 10.3222C1.20768 10.3201 0.968206 10.2196 0.791181 10.0426C0.614155 9.86559 0.51374 9.62611 0.511565 9.37577C0.509389 9.12543 0.605627 8.88425 0.77955 8.70417L4.15569 5.32803L0.77955 1.95189C0.600554 1.77284 0.5 1.53003 0.5 1.27685C0.5 1.02368 0.600554 0.780865 0.77955 0.601815Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                      &nbsp;&nbsp;
                    </div>
                  </div>

                  <br></br>
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <h4>Academic Qualification</h4>
                </div>
                <br></br>
                <div class="carduprofl cardnew">
                  <div class="card-body">
                    <div class="text-section">
                      <h5 class="card-title2 fw-bold">
                        University of Kelaniya, Sri Lanka
                      </h5>
                      <p className="card-para2">
                        BSc(Hons) Information Technology
                      </p>
                      <p className="card-para2">2018 - 2022 | Distinction</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <h4>Professional experience</h4>
                </div>
                <br></br>
                <div
                  className="cardd"
                  style={{
                    borderRadius: "10px",
                    border: "1px solid rgba(0, 0, 0, 0.50)",
                  }}
                >
                  <div class="carduprofl cardnew" style={{ border: "0" }}>
                    <div class="card-body">
                      <div class="text-section">
                        <h5 class="card-title2 fw-bold">
                          Senior Software Engineer{" "}
                        </h5>
                        <p className="card-para2">Generation Alpha,Srilanka</p>
                        <p className="card-para2">
                          Feb 2021 - Present | 1 yrs 5 mo
                        </p>
                        <hr></hr>
                        <h5 class="card-title2 fw-bold">Innovation Lanka </h5>
                        <p className="card-para2">Remote</p>
                        <p className="card-para2">
                          Feb 2017 - Present | 4 yrs 5 mos
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="carduprofl cardnew newcrddetyl"
                    style={{ border: "0" }}
                  >
                    <div
                      className="position-absolute  p-3"
                      style={{ left: "40px", top: "10px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="60"
                        viewBox="0 0 10 60"
                        fill="none"
                        className="disnon"
                      >
                        <circle
                          cx="5"
                          cy="5"
                          r="5"
                          fill="black"
                          fill-opacity="0.5"
                        />
                        <circle cx="5" cy="5" r="3" fill="white" />
                        <path
                          d="M5 118L5 14"
                          stroke="black"
                          stroke-opacity="0.5"
                          stroke-linecap="round"
                          stroke-dasharray="4 4"
                        />
                      </svg>
                    </div>

                    <div class="card-body">
                      <div class="text-section">
                        <h5 class="card-title2 fw-bold">
                          Associate Software Engineer | Full-time
                        </h5>

                        <p className="card-para3">Sep 2017 - Aug 2018 | 1 yr</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="carduprofl cardnew newcrddetyl"
                    style={{ border: "0" }}
                  >
                    <div
                      className="position-absolute  p-3"
                      style={{ left: "40px", top: "10px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="90"
                        viewBox="0 0 10 90"
                        fill="none"
                        className="disnon"
                      >
                        <circle
                          cx="5"
                          cy="5"
                          r="5"
                          fill="black"
                          fill-opacity="0.5"
                        />
                        <circle cx="5" cy="5" r="3" fill="white" />
                        <path
                          d="M5 118L5 14"
                          stroke="black"
                          stroke-opacity="0.5"
                          stroke-linecap="round"
                          stroke-dasharray="4 4"
                        />
                      </svg>
                    </div>
                    <div class="card-body">
                      <div class="text-section">
                        <h5 class="card-title2 fw-bold">
                          Software Engineer | Trainee
                        </h5>
                        <p className="card-para3">Internship</p>
                        <p className="card-para3">Feb 2017 - Aug 2017 | 7 mo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
