import Link from "next/link";

const features = [
  {
    icon: "🛠️",
    title: "แจ้งปัญหาได้ง่าย",
    desc: "กรอกหัวข้อ รายละเอียด และสถานที่ เพียงไม่กี่คลิก",
  },
  {
    icon: "📡",
    title: "ติดตามสถานะ",
    desc: "ดูสถานะ รอดำเนินการ / กำลังดำเนินการ / เสร็จสิ้น แบบเรียลไทม์",
  },
  {
    icon: "⚙️",
    title: "จัดการงานซ่อม",
    desc: "ย้อนดูประวัติการแจ้งซ่อมของคุณทั้งหมดในที่เดียว",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white text-xl shadow-lg">
            🔧
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            FixFlow
          </span>
        </div>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-5 py-2 rounded-full font-semibold text-cyan-700 hover:bg-cyan-100 transition"
          >
            เข้าสู่ระบบ
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            สมัครสมาชิก
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-4xl mx-auto animate-fade-in-up">
        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold mb-6">
          🚀 ระบบแจ้งซ่อมออนไลน์สำหรับนักศึกษา
        </span>

        <h1 className="text-5xl md:text-7xl font-black leading-tight">
          <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
            FixFlow
          </span>
          <br />
          แจ้งซ่อมง่าย ๆ ทันใจ
        </h1>

        <p className="mt-6 text-lg text-slate-500 max-w-xl">
          แจ้งปัญหา ติดตามสถานะ และจัดการงานซ่อมได้ครบในที่เดียว
          งานซ่อมของคุณจะถูกจัดการอย่างมีระบบ
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/register"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition"
          >
            เริ่มต้นใช้งาน →
          </Link>
          <Link
            href="/login"
            className="px-8 py-3.5 rounded-full bg-white/80 backdrop-blur border border-cyan-200 text-cyan-700 font-bold text-lg shadow hover:scale-105 transition"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-24 grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-7 shadow-lg border border-cyan-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="text-5xl">{f.icon}</div>
            <h3 className="text-xl font-bold mt-4 text-slate-800">{f.title}</h3>
            <p className="text-slate-500 mt-2">{f.desc}</p>
          </div>
        ))}
      </section>

    </main>
  );
}
