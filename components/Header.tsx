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
import { useTranslation } from 'react-i18next'

interface IRouterMap {
  [props: string]: string
}

export default function Header() {
  const [switchStatus, setSwitchStatus] = useState(false)
  const { t, i18n } = useTranslation()
  const routerMap: IRouterMap = {
    '/qa': 'U ask me to answer',
    '/sentence': 'Reading comprehension',
    '/': '',
  }
  const router = useRouter()
  function backHome() {
    router.push('/')
  }
  function switchHandler() {
    setSwitchStatus(!switchStatus)
    if (switchStatus) {
      i18n.changeLanguage('en')
    } else {
      i18n.changeLanguage('zh')
    }
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
                value={switchStatus}
                onChange={switchHandler}
                defaultChecked
                inputProps={{ 'aria-label': 'ant design' }}
              />
              <Typography>en-US</Typography>
            </Stack>
          ) : (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {routerMap[router.pathname]}
            </Typography>
          )}

          <Button onClick={backHome} color="inherit">
            {t('bar.home')}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
