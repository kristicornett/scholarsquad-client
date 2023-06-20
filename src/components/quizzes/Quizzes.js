import { Link } from 'react-router-dom'

export const Quizzes = ({ quiz }) => {
    return (
        <div>
            <Link to={`/quizzes/${quiz.id}`}>{quiz.description}</Link>
        </div>
    )
}