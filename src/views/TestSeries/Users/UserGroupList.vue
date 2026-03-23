<template>
  <div class="user-group-hub w-full space-y-2 py-1">
    <!-- Header Architecture -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="folder" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">User Groups</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Architectural Segregation &bull; {{ groups.length }} Segmentations</p>
        </div>
      </div>

      <button 
        @click="initializeNewGroup"
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
      >
        <i data-feather="plus-circle" class="w-3.5 h-3.5 text-white"></i>
        New User Group
      </button>
    </div>

    <!-- Segmentation Matrix -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5 overflow-hidden">
      <div class="overflow-x-auto min-h-[300px]">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F1F5F9] border-b border-[#E2E8F0]">
              <th v-for="col in ['CODE', 'NAME', 'VISIBILITY', 'STATUS', 'ACTIONS']" :key="col" class="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
            <!-- Multisearch Layer -->
            <tr class="bg-white/30 backdrop-blur-sm border-b border-[#F1F5F9]">
              <td class="px-2 py-2"><input type="text" placeholder="Search Code" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 outline-none"></td>
              <td class="px-2 py-2"><input type="text" placeholder="Search Name" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 outline-none"></td>
              <td class="px-2 py-2"><input type="text" placeholder="Search Visibility" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 outline-none"></td>
              <td class="px-2 py-2"><input type="text" placeholder="Search Status" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 outline-none"></td>
              <td class="px-2 py-2"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-if="groups.length === 0">
               <td colspan="5" class="py-24 text-center">
                  <div class="flex flex-col items-center gap-4">
                     <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 opacity-40">
                        <i data-feather="users" class="w-8 h-8 text-slate-300"></i>
                     </div>
                     <p class="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">No Records Found</p>
                     <button 
                       @click="initializeNewGroup"
                       class="px-8 py-2 bg-[#59B5D3]/20 text-[#0891B2] border border-[#0891B2]/20 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-[#0891B2] hover:text-white transition-all shadow-sm"
                     >
                       New User Group
                     </button>
                  </div>
               </td>
            </tr>
            <!-- Rendering logic for actual groups would go here -->
          </tbody>
        </table>
      </div>
    </div>

    <!-- Group Blueprinting Modal -->
    <transition name="pop">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" @click="closeModal"></div>
          <div class="bg-white w-full max-w-2xl rounded-xl shadow-2xl relative z-10 border border-slate-100 overflow-hidden">
             <!-- Modal Accent -->
             <div class="h-1 w-full bg-gradient-to-r from-[#0891B2] to-[#0D9488]"></div>
             
             <div class="p-6 space-y-6">
                <div class="flex items-center justify-between">
                   <h3 class="text-xl font-black text-slate-800 tracking-tight">{{ isEditing ? 'Edit Professional Group' : 'New User Group Architecture' }}</h3>
                   <button @click="closeModal" class="w-8 h-8 rounded-xl bg-slate-100 text-slate-400 hover:text-rose-500 transition-all flex items-center justify-center">
                      <i data-feather="x" class="w-5 h-5"></i>
                   </button>
                </div>
                
                <div class="space-y-4">
                   <div class="space-y-1.5">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">User Group Name <span class="text-rose-500">*</span></label>
                      <input v-model="currentGroup.name" type="text" placeholder="e.g. Premium Subscribers" class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all">
                   </div>

                   <div class="space-y-1.5">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Internal Description (Institutional Purpose)</label>
                      <div class="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden focus-within:border-[#0891B2] focus-within:bg-white transition-all shadow-inner">
                         <div class="flex items-center gap-2 p-2 border-b border-slate-100 bg-[#F8FAFC]">
                            <i v-for="ico in ['bold', 'italic', 'underline', 'list', 'grid', 'maximize']" :key="ico" :data-feather="ico" class="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-[#0891B2]"></i>
                         </div>
                         <textarea v-model="currentGroup.description" rows="5" placeholder="Enter purpose..." class="w-full bg-transparent p-4 text-xs font-bold text-slate-600 outline-none resize-none leading-relaxed"></textarea>
                      </div>
                   </div>

                   <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <!-- Active Toggle -->
                      <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl p-4 flex items-center justify-between">
                         <div>
                            <h4 class="text-[10px] font-black text-slate-700 uppercase tracking-tight">Active Status</h4>
                            <p class="text-[8px] text-slate-400 font-bold uppercase tracking-widest opacity-60">Shown Everywhere</p>
                         </div>
                         <div 
                          @click="currentGroup.status = currentGroup.status === 'Active' ? 'In-Active' : 'Active'"
                          class="w-12 h-6 rounded-full p-1 cursor-pointer transition-all duration-500 relative shadow-inner"
                          :class="currentGroup.status === 'Active' ? 'bg-[#0891B2]' : 'bg-slate-300'"
                         >
                          <div class="bg-white w-4 h-4 rounded-full shadow-lg transition-all duration-500 transform" :class="currentGroup.status === 'Active' ? 'translate-x-6' : 'translate-x-0'"></div>
                         </div>
                      </div>

                      <!-- Public Toggle -->
                      <div class="bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl p-4 flex items-center justify-between">
                         <div>
                            <h4 class="text-[10px] font-black text-slate-700 uppercase tracking-tight">Public Visibility</h4>
                            <p class="text-[8px] text-slate-400 font-bold uppercase tracking-widest opacity-60">Anyone Can Join</p>
                         </div>
                         <div 
                          @click="currentGroup.isPublic = !currentGroup.isPublic"
                          class="w-12 h-6 rounded-full p-1 cursor-pointer transition-all duration-500 relative shadow-inner"
                          :class="currentGroup.isPublic ? 'bg-[#0EA5E9]' : 'bg-slate-300'"
                         >
                          <div class="bg-white w-4 h-4 rounded-full shadow-lg transition-all duration-500 transform" :class="currentGroup.isPublic ? 'translate-x-6' : 'translate-x-0'"></div>
                         </div>
                      </div>
                   </div>
                </div>

                <div class="flex items-center justify-end gap-6 pt-2 border-t border-slate-50">
                   <button @click="closeModal" class="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">Abort</button>
                   <button 
                     @click="saveGroup"
                     class="px-12 py-3 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-3"
                   >
                     <i data-feather="check-circle" class="w-4 h-4"></i>
                     Create Blueprint
                   </button>
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
  name: 'UserGroupList',
  data() {
    return {
      showModal: false,
      isEditing: false,
      groups: [],
      currentGroup: { id: null, code: '', name: '', description: '', status: 'Active', isPublic: false }
    }
  },
  methods: {
    initializeNewGroup() {
       this.isEditing = false;
       this.currentGroup = { id: null, code: '', name: '', description: '', status: 'Active', isPublic: false };
       this.showModal = true;
    },
    closeModal() {
       this.showModal = false;
    },
    saveGroup() {
       if (!this.currentGroup.name) {
          alert('Institutional Validation Error: Group Name is required.');
          return;
       }
       this.closeModal();
       alert('Governance Matrix Updated: New group blueprint initialized.');
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
.pop-enter-active, .pop-leave-active {
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.pop-enter, .pop-leave-to {
  opacity: 0;
  scale: 0.95;
}
</style>
