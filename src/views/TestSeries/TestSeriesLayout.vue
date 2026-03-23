<template>
  <div class="test-series-world-class h-screen flex bg-[#F0F7FF] font-sans selection:bg-blue-100 selection:text-blue-900">
    <!-- Premium Sidebar (Inspired by Screenshot 1 but Elevated) -->
    <aside class="w-72 bg-white border-r border-[#E2E8F0] flex flex-col relative z-50 overflow-hidden shadow-[10px_0_30px_rgba(30,41,59,0.02)]">
      <!-- Background Abstract Glow (Softest blue) -->
      <div class="absolute -top-20 -left-20 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl"></div>

      <!-- Brand Section -->
      <div class="h-16 flex items-center px-6 gap-3 relative border-b border-[#F1F5F9] bg-white">
        <div class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-[#EDF2F7]">
          <i data-feather="zap" class="text-[#0891B2] w-6 h-6"></i>
        </div>
        <span class="font-black text-[#1E293B] tracking-tighter text-xl uppercase">JSPARK <span class="text-[#0891B2]">LMS</span></span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-8 px-4 space-y-1 relative">
        <div v-for="item in navItems" :key="item.name">
          <div
            @click="item.subMenu ? toggleSub(item.name) : navigate(item.path)"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group',
              isActive(item.path) ? 'bg-[#0891B2] text-white shadow-lg shadow-[#0891B2]/20' : 'text-slate-600 hover:bg-[#F8FAFC]'
            ]"
          >
            <i :data-feather="item.icon" :class="['w-5 h-5 transition-transform duration-500 group-hover:scale-110', isActive(item.path) ? 'text-white' : 'text-slate-400 group-hover:text-[#0891B2]']"></i>
            <span class="flex-1 text-sm font-black tracking-tight uppercase">{{ item.name }}</span>
            <i v-if="item.subMenu" data-feather="chevron-down" :class="['w-4 h-4 transition-transform duration-300', openSubs.includes(item.name) ? 'rotate-180' : '']"></i>
          </div>

          <!-- Submenu -->
          <transition name="slide-down">
            <div v-if="item.subMenu && openSubs.includes(item.name)" class="mt-1 ml-4 space-y-1 overflow-hidden">
               <div
                v-for="sub in item.subMenu"
                :key="sub.name"
                @click="navigate(sub.path)"
                :class="[
                  'px-9 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200 cursor-pointer mb-0.5',
                  $route.path === sub.path ? 'bg-[#F0F9FB] text-[#0891B2]' : 'text-slate-400 hover:text-[#0891B2] hover:bg-[#F8FAFC]'
                ]"
               >
                {{ sub.name }}
               </div>
            </div>
          </transition>
        </div>
      </nav>

      <!-- User/Footer Section -->
      <div class="p-4 border-t border-[#F1F5F9] relative bg-slate-50/50">
        <button
          @click="$router.push('/')"
          class="w-full px-6 py-2 bg-white hover:bg-[#F8FAFC] text-slate-500 rounded-xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all border border-slate-200 shadow-sm group"
        >
          <i data-feather="log-out" class="w-4 h-4 text-[#0891B2] group-hover:translate-x-1 transition-transform"></i>
          Exit Admin Mode
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col relative overflow-hidden h-screen overflow-y-auto w-full">
      <!-- Sophisticated Header -->
      <header class="h-14 bg-white/80 backdrop-blur-3xl border-b border-[#E2E8F0] shadow-sm flex items-center justify-between px-10 relative z-40">
        <div class="flex items-center gap-4">
          <div class="h-8 w-1.5 bg-gradient-to-b from-[#0EA5E9] to-[#0D9488] rounded-full"></div>
          <div>
            <h1 class="text-xl font-black text-[#1E293B] tracking-tighter">{{ currentHeader }}</h1>
            <p class="text-[9px] text-[#64748B] font-bold uppercase tracking-[0.2em] leading-none mt-1">LMS Control Center &bull; Optimized Workspace</p>
          </div>
        </div>

        <div class="flex items-center gap-5">
           <!-- Search -->
           <div class="hidden lg:flex items-center bg-[#F1F5F9] px-4 py-2.5 rounded-2xl border border-transparent focus-within:border-blue-300 focus-within:bg-white transition-all group">
             <i data-feather="search" class="w-4 h-4 text-slate-400 group-focus-within:text-blue-500"></i>
             <input type="text" placeholder="Global search..." class="bg-transparent border-none outline-none px-3 text-xs font-bold text-slate-600 placeholder:text-slate-400">
           </div>

           <button class="relative p-2.5 bg-[#F1F5F9] text-slate-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all group">
             <i data-feather="bell" class="w-5 h-5 group-hover:rotate-12 transition-transform"></i>
             <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
           </button>

           <div class="w-px h-8 bg-slate-200 mx-1"></div>

           <div class="flex items-center gap-3 cursor-pointer group">
              <div class="text-right hidden sm:block">
                <p class="text-xs font-black text-[#1E293B] leading-none mb-1">Developer Admin</p>
                <p class="text-[9px] font-bold text-[#0D9488] uppercase tracking-tighter">System Architect</p>
              </div>
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-400 to-teal-500 border-4 border-white shadow-lg shadow-blue-500/10 overflow-hidden group-hover:scale-105 transition-transform">
                <img src="https://i.pravatar.cc/100?u=dev" alt="UserAvatar" class="w-full h-full object-cover">
              </div>
           </div>
        </div>
      </header>

      <!-- View Space with narrow gutters -->
      <div class="flex-1 p-3 overflow-y-auto">
        <transition name="page" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'TestSeriesLayout',
  data() {
    return {
      openSubs: ['Manage Test Series'],
      navItems: [
        { name: 'Quick Links', icon: 'home', path: '/test-series/dashboard' },
        {
          name: 'Manage Tests',
          icon: 'layers',
          open: true,
          subMenu: [
            { name: 'Quizzes', path: '/test-series/quizzes' },
            { name: 'Exams', path: '/test-series/exams' },
            { name: 'Quiz Types', path: '/test-series/quiz-types' },
            { name: 'Exam Types', path: '/test-series/exam-types' }
          ]
        },
        { 
          name: 'Question Bank', 
          icon: 'database',
          subMenu: [
            { name: 'Questions', path: '/test-series/questions' },
            { name: 'Import', path: '/test-series/import' },
            { name: 'Comprehensions', path: '/test-series/comprehensions' }
          ]
        },
        { 
          name: 'Manage Users', 
          icon: 'users',
          subMenu: [
            { name: 'Users', path: '/test-series/users' },
            { name: 'User Groups', path: '/test-series/user-groups' }
          ]
        },
        { 
          name: 'Manage Categories', 
          icon: 'folder',
          subMenu: [
            { name: 'Categories', path: '/test-series/categories' },
            { name: 'TestSeries', path: '/test-series/subcategories' },
            { name: 'Tags', path: '/test-series/tags' }
          ]
        },
        { 
          name: 'Manage Subjects', 
          icon: 'book-open', 
          subMenu: [
            { name: 'Subjects', path: '/test-series/subjects' },
            { name: 'Question Category', path: '/test-series/question-categories' }
          ]
        },
        { 
          name: 'Settings', 
          icon: 'settings', 
          subMenu: [
            { name: 'General Settings', path: '/test-series/settings/general' },
            { name: 'Localization Settings', path: '/test-series/settings/localization' }
          ]
        }
      ]
    }
  },
  computed: {
    currentHeader() {
      const path = this.$route.path;
      if (path === '/test-series/create') return 'Series Architect';
      if (path === '/test-series/import') return 'Data Ingestion Console';
      return 'Test Series Repository';
    }
  },
  methods: {
    toggleSub(name) {
      if (this.openSubs.includes(name)) {
        this.openSubs = this.openSubs.filter(n => n !== name);
      } else {
        this.openSubs.push(name);
      }
    },
    isActive(path) {
      return this.$route.path === path;
    },
    navigate(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
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
.test-series-world-class {
  background: radial-gradient(circle at 50% 0%, #FAFCFF 0%, #F0F7FF 100%);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter {
  opacity: 0;
  transform: translateY(15px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.98);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s ease-out;
  max-height: 200px;
}

.slide-down-enter,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Custom Scrollbar for premium feel */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
}
::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 20px;
  border: 3px solid #F0F7FF;
}
::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}
</style>
