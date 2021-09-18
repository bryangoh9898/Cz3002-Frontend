import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useLocation } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import FilterPost from './FilterPosts';
import ReplyList from './ReplyList';
import { useAuth } from "../context/auth";
import axios from 'axios';
import constants from '../Constants';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(3),
        margin: theme.spacing(2)/*,
    minHeight: 200, */
        // '&:hover': {
        //     backgroundColor: grey[100]
        // },
        // cursor: "pointer"
    },
    filterCard: {
        margin: theme.spacing(2)
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
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },
    submitBtn: {
        display: "flex",
        justifyContent: "flex-end"
    },
    userNameReply: {
        fontWeight: 'bold',
        marginRight: '10px',

    },
    replyContainer: {
        borderBottom: '1px solid grey'
    }
}));



export default function Post() {
    const auth = useAuth();
    const location = useLocation();
    const [postData, setPostData] = useState({...location.data}); 
    const classes = useStyles();
    const [reply, setReply] = useState("");
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
        axios({
          method: 'put',
          url: `${constants.URL}threads/api/Upvote/${postData._id}`,
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
        axios({
          method: 'put',
          url: `${constants.URL}threads/api/Downvote/${postData._id}`,
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

    const handleSubmitReply = () => {
        alert(reply)
    }
    return (
        <Grid container direction='column'>
            <Paper className={classes.card}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs={4}>
                        <Typography variant="caption">
                            {postData.CourseNumber}
                        </Typography>
                    </Grid>
                    <Grid className={classes.usernameItem} item xs={4}>
                        <Typography variant="caption">
                            Posted by {postData.OriginalUserId}
                        </Typography>
                    </Grid>
                    <Grid className={classes.timeItem} item xs={4}>
                        <Typography variant="caption">
                            {getTime(new Date(),new Date(postData.createdAt))}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        {postData.Question}
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
                            <ThumbUpIcon color={postData.UsersWhoUpvoted.includes(auth.id) ? "primary" : "disabled"} />
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
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        minRows='5'
                        id="reply"
                        label="Reply"
                        name="reply"
                        value={reply}
                        placeholder="What are your thoughts?"
                        onChange={(e) => { setReply(e.target.value) }}
                    />
                    <Grid item className={classes.submitBtn}>
                        <Button
                            type="submit"
                            // fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={reply ? false : true}
                            endIcon={<PublishIcon />}
                            onClick={(e) => { e.preventDefault(); handleSubmitReply(); }}
                        >
                            Comment
                        </Button>
                    </Grid>
                </form>
            </Paper>
            <div className={classes.filterCard} >
                <FilterPost />
            </div>
            <Paper className={classes.card}>
                <Grid container direction='column'>
                    <ReplyList />
                </Grid>
            </Paper>
        </Grid>
    );
}
