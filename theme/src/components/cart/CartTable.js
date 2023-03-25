import React, {useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {IconButton, Button, Typography} from '@material-ui/core';
import {MdDelete} from "react-icons/md";

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.secondary.main,
    // color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  cartTable: {
    minWidth: 600,
    marginBottom: '5px',
  },
  cartRestoreButton: {
    marginLeft: '11px',
  },
});

export default function CartTable({context, i18}) {
  const {inCart} = context;
  const classes = useStyles();
  const [restoreButtonState, setRestoreButtonState] = useState(inCart.find(prod => !prod.inside));

  return (
    <TableContainer component={Paper}>
      <Table className={classes.cartTable} aria-label="cart table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">{i18.name}</StyledTableCell>
            <StyledTableCell align="right">{i18.price},&nbsp;{i18.currency}</StyledTableCell>
            <StyledTableCell align="right">{i18.quantity}</StyledTableCell>
            <StyledTableCell align="right">{i18.sum},&nbsp;{i18.currency}</StyledTableCell>
            <StyledTableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {inCart.map((row, i) => {
              return (row.inside &&
                  <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">{row.sku}</StyledTableCell>
                      <StyledTableCell align="right">{row.title}</StyledTableCell>
                      <StyledTableCell align="right">{row.price}</StyledTableCell>
                      <StyledTableCell align="right">{row.count}</StyledTableCell>
                      <StyledTableCell align="right">{row.count * row.price}</StyledTableCell>
                      <StyledTableCell align="right">
                          <IconButton onClick={e => deleteClickHandle(e, i)}>
                              <MdDelete/>
                          </IconButton>
                      </StyledTableCell>
                  </StyledTableRow>
              );
          })}
          <TableRow>
            <StyledTableCell colSpan={3}/>
            <StyledTableCell align="right">
              <Typography color="inherit" variant="h5">{i18.total}:</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography color="inherit" variant="h5">{totalCost(inCart)}</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <IconButton onClick={e => setAllInsideClickHandle(e, false)}>
                <MdDelete/>
              </IconButton>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button variant="outlined" color="primary">{i18.toPrint}</Button>
      {restoreButtonState &&
        <Button variant="outlined" color="primary" onClick={e=> setAllInsideClickHandle(e, true)} className={classes.cartRestoreButton}>
          {i18.restoreDeleted}
        </Button>
      }
    </TableContainer>
  );
  function deleteClickHandle(e,i) {
    e.preventDefault();
    setRestoreButtonState(true);
    inCart[i].inside = false;
    context.dispatch({inCart});
  }
  function setAllInsideClickHandle(e, inside) {
    e.preventDefault();
    setRestoreButtonState(!inside);
    inCart.forEach((prod) => {prod.inside = inside;});
    context.dispatch({inCart});
  }
}

function totalCost(rows) {
  return rows.reduce((sum, prod) => {
    return prod.inside ? sum + prod.count * prod.price: sum;
  },0);
}