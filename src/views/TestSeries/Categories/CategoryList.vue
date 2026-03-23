<template>
  <div class="category-repository-hub w-full p-3 space-y-3">
    <!-- Premium Header Section -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="folder" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Categories</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Repository Structure &bull; {{ categories.length }} Items</p>
        </div>
      </div>

      <button 
        @click="initializeNewCategory"
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
      >
        <i data-feather="plus-circle" class="w-4 h-4 text-white"></i>
        New Category
      </button>
    </div>

    <!-- Modern Table Card -->
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
            <tr v-if="categories.length === 0">
               <td colspan="4" class="py-32 text-center opacity-40 italic text-slate-400 text-[11px] font-black tracking-widest uppercase">No Records Found</td>
            </tr>
            <tr v-for="cat in categories" :key="cat.id" class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 font-extrabold text-slate-800">
               <td class="px-3 py-5 text-[10px] font-black text-[#0891B2]">{{ cat.code }}</td>
               <td class="px-3 py-5 text-[11px] font-black text-slate-900 tracking-tight lowercase truncate max-w-[300px]">{{ cat.name }}</td>
               <td class="px-3 py-5">
                  <span class="px-2.5 py-1 bg-[#ECFDF5] text-[#059669] rounded-md text-[8px] font-black uppercase tracking-widest">
                     {{ cat.status }}
                  </span>
               </td>
               <td class="px-3 py-5">
                  <div class="flex items-center gap-2">
                     <button @click="editCategory(cat)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#0891B2] hover:border-[#0891B2]/30 rounded-xl transition-all shadow-sm">
                        <i data-feather="edit-3" class="w-3.5 h-3.5"></i>
                     </button>
                     <button @click="deleteCategory(cat)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 rounded-xl transition-all shadow-sm">
                        <i data-feather="trash-2" class="w-3.5 h-3.5"></i>
                     </button>
                  </div>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination Hub -->
      <div class="px-6 py-4 bg-[#F8FAFC] border-t border-[#F1F5F9] flex items-center justify-between">
         <div class="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            ROWS PER PAGE: 
            <select class="bg-white border border-[#E2E8F0] rounded-lg px-2 py-1 text-slate-600 outline-none h-8 w-16 shadow-sm">
               <option>10</option>
            </select>
         </div>
         <div class="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            PAGE <span class="w-8 h-8 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-center text-slate-800 shadow-sm">1</span> OF 0
         </div>
      </div>
    </div>

    <!-- Metadata Ingestion Modal (Solid Architecture) -->
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
                      <h3 class="text-xl font-black text-slate-800 tracking-tight leading-none">{{ isEditing ? 'Update Specification' : 'New Strategic Category' }}</h3>
                      <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-2 opacity-60">Architectural Node Configuration</p>
                   </div>
                   <button @click="closeModal" class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center group shadow-sm">
                      <i data-feather="x" class="w-5 h-5 group-hover:rotate-90 transition-transform"></i>
                   </button>
                </div>
                
                <div class="space-y-6">
                   <!-- Category Identity -->
                   <div class="space-y-2">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category Name <span class="text-rose-500 font-black">*</span></label>
                      <input v-model="currentCategory.name" type="text" placeholder="e.g. UPSC-Prelims-Focus" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all shadow-inner">
                   </div>

                   <!-- Meta Intelligence -->
                   <div class="space-y-2">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Meta Description (160 Chars)</label>
                      <textarea v-model="currentCategory.shortDescription" rows="2" maxlength="160" placeholder="Brief SEO details..." class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2 text-[13px] font-bold text-slate-600 focus:bg-white focus:border-[#0891B2] outline-none transition-all shadow-inner resize-none"></textarea>
                   </div>

                   <!-- Content Strategy Hub -->
                   <div class="space-y-2">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rich Content Layer</label>
                      <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-2xl overflow-hidden focus-within:border-[#0891B2] focus-within:bg-white transition-all shadow-inner border border-slate-100">
                         <div class="flex items-center gap-4 px-4 py-3 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                            <i v-for="ico in ['bold', 'italic', 'underline', 'list', 'image']" :key="ico" :data-feather="ico" class="w-3.5 h-3.5 text-slate-400 hover:text-[#0891B2] cursor-pointer"></i>
                         </div>
                         <textarea v-model="currentCategory.description" rows="5" class="w-full bg-transparent p-6 text-[13px] font-bold text-slate-600 outline-none resize-none leading-relaxed" placeholder="Enter full category description..."></textarea>
                      </div>
                   </div>

                   <!-- Visibility Control Matrix -->
                   <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-2xl p-5 flex items-center justify-between shadow-inner">
                      <div>
                         <h4 class="text-xs font-black text-slate-700 uppercase tracking-tight">Visibility Lock</h4>
                         <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Status: {{ currentCategory.status }}</p>
                      </div>
                      <div 
                       @click="currentCategory.status = currentCategory.status === 'Active' ? 'In-Active' : 'Active'"
                       class="w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-500 relative shadow-inner"
                       :class="currentCategory.status === 'Active' ? 'bg-[#0891B2]' : 'bg-slate-300'"
                      >
                       <div class="bg-white w-5 h-5 rounded-full shadow-lg transition-all duration-500 transform" :class="currentCategory.status === 'Active' ? 'translate-x-7' : 'translate-x-0'"></div>
                      </div>
                   </div>
                </div>

                <!-- Strategic Deployment Hub (Refined) -->
                <div class="flex items-center justify-end gap-5 pt-6 border-t border-[#F1F5F9]">
                   <button @click="closeModal" class="px-6 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">Discard Spec</button>
                   <button 
                     @click="saveCategory"
                     class="px-6 py-2 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#0891B2]/20 hover:-translate-y-0.5 active:scale-95 transition-all"
                   >
                     Deploy Strategy
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
  name: 'CategoryList',
  data() {
    return {
      showModal: false,
      isEditing: false,
      categories: [
        { id: 1, code: 'CAT-101', name: 'Civil Services Examination (UPSC)', shortDescription: 'Strategic preparation for IAS, IPS, and IFS aspirants.', description: 'Full-spectrum repository for UPSC CSE preparation.', status: 'Active' },
        { id: 2, code: 'CAT-102', name: 'Engineering Services (IES)', shortDescription: 'Technical excellence for engineering graduates.', description: 'Comprehensive coverage of mechanical, civil, and electrical modules.', status: 'Active' },
        { id: 3, code: 'CAT-203', name: 'Staff Selection Commission (SSC)', shortDescription: 'Government job entrance across multiple tiers.', description: 'Tier I and Tier II strategy guides and mock repositories.', status: 'Active' },
        { id: 4, code: 'CAT-304', name: 'Banking & IBPS', shortDescription: 'Quantitative and logical reasoning focus.', description: 'Dedicated segments for PO and Clerk entrance exams.', status: 'Active' },
        { id: 5, code: 'CAT-405', name: 'State PSC Mock Clusters', shortDescription: 'Regional governance examination preparation.', description: 'Curated datasets for BPSC, UPPCS, and MPPSC.', status: 'Active' },
        { id: 6, code: 'CAT-506', name: 'Premium Analytics Sandbox', shortDescription: 'Advanced trial clusters for data validation.', description: 'Test environment for newly developed mock sequences.', status: 'In-Active' }
      ],
      currentCategory: { id: null, code: '', name: '', shortDescription: '', description: '', status: 'Active' }
    }
  },
  methods: {
    initializeNewCategory() {
       this.isEditing = false;
       this.currentCategory = { id: null, code: '', name: '', shortDescription: '', description: '', status: 'Active' };
       this.showModal = true;
    },
    editCategory(cat) {
       this.isEditing = true;
       this.currentCategory = { ...cat };
       this.showModal = true;
    },
    closeModal() { this.showModal = false; },
    saveCategory() {
       if (!this.currentCategory.name) { alert('Name required.'); return; }
       if (this.isEditing) {
          const index = this.categories.findIndex(c => c.id === this.currentCategory.id);
          if (index !== -1) this.categories.splice(index, 1, { ...this.currentCategory });
       } else {
          this.categories.unshift({ ...this.currentCategory, id: Date.now(), code: 'C-' + Math.floor(100+Math.random()*900) });
       }
       this.closeModal();
    },
    deleteCategory(cat) {
       if (confirm('Delete Category?')) this.categories = this.categories.filter(c => c.id !== cat.id);
    }
  },
  mounted() { feather.replace(); },
  updated() { feather.replace(); }
}
</script>

<style scoped>
.category-repository-hub {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.pop-enter-active, .pop-leave-active { transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
.pop-enter, .pop-leave-to { opacity: 0; scale: 0.95; }
</style>
