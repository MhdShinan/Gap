import { React, useState, useEffect } from "react";
import "./UserProfile.css";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { backEndURL, imageURL } from "../../backendUrl";
import axios from "axios";
import moment from "moment/moment";
import { IoSaveSharp } from "react-icons/io5";
import userPic from "../HomePage/Img/user.png";
import UserDataModal from "../../utils/UserDataModal";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import Swal from "sweetalert2";

function UserProfileEmptyView() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    academicDetails: [],
    professionalDetails: [],
    socialMedia: [],
    fieldOfInterest: [],
  });

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    setDisplayFirstName(storedFirstName);
  }, []);

  useEffect(() => {
    const storedLastName = localStorage.getItem("lastName");
    setDisplayLastName(storedLastName);
  }, []);

  useEffect(() => {
    getUserDetails(); // Fetch user details on component mount
  }, []);

  const [displayFirstName, setDisplayFirstName] = useState("");
  const [displayLastName, setDisplayLastName] = useState("");

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [description, setDescription] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [institute, setInstitute] = useState("");
  const [degree, setDegree] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [position, setPosition] = useState("");
  const [empType, setEmpType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [locationType, setLocationType] = useState("");
  const [skills, setSkills] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [linkedinLink, setLinkedinLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [getInterest, setGetInterest] = useState("");
  const [about, setAbout] = useState("");

  const aboutFields = [
    {
      label: "About",
      placeholder: "Add grade",
      value: grade,
      onChange: setGrade,
      type: "text",
    },
  ];

  const editAboutFields = [
    {
      label: "Institute*",
      placeholder: "Add institute name",
      value: userData.academicDetails.institute,
      onChange: setInstitute,
      type: "text",
    },
    {
      label: "Degree / Course*",
      placeholder: "Add degree / course name",
      value: userData.academicDetails.degree,
      onChange: setDegree,
      type: "text",
    },
    {
      label: "Start Date*",
      placeholder: "Start date",
      value: userData.academicDetails.startDate,
      onChange: setStartDate,
      type: "date",
    },
    {
      label: "End Date (or expected)",
      placeholder: "End date",
      value: userData.academicDetails.endDate,
      onChange: setEndDate,
      type: "date",
    },
    {
      label: "Grade",
      placeholder: "Add grade",
      value: userData.academicDetails.grade,
      onChange: setGrade,
      type: "text",
    },
  ];

  const academicFormFields = [
    {
      label: "Institute*",
      placeholder: "Add institute name",
      value: institute,
      onChange: setInstitute,
      type: "text",
    },
    {
      label: "Degree / Course*",
      placeholder: "Add degree / course name",
      value: degree,
      onChange: setDegree,
      type: "text",
    },
    {
      label: "Start Date*",
      placeholder: "Start date",
      value: startDate,
      onChange: setStartDate,
      type: "date",
    },
    {
      label: "End Date (or expected)",
      placeholder: "End date",
      value: endDate || "Present",
      onChange: setEndDate,
      type: "date",
    },
    {
      label: "Grade",
      placeholder: "Add grade",
      value: grade,
      onChange: setGrade,
      type: "text",
    },
  ];

  const professionalFormFields = [
    {
      label: "Position*",
      placeholder: "Add position",
      value: position,
      onChange: setPosition,
      type: "text",
    },
    {
      label: "Employment Type",
      placeholder: "Select employment type",
      value: empType,
      onChange: setEmpType,
      type: "select",
      options: [
        "Select employment type",
        "Full time",
        "Part time",
        "Internship",
        "Freelance",
        "Contract",
      ],
    },
    {
      label: "Company Name*",
      placeholder: "Add company name",
      value: companyName,
      onChange: setCompanyName,
      type: "text",
    },
    {
      label: "Location Type",
      placeholder: "Select location type",
      value: locationType,
      onChange: setLocationType,
      type: "select",
      options: ["Select location type", "Onsite", "Hybrid", "Remote"],
    },
    {
      label: "Start Date*",
      placeholder: "Start date",
      value: startDate,
      onChange: setStartDate,
      type: "date",
    },
    {
      label: "End Date (or expected)",
      placeholder: "End date",
      value: endDate || "Present",
      onChange: setEndDate,
      type: "date",
    },
    {
      label: "Skills",
      placeholder: "Add skills",
      value: skills,
      onChange: setSkills,
      type: "text",
    },
  ];

  const editAcademicFormFields = [
    {
      label: "Institute*",
      placeholder: "Add institute name",
      value: institute,
      onChange: setInstitute,
      type: "text",
    },
    {
      label: "Degree / Course*",
      placeholder: "Add degree / course name",
      value: degree,
      onChange: setDegree,
      type: "text",
    },
    {
      label: "Start Date*",
      placeholder: "Start date",
      value: startDate,
      onChange: setStartDate,
      type: "date",
    },
    {
      label: "End Date (or expected)",
      placeholder: "End date",
      value: endDate || "Present",
      onChange: setEndDate,
      type: "date",
    },
    {
      label: "Grade",
      placeholder: "Add grade",
      value: grade,
      onChange: setGrade,
      type: "text",
    },
  ];

  const editProfessionalFormFields = [
    {
      label: "Position*",
      placeholder: "Add position",
      value: position,
      onChange: setPosition,
      type: "text",
    },
    {
      label: "Employment Type",
      placeholder: "Select employment type",
      value: empType,
      onChange: setEmpType,
      type: "select",
      options: [
        "Select employment type",
        "Full time",
        "Part time",
        "Internship",
        "Freelance",
        "Contract",
      ],
    },
    {
      label: "Company Name*",
      placeholder: "Add company name",
      value: companyName,
      onChange: setCompanyName,
      type: "text",
    },
    {
      label: "Location Type",
      placeholder: "Select location type",
      value: locationType,
      onChange: setLocationType,
      type: "select",
      options: ["Select location type", "Onsite", "Hybrid", "Remote"],
    },
    {
      label: "Start Date*",
      placeholder: "Start date",
      value: startDate,
      onChange: setStartDate,
      type: "date",
    },
    {
      label: "End Date (or expected)",
      placeholder: "End date",
      value: endDate || "Present",
      onChange: setEndDate,
      type: "date",
    },
    {
      label: "Skills",
      placeholder: "Add skills",
      value: skills,
      onChange: setSkills,
      type: "text",
    },
  ];

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file && file.size > 2 * 1024 * 1024) {
      // If selected image exceeds 2MB, show alert
      Swal.fire({
        icon: "warning",
        iconColor: "#FFC107",
        title: "Warning",
        text: "Please upload an image less than 2MB in size.",
      });
      return;
    }

    setAvatar(file); // Set the selected file as the avatar
  };
  /*Photo Change Model*/
  const [showPhotoModel, setShowPhotoModel] = useState(false);

  //logout model
  const [show, setShow] = useState(false);

  /*Social Media Model Start*/
  const [show2, setShow2] = useState(false);

  /*Edit personal details Model*/
  const [show3, setShow3] = useState(false);

  /*Academic qualification Model*/
  const [show4, setShow4] = useState(false);
  /*about Model*/
  const [showabout, setShowabout] = useState(false);

  /*Delete Model */
  const [show5, setShow5] = useState(false);

  /*Fields Model */
  const [showadd, setShowadd] = useState(false);

  /*License Model */

  /*professional experience Model */
  const [show7, setShow7] = useState(false);

  //model open for edit academic details
  const [showEditAcademicModal, setShowEditAcademicModal] = useState(false);

  //model open for edit professional details
  const [showEditProfessionalModal, setShowEditProfessionalModal] =
    useState(false);
  /*Photo Change Model*/
  const handleClosePhoto = () => setShowPhotoModel(false);
  const handleShowPhoto = () => setShowPhotoModel(true);

  /*Photo Change Model*/
  const handleCloseabout = () => setShowabout(false);
  const handleShowabout = () => setShowabout(true);

  /*Social Media Model Start*/
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  /*Edit personal details Model*/
  const handleClose3 = () => {
    setShow3(false);
    setTitle("");
    setAddress("");
    setTelephone("");
    setGender("");
    setBirthday("");
    setDescription("");
    setPortfolioLink("");
  };
  const handleShow3 = () => setShow3(true);

  /*Academic qualification Model*/
  const handleClose4 = () => {
    setShow4(false);
    setInstitute("");
    setDegree("");
    setStartDate("");
    setEndDate("");
    setGrade("");
  };

  //get academic details for edit

  const handleShow4 = () => {
    setShow4(true);
  };

  /*Delete Model */
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  /*professional experience Model */
  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  /*Fields experience Model */
  const handleCloseadd = () => setShowadd(false);
  const handleShowadd = () => setShowadd(true);

  //logout model
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEditAcademicModal = () => setShowEditAcademicModal(false);
  const handleShowEditAcademicModal = () => setShowEditAcademicModal(true);

  const handleCloseEditProfessionalModal = () =>
    setShowEditProfessionalModal(false);
  const handleShowEditProfessionalModal = () =>
    setShowEditProfessionalModal(true);

  //calling to endpoint for get user details which already in the database
  const getUserDetails = async (e) => {
    await axios
      .get(`${backEndURL}/getUser`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const {
            firstName,
            lastName,
            email,
            academicDetails,
            professionalDetails,
            socialMedia,
            fieldOfInterest,
          } = response.data;

          if (
            (academicDetails && academicDetails.length > 0) ||
            (professionalDetails && professionalDetails.length > 0) ||
            (socialMedia && socialMedia.length > 0) ||
            (fieldOfInterest && fieldOfInterest.length > 0) ||
            (socialMedia && socialMedia.length > 0)
          ) {
            setUserData({
              firstName,
              lastName,
              email,
              academicDetails,
              professionalDetails,
              socialMedia,
              fieldOfInterest,
            });
          } else {
            setUserData({
              firstName,
              lastName,
              email,
              academicDetails: [],
              professionalDetails: [],
              socialMedia: [],
              fieldOfInterest: [],
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleGetUserDetails = (e) => {
    e.preventDefault();
    handleShow3();
    getUserDetails();
  };

  //calling to endpoint for saving personal details of the user
  const handleSaveUserData = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${backEndURL}/personalDetails`,
        {
          title,
          address,
          telephone,
          gender,
          birthday,
          description,
          portfolioLink,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setTitle("");
          setAddress("");
          setTelephone("");
          setGender("");
          setBirthday("");
          setDescription("");
          setPortfolioLink("");
          handleClose3();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Success",
            text: "Personal details saved successfully",
          });
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "Personal details not saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  //calling to endpoint for saving academic details of the user
  const SaveAcademicData = async () => {
    // Check if endDate is empty and set it to "Present" if so
    const finalEndDate = endDate ? endDate : "Present";

    await axios
      .post(
        `${backEndURL}/academicDetails`,
        {
          institute,
          degree,
          startDate,
          endDate: finalEndDate, // Use finalEndDate here
          grade,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setInstitute("");
          setDegree("");
          setStartDate("");
          setEndDate("");
          setGrade("");
          handleClose4();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Successful",
            text: "Academic details saved successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          getUserDetails();
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Failed",
            text: "Academic details not saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating academic data:", error);
      });
  };

  //calling to endpoint for saving edit academic details of the user
  const SaveEditedAcademicData = async (id) => {
    // Check if endDate is empty and set it to "Present" if it is
    const formattedEndDate = endDate ? endDate : "Present";

    await axios
      .post(
        `${backEndURL}/editedAcademicDetails/${id}`,
        {
          institute,
          degree,
          startDate,
          endDate: formattedEndDate, // Use the formattedEndDate here
          grade,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Reset fields
          setInstitute("");
          setDegree("");
          setStartDate("");
          setEndDate("");
          setGrade("");
          handleCloseEditAcademicModal();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Successfully",
            text: "Academic details saved successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          getUserDetails(); // Refresh user data
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Failed",
            text: "Academic details not saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating academic data:", error);
      });
  };

  const handleAcademicData = (e) => {
    SaveAcademicData();
  };

  const SaveProfessionalData = async () => {
    const formattedEndDate = endDate ? endDate : "Present"; // Set "Present" if endDate is empty

    await axios
      .post(
        `${backEndURL}/professionalDetails`,
        {
          position,
          empType,
          companyName,
          locationType,
          startDate,
          endDate: formattedEndDate, // Use the formattedEndDate here
          skills,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Reset fields
          setPosition("");
          setEmpType("");
          setCompanyName("");
          setLocationType("");
          setStartDate("");
          setEndDate("");
          setSkills("");
          handleClose7();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Successful",
            text: "Professional details saved successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          getUserDetails(); // Refresh user data
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Failed",
            text: "Professional details not saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating Professional data:", error);
      });
  };

  const SaveEditedProfessionalData = async (id) => {
    // Check if endDate is empty and set it to "Present" if it is
    const finalEndDate = endDate ? endDate : "Present";

    await axios
      .post(
        `${backEndURL}/editedProfessionalDetails/${id}`,
        {
          position,
          empType,
          companyName,
          locationType,
          startDate,
          endDate: finalEndDate, // Use the final endDate here
          skills,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setPosition("");
          setEmpType("");
          setCompanyName("");
          setLocationType("");
          setStartDate("");
          setEndDate("");
          setSkills("");
          handleClose7();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Successfull",
            text: "Professional details saved successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          getUserDetails();
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Failed",
            text: "Professional details not saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating Professional data:", error);
      });
  };

  const handleProfessionalData = (e) => {
    SaveProfessionalData();
  };

  const handleSocialLinks = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${backEndURL}/socialMedia`,
        {
          websiteLink,
          linkedinLink,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setLinkedinLink("");
          setWebsiteLink("");
          getUserDetails();
          handleClose2();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Successfull",
            text: "Social Media Links  saved successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "Social Media Links not saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating social media data:", error);
      });
  };

  const visitLinkedIn = () => {
    const urlFromBackend = userData.socialMedia[0].linkedinLink;

    // Ensure the URL starts with a protocol
    const formattedUrl = urlFromBackend.startsWith("https")
      ? urlFromBackend
      : `https://${urlFromBackend}`;

    // Navigate to the formatted URL
    window.open(formattedUrl, "_blank");
  };

  const visitwebsiteLink = () => {
    const urlFromBackend = userData.socialMedia[0].websiteLink;

    // Ensure the URL starts with a protocol
    const formattedUrl = urlFromBackend.startsWith("https")
      ? urlFromBackend
      : `https://${urlFromBackend}`;

    // Navigate to the formatted URL
    window.open(formattedUrl, "_blank");
  };

  const handlePhotoUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", avatar);
    if (avatar) {
      axios
        .post(`${backEndURL}/photoUpload`, data, {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            handleClosePhoto();
            Swal.fire({
              icon: "success",
              iconColor: "#4BB543",
              title: "Successfull",
              text: "Photo uploaded successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (response.data.error === "Payload too large") {
            Swal.fire({
              icon: "warning",
              iconColor: "#FFC107",
              title: "Warning",
              text: "File too large. Please upload a file less than 5MB in size",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Faield",
              iconColor: "#FF0000",
              text: "Photo not uploaded",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.error("Error uploading photo:", error);
        });
    } else {
      Swal.fire({
        icon: "question",
        iconColor: "#5A72A0",
        title: "Please select a photo to upload",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const getAbout = (e) => {
    axios
      .get(`${backEndURL}/getAbout`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.data.status === "ok") {
          setAbout(response.data.about);
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "About Added Failed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching about:", error);
        Swal.fire({
          icon: "error",
          iconColor: "#FF0000",
          title: "Faield",
          text: "Some Error Occured",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleAbout = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${backEndURL}/about`,
        {
          about: textAbout,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "ok") {
          setShowabout(false);
          getAbout();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Successfull",
            text: "About Details Added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "About Added Failed",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error add about:", error);
      });
  };

  const handleInterest = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${backEndURL}/fieldOfInterest`,
        {
          interest: getInterest,
        },
        {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          getUserDetails();
          setGetInterest("");
          handleCloseadd();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Successfull",
            text: "Interest Details Added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "Some Error Occured",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error add interest:", error);
      });
  };

  const handleDeleteInterest = (id) => {
    axios
      .delete(`${backEndURL}/deleteInterest/${id}`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // Filter out the deleted interest from userData.fieldOfInterest
          const updatedFieldOfInterest = userData.fieldOfInterest.filter(
            (item) => item.id !== id
          );

          // Update the userData state to reflect the changes
          setUserData((prevState) => ({
            ...prevState,
            fieldOfInterest: updatedFieldOfInterest,
          }));
          getUserDetails();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Successfull",
            text: "Interest Details Deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "Some Error Occured",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting interest:", error);
      });
  };

  const handleDeleteAcademic = async (id) => {
    await axios
      .delete(`${backEndURL}/deleteAcademic/${id}`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            academicDetails: prevState.academicDetails.filter(
              (item) => item.id !== id
            ),
          }));
          getUserDetails();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Successfull",
            text: "Academic Details Deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "Some Error Occured",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting academic:", error);
      });
  };

  const handleDeleteProfessional = async (id) => {
    await axios
      .delete(`${backEndURL}/deleteProfessional/${id}`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            professionalDetails: prevState.professionalDetails.filter(
              (item) => item.id !== id
            ),
          }));
          getUserDetails();
          Swal.fire({
            icon: "success",
            iconColor: "#4BB543",
            title: "Successfull",
            text: "Professional Details Deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "Some Error Occured",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting professional details:", error);
      });
  };

  const handleDeleteProfilePic = async (e) => {
    e.preventDefault();
    if (selectedImage) {
      axios
        .delete(`${backEndURL}/deleteProfilePicture`, {
          headers: {
            authorization: `${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((response) => {
          if (response.data.status === "ok") {
            setSelectedImage(null);
            setAvatar(null);
            Swal.fire({
              icon: "success",
              iconColor: "#4BB543",
              title: "Successfull",
              text: "Profile Picture Deleted successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            handleClose5();
          } else if (response.data.error === "No photo found for the user") {
            handleClose5();
            Swal.fire({
              icon: "warning",
              iconColor: "#FFC107",
              title: "Warning",
              text: "No Photo to Delete",
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (response.data.error === "Failed to delete photo") {
            Swal.fire({
              icon: "error",
              iconColor: "#FF0000",
              title: "Faield",
              text: "Failed to delete photo",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "error",
              iconColor: "#FF0000",
              title: "Faield",
              text: "Delete Failed. Some Error Occured",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting profile picture:", error);
        });
    } else {
      Swal.fire({
        icon: "warning",
        iconColor: "#FFC107",
        title: "Warning",
        text: "No Profile Picture to Delete",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    axios
      .get(`${backEndURL}/getUserImage`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.data.profilePicture) {
          const profilePicture = `${imageURL}/${response.data.profilePicture}`;

          setSelectedImage(profilePicture);
        }
      })
      .catch((error) => {
        console.error("Error fetching user image:", error);
      });
  }, [handlePhotoUpload]);

  const openToEditAcademicDetails = (id) => {
    localStorage.setItem("academicDetailId", id);

    axios
      .get(`${backEndURL}/getAcademicDetails/${id}`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const { institute, degree, startDate, endDate, grade } =
            response.data.academic;
          setInstitute(institute);
          setDegree(degree);
          setStartDate(startDate);
          setEndDate(endDate);
          setGrade(grade);
          handleShowEditAcademicModal();
        }
      })
      .catch((error) => {
        console.error("Error fetching academic details:", error);
      });
  };

  const openToEditProfessionalDetails = (id) => {
    localStorage.setItem("professionalDetailId", id);
    axios
      .get(`${backEndURL}/getProfessionalDetails/${id}`, {
        headers: {
          authorization: `${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const {
            position,
            empType,
            companyName,
            locationType,
            startDate,
            endDate,
            skills,
          } = response.data.professional;
          setPosition(position);
          setEmpType(empType);
          setCompanyName(companyName);
          setLocationType(locationType);
          setStartDate(startDate);
          setEndDate(endDate);
          setSkills(skills);
          handleShowEditProfessionalModal();
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#FF0000",
            title: "Faield",
            text: "Professional details not saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating Professional data:", error);
      });
  };

  //About Us Word Counter Function
  const [textAbout, setTextAbout] = useState("");

  const handleChangeAbout = (e) => {
    const inputText = e.target.value;
    // Limit the input to 300 characters
    if (inputText.length <= 150) {
      setTextAbout(inputText);
    }
  };

  // const alertDelete = () => {
  //   Swal.fire({
  //     title: "Are you sure ?",
  //     text: "do you really want to delete this record? this process cannot be undone",
  //     icon: "warning",
  //     iconColor: "#FFC107",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Delete It!",

  //   }).then((result) => {
  //     if (result.isConfirmed) {

  //       Swal.fire({
  //         title: "logout successfull",
  //         icon: "success",
  //         iconColor: "#4BB543",
  //         timer: 3000
  //       });

  //       handleDeleteProfilePic();
  //     }
  //   });

  // }

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
              <div class="carduprofl card">
                <div className="myCustomCol-user">
                  <img
                    src={!selectedImage ? userPic : selectedImage}
                    rounded
                    alt="propick"
                    className="imgrr"
                    onClick={() => handleShowPhoto(selectedImage)}
                    style={{ borderRadius: "100px", cursor: "pointer" }}
                  />
                  {/* <img
                    src={!selectedImage ? userPic : selectedImage}
                    rounded
                    alt="propick"
                    className="imgr"
                    onClick={handleShowPhoto}
                    style={{ borderRadius: "100px", cursor: "pointer" }}
                  /> */}
                  {/* <Image
                    src={pen}
                    rounded
                    className="position-absolute m-2 cursor-pointer penclzee"
                    onClick={handleShowPhoto}
                  /> */}
                </div>
                {/*Photo Change Model Start*/}
                <Modal
                  show={showPhotoModel}
                  onHide={handleClosePhoto}
                  aria-labelledby="example-custom-modal-styling-title"
                >
                  <Modal.Header closeButton></Modal.Header>

                  <Modal.Body>
                    <Modal.Title
                      id="example-custom-modal-styling-title"
                      className="text-center"
                    >
                      <h1>Profile Picture</h1>
                      <p>Change Profile Picture</p>
                    </Modal.Title>
                    <div className="p-7">
                      <Container className="mt-2">
                        <Row className="justify-content-center">
                          <Col
                            xs={12}
                            md={6}
                            lg={4}
                            style={{
                              width: "100%",
                            }}
                          >
                            {avatar ? (
                              <div className="text-center">
                                <Image
                                  src={URL.createObjectURL(avatar)}
                                  roundedCircle
                                  style={{
                                    width: "250px",
                                    height: "250px",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="text-center">
                                <Image
                                  src={userPic}
                                  roundedCircle
                                  style={{
                                    width: "250px",
                                    height: "250px",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            )}

                            <hr />
                            <Row>
                              <Col
                                xs={2}
                                className="text-left"
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                <label htmlFor="fileInput">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="29"
                                    height="27"
                                    viewBox="0 0 29 27"
                                    fill="none"
                                    cursor="pointer"
                                  >
                                    <path
                                      d="M24.4748 8.76935L21.6105 0.762355C21.3991 0.171244 20.7775 -0.142783 20.2259 0.0632531L1.1889 7.11538C0.637307 7.31999 0.358711 7.96368 0.571508 8.55479L3.58987 16.9966V12.4737C3.58987 10.4304 5.19705 8.76935 7.17383 8.76935H12.204L18.2029 4.49516L21.6734 8.76935H24.4748ZM27.433 11.3697H7.17383C7.0319 11.3694 6.89135 11.398 6.76045 11.4537C6.62954 11.5094 6.51092 11.591 6.41154 11.6939C6.31216 11.7967 6.23404 11.9187 6.18175 12.0526C6.12946 12.1865 6.10406 12.3297 6.10704 12.4737V25.859C6.10844 26.4899 6.58723 27 7.17383 27H27.433C28.021 27 28.4998 26.4899 28.4998 25.859V12.4737C28.5028 12.3297 28.4774 12.1865 28.4251 12.0526C28.3728 11.9187 28.2946 11.7967 28.1953 11.6939C28.0959 11.591 27.9773 11.5094 27.8464 11.4537C27.7155 11.398 27.5749 11.3694 27.433 11.3697ZM25.6998 24.1581H8.90001V21.3162L11.6776 15.6069L15.5527 20.4893L19.1899 16.7067L23.863 14.9945L25.6998 19.8953V24.1581Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />

                                    {/* Gallery icon path */}
                                  </svg>
                                  <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleFileInputChange}
                                  />
                                  <p>Upload</p>
                                </label>
                              </Col>
                              <Col xs={8} className="text-center">
                                <IoSaveSharp
                                  className="svbtn"
                                  onClick={handlePhotoUpload}
                                  style={{
                                    cursor: "pointer",
                                  }}
                                />

                                <p>Save</p>
                              </Col>
                              <Col
                                xs={2}
                                className="text-right"
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={handleShow5}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="27"
                                  viewBox="0 0 24 27"
                                  fill="none"
                                >
                                  <path
                                    d="M4.5 27C3.675 27 2.9685 26.706 2.3805 26.118C1.7925 25.53 1.499 24.824 1.5 24V4.5H0V1.5H7.5V0H16.5V1.5H24V4.5H22.5V24C22.5 24.825 22.206 25.5315 21.618 26.1195C21.03 26.7075 20.324 27.001 19.5 27H4.5ZM19.5 4.5H4.5V24H19.5V4.5ZM7.5 21H10.5V7.5H7.5V21ZM13.5 21H16.5V7.5H13.5V21Z"
                                    fill="black"
                                    fill-opacity="0.5"
                                  />
                                </svg>
                                <p>Delete</p>
                              </Col>
                              {/*Delete Model Start*/}
                              <Modal
                                show={show5}
                                onHide={handleClose5}
                                aria-labelledby="example-custom-modal-styling-title"
                              >
                                <Modal.Header closeButton></Modal.Header>

                                <Modal.Body>
                                  <div className="p-7">
                                    <Container className="mt-2">
                                      <Row className="justify-content-center">
                                        <Col
                                          xs={12}
                                          md={6}
                                          lg={4}
                                          style={{
                                            width: "100%",
                                          }}
                                        >
                                          <div className="text-center"></div>
                                          <br />
                                          <div className="text-center">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="123"
                                              height="123"
                                              viewBox="0 0 123 123"
                                              fill="none"
                                            >
                                              <circle
                                                cx="61.5"
                                                cy="61.5"
                                                r="61.5"
                                                fill="white"
                                              />
                                              <circle
                                                cx="61.5"
                                                cy="61.5"
                                                r="60"
                                                stroke="#CF1010"
                                                stroke-opacity="0.8"
                                                stroke-width="3"
                                              />
                                              <path
                                                d="M45.7622 88.9257C44.0767 88.9257 42.6332 88.3284 41.4319 87.1339C40.2306 85.9393 39.6309 84.5051 39.633 82.8311V43.2162H36.5684V37.1216H51.8914V34.0743H70.2791V37.1216H85.6021V43.2162H82.5375V82.8311C82.5375 84.5071 81.9369 85.9424 80.7355 87.1369C79.5342 88.3315 78.0918 88.9277 76.4083 88.9257H45.7622ZM76.4083 43.2162H45.7622V82.8311H76.4083V43.2162ZM51.8914 76.7365H58.0206V49.3108H51.8914V76.7365ZM64.1499 76.7365H70.2791V49.3108H64.1499V76.7365Z"
                                                fill="#CF1010"
                                                fill-opacity="0.8"
                                              />
                                            </svg>
                                            <br></br>
                                            <Modal.Title
                                              id="example-custom-modal-styling-title"
                                              className="text-center"
                                            >
                                              <h1>Are you sure ?</h1>
                                              <p>
                                                do you really want to delete
                                                this record? this process cannot
                                                be undone
                                              </p>
                                            </Modal.Title>
                                          </div>
                                          <br />

                                          <Row className="justify-content-center">
                                            <Col
                                              xs={5}
                                              className="text-left"
                                              style={{
                                                cursor: "pointer",
                                              }}
                                            >
                                              <button
                                                style={{
                                                  cursor: "pointer",
                                                  borderRadius: "5px",
                                                  border:
                                                    "2px solid rgba(0, 0, 0, 0.50)",
                                                  background: "#FFF",
                                                  width: "120px",
                                                  padding: "12px 12px",

                                                  gap: "10px",
                                                }}
                                                onClick={handleClose5}
                                              >
                                                Cancel
                                              </button>
                                            </Col>
                                            <Col
                                              xs={5}
                                              className="text-center"
                                              style={{
                                                cursor: "pointer",
                                              }}
                                            >
                                              <button
                                                style={{
                                                  cursor: "pointer",
                                                  borderRadius: "5px",
                                                  border: "2px solid #CF1010CC",
                                                  background: "#FFF",
                                                  width: "120px",
                                                  padding: "12px 12px",
                                                  color: "#CF1010CC",
                                                  gap: "10px",
                                                  textAlign: "center",
                                                }}
                                                onClick={handleDeleteProfilePic}
                                              >
                                                Delete
                                              </button>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Container>
                                  </div>
                                </Modal.Body>
                              </Modal>
                              {/*Delete Model End*/}
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Modal.Body>
                </Modal>
                {/*Photo Change Model End*/}
                <div class="card-body">
                  <div class="text-section">
                    <h5 class="card-title fw-bold">
                      {displayFirstName} {displayLastName}
                    </h5>
                    {userData.professionalDetails &&
                    userData.professionalDetails.length > 0 ? (
                      <p className="card-para">
                        {userData.professionalDetails[0].position}
                      </p>
                    ) : (
                      <p>No professional details available</p>
                    )}

                    <div class="row mt-4">
                      <div class="col-10 mb-4">
                        <div>
                          {userData.socialMedia ? (
                            <svg
                              onClick={visitLinkedIn}
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              cursor="pointer"
                            >
                              <rect
                                width="30"
                                height="30"
                                rx="5"
                                fill="#E6F6FF"
                              />
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
                            </svg>
                          ) : (
                            <svg
                              onClick={() => alert("Invalid link")}
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              cursor="pointer"
                            >
                              <rect
                                width="30"
                                height="30"
                                rx="5"
                                fill="#E6F6FF"
                              />
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
                            </svg>
                          )}
                          &nbsp;&nbsp;
                          {userData.email ? (
                            <svg
                              onClick={() => {
                                window.location.href = `mailto:${userData.email}`;
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              cursor="pointer"
                            >
                              <rect
                                width="30"
                                height="30"
                                rx="5"
                                fill="#E6F6FF"
                              />
                              <path
                                d="M24 9.75C24 8.7875 23.19 8 22.2 8H7.8C6.81 8 6 8.7875 6 9.75V20.25C6 21.2125 6.81 22 7.8 22H22.2C23.19 22 24 21.2125 24 20.25V9.75ZM22.2 9.75L15 14.125L7.8 9.75H22.2ZM22.2 20.25H7.8V11.5L15 15.875L22.2 11.5V20.25Z"
                                fill="#2A2A72"
                              />
                            </svg>
                          ) : (
                            <svg
                              onClick={() => alert("Invalid link")}
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              cursor="pointer"
                            >
                              <rect
                                width="30"
                                height="30"
                                rx="5"
                                fill="#E6F6FF"
                              />
                              <path
                                d="M24 9.75C24 8.7875 23.19 8 22.2 8H7.8C6.81 8 6 8.7875 6 9.75V20.25C6 21.2125 6.81 22 7.8 22H22.2C23.19 22 24 21.2125 24 20.25V9.75ZM22.2 9.75L15 14.125L7.8 9.75H22.2ZM22.2 20.25H7.8V11.5L15 15.875L22.2 11.5V20.25Z"
                                fill="#2A2A72"
                              />
                            </svg>
                          )}
                          &nbsp;&nbsp;
                          {userData.socialMedia ? (
                            <svg
                              onClick={visitwebsiteLink}
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              cursor="pointer"
                            >
                              <rect
                                width="30"
                                height="30"
                                rx="5"
                                fill="#E6F6FF"
                              />
                              <path
                                d="M15.7545 20.3545C15.8552 20.4548 15.9351 20.574 15.9896 20.7052C16.0441 20.8365 16.0721 20.9772 16.0721 21.1193C16.0721 21.2614 16.0441 21.4021 15.9896 21.5333C15.9351 21.6645 15.8552 21.7837 15.7545 21.884L15.22 22.4184C14.2071 23.4311 12.8334 24 11.4009 24C9.96852 24 8.59477 23.4311 7.5819 22.4184C6.56903 21.4057 6 20.0323 6 18.6001C6 17.168 6.56903 15.7945 7.5819 14.7819L9.75238 12.6127C10.7256 11.6373 12.035 11.0708 13.4124 11.0294C14.7897 10.9879 16.1309 11.4745 17.161 12.3896C17.2674 12.4841 17.3541 12.5986 17.4161 12.7267C17.4782 12.8547 17.5145 12.9937 17.5228 13.1357C17.5312 13.2777 17.5115 13.42 17.4648 13.5544C17.4182 13.6888 17.3455 13.8127 17.251 13.9191C17.1565 14.0254 17.0419 14.1121 16.9138 14.1741C16.7858 14.2362 16.6468 14.2725 16.5047 14.2808C16.3627 14.2892 16.2204 14.2695 16.0859 14.2228C15.9515 14.1762 15.8276 14.1035 15.7212 14.009C15.1035 13.4605 14.2995 13.1687 13.4736 13.1933C12.6478 13.2179 11.8626 13.557 11.2786 14.1413L9.10988 16.3077C8.50225 16.9152 8.16089 17.7392 8.16089 18.5983C8.16089 19.4575 8.50225 20.2814 9.10988 20.8889C9.71751 21.4965 10.5416 21.8377 11.4009 21.8377C12.2603 21.8377 13.0844 21.4965 13.692 20.8889L14.2265 20.3545C14.3268 20.2542 14.4459 20.1745 14.577 20.1202C14.7081 20.0659 14.8486 20.0379 14.9905 20.0379C15.1324 20.0379 15.2729 20.0659 15.404 20.1202C15.5351 20.1745 15.6542 20.2542 15.7545 20.3545ZM22.4207 7.57895C21.407 6.56784 20.0336 6 18.6017 6C17.1698 6 15.7963 6.56784 14.7826 7.57895L14.2481 8.11337C14.0453 8.31619 13.9313 8.59127 13.9313 8.8781C13.9313 9.16493 14.0453 9.44002 14.2481 9.64284C14.451 9.84566 14.7261 9.9596 15.013 9.9596C15.2999 9.9596 15.575 9.84566 15.7779 9.64284L16.3124 9.10842C16.9201 8.50091 17.7442 8.15962 18.6035 8.15962C19.4628 8.15962 20.2869 8.50091 20.8946 9.10842C21.5022 9.71593 21.8435 10.5399 21.8435 11.399C21.8435 12.2582 21.5022 13.0821 20.8946 13.6896L18.725 15.8597C18.1405 16.4437 17.3548 16.7824 16.5288 16.8063C15.7027 16.8302 14.8988 16.5376 14.2814 15.9883C14.1751 15.8938 14.0511 15.8212 13.9167 15.7745C13.7823 15.7279 13.64 15.7082 13.4979 15.7166C13.3558 15.7249 13.2168 15.7612 13.0888 15.8232C12.9607 15.8853 12.8462 15.972 12.7516 16.0783C12.6571 16.1846 12.5844 16.3086 12.5378 16.443C12.4912 16.5774 12.4715 16.7197 12.4798 16.8617C12.4882 17.0037 12.5244 17.1427 12.5865 17.2707C12.6486 17.3987 12.7353 17.5133 12.8416 17.6078C13.8711 18.5226 15.2113 19.0096 16.588 18.9689C17.9648 18.9283 19.2739 18.3632 20.2476 17.3892L22.418 15.22C23.4305 14.2068 23.9995 12.8332 24 11.4009C24.0005 9.96866 23.4325 8.59471 22.4207 7.58075V7.57895Z"
                                fill="#2A2A72"
                              />
                            </svg>
                          ) : (
                            <svg
                              onClick={() => alert("Invalid link")}
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              cursor="pointer"
                            >
                              <rect
                                width="30"
                                height="30"
                                rx="5"
                                fill="#E6F6FF"
                              />
                              <path
                                d="M15.7545 20.3545C15.8552 20.4548 15.9351 20.574 15.9896 20.7052C16.0441 20.8365 16.0721 20.9772 16.0721 21.1193C16.0721 21.2614 16.0441 21.4021 15.9896 21.5333C15.9351 21.6645 15.8552 21.7837 15.7545 21.884L15.22 22.4184C14.2071 23.4311 12.8334 24 11.4009 24C9.96852 24 8.59477 23.4311 7.5819 22.4184C6.56903 21.4057 6 20.0323 6 18.6001C6 17.168 6.56903 15.7945 7.5819 14.7819L9.75238 12.6127C10.7256 11.6373 12.035 11.0708 13.4124 11.0294C14.7897 10.9879 16.1309 11.4745 17.161 12.3896C17.2674 12.4841 17.3541 12.5986 17.4161 12.7267C17.4782 12.8547 17.5145 12.9937 17.5228 13.1357C17.5312 13.2777 17.5115 13.42 17.4648 13.5544C17.4182 13.6888 17.3455 13.8127 17.251 13.9191C17.1565 14.0254 17.0419 14.1121 16.9138 14.1741C16.7858 14.2362 16.6468 14.2725 16.5047 14.2808C16.3627 14.2892 16.2204 14.2695 16.0859 14.2228C15.9515 14.1762 15.8276 14.1035 15.7212 14.009C15.1035 13.4605 14.2995 13.1687 13.4736 13.1933C12.6478 13.2179 11.8626 13.557 11.2786 14.1413L9.10988 16.3077C8.50225 16.9152 8.16089 17.7392 8.16089 18.5983C8.16089 19.4575 8.50225 20.2814 9.10988 20.8889C9.71751 21.4965 10.5416 21.8377 11.4009 21.8377C12.2603 21.8377 13.0844 21.4965 13.692 20.8889L14.2265 20.3545C14.3268 20.2542 14.4459 20.1745 14.577 20.1202C14.7081 20.0659 14.8486 20.0379 14.9905 20.0379C15.1324 20.0379 15.2729 20.0659 15.404 20.1202C15.5351 20.1745 15.6542 20.2542 15.7545 20.3545ZM22.4207 7.57895C21.407 6.56784 20.0336 6 18.6017 6C17.1698 6 15.7963 6.56784 14.7826 7.57895L14.2481 8.11337C14.0453 8.31619 13.9313 8.59127 13.9313 8.8781C13.9313 9.16493 14.0453 9.44002 14.2481 9.64284C14.451 9.84566 14.7261 9.9596 15.013 9.9596C15.2999 9.9596 15.575 9.84566 15.7779 9.64284L16.3124 9.10842C16.9201 8.50091 17.7442 8.15962 18.6035 8.15962C19.4628 8.15962 20.2869 8.50091 20.8946 9.10842C21.5022 9.71593 21.8435 10.5399 21.8435 11.399C21.8435 12.2582 21.5022 13.0821 20.8946 13.6896L18.725 15.8597C18.1405 16.4437 17.3548 16.7824 16.5288 16.8063C15.7027 16.8302 14.8988 16.5376 14.2814 15.9883C14.1751 15.8938 14.0511 15.8212 13.9167 15.7745C13.7823 15.7279 13.64 15.7082 13.4979 15.7166C13.3558 15.7249 13.2168 15.7612 13.0888 15.8232C12.9607 15.8853 12.8462 15.972 12.7516 16.0783C12.6571 16.1846 12.5844 16.3086 12.5378 16.443C12.4912 16.5774 12.4715 16.7197 12.4798 16.8617C12.4882 17.0037 12.5244 17.1427 12.5865 17.2707C12.6486 17.3987 12.7353 17.5133 12.8416 17.6078C13.8711 18.5226 15.2113 19.0096 16.588 18.9689C17.9648 18.9283 19.2739 18.3632 20.2476 17.3892L22.418 15.22C23.4305 14.2068 23.9995 12.8332 24 11.4009C24.0005 9.96866 23.4325 8.59471 22.4207 7.58075V7.57895Z"
                                fill="#2A2A72"
                              />
                            </svg>
                          )}
                          &nbsp;&nbsp;
                          <button
                            className="btn-add-new addlinknew-btn"
                            onClick={handleShow2}
                          >
                            Add Links
                          </button>
                        </div>
                      </div>
                    </div>
                    {/*Social Media Model Start*/}
                    <Modal
                      show={show2}
                      onHide={handleClose2}
                      aria-labelledby="example-custom-modal-styling-title"
                    >
                      <Modal.Header closeButton></Modal.Header>

                      <Modal.Body>
                        <Modal.Title
                          id="example-custom-modal-styling-title"
                          className="text-center"
                        >
                          <h1>Social Media</h1>
                          <p>add social media links</p>
                        </Modal.Title>
                        <div className="p-7">
                          <Container className="mt-2">
                            <label>Email</label>

                            <InputGroup className="mb-3">
                              <InputGroup.Text id="basic-addon1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="18"
                                  viewBox="0 0 22 18"
                                  fill="none"
                                >
                                  <path
                                    d="M22 2.25C22 1.0125 21.01 0 19.8 0H2.2C0.99 0 0 1.0125 0 2.25V15.75C0 16.9875 0.99 18 2.2 18H19.8C21.01 18 22 16.9875 22 15.75V2.25ZM19.8 2.25L11 7.875L2.2 2.25H19.8ZM19.8 15.75H2.2V4.5L11 10.125L19.8 4.5V15.75Z"
                                    fill="black"
                                    fill-opacity="0.5"
                                  />
                                </svg>
                              </InputGroup.Text>
                              <Form.Control
                                value={userData.email}
                                disabled
                                aria-label="juliusaguirre@gmail.com"
                                aria-describedby="basic-addon1"
                                className="flex-grow-1" // Use Bootstrap's utility class for flexible width
                              />
                            </InputGroup>
                            <br></br>
                            <label
                              style={{
                                color: "#2A2A72",
                                textTransform: "none",
                              }}
                            >
                              LinkedIn Link
                            </label>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="basic-addon1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="21"
                                  viewBox="0 0 22 21"
                                  fill="none"
                                >
                                  <path
                                    d="M4.96998 6.69824H0.373047V20.2709H4.96998V6.69824Z"
                                    fill="#2A2A72"
                                  />
                                  <path
                                    d="M17.4041 6.40395C17.2346 6.38434 17.0545 6.37453 16.8745 6.36472C14.3006 6.26665 12.8495 7.67884 12.3411 8.28686C12.2034 8.45358 12.1398 8.55164 12.1398 8.55164V6.73738H7.74414V20.31H12.1398H12.3411C12.3411 18.9273 12.3411 17.5543 12.3411 16.1715C12.3411 15.4262 12.3411 14.6809 12.3411 13.9356C12.3411 13.0138 12.2669 12.0331 12.7648 11.1897C13.1884 10.4836 13.9511 10.1305 14.809 10.1305C17.3511 10.1305 17.4041 12.2586 17.4041 12.4548C17.4041 12.4646 17.4041 12.4744 17.4041 12.4744V20.3689H22.001V11.5133C22.001 8.483 20.338 6.69815 17.4041 6.40395Z"
                                    fill="#2A2A72"
                                  />
                                  <path
                                    d="M2.66918 4.94264C4.14334 4.94264 5.33838 3.83619 5.33838 2.47132C5.33838 1.10645 4.14334 0 2.66918 0C1.19503 0 0 1.10645 0 2.47132C0 3.83619 1.19503 4.94264 2.66918 4.94264Z"
                                    fill="#2A2A72"
                                  />
                                </svg>
                              </InputGroup.Text>
                              <Form.Control
                                value={linkedinLink}
                                onChange={(e) =>
                                  setLinkedinLink(e.target.value)
                                }
                                style={{ textTransform: "none" }}
                                aria-label="/in/juliusaguirre"
                                aria-describedby="basic-addon1"
                                className="flex-grow-1" // Use Bootstrap's utility class for flexible width
                              />
                            </InputGroup>
                            <br></br>
                            <label style={{ color: "#2A2A72" }}>
                              Portfolio Link
                            </label>

                            <InputGroup className="mb-3">
                              <InputGroup.Text
                                value={websiteLink}
                                onChange={(e) => setWebsiteLink(e.target.value)}
                                id="basic-addon1"
                                style={{ textTransform: "none" }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 22 22"
                                  fill="none"
                                >
                                  <path
                                    d="M11.9222 17.5444C12.0452 17.667 12.1428 17.8127 12.2095 17.9731C12.2761 18.1335 12.3104 18.3054 12.3104 18.4791C12.3104 18.6528 12.2761 18.8247 12.2095 18.9851C12.1428 19.1455 12.0452 19.2912 11.9222 19.4138L11.2689 20.067C10.0309 21.3047 8.35189 22 6.60115 22C4.85042 22 3.17139 21.3047 1.93343 20.067C0.695477 18.8292 0 17.1506 0 15.4002C0 13.6498 0.695477 11.9711 1.93343 10.7334L4.58625 8.0822C5.7757 6.89004 7.37607 6.1977 9.05954 6.147C10.743 6.0963 12.3822 6.69107 13.6412 7.80949C13.7712 7.92502 13.8772 8.06501 13.9531 8.22147C14.0289 8.37794 14.0732 8.54781 14.0835 8.7214C14.0937 8.89498 14.0696 9.06888 14.0126 9.23316C13.9556 9.39744 13.8668 9.54888 13.7512 9.67885C13.6357 9.80881 13.4956 9.91475 13.3391 9.99061C13.1827 10.0665 13.0127 10.1108 12.8391 10.121C12.6655 10.1312 12.4916 10.1071 12.3273 10.0501C12.1629 9.99313 12.0115 9.90433 11.8815 9.78881C11.1265 9.1184 10.1438 8.76174 9.13443 8.79179C8.12508 8.82184 7.16536 9.23632 6.45157 9.95045L3.80096 12.5983C3.0583 13.3408 2.64108 14.3479 2.64108 15.398C2.64108 16.448 3.0583 17.4551 3.80096 18.1976C4.54362 18.9401 5.55088 19.3572 6.60115 19.3572C7.65143 19.3572 8.65869 18.9401 9.40134 18.1976L10.0546 17.5444C10.1772 17.4217 10.3228 17.3244 10.483 17.258C10.6432 17.1916 10.815 17.1574 10.9884 17.1574C11.1619 17.1574 11.3336 17.1916 11.4938 17.258C11.654 17.3244 11.7996 17.4217 11.9222 17.5444ZM20.0698 1.92983C18.8308 0.694024 17.1522 0 15.4021 0C13.652 0 11.9733 0.694024 10.7344 1.92983L10.081 2.583C9.8331 2.83089 9.69381 3.16711 9.69381 3.51768C9.69381 3.86825 9.8331 4.20446 10.081 4.45236C10.329 4.70025 10.6653 4.83951 11.0159 4.83951C11.3666 4.83951 11.7028 4.70025 11.9508 4.45236L12.6041 3.79918C13.3467 3.05667 14.354 2.63954 15.4043 2.63954C16.4545 2.63954 17.4618 3.05667 18.2045 3.79918C18.9471 4.54169 19.3643 5.54875 19.3643 6.59881C19.3643 7.64888 18.9471 8.65594 18.2045 9.39845L15.5527 12.0507C14.8383 12.7646 13.8781 13.1784 12.8685 13.2077C11.8589 13.2369 10.8763 12.8793 10.1217 12.208C9.99175 12.0925 9.84027 12.0037 9.67596 11.9467C9.51165 11.8897 9.33772 11.8656 9.1641 11.8758C8.99048 11.886 8.82057 11.9303 8.66407 12.0062C8.50758 12.082 8.36756 12.188 8.25201 12.3179C8.13647 12.4479 8.04765 12.5993 7.99065 12.7636C7.93364 12.9279 7.90956 13.1018 7.91977 13.2754C7.92998 13.449 7.97429 13.6188 8.05017 13.7753C8.12605 13.9318 8.23201 14.0718 8.36199 14.1873C9.62019 15.3055 11.2582 15.9006 12.9409 15.8509C14.6236 15.8013 16.2237 15.1105 17.4137 13.9201L20.0665 11.2689C21.304 10.0305 21.9994 8.35171 22 6.60115C22.0006 4.85058 21.3064 3.17132 20.0698 1.93203V1.92983Z"
                                    fill="#2A2A72"
                                  />
                                </svg>
                              </InputGroup.Text>
                              <Form.Control
                                value={websiteLink}
                                onChange={(e) => setWebsiteLink(e.target.value)}
                                style={{ textTransform: "none" }}
                                aria-label="/juliusaguirre.com"
                                aria-describedby="basic-addon1"
                                className="flex-grow-1" // Use Bootstrap's utility class for flexible width
                              />
                            </InputGroup>
                          </Container>
                        </div>
                        <div className="text-center">
                          <button
                            className="btn  custom-button-reset my-1 my-sm-3 t"
                            type="submit"
                            onClick={handleSocialLinks}
                          >
                            Save
                          </button>
                        </div>
                      </Modal.Body>
                    </Modal>
                    {/*Social Media Model End*/}
                  </div>
                </div>
              </div>

              <div class="cardfu">
                <div className="d-flex justify-content-between mt-4">
                  <h4>About</h4>

                  <h6 className="View-more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      cursor="pointer"
                      onClick={handleShowabout}
                    >
                      <path
                        d="M15 8.4375H8.4375V15H6.5625V8.4375H0V6.5625H6.5625V0H8.4375V6.5625H15V8.4375Z"
                        fill="black"
                        fill-opacity="0.5"
                      />
                    </svg>
                  </h6>

                  {/*about Model Start*/}
                  <Modal
                    size="lg"
                    show={showabout}
                    onHide={handleCloseabout}
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton></Modal.Header>

                    <Modal.Body>
                      <div class="cardm">
                        <h1 className="text-center">About</h1>
                        <br></br>
                        <Form className="mx-auto">
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="lblcous">
                              Type Here..
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={5}
                              className="form-control"
                              style={{ resize: "none" }}
                              onChange={handleChangeAbout}
                              required={"required"}
                              name="message"
                            />
                          </Form.Group>

                          <div className="text-right">
                            <p>{textAbout.length}/150</p>
                          </div>
                        </Form>
                        <br></br>
                        <div className="ms-md-auto d-md-flex align-items-end">
                          <div className="box d-flex align-items-end">
                            <p className="ptnparak ms-2 mb-0 align-items-end">
                              <button
                                className="custom-button218 custom-button-reset my-1 my-sm-3 t"
                                type="submit"
                                onClick={handleCloseabout}
                              >
                                Cancel
                              </button>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <button
                                className="custom-button2136o custom-button-reset my-1 my-sm-3 t"
                                type="button"
                                onClick={handleAbout}
                              >
                                Add
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                  {/*about Model End*/}
                </div>
                {about && about.length > 0 ? (
                  <div className="container mt-3 bordernew">
                    <div className="d-inline-block ">
                      <p className="card-para2">{about}</p>
                    </div>
                  </div>
                ) : (
                  <p className="card-para2">No details available yet</p>
                )}
                <hr></hr>
                <div className="d-flex justify-content-between mt-4">
                  <h4>Fields of interest</h4>

                  <h6 className="View-more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      cursor="pointer"
                      onClick={handleShowadd}
                    >
                      <path
                        d="M15 8.4375H8.4375V15H6.5625V8.4375H0V6.5625H6.5625V0H8.4375V6.5625H15V8.4375Z"
                        fill="black"
                        fill-opacity="0.5"
                      />
                    </svg>
                  </h6>

                  {/*Fields of interest Model Start*/}
                  <Modal
                    size="lg"
                    show={showadd}
                    onHide={handleCloseadd}
                    aria-labelledby="example-custom-modal-styling-title"
                  >
                    <Modal.Header closeButton></Modal.Header>

                    <Modal.Body>
                      <div class="cardm">
                        <div className="container mt-3"></div>

                        <br></br>
                        <Form className="mx-auto">
                          <div className="position-relative ser">
                            <FormControl
                              type="text"
                              value={getInterest}
                              onChange={(e) => setGetInterest(e.target.value)}
                              className="w-100 position-absolute top-50 translate-middle-y text-muted"
                              style={{ right: "15px" }}
                            />
                          </div>
                        </Form>
                        <br></br>
                        <div className="ms-md-auto d-md-flex align-items-end">
                          <div className="box d-flex align-items-end">
                            <p className="ptnparak ms-2 mb-0 align-items-end">
                              <button
                                className="custom-button218 custom-button-reset my-1 my-sm-3 t"
                                type="submit"
                                onClick={handleCloseadd}
                              >
                                Cancel
                              </button>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <button
                                className="custom-button2136o custom-button-reset my-1 my-sm-3 t"
                                type="submit"
                                onClick={handleInterest}
                              >
                                Add
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                  {/*Fields of interest Model End*/}
                </div>
                <br></br>

                {/*Academic qualification Model Start*/}

                <UserDataModal
                  show={show4}
                  handleClose={handleClose4}
                  handleSave={handleAcademicData}
                  title="Academic Qualification"
                  subTitle="Add New Academic Qualification"
                  formFields={aboutFields}
                />

                <UserDataModal
                  show={showEditAcademicModal}
                  handleClose={handleCloseEditAcademicModal}
                  handleSave={handleAcademicData}
                  title="Academic Qualification"
                  subTitle="Edit Academic Qualification"
                  formFields={editAboutFields}
                />
                {/*Academic qualification Model End*/}

                <div className="container mt-3">
                  <div className="d-inline-block ">
                    {userData.fieldOfInterest &&
                    userData.fieldOfInterest.length > 0 ? (
                      userData.fieldOfInterest.map((detail, index) => {
                        return (
                          <div className="d-inline-block" key={index}>
                            <p className="pbtn289 spaceinterset">
                              {detail.interest}
                              &nbsp;&nbsp;{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                onClick={() => handleDeleteInterest(detail._id)}
                                style={{ cursor: "pointer" }}
                              >
                                <path
                                  d="M0.77955 0.601815C0.958599 0.42282 1.20141 0.322266 1.45459 0.322266C1.70776 0.322266 1.95057 0.42282 2.12962 0.601815L5.50576 3.97796L8.8819 0.601815C9.06198 0.427893 9.30316 0.331655 9.55351 0.33383C9.80385 0.336006 10.0433 0.43642 10.2203 0.613446C10.3974 0.790472 10.4978 1.02995 10.5 1.28029C10.5021 1.53063 10.4059 1.77181 10.232 1.95189L6.85584 5.32803L10.232 8.70417C10.4059 8.88425 10.5021 9.12543 10.5 9.37577C10.4978 9.62611 10.3974 9.86559 10.2203 10.0426C10.0433 10.2196 9.80385 10.3201 9.55351 10.3222C9.30316 10.3244 9.06198 10.2282 8.8819 10.0542L5.50576 6.6781L2.12962 10.0542C1.94955 10.2282 1.70837 10.3244 1.45802 10.3222C1.20768 10.3201 0.968206 10.2196 0.791181 10.0426C0.614155 9.86559 0.51374 9.62611 0.511565 9.37577C0.509389 9.12543 0.605627 8.88425 0.77955 8.70417L4.15569 5.32803L0.77955 1.95189C0.600554 1.77284 0.5 1.53003 0.5 1.27685C0.5 1.02368 0.600554 0.780865 0.77955 0.601815Z"
                                  fill="white"
                                />
                              </svg>
                            </p>
                            &nbsp;&nbsp;
                          </div>
                        );
                      })
                    ) : (
                      <p className="card-para2">No fields of interest</p>
                    )}
                  </div>
                </div>

                <hr></hr>
                <div className="d-flex justify-content-between mt-4">
                  <h4>Academic Qualification</h4>

                  <h6 className="View-more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      cursor="pointer"
                      onClick={handleShow4}
                    >
                      <path
                        d="M15 8.4375H8.4375V15H6.5625V8.4375H0V6.5625H6.5625V0H8.4375V6.5625H15V8.4375Z"
                        fill="black"
                        fill-opacity="0.5"
                      />
                    </svg>
                  </h6>
                  {/*Academic qualification Model Start*/}

                  <UserDataModal
                    show={show4}
                    handleClose={handleClose4}
                    handleSave={handleAcademicData}
                    title="Academic Qualification"
                    subTitle="Add New Academic Qualification"
                    formFields={academicFormFields}
                  />

                  <UserDataModal
                    show={showEditAcademicModal}
                    handleClose={handleCloseEditAcademicModal}
                    handleSave={() =>
                      SaveEditedAcademicData(
                        localStorage.getItem("academicDetailId")
                      )
                    }
                    title="Academic Qualification"
                    subTitle="Edit Academic Qualification"
                    formFields={editAcademicFormFields}
                  />

                  {/*Academic qualification Model End*/}
                </div>

                <div class="carduprofl cardnew card" style={{ border: "0" }}>
                  <div class="card-body new-res-width">
                    <div class="text-section ">
                      <div>
                        {userData.academicDetails &&
                        userData.academicDetails.length > 0 ? (
                          userData.academicDetails.map((detail, index) => (
                            <div className="bordernew" key={index}>
                              <div
                                className="d-flex mt-4 "
                                style={{ justifyContent: "space-between" }}
                              >
                                <h5 className="card-title2 fw-bold">
                                  {detail.institute}
                                </h5>
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="academicQualificationEdit"
                                    width="16"
                                    height="18"
                                    viewBox="0 0 15 16"
                                    fill="none"
                                    cursor="pointer"
                                    onClick={() =>
                                      openToEditAcademicDetails(detail._id)
                                    }
                                  >
                                    <path
                                      d="M9.21542 5.51696L9.98198 6.28352L2.433 13.8325H1.66644V13.0659L9.21542 5.51696ZM12.215 0.500977C12.0067 0.500977 11.7901 0.584299 11.6318 0.74261L10.107 2.2674L13.2315 5.39198L14.7563 3.86719C14.8336 3.7901 14.8949 3.69854 14.9367 3.59774C14.9785 3.49695 15 3.38889 15 3.27977C15 3.17064 14.9785 3.06259 14.9367 2.96179C14.8949 2.86099 14.8336 2.76943 14.7563 2.69235L12.8066 0.74261C12.64 0.575966 12.4316 0.500977 12.215 0.500977ZM9.21542 3.15895L0 12.3744V15.4989H3.12458L12.34 6.28352L9.21542 3.15895Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                  </svg>
                                  &nbsp;&nbsp;
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="academicQualificationDelete"
                                    width="16"
                                    height="18"
                                    viewBox="0 0 16 18"
                                    fill="none"
                                    cursor="pointer"
                                    onClick={() =>
                                      handleDeleteAcademic(detail._id)
                                    }
                                  >
                                    <path
                                      d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <p className="card-para2">{detail.degree}</p>
                              <p className="card-para2">
                                {moment(detail.startDate).format("YYYY/MM/DD")}{" "}
                                -{" "}
                                {detail.endDate === "Present"
                                  ? "Present"
                                  : moment(detail.endDate).format("YYYY/MM/DD")}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="card-para2">
                            No academic details available
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <br></br>
                <hr></hr>
                <div className="d-flex justify-content-between mt-4">
                  <h4>Professional experience</h4>

                  <h6 className="View-more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      cursor="pointer"
                      onClick={handleShow7}
                    >
                      <path
                        d="M15 8.4375H8.4375V15H6.5625V8.4375H0V6.5625H6.5625V0H8.4375V6.5625H15V8.4375Z"
                        fill="black"
                        fill-opacity="0.5"
                      />
                    </svg>
                  </h6>
                  {/*Professional Experience  Model Start*/}
                  <UserDataModal
                    show={show7}
                    handleClose={handleClose7}
                    handleSave={handleProfessionalData}
                    title="Professional Experience"
                    subTitle="Add New Professional Experience"
                    formFields={professionalFormFields}
                  />

                  <UserDataModal
                    show={showEditProfessionalModal}
                    handleClose={handleCloseEditProfessionalModal}
                    handleSave={() => {
                      SaveEditedProfessionalData(localStorage.getItem("professionalDetailId"));
                      handleCloseEditProfessionalModal(); // Close the modal after saving
                    }}
                    title="Professional Experience"
                    subTitle="Edit Professional Experience"
                    formFields={editProfessionalFormFields}
                  />

                  {/*Professional Experience  Model End*/}
                </div>
                <div class="carduprofl cardnew card" style={{ border: "0" }}>
                  <div class="card-body new-res-width">
                    <div class="text-section">
                      <div>
                        {userData.professionalDetails &&
                        userData.professionalDetails.length > 0 ? (
                          userData.professionalDetails.map((detail, index) => (
                            <div className="bordernew" key={index}>
                              <div
                                className="d-flex justify-content-between mt-4"
                                style={{ justifyContent: "space-between" }}
                              >
                                <h5 className="card-title2 fw-bold">
                                  {detail.companyName}
                                </h5>
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="16"
                                    viewBox="0 0 15 16"
                                    fill="none"
                                    cursor="pointer"
                                    onClick={() =>
                                      openToEditProfessionalDetails(detail._id)
                                    }
                                  >
                                    <path
                                      d="M9.21542 5.51696L9.98198 6.28352L2.433 13.8325H1.66644V13.0659L9.21542 5.51696ZM12.215 0.500977C12.0067 0.500977 11.7901 0.584299 11.6318 0.74261L10.107 2.2674L13.2315 5.39198L14.7563 3.86719C14.8336 3.7901 14.8949 3.69854 14.9367 3.59774C14.9785 3.49695 15 3.38889 15 3.27977C15 3.17064 14.9785 3.06259 14.9367 2.96179C14.8949 2.86099 14.8336 2.76943 14.7563 2.69235L12.8066 0.74261C12.64 0.575966 12.4316 0.500977 12.215 0.500977ZM9.21542 3.15895L0 12.3744V15.4989H3.12458L12.34 6.28352L9.21542 3.15895Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                  </svg>
                                  &nbsp;&nbsp;
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="18"
                                    viewBox="0 0 16 18"
                                    fill="none"
                                    cursor="pointer"
                                    onClick={() =>
                                      handleDeleteProfessional(detail._id)
                                    }
                                  >
                                    <path
                                      d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                  </svg>
                                </div>
                              </div>

                              <p className="card-para2">{detail.position}</p>
                              <p className="card-para2">
                                {moment(detail.startDate).format("YYYY/MM/DD")}{" "}
                                -{" "}
                                {detail.endDate === "Present"
                                  ? "Present"
                                  : moment(detail.endDate).format("YYYY/MM/DD")}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="card-para2">
                            No Professional details available
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileEmptyView;
