import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom/dist"
import { createTeacher, getSingleTeacher } from "../../managers/TeacherManager"
import { createClass } from "../../managers/ClassManager"
import { Button, FormLabel, TextField, TextareaAutosize, Typography } from "@mui/material"


export const ClassroomAdd = () => {
    const user = JSON.parse(localStorage.getItem("scholarSquad_user"))
    const className = useRef()
    const description = useRef()
    const roomNumber = useRef()
    const navigate = useNavigate();
    //adding school as a property for default rendering. it is an object.
    const [teacher, setTeacher] = useState({"school": {}})
    
    useEffect(() => {   
        getSingleTeacher(user.teacherId).then((result) => {
            setTeacher(result)
        })
    }
    ,[]
    )

    const onSaveClassroomClick = (event) => {
        event.preventDefault()
        const classObj = {
            "name": className.current.value,
            "school": teacher.school.id,
            "description": description.current.value,
            "roomNumber": roomNumber.current.value,
            "teacher": teacher.id
        }

        createClass(classObj).then((result) => 
        {
            navigate('/')   
        }
        )
    }
    // inline styling to reuse as a helper.
    const spaceAbove = { padding: "10px 5px"}

    return <>
    { (user.isStaff) &&
    <div>
        <h2>Add a Class</h2>
        <div>
            <div style={spaceAbove}>
                <FormLabel>Name: </FormLabel><br />
                <TextField inputRef={className} variant='outlined' size="small" require></TextField>
            </div>
            <div style={spaceAbove}>
            <FormLabel>School: </FormLabel><br/>
            <Typography variant="h6" sx={{display: "inline"}}>{teacher.school.name}</Typography>
            </div>
            <div style={spaceAbove}>
            <FormLabel>Description: </FormLabel><br />
            <TextareaAutosize minRows={3} ref={description}></TextareaAutosize>
            </div>
            <div style={spaceAbove}>
                <FormLabel>Room Number: </FormLabel><br />
                <TextField inputRef={roomNumber} variant='outlined' size="small" require></TextField>
            </div>
            <div style={spaceAbove}>
            <Button variant="contained" type="button" onClick={onSaveClassroomClick}>Save</Button>
            </div>
        </div>
    </div>
    }
    </>
}