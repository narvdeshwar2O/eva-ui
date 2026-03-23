<template>
 <div class="min-h-screen bg-[#F0F9FF] text-blue-950 font-sans relative overflow-hidden">
 
 <!-- Frontend Views -->
 <template v-if="!isAuthenticated || $route.path.startsWith('/test-series')">
 <router-view @auth-success="handleAuthSuccess"></router-view>
 </template>

 <!-- Dashboard Content -->
 <div v-else class="flex min-h-screen">
 <!-- Background Decorative Blobs -->
 <div class="bg-blob bg-blob-1"></div>
 <div class="bg-blob bg-blob-2"></div>
 <!-- Sidebar -->
 <aside
 :class="[ 'fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out flex flex-col premium-sidebar', collapsed ? 'w-16' : 'w-64' ]"
 >
 <div class="h-20 flex items-center justify-between px-3 border-b border-blue-100 mb-2">
 <div v-show="!collapsed" class="flex items-center gap-2 font-bold text-lg tracking-tight">
 <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
 <feather type="zap" size="18"></feather>
 </div>
 <span>Jspark Admin</span>
 </div>
 <button
 @click="collapsed = !collapsed"
 class="p-1.5 hover:bg-blue-100 rounded-xl text-blue-500 transition-all duration-300 hover:rotate-180"
 >
 <feather :type="collapsed ? 'chevrons-right' : 'chevrons-left'" size="18"></feather>
 </button>
 </div>

 <nav class="flex-1 overflow-y-auto px-2 space-y-0.5">
 <div v-for="item in menuItems" :key="item.name" class="mb-1">
 <div
 @click="item.subMenu ? toggleSubmenu(item.name) : handleSubmenuClick(item.name)"
 :class="[ 'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group cursor-pointer sidebar-item', item.active ? 'sidebar-item-active' : 'text-black hover:bg-blue-100', !collapsed && openSubmenus.includes(item.name) ? 'bg-blue-50/50' : '' ]"
 :title="item.name"
 >
 <div class="flex items-center gap-3">
 <feather :type="item.icon" :size="18" :class="['sidebar-icon', item.active ? 'text-blue-600' : 'text-blue-600 group-hover:text-black']"></feather>
 <span v-show="!collapsed" class="truncate">{{ item.name }}</span>
 </div>
 <feather
 v-if="!collapsed && item.subMenu"
 :type="openSubmenus.includes(item.name) ? 'chevron-down' : 'chevron-right'"
 size="14"
 class="text-indigo-400"
 ></feather>
 </div>
 <!-- Submenu -->
 <div v-if="!collapsed && item.subMenu && openSubmenus.includes(item.name)" class="mt-1 pl-9 space-y-1">
 <div
 v-for="sub in item.subMenu"
 :key="sub"
 @click="handleSubmenuClick(item.name, sub)"
 :class="[ 'block px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer', activeSubmenu === sub ? 'bg-blue-50 text-blue-600' : 'text-black/70 hover:text-black hover:bg-blue-100' ]"
 >
 {{ sub }}
 </div>
 </div>
 </div>
 </nav>
 </aside>

 <!-- Main Content -->
 <main :class="['flex-1 h-screen overflow-y-auto flex flex-col transition-all duration-300', collapsed ? 'ml-16' : 'ml-64']">
 <!-- Header -->
 <header class="h-20 bg-white/70 backdrop-blur-xl border-b border-blue-200/60 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm shadow-blue-200/20">
 <h1 class="text-base font-black text-blue-950 tracking-tight">
 {{ currentViewTitle }}
 </h1>

 <div class="flex items-center gap-3">
 <button class="relative p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-all duration-200">
 <feather type="bell" size="18"></feather>
 <span class="absolute top-2 right-2 w-2 h-2 bg-indigo-600 border-2 border-white rounded-full"></span>
 </button>

 <div class="h-8 w-px bg-blue-200 mx-1"></div>

 <div class="relative">
 <div
 @click="userDropdownOpen = !userDropdownOpen"
 :class="[ 'flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-blue-100 cursor-pointer transition-all duration-200 group', userDropdownOpen ? 'bg-blue-100' : '' ]"
 >
 <div class="relative">
 <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-all overflow-hidden border-2 border-white relative">
 <img src="https://i.pravatar.cc/150?u=admin" class="w-full h-full object-cover" alt="User" onerror="this.style.display='none'" />
 <feather type="user" size="16" class="absolute"></feather>
 </div>
 <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
 </div>
 <div class="hidden sm:block">
 <p class="text-xs font-bold text-black leading-none mb-0.5">Admin Istrator</p>
 <p class="text-[9px] font-bold text-blue-600 uppercase tracking-tighter leading-none">Super Admin</p>
 </div>
 <feather type="chevron-down" size="14" :class="['text-blue-400 group-hover:text-black transition-all duration-200', userDropdownOpen ? 'rotate-180' : '']"></feather>
 </div>

 <!-- Dropdown Menu -->
 <div
 v-if="userDropdownOpen"
 class="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-2xl z-50 py-1.5 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right"
 >
 <div class="px-4 py-2 border-b border-indigo-50 mb-1">
 <p class="text-xs font-bold text-indigo-900">admin@jspark.ai</p>
 </div>
 <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 hover:text-black transition-colors">
 <feather type="user" size="14"></feather>
 My Profile
 </a>
 <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 hover:text-black transition-colors">
 <feather type="settings" size="14"></feather>
 Settings
 </a>
 <div class="h-px bg-blue-100 my-1"></div>
 <a href="#" @click.prevent="isAuthenticated = false" class="flex items-center gap-3 px-4 py-2 text-sm font-bold text-blue-950 hover:bg-blue-50 transition-colors">
 <feather type="log-out" size="14"></feather>
 Logout Account
 </a>
 </div>
 </div>
 </div>
 </header>

 <!-- Dynamic View Body -->
 <div class="p-3 space-y-3 max-w-7xl mx-auto w-full">

 <template v-if="currentView === 'dashboard'">
 <!-- User Stats Grid -->
 <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
 <div v-for="stat in userStats" :key="stat.title" class="glass-card p-3 transition-all duration-500">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 <p class="text-[11px] font-black text-black uppercase tracking-[0.1em] mb-1">{{ stat.title }}</p>
 <div class="flex items-end justify-between">
 <h3 class="text-2xl font-bold text-blue-950 tabular-nums leading-none">{{ stat.value }}</h3>
 <div class="p-2 bg-blue-50 text-blue-600 rounded-lg stat-icon-wrapper">
 <feather :type="stat.icon" size="16"></feather>
 </div>
 </div>
 <div class="mt-3 flex items-center gap-1.5">
 <span class="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
 <feather type="trending-up" size="10" class="mr-0.5"></feather> 12%
 </span>
 <span class="text-[10px] text-indigo-400">vs last month</span>
 </div>
 </div>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
 <!-- User Details Widget -->
 <div class="glass-card overflow-hidden h-fit">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 <div class="px-4 py-3 border-b border-blue-100 flex items-center justify-between">
 <h4 class="text-xs font-bold text-blue-900 uppercase tracking-tight">User Details</h4>
 <div class="flex items-center p-1 bg-blue-100/80 rounded-full w-fit h-9 shadow-inner group">
 <button
 @click="viewType = 'number'"
 :class="[ 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black transition-all duration-300', viewType === 'number' ? 'bg-white text-blue-600 shadow-sm border border-blue-200' : 'text-blue-500 hover:text-blue-700' ]"
 >
 <feather type="hash" size="10"></feather>
 NUMBER
 </button>
 <button
 @click="viewType = 'graph'"
 :class="[ 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black transition-all duration-300', viewType === 'graph' ? 'bg-white text-blue-600 shadow-sm border border-blue-200' : 'text-blue-500 hover:text-blue-700' ]"
 >
 <feather type="activity" size="10"></feather>
 GRAPH
 </button>
 </div>
 </div>

 <div class="p-4 min-h-[320px]">
 <div v-show="viewType === 'graph'">
 <div class="flex items-center justify-center gap-4 py-2 mb-4">
 <div v-for="l in userLegendItems" :key="l.label" class="flex items-center gap-1.5">
 <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: l.color }"></span>
 <span class="text-[10px] text-blue-500 font-semibold">{{ l.label }}</span>
 </div>
 </div>
 <div class="relative flex justify-center py-2 h-64">
 <div id="user-stats-chart" class="w-full"></div>
 </div>
 </div>

 <div v-show="viewType === 'number'" class="space-y-3 py-2">
 <div v-for="stat in userStats" :key="stat.title" class="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600">
 <feather :type="stat.icon" size="14"></feather>
 </div>
 <span class="text-[11px] font-bold text-blue-600 uppercase tracking-tight">{{ stat.title }}</span>
 </div>
 <span class="text-base font-black text-blue-950">{{ stat.value }}</span>
 </div>
 </div>
 </div>
 </div>

 <!-- Platform Details Widget -->
 <div class="glass-card overflow-hidden h-fit">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 <div class="px-4 py-3 border-b border-blue-100 flex items-center justify-between">
 <h4 class="text-xs font-bold text-blue-900 uppercase tracking-tight">Platform Distribution</h4>
 <div class="flex items-center p-1 bg-blue-100/80 rounded-full w-fit h-9 shadow-inner group">
 <button
 @click="platformViewType = 'number'"
 :class="[ 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black transition-all duration-300', platformViewType === 'number' ? 'bg-white text-blue-600 shadow-sm border border-blue-200' : 'text-blue-500 hover:text-blue-700' ]"
 >
 <feather type="hash" size="10"></feather>
 NUMBER
 </button>
 <button
 @click="platformViewType = 'graph'"
 :class="[ 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black transition-all duration-300', platformViewType === 'graph' ? 'bg-white text-blue-600 shadow-sm border border-blue-200' : 'text-blue-500 hover:text-blue-700' ]"
 >
 <feather type="pie-chart" size="10"></feather>
 GRAPH
 </button>
 </div>
 </div>

 <div class="p-4 min-h-[320px]">
 <div v-show="platformViewType === 'graph'">
 <div class="flex items-center justify-center gap-4 py-2 mb-4">
 <div v-for="l in platformLegendItems" :key="l.label" class="flex items-center gap-1.5">
 <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: l.color }"></span>
 <span class="text-[10px] text-blue-500 font-semibold">{{ l.label }}</span>
 </div>
 </div>
 <div class="relative flex justify-center py-2 h-64">
 <div id="platform-donut-chart" class="w-full"></div>
 </div>
 </div>

 <div v-show="platformViewType === 'number'" class="space-y-3 py-2">
 <div v-for="p in platformData" :key="p.type" class="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600">
 <feather :type="p.type === 'Web' ? 'monitor' : p.type === 'Android' ? 'smartphone' : 'tablet'" size="14"></feather>
 </div>
 <span class="text-[11px] font-bold text-blue-600 uppercase tracking-tight">{{ p.type }} Users</span>
 </div>
 <span class="text-base font-black text-blue-950">{{ p.value }}</span>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Revenue Breakdown -->
 <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
 <div v-for="payment in paymentStats" :key="payment.title" class="glass-card p-3">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 <div class="flex items-center justify-between mb-2">
 <p class="text-[10px] font-black text-black uppercase tracking-wider">{{ payment.title }}</p>
 <feather type="dollar-sign" size="14" class="text-indigo-300"></feather>
 </div>
 <h3 class="text-xl font-bold text-blue-950">₹ {{ payment.value.toLocaleString() }}</h3>
 <div class="mt-2 text-[10px] font-medium" :class="payment.positive ? 'text-emerald-600' : 'text-amber-600'">
 {{ payment.positive ? '+' : '' }}{{ payment.trend }}% from target
 </div>
 </div>
 </div>

 <!-- Revenue Chart Area -->
 <div class="glass-card">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 <div class="px-3 py-3 border-b border-blue-100 flex items-center justify-between">
 <div>
 <h4 class="text-sm font-semibold text-blue-900">Revenue Analytics</h4>
 <p class="text-[10px] text-blue-500 mt-0.5">Performance tracking across all gateways</p>
 </div>
 <div class="flex gap-2">
 <button
 v-for="time in ['1D', '1W', '1M']"
 :key="time"
 @click="revenueTimeframe = time"
 :class="[ 'px-2.5 py-1.5 rounded text-[10px] font-bold border transition-all', revenueTimeframe === time ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200' : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100' ]"
 >{{ time }}</button>
 </div>
 </div>
 <div class="p-3">
 <div id="revenue-chart" class="w-full h-64"></div>
 </div>
 </div>

 <!-- Transactions Table -->
 <div class="glass-card overflow-hidden">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 <div class="px-3 py-3 border-b border-blue-100 flex items-center justify-between">
 <div>
 <h4 class="text-sm font-semibold text-blue-900">Recent Transactions</h4>
 <p class="text-[10px] text-blue-500 mt-0.5">Latest 5 financial activities</p>
 </div>
 <button class="text-xs font-bold text-blue-600 hover:text-blue-700">View All Transactions</button>
 </div>
 <div class="overflow-x-auto">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/80 backdrop-blur-sm">
 <th class="px-3 py-3 text-[10px] font-black text-blue-500 uppercase tracking-widest border-b border-blue-100/50">User Details</th>
 <th class="px-3 py-3 text-[10px] font-black text-blue-500 uppercase tracking-widest border-b border-blue-100/50">Course / Test</th>
 <th class="px-3 py-3 text-[10px] font-black text-blue-500 uppercase tracking-widest border-b border-blue-100/50">Method</th>
 <th class="px-3 py-3 text-[10px] font-black text-blue-500 uppercase tracking-widest border-b border-blue-100/50">Amount</th>
 <th class="px-3 py-3 text-[10px] font-black text-blue-500 uppercase tracking-widest border-b border-blue-100/50 text-right">Status</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100">
 <tr v-for="t in transactions" :key="t.key" class="hover:bg-blue-50/50 transition-colors group">
 <td class="px-3 py-3">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-white transition-colors">
 <feather type="user" size="14"></feather>
 </div>
 <div>
 <p class="text-xs font-bold text-blue-900">{{ t.user }}</p>
 <p class="text-[9px] text-blue-400 mt-0.5">{{ t.date }}</p>
 </div>
 </div>
 </td>
 <td class="px-3 py-3 text-xs font-medium text-blue-600">{{ t.product }}</td>
 <td class="px-3 py-3">
 <span class="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-[9px] font-bold text-blue-600 border border-blue-200">
 {{ t.method }}
 </span>
 </td>
 <td class="px-3 py-3 text-xs font-bold text-blue-900">{{ t.amount }}</td>
 <td class="px-3 py-3 text-right">
 <span :class="[ 'inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tight shadow-sm', t.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : t.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-blue-50 text-blue-700 border border-blue-100' ]">
 <span :class="['w-1 h-1 rounded-full mr-1.5', t.status === 'Success' ? 'bg-emerald-400' : t.status === 'Pending' ? 'bg-amber-400' : 'bg-indigo-400']"></span>
 {{ t.status }}
 </span>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <!-- Footer Stats -->
 <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
 <div class="glass-card p-3">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 <div class="flex items-center justify-between mb-3">
 <h4 class="text-sm font-semibold text-blue-900">Video Watch Overview</h4>
 <div class="p-1.5 bg-blue-50 text-blue-600 rounded-md">
 <feather type="video" size="16"></feather>
 </div>
 </div>
 <div class="space-y-3">
 <div v-for="v in videoStats" :key="v.label" class="space-y-1.5">
 <div class="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
 <span class="text-blue-500">{{ v.label }}</span>
 <span class="text-blue-950">{{ v.time }}</span>
 </div>
 <div class="h-2 w-full bg-blue-100 rounded-full overflow-hidden shadow-inner">
 <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000" :style="{ width: v.progress + '%' }"></div>
 </div>
 </div>
 </div>
 </div>

 <div class="glass-card p-3">
 <div class="glass-glow"></div>
 <div class="glass-card-edge"></div>
 <div class="flex items-center justify-between mb-3">
 <h4 class="text-sm font-semibold text-blue-900">Top Performing Course</h4>
 <feather type="star" size="16" class="text-amber-400 fill-amber-400"></feather>
 </div>
 <div v-for="c in topCourses" :key="c.name" class="flex items-center justify-between p-3 border border-blue-100 bg-blue-50/50 rounded-xl">
 <div class="flex items-center gap-3">
 <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-blue-600 border border-blue-100">
 <feather type="book-open" size="20"></feather>
 </div>
 <div>
 <p class="text-xs font-bold text-blue-900">{{ c.name }}</p>
 <p class="text-[10px] text-blue-500 mt-0.5">{{ c.type }} • {{ c.trans }} Transactions</p>
 </div>
 </div>
 <div class="text-right">
 <p class="text-sm font-black text-blue-950 leading-none">₹ {{ c.revenue }}</p>
 <p class="text-[9px] text-emerald-600 font-bold mt-1">PROFITABLE</p>
 </div>
 </div>
 </div>
 </div>
 </template>

 <template v-else-if="currentView === 'add_course'">
 <add-course 
 @back="currentView = 'list_course'" 
 @add-teacher="currentView = 'create_teacher'"
 @add-category="currentView = 'create_category'"
 @add-academic-year="currentView = 'create_academic_year'"
 @add-class="currentView = 'create_class'"
 @navigate="currentView = $event"
 ></add-course>
 </template>

 <template v-else-if="currentView === 'list_course'">
 <list-course @add-course="handleSubmenuClick('Courses', 'Add Course')" @view-course="handleViewCourse" @edit-course="handleEditCourse" @analytics="handleAnalyticsCourse" @navigate="currentView = $event"></list-course>
 </template>

 <template v-else-if="currentView === 'course_analytics'">
 <course-analytics @navigate="currentView = $event"></course-analytics>
 </template>

 <template v-else-if="currentView === 'list_lessons'">
 <list-lesson @add-lesson="currentView = 'create_lesson'" @navigate="currentView = $event"></list-lesson>
 </template>

 <template v-else-if="currentView === 'create_lesson'">
 <create-lesson @back="currentView = 'list_lessons'" @navigate="currentView = $event"></create-lesson>
 </template>

 <template v-else-if="currentView === 'assignments_management'">
 <assignment-management @add-assignment="currentView = 'add_assignment'" @view-assignment="handleViewAssignment" @edit-assignment="handleEditAssignment" @navigate="currentView = $event"></assignment-management>
 </template>

 <template v-else-if="currentView === 'view_assignment'">
 <view-assignment :assignment="selectedAssignment" @back="handleBackToAssignments" @edit="handleEditAssignment" @navigate="currentView = $event"></view-assignment>
 </template>

 <template v-else-if="currentView === 'add_assignment' || currentView === 'edit_assignment'">
 <create-assignment 
 :assignment="selectedAssignment" 
 @back="handleBackToAssignments" 
 @navigate="currentView = $event"
 ></create-assignment>
 </template>

 <template v-else-if="currentView === 'list_study_material'">
 <study-material @add-material="currentView = 'add_study_material'" @view-material="handleViewMaterial" @edit-material="handleEditMaterial" @navigate="currentView = $event"></study-material>
 </template>

 <template v-else-if="currentView === 'view_study_material'">
 <view-study-material :material="selectedMaterial" @back="handleBackToMaterials" @edit="handleEditMaterial" @navigate="currentView = $event"></view-study-material>
 </template>

 <template v-else-if="currentView === 'add_study_material' || currentView === 'edit_study_material'">
 <create-study-material 
 :material="selectedMaterial" 
 @back="handleBackToMaterials" 
 @navigate="currentView = $event"
 ></create-study-material>
 </template>

 <template v-else-if="currentView === 'edit_course'">
 <edit-course 
 :course="selectedCourse" 
 @back="currentView = 'list_course'" 
 @add-teacher="currentView = 'create_teacher'"
 @add-category="currentView = 'create_category'"
 @add-academic-year="currentView = 'create_academic_year'"
 @add-class="currentView = 'create_class'"
 @navigate="currentView = $event"
 ></edit-course>
 </template>

 <template v-else-if="currentView === 'view_course'">
 <view-course :course="selectedCourse" @back="currentView = 'list_course'" @navigate="currentView = $event"></view-course>
 </template>

 <template v-else-if="currentView === 'create_teacher'">
 <create-teacher @back="currentView = 'list_teachers'" @navigate="currentView = $event"></create-teacher>
 </template>

 <template v-else-if="currentView === 'list_teachers'">
 <list-teacher @add-teacher="currentView = 'create_teacher'" @edit-teacher="handleEditTeacher" @navigate="currentView = $event"></list-teacher>
 </template>

 <template v-else-if="currentView === 'edit_teacher'">
 <edit-teacher :teacher="selectedTeacher" @back="currentView = 'list_teachers'" @navigate="currentView = $event"></edit-teacher>
 </template>

 <template v-else-if="currentView === 'list_categories'">
 <list-category @add-category="currentView = 'create_category'" @edit-category="handleEditCategory" @navigate="currentView = $event"></list-category>
 </template>

 <template v-else-if="currentView === 'edit_category'">
 <edit-category :category="selectedCategory" @back="currentView = 'list_categories'" @navigate="currentView = $event"></edit-category>
 </template>

 <template v-else-if="currentView === 'create_category'">
 <create-category @back="currentView = 'list_categories'" @navigate="currentView = $event"></create-category>
 </template>

 <template v-else-if="currentView === 'list_academic_years'">
 <list-academic-year @add-academic-year="currentView = 'create_academic_year'" @edit-academic-year="handleEditAcademicYear" @navigate="currentView = $event"></list-academic-year>
 </template>

 <template v-else-if="currentView === 'edit_academic_year'">
 <edit-academic-year :academicYear="selectedAcademicYear" @back="currentView = 'list_academic_years'" @navigate="currentView = $event"></edit-academic-year>
 </template>

 <template v-else-if="currentView === 'create_academic_year'">
 <create-academic-year @back="currentView = 'list_academic_years'" @navigate="currentView = $event"></create-academic-year>
 </template>

 <template v-else-if="currentView === 'list_classes'">
 <list-class @add-class="currentView = 'create_class'" @edit-class="handleEditClass" @navigate="currentView = $event"></list-class>
 </template>

 <template v-else-if="currentView === 'create_class'">
 <create-class @back="currentView = 'list_classes'" @navigate="currentView = $event"></create-class>
 </template>

 <template v-else-if="currentView === 'edit_class'">
 <edit-class :classData="selectedClass" @back="currentView = 'list_classes'" @navigate="currentView = $event"></edit-class>
 </template>

 <template v-else-if="currentView === 'list_subjects'">
 <list-subject @add-subject="currentView = 'create_subject'" @view-subject="handleViewSubject" @edit-subject="handleEditSubject" @navigate="currentView = $event"></list-subject>
 </template>

 <template v-else-if="currentView === 'create_subject'">
 <create-subject :subject="selectedSubject" @back="handleBackToSubjects" @navigate="currentView = $event"></create-subject>
 </template>

 <template v-else-if="currentView === 'view_subject'">
 <view-subject :subject="selectedSubject" @back="handleBackToSubjects" @edit="handleEditSubject" @navigate="currentView = $event"></view-subject>
 </template>

 <template v-else-if="currentView === 'test_attempts'">
 <test-attempts @navigate="currentView = $event"></test-attempts>
 </template>

 <template v-else-if="currentView === 'list_extend_validity'">
 <list-extend-validity @add="currentView = 'add_extend_validity'" @edit="handleEditExtendValidity" @navigate="currentView = $event"></list-extend-validity>
 </template>

 <template v-else-if="currentView === 'add_extend_validity' || currentView === 'edit_extend_validity'">
 <create-extend-validity :record="selectedValidityRecord" @back="handleBackToExtendValidity" @navigate="currentView = $event"></create-extend-validity>
 </template>

 <template v-else-if="currentView === 'sales_report'">
 <sales-reports @view-report="handleViewReport" @navigate="currentView = $event"></sales-reports>
 </template>

 <template v-else-if="currentView === 'student_report'">
 <student-reports @view-report="handleViewReport" @navigate="currentView = $event"></student-reports>
 </template>

 <template v-else-if="currentView === 'view_report_detail'">
 <div class="p-8 bg-white rounded-3xl shadow-xl shadow-blue-200/50 border border-blue-100 flex flex-col items-center justify-center text-center space-y-4">
 <div class="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner border-4 border-white">
 <feather type="file-text" size="32"></feather>
 </div>
 <h3 class="text-xl font-black text-blue-950 tracking-tight">Detailed Report Analysis</h3>
 <p class="text-xs text-blue-500 font-bold uppercase tracking-widest max-w-sm">Generating deep insights for your selected record. This feature is currently in preview mode.</p>
 <button @click="currentView = lastReportView" class="mt-4 px-6 py-3 rounded-2xl bg-blue-950 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-black transition-all">Back to Reports</button>
 </div>
 </template>

 <template v-else-if="currentView === 'list_pages'">
 <list-pages @add="currentView = 'create_page'" @view="handleViewPage" @edit="handleEditPage" @navigate="currentView = $event"></list-pages>
 </template>

 <template v-else-if="currentView === 'create_page' || currentView === 'edit_page'">
 <create-page :record="selectedPage" @back="handleBackToPages" @navigate="currentView = $event"></create-page>
 </template>

 <template v-else-if="currentView === 'view_page'">
 <view-page :page="selectedPage" @edit="handleEditPage" @back="handleBackToPages" @navigate="currentView = $event"></view-page>
 </template>

 <template v-else-if="currentView === 'list_blogs'">
 <list-blog @add="currentView = 'create_blog'" @view="handleViewBlog" @edit="handleEditBlog" @navigate="currentView = $event"></list-blog>
 </template>

 <template v-else-if="currentView === 'create_blog' || currentView === 'edit_blog'">
 <create-blog :record="selectedBlog" @back="handleBackToBlogs" @navigate="currentView = $event"></create-blog>
 </template>

 <template v-else-if="currentView === 'view_blog'">
 <view-blog :blog="selectedBlog" @edit="handleEditBlog" @back="handleBackToBlogs" @navigate="currentView = $event"></view-blog>
 </template>

 <template v-else-if="currentView === 'menu_manager'">
 <menu-manager @navigate="currentView = $event"></menu-manager>
 </template>

 <template v-else-if="currentView === 'list_sliders'">
 <list-sliders @add="currentView = 'create_slider'" @edit="handleEditSlider" @navigate="currentView = $event"></list-sliders>
 </template>

 <template v-else-if="currentView === 'create_slider' || currentView === 'edit_slider'">
 <create-slide :record="selectedSlider" @back="handleBackToSliders" @navigate="currentView = $event"></create-slide>
 </template>

 <template v-else-if="currentView === 'list_testimonials'">
 <list-testimonials @add="currentView = 'create_testimonial'" @view="handleViewTestimonial" @edit="handleEditTestimonial" @navigate="currentView = $event"></list-testimonials>
 </template>

 <template v-else-if="currentView === 'create_testimonial' || currentView === 'edit_testimonial'">
 <create-testimonial :record="selectedTestimonial" @back="handleBackToTestimonials" @navigate="currentView = $event"></create-testimonial>
 </template>
 <template v-else-if="currentView === 'view_testimonial'">
 <view-testimonial :testimonial="selectedTestimonial" @edit="handleEditTestimonial" @back="handleBackToTestimonials" @navigate="currentView = $event"></view-testimonial>
 </template>

 <template v-else-if="currentView === 'list_forum_categories'">
 <list-forum-categories @add="currentView = 'create_forum_category'" @view="handleViewForumCategory" @edit="handleEditForumCategory" @navigate="currentView = $event"></list-forum-categories>
 </template>

 <template v-else-if="currentView === 'create_forum_category' || currentView === 'edit_forum_category'">
 <create-forum-category :record="selectedForumCategory" @back="handleBackToForumCategories" @navigate="currentView = $event"></create-forum-category>
 </template>

 <template v-else-if="currentView === 'view_forum_category'">
 <view-forum-category :category="selectedForumCategory" @edit="handleEditForumCategory" @back="handleBackToForumCategories" @navigate="currentView = $event"></view-forum-category>
 </template>

 <template v-else-if="currentView === 'list_forum_discussions'">
 <list-forum-discussion @view="handleViewForumDiscussion" @navigate="currentView = $event"></list-forum-discussion>
 </template>

 <template v-else-if="currentView === 'view_forum_discussion'">
 <view-forum-discussion :discussion="selectedForumDiscussion" @back="handleBackToForumDiscussions" @navigate="currentView = $event"></view-forum-discussion>
 </template>

 <template v-else-if="currentView === 'list_faqs'">
 <list-faqs @add="currentView = 'create_faq'" @edit="handleEditFAQ" @navigate="currentView = $event"></list-faqs>
 </template>

 <template v-else-if="currentView === 'create_faq' || currentView === 'edit_faq'">
 <create-faq :record="selectedFAQ" @back="handleBackToFAQs" @navigate="currentView = $event"></create-faq>
 </template>

 <template v-else-if="currentView === 'footer_manager'">
 <footer-manager @navigate="currentView = $event"></footer-manager>
 </template>

 <!-- Access Module -->
 <template v-else-if="currentView === 'user_management'">
 <user-management-list @view="handleViewUser" @history="handleHistory" @view-course="handleUserCourse" @add="currentView = 'create_user'" @edit="handleEditUser" @navigate="currentView = $event"></user-management-list>
 </template>

 <template v-else-if="currentView === 'create_user' || currentView === 'edit_user'">
 <create-user :record="selectedUser" @back="handleBackToUsers" @navigate="currentView = $event"></create-user>
 </template>

 <template v-else-if="currentView === 'view_user'">
 <view-user :user="selectedUser" @edit="handleEditUser" @back="handleBackToUsers" @navigate="currentView = $event"></view-user>
 </template>

 <template v-else-if="currentView === 'user_history'">
 <user-history :user="selectedUser" @back="handleBackToUsers" @unlock="currentView = 'unlock_course'" @navigate="currentView = $event"></user-history>
 </template>

 <template v-else-if="currentView === 'unlock_course'">
 <unlock-course :user="selectedUser" @back="currentView = 'user_management'" @navigate="currentView = $event"></unlock-course>
 </template>

 <template v-else-if="currentView === 'user_courses'">
 <view-user-course :user="selectedUser" @back="handleBackToUsers" @add="currentView = 'unlock_course'" @navigate="currentView = $event"></view-user-course>
 </template>

 <template v-else-if="currentView === 'role_management'">
 <list-roles @add="currentView = 'create_role'" @edit="handleEditRole" @navigate="currentView = $event"></list-roles>
 </template>

 <template v-else-if="currentView === 'create_role'">
 <create-role :role="selectedRole" @back="currentView = 'role_management'" @navigate="currentView = $event"></create-role>
 </template>

 <template v-else-if="currentView === 'list_coupons'">
 <list-coupons @add="currentView = 'create_coupon'" @edit="handleEditCoupon" @view="handleViewCoupon" @navigate="currentView = $event"></list-coupons>
 </template>

 <template v-else-if="currentView === 'create_coupon'">
 <create-coupon @back="currentView = 'list_coupons'" @navigate="currentView = $event"></create-coupon>
 </template>

 <template v-else-if="currentView === 'view_coupon'">
 <view-coupon :coupon="selectedCoupon" @back="currentView = 'list_coupons'" @navigate="currentView = $event"></view-coupon>
 </template>

 <template v-else-if="currentView === 'list_orders'">
 <list-orders @view="handleViewOrder" @navigate="currentView = $event"></list-orders>
 </template>

 <template v-else-if="currentView === 'view_order'">
 <view-order :order="selectedOrder" @back="currentView = 'list_orders'" @navigate="currentView = $event"></view-order>
 </template>

 <template v-else-if="currentView === 'list_leads'">
 <list-leads @navigate="currentView = $event"></list-leads>
 </template>

 <template v-else-if="currentView === 'general_setting'">
 <general-setting @navigate="currentView = $event"></general-setting>
 </template>

 <template v-else-if="currentView === 'zoom_setting'">
 <zoom-setting @navigate="currentView = $event"></zoom-setting>
 </template>

 <template v-else-if="currentView === 'account_setting'">
 <account-setting @navigate="currentView = $event"></account-setting>
 </template>

 <template v-else-if="currentView === 'list_notifications'">
 <list-notifications @navigate="currentView = $event"></list-notifications>
 </template>

 <template v-else-if="currentView === 'create_notification'">
 <create-notification @navigate="currentView = $event"></create-notification>
 </template>

 <template v-else-if="currentView === 'list_notice'">
 <list-notice @navigate="currentView = $event" @edit-notice="handleEditNotice" @view-notice="handleViewNotice"></list-notice>
 </template>
 <template v-else-if="currentView === 'create_notice'">
 <create-notice :notice="selectedNotice" @navigate="currentView = $event"></create-notice>
 </template>
 <template v-else-if="currentView === 'payment_requests'">
 <payment-requests @navigate="currentView = $event"></payment-requests>
 </template>
 </div>
 </main>
 </div>
 </div>
