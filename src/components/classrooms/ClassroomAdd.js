import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom/dist"
import { createTeacher, getSingleTeacher } from "../../managers/TeacherManager"
import { createClass } from "../../managers/ClassManager"


export const ClassroomAdd = () => {
    const user = JSON.parse(localStorage.getItem("scholarSquad_user"))
    const className = useRef()
    const navigate = useNavigate();
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
            "teacher": teacher.id
        }

        createClass(classObj).then((result) => 
        {
            navigate('/')   
        }
        )
    }

    return <>
    { (user.isStaff) &&
    <div>
        <h2>Add a Class</h2>
        <div>
            <div>
                <label>Name:</label>
                <input type="text" ref={className}></input>
            </div>
            <div>
                <label>School:</label>
                <span>{teacher.school.name}</span>
            </div>
            <div>
                <button type="button" onClick={onSaveClassroomClick}>Save</button>
            </div>
        </div>
    </div>
    }
    </>
}