<template>
 <div class="space-y-6">
 <!-- Breadcrumbs & Header -->
 <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div class="space-y-1 text-left">
 <nav class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
 <span @click="$emit('navigate', 'dashboard')" class="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-indigo-400 uppercase">Settings</span>
 <feather type="chevron-right" size="8"></feather>
 <span class="text-blue-950 uppercase tracking-tight">General Setting</span>
 </nav>
 <div class="flex items-center gap-3">
 <h2 class="text-2xl font-black text-blue-950 tracking-tight">General Setting</h2>
 </div>
 </div>
 </div>

 <!-- TABS NAVIGATION -->
 <div class="glass-card bg-white/80 backdrop-blur-md overflow-hidden border border-blue-200/60 p-1.5">
 <div class="flex flex-wrap gap-1">
 <button
 v-for="tab in tabs"
 :key="tab.id"
 @click="activeTab = tab.id"
 :class="[ 'px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300', activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-blue-500 hover:bg-blue-50' ]"
 >
 {{ tab.label }}
 </button>
 </div>
 </div>

 <!-- MAIN FORM CARD -->
 <div class="glass-card relative overflow-hidden bg-white/80 backdrop-blur-md border border-blue-200/60">
 <div class="p-8 relative z-10 text-left">

 <!-- GENERAL TAB CONTENT -->
 <form v-if="activeTab === 'general'" @submit.prevent="handleUpdate" class="space-y-6">
 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">App Name</label>
 <input type="text" v-model="settings.appName" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/5 transition-all" />
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">App URL</label>
 <input type="text" v-model="settings.appUrl" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all opacity-80" readonly />
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-t border-blue-100 pt-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Google Analytics ID</label>
 <input type="text" v-model="settings.analyticsId" placeholder="Ex. UA-3400000023-3" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start border-t border-blue-100 pt-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Captcha Status</label>
 <div class="space-y-1.5">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="settings.captcha" class="sr-only peer">
 <div class="w-12 h-6 rounded-full peer-focus:outline-none transition-all flex items-center shadow-inner relative bg-blue-200 peer-checked:bg-blue-600">
 <div class="after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm peer-checked:after:translate-x-6"></div>
 </div>
 </label>
 <p class="text-[10px] text-indigo-400 font-bold uppercase">Whether the registration/login/contact captcha is on or off</p>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start border-t border-blue-100 pt-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Show Offers Page</label>
 <div class="space-y-1.5">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="settings.showOffers" class="sr-only peer">
 <div class="w-12 h-6 rounded-full peer-focus:outline-none transition-all flex items-center shadow-inner relative bg-blue-200 peer-checked:bg-blue-600">
 <div class="after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm peer-checked:after:translate-x-6"></div>
 </div>
 </label>
 <p class="text-[10px] text-indigo-400 font-bold uppercase">Enable / Disable if Coupon offers page link to be displayed in bottom footer</p>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-t border-blue-100 pt-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Teacher Commission Rate</label>
 <input type="number" v-model="settings.commission" class="w-48 h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start border-t border-blue-100 pt-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">DoubtNet Attempts</label>
 <div class="space-y-1.5">
 <input type="number" v-model="settings.doubtnet" class="w-48 h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 <p class="text-[10px] text-indigo-400 font-bold uppercase">How many times a user can access the doubtnet feature.</p>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start border-t border-blue-100 pt-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Registration Mail</label>
 <div class="space-y-1.5">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" v-model="settings.regMail" class="sr-only peer">
 <div class="w-12 h-6 rounded-full peer-focus:outline-none transition-all flex items-center shadow-inner relative bg-blue-200 peer-checked:bg-blue-600">
 <div class="after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm peer-checked:after:translate-x-6"></div>
 </div>
 </label>
 <p class="text-[10px] text-indigo-400 font-bold uppercase">Enable / Disable if admin will be able to received new registration user mail</p>
 </div>
 </div>
 </form>

 <!-- LOGOS TAB CONTENT -->
 <div v-if="activeTab === 'logos'" class="space-y-8">
 <div v-for="logo in logoSettings" :key="logo.id" class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start border-b border-blue-100 pb-8 last:border-0">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest pt-2">{{ logo.label }}</label>
 <div class="space-y-3">
 <div class="flex items-center gap-4">
 <label class="px-6 py-2.5 bg-blue-100 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-blue-200 transition-colors">
 Choose File
 <input type="file" class="hidden" />
 </label>
 <span class="text-xs text-indigo-400 font-medium">No file chosen</span>
 </div>
 <p class="text-[10px] text-indigo-400 font-bold uppercase leading-loose" v-html="logo.note"></p>
 <div class="w-32 h-20 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200 flex items-center justify-center">
 <feather type="image" size="24" class="text-blue-200"></feather>
 </div>
 </div>
 </div>
 </div>

 <!-- LAYOUT TAB CONTENT -->
 <div v-if="activeTab === 'layout'" class="space-y-10">
 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Layout Type</label>
 <div class="space-y-1.5">
 <select class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all cursor-pointer">
 <option>Wide</option>
 <option>Boxed</option>
 </select>
 <p class="text-[10px] text-indigo-400 font-bold uppercase">This will change frontend theme layout type</p>
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-t border-blue-100 pt-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Theme Layout</label>
 <div class="space-y-1.5">
 <select class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all cursor-pointer">
 <option>Layout 1</option>
 <option>Layout 2</option>
 </select>
 <p class="text-[10px] text-indigo-400 font-bold uppercase">This will change frontend theme layout</p>
 </div>
 </div>

 <div class="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8 border-t border-blue-100 pt-10">
 <div v-for="section in layoutCheckboxes" :key="section" class="flex items-center gap-4">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" checked class="sr-only peer">
 <div class="w-10 h-5 rounded-full peer-focus:outline-none transition-all flex items-center shadow-inner relative bg-blue-100 peer-checked:bg-blue-600">
 <div class="after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all shadow-sm peer-checked:after:translate-x-5"></div>
 </div>
 </label>
 <span class="text-[11px] font-bold text-blue-600">{{ section }}</span>
 </div>
 </div>
 </div>

 <!-- MAIL TAB CONTENT -->
 <div v-if="activeTab === 'mail'" class="space-y-6">
 <div v-for="field in mailFields" :key="field.label" class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-b border-blue-50 pb-4 last:border-0">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">{{ field.label }}</label>
 <div class="space-y-1.5 w-full">
 <input :type="field.type || 'text'" :placeholder="field.placeholder" class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all" />
 <p v-if="field.note" class="text-[10px] text-indigo-400 font-bold uppercase">{{ field.note }}</p>
 </div>
 </div>
 </div>

 <!-- PAYMENT TAB CONTENT -->
 <div v-if="activeTab === 'payment'" class="space-y-8">
 <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-center border-b border-blue-50 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">Select Currency</label>
 <select class="w-full h-12 px-5 rounded-xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all cursor-pointer">
 <option>₹ - Rupee</option>
 <option>$ - Dollar</option>
 </select>
 </div>

 <div v-for="method in paymentMethods" :key="method.id" class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start border-b border-blue-50 pb-6">
 <label class="text-[11px] font-black text-blue-900 uppercase tracking-widest">{{ method.label }}</label>
 <div class="space-y-4 w-full">
 <div class="flex flex-col gap-1.5">
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" class="sr-only peer">
 <div class="w-10 h-5 rounded-full peer-focus:outline-none transition-all flex items-center shadow-inner relative bg-blue-100 peer-checked:bg-blue-600">
 <div class="after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all shadow-sm peer-checked:after:translate-x-5"></div>
 </div>
 </label>
 <p class="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter">{{ method.note }}</p>
 </div>
 <textarea v-if="method.id === 'offline'" placeholder="Enter offline payment instructions" class="w-full h-32 p-5 rounded-2xl bg-blue-50 border border-blue-200 text-sm font-semibold outline-none focus:border-blue-600 transition-all resize-none"></textarea>
 </div>
 </div>
 </div>

 <!-- USER REGISTRATION TAB CONTENT -->
 <div v-if="activeTab === 'user'" class="space-y-8">
 <div class="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/30 flex items-center gap-3 mb-8">
 <feather type="info" size="16" class="text-blue-600"></feather>
 <p class="text-[11px] font-black text-blue-700 uppercase tracking-widest">Checked fields from the right sidebar will be displayed in registration form</p>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
 <!-- Preview Side -->
 <div class="space-y-4">
 <div v-for="f in ['First Name', 'Last Name', 'Email', 'Password']" :key="f" class="h-11 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center px-6 text-[11px] font-bold text-indigo-400 uppercase tracking-widest">
 {{ f }}
 </div>
 </div>
 <!-- Selection Side -->
 <div class="bg-white rounded-3xl border border-blue-100 p-6 space-y-3">
 <div v-for="field in regFields" :key="field" class="flex items-center justify-between group">
 <span class="text-[11px] font-black text-blue-600 uppercase tracking-tight">{{ field }}</span>
 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" :checked="['First Name', 'Last Name', 'Email', 'Password'].includes(field)" class="sr-only peer">
 <div class="w-8 h-4 rounded-full peer-focus:outline-none transition-all flex items-center relative bg-blue-100 peer-checked:bg-blue-600">
 <div class="after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
 </div>
 </label>
 </div>
 </div>
 </div>
 </div>

 <!-- API CLIENTS TAB CONTENT -->
 <div v-if="activeTab === 'api'" class="space-y-6">
 <div class="flex items-center justify-between gap-4 mb-4">
 <h4 class="text-[12px] font-black text-blue-950 uppercase tracking-widest">API Clients</h4>
 <div class="flex items-center gap-2">
 <input type="text" placeholder="API Client Name" class="h-10 px-4 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold outline-none focus:border-blue-600" />
 <button class="px-6 h-10 rounded-xl bg-blue-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">Generate</button>
 </div>
 </div>

 <div class="overflow-x-auto rounded-2xl border border-blue-100 bg-white">
 <table class="w-full text-left border-collapse">
 <thead>
 <tr class="bg-blue-50 border-b border-blue-100 text-[10px] font-black text-blue-500 uppercase tracking-widest">
 <th class="px-6 py-3">S.N</th>
 <th class="px-6 py-3">Name</th>
 <th class="px-6 py-3">ID</th>
 <th class="px-6 py-3">Secret</th>
 <th class="px-6 py-3">Status</th>
 <th class="px-6 py-3 text-center">Action</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-blue-50">
 <tr v-for="(client, idx) in apiClients" :key="client.id" class="text-[11px] font-semibold text-blue-600">
 <td class="px-6 py-3 tabular-nums">{{ idx + 1 }}</td>
 <td class="px-6 py-3">{{ client.name }}</td>
 <td class="px-6 py-3">{{ client.id }}</td>
 <td class="px-6 py-3 text-indigo-400 font-mono">{{ client.secret }}</td>
 <td class="px-6 py-3">
 <span class="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-black uppercase">Live</span>
 </td>
 <td class="px-6 py-3 text-center">
 <button class="px-4 py-1.5 rounded-lg bg-rose-600 text-white text-[9px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all">Revoke</button>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <!-- FORM ACTIONS -->
 <div class="flex items-center justify-end gap-3 pt-10 border-t border-blue-100 mt-10">
 <button class="px-6 py-3.5 rounded-2xl bg-blue-100 text-blue-500 text-[11px] font-black uppercase tracking-widest hover:bg-blue-200 transition-all">Cancel</button>
 <button @click="handleUpdate" class="px-6 py-3.5 rounded-2xl bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">Update</button>
 </div>

 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons';

