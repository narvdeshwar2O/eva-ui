<template>
  <div class="template-management-screen w-full p-3 space-y-3">
    <!-- Breadcrumbs / Back navigation -->
    <div
      @click="$router.push('/test-series/exams')"
      class="inline-flex items-center gap-2 px-6 py-2 bg-white border border-slate-100 text-slate-400 rounded-xl hover:bg-[#F8FAFC] hover:text-[#0891B2] transition-all group cursor-pointer shadow-sm active:scale-95"
    >
      <i data-feather="arrow-left" class="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform"></i>
      <span class="text-[9px] font-black uppercase tracking-widest leading-none">Return to Exams</span>
    </div>

    <!-- Strategy Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-6">
        <div class="w-20 h-20 bg-gradient-to-br from-[#0891B2] to-[#0D9488] rounded-xl shadow-[0_20px_40px_rgba(8,145,178,0.3)] flex items-center justify-center text-white rotate-6 hover:rotate-0 transition-transform duration-700 group cursor-pointer">
           <i data-feather="layout" class="w-8 h-8 group-hover:scale-110 transition-transform"></i>
        </div>
        <div class="space-y-1">
          <h2 class="text-4xl font-black text-slate-800 tracking-[-3px]">Exam Template Blueprint</h2>
          <p class="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] leading-none ml-1 opacity-70">Library of Institutional Specifications V.1.0</p>
        </div>
      </div>

      <button
        @click="initializeNewTemplate"
        class="px-6 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg flex items-center gap-2"
      >
        <i data-feather="plus" class="w-3 h-3 text-white"></i>
        New Template
      </button>
    </div>

    <!-- Template Table Center -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-2xl shadow-blue-900/5 overflow-hidden mt-4">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#F1F5F9] border-b border-[#E2E8F0]">
              <th v-for="col in ['TITLE', 'PREVIEW TEXT', 'ACTIONS']" :key="col" class="px-3 py-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="template in templates" :key="template.id" class="group hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] last:border-0 font-bold">
               <td class="px-3 py-4">
                  <div class="flex items-center gap-3">
                     <div class="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-[12px] font-black shadow-sm group-hover:bg-[#0891B2] group-hover:text-white transition-all">
                        {{ template.title.charAt(0) }}
                     </div>
                     <span class="text-xs font-black text-slate-900 tracking-tight">{{ template.title }}</span>
                  </div>
               </td>
               <td class="px-3 py-4 max-w-lg">
                  <div class="text-[11px] leading-relaxed text-slate-600 font-bold group-hover:text-slate-800 transition-colors">
                     {{ template.text }}
                  </div>
               </td>
               <td class="px-3 py-4">
                  <div class="flex items-center gap-2">
                     <button @click="editTemplate(template)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-[#0891B2] hover:border-[#0891B2]/30 rounded-xl transition-all shadow-sm" title="Edit Template">
                        <i data-feather="edit-2" class="w-3.5 h-3.5"></i>
                     </button>
                     <button @click="deleteTemplate(template)" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 rounded-xl transition-all shadow-sm" title="Delete Template">
                        <i data-feather="trash-2" class="w-3.5 h-3.5"></i>
                     </button>
                  </div>
               </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Template Modal (Ref: Screenshot 3) -->
    <transition name="pop">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" @click="closeModal"></div>

          <!-- Modal Surface -->
          <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 border border-slate-100 overflow-hidden">
             <div class="h-1 w-full bg-[#0891B2]"></div>

             <div class="p-4 space-y-3">
                <div class="flex items-center justify-between">
                   <h3 class="text-xl font-black text-slate-800 tracking-tight">
                      {{ isEditing ? 'Edit Blueprint' : 'Drafting Spec' }}
                   </h3>
                   <button
                    @click="closeModal"
                    class="w-8 h-8 bg-slate-100 text-slate-400 rounded-lg hover:bg-rose-100 hover:text-rose-600 transition-all rotate-45 hover:rotate-[-45deg]"
                   >
                    <i data-feather="plus" class="w-4 h-4 mx-auto"></i>
                   </button>
                </div>

                <div class="space-y-4">
                   <div class="input-architect group">
                      <label class="block text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Title</label>
                      <div class="bg-slate-50 border border-transparent group-focus-within:border-[#0891B2] group-focus-within:bg-white rounded-lg px-3 py-2 transition-all">
                        <input v-model="currentTemplate.title" type="text" placeholder="e.g. UPSC Mains" class="w-full bg-transparent border-none outline-none font-bold text-xs text-slate-800">
                      </div>
                   </div>

                   <div class="input-architect group">
                      <label class="block text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Content</label>
                      <div class="bg-slate-50 border border-transparent group-focus-within:border-[#0891B2] group-focus-within:bg-white rounded-xl p-2 transition-all border border-slate-100">
                         <div class="flex items-center flex-wrap gap-2 pb-2 mb-2 border-b border-slate-100 opacity-60">
                            <i v-for="ico in ['bold', 'italic', 'list']" :key="ico" :data-feather="ico" class="w-3 h-3 text-slate-400"></i>
                         </div>
                         <textarea v-model="currentTemplate.text" rows="6" placeholder="Instructions..." class="w-full bg-transparent border-none outline-none font-bold text-[11px] text-slate-600 px-1 resize-none leading-normal"></textarea>
                      </div>
                   </div>
                </div>

                <div class="flex items-center justify-end pt-2 gap-4">
                   <button @click="closeModal" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors">Abort</button>
                   <button @click="saveTemplate" class="px-6 py-2 bg-[#0891B2] hover:bg-[#0D9488] text-white rounded-lg font-black text-[9px] uppercase tracking-widest shadow-lg transition-all">
                      {{ isEditing ? 'Update Blueprint' : 'Create' }}
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
  name: 'ExamTemplateList',
  data() {
    return {
      showModal: false,
      isEditing: false,
      currentTemplate: {
        id: null,
        title: '',
        text: ''
      },
      templates: [
        {
          id: 1,
          title: 'STANDARD UPSC GUIDELINES',
          text: 'PARTICULARS TO BE NOTED: Please note carefully your Name, Roll Number, Ticket Number, date, time and venue for the examination. Candidates are advised to reach 60 mins early...'
        },
        {
          id: 2,
          title: 'IIT-JEE ADVANCED CBT SOP',
          text: 'COMPUTER BASED TEST PROTOCOL: On-screen calculator usage is restricted to Section B only. Logarithmic tables will be provided digitally. Ensure active biometric matching...'
        },
        {
          id: 3,
          title: 'NEET OMR SPECIFICATIONS',
          text: 'OMR MARKING INSTRUCTIONS: Use only Black/Blue ballpoint pen. Do not use gel pens or pencils. Ensure the bubble is fully shaded. Negative marking of 1.25 applies...'
        },
        {
          id: 4,
          title: 'BANKING SPEED TEST BYLAWS',
          text: 'SECTIONAL TIMING RULES: Once a section is submitted, you cannot return to it. Digital clock will be visible at the top right. Any system malfunction must be reported...'
        }
      ]
    }
  },
  methods: {
    initializeNewTemplate() {
       this.isEditing = false;
       this.currentTemplate = { id: null, title: '', text: '' };
       this.showModal = true;
    },
    editTemplate(template) {
       this.isEditing = true;
       this.currentTemplate = { ...template };
       this.showModal = true;
    },
    closeModal() {
       this.showModal = false;
       this.isEditing = false;
       this.currentTemplate = { id: null, title: '', text: '' };
    },
    saveTemplate() {
       if (!this.currentTemplate.title || !this.currentTemplate.text) {
          alert('Please fill in all institutional requirements.');
          return;
       }

       if (this.isEditing) {
          const index = this.templates.findIndex(t => t.id === this.currentTemplate.id);
          if (index !== -1) {
             this.templates.splice(index, 1, { ...this.currentTemplate });
          }
       } else {
          this.templates.unshift({
             ...this.currentTemplate,
             id: Date.now()
          });
       }
       this.closeModal();
    },
    deleteTemplate(template) {
       if(confirm('Institutional Alert: Delete this specification blueprint permanently?')) {
          this.templates = this.templates.filter(t => t.id !== template.id);
       }
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
.template-management-screen {
  animation: fadeIn 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.pop-enter-active, .pop-leave-active {
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
.pop-enter, .pop-leave-to {
  opacity: 0;
  scale: 0.9;
}
</style>
