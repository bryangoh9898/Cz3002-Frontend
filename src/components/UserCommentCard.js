import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

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
  replyContainer:{
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(2),
    },
borderBottom:{
    borderBottom: '1px solid lightgrey',
    },
  userNameReply: {
    fontWeight:'bold',
    marginRight:'10px',
    },
}));


export default function PostCard(props) {
  const commentData = props.data; 
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
//   const handleUpVote = (e)=>{
//     e.stopPropagation();
//     console.log(auth.token);
//     const voteUrl = commentData.UsersWhoUpvoted.includes(auth.id)?`${constants.URL}threads/api/ResetVote/${commentData._id}`:`${constants.URL}threads/api/Upvote/${commentData._id}`;
//     axios({
//       method: 'put',
//       url: voteUrl,
//       headers: {
//         Authorization: `Bearer ${auth.token}`
//       }
//     }).then(function (response) {
//           // handle success
//           console.log(response.data);
//           setCommentData(response.data);
//         })
//         .catch(function (error) {
//           // handle error
//           console.log(error);
//         })
//   }

//   const handleDownVote = (e)=>{
//     e.stopPropagation();
//     const voteUrl = commentData.UsersWhoDownVoted.includes(auth.id)?`${constants.URL}threads/api/ResetVote/${commentData._id}`:`${constants.URL}threads/api/Downvote/${commentData._id}`;
//     axios({
//       method: 'put',
//       url: voteUrl,
//       headers: {
//         Authorization: `Bearer ${auth.token}`
//       }
//     }).then(function (response) {
//           // handle success
//           console.log(response.data);
//           setCommentData(response.data);
//         })
//         .catch(function (error) {
//           // handle error
//           console.log(error);
//         })
//   }
  return (
    <Paper
      className={classes.card}
      onClick={() => {
        history.push({
          pathname: `/post/${commentData.threadID}`,
          data: {}
        });
      }
      }>
      <Grid item xs={12}>
        <Typography variant="body1" className={classes.borderBottom}>
        {commentData.AnsweringUserName} commented on {commentData.threadTitle}
        </Typography>
      </Grid>
      <Grid container direction = 'column' className={classes.replyContainer}>
            <Grid
            container item
            direction="row"
            alignItems="center">
                <Grid  item xs={4}>
                    <Typography variant="caption" className={classes.userNameReply}>
                        {commentData.AnsweringUserName}
                    </Typography>
                    <Typography variant='caption'>
                        {getTime(props.currentDate,new Date(commentData.createdAt))}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item >
                <Typography variant='caption' >
                    {commentData.Answer}
                </Typography>
            </Grid>
        </Grid>
    </Paper>
  );
}