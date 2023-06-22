import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAssignedQuiz, submitQuiz } from "../../managers/QuizManager"
import { shuffle } from "../../util"
import moment from "moment"
import { Box, Button, Checkbox, FormControlLabel, FormLabel, Typography } from "@mui/material"
import { useTheme } from "@emotion/react"


export const QuizTake = ({ userData }) => {
    const { quizId } = useParams()
    const navigate = useNavigate()
    const [studentQuiz, setStudentQuiz] = useState({})
    const [isCompletedPreviously, setIsCompletedPreviously] = useState(false)
    const [questionsLength, setQuestionsLength] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [questionsList, setQuestionsList] = useState([])
    const [userAnswers, setUserAnswers] = useState([])
    const [currentAnswerId, setCurrentAnswerId] = useState()
    const theme = useTheme()


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

    const loadQuiz = (studentQuiz) => {
        let questionArr = [...studentQuiz.quiz.questions]
        questionArr.forEach((q) => q.studentAnswer = {question_id: q.id, answer_id: null})
        questionArr = shuffle(questionArr)
        setQuestionsLength(questionArr.length)
        setQuestionsList(questionArr)
    }
    const advanceQuiz = () => {
        let newIndex = currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goBack = () => {
        if(currentIndex > -1){
        let newIndex = currentIndex - 1
        setCurrentIndex(newIndex)
        }
    }

    const answerQuestion = (event, question, answerId) => {
        if(event.target.checked) {
            question.studentAnswer.answer_id = answerId
            setCurrentAnswerId(answerId)
        }
        else {
            if(question.studentAnswer.answer_id = answerId){
                question.studentAnswer.answer_id = null
                setCurrentAnswerId(null)
            }
        }
        
        
    }

    const completeQuiz = () => {
        const answerArray = questionsList.map((ql) => ql.studentAnswer)
        const submitObject = { answers: answerArray, studentId: userData.studentId}
        submitQuiz(studentQuiz.quiz.id, submitObject)
        .then((data) => {
            navigate(~`/classrooms/${studentQuiz.quiz.classroom.id}`)
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        })
    }

    const renderSubmitQuiz = () => {
        
        

        return (<>
                        <div style={{padding: 30}}>
                        <Typography variant="h6">Please ensure you have answered all questions, then click submit to complete the quiz</Typography>
                        </div>
                        <Button variant="outlined" onClick={(e) => goBack()}>Go Back</Button>
                        <Button variant="contained" onClick={(e) => completeQuiz()} sx={{marginLeft: "15px"}}>Submit</Button>
                        
            
            </>
        )

    }

    const renderQuestion = () => {
        const question = questionsList[currentIndex]
        const currentAnswerId = question.studentAnswer.answer_id
        return (<>  
                    <Box sx={{
                        width: 620,
                        height: 300,
                        backgroundColor: 'secondary.main',
                        padding: "10px",
                        borderRadius: "10px"
                    }}>
                    <div>  
                        <Box sx={{
                        width: 600,
                        borderColor: 'primary.main',
                        border: "1px solid gray",
                        padding: "10px",
                        borderRadius: "10px",
                        backgroundColor: "white"
                    }}><Typography>{question.question}</Typography></Box>
                    </div>
                    <div className="question-answer-section">
                        <div className="question-answer-cell">
                        <FormControlLabel control={<Checkbox checked={question.answers[0].id === currentAnswerId} onClick={(e) => answerQuestion(e, question, question.answers[0].id)}></Checkbox>} label={question.answers[0].answer} />
                        </div>
                        <div className="question-answer-cell">
                        <FormControlLabel control={<Checkbox label={question.answers[1].answer} checked={question.answers[1].id === currentAnswerId} onClick={(e) => answerQuestion(e, question, question.answers[1].id)}></Checkbox>} label={question.answers[1].answer} />
                        </div>
                        <div className="question-answer-cell">
                        <FormControlLabel control={<Checkbox label={question.answers[2].answer} checked={question.answers[2].id === currentAnswerId} onClick={(e) => answerQuestion(e, question, question.answers[2].id)}></Checkbox>} label={question.answers[2].answer} />
                        </div>
                        <div className="question-answer-cell">
                        <FormControlLabel control={<Checkbox label={question.answers[3].answer} checked={question.answers[3].id === currentAnswerId} onClick={(e) => answerQuestion(e, question, question.answers[3].id)}></Checkbox>} label={question.answers[3].answer} />
                        </div>
                        
                    </div>
                    <div style={{marginTop: "15px"}}>
                        <Button variant="outlined" onClick={(e) => goBack()}>Go Back</Button>
                        <Button variant="contained" onClick={(e) => advanceQuiz()} sx={{marginLeft: "15px"}}>Next</Button>
                    </div>
                    </Box>
                </>)
    }

    const spaceAbove = {
        marginTop: 20
    }

    return (
        <>
           <Box>
                <h1>{studentQuiz?.quiz?.title}</h1>
                <div>
                    <FormLabel>Description: </FormLabel>
                    <Typography sx={{display: "inline"}}>{studentQuiz?.quiz?.description}</Typography>
                </div>
                <div>
                    <FormLabel>Class: </FormLabel>
                    <Typography sx={{display: "inline"}}>{studentQuiz?.quiz?.classroom.name}</Typography>
                </div>
                <div>
                    <FormLabel>Due By: </FormLabel>
                    <Typography sx={{display: "inline"}}> {studentQuiz?.quiz?.expire_date ? moment(studentQuiz.quiz.expire_date).format('MM/DD/YYYY hh:ssa') : 'No Due Date'}</Typography>
                </div>
                {(currentIndex == -1) &&
                    <div style={spaceAbove}>
                        <Button variant="contained" onClick={(e) => advanceQuiz()}> Start Quiz </Button>
                    </div>
                }
                {(currentIndex >= 0 && currentIndex < questionsLength) &&
                   <div style={spaceAbove}>
                        {renderQuestion()}
                    </div>
                //do styled card here
                }
                {(currentIndex == questionsLength) && 
                    <div style={spaceAbove}>
                     {renderSubmitQuiz()}
                    </div>
                }  
                
            </Box>
        </>
    )

}



















