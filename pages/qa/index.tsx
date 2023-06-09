import React, { Fragment, useState } from 'react'
import * as qna from '@tensorflow-models/qna'
import { TextField, Button, Backdrop, CircularProgress } from '@mui/material'
import classes from '@/styles/chat.module.css'
import initialData from './initalData.json'
import type { TQa, IQnA, TLocale } from '@/types'
import AnswerAlert from '@/components/AnswerAlert'
import QAScore from '@/components/QAScore'
import Head from 'next/head'
import i18n from '@/assets/i18n/title.json'
import { useRouter } from 'next/router'

export default function qa() {
  const locale = useRouter().locale as TLocale
  const [question, setQuestion] = useState('')
  const [passage, setPassage] = useState('')
  const [values, setValues] = useState<IQnA[]>([initialData])
  const [loading, setLoading] = useState(false)
  function questionHandler(e: TQa) {
    setQuestion(e.target.value)
  }
  function passageHandler(e: TQa) {
    setPassage(e.target.value)
  }
  async function answerHandler() {
    try {
      setLoading(true)
      const model = await qna.load()
      const tfAnswers = await model?.findAnswers(question, passage)
      if (!tfAnswers.length) throw new Error('返回值为空，请重新填写描述和问题')
      setValues([...values, {
        q: question,
        p: passage,
        answer: tfAnswers,
        error: false,
      }])
    } catch (err) {
      setValues([...values, { error: true }])
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={classes.container}>
      <Head>
        <title>{i18n[locale].sentence}</title>
        <meta name="description" content={i18n[locale].sentnceDescription} />
      </Head>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number } }) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {values.map(item => (
        <Fragment key={JSON.stringify(item.q) + JSON.stringify(item.q)}>
          {item.error ? (
            <AnswerAlert msg='服务器返回了一个空的数组' strongMsg='请修改描述和问题!' />
          ) : (
            <>
              <QAScore question={item.p || ''} type='question'/>
              <QAScore question={item.q || ''} type='question'/>
              {item.answer && item.answer.map(sub => <QAScore key={sub.text + sub.score} answer={sub || ''} type='answer' />)}
            </>
          )}
        </Fragment>
        ))
      }
      <div className={classes.userInput}>
        <TextField
          onChange={passageHandler}
          size="small"
          value={passage}
          label="描述"
          variant="outlined"
        />
        <TextField
          onChange={questionHandler}
          size="small"
          value={question}
          label="问题"
          variant="outlined"
        />
        <Button
          disabled={!passage || !question}
          variant="contained"
          onClick={answerHandler}
        >
          发送
        </Button>
      </div>
    </div>
  )
}
