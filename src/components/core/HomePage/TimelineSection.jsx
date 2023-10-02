import React from "react";

import Logo1 from "../../../assests/Images/Logo1.png"
import Logo2 from "../../../assests/Images/Logo2.png"
import Logo3 from "../../../assests/Images/Logo3.png"
import Logo4 from "../../../assests/Images/Logo4.png";
import timelineImage from "../../../assests/Images/timelineImage.jpg"
const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description: "Fully committed to the success company"
    },
]

const TimelineSection = () => {
   
    return (
        <div>
            <div className="flex flex-row   justify-center items-center">
                <div className="w-[35%] flex flex-col gap-11">
                    {
                        timeline.map((element, index) => {
                            return (
                                <div className="flex flex-row gap-6" key={index}>
                                    <div className="w-[30px] h-[40px] bg-white flex items-center">
                                        <img  className="object-cover"src={element.Logo} />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                        <p className="text-base">{element.Description}</p>
                                    </div>

                                </div>
                            );

                        })
                    }
                </div>
                <div className="relative shadow-sky-500 w-[40%] h-[40%]">
                    <img src={timelineImage} alt="timeLineImage" className="shadow-white object-cover h-[450px] w-[100%] "/>
               
                <div className="absolute bg-green-800 flex flex-row  transform  sm:{flex-wrap}  text-white uppercase py-5 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="flex flex-row gap-5 items-center border-r border-green-300 px-7">
                        <p className="text-3xl font-bold">10</p>
                        <p className="text-green-300 text-sm" >Years of Experience</p>
                    </div >
                    <div className="flex gap-5 items-center px-7">
                    <p className="text-3xl font-bold">250</p>
                        <p className="text-green-300  text-sm" >Types of Courses</p>

                    </div>

                </div>
                </div>

            </div>
        </div>
    );
}

export default TimelineSection;