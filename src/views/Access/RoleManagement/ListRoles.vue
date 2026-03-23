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
 <span class="text-blue-950 uppercase tracking-tight">Role Management</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Role Management</h2>
 </div>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('add')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="plus-circle" size="14"></feather>
 ADD
 </button>
 </div>
 </div>

 <!-- MAIN LIST CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-6 relative z-10 text-left space-y-6">
 
 <div class="overflow-x-auto rounded-xl border border-blue-200/60 bg-white">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50/50 border-b border-blue-200/60">
 <th class="px-4 py-3 text-[11px] font-black text-blue-700 w-48 border-r border-blue-100">Role</th>
 <th class="px-4 py-3 text-[11px] font-black text-blue-700 border-r border-blue-100">Permissions</th>
 <th class="px-4 py-3 text-[11px] font-black text-blue-700 w-24 border-r border-blue-100 text-center">Number of Users</th>
 <th class="px-4 py-3 text-[11px] font-black text-blue-700 w-32 border-r border-blue-100 text-center">Actions</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-100">
 <tr v-for="role in roles" :key="role.id" class="hover:bg-blue-50/50 transition-colors">
 <td class="px-4 py-3 text-xs font-black text-blue-950 border-r border-blue-100 align-top pt-5">{{ role.name }}</td>
 <td class="px-4 py-3 text-[10px] font-medium text-blue-600 border-r border-blue-100 align-top leading-relaxed">
 <span v-if="role.role_permissions === 'All'" class="text-blue-500 font-black">All</span>
 <div v-else class="flex flex-wrap gap-1">
 {{ role.role_permissions }}
 </div>
 </td>
 <td class="px-4 py-3 text-xs font-medium text-blue-600 border-r border-blue-100 text-center align-top pt-5">{{ role.user_count }}</td>
 <td class="px-4 py-3 text-center border-r border-blue-100 align-top pt-4">
 <div v-if="role.name === 'Administrator'" class="text-[10px] text-indigo-400 font-bold">N/A</div>
 <div v-else class="flex items-center justify-center gap-2">
 <button @click="$emit('edit', role)" class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm">
 <feather type="edit-3" size="14"></feather>
 </button>
 <button class="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center hover:bg-rose-700 transition-colors shadow-sm">
 <feather type="trash-2" size="14"></feather>
 </button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <div class="flex items-center justify-between pt-2">
 <span class="text-[10px] font-black text-blue-500 uppercase tracking-widest">{{ roles.length }} roles total</span>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'ListRoles',
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
 roles: [
 { id: 1, name: 'Administrator', role_permissions: 'All', user_count: 1 },
 { 
 id: 2, 
 name: 'Teacher', 
 role_permissions: 'User_management_access Course_access Course_create Course_edit Course_view Course_delete Lesson_access Lesson_create Lesson_edit Lesson_view Lesson_delete Question_access Question_create Question_edit Question_view Question_delete Questions_option_access Questions_option_create Questions_option_edit Questions_option_view Questions_option_delete Test_access Test_create Test_edit Test_view Test_delete View Backend Category_access Category_create Category_view Bundle_access Bundle_create Bundle_edit Bundle_view Bundle_delete Live_lesson_access Live_lesson_view Assignment_access Assignment_evaluation_access Pyqp_access Subject_access Subject_add_access Subject_edit_access Subject_view_access Subject_delete_access Report_access Student_report_access Marketing_access Coupons_access Coupons_add_access Coupons_view_access Notice_board_access Add_dn_question_access Study_material_access Study_material_add_access Study_material_edit_access Study_material_view_access Study_material_delete_access', 
 user_count: 1 
 },
 { id: 3, name: 'Student', role_permissions: 'View Backend', user_count: 1 },
 { id: 4, name: 'User', role_permissions: 'None', user_count: 0 },
 { id: 5, name: 'New Teacher', role_permissions: 'Live_lesson_access Live_lesson_view', user_count: 0 }
 ]
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
