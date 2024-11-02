import React from "react";
import "./LandingNavBar.css";
import { useLocation } from "react-router-dom";
import GAP_Image from "../HomePage/Img/GAP_BG.png";
import { IoMdCart } from "react-icons/io";
function LandingNavBar() {
  const location = useLocation();
  const isBuyVoucherPage = location.pathname === "/buyvoucher";
  return (
    <div>
      <div>
        <div className="Header">
          <div className="Logo">
            <img src={GAP_Image} height="90" alt="" />
          </div>
          <input type="checkbox" id="nav_check" hidden></input>
          <nav className="nav-links">
            <div className="nav-ul">
              <div className="nav-li">
                <span onClick={() => (window.location.href = "/")}>Home</span>
              </div>
              <div className="nav-li">
                <span
                  onClick={() => (window.location.href = "/landingPageAbout")}
                >
                  About
                </span>
              </div>
              <div className="nav-li">
                <span
                  onClick={() => (window.location.href = "/landingPageContact")}
                >
                  Contact
                </span>
              </div>
              <div className="nav-li">
                <span
                  onClick={() =>
                    (window.location.href =
                      "https://nas.io/generation-alpha/products")
                  }
                >
                  Buy a Voucher
                </span>
              </div>

              {isBuyVoucherPage && (
                <div className="nav-li cart_part">
                  <div className="lan_cart">
                    <IoMdCart className="lan_cart_icon" />
                  </div>
                </div>
              )}
              <div className="nav-li">
                <span onClick={() => (window.location.href = "/login")}>
                  Login
                </span>
              </div>
              <div className="nav-li">
                <span
                  className="btn_regi_new"
                  onClick={() => (window.location.href = "/register")}
                >
                  Register
                </span>
              </div>
            </div>
          </nav>

          <label for="nav_check" className="hamburger">
            <div className="ham-div"></div>
            <div className="ham-div"></div>
            <div className="ham-div"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default LandingNavBar;
