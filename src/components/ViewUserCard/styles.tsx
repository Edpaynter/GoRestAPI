import styled from 'styled-components';
import { CardMedia, FormControl, Button, Card } from '@mui/material';

export const StyledCard = styled(Card)`
  margin: auto;
  margin-top: 2em;
  padding: 5em;
`;

export const StyledFormControl = styled(FormControl)`
  padding: 1em;
  width: 100%;
`;

export const DeleteButton = styled(Button)`
  background: red;
  width: 100%;
  margin: 1em;
`;

export const BackButton = styled(Button)`
  background: orange;
  margin: 1em;
`;
