"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRepairs, getCurrentUser, type Repair } from "../../lib/storage";

const statusStyle: Record<string, { icon: string; badge: string }> = {
  "รอดำเนินการ": {
    icon: "🟡",
    badge: "bg-amber-100 text-amber-700",
  },
  "กำลังดำเนินการ": {
    icon: "🔵",
    badge: "bg-sky-100 text-sky-700",
  },
  "เสร็จสิ้น": {
    icon: "🟢",
    badge: "bg-emerald-100 text-emerald-700",
  },
};

const DEFAULT_STATUS_STYLE = { icon: "⚪", badge: "bg-slate-100 text-slate-700" };

export default function MyRepairPage() {
  const router = useRouter();

  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser(); // 👈 ดึงข้อมูลผู้ใช้ปัจจุบันที่ล็อกอินอยู่

    if (!user) {
      // ถ้าไม่ได้ล็อกอิน ให้เด้งกลับไปหน้า login ทันที
      router.push("/login");
      return;
    }

    const data = getRepairs();
    
    // 👈 กรองรายการแจ้งซ่อมทั้งหมด ให้แสดงเฉพาะรายการที่เป็นของ user.id คนนี้เท่านั้น
    const myData = data.filter((repair: any) => repair.userId === user.id);
    
    setRepairs(myData);
    setLoading(false);
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
        onClick={() => router.push("/dashboard")}
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
          ← กลับหน้าแดชบอร์ด
        </button>

      </nav>

      <h2 className="
        text-3xl
        font-black
        mt-8
        bg-gradient-to-r
        from-cyan-600
        to-emerald-600
        bg-clip-text
        text-transparent
        ">
        📋 รายการของฉัน
      </h2>

      <p className="text-slate-500 mt-1">
        รายการแจ้งซ่อมที่คุณได้ทำการแจ้งไว้
      </p>

      {
        loading
          ? (
            <p className="mt-10 text-slate-400">
              กำลังโหลดข้อมูล...
            </p>
          )
          : repairs.length === 0
          ? (
            <div className="
              mt-10
              bg-white/80
              backdrop-blur-xl
              rounded-3xl
              p-10
              text-center
              shadow-md
              border
              border-cyan-100
              ">
              <div className="text-6xl">📭</div>

              <p className="mt-4 text-slate-500">
                ยังไม่มีรายการแจ้งซ่อม
              </p>

              <button
              onClick={() => router.push("/repair")}
              className="
                mt-6
                bg-gradient-to-r
                from-cyan-500
                to-emerald-500
                text-white
                px-6
                py-3
                rounded-full
                font-bold
                shadow-lg
                hover:scale-105
                hover:shadow-2xl
                transition
                "
              >
                + แจ้งซ่อมใหม่
              </button>
            </div>
          )
          : (
            <div className="
              grid
              md:grid-cols-2
              gap-6
              mt-8
              ">

              {
                repairs.map((repair, index) => {

                  const style = statusStyle[repair.status] ?? DEFAULT_STATUS_STYLE;

                  return (

                    <div
                    key={repair.id}
                    className="
                      bg-white/80
                      backdrop-blur-xl
                      rounded-3xl
                      p-6
                      shadow-md
                      border
                      border-cyan-100
                      hover:-translate-y-1
                      hover:shadow-xl
                      transition
                      duration-300
                      animate-fade-in-up
                      "
                    style={{ animationDelay: `${index * 0.08}s` }}
                    >

                      <div className="flex justify-between items-start">

                        <h3 className="
                          text-xl
                          font-bold
                          text-cyan-700
                          "
                          >
                          {repair.title}
                        </h3>

                        <span className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                          ${style.badge}
                          `}>
                          {style.icon} {repair.status}
                        </span>

                      </div>

                      <p className="text-slate-600 mt-3">
                        <span className="font-semibold">
                          รายละเอียด:
                        </span>{" "}
                        {repair.detail}
                      </p>

                      <p className="text-slate-600 mt-1">
                        <span className="font-semibold">
                          สถานที่:
                        </span>{" "}
                        {repair.location}
                      </p>

                      <p className="text-slate-400 text-sm mt-3">
                        🗓️ แจ้งเมื่อ:{" "}
                        {
                          new Date(repair.createdAt)
                            .toLocaleDateString("th-TH")
                        }
                      </p>

                    </div>

                  );

                })
              }

            </div>
          )
      }

    </div>

  );
}