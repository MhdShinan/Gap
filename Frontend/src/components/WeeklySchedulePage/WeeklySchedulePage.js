import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeeklySchedulePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { GrUpdate } from "react-icons/gr";
import { FaTrash } from "react-icons/fa"; // Importing the trash icon from FontAwesome
import { IoAddSharp } from "react-icons/io5";
import { backEndURL, imageURL } from "../../backendUrl";
import Swal from "sweetalert2";
function WeeklySchedulePage() {
  // State management
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [currentSlotId, setCurrentSlotId] = useState(null);
  const [userId, setUserId] = useState(null); // User ID state
  const [mentorId, setMentorId] = useState(null);

  // Modal handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = (slotId, startTime, duration) => {
    setCurrentSlotId(slotId);
    setSelectedStartTime(startTime);
    setSelectedDuration(duration);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setShow3(true);
  };

  const handleDeleteTimeSlot = async (slotId) => {
    // Confirm deletion with the user
    const confirmDelete = window.confirm("Are you sure you want to delete this time slot?");
    
    if (confirmDelete) {
      try {
        // Use template literal correctly for the API URL
        await axios.delete(`http://localhost:3001/api/timeslots/${slotId}`);
        
        // Refresh the list after deletion
        fetchTimeSlots();
        Swal.fire({
          icon: "success",
          iconColor: "#4BB543",
          title: "Successfull",
          text: "Time Slot Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error deleting time slot:", error);
        Swal.fire({
          icon: "error",
          iconColor: "#FF0000",
          title: "Failed",
          text: "Failed To Delete The Time Slot.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "success",
        iconColor: "#4BB543",
        title: "Successfull",
        text: "Time Slot Deletion Canceled.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  

  // Fetch User ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios
        .get(`${backEndURL}/getUser`, {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        })
        setUserId(response.data._id); // Assuming response contains the user object
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const navbar = document.getElementById("mySidebar");
    const screenWidth = window.innerWidth;

    // Check if the screen width is less than 1250px (responsive view)
    if (screenWidth < 1250) {
      navbar.style.display = "none"; // Hide navbar in responsive view
    } else {
      navbar.style.display = "block"; // Show navbar in desktop view
    }
  }, []);

  // Fetch Mentor Details
  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/mentorDetails");
        const mentor = response.data.mentors[0]; // Assuming first mentor in array
        setMentorId(mentor._id);
      } catch (error) {
        console.error("Error fetching mentor details:", error);
      }
    };
    fetchMentorDetails();
  }, []);

  // Week calculation utilities
  const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(start.setDate(diff));
  };

  const getWeekDates = (start) => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      week.push(date);
    }
    return week;
  };

  useEffect(() => {
    const startOfWeek = getStartOfWeek(currentDate);
    setWeekDates(getWeekDates(startOfWeek));
  }, [currentDate]);

  const [weekDates, setWeekDates] = useState(
    getWeekDates(getStartOfWeek(currentDate))
  );
  const startOfWeek = getStartOfWeek(currentDate);
  const monthName = startOfWeek.toLocaleString("default", { month: "long" });

  // Week navigation
  const handlePreviousWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  // Fetch time slots
  const fetchTimeSlots = async () => {
    if (!userId) {
      console.log("Mentor ID not available yet");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/api/timeslots/${userId}`
      );
      const fetchedSlots = response.data || [];
      setTimeSlots(fetchedSlots);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTimeSlots();
    }
  }, [userId, startOfWeek]);

  // Add time slot logic
 const handleAddTimeSlot = async () => {
  if (!selectedDuration || !selectedStartTime || !selectedDate || !userId) {
    Swal.fire({
      icon: "warning",
      iconColor: "#FFC107",
      title: "Warning",
      text: "Please Select Duration, Start Time, Date, And Ensure A User Is Logged In.",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  const newTimeSlot = {
    date: selectedDate,
    startTime: selectedStartTime,
    duration: selectedDuration,
    user: userId // Include user ID in request
  };

  try {
    await axios.post("http://localhost:3001/api/timeslots", newTimeSlot);
    handleClose2();
    fetchTimeSlots();
  } catch (error) {
    console.error("Error adding time slot:", error);
  }
};


  // Update time slot logic
  const handleUpdateTimeSlot = async () => {
    if (!selectedDuration || !selectedStartTime || !selectedDate || !currentSlotId || !mentorId) {
      Swal.fire({
        icon: "warning",
        iconColor: "#FFC107",
        title: "Warning",
        text: "Please Select Duration, Start Time, Date, And Ensure A Time Slot Is Selected.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const updatedTimeSlot = {
      date: selectedDate,
      startTime: selectedStartTime,
      duration: selectedDuration,
      user: mentorId // Include mentor ID in request
    };

    try {
      await axios.put(
        `http://localhost:3001/api/timeslots/${currentSlotId}`,
        updatedTimeSlot
      );
      handleClose3();
      fetchTimeSlots();
    } catch (error) {
      console.error("Error updating time slot:", error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]); // Sets the selected date
    const filteredSlots = timeSlots.filter(
      (slot) => slot.date === date.toISOString().split("T")[0]
    );
    setAvailableSlots(filteredSlots); // Sets the available slots for the selected date
  };

  function calculateEndTime(startTime, duration) {
    const [hours, minutes] = startTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + duration);

    const endHours = String(date.getHours()).padStart(2, "0");
    const endMinutes = String(date.getMinutes()).padStart(2, "0");

    return `${endHours}:${endMinutes}`;
  }


  return (
    <div className="d-flex">
      <div className="container-fluid">
        <div className="row">
          <div className="nav-colum" id="mySidebar">
            <SideBar className="" />
          </div>
          <div className="col-lg-9 vh-100 overflow-auto">
            <NavBar />
            <br />
            <br />
            <div className="weekly_user_box">
              <div>
                <h2 className="topic_week">Weekly Schedule </h2>
               

                <p className="para_week">Please fill your weekly schedule</p>
                <div className="calanderbox_week">
                  <div className="month_dis_week">
                    <div className="week-nav-buttons">
                      <button className="weeknextbtn" onClick={handlePreviousWeek}>
                        ←
                      </button>
                      <h3>
                        {monthName} {startOfWeek.getFullYear()}
                      </h3>
                      <button className="weeknextbtn" onClick={handleNextWeek}>
                        →
                      </button>
                    </div>
                  </div>
                  <div className="date_box_week">
                    {weekDates.map((date, index) => {
                      const isToday = date.toDateString() === new Date().toDateString();
                      const isSelectedDate = date.toDateString() === new Date(selectedDate).toDateString();
                      const hasSavedSlot = timeSlots.some(
                        (slot) => slot.date === date.toISOString().split("T")[0]
                      );

                      const appliedClasses = `${isToday ? "current-date" : ""} ${
                        isSelectedDate ? "selected-date" : ""
                      } ${hasSavedSlot ? "saved-slot-date has-time-slot" : ""}`;

                      return (
                        <div key={index} onClick={() => handleDateClick(date)}>
                          <div className={appliedClasses}>
                            {date.toLocaleDateString("default", { weekday: "short" })}
                          </div>
                          <div className={`${appliedClasses} ${!hasSavedSlot ? "date_other" : ""}`}>
                            {date.getDate()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="action_week_box">
                    <div className="actin_btn_set">
                      <div className="addslot_action">
                        <h4 className="addtime_topic">Add time slot</h4>
                        <div className="adbtn_week" onClick={handleShow2}>
                          <IoAddSharp className="udt" />
                        </div>
                      </div>
                    </div>
                    <div className="btn_contatiner_week">
  {availableSlots.map((slot, index) => {
    const endTime = calculateEndTime(slot.startTime, slot.duration);
    return (
      <button key={index} className="btn_week_calentder_add">
        {slot.startTime} - {endTime}
        {/*<div
          className="adbtn_week"
          onClick={() => handleShow3(slot._id, slot.startTime, slot.duration)}
        >
          <GrUpdate />
        </div> */}
        <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteTimeSlot(slot._id)}
                            >
                              <FaTrash />
                            </button>
      </button>
    );
  })}
</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Modal Add New */}
      <Modal
        size="medium"
        show={show2}
        onHide={handleClose2}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="m-4 d-flex justify-content-center">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTimeSlot();
              }}
            >
              <h1 className="text-center tpic_wek">Add Time Slot</h1>
              <p className="subpara">Select your preferred time slot</p>
              <p className="mode_sub_one">Select a meeting Duration</p>
              <div className="time_btn">
                <button
                  type="button"
                  className={
                    selectedDuration === 30 ? "btn_select" : "btn_no_selet"
                  }
                  onClick={() => setSelectedDuration(30)}
                >
                  30 Minutes
                </button>
                <button
                  type="button"
                  className={
                    selectedDuration === 45 ? "btn_select" : "btn_no_selet"
                  }
                  onClick={() => setSelectedDuration(45)}
                >
                  45 Minutes
                </button>
                <button
                  type="button"
                  className={
                    selectedDuration === 60 ? "btn_select" : "btn_no_selet"
                  }
                  onClick={() => setSelectedDuration(60)}
                >
                  1 Hour
                </button>
              </div>
              <p className="mode_sub_one">Select a start time</p>
              <input
                type="time"
                className="timeinput"
                value={selectedStartTime}
                onChange={(e) => setSelectedStartTime(e.target.value)}
              />
              <p className="mode_sub_one">Select Date</p>
              <input
                type="date"
                className="timeinput"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <div className="ad_can_btn">
                <button
                  type="button"
                  className="add_btn"
                  onClick={() => handleClose2()}
                >
                  Cancel
                </button>
                <button type="submit" className="cncel_btn">
                  Add
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      {/* Weekly Modal Update Details */}
      <Modal
        size="medium"
        show={show3}
        onHide={handleClose3}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="m-4 d-flex justify-content-center">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateTimeSlot();
              }}
            >
              <h1 className="text-center tpic_wek">Update Details</h1>
              <p className="subpara">Make sure you have updated your info</p>
              <p className="mode_sub_one">Select a meeting Duration</p>
              <div className="time_btn">
                <button
                  type="button"
                  className={
                    selectedDuration === 30 ? "btn_select" : "btn_no_selet"
                  }
                  onClick={() => setSelectedDuration(30)}
                >
                  30 Minutes
                </button>
                <button
                  type="button"
                  className={
                    selectedDuration === 45 ? "btn_select" : "btn_no_selet"
                  }
                  onClick={() => setSelectedDuration(45)}
                >
                  45 Minutes
                </button>
                <button
                  type="button"
                  className={
                    selectedDuration === 60 ? "btn_select" : "btn_no_selet"
                  }
                  onClick={() => setSelectedDuration(60)}
                >
                  1 Hour
                </button>
              </div>
              <p className="mode_sub_one">Select a start time</p>
              <input
                type="time"
                className="timeinput"
                value={selectedStartTime}
                onChange={(e) => setSelectedStartTime(e.target.value)}
              />
              <p className="mode_sub_one">Select Date</p>
              <input
                type="date"
                className="timeinput"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <div className="ad_can_btn">
                <button
                  type="button"
                  className="add_btn"
                  onClick={() => handleClose3()}
                >
                  Cancel
                </button>
                <button type="submit" className="cncel_btn">
                  Update
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default WeeklySchedulePage;
