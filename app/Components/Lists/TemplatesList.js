import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";

Lista.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.object),
  del: PropTypes.func,
};

export default function Lista({ templates, del }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Template</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">N° Widgets</TableCell>
            <TableCell align="right">Eliminar&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((p, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell component="th" scope="row">
                {p.name}
              </TableCell>
              <TableCell align="right">{p.widgets.length}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => del(index)}>
                  <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
