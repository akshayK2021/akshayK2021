import React from "react";
import InstructorImage from "../../../assests/Images/Instructor.jpg"
import HighLightText from "./HighLightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

function InstructorSection() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="mt-16 bg-slate-900 flex items-center ">
            <div className=" flex flex-row gap-20 justify-center h-[30%] items-center">
                <div className="w-[50%] h-[30%] ml-28 mt-20">
                    <img src={InstructorImage} alt="Instructor Image " className="shadow w-[500px] h-[500px] translate-x-0 duration-700 hover:w-[550px] hover:h-[550px] object-cover white" />
                </div>
                <div className="w-[50%] flex flex-col gap-10">
                    <div className="text-4xl fonnt-semibold w-[50%]">
                        Become an
                        <HighLightText text={"Instructor"} />
                    </div>
                    <p className="font-medium text-[16px] w-[80%] text-slate-300">
                        Instructor from around the world teach millions on StudyNotion. We provide the tools and skills to teach you with love
                    </p>
                    <div className="w-fit">
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className="flex flex-row gap-2 items-center">
                            Start Learning Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default InstructorSection;