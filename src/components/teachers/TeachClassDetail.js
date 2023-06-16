import { useEffect, useState } from "react";
import { addStudentToClass, getSingleClass, getClassStudents } from "../../managers/ClassManager";
import { useNavigate, useParams } from "react-router-dom";
import { getAllStudents } from "../../managers/StudentManager";
import { useRef } from "react";

export const TeacherClassDetail = () => {
    const {classId} = useParams()
    const user = JSON.parse(localStorage.getItem('scholarSquad_user'))
    const [allStudents, setAllStudents] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])
    const selectedStudent = useRef()
    const navigate = useNavigate()
    const [classDetail, setClassDetail] = useState((
        {
            name: '',
            students: [],
            quizzes: []
        }
    ))
   

    useEffect(() => {
        const singleClass = getSingleClass(classId)
        
        const students = getAllStudents()
        
        Promise.all([singleClass, students])
        .then(([classResults, studentResults])=> {
            setClassDetail(classResults)
            setAllStudents(studentResults)
            filterStudents(classResults, studentResults)
        })
    }, [])

    const filterStudents = (classroom, students) => {
        //filter list of students to ones that are not currently in class
        //const arr = obj1.filter(i => !obj2.includes(i.id))
        const filteredStudents = students.filter(function(student){
            const r =classroom.students.map(s => s.id).indexOf(student.id) === -1;
            return r
          })
        setFilteredStudents(filteredStudents)

    }

    const onClickAddStudent = (event) => {
        event.preventDefault()
        const classroomId = classDetail.id 
        const studentId = selectedStudent.current.value
        addStudentToClass(classroomId, studentId)
        .then(() => {
            refreshStudents()
        })
    }
    const refreshStudents = () => {
        getClassStudents(classDetail.id).then((studentArray) => {
          const copy = {...classDetail}
          copy.students = studentArray;
          setClassDetail(copy)
          filterStudents(copy, allStudents)
        });
      }
   

    return(<>
            <h2>Teacher Class Detail</h2>
            <article className="teacher_class_detail">
            <section key={`class--${classDetail.id}`}>
              <div>Class Name:</div>
              <div className="card">{classDetail.name}</div>
              <div>
                <div>Students in class:</div>
                {
                    classDetail.students.map((student) => {
                        return (
                            <div key={student.id} className='card'>{student.full_name}</div>
                        )
                    })
                }
              </div>
              <div>
                <div>Quizzes for Class:</div>
                {
                    classDetail.quizzes.map((quiz) => {
                        return (
                            <div key={quiz.id} className='card'>{quiz.title}</div>
                        )
                    })
                }
              </div>
              <div>
                <select className='form-select' ref={selectedStudent}
                    >
                    <option>Select Student</option>
                    {
                        filteredStudents.map((student) => {
                            return (
                                <option key={student.id} value={student.id}>
                                    {student.full_name}
                                </option>
                            )
                        })
                    }
                </select>
                <button type='button' onClick={onClickAddStudent}>Add Student</button>
              </div>
            </section>
          
        
      </article>
        
        </>)
}

