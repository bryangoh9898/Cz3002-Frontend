import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
    card:{
        padding:theme.spacing(1),
        paddingLeft:theme.spacing(2)
    },
    button:{
        padding:theme.spacing(1),
        paddingInline:theme.spacing(2),
        borderRadius:20,
        marginRight:theme.spacing(1)
    }
  }));

  export default function FilterPost(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.card}>
            <Button
                onClick={()=>{props.setShowPosts(true)}}
                color="default"
                style={props.selectPosts?{backgroundColor:"#eeeeee"}:{}}
                className={classes.button}
                startIcon={<EmailIcon />}
                disableElevation
            >
                Posts
            </Button>
            <Button
                onClick={()=>{props.setShowPosts(false)}}
                color="default"
                style={!props.selectPosts?{backgroundColor:"#eeeeee"}:{}}
                className={classes.button}
                startIcon={<CommentIcon />}
                disableElevation
            >
                Comments
            </Button>
        </Paper>
    );
  }