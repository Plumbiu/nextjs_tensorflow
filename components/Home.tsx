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
import { TLocale } from '@/types'
import i18n from '@/assets/i18n/home.json'

export default function Home() {
  const router = useRouter()
  const locale = router.locale as TLocale
  function routerHandler(path: string) {
    router.push(path)
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 8, paddingBottom: 8 }}>
      <CardContent sx={{ margin: 'auto', maxWidth: 650 }}>
        <Typography className={classes.center} sx={{ fontSize: 22, fontWeight: 700 }} gutterBottom>
          {i18n[locale].card}
        </Typography>
        <Typography className={classes.demo} component="div">
          <QAScore type="question" question={i18n[locale].question} />
          <QAScore type="answer" answer={i18n[locale].answer} score={20} />
        </Typography>
        <Typography sx={{ mb: 1.5, textAlign: 'center' }} color="text.secondary">
          {i18n[locale].mean}
        </Typography>
        <Typography variant="body2" component="div">
          <b>1.</b> {i18n[locale].blueCard}
          <br />
          <div className={classes.questionDemo}>
            <QAScore type="question" question={i18n[locale].question} />
          </div>
        </Typography>
        <Typography variant="body2" component="div">
          <b>2.</b> {i18n[locale].redCard}
          <br />
          <div>
            <QAScore type="answer" answer={i18n[locale].answer} score={20} />
          </div>
        </Typography>
        <Typography sx={{ mb: 1.5, textAlign: 'center' }} color="text.secondary">
          {i18n[locale].use}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {i18n[locale].input}{i18n[locale].receive}
          <br />
        </Typography>
        <Typography className={classes.center} sx={{paddingBottom: 2}} color="text.secondary" gutterBottom component="div">
          <TextField size="small" label="question" variant="outlined" />
          <Button variant="contained">Press me</Button>
        </Typography>
        <Typography className={classes.center} sx={{ fontSize: 22, marginTop: 4, fontWeight: 700 }} gutterBottom>
          {i18n[locale].about}
        </Typography>
        <Typography className={classes.center} gutterBottom>
          <Button onClick={() => routerHandler('https://github.com/Plumbiu')} variant="contained" size="small">Github</Button>
          <Button onClick={() => routerHandler('https://github.com/Plumbiu/nextjs_tensorflow')} variant="outlined" size="small">{i18n[locale].repo}</Button>
        </Typography>
        <Typography variant="body2" component="div">
        </Typography>
      </CardContent>
      <CardActions className={classes.center}>
        <Typography variant="body2">
          {i18n[locale].based}
        </Typography>
        <Button variant="outlined" onClick={() => routerHandler('https://github.com/tensorflow/tfjs-models')} size="small">{i18n[locale].source}</Button>
      </CardActions>
    </Card>
  )
}
