import { useEffect, useState } from "react";
import { getSingleClass } from "../../managers/ClassManager";
import { useNavigate, useParams } from "react-router-dom";

export const TeacherClassDetail = () => {
    const {classId} = useParams()
    const navigate = useNavigate()
    const [classDetail, setClassDetail] = useState((
        {
            name: '',
            students: [],
            quizzes: []
        }
    ))

    useEffect(() => {
        getSingleClass(classId)
        .then((data) => {
            const singleClass = data
            setClassDetail(singleClass)
        })
    }, [classId])

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
                            <div className='card'>{student.full_name}</div>
                        )
                    })
                }
              </div>
              <div>
                <div>Quizzes for Class:</div>
                {
                    classDetail.quizzes.map((quiz) => {
                        return (
                            <div className='card'>{quiz.title}</div>
                        )
                    })
                }
              </div>
            </section>
          
        
      </article>
        
        </>)
}

