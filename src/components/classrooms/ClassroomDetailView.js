import { useEffect, useState } from "react";
import { addStudentToClass, getSingleClass, getClassStudents } from "../../managers/ClassManager";
import { useNavigate, useParams } from "react-router-dom";
import { getAllStudents } from "../../managers/StudentManager";
import { useRef } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { TeacherClassDetail } from "../teachers/TeachClassDetail";
import { StudentClassDetail } from "../students/StudentClassDetail";

export const ClassroomDetailView = ({userData}) => {
    const {classroomId} = useParams()
    const user = JSON.parse(localStorage.getItem('scholarSquad_user'))
    const isStudent = (!userData.isStaff && !userData.isAdmin)
    
    const renderView = () => {
        if(isStudent){
            return <StudentClassDetail classroomId={classroomId} userData={userData}></StudentClassDetail>
        }
        else {
            return <TeacherClassDetail classroomId={classroomId} userData={userData}></TeacherClassDetail>
        }
    }

    return(<>
        {renderView()}
        

        </>)
}