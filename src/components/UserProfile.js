import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import ProfileCard from './ProfileCard';
import UserFeed from './UserFeed';
import Hidden from '@material-ui/core/Hidden';
import UserBanner from './UserBanner';
import { useAuth } from "../context/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    leftGrid: {
        padding:theme.spacing(4),
    },
    rightGrid: {
        padding:theme.spacing(4),
        paddingLeft:0
    },
  }));

  export default function UserProfile() {
    const classes = useStyles();
    const auth = useAuth();
    return (
        <div className={classes.root}>
            <UserBanner username={auth.username}/>
            <Grid container>
                <Hidden mdUp>
                    <Grid item xs={12}>
                        <div className={classes.leftGrid}>
                            <ProfileCard/>
                        </div>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={9}>
                    <div className={classes.leftGrid}>
                        <UserFeed/>
                    </div>
                </Grid>
                <Hidden smDown>
                    <Grid item xs={3}>
                        <div className={classes.rightGrid}>
                            <ProfileCard/>
                        </div>
                    </Grid>
                </Hidden>
                
            </Grid>
        </div>
    );
  }