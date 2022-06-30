import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PeopleIcon from "@mui/icons-material/People";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import { IAuthAction, useStore } from "src/utils/hooks";
import { useRouter } from "next/router";
import axios from "axios";

const NavMenu: React.FC = () => {
  const { setAuth } = useStore();
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
      <Link href="/home">
        <ListItem>
          <ListItemIcon>
            <DeliveryDiningIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
      </Link>
      <Link href="/orders">
        <ListItem>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText>Livraisons</ListItemText>
        </ListItem>
      </Link>
      <Link href="/wallets">
        <ListItem>
          <ListItemIcon>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText>Cartes</ListItemText>
        </ListItem>
      </Link>
      <Link href="/refered">
        <ListItem>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText>Parrainage</ListItemText>
        </ListItem>
      </Link>
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
