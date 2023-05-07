import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export default function AnswerAlert(props: { msg: string, strongMsg: string }) {
  return (
    <Alert className='alert' variant="filled" severity="error">
      <AlertTitle>Error</AlertTitle>
      {props.msg} - <strong>{props.strongMsg}!</strong>
    </Alert>
  )
}
