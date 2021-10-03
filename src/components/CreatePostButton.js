import React, {useState,useEffect} from 'react';
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
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import constants from '../Constants';
import axios from 'axios';
import { useAuth } from "../context/auth";

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
        alignItems: 'center',
        justifyContent: 'center',
      },
    createPost:{
        flexGrow:1,
        marginInline:theme.spacing(3),
        marginBottom:theme.spacing(3)
    },
    crossButton:{
        margin:theme.spacing(1),
    },
    paper:{
        display: 'flex',
        flexDirection:'column',
        width: '90%',
        maxWidth:900
      },
    titleTextField: {
      marginTop:theme.spacing(2)
    },
    submitBtn: {
      display: "flex",
      justifyContent: "flex-end"
    },
    modalHeader: {
      marginInline:theme.spacing(3),
      paddingTop:theme.spacing(2)
    },
    formControl: {
      width:"100%",
      marginTop:theme.spacing(2)
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
  
  export default function CreatePostButton(props) {
    const auth = useAuth();
    const classes = useStyles();
    const [openPostModal, setOpenPostModal] = useState(false);
    const [data, setData] = useState([]);
    const [faculty, setFaculty] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [courseCodeList, setCourseCodeList] = useState([]); 
    const [postContent, setPostContent] = useState(''); 
    const [postTitle, setPostTitle] = useState(''); 
    // handle change event of the faculty dropdown
    const handleFacultyChange = (e) => {
      const courseObj = data[e.target.value];
      setFaculty(e.target.value);
      setCourseCodeList(courseObj.CourseCode);
      setCourseCode('');
    };
   
    // handle change event of the course code dropdown
    const handleCourseCodeChange = (e) => {
      setCourseCode(e.target.value);
      console.log(e.target.value);
    };

    const handleSubmitPost = () => {
      setPostTitle("");
      setPostContent("");
      axios({
          method: 'post',
          url: `${constants.URL}threads/PostNewThread`,
          data:{
            CourseNumber:props.courseCode ? props.courseCode : courseCode,
            Question:postContent,
            Title:postTitle,
            Faculty: props.faculty ? props.faculty : faculty,
          },
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }).then(function (response) {
              // handle success
              console.log(response.data);
              setOpenPostModal(false);
              props.refreshThreads();
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
    };

    useEffect(() => {
      axios.get(`${constants.URL}facultyRouter`)
        .then(function (response) {
          // handle success
          setData(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }, []);

    const SelectForumInput = () => {
      return(
      <>
      <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="faculty-select-label">Course</InputLabel>
            <Select
                labelId="faculty-select-label"
                label="Faculty"
                value={faculty}
                onChange={handleFacultyChange}
            >
                {data.map((item,index)=>{return <MenuItem key={item._id} value={index}>{item.FacultyName}</MenuItem>})}
            </Select> 
         </FormControl> 
          
         <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="courseCode-select-label">Course Code</InputLabel>
            <Select
            labelId="courseCode-select-label"
            label="Course Code"
            value={courseCode}
            onChange={handleCourseCodeChange}            
            >
                {courseCodeList.length > 0 ? courseCodeList.map((item)=>{return <MenuItem key={item} value={item}>{item}</MenuItem>}) : <MenuItem value="">Please Select Faculty</MenuItem>}
            </Select> 
         </FormControl> 
         </>
      )
    };

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
                    <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                        <Typography align="center" className={classes.modalHeader} variant="h6">
                              Create a post {props.courseCode?"@ " + props.courseCode:"" }
                          </Typography>
                        <IconButton className={classes.crossButton} onClick={handleClosePostModal}>
                          <CloseIcon />
                        </IconButton>
                    </div>
                    <div className={classes.createPost}>
                     {!props.courseCode && SelectForumInput()}
                      <TextField 
                        className={classes.titleTextField} 
                        fullWidth id="outlined-basic" label="Title" variant="outlined" 
                        value={postTitle}
                        onChange={(e) => { setPostTitle(e.target.value) }}
                        />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        minRows='10'
                        maxRows='10'
                        id="reply"
                        label="Content"
                        name="Content"
                        value={postContent}
                        onChange={(e) => { setPostContent(e.target.value) }}
                      />
                      <div className={classes.submitBtn}>
                        <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                              disabled={postTitle ? false : true}
                              endIcon={<PublishIcon />}
                              onClick={(e) => { e.preventDefault(); handleSubmitPost(); }}
                          >
                              Post
                          </Button>
                      </div>
                    </div>
                    
                </Paper>
                </Fade>
            </Modal>
            <ColorButton onClick={handleOpenPostModal} startIcon={<AddCircleIcon className={classes.icon}/>} fullWidth className={classes.button} variant="contained">Create Post</ColorButton>
        </Paper>
    );
  }