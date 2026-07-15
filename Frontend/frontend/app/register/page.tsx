"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function RegisterPage() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleRegister = async () => {

        setError("");

        if (!name || !email || !password) {
            setError("กรุณากรอกข้อมูลให้ครบ");
            return;
        }

        if (password !== confirm) {
            setError("รหัสผ่านไม่ตรงกัน");
            return;
        }

        setLoading(true);

        try {

            await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert("สมัครสมาชิกสำเร็จ 🎉");
            router.push("/login");

        } catch (err: any) {

            console.log(err);

            setError(
                err?.response?.data?.message
                ?? "ไม่สามารถสมัครสมาชิกได้"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="
        min-h-screen
        flex
        items-center
        justify-center
        p-6
        animate-fade-in-up
        ">

            <div className="
            w-full
            max-w-md
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            border
            border-cyan-100
            p-8
            ">


                {/* Logo + System name */}

                <div className="flex flex-col items-center text-center">

                    <div className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-500
                    to-emerald-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-3xl
                    shadow-lg
                    hover:rotate-12
                    transition
                    duration-300
                    ">
                        🔧
                    </div>

                    <h1 className="
                    mt-4
                    text-3xl
                    font-black
                    bg-gradient-to-r
                    from-cyan-600
                    to-emerald-600
                    bg-clip-text
                    text-transparent
                    ">
                        FixFlow
                    </h1>

                    <p className="text-sm text-slate-500 mt-1">
                        สมัครสมาชิกใหม่
                    </p>

                </div>



                {/* Error message */}

                {
                    error && (
                        <div className="
                        mt-6
                        bg-red-50
                        border
                        border-red-200
                        text-red-600
                        text-sm
                        rounded-xl
                        p-3
                        text-center
                        animate-pop
                        ">
                            {error}
                        </div>
                    )
                }



                {/* Form */}

                <div className="mt-6 space-y-4">


                    {/* Name */}

                    <div>
                        <label className="text-sm font-semibold text-slate-600">
                            ชื่อ-นามสกุล
                        </label>

                        <div className="relative mt-2">

                            <span className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            ">
                                🪪
                            </span>

                            <input
                            type="text"
                            className="
                            w-full
                            border
                            border-slate-200
                            rounded-xl
                            pl-10
                            pr-3
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-400
                            transition
                            "
                            placeholder="ชื่อของคุณ"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />

                        </div>
                    </div>



                    {/* Email */}

                    <div>
                        <label className="text-sm font-semibold text-slate-600">
                            Email
                        </label>

                        <div className="relative mt-2">

                            <span className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            ">
                                ✉️
                            </span>

                            <input
                            type="email"
                            className="
                            w-full
                            border
                            border-slate-200
                            rounded-xl
                            pl-10
                            pr-3
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-400
                            transition
                            "
                            placeholder="you@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                    </div>



                    {/* Password */}

                    <div>
                        <label className="text-sm font-semibold text-slate-600">
                            รหัสผ่าน
                        </label>

                        <div className="relative mt-2">

                            <span className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            ">
                                🔒
                            </span>

                            <input
                            type="password"
                            className="
                            w-full
                            border
                            border-slate-200
                            rounded-xl
                            pl-10
                            pr-3
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-400
                            transition
                            "
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>
                    </div>



                    {/* Confirm password */}

                    <div>
                        <label className="text-sm font-semibold text-slate-600">
                            ยืนยันรหัสผ่าน
                        </label>

                        <div className="relative mt-2">

                            <span className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            ">
                                🔒
                            </span>

                            <input
                            type="password"
                            className="
                            w-full
                            border
                            border-slate-200
                            rounded-xl
                            pl-10
                            pr-3
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-400
                            transition
                            "
                            placeholder="••••••••"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleRegister();
                            }}
                            />

                        </div>
                    </div>



                    {/* Submit */}

                    <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="
                    w-full
                    bg-gradient-to-r
                    from-cyan-500
                    to-emerald-500
                    text-white
                    py-3
                    rounded-xl
                    font-bold
                    shadow-lg
                    hover:scale-[1.02]
                    hover:shadow-2xl
                    transition
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    "
                    >
                        {
                            loading
                            ? "กำลังสมัครสมาชิก..."
                            : "สมัครสมาชิก"
                        }
                    </button>


                </div>



                {/* Login link */}

                <p className="text-center text-sm text-slate-500 mt-6">
                    มีบัญชีแล้ว?{" "}
                    <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="
                    text-cyan-600
                    font-semibold
                    hover:text-emerald-600
                    hover:underline
                    transition
                    "
                    >
                        เข้าสู่ระบบ
                    </button>
                </p>


            </div>

        </div>

    );

}
