
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from "react"
import { useState } from "react"
import Box from '@mui/material/Box';
import { getTeacherClassrooms } from '../../managers/TeacherManager';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getStudentClassrooms } from '../../managers/StudentManager';

export const ClassroomsView = ({userData}) => {

    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const navigate = useNavigate()

    const renderTeacherClasses = (classrooms) => {
        setColumns( [
            { field: 'name', headerName: 'Class Name', width: 250},
            { field: 'roomNumber', headerName: 'Room Number', width: 150},
            { field: 'studentCount', headerName: 'Students', width: 150},
            { field: 'description', headerName: 'Description', width: 350},
            {
                field: "action",
                headerName: "Action",
                sortable: false,
                disableClickEventBubbling: true,
                width: 300,
                renderCell:  (params) => {
                    const onClick = (e) => {
                      const currentRow = params.row;
                      navigate(`/classrooms/${currentRow.id}`)
                    };
                    
                    return (
                      <Stack direction="row" spacing={2}>
                        <Button onClick={onClick}>Edit</Button>
                      </Stack>
                    );
                }
              },
              
        ])
        const rowSet = []
        classrooms.map((classroom) => {
            rowSet.push( {
                id: classroom.id, name: classroom.name, roomNumber: classroom.roomNumber, studentCount: classroom.students.length, description: classroom.description
            })
        })
        setRows(rowSet)
    }

    const renderStudentClasses = (classrooms) => {
        setColumns( [
            { field: 'name', headerName: 'Class Name', width: 250},
            { field: 'roomNumber', headerName: 'Room Number', width: 150},
            { field: 'description', headerName: 'Description', width: 350},
            {
                field: "action",
                headerName: "Action",
                sortable: false,
                disableClickEventBubbling: true,
                width: 300,
                renderCell:  (params) => {
                    const onClick = (e) => {
                      const currentRow = params.row;
                      navigate(`/classrooms/${currentRow.id}`)
                    };
                    
                    return (
                      <Stack direction="row" spacing={2}>
                        <Button onClick={onClick}>View</Button>
                      </Stack>
                    );
                }
              },
              
        ])
        const rowSet = []
        classrooms.map((classroom) => {
            rowSet.push( {
                id: classroom.id, name: classroom.name, roomNumber: classroom.roomNumber, studentCount: classroom.students.length, description: classroom.description
            })
        })
        setRows(rowSet)
    }

    useEffect(()=>{
        if(userData.isStaff){
            getTeacherClassrooms(userData.teacherId)
            .then((result) => {
                renderTeacherClasses(result)
            })
        } else {
            getStudentClassrooms(userData.studentId)
            .then((result) => {
                renderStudentClasses(result)
            })
        }



    },[])

    // const rows =[
    //     { id: 1, name: 'English', roomNumber: '101A', studentCount: "18", description: 'Covering writing & composition for freshman' }
    // ]

    return(
        <Box sx={{ height: 400, width: '100%' }}>
            {userData.isStaff && 
          <div style={{padding: "20px"}}>
            <Button variant="contained" onClick={(e) => navigate('/classrooms/add')}> Add a Class </Button>
          </div>
          }
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





