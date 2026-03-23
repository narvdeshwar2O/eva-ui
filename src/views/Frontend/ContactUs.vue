<template>
 <div class="py-32 px-6 bg-white min-h-[80vh]">
 <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

 <!-- Info Column -->
 <div class="space-y-16 text-left animate-slide-up">
 <div class="space-y-6">
 <h2 class="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em]">24/7 Connectivity</h2>
 <h1 class="text-7xl font-black text-blue-950 tracking-tighter uppercase">Contact Us</h1>
 <p class="text-blue-700 font-medium max-w-lg text-lg">We're here to help! Reach out for institutional inquiries, tech support, or to learn more about our 2026 digital programs.</p>
 </div>

 <div class="space-y-10">
 <div v-for="c in contactInfo" :key="c.t" class="flex items-start gap-8 group cursor-default">
 <div class="w-16 h-16 rounded-3xl bg-blue-50 text-indigo-600 flex items-center justify-center shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 scale-110">
 <feather :type="c.i" size="26"></feather>
 </div>
 <div class="flex flex-col">
 <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{{ c.t }}</span>
 <span class="text-2xl font-black text-blue-950 tracking-tight group-hover:text-indigo-600 transition-colors uppercase leading-tight mt-1">{{ c.v }}</span>
 </div>
 </div>
 </div>

 <!-- Social Presence -->
 <div class="pt-10 space-y-6">
 <h4 class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Connect Digitally</h4>
 <div class="flex items-center gap-4">
 <div v-for="icon in ['facebook', 'twitter', 'instagram', 'linkedin']" :key="icon" class="w-14 h-11 rounded-2xl bg-white flex items-center justify-center text-indigo-600 transition-all cursor-pointer border border-blue-100 shadow-sm hover:bg-indigo-600 hover:text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-95">
 <feather :type="icon" size="20"></feather>
 </div>
 </div>
 </div>
 </div>

 <!-- Form Column -->
 <div class="relative">
 <div class="absolute -top-10 -right-10 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl"></div>
 <div class="absolute -bottom-10 -left-10 w-48 h-48 bg-violet-600/5 rounded-full blur-3xl"></div>

 <div class="bg-white p-12 md:p-16 rounded-[70px] shadow-[0_50px_100px_-20px_rgba(79,70,229,0.15)] border border-blue-50 relative z-10 text-left">
 <h4 class="text-3xl font-black text-blue-950 uppercase tracking-tighter mb-10">Send us a message!</h4>
 <form class="space-y-8" @submit.prevent>
 <div class="space-y-3">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-6">Your Name</label>
 <input type="text" placeholder="Identity" class="w-full px-6 py-3 rounded-[2.5rem] bg-blue-50 border border-blue-100 text-sm font-bold focus:outline-none focus:border-indigo-600 transition-all shadow-inner" />
 </div>
 <div class="space-y-3">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-6">Your Email</label>
 <input type="email" placeholder="Communication Node" class="w-full px-6 py-3 rounded-[2.5rem] bg-blue-50 border border-blue-100 text-sm font-bold focus:outline-none focus:border-indigo-600 transition-all shadow-inner" />
 </div>
 <div class="space-y-3">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-6">Contact Number</label>
 <input type="text" placeholder="Direct Frequency" class="w-full px-6 py-3 rounded-[2.5rem] bg-blue-50 border border-blue-100 text-sm font-bold focus:outline-none focus:border-indigo-600 transition-all shadow-inner" />
 </div>
 <div class="space-y-3">
 <label class="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-6">Detailed Message</label>
 <textarea rows="5" placeholder="Operational Payload" class="w-full px-6 py-6 rounded-[3rem] bg-blue-50 border border-blue-100 text-sm font-bold focus:outline-none focus:border-indigo-600 transition-all shadow-inner resize-none"></textarea>
 </div>
 <button class="w-fit px-8 mx-auto sm:mx-0 py-6 rounded-[3rem] bg-blue-950 text-white text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-blue-950/20 hover:bg-indigo-600 transition-all hover:scale-[1.02] active:scale-[0.98]">
 SEND MESSAGE
 </button>
 </form>
 </div>
 </div>
 </div>

 <!-- REAL GOOGLE MAP INTEGRATION -->
 <div class="max-w-8xl mx-auto mt-32 rounded-3xl h-[450px] bg-blue-100 border-4 border-white shadow-2xl relative overflow-hidden group p-1">
 <iframe
 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.786433698727!2d77.36739317554161!3d28.606183075679134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefd8efec60ff%3A0x12522e70e051b683!2sJSPARK%20AI%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1773832011471!5m2!1sen!2sin"
 width="100%"
 height="100%"
 style="border:0; filter: grayscale(0.2) contrast(1.1);"
 allowfullscreen=""
 loading="lazy"
 referrerpolicy="no-referrer-when-downgrade"
 ></iframe>
 <div class="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md px-6 py-3 rounded-3xl shadow-xl flex items-center gap-4 border border-indigo-100/50">
 <div class="w-3 h-3 rounded-full bg-indigo-600 animate-ping"></div>
 <span class="text-xs font-black uppercase tracking-tighter text-blue-950">Global HQ Verified</span>
 </div>
 </div>
 </div>
</template>

<script>
import feather from 'feather-icons/dist/feather';

export default {
 name: 'ContactUs',
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
 contactInfo: [
 {i: 'phone', t: 'Support Hotline', v: '+91-9413388280'},
 {i: 'mail', t: 'Official Inquiry', v: 'info@evaclasses.com'},
 {i: 'map-pin', t: 'Regional Center', v: '5-D-21, Hudco Quarter, Bikaner'}
 ]
 }
 }
}
</script>