</template>

<script>
import { Pie, Area, Column } from '@antv/g2plot';
import feather from 'feather-icons';
import AddCourse from './views/courses/AddCourse/AddCourse.vue';
import ListCourse from './views/courses/ListCourse/ListCourse.vue';
import ViewCourse from './views/courses/ViewCourse/ViewCourse.vue';
import CreateTeacher from './views/teachers/CreateTeacher/CreateTeacher.vue';
import ListTeacher from './views/teachers/ListTeacher/ListTeacher.vue';
import EditTeacher from './views/teachers/EditTeacher/EditTeacher.vue';
import CreateCategory from './views/courses/CreateCategory/CreateCategory.vue';
import ListCategory from './views/courses/ListCategory/ListCategory.vue';
import EditCategory from './views/courses/EditCategory/EditCategory.vue';
import CreateAcademicYear from './views/courses/CreateAcademicYear/CreateAcademicYear.vue';
import ListAcademicYear from './views/courses/ListAcademicYear/ListAcademicYear.vue';
import EditAcademicYear from './views/courses/EditAcademicYear/EditAcademicYear.vue';
import CreateClass from './views/courses/CreateClass/CreateClass.vue';
import ListClass from './views/courses/ListClass/ListClass.vue';
import EditClass from './views/courses/EditClass/EditClass.vue';
import EditCourse from './views/courses/EditCourse/EditCourse.vue';
import CourseAnalytics from './views/courses/CourseAnalytics/CourseAnalytics.vue';
import ListLesson from './views/courses/ListLesson/ListLesson.vue';
import CreateLesson from './views/courses/CreateLesson/CreateLesson.vue';
import AssignmentManagement from './views/courses/AssignmentManagement/AssignmentManagement.vue';
import CreateAssignment from './views/courses/AssignmentManagement/CreateAssignment.vue';
import ViewAssignment from './views/courses/AssignmentManagement/ViewAssignment.vue';
import StudyMaterial from './views/courses/StudyMaterial/StudyMaterial.vue';
import CreateStudyMaterial from './views/courses/StudyMaterial/CreateStudyMaterial.vue';
import ViewStudyMaterial from './views/courses/StudyMaterial/ViewStudyMaterial.vue';
import ListSubject from './views/courses/ListSubject/ListSubject.vue';
import CreateSubject from './views/courses/ListSubject/CreateSubject.vue';
import ViewSubject from './views/courses/ListSubject/ViewSubject.vue';
import TestAttempts from './views/courses/TestAttempts/TestAttempts.vue';
import ListExtendValidity from './views/courses/ExtendValidity/ListExtendValidity.vue';
import CreateExtendValidity from './views/courses/ExtendValidity/CreateExtendValidity.vue';
import SalesReports from './views/reports/SalesReports.vue';
import StudentReports from './views/reports/StudentReports.vue';
import ListPages from './views/SiteManagement/PagesManager/ListPages.vue';
import CreatePage from './views/SiteManagement/PagesManager/CreatePage.vue';
import ViewPage from './views/SiteManagement/PagesManager/ViewPage.vue';
import ListBlog from './views/SiteManagement/Blog/ListBlog.vue';
import CreateBlog from './views/SiteManagement/Blog/CreateBlog.vue';
import ViewBlog from './views/SiteManagement/Blog/ViewBlog.vue';
import MenuManager from './views/SiteManagement/MenuManager/MenuManager.vue';
import ListSliders from './views/SiteManagement/Sliders/ListSliders.vue';
import CreateSlide from './views/SiteManagement/Sliders/CreateSlide.vue';
import ListTestimonials from './views/SiteManagement/Testimonials/ListTestimonials.vue';
import CreateTestimonial from './views/SiteManagement/Testimonials/CreateTestimonial.vue';
import ViewTestimonial from './views/SiteManagement/Testimonials/ViewTestimonial.vue';
import ListForumCategories from './views/SiteManagement/Forums/ListForumCategories.vue';
import CreateForumCategory from './views/SiteManagement/Forums/CreateForumCategory.vue';
import ViewForumCategory from './views/SiteManagement/Forums/ViewForumCategory.vue';
import ListForumDiscussion from './views/SiteManagement/Forums/ListForumDiscussion.vue';
import ViewForumDiscussion from './views/SiteManagement/Forums/ViewForumDiscussion.vue';
import ListFAQs from './views/SiteManagement/FAQs/ListFAQs.vue';
import CreateFAQ from './views/SiteManagement/FAQs/CreateFAQ.vue';
import FooterManager from './views/SiteManagement/Footer/FooterManager.vue';
import UserManagementList from './views/Access/UserManagement/UserManagementList.vue';
import CreateUser from './views/Access/UserManagement/CreateUser.vue';
import ViewUser from './views/Access/UserManagement/ViewUser.vue';
import UserHistory from './views/Access/UserManagement/UserHistory.vue';
import UnlockCourse from './views/Access/UserManagement/UnlockCourse.vue';
import ViewUserCourse from './views/Access/UserManagement/ViewUserCourse.vue';
import ListRoles from './views/Access/RoleManagement/ListRoles.vue';
import CreateRole from './views/Access/RoleManagement/CreateRole.vue';
import ListCoupons from './views/Marketing/Coupons/ListCoupons.vue';
import CreateCoupon from './views/Marketing/Coupons/CreateCoupon.vue';
import ViewCoupon from './views/Marketing/Coupons/ViewCoupon.vue';
import ListOrders from './views/Marketing/Orders/ListOrders.vue';
import ViewOrder from './views/Marketing/Orders/ViewOrder.vue';
import ListLeads from './views/Marketing/Leads/ListLeads.vue';
import GeneralSetting from './views/Settings/General/GeneralSetting.vue';
import ZoomSetting from './views/Settings/Zoom/ZoomSetting.vue';
import AccountSetting from './views/Settings/Account/AccountSetting.vue';
import ListNotifications from './views/Notifications/ListNotifications.vue';
import CreateNotification from './views/Notifications/CreateNotification.vue';
import ListNotice from './views/NoticeBoard/ListNotice.vue';
import CreateNotice from './views/NoticeBoard/CreateNotice.vue';
import PaymentRequests from './views/PaymentRequests/PaymentRequests.vue';
import LandingPage from './views/Frontend/LandingPage.vue';
import LoginPage from './views/Frontend/LoginPage.vue';

