import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from 'axios'
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [video,setVideo]=useState([])
  useEffect(()=>{
const fetchVideos=async()=>{
  const res=await axios.get(`http://localhost:8800/api/v1/videos/${type}`)
  setVideo(res.data)
}
fetchVideos()
  },[type])
  console.log(video)
  return (
    <Container>
      {video?.map((video,id)=>(
        <Card key={id} video={video}/>
      ))}
      
    </Container>
  );
};

export default Home;
