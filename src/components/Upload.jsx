import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import app from '../firebase/firebase'
import {makeRequest} from '../axios'
import {useNavigate} from 'react-router-dom'
const Container=styled.div`
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 20;
        left: 0;
        background-color: #000000a7;
        align-items: center;
        display: flex;
        justify-content: center;

    `
    const Wrapper=styled.div`
        width: 500px;
        height: 500px;
        background-color: ${({theme})=>theme.bgLighter};
        color:${({theme})=>theme.text};
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap:20px;
        position: relative;


        `   
    const Close=styled.div`
        position: absolute;
        top: 0;
        right: 0;
        padding: 6px;
        cursor: pointer;
        `
    const Title=styled.h1`
        text-align: center;
    `
    const Input=styled.input`
        border: 1px solid ${({theme})=>theme.soft};
        color:${({theme})=>theme.text};
        border-radius: 3px;
        padding: 10px;
        background-color: transparent;
    `
        const Desc=styled.textarea`
        border: 1px solid ${({theme})=>theme.soft};
        color:${({theme})=>theme.text};
        border-radius: 3px;
        padding: 10px;
        height: 15vh;
        background-color: transparent;
    `
    const Button=styled.button`
    border-radius:3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({theme})=>theme.soft};
    color:${({theme})=>theme.textSoft};
    `
    const Label=styled.label`
        font-size: 14px;

    `
function Upload({setOpen}) {
    const navigate=useNavigate()
    const [img,setImg]=useState(undefined)
    const [video,setVideo]=useState(undefined)
    const [imgPers,setimgPers]=useState(0)
    const [vidPers,setvidPers]=useState(0)
    const [input,setInput]=useState({})
    const [tags,setTags]=useState("")
    const handleTags=(e)=>{
    setTags(e.target.value.split(","))
    }   
    const handleChange=(e)=>{
        setInput(prev=>{return{...prev,[e.target.name]:e.target.value}})
    }
    const uploadFile=(file,urlType)=>{
        const storage=getStorage(app);
        const fileName=new Date().getTime()+file.name
        const storageRef=ref(storage,fileName);
        const uploadTask=uploadBytesResumable(storageRef,file)
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const  progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                urlType==="imgUrl"?setimgPers(Math.round(progress)):setvidPers(Math.round(progress))
                //console.log("Upload is"+progress+"% done")
                switch (snapshot.state){
                    case "paused":
                        console.log("Upload paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;    
                }
            },
            (error)=>{},
                ()=>{
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                            setInput((prev)=>{
                                return {...prev,[urlType]:downloadURL}
                            })
                        })
                }
            
        )
    }

    useEffect(()=>{
        video && uploadFile(video,"videoUrl")
    },[video])
    useEffect(()=>{
        img && uploadFile(img,"imgUrl")
    },[img])
    const handleUpload=async(e)=>{
        e.preventDefault();
        const res=await makeRequest.post('/videos/',{...input,tags})
        setOpen(false)
        res.status===200 && navigate(`/video/${res?.data?._id}`)
    }
console.log(input)
return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload a New Video</Title>
            <Label>Video:</Label>
            {vidPers>0 ?("Upload:"+vidPers):(
            <Input type='file' accept='video/*'  onChange={(e)=>setVideo(e.target.files[0])}/>
            )
        }
            <Input type="text" placeholder='title' name='title'  onChange={handleChange}/>
            <Desc   placeholder='desc'  name='desc' onChange={handleChange}/>
            <Input type="text" placeholder='Separate the tags with commas.' value={tags} onChange={(e)=>setTags(e.target.value)}/>
            <Label>Image:</Label>
            {imgPers>0?("Uploading"+imgPers):(
                <Input type="file" accept='image/*' onChange={(e)=>setImg(e.target.files[0])} />
            )}
            
            <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default Upload
//3h:06m