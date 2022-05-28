import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { StyledCard, StyledCardMedia } from './styles';
import lockImg from '../../assets/images/lock-icon.png';
import Input from '@mui/material/Input';
import { useNavigate } from 'react-router-dom';

export interface LoginProps {}

const loginCreds = {
  username: 'username',
  password: 'pass'
};

const Login: React.FunctionComponent<LoginProps> = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const loginNow = ({ ...credentials }) => {
    console.log('Credentials', credentials);
    if (credentials.username === loginCreds.username && credentials.password === loginCreds.password) {
      navigate('/dashboard');
    } else {
      console.log('Credentials do not match');
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginNow(credentials);
  };

  return (
    <StyledCard sx={{ maxWidth: 345 }}>
      <StyledCardMedia component="img" src={lockImg} alt="free lock image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Please Sign
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome to Go REST API.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Input fullWidth name="username" placeholder="Username" type="name" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} value={credentials.username} />
          <Input fullWidth name="password" placeholder="Password" type="password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password} />

          <CardActions>
            <Button fullWidth variant="contained" type="submit" size="small">
              Login
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </StyledCard>
  );
};

export default Login;
