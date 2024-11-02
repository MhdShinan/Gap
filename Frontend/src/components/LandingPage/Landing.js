import React, { useEffect, useState } from "react";
import "../LandingPage/Landing.css";
import CountUp from "react-countup";
import { backEndURL } from "../../backendUrl";
import axios from "axios";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import LandingNavBar from "../LandingNavBar/LandingNavBar";
const LandingPage = () => {
  const [userCount, setUserCount] = useState(0);
  const [mentorCount, setMentorCount] = useState(0);

  const fetchUserCount = async () => {
    try {
      const response = await axios.get(`${backEndURL}/members`);
      setUserCount(response.data.members);
    } catch (error) {
      console.error("Error fetching user count: ", error);
    }
  };

  const fetchMentorCount = async () => {
    try {
      const response = await axios.get(`${backEndURL}/mentors`);
      setMentorCount(response.data.mentors);
    } catch (error) {
      console.error("Error fetching mentor count: ", error);
    }
  };

  useEffect(() => {
    fetchMentorCount();
    fetchUserCount();
  }, []);

  const [loading, setLoading] = useState(true); // Added loading state
  // Preloader component
  const Preloader = () => (
    <div className="preloader">
      <DotLottieReact
        src="https://lottie.host/82cf1e8e-cb8c-4582-9d0a-59190449037f/vbA6GYmiYb.json"
        loop
        autoplay
        style={{
          maxWidth: "200px"
        }}
      />
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      await Promise.all([fetchUserCount(), fetchMentorCount()]);
      setLoading(false); // Set loading to false after fetching data
    };
    fetchData();
  }, []);
  if (loading) { // Conditional rendering based on loading state
    return <Preloader/>; // Show preloader if loading
  }

  return (
    <>
      <section className="new-background">
        <div className="">
          <LandingNavBar />
          <div className="landing-set-res">
            <div>
              <div className="para_landing fadeInUp" style={{ animationDelay: "0.3s" }}>
                <h1 className="topic_landin">
                  Explore The World And Discover <br /> Your Potential
                </h1>
                <h1 className="custom-text-LA2 text-center mb-1 mt-1">
                  Connect with industry pros, discover opportunities, showcase
                  your skills. Join a thriving community, and empower <br />{" "}
                  your future. Your journey starts here!
                </h1>
              </div>
              <div className="land_card_main_landpage">
                <div className="land_card_perant">
                  <div className="land_card fadeInUp">
                    <div>
                      <div>
                        <h1>
                          <CountUp
                            start={0}
                            // end={mentorCount}
                            end={54}
                            duration={0.4}
                            delay={0}
                          />
                        </h1>
                      </div>
                      <h3 style={{ color: "#2A2A72", fontSize: "24px" }}>
                        Mentors
                      </h3>
                    </div>
                  </div>
                  <div className="land_card fadeInUp">
                    <div>
                      <div>
                        <h1>
                          <CountUp
                            start={0}
                            end={userCount}
                            duration={2}
                            delay={0}
                          />
                        </h1>
                      </div>
                      <h3 className="land_card_topic">Members</h3>
                    </div>
                  </div>
                  <div className="land_card fadeInUp">
                    <div>
                      <div>
                        <h1>
                          <CountUp start={0} end={52} duration={4} delay={0} />
                        </h1>
                      </div>
                      <h3 className="land_card_topic">Sessions</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-3 fadeInUp">
                <button
                  className="btn btn-lan-btn custom-button-reset2"
                  type="button"
                  onClick={() => {
                    window.location.href = "/register";
                  }}
                >
                  Register For Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
