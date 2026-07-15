"use client";

import { useState } from "react";
import axios from "axios";

export default function LoginPage(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleLogin = async()=>{

        try{

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );


            localStorage.setItem(
                "token",
                response.data.token
            );


            alert("Login สำเร็จ");


            window.location.href="/dashboard";


        }catch(error){

            alert("Email หรือ Password ไม่ถูกต้อง");

        }

    };


    return(
        <div className="min-h-screen flex items-center justify-center">

            <div className="w-96 space-y-4">

                <h1 className="text-3xl font-bold">
                    FixFlow Login
                </h1>


                <input
                className="border p-2 w-full"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                />


                <input
                className="border p-2 w-full"
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                />


                <button
                className="bg-blue-600 text-white p-2 w-full rounded"
                onClick={handleLogin}
                >
                    Login
                </button>


            </div>

        </div>
    )

}