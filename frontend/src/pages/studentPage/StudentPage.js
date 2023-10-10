import styles from "./StudentPage.module.css";

import TextFieldComponent from "../../components/textFieldComponent/TextFieldComponent";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent";
import Navbar from "../../components/navbar/Navbar";

import { useContext, useEffect } from "react";
import React from "react";
import AuthContext from "../../store/auth-context";
import { useState } from "react";

import { getThesisByStudentId } from "../../services/service";
import { updateResource } from "../../services/service";
import { updateSubmissionDate } from "../../services/service";

import { uploadFile } from "../../services/service";
import { deleteResource } from "../../services/service";

import axios from "axios";
import { getTableData } from "../../services/service";

import EditProfilePage from "../editProfilePage/EditProfilePage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const StudentPage = (props) => {
  const [studentThesis, setStudentThesis] = useState("");

  const [editProfile, setEditProfile] = useState(false);

  const [pdf, setPdf] = useState({
    id: undefined,
    file: undefined,
    download: false,
    add: false,
    remove: false,
  });

  const [ptt, setPtt] = useState({
    id: undefined,
    file: undefined,
    download: false,
    add: false,
    remove: false,
  });

  const [zip, setZip] = useState({
    id: undefined,
    file: undefined,
    download: false,
    add: false,
    remove: false,
  });

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedPtt, setSelectedPtt] = useState(null);
  const [selectedZip, setSelectedZip] = useState(null);

  const [updated, setUpdated] = useState(false);

  const ctx = useContext(AuthContext);

  const [jsonData, setJsonData] = useState([]);
  const [thesis, setThesis] = useState(undefined);

  const [success, setSuccess] = useState(true);

  const [successUpload, setSuccessUpload] = useState(undefined);
  const [successRemove, setSuccessRemove] = useState(undefined);

  useEffect(() => {
    getTableData(setJsonData);
  }, []);

  useEffect(() => {
    if (successUpload === true) {
      toast.success("Resurs je uspešno otpremljen", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      setSuccessUpload(undefined);
    } else if (successUpload === false) {
      toast.error("Resurs nije uspešno otpremljen", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      setSuccessUpload(undefined);
    }

    if (successRemove === true) {
      toast.success("Resurs je uspešno obrisan", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      setSuccessRemove(undefined);
    } else if (successRemove === false) {
      toast.error("Resurs nije uspešno obrisan", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      setSuccessRemove(undefined);
    }
  }, [successUpload, successRemove]);

  useEffect(() => {
    jsonData.forEach((item) => {
      if (item.thesis.student.id === ctx.id) {
        setThesis(item);
        console.log(thesis);
      }
    });
  }, [jsonData]);

  useEffect(() => {
    getThesisByStudentId(ctx.id, setStudentThesis);
  }, [updated]);

  useEffect(() => {
    // setup buttona za resurse
    // 1-PDF 2-PTT 3-ZIP
    // ako je resourse_file === null
    const resources = studentThesis[0]?.resources;
    resources?.map((resource) => {
      if (resource.resource_type.id === 1) {
        if (resource.resource_file === null) {
          setPdf({
            id: resource.id,
            file: undefined,
            download: false,
            add: true,
            remove: false,
          });
        } else {
          setPdf({
            id: resource.id,
            file: resource.resource_file,
            download: true,
            add: false,
            remove: true,
          });
        }
      }

      if (resource.resource_type.id === 2) {
        if (resource.resource_file === null) {
          setPtt({
            id: resource.id,
            file: undefined,
            download: false,
            add: true,
            remove: false,
          });
        } else {
          setPtt({
            id: resource.id,
            file: resource.resource_file,
            download: true,
            add: false,
            remove: true,
          });
        }
      }

      if (resource.resource_type.id === 3) {
        if (resource.resource_file === null) {
          setZip({
            id: resource.id,
            file: undefined,
            download: false,
            add: true,
            remove: false,
          });
        } else {
          setZip({
            id: resource.id,
            file: resource.resource_file,
            download: true,
            add: false,
            remove: true,
          });
        }
      }
    });
  }, [studentThesis]);

  useEffect(() => {
    if (success) {
      setSuccess(false);
      console.log("pozvnaa sam", success);
      toast.success("Uspešno ste se prijavili kao student", {
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

  const addClickHandler = async (type, event) => {
    // const selectedFile = event.target.files[0];
    let formData = new FormData();

    if (type === "pdf") {
      setSelectedPdf(event.target.files[0]);
      formData.append("resource_file", event.target.files[0]);
      await uploadFile(pdf.id, formData, setSuccessUpload);
    } else if (type === "ptt") {
      setSelectedPtt(event.target.files[0]);
      formData.append("resource_file", event.target.files[0]);
      await uploadFile(ptt.id, formData, setSuccessUpload);
    } else {
      setSelectedZip(event.target.files[0]);
      formData.append("resource_file", event.target.files[0]);
      await uploadFile(zip.id, formData, setSuccessUpload);
    }

    event.target.value = null;
    await updateSubmissionDate(studentThesis[0].id);
    setUpdated((prev) => !prev);
  };

  const removeClickHandler = async (type) => {
    if (type === "pdf") {
      await uploadFile(pdf.id, { resource_file: null }, setSuccessRemove);
      setSelectedPdf(null);
    } else if (type === "ptt") {
      await uploadFile(ptt.id, { resource_file: null }, setSuccessRemove);
      setSelectedPtt(null);
    } else {
      await uploadFile(zip.id, { resource_file: null }, setSuccessRemove);
      setSelectedZip(null);
    }
    setUpdated((prev) => !prev);
  };

  return (
    <>
      {!editProfile && (
        <div className={styles.page}>
          <Navbar setEditProfile={setEditProfile} />
          <div className={styles.main}>
            {thesis && (
              <>
                <div className={styles["left-box"]}>
                  <div className={styles["left-upper-box"]}>
                    <h1>Informacije o diplomskom radu</h1>
                    <TextFieldComponent
                      label="Naslov diplomskog rada:"
                      defaultValue={studentThesis[0]?.thesis_title}
                      disabled={true}
                      shrink={true}
                    />
                    <TextFieldComponent
                      label="Datum slanja poslednjeg resursa:"
                      defaultValue={
                        studentThesis[0]?.submission_date
                          ? studentThesis[0]?.submission_date
                          : " "
                      }
                      disabled={true}
                      shrink={true}
                    />
                    <TextFieldComponent
                      label="Datum prijave teme za diplomski rad:"
                      defaultValue={studentThesis[0]?.application_date}
                      disabled={true}
                      shrink={true}
                    />
                    <TextFieldComponent
                      label="Datum odbrane:"
                      defaultValue={studentThesis[0]?.defense_date}
                      disabled={true}
                      shrink={true}
                    />
                  </div>

                  <div className={styles["left-down-box"]}>
                    <h1>Potrebni resursi</h1>
                    <div className={styles["container-buttons"]}>
                      <div className={styles["left-buttons"]}>
                        <ButtonComponent
                          size="small"
                          name={" download .PDF file"}
                          disabled={!pdf.download}
                          href={pdf.file}
                          download={pdf.download}
                        />
                        <ButtonComponent
                          size="small"
                          name={"download .PTT file"}
                          disabled={!ptt.download}
                          href={ptt.file}
                          download={ptt.download}
                        />
                        <ButtonComponent
                          size="small"
                          name={"download .ZIP file"}
                          disabled={!zip.download}
                          href={zip.file}
                          download={zip.download}
                        />
                      </div>
                      <div className={styles["middle-buttons"]}>
                        {/* <ButtonComponent
                  size="small"
                  // name={"add .pdf file"}
                  disabled={!pdf.add}
                  // onClick={() => addClickHandler("pdf")}
                /> */}
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(event) => addClickHandler("pdf", event)}
                          disabled={!pdf.add}
                        />
                        {/* <ButtonComponent
                  size="small"
                  name={"add .ptt file"}
                  disabled={!ptt.add}
                  onClick={() => addClickHandler("ptt")}
                /> */}
                        <input
                          type="file"
                          accept=".ptt"
                          onChange={(event) => addClickHandler("ptt", event)}
                          disabled={!ptt.add}
                        />
                        {/* <ButtonComponent
                  size="small"
                  name={"add .zip file"}
                  disabled={!zip.add}
                  onClick={() => addClickHandler("zip")}
                /> */}
                        <input
                          type="file"
                          accept=".zip"
                          onChange={(event) => addClickHandler("zip", event)}
                          disabled={!zip.add}
                        />
                      </div>
                      <div className={styles["right-buttons"]}>
                        <ButtonComponent
                          size="small"
                          name={"remove .pdf file"}
                          disabled={!pdf.remove}
                          onClick={() => removeClickHandler("pdf")}
                        />
                        <ButtonComponent
                          size="small"
                          name={"remove .ptt file"}
                          disabled={!ptt.remove}
                          onClick={() => removeClickHandler("ptt")}
                        />
                        <ButtonComponent
                          size="small"
                          name={"remove .zip file"}
                          disabled={!zip.remove}
                          onClick={() => removeClickHandler("zip")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles["right-box"]}>
                  <h1>Informacije o komisiji</h1>
                  <TextFieldComponent
                    label="Datum formiranja komisije:"
                    defaultValue={
                      thesis ? thesis.committee_formation_date : " "
                    }
                    disabled={true}
                  />
                  {thesis && thesis.committee_members ? (
                    thesis.committee_members.map((member, index) => (
                      <React.Fragment key={index}>
                        {member.committee_member_type.type === "Mentor" ? (
                          <React.Fragment>
                            <TextFieldComponent
                              label={`Mentor:`}
                              defaultValue={`${member.teacher.name} ${member.teacher.surname}`}
                              disabled={true}
                            />
                            <div className={styles["mentor-information"]}>
                              <TextFieldComponent
                                label="Katedra:"
                                defaultValue={member.teacher.chair.name}
                                disabled={true}
                              />
                              <TextFieldComponent
                                label="Kontakt e-mail:"
                                defaultValue={member.teacher.email}
                                disabled={true}
                              />
                              <TextFieldComponent
                                label="Kontakt telefon:"
                                defaultValue={member.teacher.phone_number}
                                disabled={true}
                              />
                            </div>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <TextFieldComponent
                              label={`Član komisije ${member.number}:`}
                              defaultValue={`${member.teacher.name} ${member.teacher.surname}`}
                              disabled={true}
                            />
                            <div className={styles["mentor-information"]}>
                              <TextFieldComponent
                                label="Katedra:"
                                defaultValue={member.teacher.chair.name}
                                disabled={true}
                              />
                              <TextFieldComponent
                                label="Kontakt e-mail:"
                                defaultValue={member.teacher.email}
                                disabled={true}
                              />
                              <TextFieldComponent
                                label="Kontakt telefon:"
                                defaultValue={member.teacher.phone_number}
                                disabled={true}
                              />
                            </div>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <p>No committee members data available.</p>
                  )}
                </div>
              </>
            )}
            {!thesis && (
              <>
                Diplomski rad još uvek nije kreiran. Kada ga službenik bude
                kreirao sve informacije će biti prikazane na ovoj strani.
              </>
            )}
          </div>
        </div>
      )}
      {editProfile && <EditProfilePage setEditProfile={setEditProfile} />}
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

export default StudentPage;
