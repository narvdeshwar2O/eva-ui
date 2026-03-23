<template>
  <div class="quiz-analytics-screen w-full space-y-3">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-black text-slate-800 tracking-tight leading-none">{{ quizTitle }} - Overall Report</h2>
        <p class="text-[10px] text-[#0891B2] font-black mt-1 cursor-pointer hover:underline" @click="$router.push('/test-series/quizzes')">
          ← Back to Quizzes
        </p>
      </div>
      <button class="px-6 py-2.5 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0891B2]/20">
        Detailed Report
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-xl shadow-blue-900/5 overflow-hidden">
      <div class="grid grid-cols-4 divide-x divide-y divide-[#F1F5F9]">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex flex-col items-center justify-center py-10 px-6 text-center hover:bg-[#F8FAFC] transition-colors"
        >
          <p class="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3">{{ stat.label }}</p>
          <p class="text-3xl font-black text-[#0891B2] tracking-tight">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'QuizAnalytics',
  data() {
    return {
      quizTitle: 'Demo Quiz',
      stats: [
        { label: 'Total Attempts',        value: '0' },
        { label: 'Pass Attempts',          value: '0' },
        { label: 'Fail Attempts',          value: '0' },
        { label: 'Unique Test Takers',     value: '0' },
        { label: 'Avg. Time Spent',        value: '0 Sec' },
        { label: 'Avg. Score',             value: '0/1' },
        { label: 'High Score',             value: '0' },
        { label: 'Low Score',              value: '0' },
        { label: 'Avg. Percentage',        value: '0%' },
        { label: 'Avg. Accuracy',          value: '0%' },
        { label: 'Avg. Speed',             value: '0 que/hr' },
        { label: 'Avg. Questions Answered', value: '0%' },
      ]
    };
  },
  mounted() {
    // In production: load analytics by this.$route.params.id
    feather.replace();
  }
};
</script>
