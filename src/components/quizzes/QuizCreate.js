import { useEffect, useRef, useState } from 'react';
import { generateQuiz } from '../../managers/QuizManager';
import { createQuiz } from '../../managers/QuizManager';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Stack, Typography, TextField, Box, TextareaAutosize, InputLabel, Select, MenuItem, FormLabel, FormControl, Card, CardContent, Chip, FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { getTeacherClassrooms } from '../../managers/TeacherManager';

export const QuizCreate = () => {
  const { classroomId } = useParams()

  const [classrooms, setClassrooms] = useState([])
  const [selectedClassroomId, setSelectedClassroomId] = useState()
  const title = useRef()
  const description = useRef()
  const [user, setUser] = useState({})
  const [keywords, setKeyWords] = useState(['plethora','ambivalent','omniscient','attitude'])
  const [keywordInput, setKeyWordInput] = useState([])
  const questionFormRef = useRef()
  const questionText = useRef()
  const answerOne = useRef()
  const answerTwo = useRef()
  const answerThree = useRef() 
  const answerFour = useRef()
  const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState(1)
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  
  useEffect(() => {
    const tokenUser = JSON.parse(localStorage.getItem('scholarSquad_user'))
    if(tokenUser) setUser(tokenUser);


    getTeacherClassrooms(tokenUser.teacherId)
    .then((result) => {
      if(result.length > 0) setSelectedClassroomId(result[0].id)
      setClassrooms(result)
    })

    }, [])

  const onGenerateQuestionsClicked = async (event) => {
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

  const onAddKeywordClicked = (event) => {
    event.preventDefault()
    if(keywordInput && keywordInput.length > 0){
        keywords.push(keywordInput)
        setKeyWords(keywords)
        setKeyWordInput('')
    }
  }

  const onClickSubmit = () => {
    setIsLoading(true)
    const date = new Date().toISOString().split('T')[0]
    const theQuestions = questions
    const quizObj = {
        'title' : title.current.value,
        'description' : description.current.value,
        'user_id' : user.id,
        'start_date': date,
        'expire_date': null,
        'questions': theQuestions,
        'classroom_id': selectedClassroomId
    }
    const str = JSON.stringify(quizObj)

    //alert(JSON.stringify(quizObj))
    createQuiz(quizObj).then(result => {
        setIsLoading(false)
        navigate('/')
    })

  }

  const renderClassroomSection = () => {
      if(!classroomId){
        return <div>
          <FormControl fullWidth>
            <InputLabel id="classroom-select-label">Classroom</InputLabel>
            <Select
              labelId="classroom-select-label"
              id="classroom-select"
              value={selectedClassroomId ?? " "}
              label="Classroom"
              onChange={(e) => { setSelectedClassroomId(e.target.value)}}
              displayEmpty
            >
              {classrooms.map((classroom) => {
                return <MenuItem key={classroom.id} value={classroom.id}>{classroom.name}</MenuItem>
              })}
            </Select>
          </FormControl>
      </div>
      }
      else
      {
        return <div>
          <FormLabel id='lblClassroom'>Classroom:</FormLabel>
          <Typography variant="body1"></Typography>
        </div>
      }
  }

  const onAddQuestionClicked = (event) => {
    event.preventDefault();
    const answerList = [answerOne.current.value, answerTwo.current.value, answerThree.current.value, answerFour.current.value]
    const question = {
      question: questionText.current.value,
      answers: answerList,
      correctAnswer: answerList[selectedCorrectAnswer - 1]
    }
    const copy = [...questions]
    copy.push(question)

    questionFormRef.current.reset()
    answerTwo.current.setAttribute('error', 'error')
    setQuestions(copy)
    setSelectedCorrectAnswer(1)
    alert(JSON.stringify(question))
  }

  const onSelectedAnswerChanged = (event, answerId) => {
    event.preventDefault()
    const defaultAnswer = 1
    const checked = event.target.checked

    if(selectedCorrectAnswer == answerId){;
      if(!checked) setSelectedCorrectAnswer(defaultAnswer)
    }
    else
    {
      setSelectedCorrectAnswer(answerId)
    }

    
  }

  const renderQuestion = (question) => {
    return <div key={question.id}>
        <Typography variant="h5">{question.question}</Typography><IconButton aria-label="delete" onClick={onDeleteQuestion(question.question)}>
                                                                    <DeleteIcon />
                                                                  </IconButton> 
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

  const onKeywordDelete = (word) => () => {
    setKeyWords((keywords) => keywords.filter((keyword) => keyword !== word))
  }

  const onDeleteQuestion = (question) => () => {
    const qs = questions.filter((q) => q.question !== question)
    setQuestions(qs)
  }

  return ( 
    <Container maxWidth="lg" sx={{border: 1, borderColor: 'secondary.main', borderRadius: 2, marginTop: 8}}>
    <div style={{display: "flex", flexDirection: "row"}}>
    <div style={{flex: "1"}}>
    <Stack direction="column" spacing={1} sx={{}}>
        <div>
            <Typography variant='h3'>
                Create Quiz
            </Typography>
        </div>
    </Stack>
    </div>
    <div style={{float: "right"}}>
             
        </div>
    </div>
    <Box
      component="form"
      // sx={{
      //   '& .MuiTextField-root': { m: 1, width: '25ch' },
      // }}
      noValidate
      autoComplete="off"
    >
      <FormControl fullWidth>
      <TextField
          required
          id="title-text"
          label="Title"
          inputRef={title}
          variant="outlined"
        />
      </FormControl>
      {renderClassroomSection()}
      <FormControl fullWidth>
        <FormLabel id="description-text-label">
        Description
        </FormLabel>
        <TextareaAutosize
          ref={description}
          id="description-text"

          minRows={3}
        >
          </TextareaAutosize>
      </FormControl>
      </Box>
      <Card variant="outlined">
        <CardContent>
            <TextField id="keyword-text" label="Add a Keyword"  value={keywordInput} onInput={e => setKeyWordInput(e.target.value)} variant="standard"></TextField>
          <Button variant="contained" size="small" onClick={onAddKeywordClicked}>Add</Button>
          {
            keywords.map((word) => {
              return <Chip key={word} variant="outlined" label={word} onDelete={onKeywordDelete(word)}></Chip>
            })
          }
        </CardContent>
      </Card>
      <Card>
        <CardContent>
        
        <Typography variant="h5">Add Questions</Typography>
        <Box component="form" ref={questionFormRef}      
        autoComplete="off">
          <FormControl fullWidth>
            <TextField
                      id="question-text"
                      label="Question"
                      inputRef={questionText}
                      variant="outlined"
                      required
                      size='small' sx={{ }}></TextField>
            </FormControl>
            <TextField id="question-answer-one" label="Answer 1" inputRef={answerOne} variant='outlined' size="small" required></TextField><FormControlLabel control={<Checkbox checked={selectedCorrectAnswer == 1} onChange={(e) => onSelectedAnswerChanged(e, 1)}  />} label="Correct" />
            <TextField id="question-answer-two" label="Answer 2" inputRef={answerTwo} variant='outlined' size="small" required></TextField><FormControlLabel control={<Checkbox  checked={selectedCorrectAnswer == 2} onChange={(e) => onSelectedAnswerChanged(e,2)}  />} label="Correct" />
            <TextField id="question-answer-three" label="Answer 3" inputRef={answerThree} variant='outlined' size="small" required></TextField><FormControlLabel control={<Checkbox  checked={selectedCorrectAnswer == 3} onChange={(e) => onSelectedAnswerChanged(e, 3)}  />} label="Correct" />
            <TextField id="question-answer-four" label="Answer 4" inputRef={answerFour} variant='outlined' size="small" required></TextField><FormControlLabel control={<Checkbox checked={selectedCorrectAnswer == 4} onChange={(e) => onSelectedAnswerChanged(e, 4)}   />} label="Correct" />
            <Button variant="contained" size="small" onClick={onAddQuestionClicked}>Add</Button>
        </Box>
        </CardContent>
      </Card>
      <Button variant="contained" onClick={onGenerateQuestionsClicked}>Generate Questions</Button>
      {questions && (
         questions.map((question => {

             return renderQuestion(question)
         }))
             
        )}
      <div>
        <Button variant="contained" onClick={onClickSubmit}>Save Quiz</Button>
      </div>

</Container>
  )}