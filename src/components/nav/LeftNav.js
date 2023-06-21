import { Container } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import MailIcon from '@mui/icons-material/Mail';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'

export const LeftNav = () => {
    const {schoolId} = useParams()


    return (
        <Container className="left-menu">
           <Link to="/"> <div className="left-menu-item"><HomeIcon fontSize="large"/></div></Link>

           <Link to="/classrooms"><div className="left-menu-item"><SchoolIcon fontSize="large"/></div></Link> 
           <Link to="/quizzes"><div className="left-menu-item"><QuizIcon fontSize="large" /></div></Link>
           <Link to='/messages'><div className='left-menu-item'><MailIcon fontSize='large' /></div></Link>
           <Link to='/schools/:schoolId'><div className='left-menu-item'><RememberMeIcon fontSize='large' /></div></Link>
        </Container>
    )

}