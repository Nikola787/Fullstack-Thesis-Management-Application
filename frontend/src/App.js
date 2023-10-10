import logo from "./logo.svg";
import "./App.css";
import { getStudents } from "./services/service";
import { useEffect, useState } from "react";

import LoginPage from "./pages/loginPage/LoginPage";
import StudentPage from "./pages/studentPage/StudentPage";
import EditProfilePage from "./pages/editProfilePage/EditProfilePage";
import TeacherPage from "./pages/teacherPage/TeacherPage";
import StaffPage from "./pages/staffPage/StaffPage";

import AuthContext from "./store/auth-context";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [userData, setUserData] = useState([]);

  const router = createBrowserRouter([
    { path: "/", element: <LoginPage setUserData={setUserData} /> },
    { path: "/student-page", element: <StudentPage /> },
    { path: "/teacher-page", element: <TeacherPage /> },
    { path: "/staff-page", element: <StaffPage /> },
  ]);

  return (
    <AuthContext.Provider value={userData}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
