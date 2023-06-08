import { useState } from 'react'
import { updateQuiz } from '../../managers/QuizManager'

export const QuizModal = ({ quiz, closeModal }) => {
    const [editQuiz, setEditQuiz] = useState(quiz.question)

    const handleSave = () => {
        const updateQuiz = { ...quiz, question: editQuiz }

        updateQuiz(updateQuiz, quiz.id)
        .then(() => {
            console.log('Quiz successfully updated')
            closeModal()
        })
        .catch((error) => console.error('Error updating quiz'))
    }

    return (
        <div className='quizModal'>
            <h3>Quiz Details</h3>
            <div className='quizBody'>{quiz.question}</div>
            <textarea
            value={editQuiz}
            onChange={(event) => setEditQuiz(event.target.value)}>

            </textarea>
            <button onClick={handleSave}>Save</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    )
}