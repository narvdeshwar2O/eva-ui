<template>
  <div class="quiz-list-screen w-full space-y-1">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="book-open" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Quizzes</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Module Center &bull; Live Records ({{ filteredQuizzes.length }})</p>
        </div>
      </div>
      <button
        @click="$router.push('/test-series/quizzes/new')"
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0891B2]/10 flex items-center gap-2"
      >
        <i data-feather="plus-circle" class="w-3 h-3"></i>
        New Quiz
      </button>
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
            <!-- Search row -->
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
              v-for="quiz in paginatedQuizzes"
              :key="quiz.id"
              class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0"
            >
              <!-- Code -->
              <td class="px-4 py-3">
                <button class="flex items-center gap-1.5 px-3 py-1.5 bg-[#0891B2] text-white rounded-lg text-[10px] font-black tracking-tight">
                  <i data-feather="copy" class="w-3 h-3"></i>
                  {{ quiz.code }}
                </button>
              </td>
              <!-- Title -->
              <td class="px-4 py-3 text-sm font-black text-slate-800 tracking-tight">{{ quiz.title }}</td>
              <!-- Category -->
              <td class="px-4 py-3 text-[11px] text-slate-600 font-bold">{{ quiz.category }}</td>
              <!-- Type -->
              <td class="px-4 py-3 text-[11px] text-slate-600 font-bold">{{ quiz.type }}</td>
              <!-- Visibility -->
              <td class="px-4 py-3 text-[11px] text-slate-600 font-bold">{{ quiz.visibility }}</td>
              <!-- Status -->
              <td class="px-4 py-3">
                <span :class="[
                  'px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider',
                  quiz.status === 'Published' ? 'bg-[#ECFDF5] text-[#059669]' :
                  quiz.status === 'Draft'     ? 'bg-[#FFF1F2] text-[#E11D48]' :
                                                'bg-[#FFFBEB] text-[#D97706]'
                ]">{{ quiz.status }}</span>
              </td>
              <!-- Actions -->
              <td class="px-4 py-3">
                <div class="flex items-center gap-1.5">
                  <div class="tooltip-wrap">
                    <button @click="goToAnalytics(quiz)" class="action-btn hover:text-[#0891B2] hover:border-[#0891B2]/30">
                      <i data-feather="bar-chart-2" class="w-3.5 h-3.5"></i>
                    </button>
                    <span class="tooltip">Analytics</span>
                  </div>
                  <div class="tooltip-wrap">
                    <button @click="goToSchedules(quiz)" class="action-btn hover:text-[#0891B2] hover:border-[#0891B2]/30">
                      <i data-feather="calendar" class="w-3.5 h-3.5"></i>
                    </button>
                    <span class="tooltip">Schedules</span>
                  </div>
                  <div class="tooltip-wrap">
                    <button @click="editQuiz(quiz)" class="action-btn hover:text-[#0891B2] hover:border-[#0891B2]/30">
                      <i data-feather="edit-2" class="w-3.5 h-3.5"></i>
                    </button>
                    <span class="tooltip">Edit</span>
                  </div>
                  <div class="tooltip-wrap">
                    <button @click="deleteQuiz(quiz)" class="action-btn hover:text-rose-500 hover:border-rose-200">
                      <i data-feather="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                    <span class="tooltip">Delete</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="filteredQuizzes.length === 0">
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
  name: 'QuizList',
  data() {
    return {
      columns: ['CODE', 'TITLE', 'CATEGORY', 'TYPE', 'VISIBILITY', 'STATUS', 'ACTIONS'],
      currentPage: 1,
      rowsPerPage: 10,
      search: { CODE: '', TITLE: '', CATEGORY: '', TYPE: '', VISIBILITY: '', STATUS: '' },
      quizzes: [
        { id: 1, code: 'quiz_QesfTrCEaje', title: 'Demo Quiz', category: 'English Sub Category', type: 'Quiz', visibility: 'Public', status: 'Draft' },
      ]
    };
  },
  computed: {
    filteredQuizzes() {
      return this.quizzes.filter(q => (
        q.code.toLowerCase().includes(this.search['CODE'].toLowerCase()) &&
        q.title.toLowerCase().includes(this.search['TITLE'].toLowerCase()) &&
        q.category.toLowerCase().includes(this.search['CATEGORY'].toLowerCase()) &&
        q.type.toLowerCase().includes(this.search['TYPE'].toLowerCase()) &&
        q.visibility.toLowerCase().includes(this.search['VISIBILITY'].toLowerCase()) &&
        q.status.toLowerCase().includes(this.search['STATUS'].toLowerCase())
      ));
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredQuizzes.length / this.rowsPerPage));
    },
    paginatedQuizzes() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      return this.filteredQuizzes.slice(start, start + this.rowsPerPage);
    }
  },
  watch: {
    search: { deep: true, handler() { this.currentPage = 1; } },
    rowsPerPage() { this.currentPage = 1; }
  },
  methods: {
    goToAnalytics(quiz) {
      this.$router.push(`/test-series/quizzes/${quiz.id}/analytics`);
    },
    goToSchedules(quiz) {
      this.$router.push(`/test-series/quizzes/${quiz.id}/schedules`);
    },
    editQuiz(quiz) {
      this.$router.push(`/test-series/quizzes/${quiz.id}/edit`);
    },
    deleteQuiz(quiz) {
      if (confirm('Delete this quiz permanently?')) {
        this.quizzes = this.quizzes.filter(q => q.id !== quiz.id);
      }
    }
  },
  mounted() {
    feather.replace();
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

.tooltip-wrap {
  position: relative;
  display: inline-flex;
}
.tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #1E293B;
  color: white;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 4px 8px;
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform: translateX(-50%) translateY(4px);
}
.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #1E293B;
}
.tooltip-wrap:hover .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
