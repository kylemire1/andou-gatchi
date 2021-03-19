import React from "react";
import styles from "../styles/HealthBar.module.scss";

const HealthBar = ({ health }) => {
  const displayHealth = health > 100 ? 100 : health;
  return (
    <div className={styles.Healthbar}>
      <div
        className={styles.HealthbarFill}
        style={{ width: `${displayHealth}%` }}
      />
      <div className={styles.HealthbarProgress}>
        {displayHealth < 100 ? (
          `${displayHealth} / 100`
        ) : (
          <span>😈 I'm full! 😈</span>
        )}
      </div>
    </div>
  );
};

export default HealthBar;
