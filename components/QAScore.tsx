import React from 'react'
import classes from '@/styles/chat.module.css'
import { Box, Chip } from '@mui/material'
import { Answer } from '@tensorflow-models/qna/dist/question_and_answer'
import { IAnswer, IQuestion } from '@/types'



export default function QAScore(props: IAnswer | IQuestion) {
  if (props.type === 'question') {
    return (
      <Box className={`${classes.box} ${classes.questionBox}`}>
        {props.question}
      </Box>
    )
  }
  if(props.type === 'answer' && typeof props.answer === 'string' && props.score) {
    return (
      <div className={classes.answerScoreBox}>
        <Box className={`${classes.box} ${classes.answerBox}`}>{props.answer}</Box>
        <Chip color="primary" label={(props.score || 0).toFixed(2)} />
      </div>
    )
  }
  const answer = props.answer as Answer
  return (
    <div className={classes.answerScoreBox}>
      <Box className={`${classes.box} ${classes.answerBox}`}>{answer.text}</Box>
      <Chip color="primary" label={answer.score.toFixed(2)} />
    </div>
  )
}
