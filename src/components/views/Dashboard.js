import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { TeacherHome } from '../teachers/TeacherHome'
import { StudentHome } from '../students/StudentHome'
import { AdminHome } from '../admin/AdminHome'

export const Dashboard = ({token, setToken, userData}) => {
    const navigate = useNavigate()


    useEffect(
        () => {
            if(!token || token.length === 0){
                navigate('/login')
           }
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