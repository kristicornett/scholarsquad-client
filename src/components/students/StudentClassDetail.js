import { useEffect, useState } from "react";
import { addStudentToClass, getSingleClass, getClassStudents } from "../../managers/ClassManager";
import { useNavigate, useParams } from "react-router-dom";
import { getAllStudents, getStudentQuizzes } from "../../managers/StudentManager";
import { useRef } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment/moment";


export const StudentClassDetail = ({ userData, classroomId }) => {

    const user = userData
    const isStudent = (!userData.isStaff && !userData.isAdmin)
    const [assignments, setAssignments] = useState([])
    const [assignedQuizRows, setAssignedQuizRows] = useState([])
    const [completedQuizRows, setCompletedQuizRows] = useState([])
    const navigate = useNavigate()
    const [classDetail, setClassDetail] = useState((
        {
            name: '',
            students: [],
            quizzes: []
        }
    ))

    const assignedCols = [
        { field: 'title', headerName: 'Title', width: 175 },
        { field: 'classroomName', headerName: 'Class', width: 150 },
        { field: 'dueBy', headerName: 'Due By', width: 125 },
        { field: 'dateAssigned', headerName: 'Date Assigned', width: 125 },
        { field: 'isCompletedText', headerName: 'Completed?', width: 150 },
        {
            field: "action",
            headerName: "",
            sortable: false,
            disableClickEventBubbling: true,
            width: 150,
            renderCell: (params) => {
                const currentRow = params.row;
                const onClick = (e) => {
                    navigate(`/quiz/${currentRow.quizId}`)
                };
                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={onClick} size="small">Take Quiz</Button>
                    </Stack>
                );
            }
        }
    ]

    const completedCols = [
        { field: 'title', headerName: 'Title', width: 175 },
        { field: 'classroomName', headerName: 'Class', width: 150 },
        { field: 'dateCompleted', headerName: 'Date Assigned', width: 125 },
        { field: 'score', headerName: "Score", width: 125 },
        {
            field: "action",
            headerName: "",
            sortable: false,
            disableClickEventBubbling: true,
            width: 150,
            renderCell: (params) => {
                const currentRow = params.row;
                const onClick = (e) => {
                    alert('fix navigate for view results')
                    //navigate(`/quizzes/${currentRow.id}`)
                };
                return (
                    <Stack direction="row" spacing={2}>
                            
                            <Button variant="contained" size="small" onClick={onClick}>View Results</Button>
                    </Stack>
                );
            }
        }
    ]


    useEffect(() => {
        const singleClass = getSingleClass(classroomId)
        const getQuizzes = getStudentQuizzes(userData.studentId)
        Promise.all([singleClass, getQuizzes])
            .then(([classResults, quizResults]) => {
                setClassDetail(classResults)
                setAssignments(quizResults)
                loadAssignments(quizResults)
            })
    }, [])

    const loadAssignments = (assignments) => {
        const assignedRows =
            assignments.filter((a) => !a.date_completed).map((q) => {
                const row = {
                    id: q.id,
                    quizId: q.quiz.id,
                    classroomName: q.quiz.classroom.name,
                    isCompleted: !!q.date_completed,
                    isCompletedText: !!q.date_completed ? 'Yes' : 'No',
                    dateCompleted: q.date_completed,
                    title: q.quiz.title,
                    dateAssigned: moment(q.date_assigned),
                    dueBy: !!q.quiz.expire_date ? moment(q.quiz.expire_date) : ' - ',
                    score: 0
                }
                return row
            })

        const completedRows =
            assignments.filter((a) => !!a.date_completed).map((q) => {
                const row = {
                    id: q.id,
                    quizId: q.quiz.id,
                    classroomName: q.quiz.classroom.name,
                    isCompleted: !!q.date_completed,
                    dateCompleted: q.date_completed,
                    title: q.quiz.title,
                    dateAssigned: moment(q.date_assigned),
                    dueBy: !!q.quiz.expire_date ? moment(q.quiz.expire_date) : ' - ',
                    score: 0
                }
                return row
            })
        setAssignedQuizRows(assignedRows)
        setCompletedQuizRows(completedRows)
    }



    return (
        <>
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
                    <div>
                        <Typography>Teacher: {classDetail?.teacher?.full_name}</Typography>
                    </div>
                </div>
                <Container maxWidth="xl">
                    <Typography variant='h5'>My Assigned Quizzes</Typography>
                    <DataGrid
                        rows={assignedQuizRows}
                        columns={assignedCols}
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
                    <Typography variant='h5'>My Completed Quizzes</Typography>
                    <DataGrid
                        sx={{minHeight: "300px"}}
                        rows={completedQuizRows}
                        columns={completedCols}
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
        </>
    )
}