import React from "react";
import styles from "./TeacherPage.module.css";
import SwitchComponent from "../../components/switchComponent/SwitchComponent";

import TextFieldComponent from "../../components/textFieldComponent/TextFieldComponent";
import ButtonComponent from "../../components/buttonComponent/ButtonComponent";
import Navbar from "../../components/navbar/Navbar";
import TableComponent from "../../components/tableComponent/TableComponent";

import { useEffect, useState } from "react";

import { updateResource } from "../../services/service";

import { useNavigate } from "react-router-dom";

import EditProfilePage from "../editProfilePage/EditProfilePage";

import AuthContext from "../../store/auth-context";
import { useContext } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TeacherPage = () => {
  const ctx = useContext(AuthContext);

  const [thesis, setThesis] = useState(undefined);
  const [updated, setUpdated] = useState(false);

  const [editProfile, setEditProfile] = useState(false);

  const navigate = useNavigate();

  const [pdf, setPdf] = useState({
    required: false,
    download: false,
    published: false,
    href: undefined,
    id: undefined,
  });
  const [ptt, setPtt] = useState({
    required: false,
    download: false,
    published: false,
    href: undefined,
    id: undefined,
  });
  const [zip, setZip] = useState({
    required: false,
    download: false,
    published: false,
    href: undefined,
    id: undefined,
  });

  const [success, setSuccess] = useState(true);
  const [successPublished, setSuccessPublished] = useState(undefined);

  useEffect(() => {
    if (thesis) {
      setPdf({
        required: thesis.thesis.resources.some(
          (resource) => resource.resource_type.type === "PDF"
        ),
        download: thesis.thesis.resources.some(
          (resource) =>
            resource.resource_type.type === "PDF" &&
            resource.resource_file !== null
        ),
        published: thesis.thesis.resources.some(
          (resource) =>
            resource.resource_type.type === "PDF" && resource.published
        ),
      });

      setPtt({
        required: thesis.thesis.resources.some(
          (resource) => resource.resource_type.type === "PTT"
        ),
        download: thesis.thesis.resources.some(
          (resource) =>
            resource.resource_type.type === "PTT" &&
            resource.resource_file !== null
        ),
        published: thesis.thesis.resources.some(
          (resource) =>
            resource.resource_type.type === "PTT" && resource.published
        ),
      });

      setZip({
        required: thesis.thesis.resources.some(
          (resource) => resource.resource_type.type === "ZIP"
        ),
        download: thesis.thesis.resources.some(
          (resource) =>
            resource.resource_type.type === "ZIP" &&
            resource.resource_file !== null
        ),
        published: thesis.thesis.resources.some(
          (resource) =>
            resource.resource_type.type === "ZIP" && resource.published
        ),
      });

      const resourceLinks = thesis.thesis.resources.map((resource) => {
        const resourceType = resource.resource_type.type;
        const resourceFile = resource.resource_file;
        if (resourceType === "PDF") {
          setPdf((prevPdf) => ({
            ...prevPdf,
            href: resourceFile,
            id: resource.id,
          }));
        } else if (resourceType === "ZIP") {
          setZip((prevZip) => ({
            ...prevZip,
            href: resourceFile,
            id: resource.id,
          }));
        } else if (resourceType === "PTT") {
          setPtt((prevPtt) => ({
            ...prevPtt,
            href: resourceFile,
            id: resource.id,
          }));
        }
      });
    }
  }, [thesis]);

  useEffect(() => {
    setUpdated((prevUpdated) => !prevUpdated);
  }, [pdf, ptt, zip]);

  useEffect(() => {
    if (success) {
      setSuccess(false);
      console.log("pozvnaa sam", success);
      toast.success("Uspešno ste se prijavili kao nastavnik", {
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
    if (successPublished === true) {
      toast.success("Resurs je uspesno azuriran", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        theme: "light",
      });
      setSuccessPublished(undefined);
    } else if (successPublished === false) {
      toast.error("Resurs nije uspesno azuriran", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        theme: "light",
      });
      setSuccessPublished(undefined);
    }
  }, [successPublished]);

  const publishHandler = (type) => {
    if (type === "PDF") {
      updateResource(
        pdf.id,
        {
          published: !pdf.published,
        },
        setSuccessPublished
      );

      setPdf((prevPdf) => ({
        ...prevPdf,
        published: !pdf.published,
      }));
    } else if (type === "ZIP") {
      updateResource(
        zip.id,
        {
          published: !zip.published,
        },
        setSuccessPublished
      );
      setZip((prevZip) => ({
        ...prevZip,
        published: !zip.published,
      }));
    } else if (type === "PTT") {
      updateResource(
        ptt.id,
        {
          published: !ptt.published,
        },
        setSuccessPublished
      );
      setPtt((prevPtt) => ({
        ...prevPtt,
        published: !ptt.published,
        setSuccessPublished,
      }));
    }
  };

  return (
    <>
      {!editProfile && (
        <div className={styles.page}>
          <Navbar setEditProfile={setEditProfile} />
          <div className={styles.main}>
            <div className={styles["left-box"]}>
              <h1>Tabela sa svim diplomskim radovima gde ste mentor</h1>
              <TableComponent
                setThesis={setThesis}
                updated={updated}
                teacher={ctx}
              />
            </div>
            {thesis && (
              <div className={styles["right-box"]}>
                <h1>Potrebni resursi za diplomski rad</h1>
                <TextFieldComponent
                  label="Naslov diplomskog rada:"
                  defaultValue={thesis ? thesis.thesis.thesis_title : " "}
                  disabled={true}
                />
                <TextFieldComponent
                  label="Datum slanja poslednjeg resursa:"
                  defaultValue={
                    thesis && thesis.thesis.submission_date
                      ? thesis.thesis.submission_date
                      : " "
                  }
                  disabled={true}
                />
                <TextFieldComponent
                  label="Datum prijave teme za diplomski rad:"
                  defaultValue={
                    thesis
                      ? thesis.thesis.application_date
                      : " "
                  }
                  disabled={true}
                />
                <TextFieldComponent
                  label="Datum odbrane:"
                  defaultValue={
                    thesis && thesis.thesis.defense_date
                      ? thesis.thesis.defense_date
                      : " "
                  }
                  disabled={true}
                />
                <div className={styles["container-buttons"]}>
                  <div className={styles["left-buttons"]}>
                    <SwitchComponent
                      label={"Require .PDF file"}
                      switch={pdf.required}
                      id={pdf.id}
                      set={setPdf}
                      thesis_id={thesis?.thesis.id}
                    />
                    <SwitchComponent
                      label={"Require .PTT file"}
                      switch={ptt.required}
                      id={ptt.id}
                      set={setPtt}
                      thesis_id={thesis?.thesis.id}
                    />
                    <SwitchComponent
                      label={"Require .ZIP file"}
                      switch={zip.required}
                      id={zip.id}
                      set={setZip}
                      thesis_id={thesis?.thesis.id}
                    />
                  </div>
                  <div className={styles["middle-buttons"]}>
                    <ButtonComponent
                      size="small"
                      name={" download .PDF file"}
                      disabled={!pdf.download}
                      href={pdf.href}
                      download={pdf.download}
                    />
                    <ButtonComponent
                      size="small"
                      name={"download .PTT file"}
                      disabled={!ptt.download}
                      href={ptt.href}
                      download={ptt.download}
                    />
                    <ButtonComponent
                      size="small"
                      name={"download .ZIP file"}
                      disabled={!zip.download}
                      href={zip.href}
                      download={zip.download}
                    />
                  </div>
                  <div className={styles["right-buttons"]}>
                    <ButtonComponent
                      size="small"
                      name={
                        !pdf.published
                          ? "publish .pdf file"
                          : "unpublish .pdf file"
                      }
                      disabled={!pdf.download}
                      onClick={() => publishHandler("PDF")}
                    />
                    <ButtonComponent
                      size="small"
                      name={
                        !ptt.published
                          ? "publish .ptt file"
                          : "unpublish .ptt file"
                      }
                      disabled={!ptt.download}
                      onClick={() => publishHandler("PTT")}
                    />
                    <ButtonComponent
                      size="small"
                      name={
                        !zip.published
                          ? "publish .zip file"
                          : "unpublish .zip file"
                      }
                      disabled={!zip.download}
                      onClick={() => publishHandler("ZIP")}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {thesis && (
            <div className={styles["center-box-wrapper"]}>
              <div className={styles["center-box"]}>
                <div className={styles["center-left-side"]}>
                  <h1>
                    Informacije o{" "}
                    <span style={{ color: "#659DBD" }}>studentu</span>
                  </h1>
                  <TextFieldComponent
                    label="Ime i prezime:"
                    defaultValue={
                      thesis
                        ? thesis.thesis.student.name +
                          " " +
                          thesis.thesis.student.surname
                        : " "
                    }
                    disabled={true}
                  />
                  <div className={styles["mentor-information"]}>
                    <TextFieldComponent
                      label="Datum rodjenja:"
                      defaultValue={
                        thesis ? thesis.thesis.student.date_of_birth : " "
                      }
                      disabled={true}
                    />
                    <TextFieldComponent
                      label="Broj indeksa:"
                      defaultValue={
                        thesis ? thesis.thesis.student.index_number : " "
                      }
                      disabled={true}
                    />
                    <TextFieldComponent
                      label="Kontakt e-mail:"
                      defaultValue={thesis ? thesis.thesis.student.email : " "}
                      disabled={true}
                    />
                    <TextFieldComponent
                      label="Kontakt telefon:"
                      defaultValue={
                        thesis ? thesis.thesis.student.phone_number : " "
                      }
                      disabled={true}
                    />
                    <TextFieldComponent
                      label="Smer na studijama:"
                      defaultValue={thesis ? thesis.thesis.student.major : " "}
                      disabled={true}
                    />
                    <TextFieldComponent
                      label="Prosečna ocena:"
                      defaultValue={thesis ? thesis.thesis.student.gpa : " "}
                      disabled={true}
                    />
                  </div>
                </div>

                <div className={styles["center-right-side"]}>
                  <h1>
                    Informacije o{" "}
                    <span style={{ color: "#659DBD" }}>članovima komisije</span>
                  </h1>
                  <TextFieldComponent
                    label="Datum formiranja komisije:"
                    defaultValue={
                      thesis ? thesis.committee_formation_date : " "
                    }
                    disabled={true}
                  />
                  {thesis && thesis.committee_members ? (
                    thesis.committee_members.map(
                      (member, index) =>
                        member.committee_member_type.type !== "Mentor" && ( // Exclude mentors
                          <React.Fragment key={index}>
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
                        )
                    )
                  ) : (
                    <p>No committee members data available.</p>
                  )}
                </div>
              </div>
            </div>
          )}
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

export default TeacherPage;
