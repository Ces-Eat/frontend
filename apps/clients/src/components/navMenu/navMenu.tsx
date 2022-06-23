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
import Link from "next/link";

const NavMenu: React.FC = () => (
  <List>
    <Link href="/account">
      <ListItem>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText>Mon compte</ListItemText>
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
        <ListItemText>Adresse</ListItemText>
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
    <ListItem onClick={() => console.log("logout")}>
      <ListItemIcon>
        <PeopleIcon color="error" />
      </ListItemIcon>
      <ListItemText disableTypography>
        <Typography color="error">Deconnexion</Typography>
      </ListItemText>
    </ListItem>
  </List>
);

export default NavMenu;
