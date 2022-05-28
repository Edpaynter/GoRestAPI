import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import CreateUserCard from '../CreateUserCard';
import ViewUserCard from '../ViewUserCard';
import UserTable from '../UserTable';

interface DashboardProps {}

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  status: string;
};

const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  const [card, setCard] = useState('');
  return (
    <div>
      <Stack>
        <Button color="success" onClick={() => setCard('create')} variant="contained">
          Create User
        </Button>
      </Stack>
      {card === 'create' && <CreateUserCard />}
      <UserTable />
    </div>
  );
};

export default Dashboard;
