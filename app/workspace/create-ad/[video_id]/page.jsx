'use client'

import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Script from './_components/Script';

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
    <div>
        <h2 className='font-bold text-2xl'>Create Video Ad</h2>
        <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='md:col-span-2 '>
    <Script videoData={videoData} />

            </div>
          <div>
            Preview
          </div>
        </div>
    </div>
  )
}

export default CreateVideo