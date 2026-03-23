<template>
 <div class="min-h-screen flex flex-col bg-[#FDFDFF] text-blue-950 font-sans selection:bg-indigo-100 relative overflow-x-hidden">

 <!-- Premium Mesh Background Blobs (NO RED - using Indigo/Blue/Violet) -->
 <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
 <div class="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-blue-100/40 rounded-full blur-[140px] opacity-70 animate-pulse"></div>
 <div class="absolute bottom-[-10%] right-[-15%] w-[60%] h-[60%] bg-indigo-100/40 rounded-full blur-[140px] opacity-60 animate-pulse" style="animation-delay: 3s"></div>
 <div class="absolute top-[30%] left-[25%] w-[40%] h-[40%] bg-violet-50/50 rounded-full blur-[120px] opacity-50"></div>
 </div>

 <!-- Navigation -->
 <nav :class="['fixed top-0 w-full z-50 transition-all duration-700 px-6 py-3', scrolled ? 'bg-white/80 backdrop-blur-3xl border-b border-blue-200/40 shadow-xl shadow-blue-950/5' : 'bg-transparent']">
 <div class="max-w-7xl mx-auto flex items-center justify-between flex-nowrap gap-4">
 <!-- Logo & Brand -->
 <div class="flex items-center gap-3 cursor-pointer group" @click="scrollPage('home')">
 <div class="w-11 h-11 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30 group-hover:rotate-6 transition-all duration-500">
 <feather type="zap" size="22" stroke-width="2.5"></feather>
 </div>
 <div class="flex flex-col">
 <span class="text-xl font-black tracking-tight text-blue-950 uppercase leading-none">Jspark.ai</span>
 <span class="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] mt-1">LMS Systems</span>
 </div>
 </div>

 <!-- Navigation Links -->
 <div class="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
 <a v-for="link in navLinks" :key="link.name" :href="link.id" class="text-[10px] xl:text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-indigo-600 text-blue-950 hover:scale-105">
 {{ link.name }}
 </a>
 </div>

 <!-- Action Area (Replaced Red from screenshot with Premium Accents) -->
 <div class="flex items-center gap-2 xl:gap-3 flex-nowrap shrink-0">
 <button class="hidden lg:flex px-5 py-2.5 rounded-xl border-2 border-blue-100 bg-white/50 text-indigo-600 text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-indigo-200 hover:bg-blue-50 transition-all active:scale-95 items-center gap-2">
 <feather type="clipboard" size="14"></feather>
 Notice Board
 </button>
 <div class="h-8 w-px bg-blue-200/60 mx-1 hidden lg:block"></div>
 <button @click="$emit('login')" class="hidden sm:block px-5 py-2.5 rounded-xl text-blue-950 text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 transition-colors">Login</button>
 <button @click="$emit('login')" class="px-7 py-3 rounded-2xl bg-blue-950 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-blue-950/20 hover:bg-black hover:-translate-y-0.5 transition-all active:translate-y-0">Register</button>

 <!-- Mobile Menu Toggle -->
 <button @click="mobileMenuOpen = true" class="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-blue-100 text-blue-950 shadow-sm active:scale-95 transition-all">
 <feather type="menu" size="20"></feather>
 </button>
 </div>
 </div>
 </nav>

 <!-- Mobile Navigation Overlay -->
 <div v-if="mobileMenuOpen" class="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl animate-in fade-in duration-300">
 <div class="p-8 flex flex-col h-full">
 <div class="flex items-center justify-between mb-20">
 <div class="flex items-center gap-3">
 <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
 <feather type="zap" size="20"></feather>
 </div>
 <span class="text-xl font-black uppercase tracking-tighter">Jspark.ai</span>
 </div>
 <button @click="mobileMenuOpen = false" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-100 text-blue-950">
 <feather type="x" size="24"></feather>
 </button>
 </div>
 <div class="flex flex-col gap-10">
 <a v-for="link in navLinks" :key="link.name" :href="link.id" @click="mobileMenuOpen = false; scrollPage(link.id.substring(1))" class="text-4xl font-black text-blue-950 tracking-tighter hover:text-indigo-600 transition-colors lowercase first-letter:uppercase">
 {{ link.name }}
 </a>
 </div>
 <div class="mt-auto space-y-4">
 <button class="w-fit px-8 mx-auto sm:mx-0 py-3 rounded-2xl bg-indigo-50 text-indigo-600 text-[11px] font-black uppercase tracking-widest">Notice Board</button>
 <button @click="$emit('login')" class="w-fit px-8 mx-auto sm:mx-0 py-3 rounded-2xl bg-blue-950 text-white text-[11px] font-black uppercase tracking-widest shadow-2xl">Login Account</button>
 </div>
 </div>
 </div>

 <!-- CONTENT -->
 <main class="relative z-10">

 <!-- HERO SECTION -->
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
 <button class="w-fit mx-auto sm:mx-0 px-6 py-3 rounded-2xl bg-indigo-600 text-white text-[12px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:-translate-y-1 active:translate-y-0">
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
 <!-- Decorative Back Elements -->
 <div class="absolute inset-0 bg-blue-600/5 rounded-[80px] blur-3xl rotate-12 scale-90 translate-x-10"></div>
 <div class="absolute inset-0 bg-violet-600/5 rounded-[80px] blur-3xl -rotate-6 scale-95 -translate-x-10"></div>

 <div class="relative z-10 rounded-[60px] overflow-hidden border border-white/60 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] bg-white/40 backdrop-blur-sm p-4">
 <img src="/lms_hero_modern.png" class="w-full rounded-[45px] transition-transform duration-1000 hover:scale-105" alt="Student Modern Illustration" />

 <!-- Floating Card -->
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

 <!-- DIGITAL PROGRAMS SECTION (Replacing Red with Premium Indigo) -->
 <section id="programs" class="py-32 px-6 relative overflow-hidden bg-blue-50/50">
 <div class="max-w-7xl mx-auto">
 <div class="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 text-center md:text-left">
 <div class="space-y-4">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">Elite Specializations</h2>
 <h3 class="text-5xl font-black text-blue-950 tracking-tight uppercase">Jspark Digital Programs</h3>
 </div>
 <p class="text-blue-500 font-bold text-[11px] uppercase tracking-[0.2em] max-w-md">Comprehensive curriculum designed to transform raw talent into industry-ready professional dominance.</p>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
 <!-- Program 1: Tech E-books -->
 <div class="group relative p-12 rounded-[60px] bg-white border border-blue-100 hover:border-indigo-200 hover:shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] transition-all duration-700 overflow-hidden">
 <div class="absolute -top-20 -right-20 w-64 h-64 bg-blue-50/50 rounded-full blur-[80px] group-hover:bg-blue-100/60 transition-colors"></div>
 <div class="relative z-10 flex flex-col md:flex-row items-center gap-12">
 <div class="w-32 h-32 bg-indigo-50 rounded-[40px] flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-110 transition-transform">
 <feather type="book-open" size="64" stroke-width="1.5"></feather>
 </div>
 <div class="space-y-6 text-center md:text-left flex-1">
 <h4 class="text-3xl font-black text-blue-950 tracking-tight uppercase">Tech e-Books <br/> (Private Library)</h4>
 <p class="text-blue-700 text-[11px] font-bold uppercase tracking-widest leading-relaxed">Unlimited access to our exclusive repository of technical manuals, strategy guides, and architectural blueprints.</p>
 <button class="px-6 py-3 rounded-2xl bg-blue-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-blue-950/10">View Collection</button>
 </div>
 </div>
 </div>

 <!-- Program 2: Language -->
 <div class="group relative p-12 rounded-[60px] bg-white border border-blue-100 hover:border-indigo-200 hover:shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] transition-all duration-700 overflow-hidden">
 <div class="absolute -top-20 -right-20 w-64 h-64 bg-violet-50/50 rounded-full blur-[80px] group-hover:bg-violet-100/60 transition-colors"></div>
 <div class="relative z-10 flex flex-col md:flex-row items-center gap-12">
 <div class="w-32 h-32 bg-violet-50 rounded-[40px] flex items-center justify-center text-violet-600 shadow-inner group-hover:scale-110 transition-transform">
 <feather type="globe" size="64" stroke-width="1.5"></feather>
 </div>
 <div class="space-y-6 text-center md:text-left flex-1">
 <h4 class="text-3xl font-black text-blue-950 tracking-tight uppercase">Global Language <br/> Professional Lab</h4>
 <p class="text-blue-700 text-[11px] font-bold uppercase tracking-widest leading-relaxed">Master the art of multilingual communication with our native-expert driven linguistics program.</p>
 <button class="px-6 py-3 rounded-2xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-950 transition-all shadow-xl shadow-indigo-600/10">View Curriculum</button>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <!-- ENHANCED COURSE CATALOG SECTION (Replacing basic courses grid) -->
 <section id="courses" class="py-32 px-6 bg-white relative overflow-hidden">
 <div class="max-w-7xl mx-auto flex flex-col items-center">
 <div class="text-center space-y-4 mb-20 animate-slide-up">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">Integrated Learning Catalog</h2>
 <h3 class="text-6xl font-black text-blue-950 tracking-tighter uppercase">Our Professional Courses</h3>
 <div class="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full mt-6"></div>
 </div>

 <div class="w-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
 <!-- Filter Sidebar -->
 <aside class="space-y-8 animate-in fade-in slide-in-from-left duration-700">
 <div class="bg-blue-50 border border-blue-100 p-8 rounded-[40px] space-y-10 shadow-sm sticky top-32">
 <div class="space-y-4">
 <h4 class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Search Directory</h4>
 <div class="relative group">
 <input type="text" placeholder="Looking For?" class="w-full h-11 pl-6 pr-14 rounded-2xl bg-white border border-blue-200 text-sm font-bold focus:outline-none focus:border-indigo-600 transition-all shadow-inner" v-model="searchQuery" />
 <button class="absolute right-2 top-2 w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-blue-950 transition-all shadow-lg shadow-indigo-600/20">
 <feather type="search" size="16"></feather>
 </button>
 </div>
 </div>

 <div class="space-y-6">
 <h4 class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Choose Category</h4>
 <div class="p-6 rounded-3xl bg-white border border-blue-200 shadow-sm space-y-4">
 <div v-for="cat in ['Tech e-books (library)', 'Language', 'Core Academic']" :key="cat" class="flex items-center gap-3 group cursor-pointer">
 <div class="w-5 h-5 rounded-lg border-2 border-blue-200 flex items-center justify-center group-hover:border-indigo-400 transition-all" @click="toggleCategory(cat)">
 <div v-if="selectedCategories.includes(cat)" class="w-2.5 h-2.5 rounded bg-indigo-600"></div>
 </div>
 <span class="text-[11px] font-black text-blue-700 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">{{ cat }}</span>
 </div>
 </div>
 </div>

 <div class="pt-10 border-t border-blue-200">
 <button @click="searchQuery = ''; selectedCategories = []" class="w-fit px-8 mx-auto sm:mx-0 py-3 rounded-2xl border-2 border-blue-200 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all">Reset Filters</button>
 </div>
 </div>
 </aside>

 <!-- Course Grid Area -->
 <div class="space-y-10">
 <div class="flex items-center justify-between px-4 pb-4 border-b border-blue-100">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Showing {{ filteredCourses.length }} elite programs</span>
 <div class="flex items-center gap-2">
 <span class="text-[10px] font-black text-indigo-400 uppercase">Sort By:</span>
 <select class="bg-transparent text-[10px] font-black uppercase outline-none text-indigo-600">
 <option>Latest</option>
 <option>Featured</option>
 <option>Price: Low to High</option>
 </select>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
 <div v-for="c in filteredCourses" :key="c.name" class="group bg-white p-4 rounded-[45px] border border-blue-100 hover:border-indigo-200 hover:shadow-[0_45px_90px_-25px_rgba(79,70,229,0.12)] transition-all duration-700 flex flex-col h-full animate-in fade-in zoom-in duration-500">
 <div class="relative rounded-[36px] overflow-hidden aspect-[16/10] mb-8 shadow-sm">
 <img :src="c.image" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" :alt="c.name">
 <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent"></div>
 <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl text-[10px] font-black text-indigo-700 uppercase tracking-widest">
 {{ c.tag }}
 </div>
 </div>
 <div class="px-4 space-y-6 flex-1 flex flex-col">
 <h4 class="text-xl font-black text-blue-950 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors uppercase">{{ c.name }}</h4>
 <p class="text-[10px] font-bold text-blue-500 uppercase tracking-widest leading-relaxed line-clamp-2">Enterprise-grade curriculum featuring real-world architecture patterns and native-fluency linguistic coaching.</p>

 <div class="pt-6 border-t border-blue-50 mt-auto flex flex-col gap-4">
 <div class="flex items-center justify-between">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Standard Price</span>
 <span class="text-xl font-black text-blue-950 tracking-tighter tabular-nums">₹ {{ c.price }} /-</span>
 </div>
 <button class="w-fit px-8 mx-auto sm:mx-0 py-3 rounded-2xl bg-blue-950 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-950/10 hover:bg-indigo-600 transition-all hover:scale-[1.02] active:scale-[0.98]">
 Enroll Now
 </button>
 </div>
 </div>
 </div>
 </div>

 <!-- Empty State -->
 <div v-if="filteredCourses.length === 0" class="py-40 flex flex-col items-center gap-6 text-center animate-in fade-in zoom-in">
 <div class="w-24 h-24 rounded-full bg-blue-50 border-4 border-white shadow-inner flex items-center justify-center text-blue-200">
 <feather type="search" size="40"></feather>
 </div>
 <div class="space-y-2">
 <h4 class="text-2xl font-black text-blue-950 uppercase">No Courses Found</h4>
 <p class="text-xs font-bold text-indigo-400 uppercase tracking-widest">Try adjusting your filters or search keywords.</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 <!-- FEATURES SECTION (Replacing the red wave/illustration with a Premium Infrastructure Grid) -->
 <section id="infrastructure" class="py-32 px-6 bg-blue-950 relative overflow-hidden rounded-[80px] mx-4 lg:mx-10 overflow-hidden">
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
 <div class="mt-8 pt-8 border-t border-white/5 flex items-center justify-between group-hover:border-indigo-500/20 transition-colors">
 <span class="text-[10px] font-black text-indigo-400 tracking-widest uppercase">Enabled V2.0</span>
 <feather type="activity" size="14" class="text-indigo-400"></feather>
 </div>
 </div>
 </div>
 </div>
 </section>

 <!-- TESTIMONIALS (Modern Carousel Style) -->
 <section id="testimonials" class="py-32 px-6">
 <div class="max-w-7xl mx-auto">
 <div class="flex flex-col items-center text-center space-y-4 mb-20">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">Student Success</h2>
 <h3 class="text-5xl font-black text-blue-950 tracking-tight uppercase">What Our Scholars Say</h3>
 <div class="w-20 h-1.5 bg-indigo-600 rounded-full mt-4"></div>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
 <div v-for="t in [
 {n: 'ABHIJEET', r: 'Student', d: 'This Institute has great experienced teacher who helped me a lot. Thank you!', i: 'user'},
 {n: 'AABHEER', r: 'Student', d: 'JSPARK.AI Class Test Series helped me to secure a rank in our Examination.', i: 'user'},
 {n: 'MANISH', r: 'Professional', d: 'The curriculum is world-class. The tech stack taught is very relevant for 2026.', i: 'user'}
 ]" :key="t.n" class="p-12 rounded-[60px] bg-white border border-blue-100 hover:border-indigo-200 transition-all duration-500 relative group shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10">
 <feather type="quote" size="48" class="absolute -top-6 -right-6 text-indigo-50 group-hover:text-indigo-100 transition-colors"></feather>
 <div class="flex items-center gap-4 mb-8">
 <div class="w-14 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
 <feather :type="t.i" size="24"></feather>
 </div>
 <div class="flex flex-col">
 <span class="text-lg font-black text-blue-950 tracking-tight">{{ t.n }}</span>
 <span class="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{{ t.r }}</span>
 </div>
 </div>
 <p class="text-blue-500 font-bold text-sm tracking-tight leading-relaxed lowercase first-letter:uppercase">"{{ t.d }}"</p>
 </div>
 </div>
 </div>
 </section>

 <!-- CONTACT SECTION (Modernized & No Red) -->
 <section id="contact" class="py-32 px-6 bg-indigo-50/30">
 <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
 <div class="space-y-12">
 <div class="space-y-6">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">Get in Touch</h2>
 <h3 class="text-6xl font-black text-blue-950 tracking-tight uppercase">Send a Message <br/> For Any Queries.</h3>
 <p class="text-indigo-400 font-bold text-[11px] uppercase tracking-[0.2em] max-w-md">Our global headquarters is available for personal academic counseling sessions Mon-Sat, 9AM to 6PM IST.</p>
 </div>

 <div class="space-y-8">
 <div v-for="c in [
 {i: 'phone', t: 'Support Hotline', v: '+91-9811390208'},
 {i: 'mail', t: 'Official Inquiry', v: 'sales@jspark.in'},
 {i: 'map-pin', t: 'Global HQ', v: 'A-1, Office No-011, Noida, U.P 201301'}
 ]" :key="c.t" class="flex items-start gap-6 group cursor-default">
 <div class="w-14 h-11 rounded-2xl bg-white text-indigo-600 flex items-center justify-center shadow-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
 <feather :type="c.i" size="22"></feather>
 </div>
 <div class="flex flex-col">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{{ c.t }}</span>
 <span class="text-xl font-black text-blue-950 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{{ c.v }}</span>
 </div>
 </div>
 </div>
 </div>

 <div class="bg-white p-12 rounded-[70px] shadow-2xl shadow-indigo-500/15 border border-blue-100 relative overflow-hidden">
 <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

 <form class="space-y-6 relative z-10" @submit.prevent>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div class="space-y-2">
 <label class="text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-4">Full Name</label>
 <input type="text" placeholder="e.g. John Doe" class="w-full px-6 py-3 rounded-3xl bg-blue-50 border border-blue-100 text-sm font-bold placeholder:text-indigo-300 focus:outline-none focus:border-indigo-400 transition-all shadow-inner" />
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

 </main>

 <!-- FOOTER (Modern & No Red) -->
 <footer class="mt-auto bg-black py-24 px-6 text-white rounded-t-[100px] relative z-20 overflow-hidden">
 <!-- Decoration -->
 <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] translate-y-1/2 translate-x-1/2"></div>

 <div class="max-w-7xl mx-auto">
 <div class="grid grid-cols-1 md:grid-cols-4 gap-20 items-start">
 <div class="space-y-10 group">
 <div class="flex items-center gap-4 cursor-pointer" @click="scrollPage('home')">
 <div class="w-14 h-11 bg-indigo-600 rounded-[2.2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/30 group-hover:rotate-12 transition-all">
 <feather type="zap" size="28" stroke-width="2.5"></feather>
 </div>
 <div class="flex flex-col">
 <span class="text-2xl font-black tracking-tighter uppercase text-white leading-none">Jspark.ai LMS</span>
 <span class="text-[8px] font-black text-indigo-400 uppercase tracking-[0.4em] mt-1">Digital Systems</span>
 </div>
 </div>
 <p class="text-[11px] text-blue-500 font-bold leading-relaxed uppercase tracking-[0.15em]">Redefining Educational Engineering through high-performance digital architecture and innovative mentorship.</p>
 <div class="flex items-center gap-5">
 <div v-for="icon in ['facebook', 'twitter', 'instagram', 'linkedin']" :key="icon" class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 hover:text-white hover:border-indigo-500 hover:-translate-y-1 transition-all cursor-pointer shadow-lg hover:bg-blue-950">
 <feather :type="icon" size="16"></feather>
 </div>
 </div>
 </div>

 <div v-for="(col, i) in footerLinks" :key="i" class="space-y-10">
 <h5 class="text-[12px] font-black text-white uppercase tracking-[0.4em]">{{ col.title }}</h5>
 <ul class="space-y-5 text-blue-500">
 <li v-for="link in col.links" :key="link">
 <a href="#" class="text-[10px] font-black hover:text-indigo-400 transition-colors uppercase tracking-[0.25em]">{{ link }}</a>
 </li>
 </ul>
 </div>

 <div class="space-y-10">
 <h5 class="text-[12px] font-black text-white uppercase tracking-[0.4em]">Download App</h5>
 <div class="flex flex-col gap-4">
 <button class="flex items-center gap-4 bg-white/10 p-5 rounded-3xl border border-white/10 hover:bg-white hover:text-blue-950 transition-all group overflow-hidden relative">
 <div class="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors"></div>
 <feather type="smartphone" size="28" class="relative z-10"></feather>
 <div class="text-left relative z-10">
 <p class="text-[8px] font-black uppercase opacity-60">Available on</p>
 <p class="text-[12px] font-black uppercase tracking-widest">Google Play Store</p>
 </div>
 </button>
 </div>
 </div>
 </div>

 <div class="pt-24 border-t border-white/5 mt-20 flex flex-col md:flex-row items-center justify-between gap-10 opacity-30 text-white">
 <p class="text-[10px] font-black uppercase tracking-[0.3em]">© 2026 JSPARK.AI LMS DIGITAL SYSTEMS. GLOBAL HEADQUARTERS.</p>
 <div class="flex gap-12 font-black uppercase tracking-[0.3em] text-[10px]">
 <span class="hover:text-indigo-400 transition-colors cursor-pointer">Security Protocol</span>
 <span class="hover:text-indigo-400 transition-colors cursor-pointer">Privacy Matrix</span>
 <span class="hover:text-indigo-400 transition-colors cursor-pointer">Digital Terms</span>
 </div>
 </div>
 </div>
 </footer>

 <!-- Premium Cookie Consent Banner (Modern & Non-Red) -->
 <div v-if="!cookiesAccepted" class="fixed bottom-0 inset-x-0 z-[60] p-6 animate-in slide-in-from-bottom duration-1000">
 <div class="max-w-4xl mx-auto bg-blue-950/90 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[40px] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
 <div class="flex items-center gap-6">
 <div class="w-14 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
 <feather type="info" size="24"></feather>
 </div>
 <p class="text-sm font-medium text-indigo-300 leading-relaxed">
 Your experience on this platform is enhanced by secure cookies. By continuing, you agree to our <span class="text-white font-bold underline cursor-pointer">Digital Privacy Protocol</span>.
 </p>
 </div>
 <div class="flex items-center gap-3 shrink-0">
 <button @click="cookiesAccepted = true" class="px-6 py-3.5 rounded-2xl bg-white text-blue-950 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Allow All</button>
 <button @click="cookiesAccepted = true" class="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Decline</button>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons/dist/feather';

