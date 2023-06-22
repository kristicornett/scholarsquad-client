//admin usage for manual adding

import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleTeacher, createTeacher } from '../../managers/TeacherManager'

export const TeacherAddEdit = () => {
    const navigate = useNavigate()
    const {teacherId} = useParams()
    const [teacherDetail, setTeacherDetail] = useState(
        {
            first_name: '',
            last_name: '',
            password: ''
         
        }
    )
    const teacherFirstName = useRef()
    const teacherLastName = useRef()
    const teacherPassword = useRef()
   

    useEffect(
        () => {
            if(teacherId){
            getSingleTeacher(teacherId)
            .then((data) => {
                const singleTeacher = data
                setTeacherDetail(singleTeacher)
            })
        
            }
        },
        [teacherId]
    )
    
    const onSaveClick = () => {
        const teacherObj = {
            'first_name': teacherFirstName.current.value,
            'last_name': teacherLastName.current.value,
            'password': teacherPassword.current.value
           
        }

        createTeacher(teacherObj)
        .then(result => {
            navigate('/teachers')
        })
        .catch((reason) => {
            console.log(reason)
            alert('add teacher failed: ' + reason)
        })
    }


    return  <>
    <h2>Add a new Teacher</h2>
     <div className="flex">
     <div className="field">
          <label className="label">Teacher Name</label>
          <div>
            <input className="input" type="text" ref={teacherFirstName} />
          </div>
          <div>
            <input className="input" type="text" ref={teacherLastName} />
          </div>
          <div>
            <input className="input" type="password" ref={teacherPassword} />
          </div>
          <div>
            <button type="button" onClick={onSaveClick}>Save</button>
          </div>
        </div>

</div>

</>
}