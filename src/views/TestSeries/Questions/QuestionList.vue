<template>
  <div class="question-repository-hub w-full p-3 space-y-3 animate-fade-in">
    <!-- Header Architecture -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="help-circle" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Questions</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Master Bank &bull; {{ questions.length }} Active Queries</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <router-link 
          to="/test-series/import"
          class="px-6 py-2 bg-[#59B5D3]/20 text-[#0891B2] border border-[#0891B2]/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0891B2] hover:text-white transition-all shadow-sm flex items-center gap-2"
        >
          <i data-feather="upload" class="w-3 h-3"></i>
          Import Questions
        </router-link>

        <div class="relative group">
           <button 
             @click="toggleNewQuestionMenu"
             class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
           >
             <i data-feather="plus-circle" class="w-3 h-3 text-white"></i>
             New Question
             <i data-feather="chevron-down" class="w-3 h-3 text-white"></i>
           </button>
           
           <transition name="pop">
              <div v-if="showNewQuestionMenu" class="absolute right-0 mt-2 w-64 bg-white border border-[#E2E8F0] rounded-xl shadow-2xl z-[100] py-4 border-t-4 border-t-[#0891B2] animate-pop">
                 <div class="px-5 py-2 mb-2 border-b border-slate-50">
                    <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Select Logic Format</span>
                 </div>
                 <button v-for="type in questionTypes" :key="type" class="w-full text-left px-5 py-2.5 text-[10px] font-black text-slate-600 hover:text-[#0891B2] hover:bg-slate-50 flex items-center gap-3 uppercase tracking-widest transition-all">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#0891B2]/20"></div>
                    {{ type }}
                 </button>
              </div>
           </transition>
        </div>
      </div>
    </div>

    <!-- Master Table Architecture -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5">
      <div class="overflow-x-auto min-h-[400px]">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F8FAFC] border-b border-slate-200">
              <th v-for="col in headers" :key="col" class="px-4 py-5 text-[11px] font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
            <!-- Intelligent Multisearch -->
            <tr class="bg-white/30 backdrop-blur-sm border-b border-[#F1F5F9]">
              <td v-for="(col, index) in headers" :key="'filter-'+index" class="px-2 py-2">
                  <input 
                    v-if="col !== 'ACTIONS'" 
                    type="text" 
                    :placeholder="'Search ' + col.toLowerCase()" 
                    class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:border-[#0891B2]/30 focus:bg-white transition-all shadow-inner"
                  >
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-if="questions.length === 0">
               <td :colspan="headers.length" class="py-32 text-center">
                  <div class="flex flex-col items-center gap-4 opacity-40">
                     <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                        <i data-feather="inbox" class="w-8 h-8 text-slate-300"></i>
                     </div>
                     <p class="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">No Records Found</p>
                  </div>
               </td>
            </tr>
            <tr v-for="q in questions" :key="q.id" class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 font-extrabold text-slate-800">
               <!-- Data Rows would go here -->
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Performance Footer -->
      <div class="px-4 py-3 bg-[#F8FAFC] border-t border-[#F1F5F9] flex items-center justify-between">
          <div class="flex items-center gap-4">
             <div class="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                ROWS PER PAGE: 
                <select class="bg-white border border-[#E2E8F0] rounded-xl px-3 py-1 text-slate-600 outline-none">
                   <option>10</option>
                   <option>25</option>
                   <option>50</option>
                </select>
             </div>
          </div>
          <div class="flex items-center gap-4">
             <div class="px-4 py-1.5 bg-white border border-[#E2E8F0] text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest scale-95 opacity-80">
                PAGE 1 OF 0
             </div>
             <div class="flex items-center gap-1">
                <button class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#0891B2] transition-all"><i data-feather="chevron-left" class="w-4 h-4"></i></button>
                <button class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#0891B2] transition-all"><i data-feather="chevron-right" class="w-4 h-4"></i></button>
             </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'QuestionList',
  data() {
    return {
      showNewQuestionMenu: false,
      questions: [], // No records found state
      headers: [
        'SERIAL NO.',
        'ID',
        'QUESTION',
        'SECTION',
        'SUBJECT',
        'COUNT',
        'TESTS',
        'STATUS',
        'CREATED ON',
        'ACTIONS'
      ],
      questionTypes: [
        'Multiple Choice Single Answer',
        'Multiple Choice Multiple Answers',
        'True or False',
        'Short Answer',
        'Match the Following',
        'Ordering/Sequence',
        'Fill in the Blanks'
      ]
    }
  },
  methods: {
    toggleNewQuestionMenu() {
       this.showNewQuestionMenu = !this.showNewQuestionMenu;
    }
  },
  mounted() {
    feather.replace();
    window.addEventListener('click', (e) => {
       if (!e.target.closest('.relative')) {
          this.showNewQuestionMenu = false;
       }
    });
  },
  updated() {
    feather.replace();
  }
}
</script>

<style scoped>
.question-repository-hub {
  animation: fadeIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.pop-enter-active, .pop-leave-active {
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
}
.pop-enter, .pop-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
