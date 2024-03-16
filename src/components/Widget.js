import React from 'react';
import { Box, Typography } from '@mui/material';
import { FONTS } from '../utils/styles';
import { ShoppingCartRounded, CurrencyExchangeRounded, RemoveShoppingCartRounded, CategoryRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Widget = () => {
  const { data } = useSelector(state => state.fetchDataReducer);

  const WIDGETS = [
    {
      icon: <ShoppingCartRounded sx={{ fontSize: '40px' }} />,
      title: 'Total product',
      value: data.filter(el => el.isDisable !== true).length || 0,
    },
    {
      icon: <CurrencyExchangeRounded sx={{ fontSize: '40px' }} />,
      title: 'Total store value',
      value: data.filter(el => el.isDisable !== true).reduce((acc, curr) => acc + curr.value, 0) || 0,
    },
    {
      icon: <RemoveShoppingCartRounded sx={{ fontSize: '40px' }} />,
      title: 'Out of Stocks',
      value: data.filter(el => el.isDisable === true).length || 0,
    },
    {
      icon: <CategoryRounded sx={{ fontSize: '40px' }} />,
      title: 'No. of category',
      value: [...new Set(data.filter(el => el.isDisable === false).map(el => el.category))].length || 0,
    }
  ]

  return (
    <Box
      sx={{
        width: '100%',
        padding: '10px',
      }}
    >
      <Typography
        sx={{
          ...FONTS.medium,
          fontSize: "24px",
          mb: '10px',
          ml: '30px',
        }}
      >Inventory Stats</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        {
          WIDGETS.map((widget, index) => <Box
            key={index}
            sx={{
              backgroundColor: '#334f39',
              width: '300px',
              height: '120px',
              borderRadius: '10px',
              display: 'flex',
            }}
          >
            <Box
              sx={{
                width: "30%",
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {widget.icon}
            </Box>
            <Box
              sx={{
                width: "70%",
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                justifyContent: 'space-evenly',
                pl: '10px',
              }}
            >
              <Typography sx={{ ...FONTS.medium, fontSize: '18px', cursor: 'default' }}>{widget.title}</Typography>
              <Typography sx={{ ...FONTS.medium, fontSize: '34px', cursor: 'default' }}>{widget.value}</Typography>
            </Box>
          </Box>)
        }
      </Box>
    </Box>
  )
}

export default Widget;