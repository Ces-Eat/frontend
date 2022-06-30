import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StorageIcon from "@mui/icons-material/Storage";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { IAuthAction, useStore } from "src/utils/hooks";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import { useRouter } from "next/router";
import axios from "axios";

const NavMenu: React.FC = () => {
  const {
    setAuth,
    auth: {
      user: {
        // @ts-ignore
        role: { id },
      },
    },
  } = useStore();
  const { createNotification } = useNotificationCenter();
  const router = useRouter();

  const handleLogout = () => {
    axios
      .delete(`${process.env.API_AUTH}/me`, { withCredentials: true })
      .then(() => {
        setAuth({
          payload: null,
          type: IAuthAction.LOGOUT,
        });
        router.push("/");
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
      });
  };

  return (
    <List>
      <Link href="/account">
        <ListItem>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText>Mon compte</ListItemText>
        </ListItem>
      </Link>
      {id === 4 && (
        <>
          <Link href="/clients">
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText>Clients</ListItemText>
            </ListItem>
          </Link>
          <Link href="/stats">
            <ListItem>
              <ListItemIcon>
                <QueryStatsIcon />
              </ListItemIcon>
              <ListItemText>Statistiques</ListItemText>
            </ListItem>
          </Link>
        </>
      )}
      {id === 5 && (
        <>
          <Link href="/ms">
            <ListItem>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText>Micro Services</ListItemText>
            </ListItem>
          </Link>
          <Link href="/logs">
            <ListItem>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText>Logs</ListItemText>
            </ListItem>
          </Link>
        </>
      )}
      <ListItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon color="error" />
        </ListItemIcon>
        <ListItemText disableTypography>
          <Typography color="error">Deconnexion</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};
export default NavMenu;
