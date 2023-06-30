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
        <div style={{marginTop: "10px", border: "1px solid black", padding: "2em"}}>
            <div style={{marginBottom: "2px", padding: "3px"}}>
            {question.question}
            </div>
            <div style={{fontWeight: "bold", marginBottom: "2px", padding: "3px"}}>
            Correct Answer: {correctAnswer.answer}
            </div>
            <div style={{marginBottom: "5px", padding: "3px"}}>
            Your Answer: <div style={{color: "#39325F", display: "inline", marginTop: "3px"}}>{answerInfo.answer}</div>
            </div>
            </div>
        </>
   }

   return <>

        <div style={{padding: "2em", backgroundColor: "#39325F", fontSize: "large", color: "white", maxWidth: "800px", marginTop: "2em", marginLeft: "3em"}}>
        <div>
           <div style={{fontWeight: "bold", display: "inline"}}>Quiz:</div> <div style={{display: "inline"}}>{quiz.title}</div>
            
        </div>
        <div>
        <div style={{fontWeight: "bold", display: "inline"}}>Teacher: </div><div style={{display: "inline"}}>{quiz?.created_by?.user?.last_name}</div></div>
        <div>
        <div style={{fontWeight: "bold", display: "inline"}}>Your score: </div><div style={{display: "inline"}}>{studentQuiz.score}</div>
        </div>
        </div>
        <div style={{border: "2px solid black", boxShadow: "5px 5px gray", padding: "2em", maxWidth: "800px", marginLeft: "54px"}}>
        {
            quiz?.questions?.map((question) => {
                return renderQuestion(question)
            })
        }
        </div>
    </>
}