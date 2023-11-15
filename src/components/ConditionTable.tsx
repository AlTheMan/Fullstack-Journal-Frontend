import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

interface ConditionListProps {
  conditions: Condition[];
}

const ConditionTable: React.FC<ConditionListProps> = ({ conditions }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, border: 0 }}
          size="medium"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Body Site</TableCell>
              <TableCell>Clinical Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Evidence</TableCell>
              <TableCell>Verification Status</TableCell>
              <TableCell>Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conditions.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.bodySite}
                </TableCell>
                <TableCell>{row.clinicalStatus}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.evidence}</TableCell>
                <TableCell>{row.verificationStatus}</TableCell>
                <TableCell>{row.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ConditionTable;
