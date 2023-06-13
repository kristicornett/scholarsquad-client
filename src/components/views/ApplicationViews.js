import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Authorized } from "../Authorized";
import { SchoolList } from "../schools/SchoolList";
import { SchoolDetails } from "../schools/SchoolDetails";
import { QuizCreate } from "../quizzes/QuizCreate";

import { Dashboard } from "./Dashboard";
import { SchoolAddEdit } from "../schools/SchoolAddEdit.js";
import { TeacherList } from "../teachers/TeacherList";
import { TeacherDetails } from "../teachers/TeacherDetails";
import { TeacherAddEdit } from "../teachers/TeacherAddEdit";
import { StudentAddEdit } from "../students/StudentAddEdit";
import { StudentList } from "../students/StudentsList";
import { QuizEdit } from "../quizzes/QuizEdit";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/schools" element={<SchoolList />} />
          <Route path="/schools/:schoolId" element={<SchoolDetails />} />
          <Route path="/schools/create" element={<SchoolAddEdit/>} />
          <Route path="/quiz/:quizId" element={<QuizEdit />} />
          <Route path="/quiz/create" element={<QuizCreate />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teachers/:teacherId" element={<TeacherDetails />} />
          <Route path="/teachers/add" element={<TeacherAddEdit />} />
          <Route path="/students/add" element={<StudentAddEdit />} />
          <Route path="/students" element={<StudentList />} />
          
        </Route>
      </Routes>
    </>
  );
}