<template>
  <div class="comprehension-hub w-full space-y-2 py-1">
    <!-- Header Architecture -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="book-open" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Reading Comprehensions</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Passage Repository &bull; {{ comprehensions.length }} Records</p>
        </div>
      </div>

      <button 
        @click="initializeNewComprehension"
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
      >
        <i data-feather="plus-circle" class="w-3 h-3 text-white"></i>
        New Comprehension
      </button>
    </div>

    <!-- Table Construction -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F1F5F9] border-b border-[#E2E8F0]">
              <th v-for="col in ['CODE', 'TITLE', 'BODY', 'STATUS', 'ACTIONS']" :key="col" class="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="com in comprehensions" :key="com.id" class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 font-extrabold text-slate-800">
               <td class="px-3 py-4">
                  <span class="px-3 py-1 bg-sky-100 text-sky-700 rounded-lg font-black tracking-tight text-[10px] flex items-center gap-1.5 w-max">
                     <i data-feather="code" class="w-3 h-3 text-sky-400"></i>
                     {{ com.code }}
                  </span>
               </td>
               <td class="px-3 py-4 text-xs font-black text-slate-900 tracking-tight">{{ com.title }}</td>
               <td class="px-3 py-4 max-w-xs">
                  <div class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                     {{ com.body }}
                  </div>
               </td>
               <td class="px-3 py-4">
                  <span :class="['px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest', com.status === 'Active' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FFFBEB] text-[#D97706]']">
                     {{ com.status }}
                  </span>
               </td>
               <td class="px-3 py-4">
                  <div class="flex items-center gap-2">
                     <button @click="editComprehension(com)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#0891B2] hover:border-[#0891B2]/30 rounded-xl transition-all shadow-sm" title="Edit">
                        <i data-feather="edit-3" class="w-3.5 h-3.5"></i>
                     </button>
                     <button @click="deleteComprehension(com)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 rounded-xl transition-all shadow-sm" title="Delete">
                        <i data-feather="trash-2" class="w-3.5 h-3.5"></i>
                     </button>
                  </div>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Drafting Modal -->
    <transition name="pop">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" @click="closeModal"></div>
          <div class="bg-white w-full max-w-2xl rounded-xl shadow-2xl relative z-10 border border-slate-100 overflow-hidden">
             <div class="h-1 w-full bg-gradient-to-r from-[#0891B2] to-[#0D9488]"></div>
             <div class="p-6 space-y-6">
                <div class="flex items-center justify-between">
                   <h3 class="text-xl font-black text-slate-800 tracking-tight">{{ isEditing ? 'Edit Comprehension Spec' : 'Draft: New Comprehension' }}</h3>
                   <button @click="closeModal" class="w-8 h-8 rounded-xl bg-slate-100 text-slate-400 hover:text-rose-500 transition-all flex items-center justify-center">
                      <i data-feather="x" class="w-5 h-5"></i>
                   </button>
                </div>
                <div class="space-y-4">
                   <div class="space-y-1.5">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Comprehension Title</label>
                      <input v-model="currentCom.title" type="text" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all">
                   </div>
                   <div class="space-y-1.5">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Passage Body</label>
                      <div class="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shadow-inner">
                         <div class="flex items-center gap-2 p-2 border-b border-slate-100 bg-[#F8FAFC]">
                            <i v-for="ico in ['bold', 'italic', 'underline', 'list', 'image', 'maximize']" :key="ico" :data-feather="ico" class="w-3.5 h-3.5 text-slate-400"></i>
                         </div>
                         <textarea v-model="currentCom.body" rows="8" class="w-full bg-transparent p-4 text-xs font-bold text-slate-600 outline-none resize-none leading-relaxed"></textarea>
                      </div>
                   </div>
                   <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl p-4 flex items-center justify-between">
                      <div>
                         <h4 class="text-xs font-black text-slate-700 uppercase tracking-tight">Visibility Lock</h4>
                         <p class="text-[9px] text-slate-400 font-bold whitespace-nowrap">Restrict access to certain test series if inactive</p>
                      </div>
                      <div @click="currentCom.status = currentCom.status === 'Active' ? 'In-Active' : 'Active'" class="w-12 h-6 rounded-full p-1 cursor-pointer transition-all duration-500 relative" :class="currentCom.status === 'Active' ? 'bg-[#0891B2]' : 'bg-slate-300'">
                       <div class="bg-white w-4 h-4 rounded-full shadow-lg transition-all duration-500 transform" :class="currentCom.status === 'Active' ? 'translate-x-6' : 'translate-x-0'"></div>
                      </div>
                   </div>
                </div>
                <div class="flex items-center justify-end gap-6 pt-2">
                   <button @click="closeModal" class="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">Abort</button>
                   <button @click="saveComprehension" class="px-10 py-3 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all">
                     {{ isEditing ? 'Finalize Blueprint' : 'Create' }}
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
  name: 'ComprehensionList',
  data() {
    return {
      showModal: false,
      isEditing: false,
      currentCom: { id: null, code: '', title: '', body: '', status: 'Active' },
      comprehensions: [
        { id: 1, code: 'com_XNF06B6yUE4', title: 'Reading Comprehension Demo', body: 'Reading comprehension is the ability to process written text, understand its meaning, and to integrate with what the reader already knows.', status: 'Active' }
      ]
    }
  },
  methods: {
    initializeNewComprehension() {
       this.isEditing = false;
       this.currentCom = { id: null, code: '', title: '', body: '', status: 'Active' };
       this.showModal = true;
    },
    editComprehension(com) {
       this.isEditing = true;
       this.currentCom = { ...com };
       this.showModal = true;
    },
    closeModal() {
       this.showModal = false;
       this.isEditing = false;
    },
    saveComprehension() {
       if (!this.currentCom.title || !this.currentCom.body) {
          alert('Validation Error: Passage Title and Body are mandatory.');
          return;
       }
       if (this.isEditing) {
          const index = this.comprehensions.findIndex(c => c.id === this.currentCom.id);
          if (index !== -1) {
             this.comprehensions.splice(index, 1, { ...this.currentCom });
          }
       } else {
          this.comprehensions.unshift({
             ...this.currentCom,
             id: Date.now(),
             code: 'com_' + Math.random().toString(36).substring(7)
          });
       }
       this.closeModal();
    },
    deleteComprehension(com) {
       if (confirm('Institutional Alert: Delete this passage blueprint?')) {
          this.comprehensions = this.comprehensions.filter(c => c.id !== com.id);
       }
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
.pop-enter-active, .pop-leave-active {
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.pop-enter, .pop-leave-to { opacity: 0; scale: 0.95; }
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
