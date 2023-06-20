import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assignStudent, getAssignedStudents, getSingleQuiz } from '../../managers/QuizManager'
import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import { QuestionCard } from './QuestionCard';
import { createQuestion, deleteQuestion } from '../../managers/QuestionManager';
import { getClassStudents } from '../../managers/ClassManager';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment/moment';
import { getAllSchools, getSingleSchool } from '../../managers/SchoolManager';

export const SchoolDetailView = () => {
    const [school, setSchool] = useState([])
    const [selectedTab, setSelectedTab] = useState(0)
    const { schoolId } = useParams()
    const [allSchools, setAllSchools] = useState([])
    const [schoolRows, setSchoolRows] = useState([])

    const schoolCols = [
        { field: 'name', headerName: 'Name', width: 250},
        { field: 'principal', headerName: 'Principal', width: 250},
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
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
                  const schoolId = currentRow.id
                  setSchool(schoolId)
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
        getSingleSchool(schoolId)
        .then((result) => {
            setSchool(result)
            .then(([csResults, asResults]) => {
                buildSchoolRows(csResults, asResults)
        })
    })

    const refreshSchools = () => {
        getAllSchools()
        .then((data) => {
            setAllSchools(data)
            buildSchoolRows(allSchools, data)
        })
    }
}