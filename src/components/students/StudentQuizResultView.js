import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAssignedQuiz, getSingleQuiz } from "../../managers/QuizManager"
import { Button, Container, Stack, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import moment from "moment/moment";

export const StudentQuizResultView = ({userData}) => {
    const {quizId, classId} = useParams()
    const [quiz, setQuiz] = useState({})
    const [studentQuiz, setStudentQuiz] = useState({})
    const navigate = useNavigate()



   useEffect(() => {
        const getAQuiz = getSingleQuiz(quizId)
        const getStudentQuiz = getAssignedQuiz(quizId)

        Promise.all([getAQuiz, getStudentQuiz])
        .then(([singleQuizResult, studentQuizResult]) => {
          setQuiz(singleQuizResult)  
          setStudentQuiz(studentQuizResult)
        })
   }, [])
   
   const renderQuestion = (question) => {
        const correctAnswer = question.answers.find((answer) => {
            return answer.isCorrect == true
        })
        const studentAnswer = studentQuiz.student_answer.find((answer) => {
            return answer.question == question.id
        })

        let answerInfo = { answer: "Did not answer" }

        if(!!studentAnswer){
        answerInfo = question.answers.find((answer) => {
            return answer.id == studentAnswer.answer
        })
    }

        return <>
            <div>
            {question.question}
            </div>
            <div>
            Correct Answer: {correctAnswer.answer}
            </div>
            <div>
            Your Answer: {answerInfo.answer}
            </div>
        </>
   }

   return <>
        Student Quiz Result Page
        <article>
            Quiz: {quiz.title}
            
        </article>
        <div>Teacher: {quiz?.created_by?.user?.last_name}</div>
        <div>
            Your score: {studentQuiz.score}
        </div>
        {
            quiz?.questions?.map((question) => {
                return renderQuestion(question)
            })
        }
    </>
}