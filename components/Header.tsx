import React, { useState } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Stack,
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
    '/': '',
  }
  const { push, pathname, asPath, locale } = useRouter()
  function backHome() {
    push('/')
  }
  function switchHandler() {
    const lan = locale === 'en-US' ?  'zh-CN' : 'en-US'
    push(pathname, asPath, {
      locale: lan
    })
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <ToolbarMenu />
          {routerMap[pathname] === '' ? (
            <Stack sx={{flexGrow: 1}} direction="row" spacing={1} alignItems="center">
              <Typography>简体中文</Typography>
              <Switch
                color="default"
                onChange={switchHandler}
                inputProps={{ 'aria-label': 'ant design' }}
              />
              <Typography>English</Typography>
            </Stack>
          ) : (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {routerMap[pathname]}
            </Typography>
          )}

          <Button onClick={backHome} color="inherit">
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
