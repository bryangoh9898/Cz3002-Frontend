import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SchoolIcon from '@material-ui/icons/School';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from 'axios';
import constants from '../Constants';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  schoolIcon: {
    marginRight: theme.spacing(1),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header() {
  const auth = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notif, setNotifs] = useState(0);
  const [notifData, setNotifsData] = useState([0,[]]);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const isNotifOpen = Boolean(notifAnchorEl);


  const handleNotifMenuOpen = (event) => {
    axios.get(`${constants.URL}users/RetrieveNotification`, {headers: {
      Authorization: `Bearer ${auth.token}`
      }})
      .then(function (response) {
        // handle success
        console.log()
        setNotifsData([response.data[0],response.data[1].reverse()]);
        setNotifs(0);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifMenuClose = (event) => {
    setNotifAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleLogOut = () => {
    console.log("LOGOUT");
    auth.signout(()=>{console.log("CALLBACK");history.push("/signin")});
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${constants.URL}users/CheckNotification`, {headers: {
        Authorization: `Bearer ${auth.token}`
        }})
        .then(function (response) {
          // handle success
          setNotifs(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }, 30000);
    return () => clearInterval(interval);
    
  }, [auth.token]);

  const menuId = 'primary-search-account-menu';

  const renderNotifMenu = (
    <Menu
      anchorEl={notifAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      id="notif"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotifOpen}
      onClose={handleNotifMenuClose}
    >
      {notifData[1].map((item,index)=>{
        if(index <notifData[0])
        {
          return(<MenuItem component={RouterLink} to={`/post/${item.threadID}`}>
              <Badge color="secondary" variant="dot">
                {`${item.UserWhoReplied} commented on "${item.ThreadTitle}"`}
              </Badge>
            </MenuItem>)
        }
        return (<MenuItem component={RouterLink} to={`/post/${item.threadID}`}>{`${item.UserWhoReplied} commented on "${item.ThreadTitle}"`}</MenuItem>);
      })}
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={RouterLink} to="/profile">Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogOut} >Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={RouterLink} to="/quiz">
        <IconButton aria-label="game quiz" color="inherit">
            <VideogameAssetIcon />
        </IconButton>
        <p>Quiz</p>
      </MenuItem>
      <MenuItem
      aria-label="notif"
      aria-controls="notif"
      aria-haspopup="true"
      onClick={handleNotifMenuOpen}>
        <IconButton color="inherit">
          <Badge badgeContent={notif} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem component={RouterLink} to="/profile">
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogOut}>
      <IconButton
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar color="primary" position="static">
        <Toolbar>
        <div onClick={()=>{history.push("/");}} style={{display:"flex",alignItems:"center",cursor:"pointer"}}>
            <SchoolIcon style={{flex:1}} className={classes.schoolIcon}/>
          <Typography className={classes.title} variant="h6" noWrap>
            NTUnderflow
          </Typography>
        </div>
        
             
       
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <IconButton aria-label="game quiz" color="inherit" component={RouterLink} to="/quiz">
                <VideogameAssetIcon fontSize="large"/>
            </IconButton>
            <IconButton aria-label="notif"
          aria-controls="notif"
          aria-haspopup="true"
          onClick={handleNotifMenuOpen}
           color="inherit">
              <Badge badgeContent={notif} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotifMenu}
    </div>
  );
}
