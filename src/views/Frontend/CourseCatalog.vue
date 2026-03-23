<template>
 <div class="py-32 px-6 bg-white min-h-[80vh]">
 <div class="max-w-7xl mx-auto flex flex-col items-center">
 <div class="text-center space-y-4 mb-20 animate-slide-up">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em]">Integrated Learning Catalog</h2>
 <h3 class="text-6xl font-black text-blue-950 tracking-tighter uppercase">Our Professional Courses</h3>
 <div class="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full mt-6"></div>
 </div>

 <div class="w-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
 <!-- Filter Sidebar -->
 <aside class="space-y-8 animate-in fade-in slide-in-from-left duration-700">
 <div class="bg-blue-50 border border-blue-100 p-8 rounded-[40px] space-y-10 shadow-sm sticky top-32">
 <div class="space-y-4 text-left">
 <h4 class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Search Directory</h4>
 <div class="relative group">
 <input type="text" placeholder="Looking For?" class="w-full h-11 pl-6 pr-14 rounded-2xl bg-white border border-blue-200 text-sm font-bold focus:outline-none focus:border-indigo-600 transition-all shadow-inner" v-model="searchQuery" />
 <button class="absolute right-2 top-2 w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-blue-950 transition-all shadow-lg shadow-indigo-600/20">
 <feather type="search" size="16"></feather>
 </button>
 </div>
 </div>

 <div class="space-y-6 text-left">
 <h4 class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Choose Category</h4>
 <div class="p-6 rounded-3xl bg-white border border-blue-200 shadow-sm space-y-4">
 <div v-for="cat in ['Tech e-books (library)', 'Language', 'Core Academic']" :key="cat" class="flex items-center gap-3 group cursor-pointer" @click="toggleCategory(cat)">
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

 <!-- Course Grid Area -->
 <div class="space-y-10">
 <div class="flex items-center justify-between px-4 pb-4 border-b border-blue-100">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Showing {{ filteredCourses.length }} elite programs</span>
 <div class="flex items-center gap-2">
 <span class="text-[10px] font-black text-indigo-400 uppercase">Sort By:</span>
 <select class="bg-transparent text-[10px] font-black uppercase outline-none text-indigo-600 font-bold border-none cursor-pointer">
 <option>Latest</option>
 <option>Featured</option>
 <option>Price: Low to High</option>
 </select>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
 <div v-for="c in filteredCourses" :key="c.name" class="group bg-white p-4 rounded-[45px] border border-blue-100 hover:border-indigo-200 hover:shadow-[0_45px_90px_-25px_rgba(79,70,229,0.12)] transition-all duration-700 flex flex-col h-full animate-in fade-in zoom-in duration-500">
 <div class="relative rounded-[36px] overflow-hidden aspect-[16/10] mb-8 shadow-md">
 <img :src="c.image" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" :alt="c.name">
 <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent"></div>
 <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl text-[10px] font-black text-indigo-700 uppercase tracking-widest">
 {{ c.tag }}
 </div>
 </div>
 <div class="px-4 space-y-6 flex-1 flex flex-col text-left">
 <h4 class="text-xl font-black text-blue-950 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors uppercase">{{ c.name }}</h4>
 <p class="text-[10px] font-bold text-blue-500 uppercase tracking-widest leading-relaxed line-clamp-2">Enterprise-grade curriculum featuring real-world architecture patterns and native-fluency linguistic coaching.</p>

 <div class="pt-6 border-t border-blue-50 mt-auto flex flex-col gap-4">
 <div class="flex items-center justify-between">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Standard Price</span>
 <span class="text-xl font-black text-blue-950 tracking-tighter tabular-nums">₹ {{ c.price }} /-</span>
 </div>
 <button class="w-fit px-8 mx-auto sm:mx-0 py-3 rounded-2xl bg-blue-950 text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-950/10 hover:bg-indigo-600 transition-all hover:scale-[1.02] active:scale-[0.98]">
 Enroll Now
 </button>
 </div>
 </div>
 </div>
 </div>

 <!-- Empty State -->
 <div v-if="filteredCourses.length === 0" class="py-40 flex flex-col items-center gap-6 text-center animate-in fade-in zoom-in">
 <div class="w-24 h-24 rounded-full bg-blue-50 border-4 border-white shadow-inner flex items-center justify-center text-blue-200">
 <feather type="search" size="40"></feather>
 </div>
 <div class="space-y-2">
 <h4 class="text-2xl font-black text-blue-950 uppercase">No Courses Found</h4>
 <p class="text-xs font-bold text-indigo-400 uppercase tracking-widest">Try adjusting your filters or search keywords.</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons/dist/feather';

export default {
 name: 'CourseCatalog',
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
 selectedCategories: [],
 courses: [
 { name: 'Python Learning Pro V4', tag: 'Tech e-books (library)', price: '2,999', image: '/course_python_java_thumb.png' },
 { name: 'Java Architecture Lab', tag: 'Tech e-books (library)', price: '3,499', image: '/course_java_thumb_v2.png' },
 { name: 'Japanese Language Lab', tag: 'Language', price: '2,499', image: '/course_japanese_thumb.png' },
 { name: 'English Verbal Mastery', tag: 'Language', price: '1,999', image: '/course_english_thumb_v2.png' }
 ]
 }
 },
 computed: {
 filteredCourses() {
 return this.courses.filter(c => {
 const matchesSearch = c.name.toLowerCase().includes(this.searchQuery.toLowerCase());
 const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(c.tag);
 return matchesSearch && matchesCategory;
 });
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
