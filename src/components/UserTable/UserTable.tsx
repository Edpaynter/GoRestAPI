import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteButton } from './styles';

const UserTable = () => {
  const [tableData, setTableData] = useState([]);
  let navigate = useNavigate();

  const viewUser = (id: number) => {
    navigate(`/user/${id}`);
  };
  const removeUser = (id: number) => {
    fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 35fbde49d5eb4a5a443446e7ba864d71ed3969a1ee48247811f6733ebe664c93'
      }
    })
      .then((res) => res.text())
      .then((result) => {
        alert('User Deleted');
        getUsers();
      })
      .catch((err) => console.log('error'));
  };
  const getUsers = () => {
    fetch('https://gorest.co.in/public/v2/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 35fbde49d5eb4a5a443446e7ba864d71ed3969a1ee48247811f6733ebe664c93'
      }
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('GET Request', result);
        setTableData(result);
      })
      .catch((err) => console.log('error'));
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID: </TableCell>
              <TableCell>Name </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: any) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell scope="row">{row.id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => viewUser(row.id)} placeholder="View">
                    View User
                  </Button>
                </TableCell>
                <TableCell>
                  <DeleteButton variant="contained" onClick={() => removeUser(row.id)} placeholder="Delete">
                    Delete
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
