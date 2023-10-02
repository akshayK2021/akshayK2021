import React from "react";
import HighlightText from "./HighLightText";
import compare_with_others from "../../../assests/Images/compare with others.png"
import know_your_progress from "../../../assests/Images/know your progress.png"
import plan_your_lesson from "../../../assests/Images/Calender.jpg"
import CTAButton from "./Button";

const LearningLanguagesection=()=>{
    return(
        <div className="mt-[130px] w-[50%] h-[50%] mx-auto">
            <div className="flex flex-col gap-5 items-center">
                <div className="text-4xl font-semibold text-center">
                    Your swiss Knife for
                    <HighlightText text={"learning any language"}/>
                </div>
                <div className="text-center items-center text-slate-600 mx-auto text-base font-medium w-[70%]">
                    Using spin making learning multiple languages easy.
                     with 20+ language realistic voice-over, progress-tracking,custom scedule and more.
                </div>

                <div className="flex flex-row items-center w-[50%] justify-center gap-0 translate-x-0 duration-[1750ms]  hover:gap-20 mt-10">
                    <img src={know_your_progress} ale="Know your progress" className="object-contain w-[300px]  rotate-12 h-[300px] mr-10px"/>
                    <img src={compare_with_others} ale="Know your progress" className="object-contain w-[270px] rotate-[350deg] h-[300px] mr-10px"/>
                    <img src={plan_your_lesson} ale="Know your progress" className="object-contain w-[270px] mr-100 rotate-[15deg] h-[300px]"/>


                </div>
                <div>
                    <CTAButton active={true} linkto={'/signup'}>
                        <div className="">Learn More</div>
                    </CTAButton>
                </div>
            </div>

            
        </div>
    );
}

export default LearningLanguagesection;