import { useState, MouseEvent } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'
import { IconButton } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'

export default function SentenceMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const open = Boolean(anchorEl)
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
        <MenuItem onClick={() => handleClose('qa')}>QnA</MenuItem>
        <MenuItem onClick={() => handleClose('sentence')}>Sentence</MenuItem>
        <MenuItem onClick={() => handleClose('qa')}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
