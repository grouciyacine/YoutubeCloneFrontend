import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import Comments from "../components/Comments";
import Card from "../components/Card";
import {useDispatch, useSelector} from 'react-redux'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/VideoSlice";
import { format } from "timeago.js";
import { makeRequest } from "../axios";
import { subscription } from "../redux/UserSlice";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame=styled.video`
  max-height:720px;
  width:100%;
  z-index: 3;
  object-fit:cover;
  
`
const Video = () => {
  const {user}=useSelector((state)=>state.user);
  const {video}=useSelector((state)=>state.video)
  const dispatch=useDispatch()
  const path=useLocation().pathname.split("/")[2]
  const [channel,setChannel]=useState({}) 
  useEffect(()=>{
    const fetchData=async()=>{
      try{
          const videoRes=await axios.get(`http://localhost:8800/api/v1/videos/find/${path}`).then(res=>dispatch(fetchSuccess(res.data)))
          const channelRes=await axios.get(`http://localhost:8800/api/v1/user/find/${videoRes.payload.userId}`)
          setChannel(channelRes.data)
      }catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[path,dispatch,video])
  let a=video?.like?.length
  const handleLike=async()=>{
await makeRequest.put(`/user/like/${video?._id}`)
dispatch(like(user._id))
  }
  const handleDislike=async()=>{
    await makeRequest.put(`/user/dislike/${video?._id}`)
    dispatch(dislike(user._id))
      }
  const handleSub=async()=>{
    user.subscribedUsers.includes(channel?._id)?
    await makeRequest.put(`/user/uns/${channel?._id}`):
    await makeRequest.put(`/user/sub/${channel?._id}`);
    dispatch(subscription(channel._id))
  }
  return (
    <Container>
      <Content>
<video src={video?.videoUrl} controls/>
        <Title>{video?.title}</Title>
        <Details>
          <Info>{video?.views} views • {format(video?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {video?.likes?.includes(user._id)?<ThumbUpIcon/>
              :<ThumbUpOutlinedIcon />
            }
              {a}
            </Button>
            <Button onClick={handleDislike}>
              {video?.dislike?.includes(user._id)? <ThumbDownIcon/>:<ThumbDownOffAltOutlinedIcon />} Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>
                  {video?.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>{user?.subscribedUsers?.includes(channel._id)?"SUBSCRIBED":"SUBCRIBE"}</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={video?._id}/>
      </Content>
      {/*
      <Recommendation>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
      </Recommendation>*/}
    </Container>
  );
};
export default Video;
//3h:16m