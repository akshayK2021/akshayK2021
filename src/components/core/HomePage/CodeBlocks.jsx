import React from "react";
import CTAButton from "./Button";
import HighLightText from "./HighLightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";


function CodeBlocks({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) {

    return (
        <div className={`flex  ${position} my-20  items-center mx-auto justify-around w-[75%] gap-10 `}>

            {/*Section1*/}
            <div className={`w-[50%] flex flex-col gap-8 `}>
                {heading}
                <div className={`text-slate-300 font-semibold text-sm`}>
                    {subheading}
                </div>


                <div className="flex flex-row gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">{ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>{ctabtn2.btnText}

                    </CTAButton>

                </div>
            </div>

            {/*Section2*/}
            <div className="h-fit flex flex-row text-[15px] w-[100%] py-4 lg:w-[500px]">
                {/*BgGradient*/}
                <div className="text-center flex flex-col w-[10%] text-slate-400 font-serif font-bold ">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>


                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor}  bg-gradient-radial ${backgroundGradient} via-slate-950 to-slate-950  pr-2`}>
                    <TypeAnimation
                        sequence={[codeblock, 4000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={
                            {
                                whiteSpace: "pre-line",
                                display: "block"
                            }
                        }
                        omitDeletionAnimation={true} />
                </div>
            </div>
        </div>

    );
}

export default CodeBlocks;