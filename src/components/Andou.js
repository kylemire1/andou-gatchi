import React from "react";
import styles from "../styles/Andou.module.scss";
import andouSrc from "../images/andou.gif";
import heartSrc from "../images/heart.gif";

const Andou = ({ currentState }) => {
  return (
    <>
      <img src={andouSrc} alt="Andou dancing" />
      <img
        className={
          currentState === "thanking" ? styles.Heart + " visible" : styles.Heart
        }
        style={{ opacity: currentState === "thanking" ? 1 : 0 }}
        src={heartSrc}
        alt="A heart in a word bubble"
      />
    </>
  );
};

export default Andou;
