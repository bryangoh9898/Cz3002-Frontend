import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),/* 
    minHeight: 200, */
    '&:hover': {
      backgroundColor: grey[100]
    },
    cursor: "pointer"
  },
  usernameItem: {
    display: "flex",
    justifyContent: "center"
  },
  timeItem: {
    display: "flex",
    justifyContent: "flex-end"
  },
  thumbContainer: {
    flexDirection: "column",
    display: "flex",
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));


export default function PostCard(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.card}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item xs={4}>
          <Typography variant="caption">
            /{props.data.course}
          </Typography>
        </Grid>
        <Grid className={classes.usernameItem} item xs={4}>
          <Typography variant="caption">
            Posted by {props.data.username}
          </Typography>
        </Grid>
        <Grid className={classes.timeItem} item xs={4}>
          <Typography variant="caption">
            {props.data.time}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          {props.data.title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          {props.data.body}
        </Typography>
      </Grid>
      <Grid container item direction="row" xs={12}>
        <div className={classes.thumbContainer}>
          <IconButton>
            <ThumbUpIcon color={props.data.upvoteBool?"primary":"disabled"}/>
          </IconButton>
          <Typography variant="caption" align="center">
            {props.data.upvoteNo}
          </Typography>
        </div>
        <div className={classes.thumbContainer}>
          <IconButton>
            <ThumbDownIcon color={props.data.downvoteBool?"primary":"disabled"}/>
          </IconButton>
          <Typography variant="caption" align="center">
            {props.data.downvoteNo}
          </Typography>
        </div>
      </Grid>
      {/* <Grid container item direction="row" justifyContent="flex-start" alignItems="flex-start">
        <Grid container item direction="column" xs={1} justifyContent="center" alignItems="flex-start">
          <Grid item>
            <ThumbUpIcon />
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {props.data.upvoteNo}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={1} justifyContent="center" alignItems="flex-start">
          <Grid item>
            <ThumbDownIcon />
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {props.data.downvoteNo}
            </Typography>
          </Grid>
        </Grid>
      </Grid> */}
    </Paper>
  );
}