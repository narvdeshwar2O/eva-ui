<template>
  <div class="test-hub-list-repository w-full p-3 space-y-3">
    <!-- Premium Header Section -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-xl shadow-xl shadow-[#0891B2]/5 border border-[#CCF1F6] flex items-center justify-center text-[#0891B2]">
          <i data-feather="box" class="w-6 h-6"></i>
        </div>
        <div>
          <h2 class="text-2xl font-black text-slate-800 tracking-tight leading-none">Test Series</h2>
          <p class="text-[9px] text-[#0891B2] font-black uppercase tracking-widest mt-1 opacity-60">Distribution Hub &bull; {{ seriesData.length }} Active Series</p>
        </div>
      </div>

      <button 
        @click="$router.push('/test-series/create')"
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
      >
        <i data-feather="plus-circle" class="w-4 h-4 text-white"></i>
        New Series
      </button>
    </div>

    <!-- Modern Architecture Matrix (Table) -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5 overflow-hidden">
      <div class="overflow-x-auto min-h-[500px]">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F8FAFC] border-b border-slate-200">
              <th v-for="col in repositoryHeaders" :key="col" class="px-4 py-5 text-[11px] font-black text-slate-800 uppercase tracking-widest whitespace-nowrap">
                {{ col }}
              </th>
            </tr>
            <!-- Intelligent Filtering Row -->
            <tr class="bg-white/30 backdrop-blur-sm border-b border-[#F1F5F9]">
              <td v-for="(col, index) in repositoryHeaders" :key="'filter-'+index" class="px-2 py-2">
                <input 
                  v-if="col !== 'ACTIONS' && col !== 'IMAGE' && col !== 'SERIAL NO.'" 
                  type="text" 
                  :placeholder="'Search ' + col" 
                  class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:bg-white focus:border-[#0891B2]/30 transition-all shadow-inner"
                >
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-if="seriesData.length === 0">
               <td :colspan="repositoryHeaders.length" class="py-32 text-center opacity-40 italic text-slate-400 text-[11px] font-black tracking-widest uppercase">No Records Found</td>
            </tr>
            <tr v-for="(item, idx) in seriesData" :key="item.id" class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 font-extrabold text-slate-800">
               <td class="px-3 py-5 text-[10px] text-slate-400 font-black">#{{ idx + 1 }}</td>
               <td class="px-3 py-5">
                  <div class="w-12 h-12 bg-white rounded-xl border border-[#F1F5F9] flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-110 transition-transform">
                     <i data-feather="image" class="w-5 h-5 text-slate-300"></i>
                  </div>
               </td>
               <td class="px-3 py-5 text-[10px] font-black text-[#0891B2]">{{ item.code }}</td>
               <td class="px-3 py-5 text-[11px] font-black text-slate-900 tracking-tight lowercase truncate max-w-[240px] leading-tight">{{ item.title }}</td>
               <td class="px-3 py-5 text-[10px] font-black text-slate-400">₹{{ item.price }}</td>
               <td class="px-3 py-5 text-[10px] font-black text-emerald-600">₹{{ item.offerPrice }}</td>
               <td class="px-3 py-5">
                  <span class="px-2 py-1 bg-blue-50 text-blue-500 rounded-md text-[8px] font-black uppercase tracking-widest border border-blue-100">
                     {{ item.visibility }}
                  </span>
               </td>
               <td class="px-3 py-5">
                  <span class="px-2.5 py-1 bg-[#ECFDF5] text-[#059669] rounded-md text-[8px] font-black uppercase tracking-widest">
                     Active
                  </span>
               </td>
               <td class="px-3 py-5 text-[10px] font-black text-slate-400 whitespace-nowrap">{{ item.createdOn }}</td>
               <td class="px-3 py-5">
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
      <!-- Institutional Pagination Hub -->
      <div class="px-6 py-4 bg-[#F8FAFC] border-t border-[#F1F5F9] flex items-center justify-between">
         <div class="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            ROWS PER PAGE: 
            <select class="bg-white border border-[#E2E8F0] rounded-lg px-2 py-1 text-slate-600 outline-none shadow-sm h-8 w-16">
               <option>10</option>
            </select>
         </div>
         <div class="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            PAGE <span class="w-8 h-8 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-center text-slate-800 shadow-sm">1</span> OF {{ Math.ceil(seriesData.length / 10) || 1 }}
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'TestSeriesList',
  data() {
    return {
      repositoryHeaders: [
        'SERIAL NO.',
        'IMAGE',
        'CODE',
        'TITLE',
        'PRICE',
        'OFFER PRICE',
        'VISIBILITY',
        'STATUS',
        'CREATED ON',
        'ACTIONS'
      ],
      seriesData: [
        { id: 1, code: 'TS-992', title: 'UPSC Civil Services Prelims 2026 - Comprehensive Mock Blueprint', price: '4999', offerPrice: '2999', visibility: 'Public', createdOn: '25-Jul-2025' },
        { id: 2, code: 'TS-304', title: 'SSC CGL Tier II Quant & English Strategic Mastery Package', price: '1999', offerPrice: '999', visibility: 'Private', createdOn: '12-Aug-2025' },
        { id: 3, code: 'TS-105', title: 'Banking Mastery Hub: IBPS PO & Clerk Pre+Mains Sequence', price: '2999', offerPrice: '1499', visibility: 'Premium', createdOn: '05-Sep-2025' },
        { id: 4, code: 'TS-208', title: 'UPSC CSE Mains Answer Writing: The Alpha Series 2026', price: '6999', offerPrice: '4499', visibility: 'Public', createdOn: '18-Oct-2025' },
        { id: 5, code: 'TS-411', title: 'GATE 2026 Mechanical Engineering: Full Length Simulation', price: '3499', offerPrice: '1999', visibility: 'Private', createdOn: '22-Nov-2025' },
        { id: 6, code: 'TS-612', title: 'General Studies Repository: The Quick Revision Kit', price: '999', offerPrice: '499', visibility: 'Public', createdOn: '01-Dec-2025' }
      ]
    }
  },
  mounted() { feather.replace(); },
  updated() { feather.replace(); }
}
</script>

<style scoped>
.test-hub-list-repository {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
