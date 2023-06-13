import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createSchool, getSingleSchool } from '../../managers/SchoolManager'

export const SchoolAddEdit = () => {
    const navigate = useNavigate()
    const {schoolId} = useParams()
    const [schoolDetail, setSchoolDetail] = useState(
        {
            name: ''
        }
    )
    const schoolName = useRef()

    useEffect(
        () => {
            if(schoolId){
            getSingleSchool(schoolId)
            .then((data) => {
                const singleSchool = data
                setSchoolDetail(singleSchool)
            })
        
            }
        },
        [schoolId]
    )
    
    const onSaveClick = () => {
        const schoolObj = {
            'name': schoolName.current.value
        }

        createSchool(schoolObj)
        .then(result => {
            navigate('/schools')
        })
        .catch((reason) => {
            console.log(reason)
            alert('add school failed: ' + reason)
        })
    }


    return  <>
    <h2>Add a new School</h2>
     <div className="flex">
     <div className="field">
          <label className="label">School Name</label>
          <div>
            <input className="input" type="text" ref={schoolName} />
          </div>
          <div>
            <button type="button" onClick={onSaveClick}>Save</button>
          </div>
        </div>

</div>

</>
}
