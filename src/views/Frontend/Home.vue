<template>
 <div class="space-y-32">
 <!-- Hero Section -->
 <section id="home" class="relative pt-40 pb-20 px-6 overflow-hidden">
 <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 <div class="text-left space-y-10 animate-slide-up">
 <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-indigo-50 border border-indigo-100/50 text-[11px] font-black text-indigo-700 uppercase tracking-[0.25em]">
 <span class="relative flex h-2 w-2">
 <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
 <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
 </span>
 Digital Learning Revolution
 </div>

 <h1 class="text-6xl lg:text-8xl font-black text-blue-950 tracking-tighter leading-[0.95] lowercase first-letter:uppercase">
 Elevate your <br/>
 <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600">Academic</span> Potential.
 </h1>

 <p class="text-xl text-blue-700 font-medium max-w-xl leading-relaxed">
 Explore a new dimension of education. Engage with world-class mentors, access premium certification tracks, and accelerate your career path with Jspark.ai technology.
 </p>

 <div class="flex flex-col sm:flex-row items-center gap-5 pt-4">
 <button @click="$router.push('/courses')" class="w-fit mx-auto sm:mx-0 px-6 py-3 rounded-2xl bg-indigo-600 text-white text-[12px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:-translate-y-1 active:translate-y-0">
 Explore Programs
 </button>
 <button class="w-fit mx-auto sm:mx-0 px-6 py-3 rounded-2xl bg-white border border-blue-200 text-blue-950 text-[12px] font-black uppercase tracking-[0.2em] shadow-sm hover:bg-blue-50 transition-all">
 Live Class Demo
 </button>
 </div>

 <!-- Trust Stats -->
 <div class="pt-10 flex items-center gap-12">
 <div v-for="p in [
 {t: '32k+', s: 'Global Students'},
 {t: '450+', s: 'Expert Courses'}
 ]" :key="p.t" class="flex flex-col">
 <span class="text-3xl font-black text-blue-950 tabular-nums">{{ p.t }}</span>
 <span class="text-[10px] font-black uppercase tracking-widest text-indigo-400">{{ p.s }}</span>
 </div>
 </div>
 </div>

 <div class="relative animate-float pt-10">
 <div class="absolute inset-0 bg-blue-600/5 rounded-[80px] blur-3xl rotate-12 scale-90 translate-x-10"></div>
 <div class="absolute inset-0 bg-violet-600/5 rounded-[80px] blur-3xl -rotate-6 scale-95 -translate-x-10"></div>

 <div class="relative z-10 rounded-[60px] overflow-hidden border border-white/60 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] bg-white/40 backdrop-blur-sm p-4">
 <img src="/lms_hero_modern.png" class="w-full rounded-[45px] transition-transform duration-1000 hover:scale-105" alt="Student Modern Illustration" />
 <div class="absolute bottom-12 -left-10 bg-white p-5 rounded-3xl shadow-2xl border border-blue-50 animate-bounce-subtle hidden xl:block">
 <div class="flex items-center gap-4">
 <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
 <feather type="check-circle" size="24"></feather>
 </div>
 <div>
 <h4 class="text-sm font-black text-blue-950">Course Certified</h4>
 <p class="text-[10px] font-bold text-indigo-400 uppercase">Verification Level: 9.8</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <!-- Programs Preview -->
 <section id="programs" class="py-20 px-6 relative overflow-hidden bg-blue-50/50">
 <div class="max-w-7xl mx-auto">
 <div class="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 text-center md:text-left">
 <div class="space-y-4">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">Elite Specializations</h2>
 <h3 class="text-5xl font-black text-blue-950 tracking-tight uppercase">Jspark Digital Programs</h3>
 </div>
 <p class="text-blue-700 font-bold text-[11px] uppercase tracking-[0.2em] max-w-md">Comprehensive curriculum designed to transform raw talent into industry-ready professional dominance.</p>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
 <div class="group relative p-12 rounded-[60px] bg-white border border-blue-100 hover:border-indigo-200 hover:shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] transition-all duration-700 overflow-hidden">
 <div class="absolute -top-20 -right-20 w-64 h-64 bg-blue-50/50 rounded-full blur-[80px] group-hover:bg-blue-100/60 transition-colors"></div>
 <div class="relative z-10 flex flex-col md:flex-row items-center gap-12">
 <div class="w-32 h-32 bg-indigo-50 rounded-[40px] flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-110 transition-transform">
 <feather type="book-open" size="64" stroke-width="1.5"></feather>
 </div>
 <div class="space-y-6 text-center md:text-left flex-1">
 <h4 class="text-3xl font-black text-blue-950 tracking-tight uppercase">Tech e-Books <br/> (Private Library)</h4>
 <p class="text-blue-700 text-[11px] font-bold uppercase tracking-widest leading-relaxed">Unlimited access to our exclusive repository of technical manuals, strategy guides, and architectural blueprints.</p>
 <button @click="$router.push('/courses')" class="px-6 py-3 rounded-2xl bg-blue-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-blue-950/10">View Collection</button>
 </div>
 </div>
 </div>
 <div class="group relative p-12 rounded-[60px] bg-white border border-blue-100 hover:border-indigo-200 hover:shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] transition-all duration-700 overflow-hidden">
 <div class="absolute -top-20 -right-20 w-64 h-64 bg-violet-50/50 rounded-full blur-[80px] group-hover:bg-violet-100/60 transition-colors"></div>
 <div class="relative z-10 flex flex-col md:flex-row items-center gap-12">
 <div class="w-32 h-32 bg-violet-50 rounded-[40px] flex items-center justify-center text-violet-600 shadow-inner group-hover:scale-110 transition-transform">
 <feather type="globe" size="64" stroke-width="1.5"></feather>
 </div>
 <div class="space-y-6 text-center md:text-left flex-1">
 <h4 class="text-3xl font-black text-blue-950 tracking-tight uppercase">Global Language <br/> Professional Lab</h4>
 <p class="text-blue-700 text-[11px] font-bold uppercase tracking-widest leading-relaxed">Master the art of multilingual communication with our native-expert driven linguistics program.</p>
 <button @click="$router.push('/courses')" class="px-6 py-3 rounded-2xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-950 transition-all shadow-xl shadow-indigo-600/10">View Curriculum</button>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <!-- Feature Grid -->
 <section id="infrastructure" class="py-20 px-6 bg-blue-950 relative overflow-hidden rounded-[80px] mx-4 lg:mx-10 overflow-hidden">
 <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2"></div>
 <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2"></div>
 <div class="max-w-7xl mx-auto relative z-10">
 <div class="max-w-3xl text-left mb-24 space-y-8 animate-slide-up">
 <h2 class="text-[11px] font-black text-indigo-400 uppercase tracking-[0.5em]">Global Infrastructure</h2>
 <h3 class="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight uppercase">Advanced Learning <br/> Ecosystem Architecture</h3>
 <p class="text-indigo-400 text-lg font-medium leading-relaxed">A high-fidelity learning environment built on low-latency streaming and interactive micro-service components.</p>
 </div>
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 <div v-for="f in features" :key="f.title" class="p-10 rounded-[45px] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-indigo-500/50 hover:-translate-y-3 transition-all duration-500 group">
 <div class="w-16 h-16 rounded-3xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
 <feather :type="f.icon" size="30"></feather>
 </div>
 <h4 class="text-2xl font-black text-white tracking-tight mb-4 uppercase">{{ f.title }}</h4>
 <p class="text-indigo-400 text-[11px] font-bold uppercase tracking-[0.1em] leading-relaxed">{{ f.desc }}</p>
 </div>
 </div>
 </div>
 </section>

 <!-- Testimonials -->
 <section id="testimonials" class="py-20 px-6">
 <div class="max-w-7xl mx-auto">
 <div class="flex flex-col items-center text-center space-y-4 mb-20 text-blue-950">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">Student Success</h2>
 <h3 class="text-5xl font-black tracking-tight uppercase">What Our Scholars Say</h3>
 <div class="w-20 h-1.5 bg-indigo-600 rounded-full mt-4"></div>
 </div>
 <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
 <div v-for="t in testimonials" :key="t.n" class="p-12 rounded-[60px] bg-white border border-blue-100 hover:border-indigo-200 transition-all duration-500 relative group shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10">
 <feather type="quote" size="48" class="absolute -top-6 -right-6 text-indigo-50 group-hover:text-indigo-100 transition-colors"></feather>
 <div class="flex items-center gap-4 mb-8">
 <div class="w-14 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><feather :type="t.i" size="24"></feather></div>
 <div class="flex flex-col">
 <span class="text-lg font-black text-blue-950 tracking-tight">{{ t.n }}</span>
 <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{{ t.r }}</span>
 </div>
 </div>
 <p class="text-blue-700 font-bold text-sm tracking-tight leading-relaxed lowercase first-letter:uppercase">"{{ t.d }}"</p>
 </div>
 </div>
 </div>
 </section>

 <!-- Shared Contact -->
 <section id="contact" class="py-32 px-6 bg-indigo-50/30 rounded-t-[80px]">
 <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
 <div class="space-y-12">
 <div class="space-y-6">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">Get in Touch</h2>
 <h3 class="text-6xl font-black text-blue-950 tracking-tight uppercase">Send a Message <br/> For Any Queries.</h3>
 </div>
 <div class="space-y-8">
 <div v-for="c in contactInfo" :key="c.t" class="flex items-start gap-6 group cursor-default">
 <div class="w-14 h-11 rounded-2xl bg-white text-indigo-600 flex items-center justify-center shadow-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500"><feather :type="c.i" size="22"></feather></div>
 <div class="flex flex-col text-left">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{{ c.t }}</span>
 <span class="text-xl font-black text-blue-950 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{{ c.v }}</span>
 </div>
 </div>
 </div>
 </div>
 <div class="bg-white p-12 rounded-[70px] shadow-2xl shadow-indigo-500/15 border border-blue-100 relative overflow-hidden text-left">
 <form class="space-y-6 relative z-10" @submit.prevent>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div class="space-y-2">
 <label class="text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-4">Full Name</label>
 <input type="text" placeholder="John Doe" class="w-full px-6 py-3 rounded-3xl bg-blue-50 border border-blue-100 text-sm font-bold placeholder:text-indigo-300 focus:outline-none focus:border-indigo-400 transition-all shadow-inner" />
 </div>
 <div class="space-y-2">
 <label class="text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-4">Email Address</label>
 <input type="email" placeholder="john@example.com" class="w-full px-6 py-3 rounded-3xl bg-blue-50 border border-blue-100 text-sm font-bold placeholder:text-indigo-300 focus:outline-none focus:border-indigo-400 transition-all shadow-inner" />
 </div>
 </div>
 <div class="space-y-2">
 <label class="text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-4">Phone Number</label>
 <input type="text" placeholder="+91 XXX XXX XXXX" class="w-full px-6 py-3 rounded-3xl bg-blue-50 border border-blue-100 text-sm font-bold placeholder:text-indigo-300 focus:outline-none focus:border-indigo-400 transition-all shadow-inner" />
 </div>
 <div class="space-y-2">
 <label class="text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-4">Query Message</label>
 <textarea rows="4" placeholder="How can we help your learning journey?" class="w-full px-6 py-3 rounded-[2.5rem] bg-blue-50 border border-blue-100 text-sm font-bold placeholder:text-indigo-300 focus:outline-none focus:border-indigo-400 transition-all shadow-inner resize-none"></textarea>
 </div>
 <button class="w-fit px-8 mx-auto sm:mx-0 py-3 rounded-[2.5rem] bg-indigo-600 text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-indigo-600/30 hover:bg-blue-950 transition-all hover:scale-[1.02] active:scale-[0.98]">
 Send Professional Inquiry
 </button>
 </form>
 </div>
 </div>
 </section>
 </div>
