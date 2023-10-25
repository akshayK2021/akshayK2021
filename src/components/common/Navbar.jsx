import React, { useEffect, useState } from "react";
import logo from "../../assests/Images/Logo.svg"
import { Link, matchPath } from "react-router-dom";
import NavbarLink from "../data/navbar-links"
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from "../core/HomePage/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const subLinks=[
    {
        title:"Python",
        link:"/catalog/python"
    },
    {
        title:"web dev",
        link:"/catalog/web-development"
    }
];


function Navbar() {
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart)
    const location=useLocation();
   // const [subLinks,setSubLinks]=useState([]);


    
 
        // const fetchSublinks=async()=>{
        //     try{
        //         const result=await apiConnector("GET",categories.CATEGORIES_API);
        //         console.log("Printing sublinks result",result);
        //         setSubLinks(result.data.data);

        //     }catch(err){
        //         console.log("Could not fetch categorie list");
        //     }
        // }
    
        // useEffect(()=>{
        //     fetchSublinks();
        // },[])


    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname);
    }
    return (
        <div className="flex h-14 items-center justify-center border-b-[1px] border-b-slate-100">
            <div className="flex w-[80%] items-center justify-between ">
                {/*image*/}
                <div className="justify-start">
                <Link to='/'>
                    <img src={logo} width={160} height={42} loading="lazy" />
                </Link>
                </div>

                {/*Nav Links*/}
                
                <nav >
                    <ul className="flex gap-x-6 text-slate-50">
                        {
                            NavbarLink.map((link,index)=>(
                                <li key={index}>
                                    {
                                        link.title==="Catalog"? (<div className=" relative flex items-center gap-2 group">
                                            <p>{link.title}</p>
                                            <div className="mt-1">
                                            <IoIosArrowDropdownCircle/>
                                            </div>
                                            <div className="  invisible absolute left-[50%] translate-x-[-50%] translate-y-[40%] top-[50%] flex flex-col rounded-md
                                             bg-slate-50 px-4 py-2 text-slate-950 opacity-0 transition-all duration-200 
                                             group-hover:visible    group-hover:opacity-100 lg:w-[300px]">
                                                <div className="absolute left-[50%]  top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-slate-100">
                                                </div>
                                                {
                                                    subLinks.length? (
                                                        console.log("it is here"+subLinks.length),
                                                    
                                                        subLinks.map((subLink,index)=>(
                                                            <Link key={index} to={`${subLink.link}`}>
                                                                <p className=" text-slate-950">{subLink.title}</p>
                                                            </Link>
                                                        ))
                                                    
                                                    ):(<div></div>)
                                                }
                                            </div>

                                        </div>):(
                                            <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path)? "text-yellow-300":"text-slate-50"}`}>
                                            {link.title}</p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>



                {/*Login/Signup/Dashboard*/}
                <div className="flex gap-x-4 items-center">
                    {
                        user && user?.accountType!="Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart/>
                                {
                                    totalItems>0 && (
                                        <span>
                                        {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token===null && (
                            <Link to="/login">
                                <button className="border border-slate-700 bg-slate-800 px-[10px] py-[4px] text-slate-300 rounded-md">
                                    Log in
                                </button>
                            </Link>

                        )
                    }
                    {
                        token===null && (
                            <Link to="/signup">
                                <button className="border border-slate-700 bg-slate-800 px-[10px] py-[4px] text-slate-300 rounded-md">
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token!==null &&<ProfileDropDown/>

                        
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar