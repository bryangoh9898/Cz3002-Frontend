import React, { useState,useEffect } from 'react';
import CreatePostButton from './CreatePostButton';
import FilterPost from './FilterPosts';
import PostList from './PostList';
import axios from 'axios';
import constants from '../Constants';
import { useAuth } from "../context/auth";

  export default function PostsFeed() {
    const auth = useAuth();
    const [threads, setThreads] = useState([]);
    const [filterUpvote, setFilterUpvote] = useState(false);
    const [filterDate, setFilterDate] = useState(false);

    const filterByUpVotes = ()=>{
      if(!filterUpvote)
      {
        axios.get(`${constants.URL}threads/api/getHighestUpvotesThread/10` , {headers: {
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
        axios.get(`${constants.URL}threads/getLatestThreads/10`, {headers: {
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
      axios.get(`${constants.URL}threads`)
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

    useEffect(() => {
      axios.get(`${constants.URL}threads`)
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
    }, []);

    return (
        <div>
            <CreatePostButton/>
            <FilterPost filterUpvote={filterUpvote} filterDate={filterDate} filterByUpVotes={filterByUpVotes} filterByDate={filterByDate}/>
            <PostList threads={threads}/>
        </div>
    );
  }