</template>

<script>
export default {
 name: 'HomeView',
 data() {
 return {
 features: [
 { title: 'Live Lectures', desc: 'Interactive real-time sessions with multi-user whiteboard integration and high-fidelity audio.', icon: 'video' },
 { title: 'Recorded VOD', desc: 'Access 4K high-definition archives of all previous sessions with AI-enhanced summaries.', icon: 'play-circle' },
 { title: 'Online Tests', desc: 'Comprehensive assessment engine with proctored environments and instant behavioral analytics.', icon: 'edit-3' },
 { title: 'Study Hub', desc: 'Centralized repository for high-quality curated notes, research papers, and code snippets.', icon: 'database' }
 ],
 testimonials: [
 {n: 'ABHIJEET', r: 'Student', d: 'This Institute has great experienced teacher who helped me a lot. Thank you!', i: 'user'},
 {n: 'AABHEER', r: 'Student', d: 'JSPARK.AI Class Test Series helped me to secure a rank in our Examination.', i: 'user'},
 {n: 'MANISH', r: 'Professional', d: 'The curriculum is world-class. The tech stack taught is very relevant for 2026.', i: 'user'}
 ],
 contactInfo: [
 {i: 'phone', t: 'Support Hotline', v: '+91-9811390208'},
 {i: 'mail', t: 'Official Inquiry', v: 'sales@jspark.in'},
 {i: 'map-pin', t: 'Global HQ', v: 'A-1, Office No-011, Noida, U.P 201301'}
 ]
 }
 }
}
</script>
