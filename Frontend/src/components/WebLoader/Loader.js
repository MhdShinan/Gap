import React, { useEffect } from "react";
import "./Loader.css";

function Loader() {
  useEffect(() => {
    const elements = document.querySelectorAll(".loader-clm");

    function changeAnimation() {
      elements.forEach(function (e) {
        var height = Math.round(Math.max(Math.random(), 0.3) * 10) / 10; // Min value = 0.3; Round to one decimal
        e.style.setProperty("--animationHeight", height);
      });
    }

    const intervalId = setInterval(changeAnimation, 400);

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []); // Empty dependency array ensures that the effect runs only once

  return (
    <div>
      <div className="loader-body">
        <div>
          <div className="loader loader-body">
            <div className="loader-clm"></div>
            <div className="loader-clm"></div>
            <div className="loader-clm"></div>
          </div>
          <h1 className="loading-topic blink-load">Loading..</h1>
        </div>
      </div>
    </div>
  );
}

export default Loader;
