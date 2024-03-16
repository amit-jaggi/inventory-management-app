import React, { useState } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Chip,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import { FONTS } from '../utils/styles';
import {
  EditRounded,
  VisibilityOffRounded,
  VisibilityRounded,
  DeleteRounded,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { disableProduct, enableProduct, deleteProduct } from '../redux/actions/actions';
import EditDialog from './EditDialog';

const ProductTable = () => {
  const [editDialog, setEditDialog] = useState({
    open: false,
    data: null,
  });

  const { view } = useSelector(state => state.viewReducer);
  const { data } = useSelector(state => state.fetchDataReducer);
  
  const dispatch = useDispatch();

  const handleProduct = (productID, type) => {
    if (type === 'disable') {
      dispatch(disableProduct(productID));
    }
    else if (type === 'enable') {
      dispatch(enableProduct(productID));
    }
    else {
      dispatch(deleteProduct(productID ));
    }
  };

  return (
  <>
    <EditDialog
      open={editDialog.open}
      handleClose={() =>
        setEditDialog((prev) => ({
          ...prev,
          open: !editDialog.open,
        }))
      }
      data={editDialog.data}
    />
    <Box
      sx={{
        // border: '1px solid red',
        width: '100%',
        height: '100%',
        px: '40px',
        py: '10px',
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left"><HeadingStyle heading={'Name'} /></TableCell>
              <TableCell align="left"><HeadingStyle heading={'Category'} /></TableCell>
              <TableCell align="left"><HeadingStyle heading={'Price'} /></TableCell>
              <TableCell align="left"><HeadingStyle heading={'Quantity'} /></TableCell>
              <TableCell align="left"><HeadingStyle heading={'Value'} /></TableCell>
              <TableCell align="left"><HeadingStyle heading={'Action'} /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} sx={{ minHeight: '20px' }}>
                <TableCell align="left">
                  <BodyStyle body={row.name} isDisable={row.isDisable} />
                </TableCell>
                <TableCell align="left">
                  <BodyStyle body={row.category} isDisable={row.isDisable} />
                </TableCell>
                <TableCell align="center">
                  <BodyStyle body={row.price} type={'number'} isDisable={row.isDisable} />
                </TableCell>
                <TableCell align="center">
                  <BodyStyle body={row.quantity} isDisable={row.isDisable} />
                </TableCell>
                <TableCell align="center">
                  <BodyStyle body={row.value} type={'number'} isDisable={row.isDisable} />
                </TableCell>
                <TableCell align="left">
                  <Box
                    sx={{
                      // border: '1px solid red',
                      width: '60%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Tooltip title="Edit">
                      <IconButton
                        children={<EditRounded
                          sx={{
                            fontSize: '17px',
                            color: view ? 'lightgrey' : 'lightGreen',
                          }}
                        />}
                        disabled={view}
                      onClick={() =>
                        setEditDialog((prev) => ({
                          ...prev,
                          open: true,
                          data: row,
                        }))}
                      />
                    </Tooltip>
                    <Tooltip title={row.isDisable ? "Enable" : 'Disable'}>
                      <IconButton
                        children={
                          row.isDisable
                            ? <VisibilityOffRounded
                              sx={{
                                fontSize: '17px',
                                color: view ? 'lightgrey' : '#b79fc4',
                              }}
                            />
                            : <VisibilityRounded
                              sx={{
                                fontSize: '17px',
                                color: view ? 'lightgrey' : '#b79fc4',
                              }}
                            />
                        }
                        disabled={view}
                        onClick={
                          row.isDisable
                            ? () => handleProduct(row.id, 'enable')
                            : () => handleProduct(row.id, 'disable')
                        }
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        children={<DeleteRounded
                          sx={{
                            fontSize: '17px',
                            color: view ? 'lightgrey' : 'red',
                          }}
                        />}
                        disabled={view}
                        onClick={() => handleProduct(row.id, 'delete')}
                      />
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </>
  )
}

const HeadingStyle = ({ heading }) => {
  return (
    <Chip
      label={heading}
      sx={{
        ...FONTS.semiBold,
        color: 'yellow',
        backgroundColor: '#4c4d4c',
        borderRadius: '10px',
        padding: '2px',
        letterSpacing: '0.5px',
        cursor: 'default',
      }}
    />
  )
}

const BodyStyle = ({ body, type, isDisable }) => {
  return (
    <Typography
      sx={{
        ...FONTS.medium,
        fontSize: '14px',
        letterSpacing: '0.5px',
        cursor: 'default',
        color: isDisable ? 'lightgrey' : 'black'
      }}
    >{type === 'number' ? '$' : ''}{body}</Typography>
  )
}

export default ProductTable