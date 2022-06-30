import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PeopleIcon from "@mui/icons-material/People";
import IcecreamIcon from "@mui/icons-material/Icecream";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HistoryIcon from "@mui/icons-material/History";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { IAuthAction, useStore } from "src/utils/hooks";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import { useRouter } from "next/router";
import axios from "axios";

const NavMenu: React.FC = () => {
  const {
    setAuth,
    restaurant: { restaurant },
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
      <Link href="/restaurant">
        <ListItem>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText>Restaurant</ListItemText>
        </ListItem>
      </Link>
      {restaurant && (
        <>
          <Link href="/articles">
            <ListItem>
              <ListItemIcon>
                <IcecreamIcon />
              </ListItemIcon>
              <ListItemText>Articles</ListItemText>
            </ListItem>
          </Link>
          <Link href="/menus">
            <ListItem>
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText>Menus</ListItemText>
            </ListItem>
          </Link>
          <Link href="/orders">
            <ListItem>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText>Commandes</ListItemText>
            </ListItem>
          </Link>
          <Link href="/orders">
            <ListItem>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText>Historique</ListItemText>
            </ListItem>
          </Link>
          <Link href="/stats">
            <ListItem>
              <ListItemIcon>
                <QueryStatsIcon />
              </ListItemIcon>
              <ListItemText>Statistique</ListItemText>
            </ListItem>
          </Link>
        </>
      )}
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
