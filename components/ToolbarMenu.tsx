import { useState, MouseEvent } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'
import { IconButton } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'
import i18n from '@/assets/i18n/title.json'
import { TLocale } from '@/types'

export default function SentenceMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const open = Boolean(anchorEl)
  const locale = router.locale as TLocale
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (path: string) => {
    router.push(path)
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ mr: 2 }}
      >
        <MenuOutlined />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleClose('qa')}>{i18n[locale].qna.toUpperCase()}</MenuItem>
        <MenuItem onClick={() => handleClose('sentence')}>{i18n[locale].sentence.toUpperCase()}</MenuItem>
        <MenuItem onClick={() => handleClose('nsfw')}>{i18n[locale].nsfw.toUpperCase()}</MenuItem>
        <MenuItem onClick={() => handleClose('nsfw')}>....</MenuItem>
      </Menu>
    </div>
  )
}
