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
import { IRouterMap, TLocale } from '@/types'
import i18n from '@/assets/i18n/title.json'

export default function Header() {

  const router = useRouter()
  const locale = router.locale as TLocale
  const routerMap: IRouterMap = {
    '/qa': i18n[locale].qa,
    '/sentence': i18n[locale].sentence,
    '/': '',
  }
  function backHome() {
    router.push('/')
  }
  function switchHandler() {
    router.push(router.pathname, router.asPath, {
      locale: locale === 'en-US' ?  'zh-CN' : 'en-US'
    })
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <ToolbarMenu />
          {routerMap[router.pathname] === '' ? (
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
              {routerMap[router.pathname]}
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
