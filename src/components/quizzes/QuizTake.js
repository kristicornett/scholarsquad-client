import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAssignedQuiz } from "../../managers/QuizManager"
import { shuffle } from "../../util"
import moment from "moment"
import { Box, Button } from "@mui/material"


export const QuizTake = ({ userData }) => {
    const { quizId } = useParams()
    const navigate = useNavigate()
    const [studentQuiz, setStudentQuiz] = useState({})
    const [isCompletedPreviously, setIsCompletedPreviously] = useState(false)
    const [questionsLength, setQuestionsLength] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [questionsList, setQuestionsList] = useState([])
    const [userAnswers, setUserAnswers] = useState([])

    useEffect(() => {
        if (!userData.studentId) {
            navigate('/')
        }

        getAssignedQuiz(quizId, userData.studentId)
        .then((result) => {
            setStudentQuiz(result)
            if(result.date_completed){
                setIsCompletedPreviously(true)
            }
            else{
                loadQuiz(result)
            }
        })
        // make sure the student hasn't already completed the quiz
        // if this is not a student then navigate them back home
        // if the student does not have the quiz assigned 

    }, [])

    const loadQuiz = (quiz) => {
        let questionArr = [...quiz.quiz.questions]
        questionArr = shuffle(questionArr)
        setQuestionsLength(questionArr.length)
        setQuestionsList(questionArr)
    }
    const advanceQuiz = () => {

    }

    const answerQuestion = (questionId, answerId) => {

    }

    return (
        <>
           <Box>
                <h1>{studentQuiz?.quiz?.title}</h1>
                <div>
                    Description: {studentQuiz?.quiz?.description}
                </div>
                <div>
                    Classroom: {studentQuiz?.quiz?.classroom.name}
                </div>
                <div>
                    Due By: {studentQuiz?.quiz?.expire_date ? moment(studentQuiz.quiz.expire_date) : 'No Due Date'}
                </div>
                {(currentIndex == -1) &&
                    <div>
                        <Button variant="contained" onClick={advanceQuiz}> Start Quiz </Button>
                    </div>
                }
                {(currentIndex >= 0) &&
                    <></>
                }
                  
            </Box>
        </>
    )

}










