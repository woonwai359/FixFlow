"use client";

import { useRouter } from "next/navigation";


export default function Dashboard(){

    const router = useRouter();


    const stats = [
        {
            label:"รอดำเนินการ",
            count:0,
            icon:"⏳",
            color:"from-pink-100 to-rose-100"
        },
        {
            label:"กำลังดำเนินการ",
            count:0,
            icon:"🛠️",
            color:"from-purple-100 to-pink-100"
        },
        {
            label:"เสร็จสิ้น",
            count:0,
            icon:"✨",
            color:"from-emerald-100 to-teal-100"
        }
    ];


    return (

        <div className="
        min-h-screen
        bg-gradient-to-br
        from-pink-50
        via-white
        to-purple-50
        p-6
        ">


            {/* Navbar */}

            <nav className="
            flex
            justify-between
            items-center
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            p-5
            shadow-lg
            border
            border-pink-100
            ">

                <div className="flex items-center gap-3">


                    <div className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-gradient-to-br
                    from-pink-500
                    to-purple-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-2xl
                    shadow-lg
                    ">
                        🔧
                    </div>


                    <div>

                        <h1 className="
                        text-2xl
                        font-black
                        bg-gradient-to-r
                        from-pink-500
                        to-purple-500
                        bg-clip-text
                        text-transparent
                        ">
                            FixFlow
                        </h1>


                        <p className="text-xs text-gray-400">
                            Smart Repair System
                        </p>

                    </div>


                </div>



                <button
                className="
                px-5
                py-2
                rounded-full
                bg-pink-100
                text-pink-600
                font-semibold
                hover:bg-pink-200
                transition
                "
                >
                    ออกจากระบบ
                </button>


            </nav>





            {/* Welcome */}


            <section
            className="
            mt-8
            relative
            overflow-hidden
            bg-gradient-to-r
            from-pink-500
            to-purple-500
            rounded-3xl
            p-8
            text-white
            shadow-xl
            ">


                <div className="
                absolute
                right-5
                top-5
                text-8xl
                opacity-20
                ">
                    🌸
                </div>



                <h2 className="
                text-3xl
                font-black
                ">
                    สวัสดี Pat 👋
                </h2>


                <p className="
                mt-2
                text-pink-100
                ">
                    ระบบแจ้งซ่อมออนไลน์สำหรับนักศึกษา
                </p>



                <button

                onClick={()=>{
                    router.push("/repair");
                }}

                className="
                mt-6
                bg-white
                text-pink-600
                px-6
                py-3
                rounded-full
                font-bold
                shadow-lg
                hover:scale-105
                transition
                "
                >

                    + แจ้งซ่อมใหม่

                </button>


            </section>







            {/* Menu */}


            <div className="
            grid
            md:grid-cols-2
            gap-6
            mt-8
            ">



                <div
                className="
                bg-white
                rounded-3xl
                p-6
                shadow-md
                border
                border-pink-100
                hover:-translate-y-2
                transition
                "
                >


                    <div className="text-5xl">
                        🔧
                    </div>


                    <h3 className="
                    text-xl
                    font-bold
                    mt-4
                    ">
                        แจ้งซ่อมใหม่
                    </h3>


                    <p className="text-gray-500 mt-2">
                        แจ้งปัญหาอุปกรณ์ อาคาร ห้องเรียน
                        หรือสถานที่เสียหาย
                    </p>


                </div>





                <div
                className="
                bg-white
                rounded-3xl
                p-6
                shadow-md
                border
                border-purple-100
                hover:-translate-y-2
                transition
                "
                >


                    <div className="text-5xl">
                        📋
                    </div>


                    <h3 className="
                    text-xl
                    font-bold
                    mt-4
                    ">
                        รายการของฉัน
                    </h3>


                    <p className="text-gray-500 mt-2">
                        ตรวจสอบสถานะงานซ่อม
                        และประวัติการแจ้งปัญหา
                    </p>


                </div>



            </div>







            {/* Status */}


            <h2 className="
            text-xl
            font-bold
            mt-10
            ">
                สถานะงานซ่อม 💗
            </h2>



            <div className="
            grid
            md:grid-cols-3
            gap-5
            mt-5
            ">


                {
                    stats.map((item,index)=>(


                        <div
                        key={index}
                        className={`
                        rounded-3xl
                        p-6
                        bg-gradient-to-br
                        ${item.color}
                        shadow-md
                        hover:scale-105
                        transition
                        `}
                        >


                            <div className="text-4xl">
                                {item.icon}
                            </div>


                            <p className="
                            mt-4
                            text-gray-600
                            ">
                                {item.label}
                            </p>


                            <h3 className="
                            text-4xl
                            font-black
                            ">
                                {item.count}
                            </h3>


                        </div>


                    ))
                }


            </div>



        </div>

    );

}