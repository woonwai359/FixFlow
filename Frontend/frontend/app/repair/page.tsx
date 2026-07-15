"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function RepairPage(){

    const router = useRouter();


    const [title,setTitle] = useState("");
    const [detail,setDetail] = useState("");
    const [location,setLocation] = useState("");



    const handleSubmit = async()=>{


        try{


            const token = localStorage.getItem("token");


            await axios.post(

                "http://localhost:5000/api/repairs",

                {
                    title,
                    detail,
                    location
                },

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );


            alert("แจ้งซ่อมสำเร็จ 💗");


            router.push("/dashboard");



        }catch(error){

            console.log(error);

            alert("เกิดข้อผิดพลาดในการแจ้งซ่อม");

        }


    };





    return(

        <div className="
        min-h-screen
        bg-gradient-to-br
        from-pink-50
        via-white
        to-purple-50
        p-6
        ">


            <div className="
            max-w-xl
            mx-auto
            bg-white
            rounded-3xl
            shadow-xl
            p-8
            border
            border-pink-100
            ">


                <h1 className="
                text-3xl
                font-black
                text-pink-600
                ">
                    🔧 แจ้งซ่อมใหม่
                </h1>


                <p className="
                text-gray-500
                mt-2
                ">
                    แจ้งปัญหาเพื่อให้เจ้าหน้าที่ดำเนินการ
                </p>





                <label className="
                block
                mt-6
                font-semibold
                ">
                    หัวข้อปัญหา
                </label>


                <input

                className="
                mt-2
                w-full
                rounded-xl
                border
                p-3
                focus:ring-2
                focus:ring-pink-300
                "

                placeholder="เช่น แอร์เสีย ไฟดับ"

                onChange={(e)=>
                    setTitle(e.target.value)
                }

                />





                <label className="
                block
                mt-4
                font-semibold
                ">
                    รายละเอียด
                </label>


                <textarea

                className="
                mt-2
                w-full
                h-32
                rounded-xl
                border
                p-3
                "

                placeholder="อธิบายปัญหาเพิ่มเติม"

                onChange={(e)=>
                    setDetail(e.target.value)
                }

                />





                <label className="
                block
                mt-4
                font-semibold
                ">
                    สถานที่
                </label>


                <input

                className="
                mt-2
                w-full
                rounded-xl
                border
                p-3
                "

                placeholder="เช่น อาคารวิทยาศาสตร์ ห้อง 301"

                onChange={(e)=>
                    setLocation(e.target.value)
                }

                />





                <button

                onClick={handleSubmit}

                className="
                mt-6
                w-full
                rounded-xl
                bg-gradient-to-r
                from-pink-500
                to-purple-500
                text-white
                py-3
                font-bold
                hover:scale-105
                transition
                "

                >

                    ส่งแจ้งซ่อม 💗

                </button>



            </div>


        </div>

    );

}