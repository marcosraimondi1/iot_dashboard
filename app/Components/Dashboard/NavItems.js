import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import Link from "next/link";

/**
 * L I S T A   D E   E L E M E N T O S   D E L   D R A W E R
 */

const navItems = [
  { label: "dashboard", route: "/dashboard", icon: "dashboard" },
  { label: "alarms", route: "/dashboard/alarms", icon: "access_alarm" },
  { label: "devices", route: "/dashboard/devices", icon: "device_hub" },
  { label: "templates", route: "/dashboard/templates", icon: "file_copy" },
];

export default function NavItems() {
  return (
    <>
      {navItems.map(({ label, route, icon }) => (
        <Link
          href={route}
          key={route}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton key={route}>
            <ListItemIcon>
              <Icon color="secondary">{icon}</Icon>
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </ListItemButton>
        </Link>
      ))}
    </>
  );
}
