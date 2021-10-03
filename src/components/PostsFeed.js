import React, { useState,useEffect } from 'react';
import CreatePostButton from './CreatePostButton';
import FilterPost from './FilterPosts';
import PostList from './PostList';
import axios from 'axios';
import constants from '../Constants';
import { useAuth } from "../context/auth";

  export default function PostsFeed(props) {
    const auth = useAuth();
    const [threads, setThreads] = useState([]);
    const [filterUpvote, setFilterUpvote] = useState(false);
    const [filterDate, setFilterDate] = useState(false);

    const filterByUpVotes = ()=>{
      if(!filterUpvote)
      {
        let url = '';
        if(props.courseCode)
        {
          url = `${constants.URL}threads/api/FilterByUpvotes/${props.courseCode}`;
        }
        else
        {
          url = `${constants.URL}threads/api/getHighestUpvotesThread/10`;
        }
        axios.get(url , {headers: {
          Authorization: `Bearer ${auth.token}`
        }})
          .then(function (response) {
            // handle success
            console.log(response.data);
            setThreads(response.data);
            setFilterUpvote(true);
            setFilterDate(false);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }
      else{
        filterReset();
      }
    }

    const filterByDate = ()=>{
      if(!filterDate)
      {
          let url = '';
          if(props.courseCode)
          {
            url = `${constants.URL}threads/${props.courseCode}`;
          }
          else
          {
            url = `${constants.URL}threads/getLatestThreads/10`;
          }
          axios.get(url, {headers: {
          Authorization: `Bearer ${auth.token}`
        }})
        .then(function (response) {
          // handle success
          console.log(response.data);
          setThreads(response.data);
          setFilterDate(true);
          setFilterUpvote(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      }
      else{
        filterReset();
      }
      
    }

    const filterReset = ()=>{
      let url = '';
      if(props.courseCode)
      {
        url = `${constants.URL}threads/${props.courseCode}`;
      }
      else
      {
        url = `${constants.URL}threads/getAllThreads`;
      }
      axios.get(url, {headers: {
        Authorization: `Bearer ${auth.token}`
      }})
      .then(function (response) {
        // handle success
        console.log(response.data);
        setThreads(response.data);
        setFilterUpvote(false);
        setFilterDate(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }

    const refreshThreads = ()=>{
      if(filterUpvote)
        {
          let url = '';
        if(props.courseCode)
        {
          url = `${constants.URL}threads/api/FilterByUpvotes/${props.courseCode}`;
        }
        else
        {
          url = `${constants.URL}threads/api/getHighestUpvotesThread/10`;
        }
        axios.get(url , {headers: {
          Authorization: `Bearer ${auth.token}`
        }})
          .then(function (response) {
            // handle success
            console.log(response.data);
            setThreads(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
        }
        else if(filterDate)
        {
          let url = '';
          if(props.courseCode)
          {
            url = `${constants.URL}threads/${props.courseCode}`;
          }
          else
          {
            url = `${constants.URL}threads/getLatestThreads/10`;
          }
          axios.get(url, {headers: {
            Authorization: `Bearer ${auth.token}`
          }})
          .then(function (response) {
            // handle success
            console.log(response.data);
            setThreads(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
        }
        else{
          let url = '';
          if(props.courseCode)
          {
            url = `${constants.URL}threads/${props.courseCode}`;
          }
          else
          {
            url = `${constants.URL}threads/getAllThreads`;
          }
          axios.get(url, {headers: {
            Authorization: `Bearer ${auth.token}`
          }})
          .then(function (response) {
            // handle success
            console.log(response.data);
            setThreads(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
        }
    }
    
    useEffect(() => {
      let url = '';
      if(props.courseCode)
      {
        url = `${constants.URL}threads/${props.courseCode}`;
      }
      else
      {
        url = `${constants.URL}threads/getAllThreads`;
      }
      console.log("test"+ url);
      axios.get(url, {headers: {
        Authorization: `Bearer ${auth.token}`
      }})
        .then(function (response) {
          // handle success
          console.log(response.data);
          setThreads(response.data);
          setFilterUpvote(false);
          setFilterDate(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }, [props.courseCode,auth.token]);

    return (
        <div>
            <CreatePostButton refreshThreads={refreshThreads} faculty={props.faculty} courseCode={props.courseCode}/>
            <FilterPost filterUpvote={filterUpvote} filterDate={filterDate} filterByUpVotes={filterByUpVotes} filterByDate={filterByDate}/>
            <PostList threads={threads}/>
        </div>
    );
  }