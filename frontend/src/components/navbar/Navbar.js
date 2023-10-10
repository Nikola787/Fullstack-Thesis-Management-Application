// Navbar.js
import React from "react";
import styles from "./Navbar.module.css";

import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const mainTabStyle = {
  color: "#333",
  backgroundColor: "#fff",
  padding: "8px 20px",
  borderRadius: "5px",
};

const Navbar = (props) => {
  
  const ctx = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-left"]}>
        <span className={styles.logo}>
          {ctx.name} {ctx.surname}
        </span>
      </div>
      <div className={styles["navbar-right"]}>
        <a href="#" className={styles["nav-link"]} onClick={() => props.setEditProfile(false)}>
          Main
        </a>
        <a href="#" className={styles["nav-link"]} onClick={() => props.setEditProfile(true)}>
          Edit Profile
        </a>
        <a href="/" className={styles["nav-link"]}>
          Logout
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
