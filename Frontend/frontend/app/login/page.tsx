"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  findUserByEmail,
  setCurrentUser,
  setToken,
  type User,
} from "../../lib/storage";

export const logout = () => {
  clearSession();
  window.location.href = "/login";
};

function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const user = findUserByEmail(email);

      if (!user) {
        setError("ไม่พบบัญชีผู้ใช้นี้");
        return;
      }

      if (user.password !== password) {
        setError("รหัสผ่านไม่ถูกต้อง");
        return;
      }

      setToken("mock-token-" + user.id);
      setCurrentUser(user);

      router.push("/dashboard");
    } catch {
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = () => {
    alert("ฟังก์ชันนี้กำลังพัฒนา");
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
            ระบบแจ้งซ่อมออนไลน์
          </p>

          <p className="text-xs text-slate-400 mt-1">
            แจ้งปัญหา ติดตามสถานะ และจัดการงานซ่อม
          </p>

        </div>

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

        <div className="mt-6 space-y-4">

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

          <div>
            <label className="text-sm font-semibold text-slate-600">
              Password
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
              type={showPassword ? "text" : "password"}
              className="
                w-full
                border
                border-slate-200
                rounded-xl
                pl-10
                pr-10
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400
                transition
                "
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
              />

              <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                hover:text-slate-600
                transition
                "
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>
          </div>

          <div className="text-right">
            <button
            type="button"
            onClick={handleForgot}
            className="
              text-sm
              text-cyan-600
              hover:text-emerald-600
              hover:underline
              transition
              "
            >
              ลืมรหัสผ่าน?
            </button>
          </div>

          <button
          onClick={handleLogin}
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
                ? "กำลังเข้าสู่ระบบ..."
                : "เข้าสู่ระบบ"
            }
          </button>

        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          ยังไม่มีบัญชี?{" "}
          <button
          type="button"
          onClick={() => router.push("/register")}
          className="
            text-cyan-600
            font-semibold
            hover:text-emerald-600
            hover:underline
            transition
            "
          >
            สมัครสมาชิก
          </button>
        </p>

      </div>

    </div>
  );

}
