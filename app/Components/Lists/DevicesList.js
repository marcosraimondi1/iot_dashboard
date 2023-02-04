import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Switch from "@mui/material/Switch";
import StorageIcon from "@mui/icons-material/Storage";

Lista.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.object),
  refreshPassword: PropTypes.func,
  updateSaverRuleStatus: PropTypes.func,
  del: PropTypes.func,
};

export default function Lista({
  devices,
  refreshPassword,
  updateSaverRuleStatus,
  del,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Device</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Id&nbsp;</TableCell>
            <TableCell align="center">Password</TableCell>
            <TableCell align="center">Template Name&nbsp;</TableCell>
            <TableCell align="center">Database&nbsp;</TableCell>
            <TableCell align="right">Eliminar&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" align="left" scope="row">
                {index}
              </TableCell>

              <TableCell component="th" align="center" scope="row">
                {device.name}
              </TableCell>

              <TableCell align="center">{device.dId}</TableCell>

              <TableCell align="center">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <p>{device.password}</p>
                  <IconButton
                    onClick={() => {
                      refreshPassword(device.dId);
                    }}
                  >
                    <RefreshIcon color="info" />
                  </IconButton>
                </div>
              </TableCell>

              <TableCell align="center">{device.template.name}</TableCell>

              <TableCell align="center">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <StorageIcon
                    color={device.saverRule?.status ? "success" : "warning"}
                  />
                  <Switch
                    color="success"
                    checked={device.saverRule?.status}
                    onChange={() => updateSaverRuleStatus(device.saverRule)}
                  />
                </div>
              </TableCell>

              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    del(device.dId);
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
