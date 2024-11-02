import { useParams } from "react-router-dom";
import axios from "axios";
import { backEndURL } from "../../backendUrl";
import "./MentorReview.css";
import Photo from "./Img/bk.png";
import Swal from 'sweetalert2';
const MentorReview = () => {
  const { userId } = useParams();

  // Unified function to handle both accept and reject operations
  const handleMentorDecision = (decision) => {
    axios
      .post(`${backEndURL}/mentor/${decision}/${userId}`, {
        decision: decision,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log(`Mentor ${decision} successfully`);
        }
        // alert(`Mentor ${decision}`);
        Swal.fire({
          icon: "success",
          title: `Mentor ${decision}`,
          showConfirmButton: false,
          iconColor: "#4BB543",
          timer: 1500
        });
        localStorage.setItem("mentorDecision", decision);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="acept_box_mentro">
        <div>
          <h1 className="name_topic">Mentor Application Management Center</h1>
          <div className="box_btn_mentor">
            <div className="btn_box_ful_con">
              <img src={Photo} alt="img" className="img_request_acetp" />
              <br></br>
              <h1 className="hlword">Choose a option</h1>
              <button
                className="btn_acept_mentor"
                onClick={() => handleMentorDecision("approved")}
              >
                Accept
              </button>
              <button
                className="btn_dis_mentor"
                onClick={() => handleMentorDecision("rejected")}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorReview;
