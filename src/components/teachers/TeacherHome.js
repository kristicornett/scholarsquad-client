import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getSingleTeacher, getTeacherClassrooms } from '../../managers/TeacherManager'

export const TeacherHome = ({userData}) => {
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    const [teacher, setTeacher] = useState({school:{}})
    const [classrooms, setClassrooms] = useState()

    const columns = [ { field: 'school', headerName: 'School', width: 150 },
    { field: 'classroom', headerName: 'Class', width: 250 },
    { field: 'studentCount', headerName: 'Students'},

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
               <Button onClick={onClick}>View</Button>
             </Stack>
           )
     }}]

     useEffect(
        () => {
           getSingleTeacher(userData.teacherId)
           .then((result) => {
               setTeacher(result)
           })

            getTeacherClassrooms(userData.teacherId)
            .then((results) => setClassrooms(results))
    },[])

    useEffect(() => {
        const rowSet = []

        classrooms?.map((classroom) => {
            rowSet.push( {
                id: classroom.id, school: classroom.school.name, classroom: classroom.name, studentCount: classroom.students.length
            })
        })
        setRows(rowSet)
    },[classrooms])



    // const renderClassrooms = () => {
    //     return classrooms.map((classroom) =>
    //     {
    //         return <div key={classroom.id}>
    //                 <Link to={`/classrooms/${classroom.id}`}>{classroom.name}</Link>
    //              </div>
    //     })
    //}

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









