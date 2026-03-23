<template>
  <div class="general-settings-hub w-full p-3 space-y-3 animate-fade-in">
    <!-- Sophisticated Header -->
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
        <i data-feather="settings" class="w-6 h-6"></i>
      </div>
      <div>
        <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">General Settings</h2>
        <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Global Instance Configuration</p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-3">
      <!-- Site Settings Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div class="lg:col-span-1">
          <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Site Settings</h3>
          <p class="text-[10px] text-slate-400 font-bold mt-2 uppercase leading-relaxed">Configure the core identity and global accessibility of your academic instance.</p>
        </div>
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
           <div class="p-8 space-y-6">
              <div class="space-y-2">
                 <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Site Name</label>
                 <input v-model="settings.siteName" type="text" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all shadow-inner">
              </div>
              <div class="space-y-2">
                 <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tag Line</label>
                 <input v-model="settings.tagLine" type="text" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all shadow-inner">
              </div>
              <div class="space-y-2">
                 <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SEO Description</label>
                 <textarea v-model="settings.seoDescription" rows="4" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all shadow-inner resize-none"></textarea>
              </div>
              <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-2xl p-5 flex items-center justify-between shadow-inner">
                 <div>
                    <h4 class="text-xs font-black text-slate-700 uppercase tracking-tight">Enable User Registration</h4>
                    <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">{{ settings.registrationEnabled ? 'Enabled' : 'Disabled' }}</p>
                 </div>
                 <div 
                  @click="settings.registrationEnabled = !settings.registrationEnabled"
                  class="w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-500 relative shadow-inner"
                  :class="settings.registrationEnabled ? 'bg-[#0891B2]' : 'bg-slate-300'"
                 >
                  <div class="bg-white w-5 h-5 rounded-full shadow-lg transition-all duration-500 transform" :class="settings.registrationEnabled ? 'translate-x-7' : 'translate-x-0'"></div>
                 </div>
              </div>
           </div>
           <div class="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button @click="saveSection('Site Settings')" class="px-6 py-2 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#0891B2]/20 hover:-translate-y-0.5 active:scale-95 transition-all">Save</button>
           </div>
        </div>
      </div>

      <!-- Site Logo Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
        <div class="lg:col-span-1">
          <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Site Logo</h3>
          <p class="text-[10px] text-slate-400 font-bold mt-2 uppercase leading-relaxed">Primary branding asset used across the administrative and user interfaces.</p>
        </div>
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
           <div class="p-8 space-y-6">
              <div class="space-y-4">
                 <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Site Logo</label>
                 <div class="w-full h-32 bg-[#F8FAFC] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center group hover:border-[#0891B2]/30 transition-all cursor-pointer overflow-hidden p-4" @click="$refs.logoInput.click()">
                    <img v-if="settings.siteLogo" :src="settings.siteLogo" class="h-full object-contain filter drop-shadow-md">
                    <div v-else class="text-center">
                       <i data-feather="image" class="w-8 h-8 text-slate-300 mx-auto mb-2"></i>
                       <p class="text-[9px] font-black text-slate-400 uppercase">Drop primary logo here</p>
                    </div>
                 </div>
                 <input type="file" ref="logoInput" class="hidden" @change="handleImageUpload($event, 'siteLogo')" accept="image/*">
                 <button @click="$refs.logoInput.click()" class="px-6 py-2 bg-white border border-slate-200 shadow-sm rounded-xl text-[9px] font-black text-slate-600 uppercase tracking-widest hover:border-[#0891B2]/30 hover:text-[#0891B2] transition-all">Select a New Image</button>
              </div>
           </div>
           <div class="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button @click="saveSection('Site Logo')" class="px-6 py-2 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#0891B2]/20 hover:-translate-y-0.5 active:scale-95 transition-all">Save</button>
           </div>
        </div>
      </div>

      <!-- White Logo Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
        <div class="lg:col-span-1">
          <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Site White Logo</h3>
          <p class="text-[10px] text-slate-400 font-bold mt-2 uppercase leading-relaxed">Optimized logo for dark themed interfaces and headers.</p>
        </div>
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
           <div class="p-8 space-y-6">
              <div class="space-y-4">
                 <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Site White Logo</label>
                 <div class="w-full h-32 bg-slate-800 rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer" @click="$refs.whiteLogoInput.click()">
                    <img v-if="settings.whiteLogo" :src="settings.whiteLogo" class="h-full object-contain">
                    <div v-else class="text-center">
                       <p class="text-[9px] font-black text-slate-500 uppercase">White Version Preview</p>
                    </div>
                 </div>
                 <input type="file" ref="whiteLogoInput" class="hidden" @change="handleImageUpload($event, 'whiteLogo')" accept="image/*">
                 <button @click="$refs.whiteLogoInput.click()" class="px-6 py-2 bg-white border border-slate-200 shadow-sm rounded-xl text-[9px] font-black text-slate-600 uppercase tracking-widest hover:border-[#0891B2]/30 hover:text-[#0891B2] transition-all">Select a New Image</button>
              </div>
           </div>
           <div class="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button @click="saveSection('White Logo')" class="px-6 py-2 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#0891B2]/20 hover:-translate-y-0.5 active:scale-95 transition-all">Save</button>
           </div>
        </div>
      </div>

      <!-- Favicon Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
        <div class="lg:col-span-1">
          <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">Site Favicon</h3>
          <p class="text-[10px] text-slate-400 font-bold mt-2 uppercase leading-relaxed">The browser tab icon representing your digital identity.</p>
        </div>
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden">
           <div class="p-8 space-y-6">
              <div class="space-y-4">
                 <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Site Favicon</label>
                 <div class="w-20 h-20 bg-[#F8FAFC] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-2 group hover:border-[#0891B2]/30 transition-all cursor-pointer" @click="$refs.faviconInput.click()">
                    <img v-if="settings.favicon" :src="settings.favicon" class="w-10 h-10 object-contain">
                 </div>
                 <input type="file" ref="faviconInput" class="hidden" @change="handleImageUpload($event, 'favicon')" accept="image/*">
                 <button @click="$refs.faviconInput.click()" class="px-6 py-2 bg-white border border-slate-200 shadow-sm rounded-xl text-[9px] font-black text-slate-600 uppercase tracking-widest hover:border-[#0891B2]/30 hover:text-[#0891B2] transition-all">Select a New Image</button>
              </div>
           </div>
           <div class="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button @click="saveSection('Favicon')" class="px-6 py-2 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#0891B2]/20 hover:-translate-y-0.5 active:scale-95 transition-all">Save</button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'GeneralSettings',
  data() {
    return {
      settings: {
        siteName: 'Online Tutes',
        tagLine: 'Online Tutes Strategy Hub',
        seoDescription: 'Premium academic management and test series deployment platform.',
        registrationEnabled: false,
        siteLogo: 'https://img.logoipsum.com/285.svg',
        whiteLogo: 'https://img.logoipsum.com/284.svg',
        favicon: 'https://img.logoipsum.com/299.svg'
      }
    }
  },
  methods: {
    handleImageUpload(event, key) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.settings[key] = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveSection(section) {
      alert(`${section} configuration has been deployed successfully.`);
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
.general-settings-hub {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
