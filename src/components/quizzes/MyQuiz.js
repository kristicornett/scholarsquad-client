// import { useEffect, useState } from 'react'
// import { getMyQuiz, deleteQuiz } from '../../managers/QuizManager'
// import { Quiz } from './Quiz'
// import { useNavigate } from 'react-router-dom'

// export const MyQuiz = () => {
//     const [myQuiz, setMyQuiz] = useState([])
//     const navigate = useNavigate()

//     const getAllMyQuizzes = () => {
//         getMyQuiz()
//         .then((data) => setMyQuiz(data))
//     }

//     useEffect(() => {
//         getAllMyQuizzes()
//     }, [])

//     const deleteData = (quizId) => {
//         deleteQuiz(quizId)
//         .then(() => {
//             getAllMyQuizzes()
//         })
//     }
//     return (
//         <>
//         {myQuiz.map((quiz) => {
//             return (
//                 <div key={quiz.id}>
//                     <Quiz key={quiz.id} quiz={quiz} />
//                     <button key={`edit--${quiz.id}`} type="button" onClick={() => { navigate(`/edit_quiz/${quiz.id}`) }}>Edit</button>
//                     <button key={`delete--${quiz.id}`} type="button" onClick={() => { deleteData(quiz.id) }}>Delete</button>
//                 </div>
//             )
//         })}
//         </>
//     )
// }
