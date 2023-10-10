import React from "react";
import styles from "./EditProfilePage.module.css";

import Navbar from "../../components/navbar/Navbar";
import TextFieldComponent from "../../components/textFieldComponent/TextFieldComponent";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent";

import { useContext } from "react";
import AuthContext from "../../store/auth-context";

import { updateProfile } from "../../services/service";

import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditProfilePage = (props) => {
  const ctx = useContext(AuthContext);

  const [disabledName, setDisabledName] = useState(true);
  const [disabledDate, setDisabledDate] = useState(true);
  const [disabledPhone, setDisabledPhone] = useState(true);
  const [disabledEmail, setDisabledEmail] = useState(true);

  const [name, setName] = useState(ctx.name + " " + ctx.surname);
  const [date, setDate] = useState(ctx.date_of_birth);
  const [phone, setPhone] = useState(ctx.phone_number);
  const [email, setEmail] = useState(ctx.email);

  const [success, setSuccess] = useState(undefined);

  useEffect(() => {
    if (success === true) {
      toast.success("Promene su uspešno sačuvane", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    } else if (success === false) {
      toast.error("Promene nisu uspešno sačuvane", {
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
  }, [success]);

  const updateHandler = async (type) => {
    let profile = ctx;

    if (type === "name") {
      let [firstName, lastName] = name.split(" ");
      profile = { ...ctx, name: firstName, surname: lastName };
      setDisabledName(true);
    } else if (type === "date") {
      profile = { ...ctx, date_of_birth: date };
      setDisabledDate(true);
    } else if (type === "phone") {
      profile = { ...ctx, phone_number: phone };
      setDisabledPhone(true);
    } else if (type === "email") {
      profile = { ...ctx, email: email };
      setDisabledEmail(true);
    }
    await updateProfile(profile, setSuccess);
  };

  return (
    <>
      <Navbar setEditProfile={props.setEditProfile} />
      <div className={styles.main}>
        <div className={styles["main-box"]}>
          <div className={styles["left-side-box"]}>
            <h1>Informacije o korisničkom profilu</h1>
            <TextFieldComponent
              label="Ime i Prezime:"
              defaultValue={!disabledName ? undefined : name}
              disabled={disabledName}
              shrink={true}
              onChange={(event) => setName(event.target.value)}
            />
            <TextFieldComponent
              label="Datum rođenja:"
              defaultValue={!disabledDate ? undefined : date}
              disabled={disabledDate}
              shrink={true}
              onChange={(event) => setDate(event.target.value)}
            />
            <TextFieldComponent
              label="Tip korisnika:"
              defaultValue={ctx.user_type}
              disabled={true}
            />
            <TextFieldComponent
              label="Kontakt telefon:"
              defaultValue={!disabledPhone ? undefined : phone}
              disabled={disabledPhone}
              shrink={true}
              onChange={(event) => setPhone(event.target.value)}
            />
            <TextFieldComponent
              label="Kontakt E-mail:"
              defaultValue={!disabledEmail ? undefined : email}
              disabled={disabledEmail}
              shrink={true}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextFieldComponent
              label="Username"
              defaultValue={ctx.username}
              disabled={true}
            />
            <TextFieldComponent
              label="Korisnička šifra:"
              defaultValue={ctx.password}
              disabled={true}
            />
          </div>
          <div className={styles["right-side-box"]}>
            <h1>___________</h1>
            <div className={styles["container-buttons"]}>
              <div className={styles["left-buttons"]}>
                <ButtonComponent
                  size="small"
                  name={"EDIT"}
                  onClick={() => {
                    setDisabledName(false);
                  }}
                  disabled={!disabledName}
                />
                <ButtonComponent
                  size="small"
                  name={"EDIT"}
                  onClick={() => {
                    setDisabledDate(false);
                  }}
                  disabled={!disabledDate}
                />
                <ButtonComponent size="small" name={"EDIT"} disabled={true} />
                <ButtonComponent
                  size="small"
                  name={"EDIT"}
                  onClick={() => {
                    setDisabledPhone(false);
                  }}
                  disabled={!disabledPhone}
                />
                <ButtonComponent
                  size="small"
                  name={"EDIT"}
                  onClick={() => {
                    setDisabledEmail(false);
                  }}
                  disabled={!disabledEmail}
                />
                <ButtonComponent size="small" name={"EDIT"} disabled={true} />
                <ButtonComponent size="small" name={"EDIT"} disabled={true} />
              </div>
              <div className={styles["right-buttons"]}>
                <ButtonComponent
                  size="small"
                  name={"UPDATE"}
                  disabled={disabledName}
                  onClick={() => updateHandler("name")}
                />
                <ButtonComponent
                  size="small"
                  name={"UPDATE"}
                  disabled={disabledDate}
                  onClick={() => updateHandler("date")}
                />
                <ButtonComponent size="small" name={"UPDATE"} disabled={true} />
                <ButtonComponent
                  size="small"
                  name={"UPDATE"}
                  disabled={disabledPhone}
                  onClick={() => updateHandler("phone")}
                />
                <ButtonComponent
                  size="small"
                  name={"UPDATE"}
                  disabled={disabledEmail}
                  onClick={() => updateHandler("email")}
                />
                <ButtonComponent size="small" name={"UPDATE"} disabled={true} />
                <ButtonComponent size="small" name={"UPDATE"} disabled={true} />
              </div>
            </div>
          </div>
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
    </>
  );
};

export default EditProfilePage;
