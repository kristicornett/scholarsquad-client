import { Box } from "@mui/material"
import { useEffect } from "react"

export const QuizQuestionCard = ({question, answerQuestion, goBack, answer}) => {
    const [chosenAnswer, setChosenAnswer] = useState(answer)
    
    useEffect(() => {

    }
    ,[])
    
    const onNextClick = () => {
        answerObj = { questionId: question.id, answerId: choseAnswer.id}
        answerQuestion(answerObj)
    }

    const onBackClick = () => {
        goBack()
    }

    return (
        <Box>

        </Box>
    )
}







