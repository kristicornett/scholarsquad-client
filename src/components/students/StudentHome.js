import {  Typography } from '@mui/material'
import homelogo from '../../images/student-home.jpg'

export const StudentHome = ({userData}) => {
return(
  <div style={{display: "flex", alignItems: "center", flexWrap: "wrap"}}>
      <img src={homelogo} alt="My Image" style={{flex: "0 0 auto", margingRight: "20px", width: "350px", margin: "20px", border: "1px solid black", borderRadius: "3px"}}/>
      <div style={{flex: "1 1 auto"}}>
        <Typography variant="h4">Welcome to Scholar Squad!</Typography>
        <Typography>The best drip in learning. No cap.</Typography>
      </div>
    </div>
)
}





