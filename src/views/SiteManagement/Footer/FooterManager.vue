<template>
 <div class="space-y-6 pb-20">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Site Management</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">Footer</span>
 </nav>
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">Footer Management</h2>
 </div>
 </div>

 <!-- MAIN FORM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md">
 <div class="p-8 relative z-10 text-left">
 <form @submit.prevent="handleUpdate" class="space-y-10">

 <!-- Short Description -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
 <div class="lg:col-span-2 pt-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Short Description</label>
 </div>
 <div class="lg:col-span-9">
 <textarea
 v-model="footerData.shortDescription"
 class="w-full h-24 p-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm resize-none"
 placeholder="Enter short description..."
 ></textarea>
 </div>
 <div class="lg:col-span-1 flex flex-col items-center gap-2">
 <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Show</span>
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="footerData.showShortDescription" class="sr-only peer">
 <div class="w-9 h-5 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
 </label>
 </div>
 </div>

 <!-- Social Links -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-6 border-t border-blue-100/60">
 <div class="lg:col-span-2 pt-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Social Links</label>
 </div>
 <div class="lg:col-span-9 space-y-4">
 <div class="flex flex-col md:flex-row gap-3">
 <input
 v-model="newSocial.url"
 type="text"
 placeholder="URL"
 class="flex-1 h-12 px-5 rounded-2xl bg-blue-50 border border-blue-100 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm"
 />
 <div class="relative w-full md:w-32">
 <select v-model="newSocial.icon" class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-100 text-sm font-semibold focus:outline-none appearance-none cursor-pointer">
 <option value="facebook">FB</option>
 <option value="twitter">TW</option>
 <option value="instagram">IG</option>
 <option value="linkedin">LI</option>
 </select>
 <feather type="chevron-down" size="14" class="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"></feather>
 </div>
 <button
 type="button"
 @click="addSocial"
 class="h-12 px-6 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap"
 >
 Add +
 </button>
 </div>
 <p class="text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">
 Add social link URL and select icon for that media from iconpicker. Click on ADD + button. And your social link will be created. You can also delete them by clicking on X button
 </p>

 <!-- Social List -->
 <div class="space-y-2">
 <div v-for="(link, index) in footerData.socialLinks" :key="index" class="flex items-center justify-between p-4 rounded-2xl bg-blue-50/50 border border-blue-100 group">
 <div class="flex items-center gap-3">
 <feather :type="link.icon" size="14" class="text-blue-600"></feather>
 <span class="text-xs font-semibold text-blue-600">{{ link.url }}</span>
 </div>
 <button @click="removeSocial(index)" type="button" class="text-indigo-400 hover:text-rose-600 transition-colors">
 <feather type="x" size="14"></feather>
 </button>
 </div>
 </div>
 </div>
 <div class="lg:col-span-1 flex flex-col items-center gap-2">
 <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Show</span>
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="footerData.showSocialLinks" class="sr-only peer">
 <div class="w-9 h-5 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
 </label>
 </div>
 </div>

 <!-- Bottom Footer Toggle -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-6 border-t border-blue-100/60">
 <div class="lg:col-span-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Bottom Footer</label>
 </div>
 <div class="lg:col-span-10 flex items-center gap-4">
 <div class="flex items-center gap-2">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest mr-2">Show</span>
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="footerData.showBottomFooter" class="sr-only peer">
 <div class="w-9 h-5 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
 </label>
 </div>
 <span class="text-[10px] font-bold text-indigo-400">Note : it includes Copyright text and Footer links</span>
 </div>
 </div>

 <!-- Contact Fields (Address, Email, Phone, Copyright) -->
 <div v-for="field in contactFields" :key="field.key" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-6 border-t border-blue-100/60">
 <div class="lg:col-span-2 pt-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">{{ field.label }}</label>
 </div>
 <div class="lg:col-span-9">
 <input
 v-model="footerData[field.key]"
 type="text"
 :placeholder="'Enter ' + field.label.toLowerCase()"
 class="w-full h-12 px-5 rounded-2xl bg-blue-50 border border-blue-100 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm"
 />
 </div>
 <div class="lg:col-span-1 flex flex-col items-center gap-2">
 <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Show</span>
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="footerData[field.showKey]" class="sr-only peer">
 <div class="w-9 h-5 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
 </label>
 </div>
 </div>

 <!-- Footer Links -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-6 border-t border-blue-100/60">
 <div class="lg:col-span-2 pt-2">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em]">Footer Links</label>
 </div>
 <div class="lg:col-span-9 space-y-4">
 <div class="flex flex-col md:flex-row gap-3">
 <input
 v-model="newLink.url"
 type="text"
 placeholder="URL"
 class="flex-1 h-12 px-5 rounded-2xl bg-blue-50 border border-blue-100 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm"
 />
 <input
 v-model="newLink.label"
 type="text"
 placeholder="Label"
 class="flex-1 h-12 px-5 rounded-2xl bg-blue-50 border border-blue-100 text-sm font-semibold focus:outline-none focus:border-blue-600 transition-all shadow-sm"
 />
 <button
 type="button"
 @click="addLink"
 class="h-12 px-6 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap"
 >
 Add +
 </button>
 </div>

 <!-- Links List -->
 <div class="space-y-2">
 <div v-for="(link, index) in footerData.footerLinks" :key="index" class="flex items-center justify-between p-4 rounded-2xl bg-blue-50/50 border border-blue-100 group">
 <div class="flex items-center gap-3">
 <span class="text-xs font-black text-blue-600 uppercase tracking-tight">{{ link.label }}</span>
 <span class="text-[11px] text-indigo-400 font-medium">{{ link.url }}</span>
 </div>
 <button @click="removeLink(index)" type="button" class="text-indigo-400 hover:text-rose-600 transition-colors">
 <feather type="x" size="14"></feather>
 </button>
 </div>
 </div>
 </div>
 <div class="lg:col-span-1 flex flex-col items-center gap-2">
 <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Show</span>
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="footerData.showFooterLinks" class="sr-only peer">
 <div class="w-9 h-5 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-indigo-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
 </label>
 </div>
 </div>

 <!-- Action Buttons -->
 <div class="flex items-center justify-end pt-10 border-t border-blue-100 gap-4">
 <button
 type="button"
 @click="$emit('navigate', 'dashboard')"
 class="px-6 py-3 rounded-2xl bg-white border border-blue-200 text-blue-600 text-[11px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all"
 >
 Cancel
 </button>
 <button
 type="submit"
 :disabled="loading"
 class="group relative flex items-center gap-3 px-16 py-3 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300 outline-none overflow-hidden font-black text-[11px] uppercase tracking-widest"
 >
 <feather v-if="!loading" type="refresh-cw" size="16"></feather>
 <feather v-else type="loader" size="16" class="animate-spin"></feather>
 {{ loading ? 'Updating...' : 'Update' }}
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
 <p class="text-[13px]">Footer settings updated successfully!</p>
 </div>
 </div>
 </div>
 </transition>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'FooterManager',
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
 loading: false,
 showSuccess: false,
 footerData: {
 shortDescription: 'We take our mission of increasing global access to quality education seriously. We connect learners to the best universities and institutions from around the world.',
 showShortDescription: true,
 socialLinks: [
 { icon: 'facebook', url: 'https://facebook.com/JSPARK.AI' },
 { icon: 'instagram', url: 'https://instagram.com/JSPARK.AI' },
 { icon: 'twitter', url: 'https://twitter.com/JSPARK.AI' }
 ],
 showSocialLinks: true,
 showBottomFooter: true,
 address: 'A-1, Office No-011, Sector- 59, Noida, U.P 201301',
 showAddress: true,
 email: 'sales@jspark.in',
 showEmail: true,
 phone: '+91-9811390208',
 showPhone: true,
 copyright: 'All right reserved © 2018',
 showCopyright: true,
 footerLinks: [
 { label: 'Contact', url: '/contact' },
 { label: 'Discussion', url: '/discussion' },
 { label: 'Course Details', url: '/courses' },
 { label: 'Privacy Policy', url: '/privacy-policy' }
 ],
 showFooterLinks: true
 },
 newSocial: { url: '', icon: 'facebook' },
 newLink: { url: '', label: '' },
 contactFields: [
 { label: 'Address', key: 'address', showKey: 'showAddress' },
 { label: 'Email', key: 'email', showKey: 'showEmail' },
 { label: 'Phone', key: 'phone', showKey: 'showPhone' },
 { label: 'Copyright Text', key: 'copyright', showKey: 'showCopyright' }
 ]
 }
 },
 methods: {
 addSocial() {
 if (this.newSocial.url) {
 this.footerData.socialLinks.push({ ...this.newSocial });
 this.newSocial.url = '';
 }
 },
 removeSocial(index) {
 this.footerData.socialLinks.splice(index, 1);
 },
 addLink() {
 if (this.newLink.url && this.newLink.label) {
 this.footerData.footerLinks.push({ ...this.newLink });
 this.newLink.url = '';
 this.newLink.label = '';
 }
 },
 removeLink(index) {
 this.footerData.footerLinks.splice(index, 1);
 },
 handleUpdate() {
 this.loading = true;
 setTimeout(() => {
 this.loading = false;
 this.showSuccess = true;
 setTimeout(() => (this.showSuccess = false), 2000);
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

/* Custom select styling to match theme */
select {
 background-image: none;
}
</style>
