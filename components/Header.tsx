import React, { useState } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import ToolbarMenu from './ToolbarMenu'
import { useRouter } from 'next/router'
import { IRouterMap, TLocale } from '@/types'
import i18n from '@/assets/i18n/title.json'

export default function Header() {
  const router = useRouter()
  const [locale, setLocale] = useState<TLocale>(router.locale as TLocale)
  const routerMap: IRouterMap = {
    '/qa': i18n[locale].qna,
    '/sentence': i18n[locale].sentence,
    '/nsfw': i18n[locale].nsfw,
    '/': '',
  }
  function backHome() {
    router.push('/')
  }
  function handleChange(_: any, { props }: any) {
    setLocale(props.value)
    router.push(router.pathname, router.asPath, {
      locale: props.value
    })
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='inherit' position="fixed">
        <Toolbar>
          <ToolbarMenu />
          {routerMap[router.pathname] === '' ? (
            <div style={{flexGrow: 1, height: '45px'}}>
              <FormControl sx={{ height:'100%' }}>
                <InputLabel id="language-simple-select-label">Language</InputLabel>
                <Select
                  sx={{flexGrow: 1, height: '80%'}}
                  labelId="language-simple-select-label"
                  id="language-simple-select"
                  value={locale}
                  label="locale"
                  onChange={handleChange}
                >
                  <MenuItem value='en-US'>Engilish</MenuItem>
                  <MenuItem value='zh-CN'>简体中文</MenuItem>
                </Select>
              </FormControl>
            </div>
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