export default {
 name: 'GeneralSetting',
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
 activeTab: 'general',
 tabs: [
 { id: 'general', label: 'General' },
 { id: 'logos', label: 'Logos' },
 { id: 'layout', label: 'Layout' },
 { id: 'mail', label: 'Mail Configuration' },
 { id: 'payment', label: 'Payment Configuration' },
 { id: 'user', label: 'User Registration' },
 { id: 'api', label: 'API Clients' }
 ],
 settings: {
 appName: 'EVACLASSES',
 appUrl: 'https://evaclasses.com/',
 analyticsId: 'UA-3400000023-3',
 captcha: true,
 showOffers: true,
 commission: 0,
 doubtnet: 5,
 regMail: false
 },
 logoSettings: [
 { id: 1, label: 'Logo 1', note: 'Note : Upload logo with <b>black text and transparent background</b> in .png format and 294x50(WxH) pixels. Height should be fixed, width according to your aspect ratio.' },
 { id: 2, label: 'Logo 2', note: 'Note : Upload logo with <b>white text and transparent background</b> in .png format and 294x50 (WxH) pixels. Height should be fixed, width according to your aspect ratio.' },
 { id: 3, label: 'Logo for Popups', note: 'Note : Add <b>square logo</b> minimum resolution 72x72 pixels' },
 { id: 4, label: 'Add Favicon', note: 'Note : Upload logo with resolution <b>32x32 pixels</b> and extension .png or .gif or .ico' }
 ],
 layoutCheckboxes: [
 'Search Section', 'Popular Courses', 'Reasons why choose LMS',
 'Testimonial', 'Latest News / Courses', 'Sponsors',
 'Featured Courses', 'Teachers', 'Frequently Asked Questions',
 'Course By Category', 'Contact us / Get in Touch'
 ],
 mailFields: [
 { label: 'Mail From', placeholder: 'Online Tutes', note: 'This will be display name for your sent email.' },
 { label: 'Mail From Address', placeholder: 'support@JSPARK.AI.tech', note: 'This email will be used for "Contact Form" correspondence.' },
 { label: 'Mail Driver', placeholder: 'smtp', note: 'Chose either one SMTP, Mailgun, Mandrill, SparkPost, Amazon SES etc.' },
 { label: 'Mail HOST', placeholder: 'smtp.zoho.in' },
 { label: 'Mail PORT', placeholder: '465' },
 { label: 'Mail Username', placeholder: 'support@JSPARK.AI.tech' },
 { label: 'Mail Password', placeholder: '•••••••••••••', type: 'password' },
 { label: 'Mail Encryption', placeholder: 'ssl' }
 ],
 paymentMethods: [
 { id: 'instamojo', label: 'Instamojo Payment Method', note: 'Redirects to instamojo for payment' },
 { id: 'razorpay', label: 'Razorpay Payment Method', note: 'Redirects to Razorpay for payment' },
 { id: 'cashfree', label: 'CashFree Payment Method', note: 'Redirects to CashFree for payment' },
 { id: 'payumoney', label: 'PayUMoney Payment Method', note: 'Redirects to PayUMoney for payment' },
 { id: 'offline', label: 'Offline Payment Method', note: 'User gets assistance for offline payment via admin' }
 ],
 regFields: [
 'First Name', 'Last Name', 'Email', 'Password', 'Phone',
 'Date of Birth', 'Gender', 'Address', 'City', 'Pincode', 'State', 'Country'
 ],
 apiClients: [
 { id: 1, name: 'LMS for EVACLASSES Personal Access Client', secret: 'Y2QEoR3exZtyDfmR9iA2ySYe...Wk7mEA' },
 { id: 2, name: 'LMS for EVACLASSES Password Grant Client', secret: 'kDmgk3wFKuWxymNaW1rv4Eg...Kq6SdB' }
 ]
 }
 },
 methods: {
 handleUpdate() {
 alert('Settings updated successfully!');
 }
 }
}
</script>

<style scoped>
.glass-card { border-radius: 2rem; }
.line-clamp-2 {
 display: -webkit-box;
 -webkit-line-clamp: 2;
 line-clamp: 2;
 -webkit-box-orient: vertical;
 overflow: hidden;
}
</style>
