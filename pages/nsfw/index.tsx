import React, { useRef, useState } from 'react'
import classes from './nfsw.module.css'
import * as nsfw from 'nsfwjs'
import { CircularProgress, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export default function nfsw() {
  const iptRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [imgSrc, setImgSrc] = useState('')
  const [rows, setRows] = useState([
    createData('Drawing', '0'),
    createData('Hentai', '0'),
    createData('Neutral', '0'),
    createData('Porn', '0'),
    createData('Sexy', '0'),
  ])
  const [loading, setLoading] = useState(false)

  async function showImg() {
    setLoading(true)
    if (!iptRef.current || !iptRef.current.files) return
    const file = iptRef.current.files[0]
    setImgSrc(() => window.URL.createObjectURL(file))
    try {
      const model = await nsfw.load()
      if(!imgRef.current) return
      const predictions = await model.classify(imgRef.current)
      console.log(predictions)
      const formatedPredictions = predictions.map(item => {
        return createData(item.className, `${(item.probability * 100).toFixed(2)}%`)
      })
      setRows(formatedPredictions)
    } catch(err) { 
    } finally {
      setLoading(false)
    }

  }
  function createData(
    name: string,
    probability: string,
  ) {
    return { name, probability };
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {!imgSrc ? (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <img ref={imgRef} src={imgSrc} alt="image" />
        )}
      </div>
      <div className={classes.iptContainer}>
        <input
          style={{appearance: 'none'}}
          title=''
          ref={iptRef}
          onChange={showImg}
          type="file"
          accept="image/png,image/jpg"
        />
      </div>
      {
        loading ? (
          <div className={classes.loading}>
            <CircularProgress disableShrink />
          </div>
        ): (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>name</TableCell>
                  <TableCell>probities</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.probability}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </div>
  )
}
