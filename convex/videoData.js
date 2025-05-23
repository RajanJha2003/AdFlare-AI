import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const createNewVideoData=mutation({
    args:{
        uid:v.id('users'),
        topic:v.string(),
        scriptVariant:v.any(),
        
    },
    handler:async(ctx,args)=>{
        const videoData=await ctx.db.insert('videoData',{
            uid:args.uid,
            topic:args.topic,
            scriptVariant:args.scriptVariant,
            
        })
        return videoData;
    }
})

export const GetVideoDataById=query({
    args:{
        vid:v.id('videoData'),
    },
    handler:async(ctx,args)=>{
        const videoData=await ctx.db.get(args.vid);
        return videoData;
    }
})