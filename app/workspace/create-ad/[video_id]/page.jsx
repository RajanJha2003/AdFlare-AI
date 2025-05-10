'use client'

import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CreateVideo = () => {
    const {video_id}=useParams();
    const [videoData,setVideoData]=useState();

    const convex=useConvex();

    useEffect(()=>{
        GetVideoData();
    })

    const GetVideoData=async()=>{
        const result=await convex.query(api.videoData.GetVideoDataById,{
            vid:video_id
        })

        console.log(result);
        setVideoData(result);
    }
  return (
    <div>CreateVideo</div>
  )
}

export default CreateVideo