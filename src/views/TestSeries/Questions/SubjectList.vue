<template>
  <div class="subject-repository-hub w-full p-3 space-y-3">
    <!-- Premium Header Section -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="book-open" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Subjects</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Academic Foundation &bull; {{ subjects.length }} Active Modules</p>
        </div>
      </div>

      <button 
        @click="initializeNewSubject"
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
      >
        <i data-feather="plus-circle" class="w-4 h-4 text-white"></i>
        New Subject
      </button>
    </div>

    <!-- Academic Hub Table (Matching the user screenshot) -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5 overflow-hidden">
      <div class="overflow-x-auto min-h-[400px]">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F8FAFC] border-b border-slate-200">
              <th v-for="col in ['CODE', 'NAME', 'STATUS', 'ACTIONS']" :key="col" class="px-4 py-5 text-[11px] font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
            <!-- Intelligent Filtering Row -->
            <tr class="bg-white/30 backdrop-blur-sm border-b border-[#F1F5F9]">
              <td class="px-2 py-2 w-[20%]">
                <input type="text" placeholder="Search Code" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:bg-white focus:border-[#0891B2]/30 transition-all">
              </td>
              <td class="px-2 py-2 w-[50%]">
                <input type="text" placeholder="Search Name" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:bg-white focus:border-[#0891B2]/30 transition-all">
              </td>
              <td class="px-2 py-2 w-[15%]">
                <input type="text" placeholder="Search Status" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:bg-white focus:border-[#0891B2]/30 transition-all">
              </td>
              <td class="px-2 py-2"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-if="subjects.length === 0">
               <td colspan="4" class="py-32 text-center opacity-40 italic text-slate-400 text-[11px] font-black tracking-widest uppercase">No Subjects Found</td>
            </tr>
            <tr v-for="sub in subjects" :key="sub.id" class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 font-extrabold text-slate-800">
               <td class="px-4 py-5 font-black text-[#0891B2] text-[10px] uppercase tracking-wider">{{ sub.code }}</td>
               <td class="px-4 py-5 text-[11px] font-black text-slate-900 tracking-tight leading-loose uppercase">
                  {{ sub.name }}
                  <span class="block text-[8px] text-slate-400 font-bold normal-case mt-0.5">{{ sub.shortDescription }}</span>
               </td>
               <td class="px-4 py-5">
                  <span class="px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest" :class="sub.status === 'Active' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-rose-50 text-rose-500'">
                     {{ sub.status }}
                  </span>
               </td>
               <td class="px-4 py-5">
                  <div class="flex items-center gap-2">
                     <button @click="editSubject(sub)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#0891B2] hover:border-[#0891B2]/30 rounded-xl transition-all shadow-sm">
                        <i data-feather="edit-3" class="w-3.5 h-3.5"></i>
                     </button>
                     <button @click="deleteSubject(sub)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 rounded-xl transition-all shadow-sm">
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
            ENTRIES: 
            <select class="bg-white border border-[#E2E8F0] rounded-lg px-2 py-1 text-slate-600 outline-none shadow-sm h-8 w-16">
               <option>10</option>
            </select>
         </div>
         <div class="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            PAGE <span class="w-8 h-8 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-center text-slate-800 shadow-sm">1</span> OF 1
         </div>
      </div>
    </div>

    <!-- Academic Node Modal (Based on image 2) -->
    <transition name="pop">
      <div v-if="showModal" class="fixed inset-0 z-[999] flex items-start justify-center px-4 py-12 overflow-y-auto overflow-x-hidden bg-slate-900/60 backdrop-blur-xl">
          <div class="fixed inset-0 -z-10" @click="closeModal"></div>
          
          <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative border border-white/20 overflow-hidden my-auto">
             <div class="h-1.5 w-full bg-[#0891B2]"></div>
             
             <div class="p-8 space-y-8 bg-white text-left">
                <div class="flex items-center justify-between">
                   <div>
                      <h3 class="text-xl font-black text-slate-800 tracking-tight leading-none">{{ isEditing ? 'Edit Subject Spec' : 'New Subject Configuration' }}</h3>
                      <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-2 opacity-60">Academic Foundation Layer</p>
                   </div>
                   <button @click="closeModal" class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center group shadow-sm">
                      <i data-feather="x" class="w-5 h-5 group-hover:rotate-90 transition-transform"></i>
                   </button>
                </div>
                
                <div class="space-y-6">
                   <!-- Subject Identity -->
                   <div class="space-y-2">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Name <span class="text-rose-500 font-black">*</span></label>
                      <input v-model="currentSubject.name" type="text" placeholder="e.g. Modern Indian History" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all shadow-inner">
                   </div>

                   <!-- Meta Intelligence -->
                   <div class="space-y-2">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Description</label>
                      <textarea v-model="currentSubject.shortDescription" rows="2" maxlength="160" placeholder="Brief subject breakdown..." class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2 text-[13px] font-bold text-slate-600 focus:bg-white focus:border-[#0891B2] outline-none transition-all shadow-inner resize-none"></textarea>
                   </div>

                   <!-- Subject Template (Rich Editor Style) -->
                   <div class="space-y-2">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject Template <span class="text-rose-500 font-black">*</span></label>
                      <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-2xl overflow-hidden focus-within:border-[#0891B2] focus-within:bg-white transition-all shadow-inner border border-slate-100">
                         <div class="flex items-center flex-wrap gap-4 px-4 py-3 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                            <i v-for="ico in ['bold', 'italic', 'underline', 'list', 'image', 'link', 'code', 'maximize']" :key="ico" :data-feather="ico" class="w-3.5 h-3.5 text-slate-400 hover:text-[#0891B2] cursor-pointer"></i>
                         </div>
                         <textarea v-model="currentSubject.description" rows="5" class="w-full bg-transparent p-6 text-[13px] font-bold text-slate-600 outline-none resize-none leading-relaxed" placeholder="Enter elaborate template content..."></textarea>
                      </div>
                   </div>

                   <!-- Active Toggle -->
                   <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-2xl p-5 flex items-center justify-between shadow-inner">
                      <div>
                         <h4 class="text-xs font-black text-slate-700 uppercase tracking-tight">Visibility Lock</h4>
                         <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Status: {{ currentSubject.status }} Everywhere</p>
                      </div>
                      <div 
                       @click="currentSubject.status = currentSubject.status === 'Active' ? 'In-Active' : 'Active'"
                       class="w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-500 relative shadow-inner"
                       :class="currentSubject.status === 'Active' ? 'bg-[#0891B2]' : 'bg-slate-300'"
                      >
                       <div class="bg-white w-5 h-5 rounded-full shadow-lg transition-all duration-500 transform" :class="currentSubject.status === 'Active' ? 'translate-x-7' : 'translate-x-0'"></div>
                      </div>
                   </div>
                </div>

                <!-- Strategic Deployment Hub -->
                <div class="flex items-center justify-end gap-5 pt-6 border-t border-[#F1F5F9]">
                   <button @click="closeModal" class="px-6 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">Discard Changes</button>
                   <button 
                     @click="saveSubject"
                     class="px-6 py-2 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#0891B2]/20 hover:-translate-y-0.5 active:scale-95 transition-all"
                   >
                     Deploy Subject
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
  name: 'SubjectList',
  data() {
    return {
      showModal: false,
      isEditing: false,
      subjects: [
        { id: 1, code: 'SUB-HIST', name: 'Indian History & Culture', shortDescription: 'Mastering the timeline of the subcontinent.', description: '', status: 'Active' },
        { id: 2, code: 'SUB-GEOG', name: 'Physical & Human Geography', shortDescription: 'Understanding tectonic shifts and demographics.', description: '', status: 'Active' },
        { id: 3, code: 'SUB-POL', name: 'Indian Polity & Governance', shortDescription: 'Constitutional framework and legal ethics.', description: '', status: 'Active' },
        { id: 4, code: 'SUB-ECON', name: 'Macro Economic Fundamentals', shortDescription: 'Budgeting, inflation, and trade analytics.', description: '', status: 'Active' },
        { id: 5, code: 'SUB-SCIE', name: 'General Science & Technology', shortDescription: 'Strategic advances in biotechnology and space.', description: '', status: 'Active' }
      ],
      currentSubject: { id: null, code: '', name: '', shortDescription: '', description: '', status: 'Active' }
    }
  },
  methods: {
    initializeNewSubject() {
       this.isEditing = false;
       this.currentSubject = { id: null, code: '', name: '', shortDescription: '', description: '', status: 'Active' };
       this.showModal = true;
    },
    editSubject(sub) {
       this.isEditing = true;
       this.currentSubject = { ...sub };
       this.showModal = true;
    },
    closeModal() { this.showModal = false; },
    saveSubject() {
       if (!this.currentSubject.name) { alert('Name required.'); return; }
       if (this.isEditing) {
          const idx = this.subjects.findIndex(s => s.id === this.currentSubject.id);
          if (idx !== -1) this.subjects.splice(idx, 1, { ...this.currentSubject });
       } else {
          this.subjects.unshift({ ...this.currentSubject, id: Date.now(), code: 'S-' + Math.floor(100+Math.random()*900) });
       }
       this.closeModal();
    },
    deleteSubject(sub) { if (confirm('Delete academic node?')) this.subjects = this.subjects.filter(s => s.id !== sub.id); }
  },
  mounted() { feather.replace(); },
  updated() { feather.replace(); }
}
</script>

<style scoped>
.subject-repository-hub {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.pop-enter-active, .pop-leave-active { transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
.pop-enter, .pop-leave-to { opacity: 0; scale: 0.95; }
</style>
