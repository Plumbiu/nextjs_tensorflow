import { CircularProgress } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'

export default function Loading() {
  return (
    ReactDOM.createPortal(
      <div className='circle'>
        <CircularProgress disableShrink />
      </div>,
      document.body
    )
  )
}
