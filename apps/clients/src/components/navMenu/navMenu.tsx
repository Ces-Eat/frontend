import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RoomIcon from "@mui/icons-material/Room";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CodeIcon from "@mui/icons-material/Code";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Link from "next/link";
import { IAuthAction, useStore } from "src/utils/hooks";
import { useRouter } from "next/router";
import axios from "axios";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";

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
      <Link href="/restaurants">
        <ListItem>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText>Restaurants</ListItemText>
        </ListItem>
      </Link>
      <Link href="/orders">
        <ListItem>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText>Commandes</ListItemText>
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
      <Link href="/addresses">
        <ListItem>
          <ListItemIcon>
            <RoomIcon />
          </ListItemIcon>
          <ListItemText>Adresses</ListItemText>
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
      <Link href="/developper">
        <ListItem>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText>Package Ces&apos;eats</ListItemText>
        </ListItem>
      </Link>
      <ListItem onClick={handleLogout}>
        <ListItemIcon>
          <PeopleIcon color="error" />
        </ListItemIcon>
        <ListItemText disableTypography>
          <Typography color="error">Deconnexion</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};
export default NavMenu;
