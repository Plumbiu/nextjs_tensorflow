import React, { Fragment, useId, useState } from 'react'
import { matMul } from '@tensorflow/tfjs'
import { loadQnA } from '@tensorflow-models/universal-sentence-encoder'
import { TextField, Button } from '@mui/material'
import classes from '@/styles/chat.module.css'
import Loading from '@/components/Loading'
import type { TQa, IIoScore } from '@/types'
import QAScore from '@/components/QAScore'

const initialIoScore: IIoScore = {
  queries: ['How are you feeling today?'],
  responses: ['Beijing is the capital of China.', 'good.'],
  scores: new Float32Array([6.837286472320557, 9.737372398376465]),
}

export default function qa() {
  const [ioScores, setIoScores] = useState<IIoScore[]>([initialIoScore])
  const [ioScore, setIoScore] = useState({ queries: [''], responses: [''] })
  const [loading, setLoading] = useState(false)
  async function handler() {
    try {
      setLoading(true)
      const model = await loadQnA()
      const formatedIoScore = { ...ioScore, responses: ioScore.responses[0].split(';') }
      const embeddings = model.embed(formatedIoScore)
      const scores = matMul(embeddings['queryEmbedding'], embeddings['responseEmbedding'], false,true).dataSync()
      setIoScores([...ioScores, { ...formatedIoScore, scores }])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  function responseHandler(e: TQa) {
    setIoScore({ ...ioScore, responses: [e.target.value] })
  }
  function queriesHandler(e: TQa) {
    setIoScore({ ...ioScore, queries: [e.target.value] })
  }
  return (
    <div className={classes.container}>
      {loading ? <Loading /> : (
        ioScores.map(item => (
          <Fragment key={item.queries[0]+item.responses[0]}>
            <QAScore type='question' question={item.queries[0]} />
            {item.responses.map((rItem, rIndex) =>  <QAScore key={rItem} type='answer' answer={rItem} score={item.scores[rIndex]} />)}
          </Fragment>
        ))
      )}
      <div className={classes.userInput}>
        <TextField
          onChange={queriesHandler}
          value={ioScore.queries[0]}
          size="small"
          label="问题"
          variant="outlined"
        />
        <TextField
          onChange={responseHandler}
          value={ioScore.responses[0]}
          size="small"
          label="回答"
          variant="outlined"
        />
        <Button
          disabled={!(ioScore.queries[0] && ioScore.responses[0])}
          onClick={handler}
          variant="contained"
        >
          发送
        </Button>
      </div>
    </div>
  )
}
