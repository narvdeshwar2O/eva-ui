<template>
 <div class="py-32 px-6 bg-white min-h-[80vh]">
 <div class="max-w-7xl mx-auto flex flex-col items-center">
 <div class="text-center space-y-4 mb-20 animate-slide-up">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">Expert Assessment Portal</h2>
 <h3 class="text-6xl font-black text-blue-950 tracking-tighter uppercase">Our Online Test Courses</h3>
 <div class="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full mt-6"></div>
 </div>

 <div class="w-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
 <!-- Filter Sidebar -->
 <aside class="space-y-8 animate-in fade-in slide-in-from-left duration-700">
 <div class="bg-blue-50 border border-blue-100 p-8 rounded-[40px] space-y-10 shadow-sm sticky top-32">
 <div class="space-y-4 text-left">
 <h4 class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Find Your Test Courses</h4>
 <div class="relative group">
 <input type="text" placeholder="Looking For?" class="w-full h-11 pl-6 pr-14 rounded-2xl bg-white border border-blue-200 text-sm font-bold focus:outline-none focus:border-indigo-600 transition-all shadow-inner" v-model="searchQuery" />
 <button class="absolute right-2 top-2 w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-blue-950 transition-all shadow-lg shadow-indigo-600/20">
 <feather type="search" size="16"></feather>
 </button>
 </div>
 </div>

 <div class="space-y-6 text-left">
 <h4 class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Select Category</h4>
 <div class="p-6 rounded-3xl bg-white border border-blue-200 shadow-sm space-y-4">
 <div v-for="cat in ['Tech e-books (library)', 'Language', 'Competitive Placement']" :key="cat" class="flex items-center gap-3 group cursor-pointer" @click="toggleCategory(cat)">
 <div class="w-5 h-5 rounded-lg border-2 border-blue-200 flex items-center justify-center group-hover:border-indigo-400 transition-all">
 <div v-if="selectedCategories.includes(cat)" class="w-2.5 h-2.5 rounded bg-indigo-600"></div>
 </div>
 <span class="text-[11px] font-black text-blue-700 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">{{ cat }}</span>
 </div>
 </div>
 </div>

 <div class="pt-10 border-t border-blue-200">
 <button @click="resetFilters" class="w-fit px-8 mx-auto sm:mx-0 py-3 rounded-2xl border-2 border-blue-200 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all">Reset Filters</button>
 </div>
 </div>
 </aside>

 <!-- Empty State (As shown in screenshot) -->
 <div class="space-y-10 flex flex-col items-center justify-center border-2 border-dashed border-blue-100 rounded-[50px] bg-blue-50/30 p-20">
 <div class="w-24 h-24 rounded-full bg-white border-4 border-blue-50 shadow-inner flex items-center justify-center text-blue-100">
 <feather type="clipboard" size="40"></feather>
 </div>
 <div class="space-y-4 text-center">
 <h4 class="text-3xl font-black text-blue-950 uppercase tracking-tighter">No data available</h4>
 <p class="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] max-w-sm mx-auto">We are currently curating new assessment tracks. Please check back soon or browse our technical libraries.</p>
 </div>
 <button @click="$router.push('/courses')" class="mt-8 px-6 py-3 rounded-2xl bg-indigo-600 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/20 hover:scale-105 transition-all">Browse Available Courses</button>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons/dist/feather';

export default {
 name: 'TestCatalog',
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
 selectedCategories: []
 }
 },
 methods: {
 toggleCategory(cat) {
 if (this.selectedCategories.includes(cat)) {
 this.selectedCategories = this.selectedCategories.filter(c => c !== cat);
 } else {
 this.selectedCategories.push(cat);
 }
 },
 resetFilters() {
 this.searchQuery = '';
 this.selectedCategories = [];
 }
 }
}
</script>
