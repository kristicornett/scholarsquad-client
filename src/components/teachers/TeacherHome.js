import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getSingleTeacher, getTeacherClassrooms } from '../../managers/TeacherManager'
import homelogo from '../../images/scholar-squad2.jpg'

export const TeacherHome = ({userData}) => {
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    

return(
  <div style={{display: "flex", alignItems: "center", flexWrap: "wrap"}}>
      <img src={homelogo} alt="My Image" style={{flex: "0 0 auto", margingRight: "20px", width: "350px", margin: "20px", border: "1px solid black", borderRadius: "3px"}}/>
      <div style={{flex: "1 1 auto", maxWidth: "400px", padding: "50px"}}>
        <Typography variant="h4">Welcome to Scholar Squad!</Typography>
        <Typography>Where knowledge
            meets excitement! Our innovative application harnesses the power 
            of ChatGPT to bring you a next-level quiz experience.
            </Typography>
            <Typography>
            Our commitment to quality means that every question 
            is carefully crafted to provide a balanced blend of difficulty and relevance. 
            With Scholar Squad, you'll not only enhance your knowledge 
            but also sharpen your 
            critical thinking skills. 
            Challenge yourself, push your boundaries, and unlock your 
            intellectual potential.

        </Typography>
      </div>
    </div>
)
}
