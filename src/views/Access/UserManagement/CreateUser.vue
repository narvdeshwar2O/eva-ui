<template>
 <div class="space-y-6 pb-20">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
 <div class="space-y-1">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Access</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">User Management</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">{{ record ? 'Edit User' : 'Create User' }}</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">{{ record ? 'Edit User' : 'Create User' }}</h2>
 </div>
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest border border-blue-100 shadow-sm hover:bg-blue-100 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="users" size="14"></feather>
 Back to Users
 </button>
 </div>

 <!-- MAIN FORM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-8 relative z-10 text-left">
 <form @submit.prevent="handleSave" class="space-y-8">
 
 <!-- Basic Info Grid -->
 <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Full Name <span class="text-rose-500">*</span></label>
 <input v-model="formData.name" type="text" placeholder="Enter Full Name" class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm" required />
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">E-mail Address <span class="text-rose-500">*</span></label>
 <input v-model="formData.email" type="email" placeholder="Enter E-mail Address" class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm" required />
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Phone</label>
 <input v-model="formData.phone" type="text" placeholder="Enter Phone Number" class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm" />
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">City</label>
 <input v-model="formData.city" type="text" placeholder="Enter City" class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm" />
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Course Category</label>
 <select v-model="formData.category" class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm cursor-pointer">
 <option value="">Select Your Category</option>
 <option value="Tech e-books">Tech e-books (library)</option>
 <option value="UPSC">UPSC Batches</option>
 </select>
 </div>
 <div></div> <!-- Spacer -->

 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Password <span class="text-rose-500">*</span></label>
 <input v-model="formData.password" type="password" placeholder="••••••••" class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm" :required="!record" />
 </div>
 <div class="space-y-2">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Password Confirmation <span class="text-rose-500">*</span></label>
 <input v-model="formData.passwordConfirm" type="password" placeholder="••••••••" class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm" :required="!record" />
 </div>
 </div>

 <!-- Toggles Section -->
 <div class="space-y-4 pt-6">
 <div v-for="toggle in toggles" :key="toggle.key" class="flex items-center gap-6">
 <div class="w-40">
 <label class="text-[10px] font-black text-blue-900 uppercase tracking-widest">{{ toggle.label }}</label>
 </div>
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="formData[toggle.key]" class="sr-only peer">
 <div class="w-11 h-6 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
 </label>
 <span v-if="toggle.key === 'sendEmail'" class="text-[9px] font-bold text-indigo-400">(if confirmed is off)</span>
 </div>
 </div>

 <!-- ABILITIES SECTION -->
 <div class="pt-10 space-y-6">
 <div class="flex items-center gap-4 border-b border-blue-100 pb-4">
 <feather type="shield" size="18" class="text-blue-600"></feather>
 <h3 class="text-sm font-black text-blue-950 uppercase tracking-widest">Abilities</h3>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
 <!-- Roles Column -->
 <div class="lg:col-span-8 space-y-4">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4 block">Roles</label>
 
 <div v-for="role in roles" :key="role.name" class="p-5 rounded-2xl border border-blue-100 bg-blue-50/50 space-y-4">
 <div class="flex items-center justify-between">
 <div class="flex items-center gap-3">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="radio" :value="role.name" v-model="formData.selectedRole" class="sr-only peer">
 <div class="w-10 h-5 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
 </label>
 <span class="text-[11px] font-black text-blue-950 uppercase tracking-widest">{{ role.name }}</span>
 </div>
 <span class="text-[9px] font-bold text-indigo-400">{{ role.desc }}</span>
 </div>
 <!-- Permissions for this role -->
 <div v-show="formData.selectedRole === role.name" class="flex flex-wrap gap-2 pt-2 border-t border-blue-200/50">
 <div v-for="perm in role.permissions" :key="perm" class="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-blue-100 text-[10px] font-bold text-blue-500 shadow-sm">
 <feather type="check-circle" size="10" class="text-blue-600"></feather>
 {{ perm }}
 </div>
 </div>
 </div>
 </div>

 <!-- Specific Permissions Column -->
 <div class="lg:col-span-4 space-y-4">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4 block">Permissions Overlay</label>
 <div class="p-5 rounded-3xl border border-blue-100 bg-white shadow-sm space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
 <div v-for="p in allPermissions" :key="p" class="flex items-center justify-between py-1 group">
 <span class="text-[10px] font-bold text-blue-600 group-hover:text-blue-600 transition-colors">{{ p }}</span>
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="formData.customPermissions" :value="p" class="sr-only peer">
 <div class="w-8 h-4 bg-blue-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
 </label>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Form Actions -->
 <div class="flex items-center justify-end pt-10 border-t border-blue-100 gap-4">
 <button 
 type="button"
 @click="$emit('back')"
 class="px-6 py-3 rounded-2xl bg-white border border-blue-200 text-blue-600 text-[11px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-sm"
 >
 Cancel
 </button>
 <button 
 type="submit"
 :disabled="loading"
 class="group relative flex items-center gap-3 px-16 py-3 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300 outline-none overflow-hidden font-black text-[11px] uppercase tracking-widest border border-blue-500/20"
 >
 <feather v-if="!loading" :type="record ? 'refresh-cw' : 'save'" size="16"></feather>
 <feather v-else type="loader" size="16" class="animate-spin"></feather>
 {{ loading ? 'Saving...' : (record ? 'Update User' : 'Create User') }}
 </button>
 </div>
 </form>
 </div>
 </div>

 <!-- SUCCESS TOAST -->
 <transition name="fade-slide">
 <div v-if="showSuccess" class="fixed bottom-10 right-10 z-[100]">
 <div class="flex items-center gap-4 bg-emerald-600 text-white px-6 py-3 rounded-3xl shadow-2xl border border-emerald-500/20 backdrop-blur-md">
 <feather type="check-circle" size="22"></feather>
 <div class="text-left font-bold">
 <p class="text-[13px]">User account {{ record ? 'updated' : 'created' }} successfully!</p>
 </div>
 </div>
 </div>
 </transition>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'CreateUser',
 props: {
 record: { type: Object, default: null }
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
 formData: {
 name: '', email: '', phone: '', city: '', category: '',
 password: '', passwordConfirm: '',
 active: true, confirmed: true, sendEmail: true,
 selectedRole: 'Student',
 customPermissions: []
 },
 loading: false,
 showSuccess: false,
 toggles: [
 { label: 'Active', key: 'active' },
 { label: 'Confirmed', key: 'confirmed' },
 { label: 'Send Confirmation E-mail', key: 'sendEmail' }
 ],
 roles: [
 { name: 'Administrator', desc: 'Full system access', permissions: ['All Permissions'] },
 { name: 'Teacher', desc: 'Can manage courses and students', permissions: ['user_management_access', 'course_access', 'course_create', 'course_edit', 'course_view', 'lesson_access', 'test_access', 'assignment_access', 'study_material_access'] },
 { name: 'Student', desc: 'Standard user access', permissions: ['course_view', 'test_create', 'assignment_access'] },
 { name: 'View Backend', desc: 'ReadOnly access to admin dashboard', permissions: ['dashboard_view', 'report_view'] },
 { name: 'User', desc: 'Public portal access', permissions: ['login_access'] }
 ],
 allPermissions: [
 'user_management_access', 'user_management_create', 'user_management_edit', 'user_management_view', 'user_management_delete',
 'permission_access', 'permission_create', 'permission_edit', 'permission_view', 'permission_delete',
 'role_access', 'role_create', 'role_edit', 'role_view', 'role_delete',
 'course_access', 'course_create', 'course_edit', 'course_view', 'course_delete',
 'lesson_access', 'lesson_create', 'lesson_edit', 'lesson_view', 'lesson_delete',
 'test_access', 'test_create', 'test_edit', 'test_view'
 ]
 }
 },
 mounted() {
 if (this.record) {
 this.formData = { ...this.formData, ...this.record };
 }
 },
 methods: {
 handleSave() {
 if (this.formData.password !== this.formData.passwordConfirm) {
 alert('Passwords do not match');
 return;
 }
 this.loading = true;
 setTimeout(() => {
 this.loading = false;
 this.showSuccess = true;
 setTimeout(() => {
 this.showSuccess = false;
 this.$emit('back');
 }, 2000);
 }, 1000);
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s ease; }
.fade-slide-enter { opacity: 0; transform: translateY(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(20px); }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>
