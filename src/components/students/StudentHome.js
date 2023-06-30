import {  Typography } from '@mui/material'
import homelogo from '../../images/student-home.jpg'

export const StudentHome = ({userData}) => {
return(
  <div style={{display: "flex", alignItems: "center", flexWrap: "wrap", paddingTop: "2em", paddingLeft: "2em"}}>
      <img src={homelogo} alt="My Image" style={{flex: "0 0 auto", marginTop: "10em", marginLeft: "12em", marginRight: "20px", width: "450px", margin: "20px", border: "1px solid black", borderRadius: "3px"}}/>
      <div style={{flex: "1 1 auto",  maxWidth: "600px", padding: "50px"}}>
        <Typography variant="h3">Welcome to Scholar Squad!</Typography>
        <div style={{flex: "1 1 auto", maxWidth: "600px", padding: "50px"}}>
        <Typography>The best drip in learning. No cap.</Typography>
        <Typography>We believe that students like you should have access to 
            the best educational resources available. Scholar Squad allows you to 
            communicate with your teachers, fellow students, and keep track of all your
            progress through individual quizzes. Our innovative application harnesses the power
            of ChatGPT to bring you a next-level quiz experience. Study hard and never give up!
        </Typography>
        </div>
      </div>
    </div>
)
}





