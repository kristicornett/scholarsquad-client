//admin usage

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleTeacher } from '../../managers/TeacherManager'
import { getClassesByTeacher } from '../../managers/ClassManager'
import { getQuizzesByTeacher } from '../../managers/QuizManager'

export const TeacherDetails = () => {
    const {teacherId} = useParams()
    const [teacherDetail, setTeacherDetail] = useState(
        {
            full_name: '',
           
        }
    )

    const [classrooms, setClassrooms] = useState([])
    const [quizzes, setQuizzes] = useState([])
    useEffect(() => {
        const fetches =[ 
            getClassesByTeacher(teacherId),
            getQuizzesByTeacher(teacherId),
            getSingleTeacher(teacherId)
            ]
        
        Promise.all(fetches)
        .then(results => {
             setClassrooms(results[0])
             setQuizzes(results[1])
             setTeacherDetail(results[2])
        })

    },[])

    return  <>
     <div className="flex">
    <div className="card">
        <div className="card-body">
        <div>Name: {teacherDetail.full_name}</div>
       
        <div>Teacher Profile</div>
       
        <hr></hr>

        <div>List of Classes</div>
        {classrooms.map((classroom) => {
            return <div key={classroom.id}>
                  <Link to={`/teachers/classroom/${classroom.id}`}>
                    <span>{classroom.name}</span>
                  </Link>
                <button type="button">Manage</button>
                <button type="button">Delete</button>
                </div>
        })}
        <hr></hr>
        <div>List of Quizzes</div>
        {quizzes.map((quiz) => {
            return <div key={quiz.id}>
             <span>{quiz.title}</span>
                <button type="button">Manage</button>
                <button type="button">Delete</button>
            </div>
        })}
       
        <hr></hr>
    </div>
</div>
</div>
</>
}
