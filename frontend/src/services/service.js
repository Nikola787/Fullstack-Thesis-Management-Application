import axios from "axios";
// moje funkcije

export const getTableData = async (setJsonData) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/thesis-table/",
      {}
    );

    if (response.status === 200) {
      setJsonData(response.data);
    }
  } catch (error) {
    // Handle error if needed
  }
};

export const login = async (
  username,
  password,
  navigate,
  setUserData,
  successHandler
) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/login/", {
      username,
      password,
    });
    if (response.status === 200) {
      if (response.data.message === "Student login successful") {
        setUserData(response.data);
        navigate("/student-page");
        successHandler(true);
      }
      if (response.data.message === "Teacher login successful") {
        setUserData(response.data);
        navigate("/teacher-page");
        successHandler(true);
      }
      if (response.data.message === "Staff login successful") {
        setUserData(response.data);
        navigate("/staff-page");
        successHandler(true);
      }
    } else {
      successHandler(false);
    }
  } catch (error) {
    successHandler(false);
  }
};

export const updateResource = async (id, data, setSuccessPublished) => {
  const headers = {
    "Content-Type": "application/json",
  };

  await axios
    .patch(`http://127.0.0.1:8000/api/resources/${id}/`, data, { headers })
    .then((response) => {
      setSuccessPublished(true);
    })
    .catch((error) => {
      console.error("Error updating resource:", error);
      setSuccessPublished(false);
    });
};

export const uploadFile = async (id, data, setSuccessUpload) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "multpart/form-data",
    },
  };

  await axios
    .patch(`http://127.0.0.1:8000/api/resources/${id}/`, data, { axiosConfig })
    .then((response) => {
      setSuccessUpload(true);
    })
    .catch((error) => {
      setSuccessUpload(false);
      console.error("Error updating resource:", error);
    });
};

export const deleteResource = async (id) => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/resources/${id}/`,
      { headers }
    );
  } catch (error) {
    console.error("Error deleting resource:", error);
  }
};

export const createResource = async (
  resource_type_id,
  name,
  resource_file,
  published,
  thesis_id
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/resources/",
      {
        resource_type: resource_type_id,
        name: name,
        resource_file,
        published: published,
        thesis: thesis_id,
      },
      { headers }
    );
    return response.data.id;
  } catch (error) {
    console.error("Error creating resource:", error);
  }
};

export const updateProfile = async (profile, setSuccess) => {
  const headers = {
    "Content-Type": "application/json",
  };

  await axios
    .patch(`http://127.0.0.1:8000/api/user_profiles/${profile.id}/`, profile, {
      headers,
    })
    .then((response) => {
      setSuccess(true);
    })
    .catch((error) => {
      setSuccess(false);
    });
};

export const getThesisByStudentId = async (studentId, setStudentThesis) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/thesis/${studentId}/`,
      {}
    );

    if (response.status === 200) {
      setStudentThesis(response.data);
    }
  } catch (error) {
    // Handle error if needed
  }
};

export const updateThesis = async (thesis, setSuccessEdit) => {
  const headers = {
    "Content-Type": "application/json",
  };

  await axios
    .patch(`http://127.0.0.1:8000/api/theses/${thesis.thesis.id}/`, thesis, {
      headers,
    })
    .then((response) => {
      // alert("Thesis updated successfully:", response.data);
      setSuccessEdit(true);
    })
    .catch((error) => {
      setSuccessEdit(false);
    });
};

export const getAllTeachers = async (setTeachers) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/teachers/", {});

    if (response.status === 200) {
      setTeachers(response.data);
    }
  } catch (error) {
    // Handle error if needed
  }
};

export const getAllStudents = async (setStudents) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/students/", {});

    if (response.status === 200) {
      setStudents(response.data);
    }
  } catch (error) {
    // Handle error if needed
  }
};

export const createCommittee = async () => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/committees/",
      {},
      { headers }
    );
    return response.data.id;
  } catch (error) {
    console.error("Error creating resource:", error);
    // alert("Greska kod kreiranja diplomskog rada!");
  }
};

export const createCommitteeMember = async (
  committee,
  number,
  teacher,
  committee_member_type
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/committee_members/create/",
      {
        committee: committee,
        number: number,
        teacher: teacher,
        committee_member_type: committee_member_type,
      },
      { headers }
    );
    return response.data.id;
  } catch (error) {
    // alert("Error creating resource:", error);
    // alert("Greska kod kreiranja diplomskog rada!");
  }
};

export const createThesis = async (
  naslov,
  datumSlanja = null,
  datumPrijave,
  datumOdbrane = null,
  opis,
  studentId,
  committee_id,
  setSuccessThesis
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/theses/create/",
      {
        thesis_title: naslov,
        submission_date: null,
        application_date: datumPrijave,
        defense_date: datumOdbrane == "" ? null : datumOdbrane,
        description: opis,
        student: studentId,
        committee: committee_id,
      },
      { headers }
    );
    setSuccessThesis(true);
    return response.data.id;
  } catch (error) {
    setSuccessThesis(false);
    console.error("Error creating resource:", error);
    // alert("Greska kod kreiranja diplomskog rada!");
  }
};

export const deleteThesis = async (thesisId, committeeId) => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/theses/${thesisId}/`,
      { headers }
    );
    const response2 = await axios.delete(
      `http://127.0.0.1:8000/api/committees/${committeeId}/`,
      { headers }
    );
    // alert("Diplomski rad je uspesno obrisan!");
  } catch (error) {
    console.error("Greska kod brisanja diplomskog rada: ", error);
    // alert("Greska kod brisanja diplomskog rada!");
  }
};

export const updateSubmissionDate = async (id) => {
  console.log(id);
  const headers = {
    "Content-Type": "application/json",
  };

  await axios
    .patch(
      `http://127.0.0.1:8000/api/theses/${id}/`,
      { submission_date: new Date().toISOString().split("T")[0] },
      {
        headers,
      }
    )
    .then((response) => {
      // alert("Thesis updated successfully:", response.data);
    })
    .catch((error) => {
      // alert("Error updating thesis:", error);
    });
};
