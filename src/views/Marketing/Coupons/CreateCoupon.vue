<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Marketing</span>
 <feather type="chevron-right" size="8"></feather>
 <span @click="$emit('back')" class="hover:text-blue-600 cursor-pointer transition-colors uppercase">Coupons</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Create Coupon</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Create Coupon</h2>
 </div>
 </div>
 <div class="flex items-center gap-3">
 <button 
 @click="$emit('back')"
 class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all outline-none"
 >
 <feather type="eye" size="14"></feather>
 View Coupons
 </button>
 </div>
 </div>

 <!-- MAIN FORM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-8 relative z-10 text-left">
 <form @submit.prevent="handleSave" class="space-y-8">
 
 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-8 items-start border-b border-blue-100 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest pt-3">Name <span class="text-rose-500">*</span></label>
 <input type="text" v-model="formData.name" placeholder="Name" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all shadow-sm" required />
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-8 items-start border-b border-blue-100 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest pt-3">Description</label>
 <textarea v-model="formData.description" placeholder="Description" rows="3" class="w-full p-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all shadow-sm"></textarea>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-8 items-start border-b border-blue-100 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest pt-3">Code</label>
 <input type="text" v-model="formData.code" placeholder="Ex. MyShopping50" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all shadow-sm" />
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-8 items-start border-b border-blue-100 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest pt-3">Type</label>
 <div class="space-y-2 w-full">
 <select v-model="formData.type" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all shadow-sm cursor-pointer">
 <option value="discount">Discount Rate (in %)</option>
 <option value="flat">Flat Rate</option>
 </select>
 <p class="text-[10px] text-blue-500 font-bold uppercase tracking-widest leading-relaxed">
 <span class="text-blue-900 font-black">Discount Rate (%):</span> If you will select this, it will apply rate in % to total purchase. Ex. Price = $100 and Discount rate is 10% then 10% of 100$ will be deducted.<br/>
 <span class="text-blue-900 font-black">Flat Rate:</span> If you select this, particular amount will be deducted from total purchase. Ex. Price = 100$ and Flat rate is 25$ then 25$ will be deducted from 100$.
 </p>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-8 items-start border-b border-blue-100 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest pt-3">Amount <span class="text-rose-500">*</span></label>
 <div class="space-y-2 w-full">
 <input type="number" v-model="formData.amount" placeholder="Amount" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all shadow-sm" required />
 <p class="text-[10px] text-blue-500 font-bold uppercase tracking-widest">If Discount Rate selected, input rate of percentage. If Flat Rate selected, input particular amount to be deducted.</p>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-8 items-start border-b border-blue-100 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest pt-3">Expires At</label>
 <div class="relative w-full">
 <input type="date" v-model="formData.expiresAt" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all shadow-sm text-blue-600" />
 <span class="absolute right-12 top-1/2 -translate-y-1/2 text-[10px] text-indigo-400 font-bold uppercase pointer-events-none">yyyy-mm-dd | Ex.. 2019-01-01</span>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-8 items-start border-b border-blue-100 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest pt-3">Minimum Order Price</label>
 <input type="number" v-model="formData.minPrice" placeholder="Minimum Order Price" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all shadow-sm" />
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-8 items-start border-b border-blue-100 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest pt-3">Per User Limit <span class="text-rose-500">*</span></label>
 <div class="space-y-2 w-full">
 <input type="number" v-model="formData.perUserLimit" placeholder="Per User Limit" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all shadow-sm" required />
 <p class="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Specify how many times a single user can use this coupon. By default one time use.</p>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-8 items-start border-b border-blue-100 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest pt-3">No. of Coupon <span class="text-rose-500">*</span></label>
 <div class="space-y-2 w-full">
 <input type="number" v-model="formData.noOfCoupon" placeholder="No. of Coupon" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all shadow-sm" required />
 <p class="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Specify how many times generate coupon. By default one time create.</p>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] md:gap-8 items-start border-b border-blue-100 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest pt-3">Course</label>
 <div class="space-y-2 w-full">
 <select v-model="formData.course" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold text-blue-950 outline-none focus:border-blue-600 transition-all shadow-sm cursor-pointer">
 <option value="">Select Course</option>
 <option value="course1">English Language</option>
 </select>
 <p class="text-[10px] text-blue-500 font-bold uppercase tracking-widest">If you wanted to make this coupon for a specific course, kindly select the course.</p>
 </div>
 </div>

 <!-- Actions -->
 <div class="flex items-center justify-end gap-4 pt-4">
 <button 
 type="button"
 @click="$emit('back')"
 class="px-6 py-3.5 rounded-xl bg-blue-100 text-blue-600 font-black uppercase text-[11px] tracking-widest shadow-sm border border-blue-200 hover:bg-blue-200 transition-all duration-300"
 >
 Cancel
 </button>
 <button 
 type="submit"
 class="px-6 py-3.5 rounded-xl bg-blue-600 text-white font-black uppercase text-[11px] tracking-widest shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300"
 >
 Create
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
 name: 'CreateCoupon',
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
 description: '',
 code: '',
 type: 'discount',
 amount: null,
 expiresAt: '',
 minPrice: null,
 perUserLimit: 1,
 noOfCoupon: 1,
 course: ''
 }
 }
 },
 methods: {
 handleSave() {
 // Simulate save
 alert('Coupon created successfully!');
 this.$emit('back'); 
 }
 }
}
</script>

<style scoped>
.glass-card { box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05); border-radius: 2rem; }
</style>
