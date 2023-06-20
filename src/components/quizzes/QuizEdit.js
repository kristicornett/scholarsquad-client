// import { useEffect , useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { getSingleQuiz } from '../../managers/QuizManager'

// export const QuizEdit = () => {
//     const [quiz, setQuiz] = useState({})
//     const { quizId } = useParams()
//     const [questions, setQuestions] = useState([])

//     useEffect(() => {
//         getSingleQuiz(quizId)
//         .then((data) => setQuiz(data))
//     }, [quizId])

//     const renderQuestion = (question) => {
//         return <div>
//         {question.question}
//         <div>
//             {question.answers.map((ans) => {
//                 return renderAnswer(ans)
//             })}
//         </div>
//         </div>
//     }

//     const renderAnswer = (answer) => {
//         return <h3>{answer.answer}</h3>
//     }

//     return (
//         <>
//         <form>
//         <h1>{quiz.title}</h1>
//         <div>
//             Teacher: {quiz.created_by}
//         </div>
//         <div>
//             Description: {quiz.description}
//         </div>
//         <div>
//             Available From: {quiz.start_date} through {quiz.expire_date}
//         </div>
//         { quiz && quiz.questions &&
//             quiz.questions.map((question) => {
//                return renderQuestion(question)

//             })
//         }
//         </form>

//         </>
//     )
// }
