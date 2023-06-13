import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getSingleSchool } from '../../managers/SchoolManager'
import { TeacherHome } from '../teachers/TeacherHome'
import { StudentHome } from '../students/StudentHome'

export const Dashboard = () => {
    const {schoolId} = useParams()

    useEffect(
        () => {
        },
        []
    )
    return  <>
        <div>Home Page</div>
        <div>If I'm an Admin</div>
        <div><Link to="/Schools" className="">Schools</Link></div>
        <div></div>
        <div>If I'm a Teacher</div>
        <TeacherHome></TeacherHome>
        <div>Load Teacher Home</div>
        <div>If I'm a Student</div>
        <StudentHome></StudentHome>
        <div>Load Student Home</div>
</>
}
