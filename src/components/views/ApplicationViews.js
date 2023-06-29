import { Route, Routes } from "react-router-dom";
import { SignIn } from "../auth/SignIn";
import { SignUp } from "../auth/SignUp"
import { Authorized } from "../Authorized";
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
import { QuizzesView } from "../quizzes/QuizzesView";
import { MessagesView } from '../messages/MessagesView'
import { SchoolView } from "../schools/SchoolView";
import { QuizTake } from "../quizzes/QuizTake";
import { SchoolDetailView } from "../schools/SchoolDetailView";
import { StudentClassDetail } from "../students/StudentClassDetail";
import { StudentQuizResultView } from "../students/StudentQuizResultView";

export const ApplicationViews = ({ token, setToken }) => {
  const userToken = localStorage.getItem('scholarSquad_user');
  const userData = !!userToken ? JSON.parse(userToken) : null
  return (
    <>
      <Routes>
        <Route path="/login" element={<SignIn setToken={setToken} />} />
        <Route path="/register" element={<SignUp setToken={setToken} />} />
        <Route element={<Authorized token={token} setToken={setToken} />}>
        <Route path="/" element={<Dashboard token={token} userData={userData}/>} /> 
          <Route path="/schools" element={<SchoolView />} />
          <Route path="/schools/:schoolId" element={<SchoolDetailView />} />
          <Route path="/schools/create" element={<SchoolAddEdit/>} />
          <Route path="/quizzes/:quizId" element={<QuizDetailView userData={userData} />} />
          <Route path="/quizzes/create" element={<QuizCreate />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teachers/:teacherId" element={<TeacherDetails />} />
          <Route path="/teachers/:teacherId" element={<TeacherDetails />} />
          <Route path="/teachers/add" element={<TeacherAddEdit />} />
          <Route path="/students/add" element={<StudentAdd />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/classrooms/add" element= { <ClassroomAdd />} />
          <Route path="/classrooms" element={<ClassroomsView userData={userData} />} />
          <Route path="/quizzes" element={<QuizzesView userData={userData} />} />
          <Route path='/messages' element={<MessagesView userData={userData} /> } />
          <Route path="classrooms/:classroomId" element={ <ClassroomDetailView userData={userData} />} />
          <Route path="classrooms/:classroomId/create-quiz" element={ <QuizCreate />} />
          <Route path="/quiz/:quizId" element={<QuizTake userData={userData}/> } />
          <Route path="quizzes/:quizId/result" element={<StudentQuizResultView userData={userData} />} />
          
        </Route>
      </Routes>
    </>
  );
}