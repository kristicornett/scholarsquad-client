import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleSchool } from '../../managers/SchoolManager'

export const SchoolDetails = () => {
    const {schoolId} = useParams()
    const [schoolDetail, setSchoolDetail] = useState(
        {
            name: ''
        }
    )
    useEffect(
        () => {
            getSingleSchool(schoolId)
            .then((data) => {
                const singleSchool = data
                setSchoolDetail(singleSchool)
            })
        },
        [schoolId]
    )
    return  <>
     <div className="flex">
    <div className="card">
        <div className="card-body">
        <div className='text-xl mb-2'>{schoolDetail.name}</div>
        
        <div>Name: {schoolDetail.name}</div>
 
    </div>
    <div className="card">
        <div className='card-body'>
        <div className='font-bold text-center'>
        </div>
        </div>
    </div>

</div>
</div>
</>
}
