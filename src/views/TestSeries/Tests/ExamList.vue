<template>
  <div class="exam-management-screen w-full space-y-1">
    <!-- Sophisticated Top Bar -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="file-text" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Exam Management</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Module Center &bull; Live Records ({{ exams.length }})</p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button 
          @click="$router.push('/test-series/exams/templates')"
          class="px-6 py-2 bg-white border border-[#E2E8F0] text-[#0891B2] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F8FAFC] transition-all shadow-sm flex items-center gap-2"
        >
          <i data-feather="layout" class="w-3 h-3"></i>
          Templates
        </button>
        <button 
          @click="initializeNewExam"
          class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0891B2]/10 flex items-center gap-2"
        >
          <i data-feather="plus-circle" class="w-3 h-3"></i>
          New Exam
        </button>
      </div>
    </div>

    <!-- Table Architecture -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5 overflow-hidden relative">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F1F5F9] border-b border-[#E2E8F0]">
              <th v-for="col in columns" :key="col" class="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
            <!-- Search Layer -->
            <tr class="bg-white/50 backdrop-blur-sm border-b border-[#F1F5F9]">
              <td v-for="col in columns" :key="col + '-search'" class="px-2 py-2">
                <div v-if="col !== 'ACTIONS'" class="relative group">
                   <input
                    type="text"
                    :placeholder="'Search ' + col"
                    class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 placeholder:text-slate-300 focus:bg-white focus:border-[#0891B2] focus:ring-4 focus:ring-[#0891B2]/10 outline-none transition-all"
                   >
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(exam, index) in exams" :key="exam.id" class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 font-extrabold text-slate-800">
               <td class="px-3 py-3 text-[10px] text-slate-400 font-bold">{{ index + 1 }}</td>
               <td class="px-3 py-3 text-[10px] text-[#0891B2] font-black uppercase">{{ exam.testId }}</td>
               <td class="px-3 py-3 text-sm tracking-tight text-slate-900 font-black">{{ exam.title }}</td>
               <td class="px-3 py-3 text-[11px] text-slate-600">{{ exam.category }}</td>
               <td class="px-3 py-3 text-[10px]">
                  <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-black">{{ exam.sections }} SECT</span>
               </td>
               <td class="px-3 py-3 text-[10px]">
                  <span :class="['px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest', exam.visibility === 'Public' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FFFBEB] text-[#D97706]']">{{ exam.visibility }}</span>
               </td>
               <td class="px-3 py-3 text-[10px]">
                  <div class="flex items-center gap-2 font-black uppercase tracking-widest text-[9px]">
                     <div :class="['w-2 h-2 rounded-full', exam.status === 'Active' ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]' : 'bg-slate-300']"></div>
                     <span :class="exam.status === 'Active' ? 'text-[#10B981]' : 'text-slate-400'">{{ exam.status }}</span>
                  </div>
               </td>
               <td class="px-3 py-3 text-[10px] text-slate-500 font-black">{{ exam.date }}</td>
               <td class="px-3 py-3">
                  <div class="flex items-center gap-2">
                     <button @click="editExam(exam)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#0891B2] hover:border-[#0891B2]/30 rounded-xl transition-all shadow-sm" title="Edit Exam"><i data-feather="edit-2" class="w-3.5 h-3.5"></i></button>
                     <button @click="deleteExam(exam)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 rounded-xl transition-all shadow-sm" title="Delete Exam"><i data-feather="trash-2" class="w-3.5 h-3.5"></i></button>
                  </div>
               </td>
            </tr>
            <tr v-if="exams.length === 0">
              <td :colspan="columns.length" class="py-12 text-center text-slate-400 font-black text-xs uppercase tracking-widest">
                No Records Found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="px-3 py-2 bg-[#F8FAFC] border-t border-[#F1F5F9] flex flex-col md:flex-row items-center justify-between gap-2">
          <div class="flex items-center gap-2">
             <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rows:</span>
             <select class="bg-white border border-[#E2E8F0] rounded-lg px-2 py-1 text-[9px] font-black text-slate-600 outline-none">
                <option>10</option>
                <option>25</option>
             </select>
          </div>
          
          <div class="flex items-center gap-1.5">
             <button class="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] text-slate-400 flex items-center justify-center hover:bg-[#F1F5F9] transition-all disabled:opacity-30" disabled>
                <i data-feather="chevron-left" class="w-3 h-3"></i>
             </button>
             <div class="px-3 py-1 bg-[#0891B2] text-white rounded-lg text-[8px] font-black uppercase tracking-widest">
                Page 1 of 1
             </div>
             <button class="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] text-slate-400 flex items-center justify-center hover:bg-[#F1F5F9] transition-all disabled:opacity-30" disabled>
                <i data-feather="chevron-right" class="w-3 h-3"></i>
             </button>
          </div>
      </div>
    </div>

    <!-- Exam Edit/Create Modal -->
    <transition name="pop">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" @click="closeModal"></div>
          <div class="bg-white w-full max-w-lg rounded-xl shadow-2xl relative z-10 border border-slate-100 overflow-hidden">
             <div class="h-1 w-full bg-[#0891B2]"></div>
             <div class="p-6 space-y-6">
                <div class="flex items-center justify-between">
                   <h3 class="text-xl font-black text-slate-800">{{ isEditing ? 'Edit Exam' : 'New Exam Specification' }}</h3>
                   <button @click="closeModal" class="text-slate-400 hover:text-rose-500 transition-colors"><i data-feather="x" class="w-5 h-5"></i></button>
                </div>
                <div class="space-y-4">
                   <div class="space-y-1">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Exam Title</label>
                      <input v-model="currentExam.title" type="text" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all">
                   </div>
                   <div class="grid grid-cols-2 gap-4">
                      <div class="space-y-1">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                         <select v-model="currentExam.category" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none">
                            <option>Civil Services</option>
                            <option>Engineering</option>
                            <option>Medical</option>
                            <option>Banking</option>
                         </select>
                      </div>
                      <div class="space-y-1">
                         <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sections</label>
                         <input v-model="currentExam.sections" type="number" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none">
                      </div>
                   </div>
                </div>
                <div class="flex items-center justify-end gap-4 pt-4">
                   <button @click="closeModal" class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Abort</button>
                   <button @click="saveExam" class="px-8 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Save Changes</button>
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
  name: 'ExamList',
  data() {
    return {
      columns: ['S.NO.', 'TEST ID', 'TITLE', 'CATEGORY', 'SECTIONS', 'VISIBILITY', 'STATUS', 'CREATED ON', 'ACTIONS'],
      showModal: false,
      isEditing: false,
      currentExam: { id: null, title: '', category: 'Civil Services', sections: 1 },
      exams: [
        { id: 101, testId: 'TS-7721', title: 'UPSC PRELIMS MOCK TEST 1', category: 'Civil Services', sections: 4, visibility: 'Public', status: 'Active', date: '21/04/24' },
        { id: 102, testId: 'TS-8842', title: 'IIT-JEE ADVANCED PHYSICS P1', category: 'Engineering', sections: 3, visibility: 'Private', status: 'Draft', date: '19/04/24' },
        { id: 103, testId: 'TS-9910', title: 'NEET BIOLOGY CRASH SERIES', category: 'Medical', sections: 2, visibility: 'Public', status: 'Active', date: '15/04/24' },
        { id: 104, testId: 'TS-1120', title: 'BANK PO APTITUDE SPEED TEST', category: 'Banking', sections: 5, visibility: 'Public', status: 'Active', date: '10/04/24' },
      ]
    }
  },
  methods: {
    initializeNewExam() {
       this.isEditing = false;
       this.currentExam = { id: null, title: '', category: 'Civil Services', sections: 1 };
       this.showModal = true;
    },
    editExam(exam) {
      this.isEditing = true;
      this.currentExam = { ...exam };
      this.showModal = true;
    },
    closeModal() {
       this.showModal = false;
    },
    saveExam() {
       if (this.isEditing) {
          const index = this.exams.findIndex(e => e.id === this.currentExam.id);
          if (index !== -1) {
             this.exams.splice(index, 1, { ...this.currentExam });
          }
       } else {
          this.exams.unshift({
             ...this.currentExam,
             id: Date.now(),
             testId: 'TS-' + Math.floor(1000 + Math.random() * 9000),
             visibility: 'Public',
             status: 'Active',
             date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })
          });
       }
       this.closeModal();
    },
    deleteExam(exam) {
      if(confirm('Institutional Alert: Delete this exam record permanently?')) {
        this.exams = this.exams.filter(e => e.id !== exam.id);
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
.pop-enter, .pop-leave-to {
  opacity: 0;
  scale: 0.95;
}
</style>
