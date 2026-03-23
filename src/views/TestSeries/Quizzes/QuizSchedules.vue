<template>
  <div class="quiz-schedules-screen w-full space-y-3">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="calendar" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Quiz Schedules</h2>
          <p class="text-[10px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60 cursor-pointer hover:opacity-100" @click="$router.push('/test-series/quizzes')">
            ← Quizzes
          </p>
        </div>
      </div>
      <button
        @click="showModal = true"
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0891B2]/10 flex items-center gap-2"
      >
        <i data-feather="plus-circle" class="w-3 h-3"></i>
        Add Schedule
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F1F5F9] border-b border-[#E2E8F0]">
              <th v-for="col in columns" :key="col" class="px-4 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="schedules.length === 0">
              <td :colspan="columns.length" class="py-16 text-center">
                <div class="flex flex-col items-center gap-3 text-slate-400">
                  <i data-feather="calendar" class="w-8 h-8 opacity-30"></i>
                  <p class="text-xs font-black uppercase tracking-widest">No Schedules Configured</p>
                  <p class="text-[10px] font-bold opacity-60">Add a schedule to control when this quiz is accessible.</p>
                </div>
              </td>
            </tr>
            <tr
              v-for="schedule in schedules"
              :key="schedule.id"
              class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0"
            >
              <td class="px-4 py-3 text-[11px] font-black text-[#0891B2]">{{ schedule.name }}</td>
              <td class="px-4 py-3 text-[11px] font-bold text-slate-600">{{ schedule.userGroup }}</td>
              <td class="px-4 py-3 text-[11px] font-bold text-slate-600">{{ schedule.startDate }}</td>
              <td class="px-4 py-3 text-[11px] font-bold text-slate-600">{{ schedule.endDate }}</td>
              <td class="px-4 py-3">
                <span :class="['px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider', schedule.active ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#F1F5F9] text-slate-400']">
                  {{ schedule.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <button @click="editSchedule(schedule)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-[#0891B2] hover:border-[#0891B2]/30 rounded-xl transition-all shadow-sm">
                    <i data-feather="edit-2" class="w-3.5 h-3.5"></i>
                  </button>
                  <button @click="deleteSchedule(schedule)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-200 rounded-xl transition-all shadow-sm">
                    <i data-feather="trash-2" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Schedule Modal -->
    <transition name="pop">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" @click="showModal = false"></div>
        <div class="bg-white w-full max-w-lg rounded-xl shadow-2xl relative z-10 border border-slate-100 overflow-hidden">
          <div class="h-1 w-full bg-[#0891B2]"></div>
          <div class="p-6 space-y-5">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-black text-slate-800">{{ editingSchedule ? 'Edit Schedule' : 'New Schedule' }}</h3>
              <button @click="showModal = false" class="text-slate-400 hover:text-rose-500 transition-colors">
                <i data-feather="x" class="w-5 h-5"></i>
              </button>
            </div>
            <div class="space-y-4">
              <div class="space-y-1">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Schedule Name</label>
                <input v-model="scheduleForm.name" type="text" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all">
              </div>
              <div class="space-y-1">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">User Group</label>
                <select v-model="scheduleForm.userGroup" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-[#0891B2] transition-all">
                  <option value="">Select User Group</option>
                  <option>All Users</option>
                  <option>Premium Users</option>
                  <option>Free Users</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Date</label>
                  <input v-model="scheduleForm.startDate" type="datetime-local" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-[#0891B2] transition-all">
                </div>
                <div class="space-y-1">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">End Date</label>
                  <input v-model="scheduleForm.endDate" type="datetime-local" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-[#0891B2] transition-all">
                </div>
              </div>
            </div>
            <div class="flex items-center justify-end gap-4 pt-2">
              <button @click="showModal = false" class="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Cancel</button>
              <button @click="saveSchedule" class="px-8 py-2.5 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-[#0D9488] transition-all">Save</button>
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
  name: 'QuizSchedules',
  data() {
    return {
      columns: ['SCHEDULE NAME', 'USER GROUP', 'START DATE', 'END DATE', 'STATUS', 'ACTIONS'],
      showModal: false,
      editingSchedule: null,
      scheduleForm: { name: '', userGroup: '', startDate: '', endDate: '' },
      schedules: []
    };
  },
  methods: {
    editSchedule(schedule) {
      this.editingSchedule = schedule;
      this.scheduleForm = { ...schedule };
      this.showModal = true;
    },
    saveSchedule() {
      if (this.editingSchedule) {
        const idx = this.schedules.findIndex(s => s.id === this.editingSchedule.id);
        if (idx !== -1) this.schedules.splice(idx, 1, { ...this.scheduleForm, id: this.editingSchedule.id, active: true });
      } else {
        this.schedules.push({ ...this.scheduleForm, id: Date.now(), active: true });
      }
      this.showModal = false;
      this.editingSchedule = null;
      this.scheduleForm = { name: '', userGroup: '', startDate: '', endDate: '' };
    },
    deleteSchedule(schedule) {
      if (confirm('Delete this schedule?')) {
        this.schedules = this.schedules.filter(s => s.id !== schedule.id);
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
.pop-enter-active, .pop-leave-active { transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1); }
.pop-enter, .pop-leave-to { opacity: 0; transform: scale(0.95); }
</style>
