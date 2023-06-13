import { useEffect, useRef, useState } from 'react';
import { generateQuiz } from '../../managers/QuizManager';
import { createQuiz } from '../../managers/QuizManager';
import { useNavigate } from 'react-router-dom';
export const QuizCreate = () => {

  const title = useRef()
  const description = useRef()
  const [user, setUser] = useState({})
  const [keywords, setKeyWords] = useState(['plethora','ambivalent','omniscient','attitude'])
  const [keywordInput, setKeyWordInput] = useState([])

  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  
  useEffect(() => {
    const tokenUser = JSON.parse(localStorage.getItem('scholarSquad_user'))
    if(tokenUser) setUser(tokenUser);
    }, [])

  const generateQuizClick = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const keywordsString = keywords.reduce((result, item) => {
        return  result + ',' + item
    })
    const aiRequest = {
        'keywords' : keywordsString
    }
    try {
        generateQuiz(aiRequest).then(result =>{
            loadGeneratedQuizResult(result);
            setIsLoading(false)
        })
    } catch (error) {
        console.log('Error:', error)
    }
  }

  const loadGeneratedQuizResult = (quizResult) => {
    const result = JSON.parse(quizResult)
    setQuestions(result.quiz.questions)
    
  }

  const handleKeywordClick = (event) => {

    if(keywordInput && keywordInput.length > 0){
        keywords.push(keywordInput)
        setKeyWords(keywords)
        setKeyWordInput('')
    }
    const test = keywords
  }

  const saveQuiz = () => {
    setIsLoading(true)
    const date = new Date().toISOString().split('T')[0]
    const theQuestions = questions
    const quizObj = {
        'title' : title.current.value,
        'description' : description.current.value,
        'user_id' : user.id,
        'start_date': date,
        'expire_date': null,
        'questions': theQuestions
    }
  
    createQuiz(quizObj).then(result => {
        setIsLoading(false)
        navigate(`/quiz/${result.id}`)
    })


  }
  const renderQuestion = (question) => {
    return <div>
        <div>{question.question}</div>
        <div>Answers
            <ul>
                {question.answers.map((word) => {
                    if(word == question.correctAnswer)
                        return <li key={word}><b>{word}</b></li>
                    else
                        return <li key={word}>{word}</li>
                })}
            </ul>
        </div>

    </div>

  }


  return ( 
    <div>
        <form>
            <div>
                <label>Create Quiz:</label>
            </div>
            <div>
                <label>Quiz Title</label>
                <input type='text' ref={title} placeholder="Quiz Title"/>
            </div>
            <label>Quiz Description:</label>
            <textarea
            ref={description}
            placeholder="Quiz Description"
            />
            
            <input type='text' value={keywordInput} onInput={e => setKeyWordInput(e.target.value)}/>
            <button type="button" onClick={handleKeywordClick}>Add keyword</button>
        </form>
        <article className="keywords">
        <ul>
      {
        
        keywords.map(keyword => (
          <li key={keyword}>{keyword}</li>
        ))
       
      }
       </ul>
    </article>
    <button type="button" onClick={generateQuizClick} disabled={isLoading}>Generate Quiz</button>

    {questions && (
        questions.map((question => {

            return renderQuestion(question)
        }))
             
    )}

    
        <div>
            <button type="button" onClick={saveQuiz}>Save Quiz</button> 
            <button type="button">Manage</button>
        </div>

    </div>
  )
  }
 


  //   const handleAIResponse = async (event) => {
//     event.preventDefault()
    
//     try {
        // const userObject = {
        //     name: user.first_name + ' ' + user.last_name,
        //     school: user.school,
        //     schoolClass: user.schoolClass
        // }
        // const studentQuiz = quiz.map((quiz) => quiz.description)

        // const userInput = `The quiz I want you to make is multiple choice, fill in the blank.
        // I want 9th grade level vocabulary words used in a sentence for students to choose. You should make 10 questions for ${quiz.quiz}`

        // const response = await(userInput)
        // setQuiz(studentQuiz)

//         const date = new Date().toISOString().split('T')[0]
//         const newQuizObject = {
//             title: quiz.title,
//             
//             description: quiz.description,
//             question: response,
//             start_date: date
//         }
//         setQuizObject(newQuizObject)
//     } catch (error) {
//         console.log('Error:', error)
//     }

//   }