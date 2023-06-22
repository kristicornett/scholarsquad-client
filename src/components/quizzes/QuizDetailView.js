import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assignStudent, getAssignedStudents, getSingleQuiz } from '../../managers/QuizManager'
import { Box, Button, FormLabel, Stack, Tab, Tabs, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import { QuestionCard } from './QuestionCard';
import { createQuestion, deleteQuestion } from '../../managers/QuestionManager';
import { getClassStudents } from '../../managers/ClassManager';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment/moment';

export const QuizDetailView = ({userData}) => {
    const [quiz, setQuiz] = useState({ questions: [] })
    const { quizId } = useParams()
    const [selectedTab, setSelectedTab] = useState(0)
    const [isAddQuestionOn, setIsAddQuestionOn] = useState(false)
    const [allStudents, setAllStudents] = useState([])
    const [assignedStudents, setAssignedStudents] = useState([])
    const [studentRows, setStudentRows] = useState([])
    const navigate = useNavigate()

    const studentCols = [
        { field: 'name', headerName: 'Name', width: 250},
        { field: 'email', headerName: 'Email', width: 150},
        { field: 'isAssignedText', headerName: 'Assigned?', width: 150},
        { field: 'score', headerName: 'Score', width: 150},
        { field: 'completedOn', headerName: 'Completed On', width: 250},
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            disableClickEventBubbling: true,
            width: 300,
            renderCell:  (params) => {
                const currentRow = params.row

                const onAssignClick = (e) => {
                  const currentRow = params.row;
                  const studentId = currentRow.id
                  assignStudent(quizId, studentId)
                  .then((data) => {
                    refreshAssignedStudents()
                  })
                };
                
                return (
                  <Stack direction="row" spacing={2}>
                    
                    {!currentRow.isAssigned && 
                        <Button variant='contained' size="small" onClick={onAssignClick}>Assign</Button>
                    }
                  </Stack>
                );
            }
          }
    ]

    
    useEffect(() => {
        //if this is a student they are in the wrong place
        if(userData.studentId) navigate('/')

        getSingleQuiz(quizId)
            .then((result) => {
                setQuiz(result)
                const classStudents = getClassStudents(result.classroom.id)
                const assignedStudents = getAssignedStudents(quizId)
                Promise.all([classStudents, assignedStudents])
                    .then(([csResults, asResults]) => {
                        setAllStudents(csResults)
                        setAssignedStudents(asResults)
                        buildStudentRows(csResults, asResults)
                    })
            })
    }, [])

    const buildStudentRows = (students, assigned) => {
        const rows = 
        students.map((student) => {
            let isAssigned = false
            let completedOn = '-'
            const assignedMatch = assigned.find((s) => s.student.id == student.id)
            if(assignedMatch){
                isAssigned = true
                completedOn = assignedMatch.completedOn ? moment(assignedMatch.completedOn).format('MM/DD/YYYY hh:ssa') : '-'
            }
            const stRow = {
                id: student.id,
                name: student.user.first_name + ' ' + student.user.last_name,
                email: student.user.email,
                isAssignedText: isAssigned ? 'Yes' : 'No',
                isAssigned: isAssigned,
                score: 0,
                completedOn: completedOn
            }
            
            return stRow
        })

        setStudentRows(rows)
    }

    const refreshAssignedStudents = () => {
        getAssignedStudents(quizId)
        .then((data) => {
            setAssignedStudents(data)
            buildStudentRows(allStudents, data)
        })
    }

    const onAddQuestionClick = (e) => {
        setIsAddQuestionOn(true)
    }

    const reloadQuiz = () => {
        getSingleQuiz(quizId)
            .then((data) => setQuiz(data))
    }

    const onAddQuestionSave = (question) => {
        createQuestion(quizId, question)
            .then((result) => {
                reloadQuiz()
                setIsAddQuestionOn(false)
            })

    }

    const onDeleteQuestion = (event, questionId) => {
        event.preventDefault()
        deleteQuestion(questionId)
            .then((result) => {
                reloadQuiz()
            })

    }

    const onAddQuestionCancel = () => {
        setIsAddQuestionOn(false)
    }

    const onTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    const tabProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }



    return (
        <>
            <form>
                <h1>{quiz.title}</h1>
                <div>
                    <FormLabel>Description: </FormLabel>
                    <Typography sx={{display: "inline"}}>{quiz?.description}</Typography>
                </div>
                <div>
                    <FormLabel>Class: </FormLabel>
                    <Typography sx={{display: "inline"}}>{quiz?.classroom?.name}</Typography>
                </div>
                <div>
                    <FormLabel>Assigned On: </FormLabel>
                    <Typography sx={{display: "inline"}}> {quiz?.start_date ? moment(quiz.start_date).format('MM/DD/YYYY hh:ssa') : ''}</Typography>
                </div>
                <div>
                    <FormLabel>Due By: </FormLabel>
                    <Typography sx={{display: "inline"}}> {quiz?.expire_date ? moment(quiz.expire_date).format('MM/DD/YYYY hh:ssa') : 'No Due Date'}</Typography>
                </div>

            </form>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedTab} onChange={onTabChange} aria-label="basic tabs example">
                    <Tab label="Questions" {...tabProps(0)} />
                    <Tab label="Students" {...tabProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={selectedTab} index={0}>

                <div><Button variant="contained" onClick={onAddQuestionClick}>Add a Question</Button></div>
                {isAddQuestionOn && <div><QuestionCard mode="add" onSave={onAddQuestionSave} onCancel={onAddQuestionCancel}></QuestionCard></div>}
                {quiz.questions.map((question) => {
                    return <QuestionCard mode="edit" key={question.id} question={question} onDelete={onDeleteQuestion}></QuestionCard>
                })}
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <DataGrid
                    rows={studentRows}
                    columns={studentCols}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </TabPanel>
        </>
    )
}