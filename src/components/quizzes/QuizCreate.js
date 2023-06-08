import { useEffect, useState } from 'react';
import { createQuiz } from '../../managers/QuizManager';
import { getUser } from '../../managers/UserManager';

export const LetterCreate = () => {
  const [quiz, setQuiz] = useState([])
  const [response, setResponse] = useState('')
  const [user, setUser] = useState({})
  const [quizObject, setQuizObject] = useState(null)

  const handleAIResponse = async (event) => {
    event.preventDefault()
    
    try {
        const userObject = {
            name: user.first_name + ' ' + user.last_name,
            school: user.school,
            schoolClass: user.schoolClass
        }
        const studentQuiz = quiz.map((quiz) => quiz.description)

        const userInput = `The quiz I want you to make is multiple choice, fill in the blank.
        I want 9th grade level vocabulary words used in a sentence for students to choose. You should make 10 questions for ${quiz.quiz}`

        const response = await(userInput)
        setQuiz(studentQuiz)

        const date = new Date().toISOString().split('T')[0]
        const newQuizObject = {
            created_by: user.id,
            description: quiz.description,
            question: response,
            start_date: date
        }
        setQuizObject(newQuizObject)
    } catch (error) {
        console.log('Error:', error)
    }

  }
  const handleQuizSave = async (event) => {
    event.preventDefault()

    try {
        await createQuiz(quizObject)
    } catch (error) {
        console.log('Error:', error)
    }
  }

  useEffect(() => {
    getUser()
    .then((data) => setUser(data))
  }, [])

  return(
    <div>
        <form onSubmit={handleAIResponse}>
            <div>
                <label>Create Quiz:</label>
            </div>
            <label>Quiz Description:</label>
            <textarea
            value={quiz.description}
            onChange={(event) => setQuiz(event.target.value)}
            placeholder="Quiz Description"
            />
            <button type="submit">Generate Quiz</button>
        </form>

        {response && (
            <div>
                <textarea
                value={response}
                onChange={(event) => setResponse(event.target.value)}
                placeholder="Edit Quiz"
                />
                <button onClick={handleQuizSave}>Save Quiz</button>
                </div>)}
            
        
    </div>

  )
  }
 