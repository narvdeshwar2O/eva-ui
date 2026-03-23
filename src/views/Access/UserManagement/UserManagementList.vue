<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Access</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">User Management</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">User Management</h2>
 <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Active Users</span>
 </div>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('add')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="plus-circle" size="14"></feather>
 Add
 </button>
 <button 
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-950 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-950/10 hover:bg-black transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="download" size="14"></feather>
 Import Users
 </button>
 </div>
 </div>

 <!-- MAIN LIST CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 text-left space-y-6">
 <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-blue-100 pb-6">
 <div class="flex flex-wrap items-center gap-4">
 <div class="flex items-center gap-2 bg-blue-50/80 px-3 py-1.5 rounded-xl border border-blue-200/60">
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-tighter">Show</span>
 <select class="bg-transparent text-[10px] font-black text-blue-950 outline-none cursor-pointer">
 <option>10</option>
 <option>25</option>
 <option>50</option>
 </select>
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-tighter ml-1">Entries</span>
 </div>
 <div class="relative w-64">
 <select class="w-full h-10 px-4 rounded-xl bg-blue-50 border border-blue-200 text-[11px] font-bold text-blue-600 outline-none appearance-none cursor-pointer focus:border-blue-600 transition-all">
 <option value="">Select Role</option>
 <option value="Admin">Administrator</option>
 <option value="Teacher">Teacher</option>
 <option value="Student">Student</option>
 </select>
 <feather type="chevron-down" size="14" class="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 </div>
 
 <div class="flex items-center gap-3">
 <div class="relative">
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Search users..." 
 class="w-64 h-10 pl-10 pr-4 rounded-xl bg-white border border-blue-200 text-xs focus:outline-none focus:border-blue-600 transition-all text-blue-950 font-semibold shadow-sm"
 />
 <feather type="search" size="14" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400"></feather>
 </div>
 <div class="flex items-center gap-1 border border-blue-100 bg-blue-50/50 p-1 rounded-xl">
 <button title="Excel" class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-indigo-400 hover:text-emerald-600"><feather type="file" size="12"></feather></button>
 <button title="PDF" class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-indigo-400 hover:text-rose-600"><feather type="file-text" size="12"></feather></button>
 </div>
 </div>
 </div>

 <div class="overflow-x-auto rounded-3xl border border-blue-100 bg-white/50">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-100">
 <th v-for="head in ['S.N', 'ID', 'Full Name', 'E-mail', 'Mobile No.', 'Course Category', 'City', 'Confirmed', 'Roles', 'Created On', 'Actions']" :key="head" class="px-4 py-3 text-[9px] font-black text-blue-500 uppercase tracking-widest">
 {{ head }}
 </th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100/60">
 <tr v-for="(user, index) in filteredUsers" :key="user.id" class="group hover:bg-blue-50/40 transition-all duration-300">
 <td class="px-4 py-3 text-[11px] font-normal text-indigo-400 tabular-nums">{{ index + 1 }}</td>
 <td class="px-4 py-3 text-[11px] font-bold text-indigo-400">{{ user.id }}</td>
 <td class="px-4 py-3">
 <div class="flex items-center gap-3">
 <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600 uppercase overflow-hidden border border-blue-200 shadow-sm transition-all group-hover:scale-110">
 <img :src="`https://i.pravatar.cc/150?u=${user.id}`" class="w-full h-full object-cover" :alt="user.name" onerror="this.style.display='none'" />
 <span class="absolute">{{ user.name.charAt(0) }}</span>
 </div>
 <span class="text-[11px] font-bold text-blue-700 tracking-tight">{{ user.name }}</span>
 </div>
 </td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-500 lowercase">{{ user.email }}</td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-500 tabular-nums">{{ user.mobile || '—' }}</td>
 <td class="px-4 py-3 text-[10px] font-bold text-indigo-400 uppercase">{{ user.category || 'N/A' }}</td>
 <td class="px-4 py-3 text-[11px] font-medium text-blue-500">{{ user.city || 'N/A' }}</td>
 <td class="px-4 py-3">
 <div v-if="user.confirmed" class="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
 <feather type="check" size="12"></feather>
 </div>
 <div v-else class="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-indigo-400">
 <feather type="minus" size="12"></feather>
 </div>
 </td>
 <td class="px-4 py-3">
 <span class="px-2 py-0.5 rounded-lg bg-blue-100 text-[9px] font-black text-blue-600 uppercase tracking-tighter border border-blue-200/50">{{ user.role }}</span>
 </td>
 <td class="px-4 py-3 text-[10px] font-medium text-indigo-400 tabular-nums">{{ user.createdOn }}</td>
 <td class="px-4 py-3">
 <div class="relative flex justify-center">
 <button 
 @click.stop="toggleActions(user.id)"
 class="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-950 text-white hover:bg-black transition-all shadow-lg shadow-blue-950/10"
 >
 <feather type="more-horizontal" size="14"></feather>
 </button>
 <!-- MULTI-OPTION Action Dropdown -->
 <div v-if="activeActions === user.id" v-click-outside="() => activeActions = null" class="absolute right-0 top-11 w-52 bg-white rounded-2xl shadow-2xl border border-blue-100 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
 <button @click.stop="handleView(user)" class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-colors">
 <feather type="search" size="12"></feather> View
 </button>
 <button @click.stop="handleEdit(user)" class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-colors">
 <feather type="edit-3" size="12"></feather> Edit
 </button>
 <button class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-colors">
 <feather type="refresh-ccw" size="12"></feather> Clear Session
 </button>
 <button class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 transition-colors">
 <feather type="user-check" size="12"></feather> Login As {{ user.name.split(' ')[0] }}
 </button>
 <button class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-colors">
 <feather type="key" size="12"></feather> Change Password
 </button>
 <div class="h-px bg-blue-100 my-1"></div>
 <button class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-rose-600 uppercase tracking-widest hover:bg-rose-50 transition-colors">
 <feather type="user-minus" size="12"></feather> Deactivate
 </button>
 <button class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 transition-colors">
 <feather type="credit-card" size="12"></feather> User Account
 </button>
 <button @click.stop="handleHistory(user)" class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 transition-colors">
 <feather type="clock" size="12"></feather> User History
 </button>
 <button @click.stop="handleViewCourse(user)" class="w-fit px-8 mx-auto sm:mx-0 flex items-center gap-3 py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 transition-colors">
 <feather type="book-open" size="12"></feather> View Course
 </button>
 </div>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <div class="flex items-center justify-between pt-4">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Showing 1 to {{ users.length }} of {{ users.length }} entries</span>
 <div class="flex gap-2">
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-200 text-indigo-400 hover:border-blue-600 hover:text-blue-600 transition-all"><feather type="chevron-left" size="12"></feather></button>
 <button v-for="p in 1" :key="p" class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20 text-[10px] font-black">{{ p }}</button>
 <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-200 text-indigo-400 hover:border-blue-600 hover:text-blue-600 transition-all"><feather type="chevron-right" size="12"></feather></button>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'UserManagementList',
 directives: {
 'click-outside': {
 bind(el, binding, vnode) {
 el.clickOutsideEvent = function(event) {
 if (!(el === event.target || el.contains(event.target))) {
 vnode.context[binding.expression](event);
 }
 };
 document.body.addEventListener('click', el.clickOutsideEvent);
 },
 unbind(el) {
 document.body.removeEventListener('click', el.clickOutsideEvent);
 }
 }
 },
 components: {
 feather: {
 props: ['type', 'size'],
 mounted() { feather.replace(); },
 updated() { feather.replace(); },
 render(h) {
 return h('i', {
 attrs: { 'data-feather': this.type, 'width': this.size || 24, 'height': this.size || 24 },
 class: 'inline-block align-middle'
 });
 }
 }
 },
 data() {
 return {
 searchQuery: '',
 activeActions: null,
 users: [
 { id: 674, name: 'Shashank Srivastava', email: 'shashank.chitransh99@gmail.com', mobile: '6395772952', category: 'Tech e-books (library)', city: 'Greater Noida West', confirmed: true, role: 'Student', createdOn: '2025-05-29 05:35:37' },
 { id: 673, name: 'Dummy Teacher', email: 'dummy@teacher.com', mobile: '', category: 'N/A', city: 'N/A', confirmed: true, role: 'Teacher', createdOn: '2025-05-29 05:28:45' },
 { id: 1, name: 'Admin Istrator', email: 'admin@lms.com', mobile: '9012656035', category: 'N/A', city: 'N/A', confirmed: true, role: 'Administrator', createdOn: '2024-12-30 12:50:51' }
 ]
 }
 },
 computed: {
 filteredUsers() {
 if (!this.searchQuery) return this.users;
 const query = this.searchQuery.toLowerCase();
 return this.users.filter(u => 
 u.name.toLowerCase().includes(query) || 
 u.email.toLowerCase().includes(query) ||
 u.role.toLowerCase().includes(query)
 );
 }
 },
 methods: {
 toggleActions(id) {
 this.activeActions = this.activeActions === id ? null : id;
 },
 handleEdit(user) {
 this.activeActions = null;
 this.$emit('edit', user);
 },
 handleView(user) {
 this.activeActions = null;
 this.$emit('view', user);
 },
 handleHistory(user) {
 this.activeActions = null;
 this.$emit('history', user);
 },
 handleViewCourse(user) {
 this.activeActions = null;
 this.$emit('view-course', user);
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
