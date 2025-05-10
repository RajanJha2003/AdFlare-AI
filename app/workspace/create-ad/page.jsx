"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import axios from "axios";
import { useMutation } from "convex/react";
import { LoaderCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const CreateAd = () => {
  const [userInput, setUserInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const router=useRouter();


  const CreateNewVideoData=useMutation(api.videoData.createNewVideoData);
  
  const GenerateAIVideoScript = async () => {
    if (!userInput.trim()) {
      alert("Please enter a topic.");
      return;
    }
  
    setLoading(true);
  
    try {
      const result = await axios.post("/api/generate-script", {
        topic: userInput,
      });
  
      console.log("API Response:", result.data);
  
      // The API now guarantees we get proper JSON
      const scriptVariant = result.data;
  
      const response = await CreateNewVideoData({
        uid: userDetail?._id,
        topic: userInput,
        scriptVariant: scriptVariant
      });
  
      console.log("Database response:", response);
      router.push(`/workspace/create-ad/`+response);
    } catch (error) {
      console.error("Error generating script:", error);
      alert(`Failed to generate script: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className=" mt-32 flex flex-col items-center justify-center">
        <div>
            <Image src={'/advertisement.png'} alt="icon" height={150} width={150} />
        </div>
      <h2 className="font-bold text-2xl text-center">
        🎥 Create AI Video Ads in Just One Click!
      </h2>
      <p className="mt-3 text-lg text-gray-500">
        🚀 Turn your ideas into stunning, scroll-stopping videos — instantly,
        effortlessly, and without editing skills!
      </p>
      <Input
        placeholder="Enter the topic or product info"
        className={"w-lg text-lg mt-5"}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button onClick={GenerateAIVideoScript} disabled={loading} className={"mt-5 w-md"}>

        {
          loading?<LoaderCircle className="animate-spin" />: <Sparkles />
        }
       
        Generate
      </Button>
    </div>
  );
};

export default CreateAd;
