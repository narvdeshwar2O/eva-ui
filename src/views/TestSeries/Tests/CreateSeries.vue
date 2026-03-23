<template>
  <div class="test-architect-screen w-full py-4 space-y-4">
    <!-- Sophisticated Header -->
    <div class="flex items-center gap-6 px-10">
      <div
        @click="$router.push('/test-series')"
        class="w-14 h-14 bg-white rounded-2xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2] hover:bg-[#0891B2] hover:text-white hover:rotate-[-10deg] cursor-pointer transition-all duration-500 active:scale-90 group"
      >
        <i data-feather="arrow-left" class="w-6 h-6 group-hover:-translate-x-1 transition-transform"></i>
      </div>
      <div>
        <h2 class="text-4xl font-black text-[#1E293B] tracking-[-3px] flex items-center gap-4">
          Drafting Machine
          <span class="w-10 h-10 rounded-full bg-[#0891B2]/10 flex items-center justify-center text-[#0891B2]"><i data-feather="edit-3" class="w-4 h-4"></i></span>
        </h2>
        <p class="text-[10px] text-[#0891B2] font-black uppercase tracking-[0.4em] leading-none mt-1 ml-1 opacity-70">Project Code: TS-00912X &bull; Version 4.0</p>
      </div>
    </div>

    <!-- Main Configuration Studio -->
    <div class="craft-studio-card bg-white rounded-xl shadow-2xl shadow-blue-900/5 border border-blue-50 relative overflow-hidden">
      <!-- Top Accent Bar -->
      <div class="h-1 w-full bg-gradient-to-r from-[#0891B2] via-[#0EA5E9] to-[#0891B2] animate-shimmer"></div>

      <div class="p-4 space-y-4 backdrop-blur-3xl">
        <!-- Structural Parameters -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="input-architect group">
            <label class="studio-label">Series Specification Name</label>
            <div class="input-wrapper-v2 bg-[#F8FAFC] border border-transparent group-focus-within:border-[#0891B2] group-focus-within:bg-white transition-all duration-500 rounded-xl flex items-center px-4 py-2 shadow-inner group-hover:shadow-lg">
               <i data-feather="terminal" class="w-3 h-3 text-slate-400 group-focus-within:text-[#0891B2] transition-colors"></i>
               <input type="text" placeholder="e.g. Advanced Mock 2024" class="bg-transparent border-none outline-none w-full px-2 text-xs font-bold text-slate-800 placeholder:text-slate-300">
            </div>
          </div>

          <div class="input-architect group">
            <label class="studio-label">Root Taxonomy Category</label>
            <div class="input-wrapper-v2 bg-[#F8FAFC] border border-transparent group-focus-within:border-[#0D9488] group-focus-within:bg-white transition-all duration-500 rounded-xl flex items-center px-4 py-2 shadow-inner group-hover:shadow-lg">
               <i data-feather="hash" class="w-3 h-3 text-slate-400 group-focus-within:text-[#0D9488] transition-colors"></i>
               <select class="bg-transparent border-none outline-none w-full px-2 text-xs font-bold text-slate-800 appearance-none hover:cursor-pointer">
                 <option value="">Select Category Tree</option>
                 <option value="1">UPSC Civil Services</option>
                 <option value="2">IIT-JEE Management</option>
                 <option value="3">Medical Entrance</option>
               </select>
               <i data-feather="chevron-down" class="ml-auto w-4 h-4 text-slate-400 pointer-events-none"></i>
            </div>
          </div>
        </div>

        <!-- Description Layer -->
        <div class="input-architect group">
          <label class="studio-label">Institutional Instructions / Description</label>
          <div class="input-wrapper-v2 bg-[#F8FAFC] border-2 border-transparent group-focus-within:border-[#0891B2] group-focus-within:bg-white transition-all duration-500 rounded-xl flex items-start p-6 shadow-inner group-hover:shadow-lg">
             <i data-feather="align-left" class="mt-1 w-4 h-4 text-slate-400 group-focus-within:text-[#0891B2] transition-colors"></i>
             <textarea rows="5" placeholder="Define the pedagogical approach and rules for this series..." class="bg-transparent border-none outline-none w-full px-4 text-sm font-bold text-slate-800 placeholder:text-slate-300 resize-none"></textarea>
          </div>
        </div>

        <!-- Metric Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
           <div class="input-architect group">
              <label class="studio-label">Monetary Value (INR)</label>
              <div class="input-wrapper-v2 bg-[#F8FAFC] border-2 border-transparent focus-within:border-[#0891B2] focus-within:bg-white transition-all duration-500 rounded-xl flex items-center px-6 py-4 shadow-inner group-hover:shadow-lg">
                 <span class="text-xs font-black text-slate-400 group-focus-within:text-[#0891B2] mr-2">₹</span>
                 <input type="number" placeholder="0.00" class="bg-transparent border-none outline-none w-full px-2 text-sm font-bold text-slate-800 tabular-nums">
              </div>
           </div>

           <div class="md:col-span-2 space-y-4">
              <label class="studio-label">Feature Metadata Tags</label>
              <div class="flex flex-wrap gap-3">
                 <div
                    v-for="tag in ['LIVE RANKING', 'PDF SOLUTIONS', 'VIDEO ANALYSIS', '24/7 SUPPORT']"
                    :key="tag"
                    class="tag-pill"
                 >
                    <i data-feather="tag" class="w-3 h-3 opacity-50"></i>
                    {{ tag }}
                 </div>
              </div>
           </div>
        </div>

        <!-- Toggle Mechanism -->
        <div class="pro-toggle-card p-4 bg-[#0891B2]/5 border border-[#0891B2]/10 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-2xl hover:shadow-[#0891B2]/10 transition-all duration-700">
           <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-white rounded-xl shadow-lg shadow-[#0891B2]/10 flex items-center justify-center text-[#0891B2] group-hover:rotate-12 transition-transform duration-500">
                 <i data-feather="shield-off" class="w-4 h-4"></i>
              </div>
              <div>
                <h4 class="text-xs font-black text-slate-800 tracking-[-0.5px]">Anti-Cheat System</h4>
                <p class="text-[8px] text-[#0891B2] font-black uppercase tracking-[0.1em]">AI Tracking Enabled</p>
              </div>
           </div>
           <div class="h-10 w-20 bg-slate-200 rounded-full relative cursor-pointer border-4 border-white shadow-inner group-hover:border-[#0891B2]/10">
              <div class="absolute inset-y-0.5 left-0.5 w-7 h-7 bg-white rounded-full shadow-lg transition-all duration-300 transform translate-x-0 group-hover:bg-[#0891B2] group-hover:translate-x-10"></div>
           </div>
        </div>
      </div>

      <!-- Footer Control Panel -->
      <div class="px-16 py-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center justify-between border-t border-slate-700">
        <div class="flex items-center gap-4 text-slate-400 group cursor-pointer hover:text-white transition-all">
          <i data-feather="help-circle" class="w-4 h-4 group-hover:animate-pulse"></i>
          <span class="text-[9px] font-black uppercase tracking-[0.4em]">Draft Preservation Mode</span>
        </div>

        <div class="flex items-center gap-6">
          <button @click="$router.push('/test-series')" class="text-xs font-black text-slate-400 hover:text-rose-400 uppercase tracking-widest transition-colors">Abort Project</button>
          <button class="flex items-center gap-4 px-8 py-2 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all">
            <i data-feather="cloud-drizzle" class="w-4 h-4"></i>
            Finalize Blueprint
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'CreateSeries',
  mounted() {
    feather.replace();
  },
  updated() {
    feather.replace();
  }
}
</script>

<style scoped>
.studio-label {
  display: block;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  color: #64748B;
  letter-spacing: 0.3em;
  margin-left: 1rem;
  margin-bottom: 0.75rem;
  opacity: 0.7;
}

.input-wrapper-v2 {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.tag-pill {
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  background-color: #F8FAFC;
  border: 1px solid #F1F5F9;
  color: #64748B;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.2em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s;
}

.tag-pill:hover {
  background-color: #0891B2;
  color: white;
  border-color: #0891B2;
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(8, 145, 178, 0.2);
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-shimmer {
  background-size: 200% 100%;
  animation: shimmer 5s infinite linear;
}
</style>
