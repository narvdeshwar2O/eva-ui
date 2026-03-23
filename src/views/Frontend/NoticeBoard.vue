<template>
 <div class="py-32 px-6 bg-white min-h-[80vh]">
 <div class="max-w-5xl mx-auto space-y-20">
 
 <!-- Page Header -->
 <div class="text-center space-y-6 animate-slide-up">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em]">Internal Bulletins</h2>
 <h1 class="text-6xl font-black text-blue-950 tracking-tighter uppercase">Notice Board</h1>
 <div class="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full mt-6"></div>
 </div>

 <!-- Notices List -->
 <div class="space-y-6">
 <div v-for="(notice, i) in notices" :key="i" class="group relative p-8 md:p-12 rounded-[50px] bg-blue-50 border border-blue-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-500 overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-10 animate-in fade-in slide-in-from-bottom duration-700" :style="`animation-delay: ${i * 100}ms`">
 <div class="flex flex-col items-center justify-center w-24 h-24 rounded-3xl bg-white shadow-xl group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shrink-0">
 <span class="text-3xl font-black tracking-tighter">{{ notice.day }}</span>
 <span class="text-[10px] uppercase font-black tracking-widest">{{ notice.month }}</span>
 </div>
 
 <div class="space-y-4 flex-1 text-left">
 <div class="flex items-center gap-3">
 <span class="px-4 py-1.5 rounded-full bg-indigo-100/50 text-indigo-700 text-[9px] font-black uppercase tracking-widest">{{ notice.tag }}</span>
 <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{{ notice.year }}</span>
 </div>
 <h3 class="text-3xl font-black text-blue-950 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{{ notice.title }}</h3>
 <p class="text-blue-700 font-medium leading-relaxed max-w-2xl lowercase first-letter:uppercase">
 {{ notice.desc }}
 </p>
 </div>

 <div class="shrink-0">
 <button class="w-14 h-11 rounded-2xl bg-white border border-blue-100 text-indigo-400 group-hover:text-indigo-600 group-hover:border-indigo-200 flex items-center justify-center transition-all shadow-sm">
 <feather type="external-link" size="20"></feather>
 </button>
 </div>
 </div>
 </div>

 <!-- Footer Help -->
 <div class="pt-10 text-center border-t border-blue-100">
 <p class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Showing latest institutional updates from Jspark.ai global headquarters</p>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons/dist/feather';

export default {
 name: 'NoticeBoard',
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
 notices: [
 { 
 day: '18', month: 'MAR', year: '2026', tag: 'Academic',
 title: 'Session 2026 Registration Open',
 desc: 'Official enrollment window for the Spring 2026 semester is now active. All scholarship applications must be submitted by the end of the month.'
 },
 { 
 day: '25', month: 'MAR', year: '2026', tag: 'Events',
 title: 'Java Architecture Workshop V2',
 desc: 'Join our senior engineering team for an intensive 48-hour deep dive into high-performance distributed systems and micro-service clustering.'
 },
 { 
 day: '02', month: 'APR', year: '2026', tag: 'Examination',
 title: 'Spring Semester Exam Schedule',
 desc: 'The official proctored assessment timetable has been published. Please log in to your scholar portal to view personalized hall tickets.'
 },
 { 
 day: '10', month: 'APR', year: '2026', tag: 'System',
 title: 'Infrastructure Maintenance Window',
 desc: 'Global learning nodes will undergo a high-availability upgrade on April 10th. Platform access will be intermittent during the 2-hour window.'
 }
 ]
 }
 }
}
</script>
