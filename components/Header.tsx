import React from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material'
import ToolbarMenu from './ToolbarMenu'
import { useRouter } from 'next/router'

interface IRouterMap {
  [props: string]: string
}

export default function Header() {
  const routerMap: IRouterMap = {
    '/qa': 'U ask me to answer',
    '/sentence': 'Reading comprehension',
    '/': ''
  }
  const router = useRouter()
  function backHome() {
    router.push('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <ToolbarMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {routerMap[router.pathname]}
          </Typography>
          <Button onClick={backHome} color="inherit">Home</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
