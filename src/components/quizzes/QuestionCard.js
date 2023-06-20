import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, IconButton, TextField } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from "react";
import { updateQuestion } from "../../managers/QuestionManager";
export const QuestionCard = ({question, mode, onSave, onCancel, onDelete}) => {
    const [activeQuestion, setActiveQuestion] = useState()
    const [isEditOn, setIsEditOn] = useState(false)
    const [questionText, setQuestionText] = useState()
    const [answerOne, setAnswerOne] = useState()
    const [answerTwo, setAnswerTwo] = useState()
    const [answerThree, setAnswerThree] = useState()
    const [answerFour, setAnswerFour] = useState()
    const [correctAnswer, setCorrectAnswer] =useState(0)
    const questionFormRef = useRef()

    useEffect(() => {
        if(mode == "add"){
            loadEmptyQuestion()
        }
        else{
            loadQuestion(question)
        }

    }, [])

    const loadEmptyQuestion = () => {
        const newQuestion = {question: "", answers:[{id: -1, answer: "", isCorrect: true},
            {id: -1, answer: "", isCorrect: false},
            {id: -1, answer: "", isCorrect: false},
            {id: -1, answer: "", isCorrect: false}]}
            loadQuestion(newQuestion)
            setIsEditOn(true)
    }

    const onSelectedAnswerChanged  = (e, index) => {
        e.preventDefault()
        const defaultAnswer = 0
        const checked = e.target.checked

        if(correctAnswer == index){;
          if(!checked) setCorrectAnswer(defaultAnswer)
        }
        else
        {
            setCorrectAnswer(index)
        }
    }

    const onSaveQuestionClick = () => {
        const questionCopy = {...activeQuestion}
        questionCopy.question = questionText
        questionCopy.answers[0].answer = answerOne
        questionCopy.answers[0].isCorrect = (correctAnswer === 0)
        questionCopy.answers[1].answer = answerTwo
        questionCopy.answers[1].isCorrect = (correctAnswer === 1)
        questionCopy.answers[2].answer = answerThree
        questionCopy.answers[2].isCorrect = (correctAnswer === 2)
        questionCopy.answers[3].answer = answerFour
        questionCopy.answers[3].isCorrect = (correctAnswer === 3)
        if(mode == "add"){
            onSave(questionCopy)
        }
        else{
            updateQuestion(questionCopy)
            .then((result) => {
                setIsEditOn(false)
                loadQuestion(result)
            })
        }
        
    }

    const loadQuestion = (question) => {
        setQuestionText(question.question)
        setAnswerOne(question.answers[0].answer)
        setAnswerTwo(question.answers[1].answer)
        setAnswerThree(question.answers[2].answer)
        setAnswerFour(question.answers[3].answer)
        const index = question?.answers.map((a) => a.isCorrect).indexOf(true)
        setCorrectAnswer(index)
        setActiveQuestion(question)
    }

    const renderAnswers = () => {
        let count = 0
        return activeQuestion?.answers.map((answer) => {
            count++
            if(answer.isCorrect){
                return <div key={answer.id} className="question-answer-cell">{`${count}.`}<b>{answer.answer}</b> </div>
            }
            else {
                return <div key={answer.id} className="question-answer-cell">{`${count}. ${answer.answer}`}</div>
            }
        })
    }
    
    const resetForm = (e) => {
        if(mode == "add"){
            loadEmptyQuestion()
            onCancel()
        }
        else{
            setIsEditOn(false)
            loadQuestion(activeQuestion)
        }
    }

    return (
        <div className="question-card">
            {!isEditOn && <>
                <div>{questionText} 
                <IconButton onClick={(e) => setIsEditOn(!isEditOn)}>
                    <EditIcon></EditIcon>
                </IconButton>
                <IconButton onClick={(e) => onDelete(e, activeQuestion.id)}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
                </div>
                <div className="question-answer-section">
                    {renderAnswers()}
                </div>
            </>
            }
        {!!isEditOn && <>
            <Box component="form" ref={questionFormRef}      
        autoComplete="off">
          <FormControl fullWidth>
            <TextField
                      id="question-text"
                      label="Question"
                      value={questionText}
                      variant="outlined"
                      required
                      onInput={(e) => setQuestionText(e.target.value)}
                      size='small' sx={{ }}></TextField>
            </FormControl>
            <div className="question-answer-section">
            <TextField id="question-answer-one" label="Answer 1" sx={{margin:"10px 15px"}} value={answerOne} onInput={(e) => setAnswerOne(e.target.value)} variant='outlined' size="small" required></TextField>
            <FormControlLabel control={<Checkbox checked={correctAnswer == 0} onChange={(e) => onSelectedAnswerChanged(e, 0)}   />} label="correct" />
            </div>
            <div className="question-answer-section">
            <TextField id="question-answer-two" label="Answer 2" sx={{margin:"10px 15px"}} className="question-answer-edit" value={answerTwo} onInput={(e) => setAnswerTwo(e.target.value)} variant='outlined' size="small" required></TextField>
            <FormControlLabel control={<Checkbox checked={correctAnswer == 1} onChange={(e) => onSelectedAnswerChanged(e, 1)}   />} label="correct" />
            </div>
            <div className="question-answer-section">
            <TextField id="question-answer-three" label="Answer 3" sx={{margin:"10px 15px"}} className="question-answer-edit" value={answerThree} onInput={(e) => setAnswerThree(e.target.value)} variant='outlined' size="small" required></TextField>
            <FormControlLabel control={<Checkbox checked={correctAnswer == 2} onChange={(e) => onSelectedAnswerChanged(e, 2)}   />} label="correct" />
            </div>
            <div className="question-answer-section">
            <TextField id="question-answer-four" label="Answer 4" sx={{margin:"10px 15px"}} className="question-answer-edit" value={answerFour} onInput={(e) => setAnswerFour(e.target.value)} variant='outlined' size="small" required></TextField>
            <FormControlLabel control={<Checkbox checked={correctAnswer == 3} onChange={(e) => onSelectedAnswerChanged(e, 3)}   />} label="correct" />
            </div>
            
            <Button variant="contained" size="small" onClick={onSaveQuestionClick} sx={{marginTop: "15px"}}>Save</Button>
            <Button variant="contained" size="small" onClick={resetForm} sx={{marginTop: "15px", marginLeft: "10px"}}>Cancel</Button>
        </Box>
        </>
            
        }
        </div>
    )
}