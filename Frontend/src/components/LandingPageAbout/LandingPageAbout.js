import React from "react";
import "../LandingPage/Landing.css";
import LandingNavBar from "../LandingNavBar/LandingNavBar";
import pro1 from "./img/KanishkaWeeramunda.jpg";
import pro2 from "./img/MiuliKalubovila.jpg";
import pro3 from "./img/ChathushkeeAmuwatta.jpeg";
import pro4 from "./img/IsuruUdana.jpeg";
import pro5 from "./img/TharushiJayawardana.jpg";
import pro6 from "./img/Anjana.jpg";
import pro7 from "./img/RaminduLakshan.jpg";
import pro8 from "./img/DilshanPriyawansha.jpg";
import pro9 from "./img/YasinduSanjeewa.jpg";
import pro10 from "./img/GaurawaBandara.jpg";
import pro11 from "./img/UshmikaKavishan.jpg";
import pro12 from "./img/ShamindiHettisinghe.jpg";
import pro13 from "./img/SandukaSanahas.jpg";
import pro14 from "./img/MohamedShinan.jpg";
import pro15 from "./img/BuddiniPathinayayaka.jpg";
import pro16 from "./img/ShenaliMadurapperuma.jpg";

function LandingPageAbout() {
  const teamMembers = [
    { name: "Kanishka Weeramunda", role: "Director/Advisor", img: pro1 },
    { name: "Miuli<br/>Kalubovila", role: "Founder", img: pro2 },
    { name: "Chathushkee Amuwatta", role: "Senior Project Manager", img: pro3 },
    { name: "Isuru<br/>Udana", role: "Project Manager", img: pro4 },
  ];

  const teamMembersVersion2 = [
    { name: "Tharushi Jayawardana", role: "UI/UX Designer", img: pro5 },
    { name: "Irani<br/>Aanjana", role: "UI/UX Designer", img: pro6 },
    { name: "Ramindu<br/>Lakshan", role: "Frontend Developer", img: pro7 },
    { name: "Dilshan Priyawansha", role: "Frontend Developer", img: pro8 },
    { name: "Yasindu Sanjeewa", role: "Devops/Backend Developer", img: pro9 },
    { name: "Gaurawa<br/>Bandara", role: "Backend Developer", img: pro10 },
    { name: "Ushmika<br/>Kavishan", role: "Quality Assurance", img: pro11 },
  ];

  const teamMembersVersion3 = [
    { name: "Shamindi Hettisinghe", role: "Backend Developer", img: pro12 },
    { name: "Sanduka<br/>Sanahas", role: "Backend Developer", img: pro13 },
    {
      name: "Mohamed Shinan",
      role: "Devops/Backend Developer",
      img: pro14,
    },
    { name: "Buddini Pathinayaka", role: "UI/Frontend Developer", img: pro15 },
    { name: "Shenali Madurapperuma", role: "UI/UX Designer", img: pro16 },
  ];

  return (
    <div>
      <section className="">
        <div>
          <LandingNavBar />
          <div className="text-center cenclz mt-4">
            <h5 className="topic_landin fadeInUp">About Us</h5>
            <p className="paraabty fadeInUp">
              Generation ALPHA is a company dedicated to providing a unique
              space for young adults to discover their passions, enhance their
              skills, and shape their futures. Our students receive a
              membership, offering them a project-based learning experience.
              Engaged in various projects, such as sharing entrepreneurial
              knowledge in schools and universities and collaborating on
              corporate partnerships, our members actively participate and gain
              industry exposure. Therefore, we also act as an entity that
              connects the corporate world with the student community.
            </p>
          </div>

          {/* Version 1 */}
          <div className="dtabx">
            <h5 className="topic_about_lan fadeInUp text-center mb-5">
              Meet the team
            </h5>
            <div className="d-flex justify-content-center">
              <div className="container">
                <div className="row justify-content-center align-items-center">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="col-sm-4 col-md-4 col-lg-2 text-center fadeInUp d-flex flex-column align-items-center"
                    >
                      <div className="pbtn2oo">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="img-fluid rounded-circle"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      {/* <p className="mb-0 pintflnme">{member.name}</p> */}
                      <p
                        className="mb-0 pintflnme"
                        dangerouslySetInnerHTML={{ __html: member.name }}
                      ></p>
                      <p className="mb-0">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Version 2 */}
          <div className="dtabx">
            <h5 className="topic_about_lan fadeInUp text-center mb-5">
              Version 2 (Development Team)
            </h5>
            <div className="d-flex justify-content-center">
              <div className="container">
                <div className="row justify-content-center align-items-center">
                  {teamMembersVersion2.map((member, index) => (
                    <React.Fragment key={index}>
                      <div className="col-sm-4 col-md-4 col-lg-2 text-center fadeInUp d-flex flex-column align-items-center">
                        <div className="pbtn2oo">
                          <img
                            src={member.img}
                            alt={member.name}
                            className="img-fluid rounded-circle"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <p
                          className="mb-0 pintflnme"
                          dangerouslySetInnerHTML={{ __html: member.name }}
                        ></p>
                        <p className="mb-0">{member.role}</p>
                      </div>

                      {/* Insert a row break after the 5th member with spacing */}
                      {index === 4 && <div className="w-100 mt-4 mb-4"></div>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Version 3 */}
          <div className="dtabx">
            <h5 className="topic_about_lan fadeInUp text-center mb-5">
              Version 3 (Development Team)
            </h5>
            <div className="d-flex justify-content-center">
              <div className="container">
                <div className="row justify-content-center align-items-center">
                  {teamMembersVersion3.map((member, index) => (
                    <div
                      key={index}
                      className="col-sm-4 col-md-4 col-lg-2 text-center fadeInUp d-flex flex-column align-items-center"
                    >
                      <div className="pbtn2oo">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="img-fluid  rounded-circle"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      {/* <p className="mb-0 pintflnme">{member.name}</p> */}
                      <p
                        className="mb-0 pintflnme"
                        dangerouslySetInnerHTML={{ __html: member.name }}
                      ></p>
                      <p className="mb-0">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPageAbout;
