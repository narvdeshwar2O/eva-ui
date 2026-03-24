<template>
  <div class="create-question-screen w-full space-y-3">
    <!-- Success Toast -->
    <transition name="toast">
      <div v-if="toast.show" class="fixed top-5 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-3 bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] rounded-xl shadow-xl font-black text-xs uppercase tracking-widest">
        <i data-feather="check-circle" class="w-4 h-4"></i>
        {{ toast.message }}
      </div>
    </transition>

    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-4">
        <button 
          @click="$router.back()" 
          class="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-[#0891B2] hover:text-[#0891B2] transition-all group shadow-sm bg-white"
          title="Go Back"
        >
          <i data-feather="arrow-left" class="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"></i>
        </button>
        <div>
          <h2 class="text-xl font-black text-slate-800 tracking-tight leading-none">Question Details</h2>
          <p class="text-[10px] text-slate-500 font-black mt-1 uppercase tracking-wider">{{ questionTypeLabel }}</p>
        </div>
      </div>

      <!-- Step Tabs -->
      <div class="flex items-center gap-2">
        <button
          v-for="(step, i) in steps"
          :key="step"
          @click="goToStep(i + 1)"
          :class="[
            'flex items-center gap-2 px-5 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all',
            currentStep === i + 1
              ? 'border-[#0891B2] text-[#0891B2] bg-white shadow-sm'
              : completedSteps.includes(i + 1)
              ? 'border-[#E2E8F0] text-[#0891B2] bg-white hover:bg-[#F8FAFC]'
              : 'border-[#E2E8F0] text-slate-400 bg-white hover:bg-[#F8FAFC]'
          ]"
        >
          <span :class="[
            'w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black',
            currentStep === i + 1 ? 'bg-[#0891B2] text-white' : completedSteps.includes(i + 1) ? 'bg-[#0891B2] text-white' : 'bg-slate-200 text-slate-500'
          ]">{{ i + 1 }}</span>
          {{ step }}
        </button>
      </div>
    </div>

    <!-- Step Content Card -->
    <div class="bg-white rounded-xl border border-[#F1F5F9] shadow-xl shadow-blue-900/5">

      <!-- ── Step 1: Details ── -->
      <div v-if="currentStep === 1" class="p-8 space-y-6">
        <!-- Subject -->
        <div class="space-y-1">
          <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Subject <span class="text-rose-500">*</span></label>
          <div class="relative">
            <select v-model="form.subject" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 outline-none appearance-none focus:bg-white focus:border-[#0891B2] transition-all">
              <option value="">Select Subject</option>
              <option>English</option>
              <option>Math</option>
              <option>Science</option>
            </select>
            <i data-feather="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"></i>
          </div>
        </div>

        <!-- Question -->
        <div class="space-y-1">
          <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Question <span class="text-rose-500">*</span></label>
          <RichEditor v-model="form.question" placeholder="Enter question..." :min-height="100" />
        </div>

        <!-- Hindi Question -->
        <div v-if="form.language === 'hindi'" class="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
          <label class="block text-[10px] font-black text-[#0891B2] uppercase tracking-widest ml-1 bg-[#0891B2]/5 w-fit px-2 py-0.5 rounded-md">Hindi Question <span class="text-rose-500">*</span></label>
          <RichEditor v-model="form.questionHindi" placeholder="Enter question in Hindi..." :min-height="100" />
        </div>

        <!-- Language -->
        <div class="flex items-center gap-4">
          <span class="text-sm font-bold text-slate-700">Select Language</span>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="form.language" value="english" class="w-4 h-4 accent-[#0891B2]">
            <span class="text-sm font-bold text-slate-700">English</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" v-model="form.language" value="hindi" class="w-4 h-4 accent-[#0891B2]">
            <span class="text-sm font-bold text-slate-700">Hindi</span>
          </label>
        </div>

        <!-- MCSA/MCMA Options -->
        <template v-if="['mcsa', 'mcma'].includes(questionType)">
          <div v-for="(option, idx) in form.options" :key="idx" class="border border-[#EDF2F7] rounded-xl overflow-hidden bg-[#F0FFF4]">
            <div class="px-4 py-2 bg-[#F0FFF4] border-b border-[#EDF2F7] flex items-center justify-between">
              <span class="text-sm font-black text-slate-700">Option {{ idx + 1 }}</span>
              <button v-if="idx >= 2" @click="removeOption(idx)" class="px-3 py-1 bg-rose-500 text-white rounded-lg text-[10px] font-black uppercase">Remove</button>
            </div>
            <div class="p-4 space-y-3">
              <RichEditor v-model="option.text" :placeholder="`Option ${idx + 1}...`" :min-height="80" />
              
              <!-- Hindi Option -->
              <div v-if="showHindiOptions" class="space-y-1 mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <label class="block text-[9px] font-black text-[#0891B2] uppercase tracking-widest ml-0.5">Hindi Option {{ idx + 1 }}</label>
                <RichEditor v-model="option.textHindi" :placeholder="`Enter option ${idx + 1} in Hindi...`" :min-height="80" />
              </div>

              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  :type="questionType === 'mcsa' ? 'radio' : 'checkbox'"
                  :name="questionType === 'mcsa' ? 'correct' : 'correct-' + idx"
                  :value="idx"
                  v-model="option.isCorrect"
                  class="w-4 h-4 accent-[#0891B2]"
                >
                <span class="text-sm font-bold text-slate-700">Correct Answer</span>
              </label>
            </div>
          </div>
          
          <button @click="addOption" class="w-full py-3 border-2 border-dashed border-[#0891B2] text-[#0891B2] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F0F9FF] transition-all">
            + Add Option
          </button>
          
          <button 
            v-if="form.language === 'hindi'" 
            @click="showHindiOptions = !showHindiOptions" 
            :class="[
              'w-full mt-3 py-3 border-2 border-dashed rounded-xl font-black text-[10px] uppercase tracking-widest transition-all',
              showHindiOptions ? 'border-rose-300 text-rose-500 hover:bg-rose-50' : 'border-[#0891B2] text-[#0891B2] hover:bg-[#F0F9FF]'
            ]"
          >
            {{ showHindiOptions ? '- Remove Hindi Option' : '+ Add Hindi Option' }}
          </button>
        </template>

        <!-- True/False -->
        <template v-if="questionType === 'true-false'">
          <div class="border border-[#EDF2F7] rounded-xl overflow-hidden bg-[#F0FFF4]">
            <div class="px-4 py-2 bg-[#F0FFF4] border-b border-[#EDF2F7]">
              <span class="text-sm font-black text-slate-700">Option 1</span>
            </div>
            <div class="p-4 space-y-3">
              <div class="bg-white border border-[#EDF2F7] rounded-lg px-4 py-2 text-sm font-bold text-slate-800">True</div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="tf-correct" value="true" v-model="form.trueFalseAnswer" class="w-4 h-4 accent-[#0891B2]">
                <span class="text-sm font-bold text-slate-700">Correct Answer</span>
              </label>
            </div>
          </div>
          <div class="border border-[#EDF2F7] rounded-xl overflow-hidden bg-[#F0FFF4]">
            <div class="px-4 py-2 bg-[#F0FFF4] border-b border-[#EDF2F7]">
              <span class="text-sm font-black text-slate-700">Option 2</span>
            </div>
            <div class="p-4 space-y-3">
              <div class="bg-white border border-[#EDF2F7] rounded-lg px-4 py-2 text-sm font-bold text-slate-800">False</div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="tf-correct" value="false" v-model="form.trueFalseAnswer" class="w-4 h-4 accent-[#0891B2]">
                <span class="text-sm font-bold text-slate-700">Correct Answer</span>
              </label>
            </div>
          </div>
        </template>

        <!-- Short Answer -->
        <template v-if="questionType === 'short-answer'">
          <div v-for="(answer, idx) in form.acceptableAnswers" :key="idx" class="border border-[#EDF2F7] rounded-xl overflow-hidden bg-[#F0FFF4]">
            <div class="px-4 py-2 bg-[#F0FFF4] border-b border-[#EDF2F7] flex items-center justify-between">
              <span class="text-sm font-black text-slate-700">Acceptable Answer {{ idx + 1 }}</span>
              <button v-if="idx >= 1" @click="removeAnswer(idx)" class="px-3 py-1 bg-rose-500 text-white rounded-lg text-[10px] font-black uppercase">Remove</button>
            </div>
            <div class="p-4 space-y-3">
              <input v-model="answer.text" type="text" class="w-full bg-white border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-[#0891B2] outline-none transition-all" placeholder="Enter acceptable answer...">
              <input v-if="showHindiOptions" v-model="answer.textHindi" type="text" class="w-full bg-white border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:border-[#0891B2] outline-none transition-all mt-2" placeholder="Enter answer in Hindi...">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="exact-answer" :value="idx" v-model="form.exactAnswer" class="w-4 h-4 accent-[#0891B2]">
                <span class="text-sm font-bold text-slate-700">Exact Answer</span>
              </label>
            </div>
          </div>
          <button @click="addAnswer" class="w-full py-3 border-2 border-dashed border-[#0891B2] text-[#0891B2] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F0F9FF] transition-all">
            + Add Option
          </button>
          <button v-if="form.language === 'hindi'" @click="showHindiOptions = !showHindiOptions" class="w-full mt-3 py-3 border-2 border-dashed border-[#0891B2] text-[#0891B2] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F0F9FF] transition-all">
            {{ showHindiOptions ? '- Remove Hindi Option' : '+ Add Hindi Option' }}
          </button>
        </template>

        <!-- Match the Following -->
        <template v-if="questionType === 'match'">
          <div class="bg-[#F0FFF4] border border-[#A7F3D0] rounded-xl p-4">
            <div class="flex items-start gap-2">
              <i data-feather="info" class="w-4 h-4 text-[#0891B2] mt-0.5"></i>
              <p class="text-[11px] text-slate-600 font-bold">Note: Enter pairs in correct order. Pairs will automatically shuffle while showing to users.</p>
            </div>
          </div>
          <div v-for="(pair, idx) in form.pairs" :key="idx" class="border border-[#EDF2F7] rounded-xl overflow-hidden bg-[#F0FFF4]">
            <div class="px-4 py-2 bg-[#F0FFF4] border-b border-[#EDF2F7] flex items-center justify-between">
              <span class="text-sm font-black text-slate-700">Pair {{ idx + 1 }}</span>
              <button v-if="idx >= 2" @click="removePair(idx)" class="px-3 py-1 bg-rose-500 text-white rounded-lg text-[10px] font-black uppercase">Remove</button>
            </div>
            <div class="p-4 grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <RichEditor v-model="pair.left" placeholder="Left side..." :min-height="60" />
                <RichEditor v-if="showHindiOptions" v-model="pair.leftHindi" placeholder="Left side (Hindi)..." :min-height="60" />
              </div>
              <div class="space-y-2">
                <RichEditor v-model="pair.right" placeholder="Right side..." :min-height="60" />
                <RichEditor v-if="showHindiOptions" v-model="pair.rightHindi" placeholder="Right side (Hindi)..." :min-height="60" />
              </div>
            </div>
          </div>
          <button @click="addPair" class="w-full py-3 border-2 border-dashed border-[#0891B2] text-[#0891B2] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F0F9FF] transition-all">
            + Add Pair
          </button>
          <button v-if="form.language === 'hindi'" @click="showHindiOptions = !showHindiOptions" class="w-full mt-3 py-3 border-2 border-dashed border-[#0891B2] text-[#0891B2] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F0F9FF] transition-all">
            {{ showHindiOptions ? '- Remove Hindi Option' : '+ Add Hindi Option' }}
          </button>
        </template>

        <!-- Ordering/Sequence -->
        <template v-if="questionType === 'ordering'">
          <div class="bg-[#F0FFF4] border border-[#A7F3D0] rounded-xl p-4">
            <div class="flex items-start gap-2">
              <i data-feather="info" class="w-4 h-4 text-[#0891B2] mt-0.5"></i>
              <p class="text-[11px] text-slate-600 font-bold">Note: Enter items in correct order. Items will automatically shuffle while showing to users.</p>
            </div>
          </div>
          <div v-for="(item, idx) in form.sequenceItems" :key="idx" class="border border-[#EDF2F7] rounded-xl overflow-hidden bg-[#F0FFF4]">
            <div class="px-4 py-2 bg-[#F0FFF4] border-b border-[#EDF2F7] flex items-center justify-between">
              <span class="text-sm font-black text-slate-700">Sequence Item {{ idx + 1 }}</span>
              <button v-if="idx >= 2" @click="removeSequenceItem(idx)" class="px-3 py-1 bg-rose-500 text-white rounded-lg text-[10px] font-black uppercase">Remove</button>
            </div>
            <div class="p-4 space-y-2">
              <RichEditor v-model="item.text" placeholder="Enter item..." :min-height="60" />
              <RichEditor v-if="showHindiOptions" v-model="item.textHindi" placeholder="Enter item in Hindi..." :min-height="60" />
            </div>
          </div>
          <button @click="addSequenceItem" class="w-full py-3 border-2 border-dashed border-[#0891B2] text-[#0891B2] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F0F9FF] transition-all">
            + Add Item
          </button>
          <button v-if="form.language === 'hindi'" @click="showHindiOptions = !showHindiOptions" class="w-full mt-3 py-3 border-2 border-dashed border-[#0891B2] text-[#0891B2] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#F0F9FF] transition-all">
            {{ showHindiOptions ? '- Remove Hindi Option' : '+ Add Hindi Option' }}
          </button>
        </template>

        <!-- Fill in the Blanks -->
        <template v-if="questionType === 'fill-blanks'">
          <div class="bg-[#F0FFF4] border border-[#A7F3D0] rounded-xl p-4 space-y-2">
            <div class="flex items-start gap-2">
              <i data-feather="info" class="w-4 h-4 text-[#0891B2] mt-0.5"></i>
              <p class="text-[11px] text-slate-600 font-bold">Wrap the word or words you wish to make a blank with ##(DOUBLE HASH). E.g. ##BLANK_ITEM##. The system will automatically convert them to empty blanks, and users will be provided with text boxes to enter their responses.</p>
            </div>
          </div>
        </template>

        <!-- Footer -->
        <div class="flex justify-end pt-4 border-t border-[#F1F5F9]">
          <button @click="saveAndProceed(1)" class="px-8 py-2.5 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg">
            Save & Next
          </button>
        </div>
      </div>

      <!-- ── Step 2: Solution ── -->
      <div v-if="currentStep === 2" class="p-8 space-y-6">
        <!-- Solution -->
        <div class="space-y-1">
          <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Solution</label>
          <RichEditor v-model="form.solution" placeholder="Enter solution..." :min-height="120" />
        </div>

        <!-- Enable Solution Video -->
        <div class="flex items-center justify-between bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-5 py-4">
          <div>
            <p class="text-sm font-black text-slate-700">Enable Solution Video</p>
          </div>
          <div class="flex rounded-lg overflow-hidden border border-[#E2E8F0]">
            <button @click="form.enableVideo = true" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', form.enableVideo ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">Yes</button>
            <button @click="form.enableVideo = false" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', !form.enableVideo ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">No</button>
          </div>
        </div>

        <!-- Hint -->
        <div class="space-y-1">
          <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Hint</label>
          <RichEditor v-model="form.hint" placeholder="Enter hint..." :min-height="100" />
        </div>

        <!-- Solution Hindi -->
        <div class="space-y-1">
          <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Solution Hindi</label>
          <RichEditor v-model="form.solutionHindi" placeholder="Enter solution in Hindi..." :min-height="120" />
        </div>

        <!-- Footer -->
        <div class="flex justify-end pt-4 border-t border-[#F1F5F9]">
          <button @click="saveAndProceed(2)" class="px-8 py-2.5 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg">
            Save & Next
          </button>
        </div>
      </div>

      <!-- ── Step 3: Attachment ── -->
      <div v-if="currentStep === 3" class="p-8 space-y-6">
        <!-- Enable Question Attachment -->
        <div class="flex items-center justify-between bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-5 py-4">
          <div>
            <p class="text-sm font-black text-slate-700">Enable Question Attachment</p>
          </div>
          <div class="flex rounded-lg overflow-hidden border border-[#E2E8F0]">
            <button @click="form.enableAttachment = true" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', form.enableAttachment ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">Yes</button>
            <button @click="form.enableAttachment = false" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', !form.enableAttachment ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">No</button>
          </div>
        </div>

        <!-- Attachment Type -->
        <div v-if="form.enableAttachment" class="space-y-3">
          <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Attachment Type</label>
          <div class="flex items-center gap-6">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="form.attachmentType" value="comprehension" class="w-4 h-4 accent-[#0891B2]">
              <span class="text-sm font-bold text-slate-700">Comprehension Passage</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="form.attachmentType" value="audio" class="w-4 h-4 accent-[#0891B2]">
              <span class="text-sm font-bold text-slate-700">Audio</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" v-model="form.attachmentType" value="video" class="w-4 h-4 accent-[#0891B2]">
              <span class="text-sm font-bold text-slate-700">Video</span>
            </label>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end pt-4 border-t border-[#F1F5F9]">
          <button @click="saveAndProceed(3)" class="px-8 py-2.5 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg">
            Update
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';
import RichEditor from '@/components/RichEditor.vue';

export default {
  name: 'CreateQuestion',
  components: { RichEditor },
  data() {
    return {
      currentStep: 1,
      completedSteps: [],
      showHindiOptions: false,
      steps: ['Details', 'Solution', 'Attachment'],
      toast: { show: false, message: '' },
      questionType: this.$route.query.type || 'mcsa',
      form: {
        subject: '',
        question: '',
        questionHindi: '',
        language: 'english',
        options: [
          { text: '', textHindi: '', isCorrect: false },
          { text: '', textHindi: '', isCorrect: false }
        ],
        trueFalseAnswer: '',
        acceptableAnswers: [{ text: '', textHindi: '', isCorrect: false }],
        exactAnswer: 0,
        pairs: [
          { left: '', leftHindi: '', right: '', rightHindi: '' },
          { left: '', leftHindi: '', right: '', rightHindi: '' }
        ],
        sequenceItems: [
          { text: '', textHindi: '' },
          { text: '', textHindi: '' }
        ],
        solution: '',
        enableVideo: false,
        hint: '',
        solutionHindi: '',
        enableAttachment: false,
        attachmentType: 'comprehension'
      }
    };
  },
  computed: {
    questionTypeLabel() {
      const labels = {
        'mcsa': 'Multiple Choice Single Answer Question',
        'mcma': 'Multiple Choice Multiple Answers Question',
        'true-false': 'True or False Question',
        'short-answer': 'Short Answer Question',
        'match': 'Match the Following Question',
        'ordering': 'Ordering/Sequence Question',
        'fill-blanks': 'Fill in the Blanks Question'
      };
      return labels[this.questionType] || 'Question Details';
    }
  },
  watch: {
    'form.language'(val) {
      if (val === 'english') {
        this.showHindiOptions = false;
      }
    }
  },
  methods: {
    goToStep(step) {
      if (step <= this.currentStep || this.completedSteps.includes(step - 1) || step === 1) {
        this.currentStep = step;
      }
    },
    saveAndProceed(step) {
      if (!this.completedSteps.includes(step)) {
        this.completedSteps.push(step);
      }
      const messages = ['Question details saved!', 'Solution saved!', 'Attachment settings saved!'];
      this.showToast(messages[step - 1]);
      if (step < 3) {
        this.currentStep = step + 1;
      }
    },
    showToast(message) {
      this.toast = { show: true, message };
      setTimeout(() => { this.toast.show = false; }, 3000);
    },
    addOption() {
      this.form.options.push({ text: '', textHindi: '', isCorrect: false });
    },
    removeOption(idx) {
      this.form.options.splice(idx, 1);
    },
    addAnswer() {
      this.form.acceptableAnswers.push({ text: '', textHindi: '', isCorrect: false });
    },
    removeAnswer(idx) {
      this.form.acceptableAnswers.splice(idx, 1);
    },
    addPair() {
      this.form.pairs.push({ left: '', leftHindi: '', right: '', rightHindi: '' });
    },
    removePair(idx) {
      this.form.pairs.splice(idx, 1);
    },
    addSequenceItem() {
      this.form.sequenceItems.push({ text: '', textHindi: '' });
    },
    removeSequenceItem(idx) {
      this.form.sequenceItems.splice(idx, 1);
    }
  },
  mounted() {
    feather.replace();
  },
  updated() {
    feather.replace();
  }
};
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter, .toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-12px);
}
</style>
