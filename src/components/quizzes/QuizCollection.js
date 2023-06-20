// import { useEffect, useState } from 'react'
// import { getAllQuizzes, deleteQuiz } from '../../managers/QuizManager'
// import { QuizModal } from './QuizModal'

// export const QuizCollection = () => {
//     const [quizzes, setQuizzes] = useState([])
//     const [selectedQuiz, setSelectedQuiz] = useState(null)

//     useEffect(() => {
//         fetchQuizzes()
//     }, [])

//     const fetchQuizzes = () => {
//         getAllQuizzes()
//         .then((data) => setQuizzes(data))
//         .catch((error) => console.error('Error fetching quizzes:', error))
//     }

//     const handleDelete = (quizId) => {
//         deleteQuiz(quizId)
//         .then(() => {
//             fetchQuizzes()
//             console.log('Quiz successfully deleted')
//         })
//         .catch((error) => console.log('Error deleting quiz:', error))
//     }

//     const closeModal = () => {
//         setSelectedQuiz(null)
//     }

//     const handleEdit = (quiz) => {
//         setSelectedQuiz(quiz)
//     }

//     return (
//         <div className='quizCollection'>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Teacher</th>
//                         <th>Description</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {quizzes.map((quiz) => (
//                         <tr key={quiz.id}>
//                             <td>{quiz.start_date}</td>
//                             <td>{quiz.created_by}</td>
//                             <td>{quiz.descrition}</td>
//                             <td>
//                                 <button onClick={() => handleEdit(quiz)}>Edit</button>
//                                 <button onClick={() => handleDelete(quiz.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {selectedQuiz && (
//                 <QuizModal quiz={selectedQuiz} closeModal={closeModal} />
//             )}
//         </div>
//     )
// }