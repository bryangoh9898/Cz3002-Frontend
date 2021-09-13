import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';


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
    return (
        <Grid container xs ={12} direction = 'column' className={classes.replyContainer}>
            <Grid
            container item
            direction="row"
            alignItems="center">
                <Grid  item xs={4}>
                    <Typography variant="caption" className={classes.userNameReply}>
                        {props.data.username} .
                    </Typography>
                    <Typography variant='caption'>
                        {props.data.time}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item >
                <Typography variant='caption' >
                    {props.data.body}
                </Typography>
            </Grid>
            <Grid container item direction="row" xs={12}>
                <div className={classes.thumbContainer}>
                <IconButton>
                    <ThumbUpIcon color={true ? "primary" : "disabled"} />
                </IconButton>
                <Typography variant="caption" align="center">
                    {props.data.upvoteNo}
                </Typography>
                </div>
                <div className={classes.thumbContainer}>
                    <IconButton>
                        <ThumbDownIcon color={false ? "primary" : "disabled"} />
                    </IconButton>
                    <Typography variant="caption" align="center">
                        {props.data.downvoteNo}
                    </Typography>
                </div>
            </Grid>
        </Grid>  
    )
}
