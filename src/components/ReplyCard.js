import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useAuth } from "../context/auth";

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(3),
        margin: theme.spacing(2),/* 
    minHeight: 200, */
        // '&:hover': {
        //     backgroundColor: grey[100]
        // },
        // cursor: "pointer"
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
        fontWeight:'bold',
        marginRight:'10px',
        
    },
    replyContainer:{
        borderBottom: '1px solid lightgrey',
        padding: '10px 0px 10px 0px'
    }
}));
export default function ReplyCard(props) {
    const classes = useStyles();
    const auth = useAuth();
    const [replyData, setReplyData] = useState({...props.data});
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
    return (
        <Grid container direction = 'column' className={classes.replyContainer}>
            <Grid
            container item
            direction="row"
            alignItems="center">
                <Grid  item xs={4}>
                    <Typography variant="caption" className={classes.userNameReply}>
                        {replyData.AnsweringUserName}
                    </Typography>
                    <Typography variant='caption'>
                        {getTime(new Date(),new Date(replyData.createdAt))}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item >
                <Typography variant='caption' >
                    {replyData.Answer}
                </Typography>
            </Grid>
            <Grid container item direction="row" xs={12}>
                <div className={classes.thumbContainer}>
                <IconButton>
                    <ThumbUpIcon color={replyData.UsersWhoUpvotedAnswer.includes(auth.id) ? "primary" : "disabled"} />
                </IconButton>
                <Typography variant="caption" align="center">
                    {replyData.Upvote}
                </Typography>
                </div>
                <div className={classes.thumbContainer}>
                    <IconButton>
                        <ThumbDownIcon color={replyData.UsersWhoDownVotedAnswer.includes(auth.id) ? "primary" : "disabled"} />
                    </IconButton>
                    <Typography variant="caption" align="center">
                        {replyData.Downvote}
                    </Typography>
                </div>
            </Grid>
        </Grid>  
    )
}
