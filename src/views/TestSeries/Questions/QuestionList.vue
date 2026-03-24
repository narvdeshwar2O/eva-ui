<template>
  <div class="question-list-screen w-full space-y-3">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="help-circle" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Questions</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Question Bank • {{ filteredQuestions.length }} Records</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="$router.push('/test-series/import')"
          class="px-6 py-2 bg-white border border-[#E2E8F0] text-[#0891B2] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F8FAFC] transition-all shadow-sm flex items-center gap-2"
        >
          <i data-feather="upload" class="w-3 h-3"></i>
          Import Questions
        </button>

        <div class="relative">
          <button
            @click.stop="showTypeMenu = !showTypeMenu"
            class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
          >
            <i data-feather="plus-circle" class="w-3 h-3"></i>
            New Question
            <i data-feather="chevron-down" class="w-3 h-3"></i>
          </button>

          <transition name="dropdown">
            <div
              v-if="showTypeMenu"
              class="absolute right-0 mt-2 w-72 bg-white border border-[#E2E8F0] rounded-xl shadow-xl shadow-slate-900/10 z-50 py-2 overflow-hidden"
            >
              <div class="px-4 py-2 border-b border-[#F1F5F9]">
                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Select Question Type</span>
              </div>
              <button
                v-for="type in questionTypes"
                :key="type.value"
                @click="createQuestion(type.value)"
                class="w-full text-left px-4 py-3 text-[11px] font-bold text-slate-700 hover:bg-[#F0F9FF] hover:text-[#0891B2] transition-colors flex items-center gap-3"
              >
                <div class="w-2 h-2 rounded-full bg-[#0891B2]"></div>
                {{ type.label }}
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F1F5F9] border-b border-[#E2E8F0]">
              <th v-for="col in columns" :key="col" class="px-4 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
            <tr class="bg-white/50 border-b border-[#F1F5F9]">
              <td v-for="col in columns" :key="col + '-search'" class="px-2 py-2">
                <div v-if="col !== 'ACTIONS'">
                  <input
                    type="text"
                    :placeholder="'Search ' + col"
                    v-model="search[col]"
                    class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 placeholder:text-slate-300 focus:bg-white focus:border-[#0891B2] focus:ring-4 focus:ring-[#0891B2]/10 outline-none transition-all"
                  >
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(q, idx) in paginatedQuestions"
              :key="q.id"
              class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0"
            >
              <td class="px-4 py-3 text-[11px] font-black text-slate-400">{{ (currentPage - 1) * rowsPerPage + idx + 1 }}</td>
              <td class="px-4 py-3 text-[11px] font-black text-[#0891B2]">{{ q.id }}</td>
              <td class="px-4 py-3 text-sm font-bold text-slate-800 max-w-xs truncate">{{ q.questionText }}</td>
              <td class="px-4 py-3 text-[11px] text-slate-600">{{ q.section }}</td>
              <td class="px-4 py-3 text-[11px] text-slate-600">{{ q.subject }}</td>
              <td class="px-4 py-3 text-[11px] text-slate-600">{{ q.count }}</td>
              <td class="px-4 py-3">
                <span class="px-2 py-1 bg-[#ECFDF5] text-[#059669] rounded-md text-[10px] font-black">{{ q.tests }}</span>
              </td>
              <td class="px-4 py-3">
                <span :class="['px-2 py-1 rounded-md text-[10px] font-black uppercase', q.status === 'Active' ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-slate-100 text-slate-500']">{{ q.status }}</span>
              </td>
              <td class="px-4 py-3 text-[11px] text-slate-500">{{ q.createdOn }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-1.5">
                  <button @click="editQuestion(q)" class="action-btn hover:text-[#0891B2] hover:border-[#0891B2]/30" title="Edit">
                    <i data-feather="edit-2" class="w-3.5 h-3.5"></i>
                  </button>
                  <button @click="deleteQuestion(q)" class="action-btn hover:text-rose-500 hover:border-rose-200" title="Delete">
                    <i data-feather="trash-2" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredQuestions.length === 0">
              <td :colspan="columns.length" class="py-12 text-center text-slate-400 font-black text-xs uppercase tracking-widest">
                No Records Found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="px-4 py-3 bg-[#F8FAFC] border-t border-[#F1F5F9] flex flex-col md:flex-row items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rows Per Page:</span>
          <select v-model.number="rowsPerPage" class="bg-white border border-[#E2E8F0] rounded-lg px-2 py-1 text-[9px] font-black text-slate-600 outline-none">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div class="flex items-center gap-1.5">
          <button @click="currentPage--" :disabled="currentPage === 1" class="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] text-slate-400 flex items-center justify-center hover:bg-[#F1F5F9] transition-all disabled:opacity-30">
            <i data-feather="chevron-left" class="w-3 h-3"></i>
          </button>
          <div class="px-3 py-1 bg-[#0891B2] text-white rounded-lg text-[8px] font-black uppercase tracking-widest">
            Page {{ currentPage }} of {{ totalPages }}
          </div>
          <button @click="currentPage++" :disabled="currentPage === totalPages" class="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] text-slate-400 flex items-center justify-center hover:bg-[#F1F5F9] transition-all disabled:opacity-30">
            <i data-feather="chevron-right" class="w-3 h-3"></i>
          </button>
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
      columns: ['SERIAL NO.', 'ID', 'QUESTION', 'SECTION', 'SUBJECT', 'COUNT', 'TESTS', 'STATUS', 'CREATED ON', 'ACTIONS'],
      showTypeMenu: false,
      currentPage: 1,
      rowsPerPage: 10,
      search: { 'SERIAL NO.': '', 'ID': '', 'QUESTION': '', 'SECTION': '', 'SUBJECT': '', 'COUNT': '', 'TESTS': '', 'STATUS': '', 'CREATED ON': '' },
      questionTypes: [
        { label: 'Multiple Choice Single Answer', value: 'mcsa' },
        { label: 'Multiple Choice Multiple Answers', value: 'mcma' },
        { label: 'True or False', value: 'true-false' },
        { label: 'Short Answer', value: 'short-answer' },
        { label: 'Match the Following', value: 'match' },
        { label: 'Ordering/Sequence', value: 'ordering' },
        { label: 'Fill in the Blanks', value: 'fill-blanks' }
      ],
      questions: [
        { id: 1, questionText: 'Q1', section: 'English', subject: 'Grammar', count: 6, tests: 'Exam', status: 'Active', createdOn: 'Fri, Mar 20, 2026' }
      ]
    };
  },
  computed: {
    filteredQuestions() {
      return this.questions.filter(q => {
        return (
          q.id.toString().includes(this.search['ID']) &&
          (q.questionText || '').toLowerCase().includes(this.search['QUESTION'].toLowerCase()) &&
          (q.section || '').toLowerCase().includes(this.search['SECTION'].toLowerCase()) &&
          (q.subject || '').toLowerCase().includes(this.search['SUBJECT'].toLowerCase()) &&
          (q.status || '').toLowerCase().includes(this.search['STATUS'].toLowerCase())
        );
      });
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredQuestions.length / this.rowsPerPage));
    },
    paginatedQuestions() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      return this.filteredQuestions.slice(start, start + this.rowsPerPage);
    }
  },
  watch: {
    search: { deep: true, handler() { this.currentPage = 1; } },
    rowsPerPage() { this.currentPage = 1; }
  },
  methods: {
    createQuestion(type) {
      this.showTypeMenu = false;
      this.$router.push(`/test-series/questions/new?type=${type}`);
    },
    editQuestion(q) {
      this.$router.push(`/test-series/questions/${q.id}/edit`);
    },
    deleteQuestion(q) {
      if (confirm('Delete this question permanently?')) {
        this.questions = this.questions.filter(x => x.id !== q.id);
      }
    }
  },
  mounted() {
    feather.replace();
    document.addEventListener('click', () => { this.showTypeMenu = false; });
  },
  updated() {
    feather.replace();
  }
};
</script>

<style scoped>
.action-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 0.75rem;
  color: #64748b;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}
.action-btn:hover {
  background: #F8FAFC;
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.15s ease;
}
.dropdown-enter, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}
</style>
