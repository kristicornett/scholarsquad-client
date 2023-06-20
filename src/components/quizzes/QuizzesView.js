import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import { getQuizzesByTeacher } from '../../managers/QuizManager'
import Stack from '@mui/material/Stack'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const QuizzesView = ({userData}) => {
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const navigate = useNavigate()
    const RenderActionButtons = ({params}) => {
        const [count, setCount] = useState(0)
        return(
            <Button onClick={() => setCount((prev) => prev + 1)}>{count} click(s)</Button>

        )
    }
    const renderQuizzesByClass = (quizzes) => {
        setColumns( [
            { field: 'title', headerName: 'Quiz Title', width: 250 },
            { field: 'description', headerName: 'Description', width: 250 }, 
            { field: 'start_date', headerName: 'Start Date', width: 150 },
            { field: 'expire_date', headerName: 'Due Date', width: 150 },
            { field: 'questions', headerName: "Number of Questions", width: 150 },
            { field: 'classroom', headerName: 'Classroom Name', width: 250 },
            {
                field: "action",
                headerName: "Action",
                sortable: false,
                disableClickEventBubbling: true,
                width: 300,
                renderCell: (params) => {
                    const onClick = (e) => {
                        const currentRow = params.row
                        navigate(`/quizzes/${currentRow.id}`)
                    }
                    return (
                        <Stack direction='row' spacing={2}>
                            <Button onClick={onClick}>View</Button>
                            </Stack>
                    )
                }
            },
        ])
        const rowSet = []
        quizzes.map((quiz) => {
            rowSet.push( {
                id: quiz.id, title: quiz.title, description: quiz.description, start_date: quiz.start_date, expire_date: quiz.expire_date, questions: quiz.questions.length, classroom: quiz.classroom.name

            })
        })
        setRows(rowSet)
    }

    useEffect(() => {
        if(userData.isStaff){
            getQuizzesByTeacher(userData.teacherId)
            .then((result) => {
                renderQuizzesByClass(result)
            })
        }
    }, [])

    return (
        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
    </Box>)
}

