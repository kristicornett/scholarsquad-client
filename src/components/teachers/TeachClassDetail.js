import { useEffect, useState } from "react";
import { addStudentToClass, getSingleClass, getClassStudents } from "../../managers/ClassManager";
import { useNavigate, useParams } from "react-router-dom";
import { getAllStudents } from "../../managers/StudentManager";
import { useRef } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


export const TeacherClassDetail = ({userData, classroomId}) => {

    const user = userData
    const isStudent = (!userData.isStaff && !userData.isAdmin)
    const [allStudents, setAllStudents] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])
    const [studentColumns, setStudentColumns] = useState([])
    const [studentRows, setStudentRows] = useState([])
    const [quizColumns, setQuizColumns] = useState([])
    const [quizRows, setQuizRows] = useState([])
    const selectedStudent = useRef()
    const navigate = useNavigate()
    const [classDetail, setClassDetail] = useState((
        {
            name: '',
            students: [],
            quizzes: []
        }
    ))
   

    useEffect(() => {
        const singleClass = getSingleClass(classroomId)
        
        const students = getAllStudents()
        
        Promise.all([singleClass, students])
        .then(([classResults, studentResults])=> {
            setClassDetail(classResults)
            setAllStudents(studentResults)
            filterStudents(classResults, studentResults)
        })
    }, [])

    useEffect(() => {
        if(classDetail.students.length > 0){
            buildStudentsGrid()
        }

        if(classDetail.quizzes.length > 0){
            buildQuizzesGrid()
        }
    },[classDetail])

    const buildStudentsGrid = () => {
        if(studentColumns.length == 0){
        const cols = [
            { field: 'full_name', headerName: 'Name', width: 250},
            { field: 'grade', headerName: 'Grade', width: 150},
            { field: 'email', headerName: 'Email', width: 150},
            { field: 'username', headerName: 'Username', width: 350}
            ]

            setStudentColumns(cols)
        }

        const rowSet = []
        classDetail.students.map((student) => {
            rowSet.push( {
                id: student.id, full_name: student.full_name, grade: student.grade, email: student.user.email, username: student.user.username
            })
        })
        setStudentRows(rowSet)
    }

    const buildQuizzesGrid = () => {
        if(studentColumns.length == 0){
        const cols = [
            { field: 'title', headerName: 'Title', width: 250},
            { field: 'start_date', headerName: 'Start Date', width: 150},
            { field: 'expire_date', headerName: 'Due By', width: 150},
            { field: 'description', headerName: 'Description', width: 350},
            {
                field: "action",
                headerName: "",
                sortable: false,
                disableClickEventBubbling: true,
                width: 300,
                renderCell:  (params) => {
                    const onClick = (e) => {
                      const currentRow = params.row;
                      navigate(`/quizzes/${currentRow.id}`)
                    };
                    
                    return (
                      <Stack direction="row" spacing={2}>
                        <Button onClick={onClick}>View</Button>
                      </Stack>
                    );
                }
              }
            ]

            setQuizColumns(cols)
        }

        const rowSet = []
        classDetail.quizzes.map((quiz) => {
            rowSet.push( {
                id: quiz.id, title: quiz.title, start_date: quiz.start_date, expire_date: quiz.expire_date ?? 'N/A', description: quiz.description
            })
        })
       
        setQuizRows(rowSet)
    }

    const filterStudents = (classroom, students) => {
        //filter list of students to ones that are not currently in class
        //const arr = obj1.filter(i => !obj2.includes(i.id))
        const filteredStudents = students.filter(function(student){
            const r =classroom.students.map(s => s.id).indexOf(student.id) === -1;
            return r
          })
        setFilteredStudents(filteredStudents)

    }

    const onClickAddStudent = (event) => {
        event.preventDefault()
        const classroomId = classDetail.id 
        const studentId = selectedStudent.current.value
        addStudentToClass(classroomId, studentId)
        .then(() => {
            refreshStudents()
        })
    }
    const refreshStudents = () => {
        getClassStudents(classDetail.id).then((studentArray) => {
          const copy = {...classDetail}
          copy.students = studentArray;
          setClassDetail(copy)
          filterStudents(copy, allStudents)
        });
      }
   
    const onClickCreateQuiz = () => {
        navigate(`/quizzes/create?classroomId=${classDetail.id}`)
    }
   

    return(<>
        <Container maxWidth="lg" sx={{ border: 1, borderColor: 'secondary.main', borderRadius: 2, marginTop: 8 }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1 }}>
                    <Stack direction="column" spacing={1} sx={{}}>
                        <div>
                            <Typography variant='h3'>
                                {classDetail.name}
                            </Typography>
                            <Typography>
                                {`(Room: ${classDetail.roomNumber})`}
                            </Typography>
                        </div>

                        <Typography>
                            {classDetail.description}
                        </Typography>
                    </Stack>
                </div>
                {!isStudent &&
                    <div>
                        <div style={{ float: "right" }}>
                            <Button onClick={onClickCreateQuiz}>Create a Quiz</Button>
                        </div>

                        <div style={{ float: "right" }}>
                            <Button onClick={onClickCreateQuiz}>Add a Student</Button>
                        </div>
                    </div>
                }

            </div>
            <Container maxWidth="xl">
                <Typography variant='h4'>Students</Typography>
                <DataGrid
                    rows={studentRows}
                    columns={studentColumns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick>

                </DataGrid>
            </Container>
            <Container maxWidth="xl">
                <Typography variant='h4'>Quizzes</Typography>
                <DataGrid
                    rows={quizRows}
                    columns={quizColumns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick>

                </DataGrid>
            </Container>
        </Container>
        </>)
}


