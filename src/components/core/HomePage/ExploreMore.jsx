import React, { useState } from "react";
import { HomePageExplore } from "../../data/homepage-explore";
import HighLightText from "./HighLightText";
import CourseCard from "./CourseCard";


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills path",
    "Career paths",
];

const ExploreMore = () => {
    const [courrentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
    return (
        <div className="h-full">
            <div className="text-4xl font-semibold text-center ">
                Unlock the
                <HighLightText text={"Power of code"} />
            </div>

            <p className="text-center text-slate-300 text-sm text-[16px] mt-3 mb-5 px-2 py-2">
                Learn to build anything you can imagine
            </p>
            <div className="flex flex-row mx-auto justify-center bg-slate-900 rounded-xl w-[50%] md:flex-wrap max-w-max items-center">{
                tabsName.map((element, index) => {
                    return (
                        <div className={`text-[16px] flex flex-row items-center gap-2
                             ${courrentTab == element ? "bg-slate-950 text-slate-50 font-medium" :
                                " bg-gray-800  text-slate-200"} rounded-full transition-all duration-200 cursor-pointer
                            hover:bg-slate-800 hover: text-white px-7 py-2`}
                            key={index}
                            onClick={() => setMyCards(element)}>{element}</div>
                    )
                })} </div>

            <div className="lg:h-[15rem] w-[60%] h-full md:w-[20%]">

                {/*Course card group*/}
                <div className="absolute flex flex-row  justify-center gap-12  md:flex-wrap w-[70%] items-center mx-auto mt-12 ml-28 ">
                    {
                        courses.map((element, index) => {

                            return (
                                <CourseCard
                                    key={index}
                                    cardData={element}
                                    currentCard={currentCard}
                                    {...console.log("Element" + element)}
                                    setCurrentCard={setCurrentCard} />
                            )
                        })
                    }
                </div>
            </div>



        </div>

    )
}

export default ExploreMore;