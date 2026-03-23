<template>
  <div class="import-questions-hub w-full space-y-4 py-1">
    <!-- Header Architecture -->
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
        <i data-feather="upload-cloud" class="w-6 h-6"></i>
      </div>
      <div>
        <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Import Questions</h2>
        <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Batch Ingestion &bull; Microsoft Word (.docx)</p>
      </div>
    </div>

    <!-- Central Ingestion Workspace -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5 max-w-4xl mx-auto overflow-hidden">
      <!-- High-Intensity Warning Banner -->
      <div class="bg-[#FFFBEB] border-b border-[#FEF3C7] px-6 py-3 flex items-center justify-end">
         <div class="flex items-center gap-2">
            <i data-feather="alert-circle" class="w-3.5 h-3.5 text-amber-600"></i>
            <span class="text-[10px] font-black text-amber-600 uppercase tracking-widest">Only word file (.docx) is supported</span>
         </div>
      </div>

      <!-- Logic Grid -->
      <div class="p-10 space-y-8">
         <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
               <!-- Subject Selection -->
               <div class="space-y-3">
                  <label class="block text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">
                     Choose Subject <span class="text-rose-500">*</span>
                  </label>
                  <div class="relative group">
                     <select class="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#0891B2] outline-none transition-all appearance-none">
                        <option value="">Search Subject</option>
                        <option v-for="sub in subjects" :key="sub">{{ sub }}</option>
                     </select>
                     <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-[#0891B2]">
                        <i data-feather="chevron-down" class="w-4 h-4"></i>
                     </div>
                  </div>
               </div>

               <!-- Native File Ingestor -->
               <div class="space-y-3">
                  <div class="flex items-center gap-4">
                     <button @click="$refs.fileInput.click()" class="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-lg font-black text-[9px] uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200">
                        Choose File
                     </button>
                     <span class="text-[10px] font-bold text-slate-400 italic">
                        {{ selectedFile ? selectedFile.name : 'No file chosen' }}
                     </span>
                     <input type="file" ref="fileInput" class="hidden" accept=".docx" @change="handleFileChange">
                  </div>
               </div>
            </div>
         </div>

         <!-- Action Architecture -->
         <div class="flex items-center justify-end pt-4">
            <button 
              @click="handleUpload"
              class="px-10 py-3 bg-[#59B5D3] hover:bg-[#0891B2] text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:shadow-[#0891B2]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-3"
            >
              <i data-feather="file-plus" class="w-4 h-4"></i>
              Upload File
            </button>
         </div>
      </div>
    </div>

    <!-- Help Documentation Center -->
    <div class="max-w-4xl mx-auto flex items-center justify-between px-6 opacity-40">
       <div class="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
          <i data-feather="info" class="w-3 h-3"></i>
          Standard Template (V.2.0)
       </div>
       <div class="flex items-center gap-6">
          <button class="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-[#0891B2] transition-colors">Download Sample</button>
          <button class="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-[#0891B2] transition-colors">Documentation</button>
       </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'ImportQuestions',
  data() {
    return {
      selectedFile: null,
      subjects: [
        'History of Medieval India',
        'Advanced Astrophysics',
        'Organic Chemistry II',
        'General Aptitude',
        'Logical Reasoning',
        'Indian Polity and Governance'
      ]
    }
  },
  methods: {
    handleFileChange(e) {
       this.selectedFile = e.target.files[0];
    },
    handleUpload() {
       if (!this.selectedFile) {
          alert('System Alert: No payload detected. Please select a .docx file.');
          return;
       }
       alert(`Initializing secure upload for: ${this.selectedFile.name}`);
       // Process logic here
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
.import-questions-hub {
  animation: slideUp 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
