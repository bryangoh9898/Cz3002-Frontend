import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../context/auth";
import axios from 'axios';
import constants from '../Constants';

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
  const [postData, setPostData] = useState({...props.data}); 
  const auth = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const getTime = (start,end)=>{
    let difference_In_Time  = Math.abs(start.getTime()-end.getTime());
    let days =  Math.floor(difference_In_Time / (1000 * 3600 * 24)) 
    if(days > 0)
    {
      return days +" days ago";
    }
    else{
      let hours = Math.floor(difference_In_Time / (1000 * 3600));
      if(hours > 0)
      {
        return hours +"h ago";
      }
      else{
        return Math.ceil(difference_In_Time / (1000 * 60)) +" mins ago";
      }
    }
  }
  const handleUpVote = (e)=>{
    e.stopPropagation();
    console.log(auth.token);
    const voteUrl = postData.UsersWhoUpvoted.includes(auth.id)?`${constants.URL}threads/api/ResetVote/${postData._id}`:`${constants.URL}threads/api/Upvote/${postData._id}`;
    axios({
      method: 'put',
      url: voteUrl,
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    }).then(function (response) {
          // handle success
          console.log(response.data);
          setPostData(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
  }

  const handleDownVote = (e)=>{
    e.stopPropagation();
    const voteUrl = postData.UsersWhoDownVoted.includes(auth.id)?`${constants.URL}threads/api/ResetVote/${postData._id}`:`${constants.URL}threads/api/Downvote/${postData._id}`;
    axios({
      method: 'put',
      url: voteUrl,
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    }).then(function (response) {
          // handle success
          console.log(response.data);
          setPostData(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
  }
  return (
    <Paper
      className={classes.card}
      onClick={() => {
        history.push({
          pathname: `/post/${postData._id}`,
          data: postData
        });
      }
      }>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Grid item xs={4}>
          <Typography variant="caption">
            /{postData.CourseNumber}
          </Typography>
        </Grid>
        <Grid className={classes.usernameItem} item xs={4}>
          <Typography variant="caption">
            Posted by {postData.OriginalUserName}
          </Typography>
        </Grid>
        <Grid className={classes.timeItem} item xs={4}>
          <Typography variant="caption">
            {getTime(props.currentDate,new Date(postData.createdAt))}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          {postData.Title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          {postData.Question}
        </Typography>
      </Grid>
      <Grid container item direction="row" xs={12}>
        <div className={classes.thumbContainer}>
          <IconButton onClick={handleUpVote}>
            <ThumbUpIcon color={ postData.UsersWhoUpvoted.includes(auth.id) ? "primary" : "disabled"} />
          </IconButton>
          <Typography variant="caption" align="center">
            {postData.ThreadUpVotes}
          </Typography>
        </div>
        <div className={classes.thumbContainer}>
          <IconButton onClick={handleDownVote}>
            <ThumbDownIcon color={postData.UsersWhoDownVoted.includes(auth.id) ? "primary" : "disabled"} />
          </IconButton>
          <Typography variant="caption" align="center">
            {postData.ThreadDownVotes}
          </Typography>
        </div>
      </Grid>
    </Paper>
  );
}