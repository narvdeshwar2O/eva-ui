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
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Role Management</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">{{ role ? 'Edit Role' : 'Create Role' }}</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Role Management</h2>
 <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">{{ role ? 'Edit Role' : 'Create Role' }}</span>
 </div>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest border border-blue-100 shadow-sm hover:bg-blue-100 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="shield" size="14"></feather>
 Back
 </button>
 </div>
 </div>

 <!-- MAIN FORM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-8 relative z-10 text-left">
 <form @submit.prevent="$emit('back')" class="space-y-8">
 <div class="flex items-center gap-6 border-b border-blue-100 pb-8">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest w-24 flex-shrink-0">Name <span class="text-rose-500">*</span></label>
 <input 
 type="text" 
 v-model="formData.name" 
 class="flex-1 h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all shadow-sm"
 required
 />
 </div>

 <div class="space-y-6">
 <h3 class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Associated Permissions</h3>
 
 <div class="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-4">
 <!-- This dynamically renders the long list of permissions vertically in columns like the screenshot -->
 <div v-for="col in splitPermissions" :key="col.id" class="space-y-3 break-inside-avoid">
 <div v-for="p in col.items" :key="p.id" class="flex items-center gap-3 group">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="formData.permissions" :value="p.id" class="sr-only peer">
 <!-- Custom ON/OFF Toggle imitating the screenshot -->
 <div class="w-12 h-6 rounded-full peer-focus:outline-none transition-all flex items-center shadow-inner relative" :class="formData.permissions.includes(p.id) ? 'bg-blue-500 border border-blue-600' : 'bg-blue-100 border border-blue-200'">
 <span class="absolute text-[8px] font-black uppercase text-white left-1.5" v-if="formData.permissions.includes(p.id)">ON</span>
 <span class="absolute text-[8px] font-black uppercase text-indigo-400 right-1" v-if="!formData.permissions.includes(p.id)">OFF</span>
 <div class="after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm" :class="formData.permissions.includes(p.id) ? 'after:translate-x-full after:border-white after:shadow-[0_2px_4px_rgba(0,0,0,0.1)]' : ''"></div>
 </div>
 </label>
 <span class="text-[11px] font-bold text-blue-700 group-hover:text-blue-600 transition-colors leading-tight">{{ p.label }}</span>
 </div>
 </div>
 </div>
 </div>

 <!-- Bottom action -->
 <div class="pt-8 border-t border-blue-100 flex items-center justify-end">
 <button 
 type="submit"
 class="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-black uppercase text-[11px] tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300"
 >
 <feather type="save" size="14"></feather>
 Save Role
 </button>
 </div>
 </form>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'CreateRole',
 props: {
 role: { type: Object, default: null }
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
 name: '',
 permissions: []
 },
 allPermissions: [
 'User_management_access', 'User_management_create', 'User_management_edit', 'User_management_view', 'User_management_delete',
 'Permission_access', 'Permission_create', 'Permission_edit', 'Permission_view', 'Permission_delete',
 'Role_access', 'Role_create', 'Role_edit', 'Role_view', 'Role_delete',
 'User_access', 'User_create', 'User_edit', 'User_view', 'User_delete',
 'Course_access', 'Course_create', 'Course_edit', 'Course_view', 'Course_delete',
 'Lesson_access', 'Lesson_create', 'Lesson_edit', 'Lesson_view', 'Lesson_delete',
 'Question_access', 'Question_create', 'Question_edit', 'Question_view', 'Question_delete',
 'Questions_option_access', 'Questions_option_create', 'Questions_option_edit', 'Questions_option_view', 'Questions_option_delete',
 'Test_access', 'Test_create', 'Test_edit', 'Test_view', 'Test_delete',
 'View_Backend', 
 'Category_access', 'Category_create', 'Category_edit', 'Category_view', 'Category_delete',
 'Blog_access', 'Blog_create', 'Blog_edit', 'Blog_view', 'Blog_delete',
 'Reason_access', 'Reason_create', 'Reason_edit', 'Reason_view', 'Reason_delete',
 'Page_access', 'Page_create', 'Page_edit', 'Page_view', 'Page_delete',
 'Bundle_access', 'Bundle_create', 'Bundle_edit', 'Bundle_view', 'Bundle_delete',
 'Live_lesson_access', 'Live_lesson_create', 'Live_lesson_edit', 'Live_lesson_view', 'Live_lesson_delete',
 'Assignment_access', 'Assignment_add_access', 'Assignment_edit_access', 'Assignment_delete_access', 'Assignment_evaluation_access',
 'Pyqp_access',
 'Stripe_plan_access', 'Stripe_plan_create', 'Stripe_plan_edit', 'Stripe_plan_view', 'Stripe_plan_restore', 'Stripe_plan_delete',
 'Forum_discussion_can_create', 'Forum_discussion_can_delete', 'Forum_discussion_can_approve', 'Forum_discussion_can_reject', 'Forum_discussion_can_read'
 ]
 }
 },
 mounted() {
 if (this.role) {
 this.formData.name = this.role.name;
 // Mock splitting the role permissions if they were selected
 if (this.role.role_permissions === 'All') {
 this.formData.permissions = [...this.allPermissions];
 } else if (this.role.role_permissions !== 'None') {
 this.formData.permissions = this.role.role_permissions.split(' ');
 }
 } else {
 // Mock pre-fills based on image for demonstration
 this.formData.name = "teacher";
 this.formData.permissions = [
 'User_management_access', 'Course_access', 'Course_view', 'Lesson_access', 'Lesson_view',
 'Question_access', 'Questions_option_access', 'Test_access', 'View_Backend',
 'Category_access', 'Category_view', 'Bundle_access', 'Bundle_view',
 'Live_lesson_access', 'Assignment_access', 'Pyqp_access'
 ];
 }
 },
 computed: {
 splitPermissions() {
 const itemsPerCol = Math.ceil(this.allPermissions.length / 3);
 const cols = [
 { id: 1, items: [] },
 { id: 2, items: [] },
 { id: 3, items: [] }
 ];
 
 this.allPermissions.forEach((p, index) => {
 const colIndex = Math.floor(index / itemsPerCol);
 if (cols[colIndex]) {
 cols[colIndex].items.push({ id: p, label: p });
 }
 });
 return cols;
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
