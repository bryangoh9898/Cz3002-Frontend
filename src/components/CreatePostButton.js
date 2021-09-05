import React, {useState} from 'react';
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { grey } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    card:{
        padding:theme.spacing(1),
    },
    button:{
        justifyContent:"flex-start",
        textTransform:"none",
        padding:theme.spacing(1),
    },
    icon:{
        marginLeft:theme.spacing(1)
    },
    modal: {
        display: 'flex',
      },
    createPost:{
        flexGrow:1,
        overflowY:"scroll",
        marginInline:theme.spacing(3),
        marginBottom:theme.spacing(3)
    },
    crossButton:{
        margin:theme.spacing(1),
    },
    paper:{
        display: 'flex',
        flexDirection:'column',
        height:"80%",
        width:"100%",
        margin:20
      },
  }));

  const ColorButton = withStyles((theme) => ({
    root: {
      color: "#949292",
      backgroundColor: grey[200],
      '&:hover': {
        backgroundColor: grey[200],
      },
    },
  }))(Button);

  export default function CreatePostButton() {
    const classes = useStyles();
    const [openPostModal, setOpenPostModal] = useState(false);
    const handleOpenPostModal = () => {
        setOpenPostModal(true);
      };
    
      const handleClosePostModal = () => {
        setOpenPostModal(false);
      };
    return (
        <Paper className={classes.card}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openPostModal}
                onClose={handleClosePostModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}>
                <Fade in={openPostModal}>
                <Paper className={classes.paper}>
                    <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
                    <IconButton className={classes.crossButton} onClick={handleClosePostModal}>
                    <CloseIcon />
                    </IconButton>
                    </div>
                    <div className={classes.createPost}>
                        TODO Create POST
                    </div>
                </Paper>
                </Fade>
            </Modal>
            <ColorButton onClick={handleOpenPostModal} startIcon={<AddCircleIcon className={classes.icon}/>} fullWidth className={classes.button} variant="contained">Create Post</ColorButton>
        </Paper>
    );
  }