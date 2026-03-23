<template>
  <div class="subcategory-repository-hub w-full p-3 space-y-3">
    <!-- Premium Header Section -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="layers" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Sub Categories</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Taxonomy Granularity &bull; {{ subcategories.length }} Segments</p>
        </div>
      </div>

      <button 
        @click="initializeNewSubCategory"
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
      >
        <i data-feather="plus-circle" class="w-4 h-4 text-white"></i>
        New Sub Category
      </button>
    </div>

    <!-- Segmentation Matrix (Table) -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5 overflow-hidden">
      <div class="overflow-x-auto min-h-[400px]">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F8FAFC] border-b border-slate-200">
              <th v-for="col in ['CODE', 'NAME', 'CATEGORY', 'TYPE', 'STATUS', 'ACTIONS']" :key="col" class="px-4 py-5 text-[11px] font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
            <!-- Intelligent Filtering Row -->
            <tr class="bg-white/30 backdrop-blur-sm border-b border-[#F1F5F9]">
              <td class="px-2 py-2"><input type="text" placeholder="Search Code" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:bg-white focus:border-[#0891B2]/30 transition-all shadow-inner"></td>
              <td class="px-2 py-2"><input type="text" placeholder="Search Name" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:bg-white focus:border-[#0891B2]/30 transition-all shadow-inner"></td>
              <td class="px-2 py-2"></td>
              <td class="px-2 py-2"></td>
              <td class="px-2 py-2"><input type="text" placeholder="Search Status" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:bg-white focus:border-[#0891B2]/30 transition-all shadow-inner"></td>
              <td class="px-2 py-2"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-if="subcategories.length === 0">
               <td colspan="6" class="py-32 text-center opacity-40 italic text-slate-400 text-[11px] font-black tracking-widest uppercase">No Records Found</td>
            </tr>
            <tr v-for="sub in subcategories" :key="sub.id" class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 font-extrabold text-slate-800">
               <td class="px-3 py-5 text-[10px] font-black text-[#0891B2]">{{ sub.code }}</td>
               <td class="px-3 py-5 text-[11px] font-black text-slate-900 tracking-tight lowercase truncate max-w-[200px]">{{ sub.name }}</td>
               <td class="px-3 py-5"><span class="text-[9px] bg-[#F1F5F9] px-2 py-1 rounded-md text-slate-500 font-extrabold uppercase">{{ sub.category }}</span></td>
               <td class="px-3 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ sub.type }}</td>
               <td class="px-3 py-5">
                  <span class="px-2.5 py-1 bg-[#ECFDF5] text-[#059669] rounded-md text-[8px] font-black uppercase tracking-widest">
                     Active
                  </span>
               </td>
               <td class="px-3 py-5">
                  <div class="flex items-center gap-2">
                     <button @click="editSubCategory(sub)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#0891B2] hover:border-[#0891B2]/30 rounded-xl transition-all shadow-sm">
                        <i data-feather="edit-3" class="w-3.5 h-3.5"></i>
                     </button>
                     <button @click="deleteSubCategory(sub)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 rounded-xl transition-all shadow-sm">
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

    <!-- Segmentation Drafting Modal (Solid Architecture) -->
    <transition name="pop">
      <div v-if="showModal" class="fixed inset-0 z-[999] flex items-start justify-center px-4 py-12 overflow-y-auto overflow-x-hidden bg-slate-900/60 backdrop-blur-xl">
          <!-- Backdrop Click Layer -->
          <div class="fixed inset-0 -z-10" @click="closeModal"></div>
          
          <div class="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative border border-white/20 overflow-hidden my-auto">
             <!-- Top Accent Hub -->
             <div class="h-1.5 w-full bg-[#0891B2]"></div>
             
             <div class="p-8 space-y-8 bg-white text-left">
                <div class="flex items-center justify-between">
                   <div>
                      <h3 class="text-xl font-black text-slate-800 tracking-tight leading-none">{{ isEditing ? 'Edit Cluster Spec' : 'New Classification Cluster' }}</h3>
                      <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-2 opacity-60">Taxonomic Segment Configuration</p>
                   </div>
                   <button @click="closeModal" class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center group shadow-sm">
                      <i data-feather="x" class="w-5 h-5 group-hover:rotate-90 transition-transform"></i>
                   </button>
                </div>
                
                <div class="space-y-6">
                   <!-- Cluster Identity -->
                   <div class="space-y-2">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sub Category Name <span class="text-rose-500 font-black">*</span></label>
                      <input v-model="currentSub.name" type="text" placeholder="Institutional Name..." class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all shadow-inner">
                   </div>

                   <!-- Hierarchical Anchors -->
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="space-y-2">
                         <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Parent Category <span class="text-rose-500 font-black">*</span></label>
                         <select v-model="currentSub.category" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none focus:bg-white focus:border-[#0891B2] transition-all appearance-none shadow-inner cursor-pointer">
                            <option value="">Select Category</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="COURSES">COURSES</option>
                         </select>
                      </div>
                      <div class="space-y-2">
                         <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Classification Type <span class="text-rose-500 font-black">*</span></label>
                         <select v-model="currentSub.type" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none focus:bg-white focus:border-[#0891B2] transition-all appearance-none shadow-inner cursor-pointer">
                            <option value="">Select Type</option>
                            <option value="GLOBAL">GLOBAL</option>
                            <option value="INTERNAL">INTERNAL</option>
                            <option value="ARCHIVED">ARCHIVED</option>
                         </select>
                      </div>
                   </div>

                   <!-- Meta Intelligence -->
                   <div class="space-y-2">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Meta Description (160 Chars)</label>
                      <textarea v-model="currentSub.shortDescription" rows="2" maxlength="160" placeholder="Brief taxonomic metadata..." class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none resize-none shadow-inner"></textarea>
                   </div>

                   <!-- Content Strategy Hub -->
                   <div class="space-y-2">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Master Description</label>
                      <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-2xl overflow-hidden focus-within:border-[#0891B2] focus-within:bg-white transition-all shadow-inner border border-slate-100">
                         <div class="flex items-center gap-4 px-4 py-3 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                            <i v-for="ico in ['bold', 'italic', 'underline', 'list', 'image']" :key="ico" :data-feather="ico" class="w-3.5 h-3.5 text-slate-400 hover:text-[#0891B2] cursor-pointer"></i>
                         </div>
                         <textarea v-model="currentSub.description" rows="4" placeholder="Enter elaborate content..." class="w-full bg-transparent p-6 text-[13px] font-bold text-slate-600 outline-none resize-none leading-relaxed"></textarea>
                      </div>
                   </div>

                   <!-- Visibility Control Matrix -->
                   <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-2xl p-5 flex items-center justify-between shadow-inner">
                      <div>
                         <h4 class="text-xs font-black text-slate-700 uppercase tracking-tight">Active Status</h4>
                         <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Status: {{ currentSub.status }}</p>
                      </div>
                      <div 
                       @click="currentSub.status = currentSub.status === 'Active' ? 'In-Active' : 'Active'"
                       class="w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-500 relative shadow-inner"
                       :class="currentSub.status === 'Active' ? 'bg-[#0891B2]' : 'bg-slate-300'"
                      >
                       <div class="bg-white w-5 h-5 rounded-full shadow-lg transition-all duration-500 transform" :class="currentSub.status === 'Active' ? 'translate-x-7' : 'translate-x-0'"></div>
                      </div>
                   </div>
                </div>

                <!-- Strategic Deployment Hub (Refined) -->
                <div class="flex items-center justify-end gap-5 pt-6 border-t border-[#F1F5F9]">
                   <button @click="closeModal" class="px-6 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">Discard Spec</button>
                   <button 
                     @click="saveSubCategory"
                     class="px-6 py-2 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#0891B2]/20 hover:-translate-y-0.5 active:scale-95 transition-all"
                   >
                     Deploy Spec
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
  name: 'SubCategoryList',
  data() {
    return {
      showModal: false,
      isEditing: false,
      subcategories: [
        { id: 1, code: 'SUB-101', name: 'Alpha Module: History & Culture', category: 'COURSES', type: 'GLOBAL', status: 'Active' },
        { id: 2, code: 'SUB-205', name: 'Strategic Hub: Mock Physics Sequence', category: 'EXAMS', type: 'GLOBAL', status: 'Active' },
        { id: 3, code: 'SUB-309', name: 'Beta Cluster: Quantitative Aptitude', category: 'QUIZZES', type: 'INTERNAL', status: 'Active' },
        { id: 4, code: 'SUB-412', name: 'Institutional Data: UPSC CSE GS-I', category: 'EXAMS', type: 'GLOBAL', status: 'Active' },
        { id: 5, code: 'SUB-515', name: 'Legacy Asset: SSC Tier-II Old Format', category: 'EXAMS', type: 'ARCHIVED', status: 'In-Active' },
        { id: 6, code: 'SUB-618', name: 'Premium Flow: English Comprehension', category: 'COURSES', type: 'GLOBAL', status: 'Active' },
        { id: 7, code: 'SUB-721', name: 'Logical Matrix: Abstract Reasoning', category: 'QUIZZES', type: 'INTERNAL', status: 'Active' }
      ],
      currentSub: { id: null, code: '', name: '', category: '', type: '', shortDescription: '', description: '', status: 'Active' }
    }
  },
  methods: {
    initializeNewSubCategory() {
       this.isEditing = false;
       this.currentSub = { id: null, code: '', name: '', category: '', type: '', shortDescription: '', description: '', status: 'Active' };
       this.showModal = true;
    },
    editSubCategory(sub) {
       this.isEditing = true;
       this.currentSub = { ...sub };
       this.showModal = true;
    },
    closeModal() { this.showModal = false; },
    saveSubCategory() {
       if (!this.currentSub.name) { alert('Name required.'); return; }
       if (this.isEditing) {
          const idx = this.subcategories.findIndex(s => s.id === this.currentSub.id);
          if (idx !== -1) this.subcategories.splice(idx, 1, { ...this.currentSub });
       } else {
          this.subcategories.unshift({ ...this.currentSub, id: Date.now(), code: 'S-' + Math.floor(100+Math.random()*900) });
       }
       this.closeModal();
    },
    deleteSubCategory(sub) {
       if (confirm('Delete segment?')) this.subcategories = this.subcategories.filter(s => s.id !== sub.id);
    }
  },
  mounted() { feather.replace(); },
  updated() { feather.replace(); }
}
</script>

<style scoped>
.subcategory-repository-hub {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.pop-enter-active, .pop-leave-active { transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
.pop-enter, .pop-leave-to { opacity: 0; scale: 0.95; }
</style>