export default {
 name: 'LandingPage',
 components: {
 feather: {
 props: ['type', 'size'],
 mounted() { feather.replace(); },
 updated() { feather.replace(); },
 render(h) {
 return h('i', {
 attrs: { 'data-feather': this.type, 'width': this.size || 24, 'height': this.size || 24 },
 class: 'inline-block align-middle'
 });
 }
 }
 },
 data() {
 return {
 scrolled: false,
 navLinks: [
 { name: 'Online Course', id: '#courses' },
 { name: 'Online Test', id: '#infrastructure' },
 { name: 'About Us', id: '#home' },
 { name: 'Discussion Forum', id: '#testimonials' },
 { name: 'Contact Us', id: '#contact' }
 ],
 featuredCourses: [
 { name: 'Python Learning Pro V4', tag: 'Data Engineering', price: '2,999', image: '/course_python_java_thumb.png' },
 { name: 'Java Architecture Lab', tag: 'Core Backend', price: '3,499', image: '/course_java_thumb_v2.png' },
 { name: 'Japanese Language Lab', tag: 'Linguistics', price: '2,499', image: '/course_japanese_thumb.png' },
 { name: 'English Verbal Mastery', tag: 'Communication', price: '1,999', image: '/course_english_thumb_v2.png' }
 ],
 features: [
 { title: 'Live Lectures', desc: 'Interactive real-time sessions with multi-user whiteboard integration and high-fidelity audio.', icon: 'video' },
 { title: 'Recorded VOD', desc: 'Access 4K high-definition archives of all previous sessions with AI-enhanced summaries.', icon: 'play-circle' },
 { title: 'Online Tests', desc: 'Comprehensive assessment engine with proctored environments and instant behavioral analytics.', icon: 'edit-3' },
 { title: 'Study Hub', desc: 'Centralized repository for high-quality curated notes, research papers, and code snippets.', icon: 'database' }
 ],
 footerLinks: [
 { title: 'Institutional', links: ['The Mission', 'Board of Advisors', 'Innovation Labs', 'Global Careers'] },
 { title: 'Academic Hub', links: ['Scholar Portal', 'Test Series V2', 'Linguistics Lab', 'Research Access'] },
 { title: 'Support Matrix', links: ['Contact Support', 'Digital Safety', 'Brand Identity', 'Institutional Sales'] }
 ],
 searchQuery: '',
 selectedCategories: [],
 mobileMenuOpen: false,
 cookiesAccepted: false
 }
 },
 computed: {
 filteredCourses() {
 return this.featuredCourses.filter(c => {
 const matchesSearch = c.name.toLowerCase().includes(this.searchQuery.toLowerCase());
 const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(c.tag);
 return matchesSearch && matchesCategory;
 });
 }
 },
 methods: {
 toggleCategory(cat) {
 if (this.selectedCategories.includes(cat)) {
 this.selectedCategories = this.selectedCategories.filter(c => c !== cat);
 } else {
 this.selectedCategories.push(cat);
 }
 },
 scrollPage(id) {
 const element = document.getElementById(id);
 if (element) {
 element.scrollIntoView({ behavior: 'smooth' });
 }
 }
 },
 mounted() {
 window.addEventListener('scroll', () => {
 this.scrolled = window.scrollY > 50;
 });
 }
}
</script>

<style scoped>
@keyframes float {
 0% { transform: translateY(0px) rotate(0deg); }
 50% { transform: translateY(-20px) rotate(1.5deg); }
 100% { transform: translateY(0px) rotate(0deg); }
}

@keyframes slide-up {
 from { opacity: 0; transform: translateY(40px); }
 to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce-subtle {
 0%, 100% { transform: translateY(0); }
 50% { transform: translateY(-10px); }
}

.animate-float {
 animation: float 10s ease-in-out infinite;
}

.animate-slide-up {
 animation: slide-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-bounce-subtle {
 animation: bounce-subtle 4s ease-in-out infinite;
}

/* Custom Hide Scrollbar but keep functionality */
.no-scrollbar::-webkit-scrollbar {
 display: none;
}
.no-scrollbar {
 -ms-overflow-style: none;
 scrollbar-width: none;
}

::placeholder {
 color: #cbd5e1;
 opacity: 1;
}

input:focus, textarea:focus {
 outline: none;
 box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}
</style>
