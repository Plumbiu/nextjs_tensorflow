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
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()
  function routerHandler(path: string) {
    router.push(path)
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 8, paddingBottom: 8 }}>
      <CardContent sx={{ margin: 'auto', maxWidth: 650 }}>
        <Typography className={classes.center} sx={{ fontSize: 22, fontWeight: 700 }} gutterBottom>
          {t('home.card')}
        </Typography>
        <Typography className={classes.demo} component="div">
          <QAScore type="question" question={t('home.question')} />
          <QAScore type="answer" answer={t('home.answer') as string} score={20} />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {t('home.mean')}
        </Typography>
        <Typography variant="body2" component="div">
          <b>1.</b> {t('home.blueCard')}
          <br />
          <div className={classes.questionDemo}>
            <QAScore type="question" question={t('home.question')} />
          </div>
        </Typography>
        <Typography variant="body2" component="div">
          <b>2.</b> {t('home.redCard')}
          <br />
          <QAScore type="answer" answer={t('home.answer') as string} score={20} />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {t('home.use')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {t('home.input')}
          <br />
          {t('home.receive')}
          <br />
        </Typography>
        <Typography className={classes.center} color="text.secondary" gutterBottom component="div">
          <TextField size="small" label="question" variant="outlined" />
          <Button variant="contained">Press me</Button>
        </Typography>
        <Typography className={classes.center} sx={{ fontSize: 22, marginTop: 4, fontWeight: 700 }} gutterBottom>
          {t('home.about')}
        </Typography>
        <Typography className={classes.center} gutterBottom>
          <Button onClick={() => routerHandler('https://github.com/Plumbiu')} variant="contained" size="small">Github</Button>
          <Button onClick={() => routerHandler('https://github.com/Plumbiu/nextjs_tensorflow')} variant="outlined" size="small">{t('home.repo')}</Button>
        </Typography>
        <Typography variant="body2" component="div">
        </Typography>
      </CardContent>
      <CardActions className={classes.center}>
        <Typography variant="body2">
          {t('home.based')}
        </Typography>
        <Button variant="outlined" onClick={() => routerHandler('https://github.com/tensorflow/tfjs-models')} size="small">{t('home.source')}</Button>
      </CardActions>
    </Card>
  )
}
