import Stack from '@mui/system/Stack';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import styled from '@mui/system/styled';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { usePersonState } from '@/hooks/person';
import { PersonSchema } from '@/schemas/data';
import { z } from 'zod';

const Item = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const InputFieldName = styled('span')({
  minWidth: 100,
});

export default function DataInput() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(1);
  const AgeSchema = z.number().gte(1).lte(120);
  const isValidAge = AgeSchema.safeParse(age).success;

  const addPerson = usePersonState((state) => state.addPerson);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(e.target.value, 10));
  };
  const handleAddRow = () => {
    const person = PersonSchema.safeParse({ name, age });
    if (person.success) {
      addPerson(person.data);
      setName('');
      setAge(1);
    }
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" component="h6">
        Input
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Stack spacing={3}>
        <Item>
          <InputFieldName>Name</InputFieldName>
          <TextField
            required
            id="name"
            variant="outlined"
            size="small"
            onChange={handleNameChange}
            value={name}
          />
        </Item>
        <Item>
          <InputFieldName>Age</InputFieldName>
          <TextField
            required
            type="number"
            id="age"
            variant="outlined"
            size="small"
            onChange={handleAgeChange}
            value={age}
            error={!isValidAge}
            helperText={
              !isValidAge ? 'Need to be a number between 1 and 120' : ''
            }
          />
        </Item>
        <Item
          sx={{ width: '100%', padding: '0 25%', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            sx={{
              width: 150,
              padding: '5px 0px',
            }}
            onClick={handleAddRow}
          >
            Add Row
          </Button>
        </Item>
      </Stack>
    </Box>
  );
}
