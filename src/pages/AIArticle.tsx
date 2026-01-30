import React, { useState, useEffect } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Cpu, 
  BookOpen, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  History,
  Terminal,
  RefreshCcw,
  Sparkles as SparkleIcon,
  Image as ImageIcon,
  Layers,
  ShieldAlert,
  Play,
  Calendar,
  Clock,
  GraduationCap
} from "lucide-react";

// --- Types ---

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  },
};

const textTypeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.05 } 
  }
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 }
};

// --- Data ---

const aiAdvantages = [
  "Lebih bersifat permanen (tidak pelupa).",
  "Mudah diduplikasi & disebarkan (transfer knowledge instan).",
  "Lebih murah dibanding tenaga ahli manusia jangka panjang.",
  "Konsisten dan teliti.",
  "Dapat didokumentasi dan dilacak keputusannya.",
  "Mengerjakan task lebih cepat dan lebih baik."
];

const naturalAdvantages = [
  "Kreatif (bisa menambah pengetahuan sendiri).",
  "Menggunakan pengalaman secara langsung (bukan input simbolik).",
  "Pemikiran luas (AI sangat terbatas pada domainnya)."
];

const comparisonTable = [
  { aspect: "Fokus Pemrosesan", ai: "Simbolik / Numerik", conv: "Data & Informasi" },
  { aspect: "Pencarian", ai: "Heuristik", conv: "Algoritma" },
  { aspect: "Sifat Input", ai: "Bisa tidak lengkap", conv: "Harus lengkap" },
  { aspect: "Keterangan", ai: "Disediakan", conv: "Biasanya tidak disediakan" },
  { aspect: "Struktur", ai: "Kontrol dipisah dari knowledge", conv: "Kontrol terintegrasi data" },
  { aspect: "Sifat Output", ai: "Kuantitatif", conv: "Kualitatif" },
  { aspect: "Menalar", ai: "Ya", conv: "Tidak" },
];

// Data Kelas UNAI (Mockup Semester Genap 2025/2026)
const unaiClasses = [
  {
    code: "TIF-3210",
    name: "Kecerdasan Buatan (Teori)",
    sks: "3 SKS",
    lecturer: "Idhawati Hestiningsih, M.Kom",
    schedule: "Selasa, 09:30 - 12:00",
    room: "Lab Komputer 3 (Gedung Alumni)"
  },
  {
    code: "TIF-3211",
    name: "Praktikum AI",
    sks: "1 SKS",
    lecturer: "Tim Asisten Dosen",
    schedule: "Kamis, 14:00 - 16:30",
    room: "Lab Software Engineering"
  },
  {
    code: "TIF-4120",
    name: "Machine Learning (Lanjut)",
    sks: "3 SKS",
    lecturer: "Dr. Tech Team",
    schedule: "Rabu, 07:30 - 10:00",
    room: "Smart Class Room A"
  }
];

// --- Sub-Components ---

