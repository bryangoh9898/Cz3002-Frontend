import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    templatecss:{
        padding:20,
    },
    card:{
        marginRigh:theme.spacing(1),
        padding:theme.spacing(2),
        minHeight:350
    }
  }));

  export default function ForumSelect() {
    const classes = useStyles();
    return (
        <Paper className={classes.card}>
            <Typography color="primary" className={classes.templatecss}>
                TODO Forum Select Card
            </Typography>
        </Paper>
    );
  }