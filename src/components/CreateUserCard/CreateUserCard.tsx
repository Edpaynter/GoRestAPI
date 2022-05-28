import { FormControl, Input, InputLabel, Button, Menu, MenuItem, Divider, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { StyledCard, StyledFormControl } from './styles';

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  status: string;
};

const genderOptions = ['Male', 'Female'];
const statusOptions = ['Active', 'Inactive'];

const CreateUserCard: any = () => {
  const [anchorElGender, setAnchorElGender] = useState(null);
  const [anchorElStatus, setAnchorElStatus] = useState(null);
  const openGender = Boolean(anchorElGender);
  const openStatus = Boolean(anchorElStatus);
  const navigate = useNavigate();

  const handleGenderClick = (event: any): any => {
    console.log('handleClickEvent', event);
    setAnchorElGender(event.currentTarget);
  };
  const handleStatusClick = (event: any): any => {
    console.log('handleClickEvent', event);
    setAnchorElStatus(event.currentTarget);
  };
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit = (e: any) => {
    console.log(e);
    fetch('https://gorest.co.in/public/v2/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 35fbde49d5eb4a5a443446e7ba864d71ed3969a1ee48247811f6733ebe664c93'
      },
      body: JSON.stringify({
        name: `${e.firstName} ${e.lastName}`,
        email: e.email,
        gender: gender,
        status: status
      })
    })
      .then((res) => res.json())
      .then((result) => {
        alert('User Created');
        //Ran Out of Time
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((err) => console.log('error'));
  };

  const handleGender = (gender: any): any => {
    setAnchorElGender(null);
    setGender(gender);
  };

  const handleStatus = (status: any): any => {
    setAnchorElStatus(null);
    setStatus(status);
  };

  const handleStatusClose = () => {
    setAnchorElStatus(null);
  };

  const handleGenderClose = () => {
    setAnchorElGender(null);
  };

  return (
    <div>
      <StyledCard sx={{ maxWidth: 345 }}>
        <Typography variant="h3" component="div" gutterBottom>
          Create User
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography paddingBottom={'2em'} variant="subtitle2" gutterBottom component="div">
            Please do not enter personal information
          </Typography>
          <StyledFormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input id="email" placeholder="Enter Email" aria-describedby="my-helper-text" {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })} />
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel htmlFor="first-name">First Name</InputLabel>
            <Input id="first-name" placeholder="Enter First Name" {...register('firstName', { required: true, max: 16, min: 2 })} />
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <Input id="last-name" placeholder="Enter Last Name" {...register('lastName', { required: true, max: 16, min: 2 })} />
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel htmlFor="gender-button">Gender</InputLabel>
            <Input
              id="gender-button"
              aria-controls={openGender ? 'gender' : undefined}
              aria-haspopup="true"
              aria-expanded={openGender ? 'true' : undefined}
              value={gender}
              onClick={handleGenderClick}
            />

            <Menu id="gender" MenuListProps={{ 'aria-labelledby': 'gender-button' }} anchorEl={anchorElGender} open={openGender} onClose={handleGenderClose}>
              {genderOptions.map((gender: string) => {
                return (
                  <span key={`gender-${gender}`}>
                    <MenuItem onClick={() => handleGender(gender)}>{gender}</MenuItem>
                    <Divider />
                  </span>
                );
              })}
            </Menu>
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel htmlFor="status-button">Status</InputLabel>
            <Input
              id="status-button"
              aria-controls={openStatus ? 'status' : undefined}
              aria-haspopup="true"
              aria-expanded={openStatus ? 'true' : undefined}
              value={status}
              onClick={handleStatusClick}
            />

            <Menu id="status" MenuListProps={{ 'aria-labelledby': 'status-button' }} anchorEl={anchorElStatus} open={openStatus} onClose={handleStatusClose}>
              {statusOptions.map((status: string) => {
                return (
                  <span key={`status-${status}`}>
                    <MenuItem onClick={() => handleStatus(status)}>{status}</MenuItem>
                    <Divider />
                  </span>
                );
              })}
            </Menu>
          </StyledFormControl>
          <FormControl>
            <Button color="success" variant="contained" type="submit">
              Create User
            </Button>
          </FormControl>
        </form>
      </StyledCard>
    </div>
  );
};

export default CreateUserCard;