const BackgroundSparkles = () => {
  const [stars, setStars] = useState<{top: string, left: string, delay: number}[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 30 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20"
          style={{ top: star.top, left: star.left }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: star.delay }}
        />
      ))}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]" />
    </div>
  );
};

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ElementType }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
    {Icon && <Icon className="w-8 h-8 text-blue-500" />}
    {children}
  </h2>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    className={`bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

// --- Interactive Expert System Component ---
const InteractiveExpertSystem = () => {
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = [
    "Apakah Anda demam?",
    "Apakah Anda sakit kepala?",
    "Apakah nyeri saat berbicara/menelan?",
    "Apakah Anda batuk?",
    "Apakah nyeri tenggorokan?",
    "Apakah selaput lendir merah & bengkak?"
  ];

  const handleAnswer = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setStep(0);
    setFinished(false);
  };

  return (
    <div className="mt-4 bg-black/50 border border-green-900/50 rounded-lg p-6 font-mono text-sm shadow-inner">
      <div className="flex items-center gap-2 text-green-500 mb-4 border-b border-green-900/30 pb-2">
        <Terminal size={16} />
        <span>Sistem Pakar: Diagnosa THT v1.0</span>
      </div>

      <div className="h-32 flex flex-col justify-center items-start space-y-4">
        {!finished ? (
          <motion.div 
            key={step} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="w-full"
          >
            <p className="text-slate-300 mb-4 text-lg">
              <span className="text-blue-500 mr-2">?</span>
              {questions[step]}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={handleAnswer} 
                className="px-4 py-2 bg-green-900/30 hover:bg-green-600 text-green-400 hover:text-white rounded border border-green-700 transition-colors"
              >
                YA (Yes)
              </button>
              <button 
                onClick={reset} 
                className="px-4 py-2 bg-red-900/30 hover:bg-red-600 text-red-400 hover:text-white rounded border border-red-700 transition-colors"
              >
                TIDAK (No)
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="text-center w-full"
          >
            <p className="text-green-400 font-bold text-xl mb-2 animate-pulse">
              HASIL: ANDA MENDERITA TONSILITIS
            </p>
            <button 
              onClick={reset}
              className="mt-2 text-slate-500 hover:text-white flex items-center gap-2 mx-auto text-xs"
            >
              <RefreshCcw size={12}/> Ulangi Diagnosa
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- Main Component ---

export default function AIArticleDark() {
  const [activeTab, setActiveTab] = useState<'ai' | 'natural'>('ai');

  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-purple-500 selection:text-white relative">
      <BackgroundSparkles />
      
      {/* --- HERO SECTION --- */}
      <header className="relative z-10 pt-10 pb-16 px-6 text-center">
        
        {/* LOGO UNAI PLACEHOLDER */}
        <div className="flex justify-center mb-8">
           <div className="relative group cursor-pointer">
              {/* Ganti src ini dengan URL Logo UNAI yang valid jika ada */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/9/97/Logo-Unai.png" 
                alt="Logo UNAI" 
                className="h-24 w-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform duration-300"
                // Fallback jika gambar error/tidak ada
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.classList.remove('hidden');
                }}
              />
              <div className="hidden h-24 w-24 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-slate-400">
                LOGO UNAI
              </div>
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-blue-400 text-xs font-bold mb-6 tracking-wide uppercase">
            <SparkleIcon size={12} /> Materi Kuliah Bab 1
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white">
            Pengantar <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Kecerdasan Buatan
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Mempelajari bagaimana mesin berpikir, belajar, dan bertindak layaknya manusia.
            <br/><span className="text-slate-600 text-sm mt-2 block">Pengampu: Yusran Tarihoran</span>
          </p>


        </motion.div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-24 relative z-10 space-y-24">

        {/* 1. Definisi */}
        <section>
          <Card>
            <SectionTitle icon={Brain}>Definisi AI</SectionTitle>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-slate-800 to-transparent border-l-4 border-blue-500">
                  <h3 className="text-white font-bold text-lg mb-1">Konsep Dasar</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Bagian ilmu komputer untuk membuat mesin melakukan pekerjaan seperti dan sebaik manusia.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">John McCarthy (1956)</h3>
                  <p className="text-slate-400 italic">
                    "Memodelkan proses berpikir manusia dan mendesain mesin agar dapat menirukan perilaku manusia."
                  </p>
                </div>
                {/* Tempat Gambar 1: Ilustrasi Definisi AI */}
                 <img src="https://media1.tenor.com/m/7EhQ5gueCnoAAAAd/brain-damage-cat.gif" className="w-50 h-auto rounded-lg shadow-lg" alt="Definisi AI" />
              </div>

              {/* Diagram Visual */}
              <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-4">
                <div className="text-center mb-4">
                  <span className="text-xs font-mono text-purple-400">AGAR MESIN CERDAS</span>
                </div>
                <div className="flex items-center gap-4 w-full justify-center">
                  <div className="flex flex-col items-center gap-2 p-3 bg-slate-900 rounded-lg border border-slate-700 w-24 text-center">
                    <Database size={20} className="text-blue-500"/>
                    <span className="text-[10px] font-bold">Basis Pengetahuan</span>
                  </div>
                  <span className="text-xl text-slate-600">+</span>
                  <div className="flex flex-col items-center gap-2 p-3 bg-slate-900 rounded-lg border border-slate-700 w-24 text-center">
                    <Cpu size={20} className="text-purple-500"/>
                    <span className="text-[10px] font-bold">Motor Inferensi</span>
                  </div>
                </div>
                <ArrowRight className="rotate-90 md:rotate-0 text-slate-600 my-2" />
                <div className="px-6 py-2 bg-green-900/20 text-green-400 border border-green-800 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                  Output / Solusi Cerdas
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* 2. AI vs Natural (Interactive Tabs) */}
        <section>
          <div className="flex flex-col items-center mb-8">
            <SectionTitle icon={BookOpen}>Perbandingan Kecerdasan</SectionTitle>
            <div className="flex p-1 bg-slate-900 rounded-full border border-slate-800">
              <button 
                onClick={() => setActiveTab('ai')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'ai' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Kecerdasan Buatan
              </button>
              <button 
                onClick={() => setActiveTab('natural')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'natural' ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Kecerdasan Alami
              </button>
            </div>
          </div>

          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === 'ai' ? (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-blue-900/50 bg-blue-950/20">
                    <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                      <Cpu className="w-6 h-6"/> Kelebihan Kecerdasan Buatan
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {aiAdvantages.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="natural"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-green-900/50 bg-green-950/20">
                    <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                      <Brain className="w-6 h-6"/> Kelebihan Kecerdasan Alami
                    </h3>
                    <div className="space-y-4">
                      {naturalAdvantages.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-slate-300 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 3. Table Comparison */}
        <section>
          <Card>
            <SectionTitle>AI vs Program Konvensional</SectionTitle>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <div className="overflow-hidden rounded-xl border border-slate-800">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider">
                          <th className="p-4 border-b border-slate-800">Aspek</th>
                          <th className="p-4 border-b border-slate-800 text-blue-400">Kecerdasan Buatan</th>
                          <th className="p-4 border-b border-slate-800">Program Konvensional</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-sm">
                        {comparisonTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/50 transition-colors group">
                            <td className="p-4 font-medium text-slate-500 group-hover:text-slate-300">{row.aspect}</td>
                            <td className="p-4 text-blue-300 font-semibold">{row.ai}</td>
                            <td className="p-4 text-slate-400">{row.conv}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex flex-col justify-center">
                 {/* Tempat Gambar 2 */}
                 <img src="https://i.pinimg.com/736x/df/85/c3/df85c37286fb943cb6475df494e443a3.jpg" className="w-full h-auto rounded-lg shadow-lg border border-slate-700" alt="Diagram: Algoritma vs Heuristik" />
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Bahasa Pemrograman AI khusus: LISP dan PROLOG.</span>
            </div>
          </Card>
        </section>

        {/* 4. Interactive History */}
        <section>
          <Card>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <SectionTitle icon={History}>Turing Test (1950)</SectionTitle>
                <p className="text-slate-400 leading-relaxed mb-4 text-justify">
                  <strong>Alan Turing</strong> membuat standar kecerdasan: Jika operator manusia tidak bisa membedakan apakah dia berbicara dengan mesin atau manusia lain, maka mesin tersebut dianggap <strong>cerdas</strong>. Konsep ini menjadi fondasi filosofis bagi pengembangan AI modern. Tes ini menantang mesin untuk menunjukkan perilaku linguistik yang tidak dapat dibedakan dari manusia.
                </p>
                <div className="p-4 bg-yellow-900/10 border border-yellow-700/30 rounded-lg text-yellow-200/80 text-sm italic mb-4">
                  "Can machines think?" - Alan Turing
                </div>
                {/* Tempat Gambar 3 */}
                <img src="https://cdn.botpenguin.com/assets/website/image_cba1ee530b.png" className="w-full h-auto rounded-lg shadow-lg opacity-80" alt="Turing Test" />
              </div>
              
              <div className="flex-1 bg-slate-950 rounded-lg p-4 font-mono text-sm border-t-2 border-slate-800 shadow-lg relative h-fit">
                 <div className="absolute top-2 right-2 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"/>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                    <div className="w-2 h-2 rounded-full bg-green-500"/>
                 </div>
                 <motion.div 
                   variants={textTypeVariants}
                   initial="hidden"
                   whileInView="visible"
                   viewport={{ once: true }}
                   className="space-y-2 mt-4"
                 >
                    <div className="text-slate-500">Connecting to Remote Terminal...</div>
                    <div className="flex gap-2">
                      <span className="text-green-500 font-bold">User:</span>
                      <motion.span variants={letterVariants}>Halo, apa kabar?</motion.span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-500 font-bold">AI:</span>
                      <motion.span variants={letterVariants}>Saya baik. Cuaca mendung ya?</motion.span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-500 font-bold">User:</span>
                      <motion.span variants={letterVariants}>Apakah kamu manusia?</motion.span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-500 font-bold">AI:</span>
                      <motion.span variants={letterVariants}>Tentu saja. Kenapa bertanya?</motion.span>
                    </div>
                 </motion.div>
              </div>
            </div>
          </Card>
        </section>

        {/* --- KLASIFIKASI AI --- */}
        <section>
          <Card>
            <SectionTitle icon={Layers}>Klasifikasi Kecerdasan Buatan</SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <p className="text-slate-400 leading-relaxed text-justify">
                  Kecerdasan Buatan sering dikategorikan berdasarkan kemampuannya. Saat ini, sebagian besar AI yang kita gunakan sehari-hari berada pada level <strong>Weak AI</strong> (AI Lemah), yang dirancang untuk tugas spesifik. Di masa depan, tujuan peneliti adalah mencapai <strong>Strong AI</strong> (AGI) yang memiliki kesadaran dan kemampuan kognitif umum setara manusia.
                </p>
                <div className="space-y-4 mt-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="text-white font-bold">Weak AI (Narrow AI)</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      Sistem AI yang dirancang dan dilatih untuk tugas tertentu. Contoh: Siri, Google Assistant, Rekomendasi Netflix, dan Sistem Pakar.
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
                    <h4 className="text-white font-bold">Strong AI (AGI)</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      Sistem AI dengan kemampuan kognitif umum. Mesin ini memiliki kecerdasan setara manusia, memiliki kesadaran diri, dan kemampuan memecahkan masalah yang belum pernah dipelajari sebelumnya.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                 {/* Tempat Gambar 4 */}
                <img src="https://smartcompliance.co/wp-content/uploads/2019/02/SCInfographicforoldblogpost-TK229838-01.jpg" className="w-full h-auto rounded-lg shadow-lg" alt="Infografis AI" />
              </div>
            </div>
          </Card>
        </section>

        {/* --- CABANG ILMU AI --- */}
        <section>
          <Card>
            <SectionTitle icon={BookOpen}>Cabang Utama Ilmu AI</SectionTitle>
            <p className="text-slate-400 mb-6">
              AI bukan hanya satu teknologi tunggal, melainkan payung besar yang menaungi berbagai sub-disiplin ilmu yang saling berkaitan:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-colors">
                <h4 className="text-blue-400 font-bold mb-2">Machine Learning</h4>
                <p className="text-sm text-slate-400 mb-4 h-20">
                  Kemampuan mesin untuk belajar dari data tanpa diprogram secara eksplisit. Termasuk di dalamnya Deep Learning dan Neural Networks.
                </p>
                {/* Tempat Gambar 5 */}
                <img src="https://media1.tenor.com/m/h6NgT9WnDUIAAAAC/lock-in.gif" className="w-full h-32 object-cover rounded-lg" alt="Machine Learning" />
              </div>

              <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 hover:border-purple-500/50 transition-colors">
                <h4 className="text-purple-400 font-bold mb-2">Computer Vision</h4>
                <p className="text-sm text-slate-400 mb-4 h-20">
                  Memungkinkan komputer untuk 'melihat' dan menginterpretasikan gambar atau video digital. Contoh: Face ID, Self-driving cars.
                </p>
                {/* Tempat Gambar 6 */}
                <img src="https://media1.tenor.com/m/Tkr-1vXKdJkAAAAC/leo-retina-eye-scanner-retina-eye-scanner.gif" className="w-full h-32 object-cover rounded-lg" alt="Computer Vision" />
              </div>

              <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 hover:border-green-500/50 transition-colors">
                <h4 className="text-green-400 font-bold mb-2">Robotics</h4>
                <p className="text-sm text-slate-400 mb-4 h-20">
                  Gabungan AI dengan teknik mesin untuk membuat robot yang dapat bertindak di dunia fisik secara otonom.
                </p>
                {/* Tempat Gambar 7 */}
                <img src="https://media1.tenor.com/m/M7uSPeMP0TkAAAAd/burger-king.gif" className="w-full h-32 object-cover rounded-lg" alt="Robotics" />
              </div>
            </div>
          </Card>
        </section>

        {/* 5. Interactive Apps */}
        <section>
          <SectionTitle>Aplikasi Komersial</SectionTitle>
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Sistem Pakar */}
            <Card className="flex flex-col h-full">
              <h3 className="text-xl font-bold text-white mb-2">1. Sistem Pakar</h3>
              <p className="text-sm text-slate-500 mb-4">Meniru keahlian pakar untuk diagnosa.</p>
              <div className="flex-grow">
                {/* Komponen Interaktif Expert System */}
                <InteractiveExpertSystem />
              </div>
            </Card>

            {/* NLP */}
            <Card className="flex flex-col h-full">
              <h3 className="text-xl font-bold text-white mb-2">2. Natural Language Processing (NLP)</h3>
              <p className="text-sm text-slate-500 mb-6">Komunikasi bahasa manusia sehari-hari.</p>
              
              <div className="space-y-4">
                <div className="group p-4 rounded-xl bg-slate-800 hover:bg-indigo-900/30 border border-slate-700 hover:border-indigo-500 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-indigo-400 font-bold text-sm flex items-center gap-2">
                      <MessageSquare size={14}/> Input Suara
                    </span>
                    <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded">Hover me</span>
                  </div>
                  <p className="text-slate-300 text-sm">"Komputer, hapus semua file!"</p>
                  <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="mt-2 text-green-400 font-mono text-xs border-t border-slate-600 pt-2">
                      {`> Executing: delete *.*`}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                   <h4 className="text-purple-400 font-bold text-sm mb-1 flex items-center gap-2">
                     <BookOpen size={14}/> Text Summarization
                   </h4>
                   <p className="text-xs text-slate-400">
                     Sistem meringkas wacana panjang menjadi poin-poin penting secara otomatis, bukan sekedar menerjemahkan kata per kata.
                   </p>
                </div>
              </div>
            </Card>

          </div>
        </section>

        {/* --- ETIKA AI --- */}
        <section>
          <Card className="bg-red-950/10 border-red-900/30">
            <SectionTitle icon={ShieldAlert}>Etika dan Masa Depan AI</SectionTitle>
            <div className="flex flex-col md:flex-row gap-8">
               <div className="flex-1 space-y-4">
                  <p className="text-slate-300 leading-relaxed text-justify">
                    Seiring berkembangnya kecerdasan buatan, muncul berbagai pertanyaan etis yang harus dijawab. Salah satu isu utama adalah <strong>bias algoritma</strong>, di mana AI dapat mewarisi prasangka dari data yang digunakan untuk melatihnya. Selain itu, masalah <strong>privasi data</strong> dan potensi <strong>penggantian tenaga kerja manusia</strong> oleh otomatisasi menjadi perdebatan global.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-justify">
                    Meskipun demikian, masa depan AI menjanjikan revolusi dalam bidang kesehatan (diagnosa presisi), transportasi (mobil otonom), dan pendidikan (pembelajaran personal). Kuncinya adalah regulasi yang tepat agar AI tetap menjadi alat yang membantu, bukan merugikan manusia.
                  </p>
               </div>
               <div className="md:w-1/3">
                  {/* Tempat Gambar 8 */}
                  <img src="https://media.tenor.com/TxmAUgpws10AAAAi/predator.gif" className="w-full h-auto rounded-lg shadow-lg opacity-80" alt="Etika AI" />
               </div>
            </div>
          </Card>
        </section>

        {/* --- INFORMASI AKADEMIK UNAI --- */}
        <section>
          <Card className="bg-blue-950/10 border-blue-900/30">
            <SectionTitle icon={GraduationCap}>Referensi Akademik & Jadwal Kelas</SectionTitle>
            <div className="mb-6">
              <h3 className="text-xl text-white font-bold mb-2">Universitas Advent Indonesia (UNAI)</h3>
              <p className="text-slate-400 text-sm">
                Fakultas Teknologi Informasi - Semester Genap T.A 2025/2026
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unaiClasses.map((cls, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl p-5 hover:border-blue-500 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-900/20 px-2 py-1 rounded">
                      {cls.code}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{cls.sks}</span>
                  </div>
                  <h4 className="text-white font-bold mb-2 group-hover:text-blue-300 transition-colors">
                    {cls.name}
                  </h4>
                  <div className="space-y-2 text-sm text-slate-400 mt-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={14} className="text-purple-500"/>
                      <span>{cls.lecturer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-green-500"/>
                      <span>{cls.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers size={14} className="text-yellow-500"/>
                      <span>{cls.room}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-500 w-8 h-8" />
                <div>
                  <h5 className="text-white font-bold text-sm">Kalender Akademik</h5>
                  <p className="text-slate-500 text-xs">Pendaftaran Ulang: Januari 2026 • Awal Kuliah: Februari 2026</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors">
                Lihat Portal Akademik
              </button>
            </div>
          </Card>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-black text-slate-600 py-8 text-center text-sm relative z-10">
        <p className="hover:text-slate-400 transition-colors cursor-default">
          © 2025 Teknologi Kecerdasan Buatan. Universitas Advent Indonesia.
        </p>
      </footer>
    </div>
  );
}