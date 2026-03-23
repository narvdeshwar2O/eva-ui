<template>
  <div class="test-type-hub w-full space-y-2 py-1">
    <!-- Header Strategy -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="grid" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Quiz Type Taxonomy</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Modular Classification Engine &bull; {{ quizTypes.length }} Definitions</p>
        </div>
      </div>

      <button 
        @click="initializeNewQuizType"
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
      >
        <i data-feather="plus-circle" class="w-3 h-3 text-white"></i>
        New Quiz Type
      </button>
    </div>

    <!-- Table Architecture -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F1F5F9] border-b border-[#E2E8F0]">
              <th v-for="col in ['CODE', 'NAME', 'STATUS', 'ACTIONS']" :key="col" class="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="quiz in quizTypes" :key="quiz.id" class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 font-extrabold text-slate-800">
               <td class="px-3 py-4">
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-black tracking-tight text-[10px] flex items-center gap-1.5 w-max">
                     <i data-feather="hash" class="w-3 h-3 text-blue-400"></i>
                     {{ quiz.code }}
                  </span>
               </td>
               <td class="px-3 py-4 text-sm font-black text-slate-900 tracking-tight">{{ quiz.name }}</td>
               <td class="px-3 py-4">
                  <span :class="['px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest', quiz.status === 'Active' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#FFFBEB] text-[#D97706]']">
                     {{ quiz.status }}
                  </span>
               </td>
               <td class="px-3 py-4">
                  <div class="flex items-center gap-2">
                     <button @click="editQuizType(quiz)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#0891B2] hover:border-[#0891B2]/30 rounded-xl transition-all shadow-sm" title="Edit Spec">
                        <i data-feather="edit-3" class="w-3.5 h-3.5"></i>
                     </button>
                     <button @click="deleteQuizType(quiz)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 rounded-xl transition-all shadow-sm" title="Delete Type">
                        <i data-feather="trash-2" class="w-3.5 h-3.5"></i>
                     </button>
                  </div>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Theme Modal Architecture -->
    <transition name="pop">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" @click="closeModal"></div>
          <div class="bg-white w-full max-w-lg rounded-xl shadow-2xl relative z-10 border border-slate-100 overflow-hidden">
             <div class="h-1 w-full bg-gradient-to-r from-[#0891B2] to-[#0D9488]"></div>
             <div class="p-6 space-y-6">
                <div class="flex items-center justify-between">
                   <h3 class="text-xl font-black text-slate-800 tracking-tight">{{ isEditing ? 'Edit Quiz Blueprint' : 'Architect: New Quiz Type' }}</h3>
                   <button @click="closeModal" class="w-8 h-8 rounded-xl bg-slate-100 text-slate-400 hover:text-rose-500 transition-all flex items-center justify-center">
                      <i data-feather="x" class="w-5 h-5"></i>
                   </button>
                </div>
                <div class="space-y-4">
                   <div class="space-y-1.5">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Quiz Type Name</label>
                      <input v-model="currentQuiz.name" type="text" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all">
                   </div>
                   <div class="grid grid-cols-2 gap-4">
                      <div class="space-y-1.5">
                         <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Color Palette</label>
                         <div class="flex gap-2">
                             <div class="w-11 h-11 rounded-xl shadow-inner border-2 border-white" :style="{ backgroundColor: currentQuiz.color }"></div>
                             <input v-model="currentQuiz.color" type="text" class="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none">
                         </div>
                      </div>
                      <div class="space-y-1.5">
                         <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Image URL</label>
                         <input v-model="currentQuiz.imageUrl" type="text" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none">
                      </div>
                   </div>
                   <div class="space-y-1.5">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Description</label>
                      <textarea v-model="currentQuiz.description" rows="3" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none resize-none"></textarea>
                   </div>
                   <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl p-4 flex items-center justify-between">
                      <div>
                         <h4 class="text-xs font-black text-slate-700 uppercase tracking-tight">Active Status</h4>
                         <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">Visible across distribution channels</p>
                      </div>
                      <div 
                       @click="currentQuiz.status = currentQuiz.status === 'Active' ? 'In-Active' : 'Active'"
                       class="w-12 h-6 rounded-full p-1 cursor-pointer transition-all duration-500 relative"
                       :class="currentQuiz.status === 'Active' ? 'bg-[#0891B2]' : 'bg-slate-300'"
                      >
                       <div class="bg-white w-4 h-4 rounded-full shadow-lg transition-all duration-500 transform" :class="currentQuiz.status === 'Active' ? 'translate-x-6' : 'translate-x-0'"></div>
                      </div>
                   </div>
                </div>
                <div class="flex items-center justify-end gap-6 pt-2">
                   <button @click="closeModal" class="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">Abort</button>
                   <button @click="saveQuizType" class="px-8 py-3 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all">
                     {{ isEditing ? 'Finalize Changes' : 'Initialize Creation' }}
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
  name: 'QuizTypeList',
  data() {
    return {
      showModal: false,
      isEditing: false,
      currentQuiz: { id: null, code: '', name: '', color: '#0891B2', imageUrl: '', description: '', status: 'Active' },
      quizTypes: [
        { id: 1, code: 'QTP-992', name: 'Standard Quiz', status: 'Active', color: '#0891B2', imageUrl: '', description: 'Universal evaluation blueprint.' },
        { id: 2, code: 'QTP-105', name: 'Sprint Contest', status: 'Active', color: '#FCD34D', imageUrl: '', description: 'Timed competitive execution.' },
        { id: 3, code: 'QTP-664', name: 'Zen Challenge', status: 'Active', color: '#10B981', imageUrl: '', description: 'Infinite duration mental stress test.' }
      ]
    }
  },
  methods: {
    initializeNewQuizType() {
       this.isEditing = false;
       this.currentQuiz = { id: null, code: '', name: '', color: '#0891B2', imageUrl: '', description: '', status: 'Active' };
       this.showModal = true;
    },
    editQuizType(quiz) {
       this.isEditing = true;
       this.currentQuiz = { ...quiz };
       this.showModal = true;
    },
    closeModal() {
       this.showModal = false;
       this.isEditing = false;
    },
    saveQuizType() {
       if (!this.currentQuiz.name) {
          alert('Validation Error: Name is required.');
          return;
       }
       if (this.isEditing) {
          const index = this.quizTypes.findIndex(q => q.id === this.currentQuiz.id);
          if (index !== -1) {
             this.quizTypes.splice(index, 1, { ...this.currentQuiz });
          }
       } else {
          this.quizTypes.unshift({
             ...this.currentQuiz,
             id: Date.now(),
             code: 'QTP-' + Math.floor(100 + Math.random() * 900)
          });
       }
       this.closeModal();
    },
    deleteQuizType(quiz) {
       if (confirm('System Alert: Delete this quiz type taxonomy permanently?')) {
          this.quizTypes = this.quizTypes.filter(q => q.id !== quiz.id);
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
</style>
