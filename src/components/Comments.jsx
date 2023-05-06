import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import {makeRequest} from '../axios'
import { useSelector } from "react-redux";
const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({videoId}) => {
  const [comments,setComments]=useState([])

  useEffect(()=>{
      const fetchComment=async()=>{
          try{
                const res=await makeRequest.get(`/comment/${videoId}`)
                setComments(res.data)
          }catch(e){
                    console.log(e)
          }
      }
      fetchComment()
  },[videoId])
  return (
    <Container>
      <NewComment>
        <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments?.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
    </Container>
  );
};
//2H:49
export default Comments;
