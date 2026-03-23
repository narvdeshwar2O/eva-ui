<template>
  <div class="user-management-hub w-full space-y-2 py-1">
    <!-- Header Strategy -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="users" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Global User Base</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Identity Governance &bull; {{ users.length }} Active Identities</p>
        </div>
      </div>

      <button 
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2 group"
      >
        <i data-feather="download" class="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform"></i>
        Export User Dataset
      </button>
    </div>

    <!-- User Ingress Table -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F1F5F9] border-b border-[#E2E8F0]">
              <th v-for="col in headers" :key="col" class="px-3 py-3 text-[10px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
            <!-- Intelligent Filtering -->
            <tr class="bg-white/30 backdrop-blur-sm border-b border-[#F1F5F9]">
               <td v-for="(col, index) in headers" :key="'filter-'+index" class="px-2 py-2">
                  <input 
                    v-if="col !== 'ACTIONS'" 
                    type="text" 
                    :placeholder="'Search ' + col.toLowerCase()" 
                    class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 outline-none focus:border-[#0891B2]/30 transition-all"
                  >
               </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 font-extrabold text-slate-800">
               <td class="px-3 py-4 text-[10px] font-black tracking-tight text-slate-900 uppercase">{{ user.name }}</td>
               <td class="px-3 py-4 text-[10px] font-bold text-slate-500 lowercase">{{ user.username }}</td>
               <td class="px-3 py-4 text-[10px] font-bold text-slate-500 lowercase underline opacity-70">{{ user.email }}</td>
               <td class="px-3 py-4 text-[10px] font-bold text-slate-400 font-mono">{{ user.mobile }}</td>
               <td class="px-3 py-4">
                  <span class="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[8px] font-black uppercase tracking-widest">
                     {{ user.role }}
                  </span>
               </td>
               <td class="px-3 py-4">
                  <div class="flex flex-col">
                     <span class="text-[9px] font-black text-slate-800">{{ user.registerDate }}</span>
                     <span class="text-[8px] font-bold text-slate-400 mt-0.5">{{ user.registerTime }}</span>
                  </div>
               </td>
               <td class="px-3 py-4">
                  <span class="px-2.5 py-1 bg-[#ECFDF5] text-[#059669] rounded-md text-[9px] font-black uppercase tracking-widest">
                     Active
                  </span>
               </td>
               <td class="px-3 py-4">
                  <div class="flex items-center gap-2">
                     <button class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#0891B2] hover:border-[#0891B2]/30 rounded-xl transition-all shadow-sm">
                        <i data-feather="edit-3" class="w-3.5 h-3.5"></i>
                     </button>
                     <button class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 rounded-xl transition-all shadow-sm">
                        <i data-feather="trash-2" class="w-3.5 h-3.5"></i>
                     </button>
                  </div>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'UserList',
  data() {
    return {
      headers: ['NAME', 'USER NAME', 'EMAIL', 'MOBILE', 'ROLE', 'REGISTER', 'STATUS', 'ACTIONS'],
      users: [
        { id: 1, name: 'SUPER ADMIN', username: 'admin', email: 'admin@lms.com', mobile: '9012656035', role: 'admin', registerDate: '25-Jul-2022', registerTime: '11:15:58' },
        { id: 2, name: 'Shashank Chitransh', username: 'shashank.chitransh@evalms.ai', email: 'shashank@jspark.ai', mobile: '6395777952', role: 'student', registerDate: '29-May-2025', registerTime: '00:05:37' },
        { id: 3, name: 'Dummy Teacher', username: 'dummy@teacher.com', email: 'dummy@teacher.com', mobile: '-', role: 'student', registerDate: '28-May-2025', registerTime: '18:42:06' },
        { id: 4, name: 'Siddharth G', username: 'siddharth@gna.live', email: 'siddharth@gna.live', mobile: '9606552946', role: 'student', registerDate: '04-Jul-2025', registerTime: '12:04:08' },
        { id: 5, name: 'Vishwas S S', username: 'gnapnyroute1@gmail.com', email: 'gnapnyroute1@gmail.com', mobile: '9731875624', role: 'student', registerDate: '04-Jul-2025', registerTime: '13:00:14' }
      ]
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