// const {classroomId} = useParams()
    // const user = JSON.parse(localStorage.getItem('scholarSquad_user'))
    // const [allStudents, setAllStudents] = useState([])
    // const [filteredStudents, setFilteredStudents] = useState([])
    // const selectedStudent = useRef()
    // const navigate = useNavigate()
    // const [classDetail, setClassDetail] = useState((
    //     {
    //         name: '',
    //         students: [],
    //         quizzes: []
    //     }
    // ))
   

    // useEffect(() => {
    //     const singleClass = getSingleClass(classroomId)
        
    //     const students = getAllStudents()
        
    //     Promise.all([singleClass, students])
    //     .then(([classResults, studentResults])=> {
    //         setClassDetail(classResults)
    //         setAllStudents(studentResults)
    //         filterStudents(classResults, studentResults)
    //     })
    // }, [])

    // const filterStudents = (classroom, students) => {
    //     //filter list of students to ones that are not currently in class
    //     //const arr = obj1.filter(i => !obj2.includes(i.id))
    //     const filteredStudents = students.filter(function(student){
    //         const r =classroom.students.map(s => s.id).indexOf(student.id) === -1;
    //         return r
    //       })
    //     setFilteredStudents(filteredStudents)

    // }

    // const onClickAddStudent = (event) => {
    //     event.preventDefault()
    //     const classroomId = classDetail.id 
    //     const studentId = selectedStudent.current.value
    //     addStudentToClass(classroomId, studentId)
    //     .then(() => {
    //         refreshStudents()
    //     })
    // }
    // const refreshStudents = () => {
    //     getClassStudents(classDetail.id).then((studentArray) => {
    //       const copy = {...classDetail}
    //       copy.students = studentArray;
    //       setClassDetail(copy)
    //       filterStudents(copy, allStudents)
    //     });
    //   }


//     <article className="teacher_class_detail">
//     <section key={`class--${classDetail.id}`}>
//       <div>Class Name:</div>
//       <div className="card">{classDetail.name}</div>
//       <div>
//         <div>Students in class:</div>
//         {
//             classDetail.students.map((student) => {
//                 return (
//                     <div key={student.id} className='card'>{student.full_name}</div>
//                 )
//             })
//         }
//       </div>
//       <div>
//         <div>Quizzes for Class:</div>
//         {
//             classDetail.quizzes.map((quiz) => {
//                 return (
//                     <div key={quiz.id} className='card'>{quiz.title}</div>
//                 )
//             })
//         }
//       </div>
//       <div>
//         <select className='form-select' ref={selectedStudent}
//             >
//             <option>Select Student</option>
//             {
//                 filteredStudents.map((student) => {
//                     return (
//                         <option key={student.id} value={student.id}>
//                             {student.full_name}
//                         </option>
//                     )
//                 })
//             }
//         </select>
//         <button type='button' onClick={onClickAddStudent}>Add Student</button>
//       </div>
//     </section>
  

// </article>