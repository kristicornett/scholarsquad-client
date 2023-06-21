import { Container, Tooltip } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import MailIcon from '@mui/icons-material/Mail';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import { Link } from "react-router-dom";

export const LeftNav = ({ userData }) => {

    return (
        <Container className="left-menu">
            <div>
                <Link to="/">
                    <div className="left-menu-item">
                        <Tooltip title="Home">
                            <HomeIcon fontSize="large" />
                        </Tooltip>
                    </div>
                </Link>
            </div>
            <div>
                <Link to="/classrooms">
                    <div className="left-menu-item">
                    <Tooltip title="Classes">        
                            <SchoolIcon fontSize="large" />
                    </Tooltip>
                    </div></Link>
            </div>
            <div>
                <Link to="/quizzes">
                    <div className="left-menu-item">
                        <Tooltip title="Quizzes">
                            <QuizIcon fontSize="large" />
                        </Tooltip>  
                    </div>
                </Link>
            </div>
            <div>
                <Link to='/messages'>
                    <div className='left-menu-item'>
                    <Tooltip title="Messasges">
                            <MailIcon fontSize='large' />
                    </Tooltip>
                    </div>
                </Link>
            </div>
            <div><Link to={`/schools/${userData.schoolId}`}>
                    <div className='left-menu-item'>
                    <Tooltip title="My School">
                            <RememberMeIcon fontSize='large' />
                    </Tooltip>
                    </div>
                </Link>
            </div>
        </Container>
    )

}