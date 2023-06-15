import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const AdminHome = () => {
    const navigate = useNavigate()
    return (
        <>
        <h2>Admin Home</h2>
        
        <div><Link to='/schools'>Schools</Link></div>
        <div><Link to='/teachers'>Teachers</Link></div>
        </>
    )
}