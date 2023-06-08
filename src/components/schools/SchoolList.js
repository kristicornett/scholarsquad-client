import { useEffect, useState } from 'react'
import { getAllSchools, deleteSchool } from '../../managers/SchoolManager'
import { useNavigate } from 'react-router-dom'

export const SchoolList = () => {
    const [schools, setSchools] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        refreshSchools()
    }, [])

    const deleteSchool = (event, schoolId) => {
        event.preventDefault()

        deleteSchool(schoolId)
        .then((data) => refreshSchools())
    }

    const refreshSchools = () => {
        getAllSchools()
        .then((schoolArray) => {
            setSchools(schoolArray)
        })
    }
    return (
        <>
        <div>
            <span>Schools</span>
        </div>
        <button
        type='submit'
        onClick={() => navigate('/schools/add')}>
            {' '}
            Add A School{' '}
        </button>
        <article className="school_List">
            {schools.map((school) => {
                return (
                    <section key={`school--${school.id}`}>
                        <div className='card'>
                        <div className="town-header flex align-middle p-4">
                <img
                   
                    ></img>
                  
                  <div className="font-bold -ml-10 mb-4 w-full text-center">
                    <span className=" font-bold text-xl ml-20">
                      {school.name}
                    </span>
                  </div>
                  <button
                    className=" button pt-1 px-4 py-1 text-sm
                    text-red-900 font-semibold text-center
                    hover:text-white 
                    focus:outline-none focus:ring-2 focus:ring-red-600 text-center focus:ring-offset-2  inline mb-4"
                    id="delete_town"
                    onClick={(event) => deleteSchool(event, school.id)}
                  >
                    X
                  </button>
                </div>
                <div className="card-body">
                  <span
                    className=" bg-slate-200 w-36 pt-1 mt-4 ml-28 content-center px-4 py-1 text-sm 
                            text-purple-600 font-semibold rounded-none w-24 justify-center text-center place-center border 
                            border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
                            focus:outline-none focus:ring-2 focus:ring-purple-600 text-center focus:ring-offset-2 
                            block"
                    onClick={() => navigate(`/schools/${school.id}/`)}
                  >
                  
                  </span>
                
                <div>
                 
                </div>
             
                </div>
              </div>
            </section>  
                )
            })}
        </article>
        </>
    )
}