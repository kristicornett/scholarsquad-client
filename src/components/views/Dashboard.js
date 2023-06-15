import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { TeacherHome } from '../teachers/TeacherHome'
import { StudentHome } from '../students/StudentHome'
import { AdminHome } from '../admin/AdminHome'

export const Dashboard = ({userData}) => {
    const {schoolId} = useParams()
    const userToken = localStorage.getItem('scholarSquad_user')

    useEffect(
        () => {
        },
        []
    )

    const renderHome = () => {
        if(userData.isAdmin){
            return <AdminHome></AdminHome>
        }
        else if(userData.isStaff){
            return <TeacherHome userData={userData}></TeacherHome>
        }
        else{
            return <StudentHome userData={userData}></StudentHome>
        }
    }

    return  <>
                {
                    renderHome()
                }
            </>
}
