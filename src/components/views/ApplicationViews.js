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
import { StudentAdd } from "../students/StudentAdd";
import { StudentList } from "../students/StudentsList";
import { QuizDetailView } from "../quizzes/QuizDetailView";
import { ClassroomAdd } from "../classrooms/ClassroomAdd";
import { ClassroomsView } from "../classrooms/ClassroomsView";
import { ClassroomDetailView } from "../classrooms/ClassroomDetailView";

export const ApplicationViews = ({ token, setToken }) => {
  const userToken = localStorage.getItem('scholarSquad_user');
  const userData = !!userToken ? JSON.parse(userToken) : null
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} setToken={setToken} />}>
        <Route path="/" element={<Dashboard token={token} userData={userData}/>} /> 
          <Route path="/schools" element={<SchoolList />} />
          <Route path="/schools/:schoolId" element={<SchoolDetails />} />
          <Route path="/schools/create" element={<SchoolAddEdit/>} />
          <Route path="/quizzes/:quizId" element={<QuizDetailView />} />
          <Route path="/quizzes/create" element={<QuizCreate />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teachers/:teacherId" element={<TeacherDetails />} />
          <Route path="/teachers/:teacherId" element={<TeacherDetails />} />
          <Route path="/teachers/add" element={<TeacherAddEdit />} />
          <Route path="/students/add" element={<StudentAdd />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/classrooms/add" element= { <ClassroomAdd />} />
          <Route path="/classrooms" element={<ClassroomsView userData={userData} />} />
          <Route path="classrooms/:classroomId" element={ <ClassroomDetailView userData={userData} />} />
          <Route path="classrooms/:classroomId/create-quiz" element={ <QuizCreate />} />
        </Route>
      </Routes>
    </>
  );
}