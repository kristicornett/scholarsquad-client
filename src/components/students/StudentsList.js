//for admin usage

import { useEffect, useState } from "react";
import { getAllTeachers, deleteTeacher, updateTeacher } from "../../managers/TeacherManager";
import { getAllStudents, deleteStudent, updateStudent } from "../../managers/StudentManager";
import { useNavigate } from "react-router-dom";

export const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshStudents();
  }, []);

  const onDeleteClick = (event, studentId) => {
    event.preventDefault();

    deleteStudent(studentId).then((data) => refreshStudents());
  };

  const onUpdateClick = (event, studentId) => {
    event.preventDefault()

    updateStudent(studentId).then((data) => refreshStudents())
  }


  const refreshStudents = () => {
    getAllStudents().then((studentArray) => {
      setStudents(studentArray);
    });
  };
  return (
    <>
      <div>
        <span className="text-4xl text-red-400">Students</span>
      </div>
      <button type="submit" onClick={() => navigate("/students/add")}>
        {" "}
        Add A Student{" "}
      </button>
      <article className="student_List">
        {students.map((student) => {
          return (
            <section key={`student--${student.id}`}>
              <div className="card">
                <div className="card-body">
                <span className="">{student.full_name}</span>
                  <button
                    className=""
                    onClick={(event) => deleteStudent(event, student.id)}
                  >
                    X
                  </button>
                  <button
                    className=""
                    onClick={() => navigate(`/students/${student.id}/`)}
                  >
                    Manage
                  </button>

                </div>
              </div>
            </section>
          );
        })}
      </article>
    </>
  );
};