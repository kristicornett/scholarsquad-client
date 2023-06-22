//admin usage

import { useEffect, useState } from "react";
import { getAllTeachers, deleteTeacher, updateTeacher } from "../../managers/TeacherManager";
import { useNavigate } from "react-router-dom";

export const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshTeachers();
  }, []);

  const onDeleteClick = (event, teacherId) => {
    event.preventDefault();

    deleteTeacher(teacherId).then((data) => refreshTeachers());
  };

  const onUpdateClick = (event, teacherId) => {
    event.preventDefault()

    updateTeacher(teacherId).then((data) => refreshTeachers())
  }


  const refreshTeachers = () => {
    getAllTeachers().then((teacherArray) => {
      setTeachers(teacherArray);
    });
  };
  return (
    <>
      <div>
        <span>Teachers</span>
      </div>
      <button type="submit" onClick={() => navigate("/teachers/add")}>
        {" "}
        Add A Teacher{" "}
      </button>
      <article className="school_List">
        {teachers.map((teacher) => {
          return (
            <section key={`teacher--${teacher.id}`}>
              <div className="card">
                <div className="card-body">
                <span className="">{teacher.full_name}</span>
                  <button
                    className=""
                    onClick={(event) => onDeleteClick(event, teacher.id)}
                  >
                    X
                  </button>
                  <button
                    className=""
                    onClick={() => navigate(`/teachers/${teacher.id}/`)}
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