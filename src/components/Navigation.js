import React from 'react';
import { Box, Typography, Switch, Divider, Tooltip, IconButton } from '@mui/material';
import { LogoutRounded } from '@mui/icons-material';
import { FONTS } from '../utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { changeViews } from '../redux/actions/actions';

const Navigation = () => {
  const { view } = useSelector(state => state.viewReducer);

  const dispatch = useDispatch();

  const handleView = () => dispatch(changeViews(view));

  return (
    <Box
      sx={{
        borderBottom: '0.2px solid #b3bab5',
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Typography
        sx={{
          ...FONTS.medium,
          fontSize: '12px',
          cursor: 'default',
        }}
      >admin</Typography>

      <Tooltip title={`Switch to ${ view ? 'admin': 'user'}`}>
        <Switch
          sx={{
            mx: '5px',
          }}
          checked={view}
          onChange={handleView}
        />
      </Tooltip>
      <Typography
        sx={{
          ...FONTS.medium,
          fontSize: '12px',
          cursor: 'default',
        }}
      >user</Typography>
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          borderColor: '#808080',
          ml: '30px',
        }}
      />
      <Tooltip title="LogOut">
        <IconButton
          children={<LogoutRounded
            sx={{
              fontSize: '24px',
              color: 'white',
            }}
          />}
          sx={{ mx: '10px' }}
        />
      </Tooltip>
    </Box>
  )
}

export default Navigation;