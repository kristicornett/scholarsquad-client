import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getClassroomsBySchool } from '../../managers/ClassManager';
import { getSingleSchool } from '../../managers/SchoolManager';
import { getTeachersBySchool } from '../../managers/TeacherManager';
import { getStudentsBySchool } from '../../managers/StudentManager';
import { Box, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

export const SchoolDetailView = () => {

    const { schoolId } = useParams()
    const [school, setSchool] = useState({})
    const [teachers, setTeachers] = useState([])
    const [classrooms, setClassrooms] = useState([])
    const [students, setStudents] = useState([])
    const [selectedTab, setSelectedTab] = useState(0)
    const [classroomRows, setClassroomRows] = useState([])
    const [teacherRows, setTeacherRows] = useState([])
    const [studentRows, setStudentRows] = useState([])


    const classroomCols = [
        { field: 'name', headerName: 'Name', width: 250},
        { field: 'teacher', headerName: 'Teacher', width: 250},
        { field: 'roomNumber', headerName: 'Room Number', width: 150},
        { field: 'studentCount', headerName: '# Students', width:150},
        { field: 'description', headerName: 'Description', width:250}
    ]
    
    const teacherCols = [
        { field: 'name', headerName: 'Name', width: 250},
        { field: 'email', headerName: 'Email', width:250},
        { field: 'classCount', headerName: '# Classes', width: 150}
    ]
    
    const studentCols = [
        { field: 'name', headerName: 'Name', width: 250},
        { field: 'email', headerName: 'Email', width:250},
        { field: 'grade', headerName: 'Grade', width:150},
    ]
    

    useEffect(() => {

        const getSchool = getSingleSchool(schoolId)
        const getSchoolTeachers = getTeachersBySchool(schoolId)
        const getSchoolClassrooms = getClassroomsBySchool(schoolId)
        const getSchoolStudents = getStudentsBySchool(schoolId)

        Promise.all([getSchool, getSchoolTeachers, getSchoolClassrooms, getSchoolStudents])
        .then(([schoolResult, teachersResult, classroomsResult, studentsResult]) => {
            setSchool(schoolResult)
            setTeachers(teachersResult)
            setClassrooms(classroomsResult)
            setStudents(studentsResult)
            refreshTeacherRows(teachersResult)
            refreshStudentRows(studentsResult)
            refreshClassroomRows(classroomsResult)

        })
    }, [])

    const refreshTeacherRows = (teachers) => {
        const rowArray = []
        teachers?.map((teacher) => {
            rowArray.push( {
                id: teacher.id, name: teacher.full_name, email: teacher.user.email, classCount: teacher.classrooms.length, username: teacher.user.username
            })
        })
        setTeacherRows(rowArray)
    }

    const refreshStudentRows = (students) => {
        const rowArray = []
        students?.map((student) => {
            rowArray.push( {
                id: student.id, name: student.full_name, grade: student.grade, email: student.user.email, username: student.user.username
            })
        })
        setStudentRows(rowArray)
    }

    const refreshClassroomRows = (classrooms) => {
        const rowArray = []
        classrooms?.map((classroom) => {
            rowArray.push( {
                id: classroom.id, teacher: classroom?.teacher?.full_name, name: classroom.name, 
                studentCount: classroom.students.length, description: classroom.description,
                roomNumber: classroom.roomNumber
            })
        })
        setClassroomRows(rowArray)
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
        <div className='card-header'><h1>{school.name}</h1></div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedTab} onChange={onTabChange} aria-label="basic tabs example">
                    <Tab label="Classes" {...tabProps(0)} />
                    <Tab label="Teachers" {...tabProps(1)} />
                    <Tab label="Students" {...tabProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={selectedTab} index={0}>
                <DataGrid
                    rows={classroomRows}
                    columns={classroomCols}
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
            <TabPanel value={selectedTab} index={1}>
            <DataGrid
                    rows={teacherRows}
                    columns={teacherCols}
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
            <TabPanel value={selectedTab} index={2}>
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