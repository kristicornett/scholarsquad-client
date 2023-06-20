import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSingleStudent, getStudentClassrooms } from '../../managers/StudentManager'

export const StudentHome = ({userData}) => {
    const navigate = useNavigate()
    const [student, setStudent] = useState({school:{}})
    const [classrooms, setClassrooms] = useState([])

    useEffect(
        () => {
            getSingleStudent(userData.studentId)
            .then((result) => {
                setStudent(result)
            })

            getStudentClassrooms(userData.studentId)
            .then((results) => {;
                setClassrooms(results)
            })
        }, []
    )

    const renderClassrooms = () => {
        return classrooms.map((classroom) => 
        {
            return<Link key={classroom.id} to={`/classrooms/${classroom.id}`}>
                <div>{classroom.name}</div>
            </Link>
        })
    }


    return(
        <>
        <h2>Student Home</h2>
        <div>My Classes</div>
        <div>
            {renderClassrooms()}
        </div>
        <div>My Latest Quizzes</div>
        <div><Link to='/'></Link></div>
        
        </>
    )
}





