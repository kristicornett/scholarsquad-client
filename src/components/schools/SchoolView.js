import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import { getQuizzesByTeacher } from '../../managers/QuizManager'
import Stack from '@mui/material/Stack'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllSchools } from '../../managers/SchoolManager'

export const SchoolView = ({userData}) => {
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const navigate = useNavigate()
    const RenderActionButtons = ({params}) => {
        const [count, setCount] = useState(0)
        return(
            <Button onClick={() => setCount((prev) => prev + 1)}>{count} click(s)</Button>

        )
    }
    const renderSchools = (schools) => {
        setColumns( [
            { field: 'name', headerName: 'Name', width: 250 },
            {
                field: "action",
                headerName: "Action",
                sortable: false,
                disableClickEventBubbling: true,
                width: 300,
                renderCell: (params) => {
                    const onClick = (e) => {
                        const currentRow = params.row
                        navigate(`/schools/${currentRow.id}`)
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
        schools.map((school) => {
            rowSet.push( {
                id: school.id, name: school.name

            })
        })
        setRows(rowSet)
    }

    useEffect(() => {
        
            getAllSchools(userData)
            .then((result) => {
                renderSchools(result)
            })
        
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