import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StarsIcon from '@material-ui/icons/Stars';
import Button from '@material-ui/core/Button';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const useStyles = makeStyles((theme) => ({
    card:{
        padding:theme.spacing(1),
        marginTop:theme.spacing(2),
        paddingLeft:theme.spacing(2)
    },
    button:{
        padding:theme.spacing(1),
        paddingInline:theme.spacing(2),
        borderRadius:20,
        marginRight:theme.spacing(1)
    }
  }));

  export default function FilterPost() {
    const classes = useStyles();
    return (
        <Paper className={classes.card}>
            <Button
                color="default"
                className={classes.button}
                startIcon={<StarsIcon />}
                disableElevation
            >
                New
            </Button>
            <Button
                color="default"
                className={classes.button}
                startIcon={<TrendingUpIcon />}
                disableElevation
            >
                Best
            </Button>
        </Paper>
    );
  }