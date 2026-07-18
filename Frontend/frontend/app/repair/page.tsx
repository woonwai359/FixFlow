"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, saveRepair, getCurrentUser, type Repair } from "../../lib/storage";

export default function RepairPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    detail: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = getToken();
      const user = getCurrentUser(); // 👈 ดึงข้อมูลผู้ใช้งานที่ล็อกอินอยู่ในปัจจุบันมาใช้งาน

      if (!token || !user) {
        alert("กรุณาเข้าสู่ระบบก่อนแจ้งซ่อม");
        router.push("/login");
        return;
      }

      const newRepair: Repair & { userId?: string } = {
        id: crypto.randomUUID(),
        title: form.title,
        detail: form.detail,
        location: form.location,
        status: "รอดำเนินการ",
        userId: user.id, // 👈 จุดสำคัญ: ผูก ID ของคนที่แอดข้อมูลเข้าไปในระบบ จะได้ไม่ไปปนกับบัญชีอื่น
        createdAt: new Date().toISOString(),
      };

      saveRepair(newRepair as Repair);

      alert("แจ้งซ่อมสำเร็จ 🎉");

      router.push("/dashboard");

    } catch {
      alert("เกิดข้อผิดพลาดในการแจ้งซ่อม");
    } finally {
      setLoading(false);
    }
  }, [form, router]);

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
        bg-white/80
        w-full
        max-w-xl
        rounded-3xl
        shadow-2xl
        border
        border-cyan-100
        p-8
        backdrop-blur-xl
        ">

        <div className="flex items-center gap-3 mb-6">

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
            ">
            🔧
          </div>

          <h1 className="
            text-3xl
            font-bold
            bg-gradient-to-r
            from-cyan-600
            to-emerald-600
            bg-clip-text
            text-transparent
            ">
            แจ้งซ่อมใหม่
          </h1>

        </div>

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

          <div>
            <label className="font-semibold text-slate-700">
              หัวข้อปัญหา
            </label>

            <input
                className="
                  w-full
                  mt-2
                  border
                  border-slate-200
                  rounded-xl
                  p-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                  transition
                  "
                placeholder="เช่น แอร์เสีย"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value
                  })
                }
              />
          </div>

          <div>
            <label className="font-semibold text-slate-700">
              รายละเอียด
            </label>

            <textarea
                className="
                  w-full
                  mt-2
                  border
                  border-slate-200
                  rounded-xl
                  p-3
                  h-32
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                  transition
                  "
                placeholder="อธิบายปัญหา"
                value={form.detail}
                onChange={(e) =>
                  setForm({
                    ...form,
                    detail: e.target.value
                  })
                }
              />
          </div>

          <div>
            <label className="font-semibold text-slate-700">
              สถานที่
            </label>

            <input
                className="
                  w-full
                  mt-2
                  border
                  border-slate-200
                  rounded-xl
                  p-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                  transition
                  "
                placeholder="เช่น อาคาร CS ห้อง 201"
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value
                  })
                }
              />
          </div>

          <button
              disabled={loading}
              className="
                w-full
                bg-gradient-to-r
                from-cyan-500
                to-emerald-500
                text-white
                rounded-xl
                py-3
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
                  ? "กำลังส่ง..."
                  : "ส่งแจ้งซ่อม"
              }
            </button>

        </form>

      </div>

    </div>

  );

}