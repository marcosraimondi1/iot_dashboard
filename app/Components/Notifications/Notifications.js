import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import Notification from "./Notification/Notification";

export default function Notifications({ openNotis, setOpenNotis, notifications }) {
  return (
    <Dialog
      open={openNotis}
      onClose={() => setOpenNotis(false)}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Notifications</DialogTitle>
      <DialogContent>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          {notifications?.map((notification, index) => (
            <Notification key={index} notification={notification} />
          ))}

          <hr />
        </List>
      </DialogContent>
    </Dialog>
  );
}
