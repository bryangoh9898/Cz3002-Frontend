import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const data = [
    {
      "course": "SCSE",
      "course_code": "SCSE",
      "module": [
        {
          "name": "Introduction to Computational Thinking & Programming",
          "code": "SC1003"
        },
        {
          "name": "Digital Logic",
          "code": "SC1005"
        },
        {
            "name": "Physics for Computing",
            "code": "SC1013"
          },
          {
            "name": "Computer Organisation & Architecture",
            "code": "SC1006"
          },
          {
            "name": "Data Structures & Algorithms",
            "code": "SC1007"
          },
          {
            "name": "Introduction to Data Science & AI",
            "code": "SC1015"
          },
          {
              "name": "Navigating the Digital World",
              "code": "CC0002"
            },
            {
              "name": "Probability and Statistics for Computing",
              "code": "SC2000"
            }
          
      ]
    },
    {
      "course": "NBS",
      "course_code": "NBS",
      "module": [
        {
            "name": "Legal & Ethical Issues in Sustainability",
            "code": "AB0301"
          },
          {
            "name": "Decision Making with Programming & Analytics",
            "code": "AB0403"
          },
          {
              "name": "Managing Sustainability",
              "code": "AB0502"
            },
            {
              "name": "Communication Management Strategies",
              "code": "AB0602"
            },
            {
              "name": "Financial Management",
              "code": "AB1201"
            },
            {
              "name": "Statistics & Analysis",
              "code": "AB1202"
            },
            {
                "name": "Business Law",
                "code": "AB1301"
              },
              {
                "name": "Intermediate Excel",
                "code": "AB1403"
              },
              {
                "name": "Marketing",
                "code": "AB1501"
              },
              {
                "name": "Organisational Behaviour & Design",
                "code": "AB1601"
              },
              {
                  "name": "Strategic Management",
                  "code": "AB3601"
                },
                {
                  "name": "Forensic Accounting & Fraud Investigation",
                  "code": "AB9102"
                },
                {
                  "name": "Audit Analytics",
                  "code": "AB9103"
                },
                {
                  "name": "Negotiate to Get What You Want: Strategy & Practice",
                  "code": "AB9601"
                },
                {
                    "name": "Leadership in Organisations",
                    "code": "AB9602"
                  },
                  {
                    "name": "Accounting I (previously AC1101 for AY18 & before)",
                    "code": "AC1103"
                  }
      ]
    }
  ]


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
    const [course, setCourse] = useState(null);
    const [module, setModule] = useState(null);
    const [modList, setModuleList] = useState([]);  
    const classes = useStyles();
    // handle change event of the course dropdown
    const handleCourseChange = (obj) => {
        setCourse(obj);
        setModuleList(obj.module);
        setModule(null);
      };
     
      // handle change event of the module dropdown
      const handleModuleChange = (obj) => {
        setModule(obj);
      };
    return (
        <Paper className={classes.card}>
            <Typography className={classes.title} color="textSecondary">Forum Select</Typography>          
      <div>
          <b>Course</b>
          <Select
            // placeholder="Select Course"
            value={course}
            options={data}
            onChange={handleCourseChange}
            // getOptionLabel={x => x.course}
            // getOptionValue={x => x.course_code}
          >
             {data.map((item)=>{console.log(item);return <div></div>})}
         </Select>  
          <br />
          <b>Module</b>
          <Select
            placeholder="Select Module"
            value={module}
            options={modList}
            onChange={handleModuleChange}
            getOptionLabel={x => x.name}
            getOptionValue={x => x.code}
            
          />
        
      </div>
        </Paper>
    );
  }