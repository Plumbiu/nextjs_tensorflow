import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from '@mui/material'
import React from 'react'
import QAScore from './QAScore'
import classes from '@/styles/home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  function routerHandler(path: string) {
    router.push(path)
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 8, paddingBottom: 8 }}>
      <CardContent sx={{ margin: 'auto', maxWidth: 650 }}>
        <Typography className={classes.center} sx={{ fontSize: 22, fontWeight: 700 }} gutterBottom>
          You will see some card like this
        </Typography>
        <Typography className={classes.demo} component="div">
          <QAScore type="question" question="This is a question" />
          <QAScore type="answer" answer="This is an answer" score={20} />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          What's this mean?
        </Typography>
        <Typography variant="body2" component="div">
          <b>1.</b> The blue one is your question or passage
          <br />
          <div className={classes.questionDemo}>
            <QAScore type="question" question="This is a question" />
          </div>
        </Typography>
        <Typography variant="body2" component="div">
          <b>2.</b> The red one is the answer and score which indicates the
          confident level
          <br />
          <QAScore type="answer" answer="This is an answer" score={20} />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          How to use it?
        </Typography>
        <Typography variant="body2" gutterBottom>
          put your question in the Input and Press the Button!
          <br />
          you will receive the answer from the server after a while
        </Typography>
        <Typography className={classes.center} color="text.secondary" gutterBottom component="div">
          <TextField size="small" label="question" variant="outlined" />
          <Button variant="contained">Press me</Button>
        </Typography>
        <Typography className={classes.center} sx={{ fontSize: 22, marginTop: 4, fontWeight: 700 }} gutterBottom>
          About Me 
        </Typography>
        <Typography className={classes.center} gutterBottom>
          <Button onClick={() => routerHandler('https://github.com/Plumbiu')} variant="contained" size="small">Github</Button>
          <Button onClick={() => routerHandler('https://github.com/Plumbiu/nextjs_tensorflow')} variant="outlined" size="small">repo</Button>
        </Typography>
        <Typography variant="body2" component="div">
        </Typography>
      </CardContent>
      <CardActions className={classes.center}>
        <Typography variant="body2">
          This project is based on TensorFlow
        </Typography>
        <Button variant="outlined" onClick={() => routerHandler('https://github.com/tensorflow/tfjs-models')} size="small">Source Code</Button>
      </CardActions>
    </Card>
  )
}
