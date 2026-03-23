<template>
  <div class="tag-repository-hub w-full p-3 space-y-3">
    <!-- Premium Header Section -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="tag" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Global Tags</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Metadata Layer &bull; {{ tags.length }} Keywords</p>
        </div>
      </div>

      <button 
        @click="initializeNewTag"
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
      >
        <i data-feather="plus-circle" class="w-4 h-4 text-white"></i>
        New Tag
      </button>
    </div>

    <!-- Keyword Distribution Matrix (Table) -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5 overflow-hidden">
      <div class="overflow-x-auto min-h-[400px]">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F8FAFC] border-b border-slate-200">
              <th v-for="col in ['NAME', 'STATUS', 'ACTIONS']" :key="col" class="px-4 py-5 text-[11px] font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
            <!-- Intelligent Filtering Row -->
            <tr class="bg-white/30 backdrop-blur-sm border-b border-[#F1F5F9]">
              <td class="px-2 py-2"><input type="text" placeholder="Search Tag Name" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:bg-white focus:border-[#0891B2]/30 transition-all shadow-inner"></td>
              <td class="px-2 py-2"><input type="text" placeholder="Search Status" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:bg-white focus:border-[#0891B2]/30 transition-all shadow-inner"></td>
              <td class="px-2 py-2"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-if="tags.length === 0">
               <td colspan="3" class="py-32 text-center opacity-40 italic text-slate-400 text-[11px] font-black tracking-widest uppercase">No Records Found</td>
            </tr>
            <tr v-for="tag in tags" :key="tag.id" class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 font-extrabold text-slate-800">
               <td class="px-3 py-5">
                  <div class="flex items-center gap-2">
                     <div class="w-1.5 h-1.5 rounded-full bg-[#0891B2]"></div>
                     <span class="text-[10px] font-black text-slate-900 uppercase tracking-tight">{{ tag.name }}</span>
                  </div>
               </td>
               <td class="px-3 py-5">
                  <span class="px-2.5 py-1 bg-[#ECFDF5] text-[#059669] rounded-md text-[8px] font-black uppercase tracking-widest">
                     {{ tag.status }}
                  </span>
               </td>
               <td class="px-3 py-5">
                  <div class="flex items-center gap-2">
                     <button @click="editTag(tag)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#0891B2] hover:border-[#0891B2]/30 rounded-xl transition-all shadow-sm">
                        <i data-feather="edit-3" class="w-3.5 h-3.5"></i>
                     </button>
                     <button @click="deleteTag(tag)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 rounded-xl transition-all shadow-sm">
                        <i data-feather="trash-2" class="w-3.5 h-3.5"></i>
                     </button>
                  </div>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Institutional Pagination Hub -->
      <div class="px-6 py-4 bg-[#F8FAFC] border-t border-[#F1F5F9] flex items-center justify-between">
         <div class="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            ROWS PER PAGE: 
            <select class="bg-white border border-[#E2E8F0] rounded-lg px-2 py-1 text-slate-600 outline-none shadow-sm h-8 w-16">
               <option>10</option>
            </select>
         </div>
         <div class="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            PAGE <span class="w-8 h-8 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-center text-slate-800 shadow-sm">1</span> OF 1
         </div>
      </div>
    </div>

    <!-- Metadata Ingestion Modal (Solid Architecture) -->
    <transition name="pop">
      <div v-if="showModal" class="fixed inset-0 z-[999] flex items-start justify-center px-4 py-12 overflow-y-auto overflow-x-hidden bg-slate-900/60 backdrop-blur-xl">
          <!-- Backdrop Click Layer -->
          <div class="fixed inset-0 -z-10" @click="closeModal"></div>
          
          <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative border border-white/20 overflow-hidden my-auto">
             <!-- Top Accent Hub -->
             <div class="h-1.5 w-full bg-[#0891B2]"></div>
             
             <div class="p-8 space-y-8 bg-white text-left">
                <div class="flex items-center justify-between">
                   <div>
                      <h3 class="text-xl font-black text-slate-800 tracking-tight leading-none">{{ isEditing ? 'Edit Strategy Tag' : 'New Strategic Metadata' }}</h3>
                      <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-2 opacity-60">Keyword Node Configuration</p>
                   </div>
                   <button @click="closeModal" class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center group shadow-sm">
                      <i data-feather="x" class="w-5 h-5 group-hover:rotate-90 transition-transform"></i>
                   </button>
                </div>
                
                <div class="space-y-6">
                   <!-- Tag Identity -->
                   <div class="space-y-2">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tag Name <span class="text-rose-500 font-black">*</span></label>
                      <input v-model="currentTag.name" type="text" placeholder="e.g. UPSC-PRELIMS" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all shadow-inner">
                   </div>

                   <!-- Visibility Control Matrix -->
                   <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-2xl p-5 flex items-center justify-between shadow-inner">
                      <div>
                         <h4 class="text-xs font-black text-slate-700 uppercase tracking-tight">Visibility Lock</h4>
                         <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Status: {{ currentTag.status }}</p>
                      </div>
                      <div 
                       @click="currentTag.status = currentTag.status === 'Active' ? 'In-Active' : 'Active'"
                       class="w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-500 relative shadow-inner"
                       :class="currentTag.status === 'Active' ? 'bg-[#0891B2]' : 'bg-slate-300'"
                      >
                       <div class="bg-white w-5 h-5 rounded-full shadow-lg transition-all duration-500 transform" :class="currentTag.status === 'Active' ? 'translate-x-7' : 'translate-x-0'"></div>
                      </div>
                   </div>
                </div>

                <!-- Strategic Deployment Hub -->
                <!-- Strategic Deployment Hub (Refined) -->
                <div class="flex items-center justify-end gap-5 pt-6 border-t border-[#F1F5F9]">
                   <button @click="closeModal" class="px-6 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">Abort Spec</button>
                   <button 
                     @click="saveTag"
                     class="px-6 py-2 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#0891B2]/20 hover:-translate-y-0.5 active:scale-95 transition-all"
                   >
                     Deploy Tag
                   </button>
                </div>
             </div>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'TagList',
  data() {
    return {
      showModal: false,
      isEditing: false,
      tags: [
        { id: 1, name: 'Premium-Content-Cluster', status: 'Active' },
        { id: 2, name: 'UPSC-Strategic-Framework', status: 'Active' },
        { id: 3, name: 'MOCK-DATA-Validation', status: 'In-Active' },
        { id: 4, name: 'SSC-Tier-II-Mathematics', status: 'Active' },
        { id: 5, name: 'Global-Affairs-Revision', status: 'Active' },
        { id: 6, name: 'Banking-Sector-Aptitude', status: 'Active' },
        { id: 7, name: 'CSAT-Logical-Reasoning', status: 'Active' },
        { id: 8, name: 'English-Curriculum-Alpha', status: 'In-Active' }
      ],
      currentTag: { id: null, name: '', status: 'Active' }
    }
  },
  methods: {
    initializeNewTag() {
       this.isEditing = false;
       this.currentTag = { id: null, name: '', status: 'Active' };
       this.showModal = true;
    },
    editTag(tag) {
       this.isEditing = true;
       this.currentTag = { ...tag };
       this.showModal = true;
    },
    closeModal() { this.showModal = false; },
    saveTag() {
       if (!this.currentTag.name) { alert('Name required.'); return; }
       if (this.isEditing) {
          const idx = this.tags.findIndex(t => t.id === this.currentTag.id);
          if (idx !== -1) this.tags.splice(idx, 1, { ...this.currentTag });
       } else {
          this.tags.unshift({ ...this.currentTag, id: Date.now() });
       }
       this.closeModal();
    },
    deleteTag(tag) { if (confirm('Delete metadata?')) this.tags = this.tags.filter(t => t.id !== tag.id); }
  },
  mounted() { feather.replace(); },
  updated() { feather.replace(); }
}
</script>

<style scoped>
.tag-repository-hub {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.pop-enter-active, .pop-leave-active { transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
.pop-enter, .pop-leave-to { opacity: 0; scale: 0.95; }
</style>
