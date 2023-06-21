import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getSingleTeacher, getTeacherClassrooms } from '../../managers/TeacherManager'

export const TeacherHome = ({userData}) => {
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [teacher, setTeacher] = useState({school:{}})
    const [classrooms, setClassrooms] = useState([])
    const RenderActionButtons = ({params}) => {
        const [count, setCount] = useState(0)

        return (
            <Button onClick={() => setCount((prev) => prev + 1)}>{count} click(s)</Button>
        )
    }

    const RenderTeacherHome = (teacher) => {
        setColumns([
           { field: 'school', headerName: 'School', width: 150 },
           { field: 'classroom', headerName: 'classes', width: 250 },
           {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            disableClickEventBubbling: true,
            width: 300,
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row
                    navigate(`/classrooms/${currentRow.id}`)
                }
                return (
                    <Stack direction="row" spacing={2}>
                      <Button onClick={onClick}>Message</Button>
                    </Stack>
                  )
            }
           }
        ])

        const rowSet = []
        classrooms.map((classroom) => {
            rowSet.push( {
                id: classroom.id, school: classroom.school, classroom: classroom.classroom
            })
        })
        setRows(rowSet)
    }

    useEffect(() => {
        getTeacherClassrooms(userData.classId)
        .then((result) => {
            RenderTeacherHome(result)
        })
    })

    useEffect(
         () => {
            getSingleTeacher(userData.teacherId)
            .then((result) => {
                setTeacher(result)
            })

             getTeacherClassrooms(userData.teacherId)
             .then((results) => setClassrooms(results))
         }
         ,[]
     )

    const renderClassrooms = () => {
        return classrooms.map((classroom) =>
        {
            return <div key={classroom.id}>
                    <Link to={`/classrooms/${classroom.id}`}>{classroom.name}</Link>
                 </div>
        })
    }

     const onClickAddClass = () => {
        navigate(`/classrooms/add`)
     }

//     return (
//         <>
//         <h1>Teacher Dashboard</h1>
//         <div>My School: {teacher?.school?.name}</div>
//         <div>Classes</div>
//         <div><Link to={`/classrooms/add`}>Add a Class</Link></div>
//         <Fab color="primary" aria-label="add">
//             <AddIcon size='small' onClick={onClickAddClass} />
//             </Fab>
//         <div>
//             {renderClassrooms()}
//         </div>
//         <div><Link to='/'></Link></div>
//         </>
//     )
// }

return(
    
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
</Box>
)
}