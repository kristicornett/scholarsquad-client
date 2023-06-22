//for admin usage to manually add students in the future

import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createStudent, getSingleStudent } from '../../managers/StudentManager'
import { getAllSchools } from '../../managers/SchoolManager'

export const StudentAdd = () => {
    const navigate = useNavigate()
    const {studentId} = useParams()
    const [schools, setSchools] = useState([])
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
    const studentEmail = useRef()
    const studentPassword = useRef()

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

    
    useEffect(
        () => {
        getAllSchools().then((schoolArray) => {
                setSchools(schoolArray)
        })}, []
    )
    
    const onSaveClick = () => {
        const studentObj = {
            'first_name': studentFirstName.current.value,
            'last_name': studentLastName.current.value,
            'schoolId': studentSchool.current.value,
            'grade': studentGrade.current.value,
            'email': studentEmail.current.value,
            'password': studentPassword.current.value
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
            <input className="input" placeholder="first name" type="text" ref={studentFirstName} />
          </div>
          <div>
            <input className="input" placeholder="last name" type="text" ref={studentLastName} />
          </div>
          <div>
            <select ref={studentSchool}>
                {
                    schools.map((school) => {
                        return <option key={school.id} value={school.id}>{school.name}</option>
                    })
                }
            </select>
          </div>
          <div>
            <select ref={studentGrade}>
                <option value='K'>Kindergarten</option>
                <option value='1'>First</option>
                <option value='2'>Second</option>
                <option value='3'>Third</option>
                <option value='4'>Fourth</option>
                <option value='5'>Fifth</option>
                <option value='6'>Sixth</option>
                <option value='7'>Seventh</option>
                <option value='8'>Eighth</option>
                <option value='9'>Ninth</option>
                <option value='10'>Tenth</option>
                <option value='11'>Eleventh</option>
                <option value='12'>Twelfth</option>
            </select>
          </div>
          <div>
            <input className="input" placeholder="email" type="email" ref={studentEmail} />
          </div>
          <div>
            <input className="input" placeholder="password" type="password" ref={studentPassword} />
          </div>
          <div>
            <button type="button" onClick={onSaveClick}>Save</button>
          </div>
        </div>

</div>

</>
}