import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSingleTeacher, getTeacherClassrooms } from '../../managers/TeacherManager'

export const TeacherHome = ({userData}) => {
    const navigate = useNavigate()
    const [teacher, setTeacher] = useState({school:{}})
    const [classrooms, setClassrooms] = useState([])

    useEffect(
        () => {
            getSingleTeacher(userData.teacherId)
            .then((result) => {
                setTeacher(result)
            })

            getTeacherClassrooms(userData.teacherId)
            .then((results) => setClassrooms(results))
        }
        ,[]
    )

    const renderClassrooms = () => {
        return classrooms.map((classroom) =>
        {
            return <div>
                    <Link key={classroom.id} to={`/classrooms/${classroom.id}`}>{classroom.name}</Link>
                </div>
        })
    }

    return (
        <>
        <h2>Teacher Dashboard</h2>
        <div>My School: {teacher?.school?.name}</div>
        <div>Classes</div>
        <div><Link to={`/classrooms/add`}>Add a Class</Link></div>
        <div>
            {renderClassrooms()}
        </div>
        <div><Link to='/'></Link></div>
        </>
    )
}