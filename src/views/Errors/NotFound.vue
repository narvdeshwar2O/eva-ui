<template>
  <div class="not-found-odyssey h-screen w-full flex items-center justify-center bg-[#F0F7FF] font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden relative">
    <!-- Abstract Background Atmosphere -->
    <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
    <div class="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] animate-pulse"></div>
    
    <div class="relative z-10 text-center space-y-8 max-w-lg px-8">
      <!-- Premium Illustration Hub -->
      <div class="relative inline-block group">
        <div class="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000"></div>
        <div class="relative bg-white/40 backdrop-blur-3xl border border-white/20 p-12 rounded-[40px] shadow-2xl shadow-blue-900/10 hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2">
            <h1 class="text-[160px] font-black text-[#1E293B] tracking-tighter leading-none select-none opacity-90">4<span class="text-[#0891B2]">0</span>4</h1>
            <div class="h-1.5 w-32 bg-gradient-to-r from-[#0891B2] to-teal-500 rounded-full mx-auto mt-4"></div>
        </div>
        
        <!-- Animated Tag -->
        <div class="absolute -top-4 -right-4 bg-rose-500 text-white text-[10px] font-black px-4 py-2 rounded-xl border-4 border-white shadow-xl rotate-12 transform hover:rotate-0 transition-transform cursor-default uppercase tracking-widest">
           Route Terminated
        </div>
      </div>

      <!-- Sophisticated Messaging -->
      <div class="space-y-3">
        <h2 class="text-3xl font-black text-[#1E293B] tracking-tight">System Node Not Found</h2>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto opacity-80">
          The architectural coordinates you requested are no longer active or have been relocated within the LMS cloud.
        </p>
      </div>

      <!-- Action Nexus -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          @click="$router.go(-1)"
          class="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:border-blue-200 hover:text-blue-600 hover:bg-white shadow-sm transition-all flex items-center gap-3 group"
        >
          <i data-feather="arrow-left" class="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors"></i>
          Return to Previous Node
        </button>

        <button 
          @click="$router.push('/')"
          class="px-6 py-2 bg-[#0891B2] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#0D9488] shadow-xl shadow-[#0891B2]/20 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3 group"
        >
          <i data-feather="home" class="w-4 h-4 text-white"></i>
          Initialize Home
        </button>
      </div>

      <!-- Technical Meta -->
      <div class="pt-8 opacity-40">
        <p class="text-[9px] font-black text-slate-400 tracking-[0.3em] uppercase underline-offset-8 decoration-[#0891B2] decoration-2">Status Node Trace: Missing_Reference &bull; V.3.1</p>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'NotFound',
  mounted() {
    feather.replace();
  }
}
</script>

<style scoped>
.not-found-odyssey {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(1.02); }
  to { opacity: 1; transform: scale(1); }
}

h1 {
  text-shadow: 0 10px 30px rgba(30, 41, 59, 0.05);
}
</style>
