import { createSlice } from "@reduxjs/toolkit";

const initialState={
    video:null,
    loading:false,
    err:false
}
const videoSlice=createSlice({
    name:'video',
    initialState,
    reducers:{
        fetchStart:(state)=>{  //4 function
            state.loading=true
    },
    fetchSuccess:(state,action)=>{
        state.loading=false
        state.video=action.payload
},
    fetchFailure:(state)=>{
        state.loading=false
        state.err=true
},
like:(state,action)=>{
    if(!state.video.like.includes(action.payload)){
        state.video.like.push(action.payload);
        state.video.dislikes.splice(state?.video?.dislikes?.findIndex(
            (userId)=>userId===action.payload),
            1);

    }
},
dislike:(state,action)=>{
    if(!state.video.dislikes.includes(action.payload)){
        state.video.dislikes.push(action.payload);
        state.video.like.splice(state.video.like.findIndex(
            (userId)=>userId===action.payload),
            1);

    }
}


}
})
export const {fetchStart,fetchSuccess,fetchFailure,like,dislike}=videoSlice.actions
export default videoSlice.reducer