export default {
 name: 'App',
 components: {
 feather: {
 props: ['type', 'size'],
 mounted() {
 feather.replace();
 },
 updated() {
 feather.replace();
 },
 render(h) {
 return h('i', {
 attrs: {
 'data-feather': this.type,
 'width': this.size || 24,
 'height': this.size || 24,
 },
 class: 'inline-block align-middle'
 });
 }
 },
 AddCourse,
 ListCourse,
 ViewCourse,
 CreateTeacher,
 ListTeacher,
 EditTeacher,
 CreateCategory,
 ListCategory,
 EditCategory,
 CreateAcademicYear,
 ListAcademicYear,
 EditAcademicYear,
 CreateClass,
 ListClass,
 EditClass,
 EditCourse,
 CourseAnalytics,
 ListLesson,
 CreateLesson,
 AssignmentManagement,
 CreateAssignment,
 ViewAssignment,
 StudyMaterial,
 CreateStudyMaterial,
 ViewStudyMaterial,
 ListSubject,
 CreateSubject,
 ViewSubject,
 TestAttempts,
 ListExtendValidity,
 CreateExtendValidity,
 SalesReports,
 StudentReports,
 ListPages,
 CreatePage,
 ViewPage,
 ListBlog,
 CreateBlog,
 ViewBlog,
 MenuManager,
 ListSliders,
 CreateSlide,
 ListTestimonials,
 CreateTestimonial,
 ViewTestimonial,
 ListForumCategories,
 CreateForumCategory,
 ViewForumCategory,
 ListForumDiscussion,
 ViewForumDiscussion,
 ListFaqs: ListFAQs,
 CreateFaq: CreateFAQ,
 FooterManager,
 UserManagementList,
 CreateUser,
 ViewUser,
 UserHistory,
 UnlockCourse,
 ViewUserCourse,
 ListRoles,
 CreateRole,
 ListCoupons,
 CreateCoupon,
 ViewCoupon,
 ListOrders,
 ViewOrder,
 ListLeads,
 GeneralSetting,
 ZoomSetting,
 AccountSetting,
 ListNotifications,
 CreateNotification,
 ListNotice,
 CreateNotice,
 PaymentRequests,
 LandingPage,
 LoginPage
 },
 data() {
 return {
 collapsed: false,
 isAuthenticated: false,
 isLoginPage: false,
 viewType: 'graph',
 platformViewType: 'graph',
 currentView: 'dashboard',
 revenueTimeframe: '1W',
 userDropdownOpen: false,
 activeSubmenu: null,
 selectedCourse: null,
 selectedTeacher: null,
 selectedCategory: null,
 selectedAcademicYear: null,
 selectedClass: null,
 selectedAssignment: null,
 selectedMaterial: null,
 selectedSubject: null,
 selectedValidityRecord: null,
 selectedPage: null,
 selectedBlog: null,
 selectedSlider: null,
 selectedTestimonial: null,
 selectedForumCategory: null,
 selectedForumDiscussion: null,
 selectedFAQ: null,
 selectedUser: null,
 selectedNotice: null,
 lastReportView: 'sales_report',
 openSubmenus: [],
 menuItems: [
      { name: 'Dashboard', icon: 'home', active: true },
      { name: 'Test Series', icon: 'layers' },
      {
        name: 'Courses',
        icon: 'book',
        subMenu: ['Add Course', 'List Courses', 'Lessons', 'Assignment', 'Study Material', 'Academic Year', 'Class', 'Categories', 'Subjects', 'Test Attempts', 'Extend Validity']
      },
      {
        name: 'Reports',
        icon: 'bar-chart-2',
        subMenu: ['Sales', 'Students']
      },
      {
        name: 'Site Management',
        icon: 'monitor',
        subMenu: ['Pages Manager', 'Blog', 'Menu Manager', 'Sliders', 'Testimonials', 'Forums Categories', 'Forums Discussion', 'Faqs', 'Footer']
      },
      {
        name: 'Manage Categories',
        icon: 'grid',
        subMenu: ['Categories', 'Test Series', 'Tags']
      },
      {
        name: 'Access',
        icon: 'lock',
        subMenu: ['User Management', 'Role Management']
      },
      {
        name: 'Marketing',
        icon: 'target',
        subMenu: ['Coupons', 'Orders', 'Leads']
      },
      {
        name: 'Settings',
        icon: 'settings',
        subMenu: ['General', 'Zoom Setting', 'Account']
      },
 { name: 'Notifications', icon: 'bell', view: 'list_notifications' },
 { name: 'Notice Board', icon: 'clipboard', view: 'list_notice' },
 { name: 'Payment Requests', icon: 'credit-card', view: 'payment_requests' },
 ],
 userStats: [
 { title: 'Total Users', value: 20, icon: 'users' },
 { title: 'Paid Users', value: 14, icon: 'check-circle' },
 { title: 'Free Users', value: 6, icon: 'user' },
 { title: 'Active Users', value: 20, icon: 'activity' },
 ],
 paymentStats: [
 { title: 'Gateway Revenue', value: 145200, trend: 12.5, positive: true },
 { title: 'Coupon Revenue', value: 32800, trend: 8.2, positive: true },
 { title: 'Manual Unlock', value: 12400, trend: 2.1, positive: false },
 { title: 'Total Revenue', value: 190400, trend: 15.4, positive: true },
 ],
 platformData: [
 { type: 'Web', value: 14 },
 { type: 'Android', value: 6 },
 { type: 'iOS', value: 4 },
 ],
 transactions: [
 { key: '1', user: 'Guest User', product: 'Demo Course Pack', method: 'UPI', amount: '₹ 199', status: 'Success', date: 'Oct 01, 2023' },
 { key: '2', user: 'Ashish Kumar', product: 'Full Test Series', method: 'Card', amount: '₹ 1,299', status: 'Pending', date: 'Oct 12, 2023' },
 ],
 videoStats: [
 { label: 'Live Stream Watch', time: '0:4:18', progress: 45 },
 { label: 'Vod Video Watch', time: '0:0:0', progress: 0 },
 ],
 topCourses: [
 { name: 'Premium Full Pack V2', type: 'VOD Content', trans: 0, revenue: 0 },
 ]
 };
 },
 methods: {
 updateRevenueChart() {
 const dataMap = {
 '1D': [
 { month: '00:00', value: 2, type: 'Revenue' },
 { month: '04:00', value: 5, type: 'Revenue' },
 { month: '08:00', value: 12, type: 'Revenue' },
 { month: '12:00', value: 8, type: 'Revenue' },
 { month: '16:00', value: 15, type: 'Revenue' },
 { month: '20:00', value: 25, type: 'Revenue' },
 { month: '23:59', value: 18, type: 'Revenue' },
 ],
 '1W': [
 { month: 'Mon', value: 5, type: 'Revenue' },
 { month: 'Tue', value: 12, type: 'Revenue' },
 { month: 'Wed', value: 8, type: 'Revenue' },
 { month: 'Thu', value: 15, type: 'Revenue' },
 { month: 'Fri', value: 35, type: 'Revenue' },
 { month: 'Sat', value: 25, type: 'Revenue' },
 { month: 'Sun', value: 45, type: 'Revenue' },
 ],
 '1M': [
 { month: 'Week 1', value: 20, type: 'Revenue' },
 { month: 'Week 2', value: 45, type: 'Revenue' },
 { month: 'Week 3', value: 30, type: 'Revenue' },
 { month: 'Week 4', value: 65, type: 'Revenue' },
 ]
 };
 if (this.currentView === 'dashboard') {
 this.revenueChart.changeData(dataMap[this.revenueTimeframe]);
 }
 },
 handleAuthSuccess() {
 this.isAuthenticated = true;
 this.isLoginPage = false;
 this.currentView = 'dashboard';
 this.$nextTick(() => this.initCharts());
 },
 handleSubmenuClick(menu, sub) {
 if (menu === 'Dashboard') {
 this.currentView = 'dashboard';
 this.activeSubmenu = null;
 this.menuItems.forEach((item) => (item.active = item.name === 'Dashboard'));
 } else if (menu === 'Test Series') {
   this.$router.push('/test-series');
   this.menuItems.forEach((item) => (item.active = item.name === 'Test Series'));
 } else if (menu === 'Teachers') {
 this.activeSubmenu = sub;
 if (sub === 'Add Teacher') this.currentView = 'create_teacher';
 else if (sub === 'List Teachers') this.currentView = 'list_teachers';
 this.menuItems.forEach((item) => (item.active = item.name === 'Teachers'));
 } else if (menu === 'Courses') {
 this.activeSubmenu = sub;
 if (sub === 'Categories') this.currentView = 'list_categories';
 else if (sub === 'Academic Year') this.currentView = 'list_academic_years';
 else if (sub === 'Class') this.currentView = 'list_classes';
 else if (sub === 'Add Course') this.currentView = 'add_course';
 else if (sub === 'List Courses') this.currentView = 'list_course';
 else if (sub === 'Lessons') this.currentView = 'list_lessons';
 else if (sub === 'Assignment') this.currentView = 'assignments_management';
 else if (sub === 'Study Material') this.currentView = 'list_study_material';
 else if (sub === 'Subjects') this.currentView = 'list_subjects';
 else if (sub === 'Test Attempts') this.currentView = 'test_attempts';
 else if (sub === 'Extend Validity') this.currentView = 'list_extend_validity';
 this.menuItems.forEach((item) => (item.active = item.name === 'Courses'));
 } else if (menu === 'Reports') {
 this.activeSubmenu = sub;
 if (sub === 'Sales') {
 this.currentView = 'sales_report';
 this.lastReportView = 'sales_report';
 }
 else if (sub === 'Students') {
 this.currentView = 'student_report';
 this.lastReportView = 'student_report';
 }
 this.menuItems.forEach((item) => (item.active = item.name === 'Reports'));
 } else if (menu === 'Site Management') {
 this.activeSubmenu = sub;
 if (sub === 'Pages Manager') this.currentView = 'list_pages';
 else if (sub === 'Blog') this.currentView = 'list_blogs';
 else if (sub === 'Menu Manager') this.currentView = 'menu_manager';
 else if (sub === 'Sliders') this.currentView = 'list_sliders';
 else if (sub === 'Testimonials') this.currentView = 'list_testimonials';
 else if (sub === 'Forums Categories') this.currentView = 'list_forum_categories';
 else if (sub === 'Forums Discussion') this.currentView = 'list_forum_discussions';
 else if (sub === 'Faqs') this.currentView = 'list_faqs';
 else if (sub === 'Footer') this.currentView = 'footer_manager';
 this.menuItems.forEach((item) => (item.active = item.name === 'Site Management'));
 } else if (menu === 'Manage Categories') {
   if (sub === 'Test Series') this.$router.push('/test-series');
   else if (sub === 'Categories') this.currentView = 'list_categories';
   this.menuItems.forEach((item) => (item.active = item.name === 'Manage Categories'));
 } else if (menu === 'Access') {
 this.activeSubmenu = sub;
 if (sub === 'User Management') this.currentView = 'user_management';
 else if (sub === 'Role Management') this.currentView = 'role_management';
 else if (sub === 'Teachers') this.currentView = 'list_teachers';
 this.menuItems.forEach((item) => (item.active = item.name === 'Access'));
 } else if (menu === 'Marketing') {
 this.activeSubmenu = sub;
 if (sub === 'Coupons') this.currentView = 'list_coupons';
 else if (sub === 'Orders') this.currentView = 'list_orders';
 else if (sub === 'Leads') this.currentView = 'list_leads';
 this.menuItems.forEach((item) => (item.active = item.name === 'Marketing'));
 } else if (menu === 'Settings') {
 this.activeSubmenu = sub;
 if (sub === 'General') this.currentView = 'general_setting';
 else if (sub === 'Zoom Setting') this.currentView = 'zoom_setting';
 else if (sub === 'Account') this.currentView = 'account_setting';
 this.menuItems.forEach((item) => (item.active = item.name === 'Settings'));
 } else {
 // Handle generic menu items with a 'view' property
 const menuItem = this.menuItems.find(i => i.name === menu);
 if (menuItem && menuItem.view) {
 this.currentView = menuItem.view;
 this.activeSubmenu = null;
 this.menuItems.forEach((item) => (item.active = item.name === menu));
 }
 }
 },
 handleEditPage(page) {
 this.selectedPage = page;
 this.currentView = 'edit_page';
 },
 handleViewPage(page) {
 this.selectedPage = page;
 this.currentView = 'view_page';
 },
 handleBackToPages() {
 this.selectedPage = null;
 this.currentView = 'list_pages';
 },
 handleEditBlog(blog) {
 this.selectedBlog = blog;
 this.currentView = 'edit_blog';
 },
 handleViewBlog(blog) {
 this.selectedBlog = blog;
 this.currentView = 'view_blog';
 },
 handleBackToBlogs() {
 this.selectedBlog = null;
 this.currentView = 'list_blogs';
 },
 handleEditNotice(notice) {
 this.selectedNotice = notice;
 this.currentView = 'create_notice';
 },
 handleViewNotice(notice) {
 // Just showing it in the edit form for now or we could create a view component
 this.selectedNotice = notice;
 this.currentView = 'create_notice';
 },
 handleEditSlider(slider) {
 this.selectedSlider = slider;
 this.currentView = 'edit_slider';
 },
 handleBackToSliders() {
 this.selectedSlider = null;
 this.currentView = 'list_sliders';
 },
 handleEditTestimonial(testimonial) {
 this.selectedTestimonial = testimonial;
 this.currentView = 'edit_testimonial';
 },
 handleViewTestimonial(testimonial) {
 this.selectedTestimonial = testimonial;
 this.currentView = 'view_testimonial';
 },
 handleBackToTestimonials() {
 this.selectedTestimonial = null;
 this.currentView = 'list_testimonials';
 },
 handleEditForumCategory(category) {
 this.selectedForumCategory = category;
 this.currentView = 'edit_forum_category';
 },
 handleViewForumCategory(category) {
 this.selectedForumCategory = category;
 this.currentView = 'view_forum_category';
 },
 handleBackToForumCategories() {
 this.selectedForumCategory = null;
 this.currentView = 'list_forum_categories';
 },
 handleViewForumDiscussion(discussion) {
 this.selectedForumDiscussion = discussion;
 this.currentView = 'view_forum_discussion';
 },
 handleBackToForumDiscussions() {
 this.selectedForumDiscussion = null;
 this.currentView = 'list_forum_discussions';
 },
 handleEditFAQ(faq) {
 this.selectedFAQ = faq;
 this.currentView = 'edit_faq';
 },
 handleBackToFAQs() {
 this.selectedFAQ = null;
 this.currentView = 'list_faqs';
 },
 handleEditUser(user) {
 this.selectedUser = user;
 this.currentView = 'edit_user';
 },
 handleViewUser(user) {
 this.selectedUser = user;
 this.currentView = 'view_user';
 },
 handleHistory(user) {
 this.selectedUser = user;
 this.currentView = 'user_history';
 },
 handleUserCourse(user) {
 this.selectedUser = user;
 this.currentView = 'user_courses';
 },
 handleBackToUsers() {
 this.selectedUser = null;
 this.currentView = 'user_management';
 },
 handleEditRole(role) {
 this.selectedRole = role;
 this.currentView = 'create_role';
 },
 handleEditCoupon(coupon) {
 this.selectedCoupon = coupon;
 this.currentView = 'create_coupon';
 },
 handleViewCoupon(coupon) {
 this.selectedCoupon = coupon;
 this.currentView = 'view_coupon';
 },
 handleViewOrder(order) {
 this.selectedOrder = order;
 this.currentView = 'view_order';
 },
 handleViewReport(report) {
 this.currentView = 'view_report_detail';
 },
 handleViewCourse(course) {
 this.selectedCourse = course;
 this.currentView = 'view_course';
 },
 handleEditTeacher(teacher) {
 this.selectedTeacher = teacher;
 this.currentView = 'edit_teacher';
 },
 handleEditCategory(category) {
 this.selectedCategory = category;
 this.currentView = 'edit_category';
 },
 handleEditAcademicYear(year) {
 this.selectedAcademicYear = year;
 this.currentView = 'edit_academic_year';
 },
 handleEditCourse(course) {
 this.selectedCourse = course;
 this.currentView = 'edit_course';
 },
 handleAnalyticsCourse(course) {
 this.selectedCourse = course;
 this.currentView = 'course_analytics';
 },
 handleEditClass(cls) {
 this.selectedClass = cls;
 this.currentView = 'edit_class';
 },
 handleBackToAssignments() {
 this.selectedAssignment = null;
 this.currentView = 'assignments_management';
 },
 handleViewAssignment(assignment) {
 this.selectedAssignment = assignment;
 this.currentView = 'view_assignment';
 },
 handleEditMaterial(material) {
 this.selectedMaterial = material;
 this.currentView = 'edit_study_material';
 },
 handleViewMaterial(material) {
 this.selectedMaterial = material;
 this.currentView = 'view_study_material';
 },
 handleBackToMaterials() {
 this.selectedMaterial = null;
 this.currentView = 'list_study_material';
 },
 handleEditExtendValidity(record) {
 this.selectedValidityRecord = record;
 this.currentView = 'edit_extend_validity';
 },
 handleBackToExtendValidity() {
 this.selectedValidityRecord = null;
 this.currentView = 'list_extend_validity';
 },
 handleEditSubject(subject) {
 this.selectedSubject = subject;
 this.currentView = 'create_subject';
 },
 handleViewSubject(subject) {
 this.selectedSubject = subject;
 this.currentView = 'view_subject';
 },
 handleBackToSubjects() {
 this.selectedSubject = null;
 this.currentView = 'list_subjects';
 },
 toggleSubmenu(name) {
 if (this.openSubmenus.includes(name)) {
 this.openSubmenus = this.openSubmenus.filter(i => i !== name);
 } else {
 this.openSubmenus.push(name);
 }
 },
 initCharts() {
 if (this.currentView !== 'dashboard' || !this.isAuthenticated) return;

 this.$nextTick(() => {
 const userStatsEl = document.getElementById('user-stats-chart');
 const platformEl = document.getElementById('platform-donut-chart');

 if (userStatsEl) {
 if (this.userDetailsChart) this.userDetailsChart.destroy();
 const userChartData = [
 { type: 'Total User', value: this.userStats[0].value },
 { type: 'Paid User', value: this.userStats[1].value },
 { type: 'Free User', value: this.userStats[2].value },
 ];

 const userDetailsChart = new Column('user-stats-chart', {
 data: userChartData,
 xField: 'type',
 yField: 'value',
 seriesField: 'type',
 columnWidthRatio: 0.6,
 radius: [4, 4, 0, 0],
 color: ['#1e40af', '#3b82f6', '#94a3b8'],
 legend: false,
 label: {
 position: 'top',
 style: { fill: '#64748b', opacity: 0.6, fontSize: 10, fontWeight: 400, fontFamily: 'Inter' },
 },
 xAxis: {
 label: { style: { fill: '#94a3b8', fontSize: 10, fontFamily: 'Inter' } },
 line: null,
 tickLine: null,
 },
 yAxis: false,
 tooltip: {
 domStyles: {
 'g2-tooltip': {
 boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
 borderRadius: '8px',
 padding: '8px 12px',
 border: '1px solid #e2e8f0',
 backgroundColor: '#ffffff',
 },
 },
 showTitle: false,
 showMarkers: false,
 },
 });
 userDetailsChart.render();
 this.userDetailsChart = userDetailsChart;
 }

 if (platformEl) {
 if (this.platformChartInstance) this.platformChartInstance.destroy();
 const platformChart = new Pie('platform-donut-chart', {
 appendPadding: 10,
 data: this.platformData,
 angleField: 'value',
 colorField: 'type',
 radius: 1,
 innerRadius: 0.8,
 color: ['#1e40af', '#f59e0b', '#6366f1'],
 label: false,
 legend: false,
 interactions: [{ type: 'element-active' }],
 tooltip: {
 domStyles: {
 'g2-tooltip': {
 boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
 borderRadius: '8px',
 padding: '8px 12px',
 border: '1px solid #e2e8f0',
 backgroundColor: '#ffffff',
 },
 },
 showTitle: false,
 },
 statistic: {
 title: false,
 content: {
 style: { fontSize: '28px', color: '#1e293b', fontWeight: '800', fontFamily: 'Inter' },
 formatter: () => this.platformData.reduce((acc, curr) => acc + curr.value, 0).toString(),
 },
 },
 });
 platformChart.render();
 this.platformChartInstance = platformChart;
 }

 const revenueEl = document.getElementById('revenue-chart');
 if (revenueEl) {
 if (this.revenueChart) this.revenueChart.destroy();
 const revenueData = [
 { month: 'Mon', value: 5, type: 'Revenue' },
 { month: 'Tue', value: 12, type: 'Revenue' },
 { month: 'Wed', value: 8, type: 'Revenue' },
 { month: 'Thu', value: 15, type: 'Revenue' },
 { month: 'Fri', value: 35, type: 'Revenue' },
 { month: 'Sat', value: 25, type: 'Revenue' },
 { month: 'Sun', value: 45, type: 'Revenue' },
 ];
 const revenueChart = new Area('revenue-chart', {
 data: revenueData,
 xField: 'month',
 yField: 'value',
 smooth: true,
 areaStyle: { fill: 'l(270) 0:#ffffff 1:#1e40af', fillOpacity: 0.15 },
 line: { color: '#1e40af', size: 3 },
 point: {
 size: 3,
 shape: 'circle',
 style: { fill: '#ffffff', stroke: '#3b82f6', lineWidth: 2 },
 },
 xAxis: {
 range: [0, 1],
 label: { style: { fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter' } },
 line: null,
 tickLine: null,
 },
 yAxis: {
 label: { style: { fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter' } },
 grid: { line: { style: { stroke: '#f0f9ff', lineDash: [4, 4] } } },
 },
 });
 revenueChart.render();
 this.revenueChart = revenueChart;
 }
 });
 },
 },
 computed: {
 currentViewTitle() {
 const titles = {
 dashboard: 'Dashboard Overview',
 add_course: 'Add New Course',
 edit_course: 'Edit Course',
 course_analytics: 'Course Analytics',
 view_course: 'View Course Details',
 list_course: 'List Courses',
 list_lessons: 'Lessons Management',
 create_lesson: 'Create Lesson',
 assignments_management: 'Assignments',
 add_assignment: 'Create Assignment',
 edit_assignment: 'Edit Assignment',
 list_study_material: 'Study Material',
 add_study_material: 'Create Study Material',
 edit_study_material: 'Edit Study Material',
 create_teacher: 'Create Teacher',
 edit_teacher: 'Edit Teacher',
 list_teachers: 'Teachers List',
 list_categories: 'Course Categories',
 create_category: 'Create Category',
 edit_category: 'Edit Category',
 list_academic_years: 'Academic Years',
 create_academic_year: 'Create Academic Year',
 edit_academic_year: 'Edit Academic Year',
 list_classes: 'Classes',
 create_class: 'Create Class',
 edit_class: 'Edit Class',
 list_pages: 'Page Management',
 create_page: 'Create Page',
 edit_page: 'Edit Page',
 view_page: 'View Page',
 list_blogs: 'Blog Management',
 create_blog: 'Create Blog',
 edit_blog: 'Edit Blog',
 view_blog: 'View Blog',
 menu_manager: 'Menu Manager',
 list_sliders: 'Slider Management',
 create_slider: 'Create Slider',
 edit_slider: 'Edit Slider',
 list_testimonials: 'Testimonial Management',
 create_testimonial: 'Create Testimonial',
 edit_testimonial: 'Edit Testimonial',
 view_testimonial: 'View Testimonial',
 list_forum_categories: 'Forum Categories',
 create_forum_category: 'Create Forum Subject',
 edit_forum_category: 'Edit Forum Subject',
 view_forum_category: 'View Forum Subject',
 list_forum_discussions: 'Forum Discussions',
 view_forum_discussion: 'View Discussion Detail',
 list_faqs: 'FAQ Management',
 create_faq: 'Create FAQ',
 edit_faq: 'Edit FAQ',
 footer_manager: 'Footer Management',
 user_management: 'User Management',
 create_user: 'Create New User Account',
 edit_user: 'Modify User Account',
 view_user: 'View User Account Details',
 user_history: 'User Access History',
 unlock_course: 'Manual Course Unlock',
 user_courses: 'User Enrolled Courses',
 role_management: 'Security & Role Management',
 create_role: 'Create or Edit Role',
 list_coupons: 'Coupon Management',
 create_coupon: 'Create New Coupon',
 view_coupon: 'View Coupon Details',
 list_orders: 'Sales & Inventory Orders',
 view_order: 'Order Transaction Summary',
 list_leads: 'Marketing Inquiries & Leads',
 general_setting: 'Core Application Configuration',
 zoom_setting: 'Live Meeting Integration',
 account_setting: 'Admin Profile & Security',
 list_notifications: 'System Alerts & Global Announcements',
 create_notification: 'Compose & Schedule New Alert',
 list_notice: 'Official Notice Board',
 create_notice: 'Compose New Notice',
 payment_requests: 'Vendor & Teacher Payout Management'
 };
 return titles[this.currentView] || 'Administration Panel';
 },
 userLegendItems() {
 return [
 { label: 'Total User', color: '#1e40af' },
 { label: 'Paid User', color: '#3b82f6' },
 { label: 'Free User', color: '#94a3b8' },
 ];
 },
 platformLegendItems() {
 return [
 { label: 'Web', color: '#1e40af' },
 { label: 'Android', color: '#f59e0b', },
 { label: 'iOS', color: '#6366f1' },
 ];
 }
 },
 watch: {
 revenueTimeframe() {
 this.updateRevenueChart();
 },
 currentView(newView) {
 if (newView === 'dashboard') {
 this.$nextTick(() => this.initCharts());
 }
 const slug = newView.replace(/_/g, '-');
 const url = newView === 'dashboard' ? '/' : `/${slug}`;
 window.history.pushState({ view: newView }, '', url);
 }
 },
 mounted() {
 this.initCharts();
 if (typeof feather !== 'undefined') feather.replace();
 
 window.onpopstate = (event) => {
 if (event.state && event.state.view) {
 this.currentView = event.state.view;
 if (this.currentView === 'add_course') this.handleSubmenuClick('Courses', 'Add Course');
 else if (this.currentView === 'list_course') this.handleSubmenuClick('Courses', 'List Courses');
 else if (this.currentView === 'dashboard') this.handleSubmenuClick('Dashboard');
 }
 };
 }
};
</script>

<style>
/* Custom Scrollbar */
::-webkit-scrollbar {
 width: 6px;
}
::-webkit-scrollbar-track {
 background: transparent;
}
::-webkit-scrollbar-thumb {
 background: #e2e8f0;
 border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
 background: #cbd5e1;
}

.bg-blob {
 position: absolute;
 width: 500px;
 height: 500px;
 filter: blur(80px);
 opacity: 0.15;
 z-index: 0;
 pointer-events: none;
 animation: blob-float 20s infinite alternate;
}
.bg-blob-1 {
 background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
 top: -100px;
 right: -100px;
}
.bg-blob-2 {
 background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
 bottom: -100px;
 left: -100px;
 animation-delay: -5s;
}

@keyframes blob-float {
 from { transform: translate(0, 0) scale(1); }
 to { transform: translate(50px, 50px) scale(1.1); }
}

.premium-sidebar {
 background: rgba(255, 255, 255, 0.85);
 backdrop-filter: blur(20px);
 border-right: 1px solid rgba(15, 23, 42, 0.08);
}

.sidebar-item {
 color: #475569;
}
.sidebar-item-active {
 background: #ffffff;
 color: #1e40af !important;
 box-shadow: 0 4px 12px rgba(30, 64, 175, 0.08);
 border: 1px solid rgba(30, 64, 175, 0.1);
}
.sidebar-item-active .sidebar-icon {
 color: #1e40af !important;
}

.glass-card {
 background: #ffffff;
 border: 1px solid rgba(15, 23, 42, 0.1);
 box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
 border-radius: 12px;
}
.glass-glow {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 height: 100px;
 background: linear-gradient(180deg, rgba(30, 64, 175, 0.03) 0%, transparent 100%);
 pointer-events: none;
}
.glass-card-edge {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 height: 1px;
 background: linear-gradient(90deg, transparent, rgba(30, 64, 175, 0.1), transparent);
}

.stat-icon-wrapper {
 box-shadow: inset 0 2px 4px rgba(30, 64, 175, 0.05);
}

input:focus, select:focus, textarea:focus {
 border-color: #1e40af !important;
 box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.05);
}
</style>
