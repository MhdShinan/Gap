import React, { useState, useEffect } from "react";
import "./Mentors.css";
import axios from "axios";
import { backEndURL } from "../../backendUrl";
import Swal from "sweetalert2";



function MentorProfile({mentorId}) {

  const [selectedDuration, setSelectedDuration] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleClose2 = () => setShow2(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [show3, setShow3] = useState(false);
  const handleShow2 = () => setShow2(true);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [show2, setShow2] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [currentSlotId, setCurrentSlotId] = useState(null);
  const [mentorEmail, setMentorEmail] = React.useState("");
  const [expectation, setExpectation] = useState('');

  const [userEmail, setUserEmail] = useState(null);

  const handleShow3 = (slotId, startTime, duration) => {
    setCurrentSlotId(slotId);
    setSelectedStartTime(startTime);
    setSelectedDuration(duration);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setShow3(true);
  };

  const handleButtonClick = (slotId, startTime, duration) => {
    // Calculate end time using the provided function
    const endTime = calculateEndTime(startTime, duration);

    sessionStorage.setItem("startTime", startTime);
    sessionStorage.setItem("duration", duration);
    sessionStorage.setItem("endTime", endTime); // Store the calculated end time
    sessionStorage.setItem("selectedDate", selectedDate);
    setCurrentSlotId(slotId);
    handleShow3(slotId, startTime, duration);
  };

  function formatTimeInAMPM(startTime) {
    const [hours, minutes] = startTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }


  const getWeekDates = (start) => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      week.push(date);
    }
    return week;
  };

  function calculateEndTime(startTime, duration) {
    const [hours, minutes] = startTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + duration);

    const endTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return endTime;
  }

  const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(start.setDate(diff));
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

  const handlePreviousWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
    const filteredSlots = timeSlots.filter(
      (slot) => slot.date === date.toISOString().split("T")[0]
    );
    setAvailableSlots(filteredSlots);
  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get(`${backEndURL}/getUser`, {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        });

        // Check if academicDetails exist and store the first value or default "Not available"
        const academicDetails = response.data.academicDetails;
        if (academicDetails && academicDetails.length > 0) {

          sessionStorage.setItem("userAcademicDetails", String(academicDetails[0])); // Store the first value
        } else {
          sessionStorage.setItem("userAcademicDetails", "Not Available")  // Default if no data is present 
        }

        // Store the user's email in local storage
        sessionStorage.setItem("userFirstName", response.data.firstName);
        sessionStorage.setItem("userLastName", response.data.lastName);
        sessionStorage.setItem("userEmail", response.data.email);
        sessionStorage.setItem("isMentor", String(response.data.isMentor));
        sessionStorage.setItem("profilePicture", response.data.profilePicture);

        setUserEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, []);


  const fetchTimeSlots = async () => {
    const startDate = startOfWeek.toISOString().split("T")[0];
    try {
      const response = await axios.get(
        `http://localhost:3001/api/timeslots?startDate=${startDate}`
      );

      // Assuming mentorId is available in your component
      const filteredTimeSlots = response.data.filter(slot => slot.user === mentorId);

      setTimeSlots(filteredTimeSlots);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, [startOfWeek]);

  const handleAddTimeSlot = async () => {
    if (!selectedDuration || !selectedStartTime || !selectedDate) {
      alert("Please select duration, start time, and date.");
      return;
    }

    const newTimeSlot = {
      date: selectedDate,
      startTime: selectedStartTime,
      duration: selectedDuration,
    };

    try {
      await axios.post("http://localhost:3001/api/timeslots", newTimeSlot);
      handleClose2();
      fetchTimeSlots();
    } catch (error) {
      console.error("Error adding time slot:", error);
    }
  };

  const handleTextareaChange = (e) => {
    setExpectation(e.target.value);
  };


  const handleRequestButtonClick = async () => {

    Swal.fire({
      title: "Are You Sure?",
      text: "You Won't Be Able To Revert This!",
      icon: "warning",
      iconColor: "#FFC107",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Schedule It!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Successfully",
          iconColor: "#4BB543",
          text: "Session Scheduled Successfully!",
          icon: "success"
        });


const handleRequestButtonClick = async () => {
  // Storing expectation in localStorage
  localStorage.setItem('Submitted expectation', expectation);

  // Retrieve and concatenate the user's full name
  const userName = `${localStorage.getItem('User First Name')} ${localStorage.getItem('User Last Name')}`;

  // Get the start time and duration
  const startTimeString = localStorage.getItem("startTime"); // e.g., "14:06"
  const duration = parseInt(localStorage.getItem("duration"), 10); // e.g., 45

  // Parse the start time string into a Date object
  const now = new Date();
  const [hours, minutes] = startTimeString.split(':').map(Number); // Split and convert to numbers
  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes); // Create a Date object

  // Calculate the end time
  const endDate = new Date(startDate.getTime() + duration * 60000); // Add duration in milliseconds

  const formData = {
    summary: 'Expectation of this mentoring session',
    description: localStorage.getItem("Submitted expectation"),
    startTime: localStorage.getItem("startTime"),
    endTime: localStorage.getItem("endTime"),
    userEmail: localStorage.getItem("User Email"),
    mentorEmail: localStorage.getItem("Selected Mentor Email"),
    userName: userName, // Concatenated full name
    date: localStorage.getItem("selectedDate"),
    academicDetails: localStorage.getItem("User Academic Details"),
  };

  try {
    console.log(formData);
    const response = await axios.post('http://localhost:3001/api/scheduleSession', formData);
    console.log(response.data);

    // Trigger SweetAlert2 on success
    Swal.fire({
      title: 'Success!',
      text: 'Session scheduled successfully!',
      icon: 'success',
      background: '#ffffff', // Dark green background
      color: '#fff',          // White text
      confirmButtonColor: '#4caf50', // Green button
      timer: 3000, // Auto close after 3 seconds
    });
  } catch (error) {
    console.error('Error scheduling session', error);

    // Trigger SweetAlert2 on error
    Swal.fire({
      title: 'Error!',
      text: 'Failed to schedule session. Please try again.',
      icon: 'error',
      background: '#ffffff', // Red background for error
      color: '#fff',         // White text
      confirmButtonColor: '#d33', // Darker red button
    });
  }
};



        // Storing expectation in sessionStorage
        sessionStorage.setItem("submittedExpectation", expectation)
        // Retrieve and concatenate the user's full name
        const userName = `${sessionStorage.getItem("userFirstName")} ${sessionStorage.getItem("userLastName")}`;

        // Get the start time and duration
        const startTimeString = sessionStorage.getItem("startTime"); // e.g., "14:06"
        const duration = parseInt(sessionStorage.getItem("duration"), 10); // e.g., 45

        // Parse the start time string into a Date object
        const now = new Date();
        const [hours, minutes] = startTimeString.split(':').map(Number); // Split and convert to numbers
        const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes); // Create a Date object

        // Calculate the end time
        const endDate = new Date(startDate.getTime() + duration * 60000); // Add duration in milliseconds

        const formData = {
          summary: 'Expectation of this mentoring session',
          description: sessionStorage.getItem("submittedExpectation"),
          startTime: sessionStorage.getItem("startTime"),  // Set as ISO string
          endTime: sessionStorage.getItem("endTime"),      // Set as ISO string
          userEmail: sessionStorage.getItem("userEmail"),
          mentorEmail: sessionStorage.getItem("selectedMentorEmail"),
          userName: userName, // Concatenated full name
          date: sessionStorage.getItem("selectedDate"),
          academicDetails: sessionStorage.getItem("userAcademicDetails"),
          profilePicture: sessionStorage.getItem("profilePicture")

        };

        try {
          console.log(formData);
          const response = await axios.post('http://localhost:3001/api/scheduleSession', formData);
          console.log(response.data);
        } catch (error) {
          console.error('Error scheduling session', error);
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }



        try {
          const response = await axios.post(`${backEndURL}/notificationSave`, {
            userId: sessionStorage.getItem("userId"),
            messageDetails: `Your " ${sessionStorage.getItem("submittedExpectation")} " Has Been Requested ! `,
            profilePicture: sessionStorage.getItem("profilePicture"),
          });

          // Handle successful response
          console.log(response.data.message);

        } catch (error) {
          console.error('Error saving notification:', error);
          // Handle error response
          alert('Error saving notification: ' + error.response.data.error);
        }

      }
    });


  };

  return (
    <div className="mentor m-4 d-flex flex-column align-items-center">
      {/* <h5>Select a Meeting Duration</h5>
      <div className="time_btn d-flex">
        <button
          type="button"
          className={selectedDuration === 30 ? "btn_select" : "btn_no_selet"}
          onClick={() => setSelectedDuration(30)}
        >
          30 Minutes
        </button>
        <button
          type="button"
          className={selectedDuration === 45 ? "btn_select" : "btn_no_selet"}
          onClick={() => setSelectedDuration(45)}
        >
          45 Minutes
        </button>
        <button
          type="button"
          className={selectedDuration === 60 ? "btn_select" : "btn_no_selet"}
          onClick={() => setSelectedDuration(60)}
        >
          1 Hour
        </button>
      </div> */}

      <div className="">
        <div>
          <h5>Select a Date</h5>
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
                const isToday =
                  date.toDateString() === new Date().toDateString();
                const isSelectedDate =
                  date.toDateString() === new Date(selectedDate).toDateString();
                const hasSavedSlot = timeSlots.some(
                  (slot) => slot.date === date.toISOString().split("T")[0]
                );

                const appliedClasses = `${isToday ? "current-date" : ""} ${isSelectedDate ? "selected-date" : ""
                  } ${hasSavedSlot ? "saved-slot-date has-time-slot" : ""}`;

                return (
                  <div key={index} onClick={() => handleDateClick(date)}>
                    <div className={appliedClasses}>
                      {date.toLocaleDateString("default", {
                        weekday: "short",
                      })}
                    </div>
                    <div
                      className={`${appliedClasses} ${!hasSavedSlot ? "date_other" : ""
                        }`}
                    >
                      {date.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="action_week_box_mentor">
              <div className="actin_btn_set">
                <h5 className="">Select a time slot</h5>
              </div>
              <div className="btn_contatiner_week">
                {availableSlots.map((slot, index) => {
                  const formattedStartTime = formatTimeInAMPM(slot.startTime);
                  const endTime = calculateEndTime(slot.startTime, slot.duration);
                  const isSelected = currentSlotId === slot._id;

                  return (
                    <button
                      key={index}
                      className={`btn_week_calentder_add ${isSelected
                        ? "bg-[#2a2a72] text-white border-[#2a2a72]"
                        : ""
                        }`}
                      onClick={() => {
                        console.log("clicked", slot.startTime, slot.duration);
                        // Store them separately in local storage
                        sessionStorage.setItem("startTime", slot.startTime);
                        sessionStorage.setItem("duration", slot.duration);
                        handleButtonClick(
                          slot._id,
                          slot.startTime,
                          slot.duration
                        );
                      }}
                      style={{
                        cursor: "pointer",
                        backgroundColor: isSelected ? "#2a2a72" : "",
                        color: isSelected ? "#ffffff" : "",
                        border: isSelected ? "1px solid #2a2a72" : "",
                      }}
                    >
                      {slot.startTime} - {endTime}
                    </button>
                  );
                })}
              </div>

              <div className="actin_btn_set row">
                <h6 className="">
                  Write your Expectation from this Mentorship
                </h6>
                <textarea onChange={handleTextareaChange} value={expectation} className="expectation-textarea"></textarea>
              </div>

              <div className="ms-md-auto d-md-flex align-items-end justify-content-end">
                <div className="box d-flex align-items-end">
                  <p className="ptnpara ms-2 mb-0">
                    <button
                      className="custom-button218 custom-button-reset my-1 my-sm-3 t"
                      type="submit"
                    >
                      Cancel
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                    className="custom-button2136 custom-button-reset my-1 my-sm-3 t"
                    type="submit"
                    onClick={handleRequestButtonClick}
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
    </div>
  );
}

export default MentorProfile;
