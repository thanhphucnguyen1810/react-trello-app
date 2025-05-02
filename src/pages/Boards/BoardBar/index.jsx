import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersionAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Trello React"
          // clickable
          onClick={() => {}}
        ></Chip>

        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          // clickable
          onClick={() => {}}
        ></Chip>

        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          // clickable
          onClick={() => {}}
        ></Chip>

        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          // clickable
          onClick={() => {}}
        ></Chip>

        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          // clickable
          onClick={() => {}}
        ></Chip>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
          variant='outlined'
          startIcon={<PersionAddIcon />}
        >
        Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',

            '& .MuiAvatar-root': {
              width: 36,
              height: 36,
              fontSize: 16,
              border: 'none'
            }
          }}
        >
          <Tooltip title="Profile">
            <Avatar
              alt="cat"
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg"
            />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar
              alt="dog"
              src="https://pantado.edu.vn/storage/media/con-vat-yeu-thich_1637118048.jpg"
            />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar
              alt="rabbit"
              src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482784biU/anh-mo-ta.png"
            />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar
              alt="nai"
              src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482784kVo/anh-mo-ta.png"
            />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar
              alt="duct"
              src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482784lHR/anh-mo-ta.png"
            />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar
              alt="ntp"
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg"
            />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar
              alt="cat"
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg"
            />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar
              alt="dog"
              src="https://pantado.edu.vn/storage/media/con-vat-yeu-thich_1637118048.jpg"
            />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar
              alt="rabbit"
              src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482784biU/anh-mo-ta.png"
            />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar
              alt="nai"
              src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482784kVo/anh-mo-ta.png"
            />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar
              alt="duct"
              src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482784lHR/anh-mo-ta.png"
            />
          </Tooltip>
          <Tooltip title="Profile">
            <Avatar
              alt="ntp"
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
