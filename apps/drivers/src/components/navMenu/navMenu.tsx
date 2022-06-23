import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CreditCardIcon from "@mui/icons-material/CreditCard";
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
  </List>
);

export default NavMenu;
