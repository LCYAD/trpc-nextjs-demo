import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { usePersonState } from '@/hooks/person';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { trpc } from '@/utils/trpc';
import { Person } from '@/schemas/data';

export default function DataTable() {
  const rows = usePersonState((state) => state.persons);
  const updatePersons = usePersonState((state) => state.updatePersons);

  trpc.person.list.useQuery(undefined, {
    onSuccess: (data: Person[]) => {
      updatePersons(data);
    },
  });
  const removePersonMutation = trpc.person.remove.useMutation({
    onSuccess: (data: Person[]) => {
      updatePersons(data);
    },
  });

  const clearAllMutation = trpc.person.clear.useMutation({
    onSuccess: (data: Person[]) => {
      updatePersons(data);
    },
  });

  return (
    <TableContainer component={Paper} sx={{ height: '100% !important' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center" width={200}>
              Age
            </TableCell>
            <TableCell align="center" width={200}>
              <Button
                variant="contained"
                sx={{
                  width: 150,
                  padding: '5px 0px',
                }}
                onClick={() => {
                  clearAllMutation.mutate();
                }}
              >
                Clear All
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.age}</TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    removePersonMutation.mutate(idx);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
