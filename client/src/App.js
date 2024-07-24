import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/common/Header/header";
import Footer from "./components/common/Footer/footer";
import Login from "./components/auth/Login/login";
import Register from "./components/auth/Register/register";
import AdminDashboard from "./components/admin/AdminDashboard/adminDashboard";
import AddCourse from "./components/admin/AddCourse/addCourse";
import AssignLecture from "./components/admin/AssignLecture/assignLecture";
import InstructorLectureView from "./components/instructor/InstructorLectureView/instructorLectureView";
import AdminNavbar from "./components/admin/AdminNavbar/adminNavbar";
import InstructorNavbar from "./components/instructor/InstructorNavbar/instructorNavbar";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="App">
      <Router>
        <Header />
        {user && user.role === "admin" && <AdminNavbar />}
        <Routes>
          <Route
            path="/"
            element={
              user ? user.role === "admin" ? <AdminDashboard /> : "" : <Login />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/assign-lecture" element={<AssignLecture />} />
          <Route path="/my-lectures/:id" element={<InstructorLectureView />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
