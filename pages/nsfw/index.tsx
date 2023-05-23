import React, { useRef, useState } from 'react'
import classes from './nfsw.module.css'
import * as nsfw from 'nsfwjs'
import {
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

export default function nfsw() {
  const iptRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [imgSrc, setImgSrc] = useState('')
  const [rows, setRows] = useState([
    createData('Drawing', '0%'),
    createData('Hentai', '0%'),
    createData('Neutral', '0%'),
    createData('Porn', '0%'),
    createData('Sexy', '0%'),
  ])
  const [loading, setLoading] = useState(false)

  async function showImg() {
    setLoading(true)
    if (!iptRef.current || !iptRef.current.files) return
    const file = iptRef.current.files[0]
    setImgSrc(window.URL.createObjectURL(file))
    try {
      const model = await nsfw.load()
      if (!imgRef.current) return
      const predictions = await model.classify(imgRef.current)
      const formatedPredictions = predictions.map(item => {
        return createData(
          item.className,
          `${(item.probability * 100).toFixed(2)}%`
        )
      })
      setRows(formatedPredictions)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }
  function createData(name: string, probability: string) {
    return { name, probability }
  }

  return (
    <div className={classes.container}>
      <div style={{flex: '40%'}}>
        {!imgSrc ? (
          <Skeleton
            style={{height: 'auto'}}
            className={classes.skeleton}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <img
            className={classes.demoImg}
            ref={imgRef}
            src={imgSrc}
            alt="image"
          />
        )}
        <div className={classes.iptContainer}>
          <input
            hidden
            title=""
            ref={iptRef}
            onChange={showImg}
            type="file"
            accept="image/png,image/jpg"
          />
          <Button
            sx={{ mb: 2 }}
            variant="contained"
            onClick={() => iptRef.current?.click()}
          >
            上传文件
          </Button>
        </div>
      </div>
      <div style={{flex: '60%'}}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number } }) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <TableContainer component={Paper}>
          <Table aria-label="nsfw table">
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
      </div>
    </div>
  )
}
