import React,{useState,useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import constants from '../Constants';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width:"100%",
        marginTop:theme.spacing(2)
      },
    card:{
        marginRight:theme.spacing(1),
        padding:theme.spacing(2),
        minHeight:300
    }
  }));


  export default function ForumSelect() {
    const history = useHistory();
    const [data, setData] = useState([]);
    const [faculty, setFaculty] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [courseCodeList, setCourseCodeList] = useState([]);   
    const classes = useStyles();
    // handle change event of the Faculty dropdown
    const handleFacultyChange = (e) => {
        const courseObj = data[e.target.value];
        setFaculty(e.target.value);
        setCourseCodeList(courseObj.CourseCode);
        setCourseCode('');
      };
     
      // handle change event of the module dropdown
      const handleCourseCodeChange = (e) => {
        setCourseCode(e.target.value);
        console.log(e.target.value);
        if(e.target.value !== "")
        {
            history.push(`/feed/${data[faculty].FacultyName}/${e.target.value}`);
        }
        
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

    return (
        <Paper className={classes.card}>
            <Typography className={classes.title} color="textSecondary">Forum Select</Typography>          
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="faculty-select-label">Faculty</InputLabel>
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
                {courseCodeList.length > 0 ? courseCodeList.map((item)=>{return <MenuItem key={item} value={item}>{item}</MenuItem>}) : <MenuItem value="">Please Select Course</MenuItem>}
            </Select> 
         </FormControl> 

          
        </Paper>
    );
  }