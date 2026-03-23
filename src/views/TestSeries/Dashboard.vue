<template>
  <div class="test-series-dashboard-hub w-full p-3 space-y-3 animate-fade-in">
    <!-- Sophisticated Header -->
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
        <i data-feather="grid" class="w-6 h-6"></i>
      </div>
      <div>
        <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Quick Links</h2>
        <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Architectural Hub &bull; Operational Summary</p>
      </div>
    </div>

    <!-- Stats Matrix (Top Row) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-xl border border-white shadow-xl shadow-blue-900/5 p-4 text-center transform hover:-translate-y-1 transition-all duration-300">
        <h3 class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{{ stat.label }}</h3>
        <p class="text-3xl font-black text-[#0891B2] tracking-tighter">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Quick Action Infrastructure (Grid) -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <div 
        v-for="action in quickActions" 
        :key="action.label"
        @click="navigateAction(action.path)"
        class="group bg-white rounded-xl border border-white shadow-lg shadow-blue-900/5 p-5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-2xl hover:shadow-[#0891B2]/10 transition-all duration-500 overflow-hidden relative"
      >
        <div class="absolute inset-x-0 bottom-0 h-1 bg-[#0891B2] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></div>
        <div class="w-12 h-12 bg-[#F0F9FB] rounded-xl flex items-center justify-center text-[#0891B2] group-hover:bg-[#0891B2] group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
          <i :data-feather="action.icon" class="w-6 h-6"></i>
        </div>
        <h4 class="text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-slate-900 transition-colors">{{ action.label }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'TestSeriesDashboard',
  data() {
    return {
      stats: [
        { label: 'Total Users', value: 9 },
        { label: 'Total Questions', value: 0 },
        { label: 'Total Exams', value: 0 },
        { label: 'Total Subjects', value: 0 }
      ],
      quickActions: [
        { label: 'Create Question', icon: 'edit-3', path: '/test-series/questions' },
        { label: 'Import Questions', icon: 'upload-cloud', path: '/test-series/import' },
        { label: 'Create Test', icon: 'file-text', path: '/test-series/create' },
        { label: 'Create Subject', icon: 'book', path: '/test-series/subjects' },
        { label: 'Create Sections', icon: 'list', path: '/test-series/sections' },
        { label: 'Create Category', icon: 'layers', path: '/test-series/categories' },
        { label: 'Create Sub-Category', icon: 'layers', path: '/test-series/subcategories' }
      ]
    }
  },
  methods: {
    navigateAction(path) {
      this.$router.push(path).catch(() => {});
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
.test-series-dashboard-hub {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
