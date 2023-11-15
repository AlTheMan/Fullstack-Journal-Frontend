import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const GenericTable: React.FC<GenericTableProps> = ({ columns, data }) => {
    
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <TableContainer component={Paper} sx={{ maxWidth: '100%', mt: 2, mb: 2 }}>
        <Table sx={{ minWidth: 650, border: 1 }} size="medium" aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {row.values.map((cell, index) => (
                  <TableCell key={`${row.id}-${index}`}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GenericTable;
