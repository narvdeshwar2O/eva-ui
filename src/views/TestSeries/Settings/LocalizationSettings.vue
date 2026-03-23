<template>
  <div class="localization-settings-hub w-full p-3 space-y-3 animate-fade-in">
    <!-- Sophisticated Header -->
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
        <i data-feather="globe" class="w-6 h-6"></i>
      </div>
      <div>
        <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Localization Settings</h2>
        <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Regional Logic & Cultural Configuration</p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-3">
      <!-- Regional Config Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
        <div class="lg:col-span-1">
          <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Geographic Context</h3>
          <p class="text-[10px] text-slate-400 font-bold mt-2 uppercase leading-relaxed">Define the linguistic and temporal alignment for your global academic audience.</p>
        </div>
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
           <div class="p-8 space-y-8">
              <!-- Default Locale -->
              <div class="space-y-4">
                 <div class="space-y-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Default Locale</label>
                    <div class="relative group">
                       <select v-model="settings.locale" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all appearance-none shadow-inner cursor-pointer">
                          <option value="en_US">en_US - English (United States)</option>
                          <option value="hi_IN">hi_IN - Hindi (India)</option>
                          <option value="bn_IN">bn_IN - Bengali (India)</option>
                          <option value="es_ES">es_ES - Spanish (Spain)</option>
                       </select>
                       <i data-feather="chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none transition-transform group-focus-within:rotate-180"></i>
                    </div>
                 </div>

                 <!-- Regional Translation Alert -->
                 <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-4">
                    <div class="w-8 h-8 rounded-lg bg-white border border-blue-200 flex items-center justify-center text-blue-500 flex-shrink-0 shadow-sm">
                       <i data-feather="info" class="w-4 h-4"></i>
                    </div>
                    <div>
                       <p class="text-[11px] font-bold text-blue-900 leading-relaxed">
                          <span class="font-black text-[#0891B2]">"{{ settings.locale }}.json"</span> language translations file must exist in the <span class="bg-blue-100/50 px-1.5 py-0.5 rounded text-blue-700 font-black">RESOURCES/LANG</span> directory.
                       </p>
                    </div>
                 </div>
              </div>

              <!-- Default Direction -->
              <div class="space-y-2">
                 <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Default Direction</label>
                 <div class="relative group">
                    <select v-model="settings.direction" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all appearance-none shadow-inner cursor-pointer">
                       <option value="LTR">Left to Right (LTR)</option>
                       <option value="RTL">Right to Left (RTL)</option>
                    </select>
                    <i data-feather="chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none transition-transform group-focus-within:rotate-180"></i>
                 </div>
              </div>

              <!-- Default Timezone -->
              <div class="space-y-2">
                 <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Default Timezone</label>
                 <div class="relative group">
                    <select v-model="settings.timezone" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all appearance-none shadow-inner cursor-pointer">
                       <option value="Asia/Kolkata">Asia/Kolkata</option>
                       <option value="UTC">UTC (Universal Time Coordinated)</option>
                       <option value="America/New_York">America/New_York</option>
                       <option value="Europe/London">Europe/London</option>
                    </select>
                    <i data-feather="chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none transition-transform group-focus-within:rotate-180"></i>
                 </div>
              </div>
           </div>
           
           <!-- Save Footer -->
           <div class="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button @click="saveLocalization" class="px-6 py-2 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#0891B2]/20 hover:-translate-y-0.5 active:scale-95 transition-all">Save Regional Spec</button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'LocalizationSettings',
  data() {
    return {
      settings: {
        locale: 'hi_IN',
        direction: 'LTR',
        timezone: 'Asia/Kolkata'
      }
    }
  },
  methods: {
    saveLocalization() {
      alert(`Regional logic deployed successfully in ${this.settings.timezone} context.`);
    }
  },
  mounted() {
    feather.replace();
  },
  updated() {
    feather.replace();
  }
}
</script>

<style scoped>
.localization-settings-hub {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
