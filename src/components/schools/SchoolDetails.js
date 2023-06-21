import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleSchool } from '../../managers/SchoolManager'
import { getAllTeachers, getTeachersBySchool } from '../../managers/TeacherManager'
import { getClassroomsBySchool } from '../../managers/ClassManager'
import { getStudentsBySchool } from '../../managers/StudentManager'

export const SchoolDetails = () => {
    const {schoolId} = useParams()
    const [schoolDetail, setSchoolDetail] = useState(
        {
            name: ''
        }
    )
    const [teachers, setTeachers] = useState([])
    const [allTeachers, setAllTeachers] = useState([])
    const [classrooms, setClassrooms] = useState([])
    const [students, setStudents] = useState([])
    const [filteredTeachers, setFilterTeachers] = useState([])
    
    useEffect(() => {
        const fetches =[ 
            getTeachersBySchool(schoolId),
            getClassroomsBySchool(schoolId),
            getStudentsBySchool(schoolId),
            getAllTeachers(),
            getSingleSchool(schoolId)
            ]
        
        Promise.all(fetches)
        .then(results => {
             setTeachers(results[0])
             setClassrooms(results[1])
             setStudents(results[2])
             setAllTeachers(results[3])
             setSchoolDetail(results[4])
        })

    },[])

    useEffect(() => {
        const filteredList = 
        allTeachers.filter((t) => teachers.indexOf(t.id) === 0)

        setFilterTeachers(filteredList)
    },[teachers, allTeachers])

    return  <>
     <div className="flex">
     <div className='card-header'><h1>{schoolDetail.name}</h1></div>
    <div className="card">
        <div className="card-body">
        <div className='card-title'><h3>Teachers</h3></div>
        {teachers.map((teacher) => {
            return <div className='card-name'>
                <span>{teacher.full_name}</span>
                <button type="button">Manage</button>
                <button type="button">Delete</button>
                </div>
        })}
        <hr></hr>

        <div>List of Classes</div>
        {classrooms.map((classroom) => {
            return <div>
                <span>{classroom.name}</span>
                <button type="button">Manage</button>
                <button type="button">Delete</button>
                </div>
        })}
        <hr></hr>
        <div>List of Students</div>
        {students.map((student) => {
            return <div>
                <span>{student.full_name}</span>
                <button type="button">Manage</button>
                <button type="button">Delete</button>
                </div>
        })}
        <hr></hr>
    </div>
</div>
</div>
</>
}
