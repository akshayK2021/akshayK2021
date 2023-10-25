import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";

import {login} from "../../../../services/operations/authAPI"


const LoginForm = () => {
   
    const navigate = useNavigate();
    const dispatch=useDispatch();
    
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email,password}=formData

    function changeHandler(event) {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    function submitHandler(event) {
        event.preventDefault();
      dispatch(login(email,password,navigate))
        // console.log(formData)
        // setIsLoggedIn(true);
        // navigate("/dashboard");
    }

    return (
        <form
            onSubmit={submitHandler}
            className="flex flex-col w-full gap-y-4 mt-6"
        >
            <label htmlFor="" className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Email Address
                    <sup className="text-pink-200">*</sup>
                </p>

                <input
                    type="email"
                    required
                    value={email}
                    placeholder="Enter your email address"
                    onChange={changeHandler}
                    name="email"
                    className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-slate-50"
                />
            </label>

            <label  className="w-full relative">
                <p className="text-[0.875rem] text-slate-50 mb-1 leading-[1.375rem]">
                    Password
                    <sup className="text-pink-200">*</sup>
                </p>

                <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    placeholder="Enter Password"
                    onChange={changeHandler}
                    name="password"
                    style={{
                        boxShadow: 'inset 0px -1px 0px rgba(255,255,255,0.28)',
                      }}
                    className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
                />

                <span
                    onClick={() => setShowPassword((prev)=>!prev)}
                    className="absolute right-3 top-[38px] cursor-pointer "
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>

                <Link to="/forgot-password">
                    <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button
            type="submit"
             className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-semibold dark:text-slate-950">
                Sign in
            </button>
        </form>
    );
};

export default LoginForm;
