import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const TeacherHome = () => {
    const navigate = useNavigate()
    return (
        <>
        <h2>Teacher Home</h2>
        <div>My School</div>
        <div>Classes</div>
        
        <div><Link to='/'></Link></div>
        </>
    )
}