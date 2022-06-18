import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RoomIcon from "@mui/icons-material/Room";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";

const NavMenu: React.FC = () => (
  <List>
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
  </List>
);

export default NavMenu;
