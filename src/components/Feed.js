import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import ForumSelect from './ForumSelect';
import PostsFeed from './PostsFeed';
import Hidden from '@material-ui/core/Hidden';
import {useParams} from "react-router-dom";
import CourseBanner from './CourseBanner';

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

  export default function Template() {
    const classes = useStyles();
    const { courseCode } = useParams();
    return (
        <div className={classes.root}>
            {courseCode && <CourseBanner courseCode={courseCode}/>}
            <Grid container>
                <Hidden mdUp>
                    <Grid item xs={12}>
                        <div className={classes.leftGrid}>
                            <ForumSelect/>
                        </div>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={9}>
                    <div className={classes.leftGrid}>
                        <PostsFeed courseCode={courseCode}/>
                    </div>
                </Grid>
                <Hidden smDown>
                    <Grid item xs={3}>
                        <div className={classes.rightGrid}>
                            <ForumSelect/>
                        </div>
                    </Grid>
                </Hidden>
                
            </Grid>
        </div>
    );
  }