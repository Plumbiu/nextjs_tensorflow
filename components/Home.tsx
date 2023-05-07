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
import i18n from '@/assets/i18n.json'

export default function Home() {
  const { push, locale } = useRouter()
  const localLanuage = (locale || 'zh-CN') as ('zh-CN' | 'en-US')  
  function routerHandler(path: string) {
    push(path)
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 8, paddingBottom: 8 }}>
      <CardContent sx={{ margin: 'auto', maxWidth: 650 }}>
        <Typography className={classes.center} sx={{ fontSize: 22, fontWeight: 700 }} gutterBottom>
          {i18n[localLanuage].home.card}
        </Typography>
        <Typography className={classes.demo} component="div">
          <QAScore type="question" question={i18n[localLanuage].home.question} />
          <QAScore type="answer" answer={i18n[localLanuage].home.answer} score={20} />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {i18n[localLanuage].home.mean}
        </Typography>
        <Typography variant="body2" component="div">
          <b>1.</b> {i18n[localLanuage].home.blueCard}
          <br />
          <div className={classes.questionDemo}>
            <QAScore type="question" question={i18n[localLanuage].home.question} />
          </div>
        </Typography>
        <Typography variant="body2" component="div">
          <b>2.</b> {i18n[localLanuage].home.redCard}
          <br />
          <QAScore type="answer" answer={i18n[localLanuage].home.answer} score={20} />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {i18n[localLanuage].home.use}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {i18n[localLanuage].home.input}
          <br />
          {i18n[localLanuage].home.receive}
          <br />
        </Typography>
        <Typography className={classes.center} color="text.secondary" gutterBottom component="div">
          <TextField size="small" label="question" variant="outlined" />
          <Button variant="contained">Press me</Button>
        </Typography>
        <Typography className={classes.center} sx={{ fontSize: 22, marginTop: 4, fontWeight: 700 }} gutterBottom>
          {i18n[localLanuage].home.about}
        </Typography>
        <Typography className={classes.center} gutterBottom>
          <Button onClick={() => routerHandler('https://github.com/Plumbiu')} variant="contained" size="small">Github</Button>
          <Button onClick={() => routerHandler('https://github.com/Plumbiu/nextjs_tensorflow')} variant="outlined" size="small">{i18n[localLanuage].home.repo}</Button>
        </Typography>
        <Typography variant="body2" component="div">
        </Typography>
      </CardContent>
      <CardActions className={classes.center}>
        <Typography variant="body2">
          {i18n[localLanuage].home.based}
        </Typography>
        <Button variant="outlined" onClick={() => routerHandler('https://github.com/tensorflow/tfjs-models')} size="small">{i18n[localLanuage].home.source}</Button>
      </CardActions>
    </Card>
  )
}
