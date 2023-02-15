import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Switch from "@mui/material/Switch";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

Lista.propTypes = {
  alarms: PropTypes.arrayOf(PropTypes.object),
  updateStatusRule: PropTypes.func,
  del: PropTypes.func
};

export default function Lista({ alarms, updateStatusRule, del }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Alarm</TableCell>
            <TableCell align="center">Variable</TableCell>
            <TableCell align="center">Condition&nbsp;</TableCell>
            <TableCell align="center">Value</TableCell>
            <TableCell align="center">Trigger Time (min)&nbsp;</TableCell>
            <TableCell align="center">Matches&nbsp;</TableCell>
            <TableCell align="center">Status&nbsp;</TableCell>
            <TableCell align="right">Eliminar&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alarms.map((alarm, index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" align="left" scope="row">
                {index}
              </TableCell>

              <TableCell component="th" align="center" scope="row">
                {alarm.variableFullName}
              </TableCell>

              <TableCell align="center">{alarm.condition}</TableCell>
              <TableCell align="center">{alarm.value}</TableCell>
              <TableCell align="center">{alarm.triggerTime}</TableCell>
              <TableCell align="center">{alarm.counter}</TableCell>

              <TableCell align="center">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly"
                  }}
                >
                  <NotificationsActiveIcon color={alarm.status ? "success" : "warning"} />
                  <Switch
                    color="success"
                    checked={alarm.status}
                    onChange={() => updateStatusRule(alarm)}
                  />
                </div>
              </TableCell>

              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    del(alarm);
                  }}
                >
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
