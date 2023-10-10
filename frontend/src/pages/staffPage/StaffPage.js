import styles from "./StaffPage.module.css";

import React from "react";

import TextFieldComponent from "../../components/textFieldComponent/TextFieldComponent";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent";
import Navbar from "../../components/navbar/NavbarStaff";
import TableComponent from "../../components/tableComponent/TableComponent";
import { DropdownSelect } from "../../components/dropdownSelect/DropdownSelect";

import { useEffect, useState } from "react";

import { updateThesis } from "../../services/service";
import { createCommittee } from "../../services/service";
import { createCommitteeMember } from "../../services/service";
import { createThesis } from "../../services/service";
import { deleteThesis } from "../../services/service";

import { useNavigate } from "react-router-dom";

import EditProfilePage from "../editProfilePage/EditProfilePage";
import CreateThesis from "../createThesisPage/CreateThesis.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const StaffPage = (props) => {
  const [thesis, setThesis] = useState(undefined);
  const [updated, setUpdated] = useState(false);

  const [editProfile, setEditProfile] = useState(false);
  const [createThesis, setCreateThesis] = useState(false);

  const [disabledTitle, setDisabledTitle] = useState(true);
  const [disabledSubmission, setDisabledSubmission] = useState(true);
  const [disabledApplication, setDisabledApplication] = useState(true);
  const [disabledDefense, setDisabledDefense] = useState(true);
  const [disabledDescription, setDisabledDescription] = useState(true);

  const [title, setTitle] = useState(undefined);
  const [submission, setSubmission] = useState(undefined);
  const [application, setApplication] = useState(undefined);
  const [defense, setDefense] = useState(undefined);
  const [description, setDescription] = useState(undefined);

  // informacije o diplomskom radu
  const [naslov, setNaslov] = useState("");
  const [datumOdbrane, setDatumOdbrane] = useState("");
  const [opis, setOpis] = useState("");

  const [studentId, setStudentId] = useState("");

  const [mentorId, setMentorId] = useState("");
  const [clan1Id, setClan1Id] = useState("");
  const [clan2Id, setClan2Id] = useState("");

  const [success, setSuccess] = useState(true);
  const [successThesis, setSuccessThesis] = useState(undefined);
  const [successEdit, setSuccessEdit] = useState(undefined);

  useEffect(() => {
    setTitle(thesis?.thesis.thesis_title);
    setSubmission(thesis?.thesis.submission_date);
    setApplication(thesis?.thesis.application_date);
    setDefense(thesis?.thesis.defense_date);
    setDescription(thesis?.thesis.description);
  }, [thesis]);

  useEffect(() => {
    if (success) {
      setSuccess(false);
      console.log("pozvnaa sam", success);
      toast.success("Uspešno ste se prijavili kao službenik", {
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
  }, []);

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

    if (successEdit === true) {
      toast.success("Promene su uspešno evidentirane", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      setSuccessEdit(undefined);
    } else if (successEdit === false) {
      toast.error("Promene nisu uspešno evidentirane", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      setSuccessEdit(undefined);
    }
  }, [successThesis, successEdit]);

  const updateHandler = async (type) => {

    let updatedThesis;
    console.log("pozvan je update handler");

    if (type === "title") {
      updatedThesis = { ...thesis, thesis_title: title };
      setDisabledTitle(true);
    } else if (type === "submission") {
      updatedThesis = { ...thesis, submission_date: submission };
      setDisabledSubmission(true);
    } else if (type === "application") {
      updatedThesis = { ...thesis, application_date: application.trim() };
      setDisabledApplication(true);
    } else if (type === "defense") {
      updatedThesis = { ...thesis, defense_date: defense.trim() };
      setDisabledDefense(true);
    } else if (type === "description") {
      updatedThesis = { ...thesis, description: description };
      setDisabledDescription(true);
    }

    await updateThesis(updatedThesis, setSuccessEdit);
    setUpdated((prevUpdated) => !prevUpdated);
  };

  const createThesisHandler = async () => {
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
      datumOdbrane,
      opis,
      studentId,
      committee_id,
      setSuccessThesis
    );
    setUpdated((prevUpdated) => !prevUpdated);

    setNaslov("");
    setDatumOdbrane("");
    setOpis("");
    setStudentId("");
    setMentorId("");
    setClan1Id("");
    setClan2Id("");
  };

  const deleteHandler = async () => {
    await deleteThesis(thesis.thesis.id, thesis.thesis.committee);
    setThesis(undefined);
    setUpdated((prevUpdated) => !prevUpdated);
  };

  return (
    <>
      {!editProfile && !createThesis && (
        <div className={styles.page}>
          <Navbar
            setEditProfile={setEditProfile}
            setCreateThesis={setCreateThesis}
          />
          <div className={styles.main}>
            <div className={styles["left-box"]}>
              <div className={styles["left-top-box"]}>
                <h1>Tabela sa svim diplomskim radovima</h1>
                <TableComponent setThesis={setThesis} updated={updated} />
              </div>
              {thesis && (
                <div className={styles["left-bottom-box"]}>
                  <div className={styles["main-edit-box"]}>
                    <div className={styles["main-box"]}>
                      <div className={styles["left-side-box"]}>
                        <h1>Informacije o diplomskom radu</h1>
                        <TextFieldComponent
                          label={`Naslov diplomskog rada:`}
                          defaultValue={thesis ? title : " "}
                          disabled={disabledTitle}
                          shrink={true}
                          onChange={(event) => setTitle(event.target.value)}
                        />
                        <TextFieldComponent
                          label="Datum slanja poslednjeg resursa:"
                          defaultValue={thesis && submission ? submission : " "}
                          shrink={true}
                          disabled={disabledSubmission}
                          onChange={(event) =>
                            setSubmission(event.target.value)
                          }
                        />
                        <TextFieldComponent
                          label="Datum prijave teme za diplomski rad"
                          defaultValue={
                            thesis && application ? application : " "
                          }
                          shrink={true}
                          disabled={disabledApplication}
                          onChange={(event) =>
                            setApplication(event.target.value)
                          }
                        />
                        <TextFieldComponent
                          label="Datum odbrane"
                          defaultValue={thesis && defense ? defense : " "}
                          shrink={true}
                          disabled={disabledDefense}
                          onChange={(event) => setDefense(event.target.value)}
                        />
                        <TextFieldComponent
                          label="Opis:"
                          defaultValue={thesis ? description : " "}
                          shrink={true}
                          disabled={disabledDescription}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
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
                                setDisabledTitle(false);
                              }}
                              disabled={!disabledTitle || title === undefined}
                            />
                            <ButtonComponent
                              size="small"
                              name={"EDIT"}
                              onClick={() => {
                                setDisabledSubmission(false);
                              }}
                              disabled={
                                true
                              }
                            />
                            <ButtonComponent
                              size="small"
                              name={"EDIT"}
                              onClick={() => {
                                setDisabledApplication(false);
                              }}
                              disabled={
                                !disabledApplication ||
                                application === undefined
                              }
                            />
                            <ButtonComponent
                              size="small"
                              name={"EDIT"}
                              onClick={() => {
                                setDisabledDefense(false);
                              }}
                              disabled={
                                !disabledDefense || defense === undefined
                              }
                            />
                            <ButtonComponent
                              size="small"
                              name={"EDIT"}
                              onClick={() => {
                                setDisabledDescription(false);
                              }}
                              disabled={
                                !disabledDescription ||
                                description === undefined
                              }
                            />
                          </div>
                          <div className={styles["right-buttons"]}>
                            <ButtonComponent
                              size="small"
                              name={"UPDATE"}
                              disabled={disabledTitle}
                              onClick={() => updateHandler("title")}
                            />
                            <ButtonComponent
                              size="small"
                              name={"UPDATE"}
                              disabled={disabledSubmission}
                              onClick={() => updateHandler("submission")}
                            />
                            <ButtonComponent
                              size="small"
                              name={"UPDATE"}
                              disabled={disabledApplication}
                              onClick={() => updateHandler("application")}
                            />
                            <ButtonComponent
                              size="small"
                              name={"UPDATE"}
                              disabled={disabledDefense}
                              onClick={() => updateHandler("defense")}
                            />
                            <ButtonComponent
                              size="small"
                              name={"UPDATE"}
                              disabled={disabledDescription}
                              onClick={() => updateHandler("description")}
                            />
                          </div>
                        </div>
                        <div
                          style={{ marginTop: "20px", marginBottom: "-15px" }}
                        >
                          <ButtonComponent
                            size="small"
                            name={"DELETE THESIS"}
                            disabled={description === undefined}
                            onClick={() => deleteHandler()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {editProfile && !createThesis && (
        <EditProfilePage setEditProfile={setEditProfile} />
      )}
      {!editProfile && createThesis && (
        <CreateThesis
          setEditProfile={setEditProfile}
          setCreateThesis={setCreateThesis}
        />
      )}
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

export default StaffPage;
