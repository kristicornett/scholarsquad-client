import { Container } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link } from "react-router-dom";

export const LeftNav = () => {


    return (
        <Container className="left-menu">
           <Link to="/"> <div className="left-menu-item"><HomeIcon fontSize="large"/></div></Link>

           <Link to="/classrooms"><div className="left-menu-item"><SchoolIcon fontSize="large"/></div></Link> 
           <Link to="/quizzes"><div className="left-menu-item"><QuizIcon fontSize="large" /></div></Link>
        </Container>
    )

}