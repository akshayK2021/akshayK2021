import { Link } from "react-router-dom";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import HighLightText from "../components/core/HomePage/HighLightText";
import CTAButton from "../components/core/HomePage/Button";
import banner from "../assests/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguagesection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Navbar from "../components/common/Navbar";


function Home() {
    return (
        <div className="text-white flex flex-col items-center justify-center mt-6">
            {/*Section1 */}
            <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between ">
                <Link to={'/signup'}>
                    <div className=" group mx-auto mt-12 p-1 rounded-full bg-slate-800 font-bold text-gray-400 transition-all duration-200 hover:scale-95 w-fit">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200  group-hover:bg-slate-900 hover:text-white">
                            <p className="">Become an Instructor</p>
                            <p className="mt-[2px]"><FaArrowRight /></p>

                        </div>
                    </div>
                </Link>

                <div className="text-center text-3xl font-semibold mt-7">
                    Empower Your Future with
                    <HighLightText text={"Coding Skills"} />
                </div>

                <div className="w-[50%] text-center text-xs font-bold text-slate-400 mt-2">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world and get lot of resouces, including hands-on projects,quizzes, and personalized feedback from the instructors.
                </div>


                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                    <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
                </div>
                <div className="mx-3 my-12 shadow-blue-200  object-cover rounded-full  w-[70%] h-[30%]" >
                    <video muted loop autoPlay className="rounded-md z-0 shadow-cyan-500 shadow-lg">
                        <source src={banner} type="video/mp4" />

                    </video>
                </div>


            </div>


            {/*section1*/}
            <div className="flex flex-col w-[100%]">
                {/*CodeSection1 */}
                <div>
                    <CodeBlocks position={`lg? flex-row`} heading={
                        <div className="text-4xl font-bold">
                            Unlock Your <HighLightText text={"Coding potential"} /> with our online courses
                        </div>
                    }
                        subheading={"Our courses are designed and taught by the industrial experts who have years of experience in coding and area passionate about sharing their knowledge with you"}
                        ctabtn1={{
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            btnText: "Learn more",
                            linkto: "/login",
                            active: false,
                        }}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">
                                <head>
                                <title>Examples</title>
                               <link rel="stylesheet" href="styles.css">
                                </head>
                                <body>
                                <h1><a href='/'>Header</a></h1>
                                </body>
                                </html>`}
                        codeColor={"text-yellow-300"}
                        backgroundGradient={"from-sky-600"} />
                </div>
                
               


                {/*CodeSection2 */}
                <div>
                    <CodeBlocks position={`lg? flex-row-reverse`} heading={<div className="text-4xl font-bold">
                        Start <HighLightText text={"Coding in seconds"} />
                    </div>
                    }
                        subheading={"GO ahead, give it a try.Our hands-on learning environment means you'll be writing real code from your very first lesson"}
                        ctabtn1={{
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }}
                        ctabtn2={{
                            btnText: "Learn more",
                            linkto: "/login",
                            active: false,
                        }}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">
                                <head>
                              <title>Examples</title>
                                <link rel="stylesheet" href="styles.css">
                                </head>
                                <body>
                                <h1><a href='/'>Header</a></h1>
                                 </body>
                                </html>`}
                        codeColor={"text-blue-300"}
                        backgroundGradient={"from-yellow-600"} />
                         
                </div>
                <ExploreMore/>
              
            </div>

            {/*section2*/}
            <div className="bg-gray-50 text-slate-700  ">
                <div className="homepage_bg h-[310px]">
                    <div className={`w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto my-auto`}>
                        <div className="h-[150px]"></div>
                        <div className="flex flex-row gap-7 mt-10 text-white">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex items-center  gap-3">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                <div>Learn More</div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
                <div className="mx-auto w-11/12 max-w-max flex flex-col items-center justify-between gap-7">
                    <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                        <div className="text-4xl font-semibold w-[45%]">
                            Get the skills for a <HighLightText text={"job that is in demand"} />
                        </div>
                        <div className="flex flex-col gap-10 items-start w-[40%]">
                            <div className="text-[16px]">
                                The Modern StudyNotion dictates its own terms.Today, to be a competative
                                specialist requires more than professionals Skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>Learn More</div>
                            </CTAButton>
                        </div>
                    </div>

                </div>
                <TimelineSection/>
                <LearningLanguagesection/>

                {/*Instruction Section*/}
                <div className="w-11/12 mx-auto max-w-max flex-col  items-center justify-between gap-8 first-letter: bg-slate-900 text-white">
                    <InstructorSection/>
                    <h2 className="text-center text-4xl font-semibold mt-10">Review from other learners</h2>
                    {/*Review section*/}
                </div>
            </div>

        

            {/* Footer */}

        </div>


    );

}

export default Home;