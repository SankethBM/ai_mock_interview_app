"use client"
import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {Input} from "../../../components/ui/input";
import {Textarea} from "../../../components/ui/textarea";
import {runGemini} from "../../../utils/GeminiAIModel";
import {LoaderCircle} from "lucide-react";
import {MockInterview} from "../../../utils/schema";
import {db} from "../../../utils/db";
import { v4 as uuidv4 } from "uuid";
import {useUser} from "@clerk/nextjs";
import moment from "moment";
import {useRouter} from "next/navigation";

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const {user} = useUser();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition,jobDesc, jobExperience);

        const InputPrompt = "Job Position: "+jobPosition+"Job Description: "+jobDesc+" Years of Experience: "+jobExperience+" Depends on job Position, Job Description and year of experience please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview question with Answered in Json Format, Give Question and Answered as field in JSON"

        try {
            const result = await runGemini(InputPrompt);
            const MockJsonResp = (result).replace('```json', '').replace('```', '');
            console.log("Gemini Response:", JSON.parse(MockJsonResp));
            setJsonResponse(MockJsonResp);

            const resp = await db.insert(MockInterview)
                .values({
                    mockId:uuidv4(),
                    jsonMockResp:MockJsonResp,
                    jobPosition:jobPosition,
                    jobDesc:jobDesc,
                    jobExperience:jobExperience,
                    createdBy:user?.primaryEmailAddress?.emailAddress,
                    createdAt:moment().format('DD-MM-YYYY')
                }).returning({mockId:MockInterview.mockId})
            console.log("Inserted ;ID : ", resp)
            if(resp){
                setOpenDialog(false);
                router.push("/dashboard/interview/"+resp[0]?.mockId);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    }

    return (
        <div>
            {/* Add New Card */}
            <div
                className="p-12 border-2 border-dashed border-primary rounded-2xl bg-secondary hover:scale-105 hover:shadow-lg cursor-pointer transition-all duration-300 text-center"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="font-bold text-xl">+ Add New</h2>
                <p className="text-sm text-gray-500 mt-2">
                    Create a new AI interview session
                </p>
            </div>

            {/* Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[900px] w-3xl p-10 rounded-2xl">

                    <DialogHeader className="text-center space-y-3">
                        <DialogTitle className="text-3xl font-bold">
                            Start Your Interview
                        </DialogTitle>

                        <DialogDescription className="text-gray-500 font-bold text-2xl">
                            Tell us more about your interview so we can personalize it.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit}>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-md text-center">
                            Tell us about your interview
                        </h2>
                        <p className="text-gray-600 text-lg text-center">
                            Add job role, tech stack, and experience.
                        </p>
                        <div className="mt-7 my-3">
                            <label className='font-bold'>Job Role / Job Position</label>
                            <Input placeholder="Ex. Full Stack Developer" className='mt-2 p-6' required
                                   onChange={(event) => setJobPosition(event.target.value)}
                            />
                        </div>
                        <div className="my-3">
                            <label className='font-bold'>Job Description / Tech Stack (In Short)</label>
                            <Textarea placeholder="Ex. React, Angular, Java, Python, SQL, NodeJS etc..." className='mt-2 p-6' required
                                      onChange={(event) => setJobDesc(event.target.value)}
                            />
                        </div>
                        <div className="my-3">
                            <label className='font-bold'>Years of Experience</label>
                            <Input placeholder="Ex. 5" type='number' max="40" className='mt-2 p-6' required
                                   onChange={(event) => setJobExperience(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <Button className='p-6' variant="ghost" type={"button"} onClick={() => setOpenDialog(false)}>
                            Cancel
                        </Button>

                        <Button className="bg-primary text-white p-6" type='submit' disabled={loading} >
                            {loading?
                                <>
                                <LoaderCircle className='animate-spin'/>'Generating...'</>:'Start Your Interview'
                            }
                        </Button>
                    </div>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview