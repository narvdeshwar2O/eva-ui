<template>
 <div class="h-screen w-full flex bg-[#F8FAFF] selection:bg-blue-100 overflow-hidden relative">
 
 <!-- Background Elements -->
 <div class="absolute inset-0 pointer-events-none z-0">
 <div class="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] bg-blue-50 rounded-full blur-[140px] animate-pulse"></div>
 <div class="absolute bottom-[-20%] left-[-20%] w-[70%] h-[70%] bg-indigo-50 rounded-full blur-[140px] animate-pulse" style="animation-delay: 3s"></div>
 </div>

 <!-- Left Side: Login Form -->
 <div class="flex-1 flex flex-col items-center justify-center p-8 relative z-10 bg-white/40 backdrop-blur-3xl lg:bg-transparent overflow-y-auto">
 <div class="w-full max-w-md space-y-12 my-12">
 
 <!-- Logo -->
 <div class="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom duration-700">
 <div class="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/40">
 <feather type="zap" size="32"></feather>
 </div>
 <div class="text-center space-y-2">
 <h1 class="text-4xl font-black text-blue-950 tracking-tight uppercase">Portal Access</h1>
 <p class="text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em]">Institutional Single Sign-On</p>
 </div>
 </div>

 <!-- Form -->
 <form @submit.prevent="handleLogin" class="space-y-6 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
 
 <div class="space-y-2">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">Email Address</label>
 <div class="relative group">
 <div class="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 group-focus-within:text-blue-600 transition-colors">
 <feather type="mail" size="18"></feather>
 </div>
 <input 
 type="email" 
 v-model="email" 
 placeholder="admin@jspark.ai"
 class="w-full h-11 pl-12 pr-6 rounded-2xl bg-white border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 transition-all"
 />
 </div>
 </div>

 <div class="space-y-2">
 <div class="flex justify-between items-center px-1">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Password</label>
 <a href="#" class="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Forgot?</a>
 </div>
 <div class="relative group">
 <div class="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 group-focus-within:text-blue-600 transition-colors">
 <feather type="lock" size="18"></feather>
 </div>
 <input 
 :type="showPassword ? 'text' : 'password'" 
 v-model="password" 
 placeholder="••••••••"
 class="w-full h-11 pl-12 pr-14 rounded-2xl bg-white border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 transition-all"
 />
 <button 
 type="button"
 @click="showPassword = !showPassword"
 class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-blue-600 transition-colors"
 >
 <feather :type="showPassword ? 'eye-off' : 'eye'" size="18"></feather>
 </button>
 </div>
 </div>

 <div class="flex items-center gap-2 px-1">
 <input type="checkbox" id="remember" class="w-4 h-4 rounded border-indigo-300 text-blue-600 focus:ring-blue-500" checked />
 <label for="remember" class="text-[11px] font-bold text-blue-500 uppercase tracking-widest cursor-pointer">Keep me logged in</label>
 </div>

 <button 
 type="submit"
 class="w-fit px-8 mx-auto sm:mx-0 h-11 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 group"
 >
 Sign In to Dashboard
 <feather type="arrow-right" size="16" class="group-hover:translate-x-1 transition-transform"></feather>
 </button>
 </form>

 <p class="text-center text-[11px] font-bold text-indigo-400 uppercase tracking-widest animate-in fade-in duration-700 delay-500">
 Don't have an account? 
 <a href="#" class="text-blue-600 font-black hover:underline ml-1">Request Access</a>
 </p>
 </div>
 </div>

 <!-- Right Side: Decorative/Image (Hidden on mobile) -->
 <div class="hidden lg:flex flex-1 p-8">
 <div class="w-full h-full rounded-[40px] bg-blue-950 overflow-hidden relative group">
 <div class="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-all duration-700 z-10"></div>
 <img src="/lms_hero.png" class="absolute w-[120%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-sm scale-110 group-hover:scale-125 transition-all duration-1000" />
 
 <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-16 space-y-8 z-20">
 <div class="w-24 h-px bg-blue-600"></div>
 <h2 class="text-5xl font-black text-white tracking-tight leading-tight">
 Advanced Analytics for <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Better Learning.</span>
 </h2>
 <p class="text-lg text-indigo-400 font-medium max-w-sm leading-relaxed">
 Join our elite community of educators and students leveraging data-driven insights to master the skills of tomorrow.
 </p>
 
 <div class="grid grid-cols-2 gap-8 pt-8">
 <div class="space-y-1">
 <p class="text-3xl font-black text-white">24/7</p>
 <p class="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Live Support</p>
 </div>
 <div class="space-y-1">
 <p class="text-3xl font-black text-white">99.9%</p>
 <p class="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Platform Uptime</p>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Back Button to Home -->
 <button @click="$router.push('/')" class="absolute top-8 left-8 flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-blue-950 transition-colors group z-20">
 <feather type="arrow-left" size="14" class="group-hover:-translate-x-1 transition-transform"></feather>
 Back to Website
 </button>

 </div>
</template>

<script>
import feather from 'feather-icons/dist/feather';

export default {
 name: 'LoginPage',
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
 email: 'admin@jspark.ai',
 password: 'password123',
 showPassword: false
 }
 },
 methods: {
 handleLogin() {
 // Simulate Session Storage for Router Guard
 localStorage.setItem('token', 'JSPARK_SESSION_2026_ACTIVE');
 this.$emit('auth-success');
 }
 }
}
</script>

<style scoped>
.animate-in {
 animation-fill-mode: both;
}
</style>
