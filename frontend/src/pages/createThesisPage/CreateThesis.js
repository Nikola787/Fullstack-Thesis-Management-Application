import React from "react";
import styles from "./CreateThesis.module.css";

import Navbar from "../../components/navbar/NavbarStaff";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent";

import { useContext } from "react";
import AuthContext from "../../store/auth-context";

import { updateProfile } from "../../services/service";

import { useState, useEffect } from "react";

import TextFieldComponent from "../../components/textFieldComponent/TextFieldComponent";
import { DropdownSelect } from "../../components/dropdownSelect/DropdownSelect";

import { updateThesis } from "../../services/service";
import { createCommittee } from "../../services/service";
import { createCommitteeMember } from "../../services/service";
import { createThesis } from "../../services/service";
import { deleteThesis } from "../../services/service";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditProfilePage = (props) => {
  const [thesis, setThesis] = useState(undefined);
  const [updated, setUpdated] = useState(false);

  // informacije o diplomskom radu
  const [naslov, setNaslov] = useState("");
  const [datumPrijave, setDatumPrijave] = useState("");
  const [datumOdbrane, setDatumOdbrane] = useState("");
  const [opis, setOpis] = useState("");

  const [studentId, setStudentId] = useState("");

  const [mentorId, setMentorId] = useState("");
  const [clan1Id, setClan1Id] = useState("");
  const [clan2Id, setClan2Id] = useState("");

  const [success, setSuccess] = useState(true);
  const [successThesis, setSuccessThesis] = useState(undefined);

  useEffect(() => {
    if (successThesis === true) {
      toast.success("Diplomski rad je uspešno kreiran", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      setSuccessThesis(undefined);
    } else if (successThesis === false) {
      toast.error("Diplomski rad nije uspešno kreiran", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      setSuccessThesis(undefined);
    }
  }, [successThesis]);

  const isValidDateFormat = (dateString) =>
    /^\d{4}-\d{2}-\d{2}$/.test(dateString);

  const createThesisHandler = async () => {
    console.log(mentorId, clan1Id, clan2Id);
    console.log("STUDENT ID ", studentId);

    if (naslov === "") {
      toast.error("Naslov diplomskog rada je obavezno polje", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    } else if (!isValidDateFormat(datumPrijave)) {
      toast.error("Datum prijave nije napisan u validnom formatu", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    } else if (datumOdbrane !== "" && !isValidDateFormat(datumOdbrane)) {
      toast.error("Datum odbrane nije u validnom formatu!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    } else if (opis === "") {
      toast.error("Opis diplomskog rada je obavezno polje", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    } else if (studentId === "") {
      toast.error("Student nije odabran!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    } else if (
      mentorId === clan1Id ||
      clan1Id === clan2Id ||
      mentorId === clan2Id
    ) {
      toast.error("Članovi komisije nisu ispravno uneti.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    } else if (mentorId === clan2Id) {
      toast.error("Članovi komisije nisu ispravno uneti.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    } else {
      let committee_id = await createCommittee();
      // kreiramo committee_ member
      console.log(committee_id);
      console.log(mentorId);

      await createCommitteeMember(committee_id, 1, mentorId, 1);
      await createCommitteeMember(committee_id, 2, clan1Id, 2);
      await createCommitteeMember(committee_id, 3, clan2Id, 2);

      console.log("student id", studentId);

      await createThesis(
        naslov,
        "",
        datumPrijave,
        datumOdbrane,
        opis,
        studentId,
        committee_id,
        setSuccessThesis
      );
      setUpdated((prevUpdated) => !prevUpdated);

      setNaslov("");
      setDatumPrijave("");
      setDatumOdbrane("");
      setOpis("");
      setStudentId("");
      setMentorId("");
      setClan1Id("");
      setClan2Id("");
    }
  };

  const deleteHandler = async () => {
    await deleteThesis(thesis.thesis.id, thesis.thesis.committee);
    setThesis(undefined);
    setUpdated((prevUpdated) => !prevUpdated);
  };

  return (
    <div className={styles.page}>
      <Navbar
        setEditProfile={props.setEditProfile}
        setCreateThesis={props.setCreateThesis}
      />
      <div className={styles.main}>
        <div className={styles["right-box"]}>
          <h1 style={{ marginTop: "1vw" }}>
            Forma za dodavanje diplomskog rada
          </h1>
          <TextFieldComponent
            label={`Naslov diplomskog rada:`}
            defaultValue={naslov}
            shrink={true}
            onChange={(event) => setNaslov(event.target.value)}
          />
          <TextFieldComponent
            label="Datum prijave diplomskog rada (format: GGGG-MM-DD, obavezno polje):"
            defaultValue={datumPrijave}
            shrink={true}
            onChange={(event) => setDatumPrijave(event.target.value)}
          />
          <TextFieldComponent
            label="Datum odbrane (format: GGGG-MM-DD, opciono polje):"
            defaultValue={datumOdbrane}
            shrink={true}
            onChange={(event) => setDatumOdbrane(event.target.value)}
          />
          <TextFieldComponent
            label="Opis:"
            defaultValue={opis}
            shrink={true}
            onChange={(event) => setOpis(event.target.value)}
          />
          <DropdownSelect
            label="Student"
            setId={setStudentId}
            updated={updated}
          />
          <h3 style={{ margin: 0, marginBottom: "5px", marginTop: "20px" }}>
            Komisija
          </h3>

          <div
            className={styles["committee-member-box"]}
            style={{ marginBottom: "5px" }}
          >
            <DropdownSelect
              label="Mentor"
              setId={setMentorId}
              updated={updated}
            />
          </div>
          <div
            className={styles["committee-member-box"]}
            style={{ marginBottom: "5px" }}
          >
            <DropdownSelect
              label="Član komisije"
              setId={setClan1Id}
              updated={updated}
            />
          </div>
          <div
            className={styles["committee-member-box"]}
            style={{ marginBottom: "10px" }}
          >
            <DropdownSelect
              label="Član komisije"
              setId={setClan2Id}
              updated={updated}
            />
          </div>
          <div style={{ paddingTop: "2vw" }}>
            <ButtonComponent
              size="big"
              name={"Dodaj diplomski rad"}
              onClick={() => {
                createThesisHandler();
              }}
              disabled={false}
            />
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
    </div>
  );
};

export default EditProfilePage;
