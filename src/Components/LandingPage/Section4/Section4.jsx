import React, { useContext } from "react";
import classes from "./Section4.module.css";
import image from "../../../Assets/landingPageAd.png";
import logo from "../../../Assets/footerLogo.png";
import { DarkModeContext } from "../../Context/DarkModeContext";

export default function Section4() {
  const [mode, setMode] = useContext(DarkModeContext);
  return (
    <div
      style={{ backgroundColor: mode.mode ? "rgb(26, 36, 50)" : "white" }}
      className={classes.section4}
    >
      <div className={classes.imageContainer}>
        <img src={image} alt="Advert" />
      </div>
      <div
        style={{
          backgroundColor: mode.mode ? "black" : "white",
          color: mode.mode ? "white" : "black",
          boxShadow: mode.mode ? 'none' : '0 0 10px rgb(183, 183, 183)'
        }}
        className={classes.floatingContainer}
      >
        <h1 style={{ width: "50%" }}>
          Never want to miss any
          <br /> <span style={{ color: "#4540DB" }}>job opportunities?</span>
        </h1>
        <div style={{ width: "50%" }}>
          <input type="text" />
          <button>Subscribe</button>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: mode.mode ? "black" : "#F4F5FA",
          color: mode.mode ? "white" : "black",
        }}
      >
        <div
          style={{
            backgroundColor: mode.mode ? "rgb(26, 36, 50)" : "#F4F5FA",
            borderRadius: "10px",
          }}
          className={classes.footerArea}
        >
          <img
            style={{ width: "190px", height: "42px" }}
            src={logo}
            alt="footer logo"
          />
          <p>About</p>
          <p>Jobs</p>
          <p>Contact Us</p>
          <p>Terms</p>
          <p>Privacy Policy</p>
        </div>
        <div
          style={{
            boxSizing: "border-box",
            width: "90%",
            padding: "20px 0 20px 0",
            textAlign: "left",
            margin: "auto",
          }}
        >
          <p>@staffingSolutions All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
