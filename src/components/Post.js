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
    const classes = useStyles();
    const location = useLocation();
    const [reply, setReply] = useState("");
    const handleSubmitReply = () => {
        alert(reply)
    }
    return (
        <Grid container direction='column'>
            <Paper className={classes.card}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs={4}>
                        <Typography variant="caption">
                            {location.data.course}
                        </Typography>
                    </Grid>
                    <Grid className={classes.usernameItem} item xs={4}>
                        <Typography variant="caption">
                            Posted by {location.data.username}
                        </Typography>
                    </Grid>
                    <Grid className={classes.timeItem} item xs={4}>
                        <Typography variant="caption">
                            {location.data.time}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        {location.data.title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {location.data.body}
                    </Typography>
                </Grid>
                <Grid container item direction="row" xs={12}>
                    <div className={classes.thumbContainer}>
                        <IconButton>
                            <ThumbUpIcon color={true ? "primary" : "disabled"} />
                        </IconButton>
                        <Typography variant="caption" align="center">
                            {location.data.upvoteNo}
                        </Typography>
                    </div>
                    <div className={classes.thumbContainer}>
                        <IconButton>
                            <ThumbDownIcon color={false ? "primary" : "disabled"} />
                        </IconButton>
                        <Typography variant="caption" align="center">
                            {location.data.downvoteNo}
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
