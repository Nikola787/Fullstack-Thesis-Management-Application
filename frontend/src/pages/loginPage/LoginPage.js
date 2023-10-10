import styles from "./LoginPage.module.css";

import TableComponent from "../../components/tableComponent/TableComponent";
import TextFieldComponent from "../../components/textFieldComponent/TextFieldComponent";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent";
import { PasswordFieldComponent } from "../../components/textFieldComponent/PasswordFieldComponent";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/service";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginPage = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const successHandler = (success) => {
    if (!success) {
      toast.error("Prijavljivanje nije uspešno", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    }
  };

  const loginHandler = async () => {
    login(username, password, navigate, props.setUserData, successHandler);
  };

  return (
    <div className={styles.page}>
      <h1>
        <div
          className={styles.title}
          style={{ borderBottom: "#8D8741 solid 2px" }}
        >
          Aplikacija za evidentiranje diplomskih radova
        </div>
      </h1>
      <div className={styles.main}>
        <div className={styles["left-box"]}>
          <h1>Prijava na sistem</h1>
          <TextFieldComponent
            id="standard-basic"
            label="Korisničko ime"
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordFieldComponent
            id="standard-password-input"
            label="Šifra"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <ButtonComponent name="Prijavite se" onClick={loginHandler} />
        </div>
        <div className={styles["right-box"]}>
          <h1>Lista svih diplomskih radova</h1>

          <TableComponent />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginPage;
