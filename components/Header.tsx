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
    '/qa': '你问我答',
    '/sentence': '阅读理解',
    '/': '首页'
  }
  const router = useRouter()
  console.log(router);
  
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
