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
    <Link href="/restaurant">
      <ListItem>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText>Restaurant</ListItemText>
      </ListItem>
    </Link>
    <Link href="/articles">
      <ListItem>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText>Articles</ListItemText>
      </ListItem>
    </Link>
    <Link href="/menus">
      <ListItem>
        <ListItemIcon>
          <CreditCardIcon />
        </ListItemIcon>
        <ListItemText>Menus</ListItemText>
      </ListItem>
    </Link>
    <Link href="/orders">
      <ListItem>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText>Commandes</ListItemText>
      </ListItem>
    </Link>
    <Link href="/delivery">
      <ListItem>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText>Livraison</ListItemText>
      </ListItem>
    </Link>
    <Link href="/stats">
      <ListItem>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText>Statistique</ListItemText>
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
