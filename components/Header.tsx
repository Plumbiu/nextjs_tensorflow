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
  const [switchStatus, setSwitchStatus] = useState(false)
  const routerMap: IRouterMap = {
    '/qa': 'U ask me to answer',
    '/sentence': 'Reading comprehension',
    '/': '',
  }
  const { push, pathname, asPath } = useRouter()
  function backHome() {
    push('/')
  }
  function switchHandler() {
    setSwitchStatus(!switchStatus)
    const lan = switchStatus ? 'en-US' : 'zh-CN'
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
                value={switchStatus}
                onChange={switchHandler}
                defaultChecked
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
