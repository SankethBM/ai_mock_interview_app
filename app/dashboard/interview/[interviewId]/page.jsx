"use client"
import React, {useEffect, useState} from 'react'
import {db} from "../../../../utils/db";
import {MockInterview} from "../../../../utils/schema";
import {eq} from "drizzle-orm";
import Webcam from "react-webcam";
import {Lightbulb, WebcamIcon} from "lucide-react";
import {Button} from "../../../../components/ui/button";

function Interview({params}) {
    const resolvedParams = React.use(params);
    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        // console.log(resolvedParams);
        GetInterviewDetails();
    },[])

    /**
    This is used to get the interview details from the database
    */
    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, resolvedParams.interviewId));
        // console.log(result);
        setInterviewData(result[0]);
    }

    return (
        <div className='my-10 '>
            <h2 className="font-bold text-2xl">Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col my-10 gap-5'>
                    <div className='flex flex-col p-5 rounded-2xl border gap-5'>
                        <h2 className='text-lg'><strong>Job Role/Job Position : </strong>{interviewData?.jobPosition}</h2>
                        <h2 className='text-lg'><strong>Job Description : </strong>{interviewData?.jobDesc}</h2>
                        <h2 className='text-lg'><strong>Years of Experience : </strong>{interviewData?.jobExperience}</h2>
                    </div>
                    <div className='p-5 border rounded-2xl border-yellow-500 bg-yellow-50'>
                        <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3 text-yellow-500 text-justify'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>
                <div>
                    {webCamEnabled? <Webcam
                            onUserMedia={()=>setWebCamEnabled(true)}
                            onUserMediaError={()=>setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height:300,
                                width:300
                            }}/>
                        :
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-2xl border'/>
                            <Button onClick={()=>setWebCamEnabled(true)} className='p-6 w-full hover:scale-103 transition-all text-md'>Enable Web Cam and Microphone</Button>
                        </>
                    }
                </div>
            </div>
            <div className='flex justify-end items-end mt-10'>
                <Button className='p-6 text-md font-bold hover:scale-105 transition-all'>Start Your Interview</Button>
            </div>
        </div>
    )
}

export default Interview
