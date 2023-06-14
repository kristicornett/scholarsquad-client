import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createStudent, getSingleStudent } from '../../managers/StudentManager'

export const StudentAddEdit = () => {
    const navigate = useNavigate()
    const {studentId} = useParams()
    const [studentDetail, setStudentDetail] = useState(
        {
            first_name: '',
            last_name: '',
            school: '',
            grade: 0
        }
    )
    const studentFirstName = useRef()
    const studentLastName = useRef()
    const studentSchool = useRef()
    const studentGrade = useRef()

    useEffect(
        () => {
            if(studentId){
            getSingleStudent(studentId)
            .then((data) => {
                const singleStudent = data
                setStudentDetail(singleStudent)
            })
        
            }
        },
        [studentId]
    )
    
    const onSaveClick = () => {
        const studentObj = {
            'first_name': studentFirstName.current.value,
            'last_name': studentLastName.current.value,
            'school_id': studentSchool.current.value,
            'grade': studentGrade.current.value
        }

        createStudent(studentObj)
        .then(() => {
            navigate(`/students/`)
        })
       
        .catch((reason) => {
            console.log(reason)
            alert('add student failed: ' + reason)
        })
    }


    return  <>
    <h2>Add a new Student</h2>
     <div className="flex">
     <div className="field">
          <label className="label">Student Name</label>
          <div>
            <input className="input" type="text" ref={studentFirstName} />
          </div>
          <div>
            <input className="input" type="text" ref={studentLastName} />
          </div>
          <div>
            <input className="input" type="number" ref={studentSchool} />
          </div>
          <div>
            <input className="input" type="number" ref={studentGrade} />
          </div>
          <div>
            <button type="button" onClick={onSaveClick}>Save</button>
          </div>
        </div>

</div>

</>
}