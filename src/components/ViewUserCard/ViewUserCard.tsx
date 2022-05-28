import { InputLabel, Input, FormHelperText, Menu, MenuItem, Divider, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { StyledCard, StyledFormControl, DeleteButton, BackButton } from './styles';

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  status: string;
};

const genderOptions = ['Male', 'Female'];
const statusOptions = ['Active', 'Inactive'];

const ViewUserCard: any = () => {
  const [user, setUser] = useState<any>(null);
  const params = useParams();
  let navigate = useNavigate();

  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [anchorElGender, setAnchorElGender] = useState(null);
  const [anchorElStatus, setAnchorElStatus] = useState(null);
  const openGender = Boolean(anchorElGender);
  const openStatus = Boolean(anchorElStatus);

  useEffect(() => {
    fetch(`https://gorest.co.in/public/v2/users/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 35fbde49d5eb4a5a443446e7ba864d71ed3969a1ee48247811f6733ebe664c93'
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
        setGender(result.gender.replace(/^./, result.gender[0].toUpperCase()));
        setStatus(result.status.replace(/^./, result.status[0].toUpperCase()));
        setEmail(result.email);
        let names = result.name.split(' ');
        setFirstName(names[0]);
        setLastName(names[1]);
      })
      .catch((err) => console.log('error'));
  }, [params.id]);

  const handleGenderClick = (event: any): any => {
    setAnchorElGender(event.currentTarget);
  };
  const handleStatusClick = (event: any): any => {
    setAnchorElStatus(event.currentTarget);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit = (e: any) => {
    fetch(`https://gorest.co.in/public/v2/users/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 35fbde49d5eb4a5a443446e7ba864d71ed3969a1ee48247811f6733ebe664c93'
      },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`,
        email: email,
        gender: gender,
        status: status
      })
    })
      .then((res) => res.json())
      .then((result) => {
        alert('User Updated');
        console.log('Submit Results', result);
      })
      .catch((err) => console.log('error'));
  };

  const removeUser = () => {
    fetch(`https://gorest.co.in/public/v2/users/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 35fbde49d5eb4a5a443446e7ba864d71ed3969a1ee48247811f6733ebe664c93'
      }
    })
      .then((res) => res.text())
      .then((result) => {
        alert('User Deleted');
        navigate(`/dashboard`);
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
      <BackButton
        variant="contained"
        onClick={() => {
          navigate(`/dashboard`);
        }}
      >
        Back to Dashboard
      </BackButton>
      <StyledCard sx={{ maxWidth: 345 }}>
        <Typography variant="h3" component="div" gutterBottom>
          Update User
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography paddingBottom={'2em'} variant="subtitle2" gutterBottom component="div">
            Please do not enter personal information
          </Typography>
          <StyledFormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              placeholder="Enter Email"
              aria-describedby="my-helper-text"
              {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
              value={email ?? ''}
              onChange={(e) => setEmail(e.target.value)}
            />
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel htmlFor="first-name">First Name</InputLabel>
            <Input
              id="first-name"
              placeholder="Enter First Name"
              {...register('firstName', { required: true, max: 16, min: 2 })}
              value={firstName ?? ''}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel htmlFor="last-name">last Name</InputLabel>
            <Input id="last-name" placeholder="Enter Last Name" {...register('lastName', { required: true, max: 16, min: 2 })} value={lastName ?? ''} onChange={(e) => setLastName(e.target.value)} />
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
          <StyledFormControl>
            <Button variant="contained" type="submit">
              Update User
            </Button>
          </StyledFormControl>
        </form>
        <DeleteButton
          variant="contained"
          onClick={() => {
            removeUser();
          }}
        >
          Delete User
        </DeleteButton>
      </StyledCard>
    </div>
  );
};

export default ViewUserCard;
