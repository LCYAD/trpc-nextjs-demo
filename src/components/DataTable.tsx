import { Person } from '@/types/data';
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

export default function DataTable() {
  const rows: Person[] = usePersonState((state) => state.persons) ?? [];
  const removePerson = usePersonState((state) => state.removePerson);
  const clearAll = usePersonState((state) => state.clearAll);
  const handleClearAll = () => {
    clearAll();
  };

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
                onClick={handleClearAll}
              >
                Clear All
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={row.name}
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
                  onClick={removePerson(idx)}
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
