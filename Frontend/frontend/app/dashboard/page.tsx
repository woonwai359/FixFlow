"use client";

import { useCallback, useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRepairs, getCurrentUser, type Repair } from "../../lib/storage";

export default function Dashboard() {
  const router = useRouter();

  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    
    if (!user) {
      // 👈 ป้องกันคนไม่ได้ Login แอบเข้ามา โดยให้เด้งกลับไปหน้า Login
      router.push("/login");
      return;
    }

    setUserName(user.name);

    const data = getRepairs();
    
    // 👈 จุดสำคัญ: กรองสถิติข้อมูลแจ้งซ่อมทั้งหมด ให้เอาเฉพาะที่เป็นของ user คนปัจจุบันเท่านั้น
    const myData = data.filter((repair: any) => repair.userId === user.id);
    
    setRepairs(myData);
    setLoading(false);
  }, [router]);

  const countByStatus = (status: string) =>
    repairs.filter((r) => r.status === status).length;

  const stats = useMemo(() => [
    {
      label: "รอดำเนินการ",
      count: countByStatus("รอดำเนินการ"),
      icon: "⏳",
      color: "from-cyan-100 to-sky-100",
    },
    {
      label: "กำลังดำเนินการ",
      count: countByStatus("กำลังดำเนินการ"),
      icon: "🛠️",
      color: "from-teal-100 to-cyan-100",
    },
    {
      label: "เสร็จสิ้น",
      count: countByStatus("เสร็จสิ้น"),
      icon: "✨",
      color: "from-emerald-100 to-teal-100",
    },
  ], [repairs]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    router.push("/login");
  }, [router]);

  const handleNewRepair = useCallback(() => {
    router.push("/repair");
  }, [router]);

  const handleMyRepair = useCallback(() => {
    router.push("/my-repair");
  }, [router]);

  return (

    <div className="
      min-h-screen
      p-6
      ">

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
        border-cyan-100
        ">

        <div className="flex items-center gap-3">

          <div className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-br
            from-cyan-500
            to-emerald-500
            flex
            items-center
            justify-center
            text-white
            text-2xl
            shadow-lg
            hover:rotate-12
            transition
            duration-300
            ">
            🔧
          </div>

          <div>

            <h1 className="
              text-2xl
              font-black
              bg-gradient-to-r
              from-cyan-600
              to-emerald-600
              bg-clip-text
              text-transparent
              ">
              FixFlow
            </h1>

            <p className="text-xs text-slate-400">
              Smart Repair System
            </p>

          </div>

        </div>

        <button
        onClick={handleLogout}
        className="
          px-5
          py-2
          rounded-full
          bg-cyan-100
          text-cyan-700
          font-semibold
          hover:bg-cyan-200
          hover:scale-105
          transition
          "
        >
          ออกจากระบบ
        </button>

      </nav>

      <section
      className="
        mt-8
        relative
        overflow-hidden
        bg-gradient-to-r
        from-cyan-500
        to-emerald-500
        rounded-3xl
        p-8
        text-white
        shadow-xl
        animate-fade-in-up
        ">

        <div className="
          absolute
          right-5
          top-5
          text-8xl
          opacity-20
          ">
          🌊
        </div>

        <h2 className="
          text-3xl
          font-black
          ">
          สวัสดี {userName || "นักศึกษา"} 👋
        </h2>

        <p className="
          mt-2
          text-cyan-50
          ">
          ระบบแจ้งซ่อมออนไลน์สำหรับนักศึกษา
        </p>

        <button
        onClick={handleNewRepair}
        className="
          mt-6
          bg-white
          text-cyan-600
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

      <div className="
        grid
        md:grid-cols-2
        gap-6
        mt-8
        ">

        <div
        onClick={handleNewRepair}
        className="
          cursor-pointer
          bg-white/80
          backdrop-blur-xl
          rounded-3xl
          p-6
          shadow-md
          border
          border-cyan-100
          hover:-translate-y-2
          hover:shadow-2xl
          transition
          duration-300
          "
        >

          <div className="text-5xl">🔧</div>

          <h3 className="
            text-xl
            font-bold
            mt-4
            text-slate-800
            ">
            แจ้งซ่อมใหม่
          </h3>

          <p className="text-slate-500 mt-2">
            แจ้งปัญหาอุปกรณ์ อาคาร ห้องเรียน
            หรือสถานที่เสียหาย
          </p>

        </div>

        <div
        onClick={handleMyRepair}
        className="
          cursor-pointer
          bg-white/80
          backdrop-blur-xl
          rounded-3xl
          p-6
          shadow-md
          border
          border-teal-100
          hover:-translate-y-2
          hover:shadow-2xl
          transition
          duration-300
          "
        >

          <div className="text-5xl">📋</div>

          <h3 className="
            text-xl
            font-bold
            mt-4
            text-slate-800
            ">
            รายการของฉัน
          </h3>

          <p className="text-slate-500 mt-2">
            ตรวจสอบสถานะงานซ่อม
            และประวัติการแจ้งปัญหา
          </p>

        </div>

      </div>

      <h2 className="
        text-xl
        font-bold
        mt-10
        text-slate-700
        ">
        สถานะงานซ่อม 💙
      </h2>

      {
        loading
          ? (
            <p className="mt-5 text-slate-400">
              กำลังโหลดข้อมูล...
            </p>
          )
          : (
            <div className="
              grid
              md:grid-cols-3
              gap-5
              mt-5
              ">

              {
                stats.map((item, index) => (

                  <div
                  key={index}
                  className={`
                    rounded-3xl
                    p-6
                    bg-gradient-to-br
                    ${item.color}
                    shadow-md
                    hover:scale-105
                    hover:shadow-xl
                    transition
                    duration-300
                    `}
                  >

                    <div className="text-4xl">
                      {item.icon}
                    </div>

                    <p className="
                      mt-4
                      text-slate-600
                      ">
                      {item.label}
                    </p>

                    <h3 className="
                      text-4xl
                      font-black
                      text-slate-800
                      ">
                      {item.count}
                    </h3>

                  </div>

                ))
              }

            </div>
          )
      }

    </div>

  );
}