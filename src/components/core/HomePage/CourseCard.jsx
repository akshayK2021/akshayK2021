// import React from "react";
// import {IoMdContacts} from "react-icons/io"
// import {MdPlayLesson} from "react-icons/md"


// const CourseCard=({cardData,currentCard,setCurrentCard})=>{
//     console.log("cardData"+cardData.heading)
//     console.log("Current"+currentCard)
    
//     return(
//         <div onClick={()=>setCurrentCard(cardData.heading)} className={`w-[22%] h-full flex flex-col  justify-center mb-10   ${cardData.heading==currentCard?" bg-slate-50 hover:bg-white text-black": "bg-gray-800 dark:bg-gray-800 hover:bg-slate-700 text-white"} block max-w-sm p-6   translate-x-0 hover:w-[27%]  translate-y-0  duration-500  border border-gray-200 rounded-lg shadow   dark:border-gray-700 dark:hover:bg-gray-700`}>
//             <div className="">
                
//                 <p className=" font-bold text-lg ">{cardData.heading}</p>
//                 <p>{cardData.description}</p>
//             </div>
//             <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 w-[60%] mx-auto" ></hr>
//             <div className="w-full h-[4rem] bg-white-200"></div>
//             <div className="flex flex-row justify-between">
//                 <div className="flex flex-row items-center">
//                     <div className="text-lg"><IoMdContacts/></div>
//                     <div>{cardData.level}</div>

//                 </div>
//                 <div  className="flex flex-row items-center">
//                     <div className="text-lg"><MdPlayLesson/></div>
//                     <div>{cardData.lessonNumber}<span> Lessons</span></div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default CourseCard;

import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div
      className=  {`w-[360px] lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800"
      }  text-richblack-25 h-[300px] box-border cursor-pointer maindiv  max-auto `}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className=" border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={` ${
            currentCard === cardData?.heading && "text-richblack-800"
          } font-semibold text-[20px] `}
        >
          {cardData?.heading}
        </div>

        <div className="text-richblack-400">{cardData?.description}</div>
      </div>

      <div
        className={`flex justify-between ${
          currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
        } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;