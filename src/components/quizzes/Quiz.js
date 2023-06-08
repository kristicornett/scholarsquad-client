import { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleQuiz } from '../../managers/QuizManager'

export const Quiz = () => {
    const [quiz, setQuiz] = useState({})
    const { quiz_id } = useParams()

    useEffect(() => {
        getSingleQuiz(quiz_id)
        .then((data) => setQuiz(data))
    }, [quiz_id])

    return (
        <>
        <h1>{quiz.title}</h1>
        <div>
            Teacher: {quiz.created_by}
        </div>
        <div>
            Description: {quiz.description}
        </div>
        <div>
            Available From: {quiz.start_date} through {quiz.expire_date}
        </div>
        </>
    )
}
