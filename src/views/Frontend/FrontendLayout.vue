<template>
 <div class="min-h-screen flex flex-col bg-[#FDFDFF] text-blue-950 font-sans selection:bg-indigo-100 relative overflow-x-hidden">
 
 <!-- Premium Mesh Background Blobs -->
 <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
 <div class="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-blue-100/40 rounded-full blur-[140px] opacity-70 animate-pulse"></div>
 <div class="absolute bottom-[-10%] right-[-15%] w-[60%] h-[60%] bg-indigo-100/40 rounded-full blur-[140px] opacity-60 animate-pulse" style="animation-delay: 3s"></div>
 </div>

 <!-- Navigation (Moved from LandingPage) -->
 <nav :class="['fixed top-0 w-full z-50 transition-all duration-700 px-6 py-3', scrolled ? 'bg-white/80 backdrop-blur-3xl border-b border-blue-200/40 shadow-xl shadow-blue-950/5' : 'bg-transparent']">
 <div class="max-w-7xl mx-auto flex items-center flex-nowrap gap-4 lg:gap-0">
 <!-- Logo (Left) -->
 <div class="flex-1 flex justify-start">
 <div class="flex items-center gap-3 cursor-pointer group shrink-0" @click="$router.push('/')">
 <div class="w-11 h-11 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30 group-hover:rotate-6 transition-all duration-500">
 <feather type="zap" size="22" stroke-width="2.5"></feather>
 </div>
 <div class="flex flex-col">
 <span class="text-xl font-black tracking-tight text-blue-950 uppercase leading-none">Jspark.ai</span>
 <span class="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] mt-1">LMS Systems</span>
 </div>
 </div>
 </div>

 <!-- Menu (Center) -->
 <div class="hidden lg:flex items-center justify-center gap-6 xl:gap-8 whitespace-nowrap px-4 border-l border-r border-blue-100/50 mx-4">
 <router-link v-for="link in navLinks" :key="link.name" :to="link.path" class="text-[10px] xl:text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-indigo-600 text-blue-950 hover:scale-105" active-class="text-indigo-600 border-b-2 border-indigo-600 py-1">
 {{ link.name }}
 </router-link>
 </div>

 <!-- Buttons (Right) -->
 <div class="flex-1 flex items-center justify-end gap-2 xl:gap-3 flex-nowrap shrink-0">
 <button @click="$router.push('/notice-board')" class="hidden xl:flex px-5 py-2.5 rounded-xl border-2 border-blue-100 bg-white/50 text-indigo-600 text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-indigo-200 hover:bg-blue-50 transition-all active:scale-95 items-center gap-2">
 <feather type="clipboard" size="14"></feather> Notice Board
 </button>
 <div class="h-8 w-px bg-blue-200/60 mx-1 hidden xl:block"></div>
 <button @click="$router.push('/login')" class="hidden sm:block px-5 py-2.5 rounded-xl text-blue-950 text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 transition-colors">Login</button>
 <button @click="$router.push('/login')" class="px-7 py-3 rounded-2xl bg-blue-950 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-blue-950/20 hover:bg-black transition-all">Register</button>
 <button @click="mobileMenuOpen = true" class="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-blue-100 text-blue-950 shadow-sm active:scale-95 transition-all"><feather type="menu" size="20"></feather></button>
 </div>
 </div>
 </nav>

 <!-- Mobile Nav Overlay -->
 <div v-if="mobileMenuOpen" class="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl animate-in fade-in duration-300">
 <div class="p-8 flex flex-col h-full text-left">
 <div class="flex items-center justify-between mb-20">
 <div class="flex items-center gap-3"><div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white"><feather type="zap" size="20"></feather></div><span class="text-xl font-black uppercase tracking-tighter">Jspark.ai</span></div>
 <button @click="mobileMenuOpen = false" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-100 text-blue-950"><feather type="x" size="24"></feather></button>
 </div>
 <div class="flex flex-col gap-10">
 <router-link v-for="link in navLinks" :key="link.name" :to="link.path" @click.native="mobileMenuOpen = false" class="text-4xl font-black text-blue-950 tracking-tighter hover:text-indigo-600 transition-colors lowercase first-letter:uppercase">{{ link.name }}</router-link>
 </div>
 <div class="mt-auto space-y-4">
 <button @click="$router.push('/notice-board'); mobileMenuOpen = false" class="w-fit px-8 mx-auto sm:mx-0 py-3 rounded-2xl bg-indigo-50 text-indigo-600 text-[11px] font-black uppercase tracking-widest">Notice Board</button>
 <button @click="$router.push('/login'); mobileMenuOpen = false" class="w-fit px-8 mx-auto sm:mx-0 py-3 rounded-2xl bg-blue-950 text-white text-[11px] font-black uppercase tracking-widest shadow-2xl">Login Account</button>
 </div>
 </div>
 </div>

 <!-- MAIN VIEW AREA -->
 <main class="relative z-10 mt-auto">
 <router-view></router-view>
 </main>

 <!-- Footer -->
 <footer class="mt-auto bg-black py-24 px-6 text-white rounded-t-[100px] relative z-20 overflow-hidden">
 <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] translate-y-1/2 translate-x-1/2"></div>
 <div class="max-w-7xl mx-auto">
 <div class="grid grid-cols-1 md:grid-cols-4 gap-20 items-start text-left">
 <div class="space-y-10 group">
 <div class="flex items-center gap-4 cursor-pointer" @click="$router.push('/')">
 <div class="w-14 h-11 bg-indigo-600 rounded-[2.2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/30 group-hover:rotate-12 transition-all"><feather type="zap" size="28" stroke-width="2.5"></feather></div>
 <div class="flex flex-col">
 <span class="text-2xl font-black tracking-tighter uppercase text-white leading-none">Jspark.ai LMS</span>
 <span class="text-[8px] font-black text-indigo-400 uppercase tracking-[0.4em] mt-1">Digital Systems</span>
 </div>
 </div>
 <p class="text-[11px] text-blue-700 font-bold leading-relaxed uppercase tracking-[0.15em] brightness-200">Redefining Educational Engineering through high-performance digital architecture and innovative mentorship.</p>
 <div class="flex items-center gap-5">
 <div v-for="icon in ['facebook', 'twitter', 'instagram', 'linkedin']" :key="icon" class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 hover:text-white hover:border-indigo-500 hover:-translate-y-1 transition-all cursor-pointer shadow-lg hover:bg-blue-950"><feather :type="icon" size="16"></feather></div>
 </div>
 </div>
 <div v-for="(col, i) in footerLinks" :key="i" class="space-y-10">
 <h5 class="text-[12px] font-black text-white uppercase tracking-[0.4em]">{{ col.title }}</h5>
 <ul class="space-y-5 text-blue-500">
 <li v-for="link in col.links" :key="link"><a href="#" class="text-[10px] font-black hover:text-indigo-400 transition-colors uppercase tracking-[0.25em]">{{ link }}</a></li>
 </ul>
 </div>
 <div class="space-y-10">
 <h5 class="text-[12px] font-black text-white uppercase tracking-[0.4em]">Download App</h5>
 <button class="flex items-center gap-4 bg-white/10 p-5 rounded-3xl border border-white/10 hover:bg-white hover:text-blue-950 transition-all group overflow-hidden relative"><feather type="smartphone" size="28"></feather><div class="text-left relative z-10"><p class="text-[8px] font-black uppercase opacity-60">Available on</p><p class="text-[12px] font-black uppercase tracking-widest">Play Store</p></div></button>
 </div>
 </div>
 <div class="pt-24 border-t border-white/5 mt-20 flex flex-col md:flex-row items-center justify-between gap-10 opacity-30 text-white">
 <p class="text-[10px] font-black uppercase tracking-[0.3em]">© 2026 JSPARK.AI LMS DIGITAL SYSTEMS.</p>
 <div class="flex gap-12 font-black uppercase tracking-[0.3em] text-[10px]"><span>Security</span><span>Privacy</span><span>Terms</span></div>
 </div>
 </div>
 </footer>

 <!-- Cookie Consent -->
 <div v-if="!cookiesAccepted" class="fixed bottom-0 inset-x-0 z-[60] p-6 animate-in slide-in-from-bottom duration-1000">
 <div class="max-w-4xl mx-auto bg-blue-950/90 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[40px] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-left">
 <div class="flex items-center gap-6"><div class="w-14 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0"><feather type="info" size="24"></feather></div><p class="text-sm font-medium text-indigo-300 leading-relaxed">Your experience on this platform is enhanced by secure cookies. By continuing, you agree to our <span class="text-white font-bold underline cursor-pointer">Privacy Protocol</span>.</p></div>
 <div class="flex items-center gap-3 shrink-0"><button @click="cookiesAccepted = true" class="px-6 py-3.5 rounded-2xl bg-white text-blue-950 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Allow All</button></div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons/dist/feather';

export default {
 name: 'FrontendLayout',
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
 mobileMenuOpen: false,
 cookiesAccepted: false,
 navLinks: [
 { name: 'Online Course', path: '/courses' },
 { name: 'Online Test', path: '/tests' },
 { name: 'About Us', path: '/about' },
 { name: 'Discussion Forum', path: '/forum' },
 { name: 'Contact Us', path: '/contact' }
 ],
 footerLinks: [
 { title: 'Institutional', links: ['The Mission', 'Board of Advisors', 'Innovation Labs', 'Global Careers'] },
 { title: 'Academic Hub', links: ['Scholar Portal', 'Test Series V2', 'Linguistics Lab', 'Research Access'] },
 { title: 'Support Matrix', links: ['Contact Support', 'Digital Safety', 'Brand Identity', 'Institutional Sales'] }
 ]
 }
 },
 mounted() {
 window.addEventListener('scroll', () => {
 this.scrolled = window.scrollY > 50;
 });
 }
}
</script>
