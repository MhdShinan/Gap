import React from "react";
import paymentIcon from "./img/paymenticon.png";
import msgIcon from "./img/messageicon.png";
import voucherIcon from "./img/vouchericon.png";
import "./buyVoucher.css";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
function BuyVoucher() {
  return (
    <div>
      <LandingNavBar />
      <div className="full_page_voucher">
        <div className="main_box_voucher fadeInUp">
          <div className="leftbox_voucher">
            <h1 className="voucher_topic">Invest in Students' Futures</h1>
            <p className="voucher_para">
              Your contribution can transform a student's life and help them
              achieve their dreams.
            </p>
            <p className="sub_vouher_para">
              Invest in dreams. Become an <br />
              <span className="sub_vouher_para_sub">Enabler.</span>
              <br /> 1500 LKR - per 1 student
            </p>
          </div>
          
          <div className="rightbox_voucher_main">
            <div className="rightbox_voucher">

            </div>
          </div>
        </div>
        <div className=" ">
          <h1 className="topic_secondpart fadeInUp">Pick a Voucher, Change a Life</h1>
          <div>
            <div className="card_set_voucher">
              <div className="card_voucher fadeInUp">
                <div className="imgsetion_card_voucher voucherimg1"></div>
                <div className="details_sections_card_voucher">
                  <button className="add_cart_btn_voucher">Add To Cart</button>
                </div>
              </div>
              <div className="card_voucher fadeInUp">
                <div className="imgsetion_card_voucher voucherimg2"></div>
                <div className="details_sections_card_voucher">
                  <button className="add_cart_btn_voucher">Add To Cart</button>
                </div>
              </div>
              <div className="card_voucher fadeInUp">
                <div className="imgsetion_card_voucher voucherimg3"></div>
                <div className="details_sections_card_voucher">
                  <button className="add_cart_btn_voucher">Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="topic_secondpart fadeInUp">Steps to Support Success</h1>
          <div className="card_set_voucher">
            <div className="card_select_voucher fadeInUp">
              <h3 className="sub_topic_card">Choose a Voucher:</h3>
              <div className="card_itme_seletc ">
                <img src={voucherIcon} alt="img" className="voucher_icon" />
                <div className="dtil_select_card">
                  Select the voucher amount you'd like to contribute.
                </div>
              </div>
            </div>
            <div className="card_select_voucher fadeInUp">
              <h3 className="sub_topic_card">Make the Payment:</h3>
              <div className="card_itme_seletc">
                <img src={paymentIcon} alt="img" className="voucher_icon" />
                <div className="dtil_select_card">
                  Complete the payment in just a few clicks.
                </div>
              </div>
            </div>
            <div className="card_select_voucher fadeInUp">
              <h3 className="sub_topic_card">Leave a Message: </h3>
              <div className="card_itme_seletc">
                <img src={paymentIcon} alt="img" className="voucher_icon" />
                <div className="dtil_select_card">
                  Share a message of encouragement for the students.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="topic_secondpart">The Power of Your Support</h1>
          <div className="card_set_voucher">
            <div className="card_select_voucher_sub fadeInUp">
              <div className="imgsetion_card_voucher card1_img_box_vouche"></div>
              <h3 className="sub_topic_card">Direct Impact</h3>
              <div>
                <div className="dtil_select_card cenne">
                  Your contribution goes directly towards enhancing the
                  educational experience of students.
                </div>
              </div>
            </div>
            <div className="card_select_voucher_sub  fadeInUp">
              <div className="imgsetion_card_voucher card2_img_box_vouche"></div>
              <h3 className="sub_topic_card">Easy and Fun</h3>
              <div>
                <div className="dtil_select_card cenne">
                  Support students with just a few clicks. It's simple,
                  enjoyable, and impactful!
                </div>
              </div>
            </div>
            <div className="card_select_voucher_sub fadeInUp">
              <div className="imgsetion_card_voucher card3_img_box_vouche"></div>
              <h3 className="sub_topic_card">Personal Touch</h3>
              <div>
                <div className="dtil_select_card cenne">
                  Your message will be shared with the students, inspiring them
                  to achieve their dreams.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="topic_secondpart fadeInUp">Get Involved</h1>
          <p className="voucher_para cnter fadeInUp">
            Your contribution can transform a student's life and help them
            achieve their dreams.
          </p>
          <div className="details_sections_card_voucher cnter fadeInUp">
            <button className="add_cart_btn_voucher nvbtnhoverr">Buy a Voucher</button>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}

export default BuyVoucher;
