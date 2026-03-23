<template>
  <div class="create-quiz-screen w-full space-y-3">
    <!-- Success Toast -->
    <transition name="toast">
      <div v-if="toast.show" class="fixed top-5 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-3 bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] rounded-xl shadow-xl font-black text-xs uppercase tracking-widest">
        <i data-feather="check-circle" class="w-4 h-4"></i>
        {{ toast.message }}
      </div>
    </transition>

    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <h2 class="text-xl font-black text-slate-800 tracking-tight leading-none">{{ isEditMode ? 'Edit Quiz' : 'Quiz Details' }}</h2>
        <p class="text-[10px] text-[#0891B2] font-black mt-1 cursor-pointer hover:underline" @click="$router.push('/test-series/quizzes')">
          {{ isEditMode ? form.title || 'Quiz' : 'New Quiz' }}
        </p>
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
        <!-- Title -->
        <div class="space-y-1">
          <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Title <span class="text-rose-500">*</span></label>
          <input v-model="form.title" type="text" placeholder="Demo Quiz" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all">
        </div>

        <!-- Sub Category + Quiz Type -->
        <div class="grid grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Sub Category <span class="text-rose-500">*</span></label>
            <div class="relative">
              <select v-model="form.subCategory" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 outline-none appearance-none focus:bg-white focus:border-[#0891B2] transition-all">
                <option value="">Select Sub Category</option>
                <option>English Sub Category (English Category)</option>
                <option>Math Sub Category (Math Category)</option>
                <option>Science Sub Category (Science Category)</option>
              </select>
              <i data-feather="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"></i>
            </div>
            <button v-if="form.subCategory" @click="form.subCategory = ''" class="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors"></button>
          </div>
          <div class="space-y-1">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Quiz Type</label>
            <div class="relative">
              <select v-model="form.quizType" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 outline-none appearance-none focus:bg-white focus:border-[#0891B2] transition-all">
                <option value="">Select Quiz Type</option>
                <option>Quiz</option>
                <option>Practice</option>
                <option>Mock Test</option>
              </select>
              <i data-feather="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"></i>
            </div>
          </div>
        </div>

        <!-- Free toggle -->
        <div class="flex items-center justify-between bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-5 py-4">
          <div>
            <p class="text-sm font-black text-slate-700">Free</p>
            <p class="text-[10px] text-slate-400 font-bold mt-0.5">Paid (Accessible to only paid users). Free (Anyone can access).</p>
          </div>
          <div
            @click="form.free = !form.free"
            :class="['w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-300 relative shadow-inner', form.free ? 'bg-[#0891B2]' : 'bg-slate-300']"
          >
            <div class="bg-white w-5 h-5 rounded-full shadow-lg transition-all duration-300 transform" :class="form.free ? 'translate-x-7' : 'translate-x-0'"></div>
          </div>
        </div>

        <!-- Description -->
        <div class="space-y-1">
          <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Description</label>
          <div class="border border-[#EDF2F7] rounded-xl overflow-hidden focus-within:border-[#0891B2] focus-within:ring-4 focus-within:ring-[#0891B2]/10 transition-all">
            <!-- Toolbar -->
            <div class="flex items-center gap-0.5 px-3 py-2 bg-[#F8FAFC] border-b border-[#EDF2F7] flex-wrap">
              <template v-for="tool in descTools">
                <div v-if="tool.type === 'divider'" :key="tool.id" class="w-px h-5 bg-slate-200 mx-1"></div>
                <button
                  v-else
                  :key="tool.cmd + tool.value"
                  @mousedown.prevent="execFormat(tool.cmd, tool.value)"
                  :title="tool.label"
                  :class="[
                    'w-7 h-7 flex items-center justify-center rounded-lg transition-colors',
                    activeFormats[tool.cmd]
                      ? 'bg-[#0891B2] text-white'
                      : 'text-slate-500 hover:bg-[#0891B2]/10 hover:text-[#0891B2]'
                  ]"
                >
                  <i v-if="tool.icon" :data-feather="tool.icon" class="w-3.5 h-3.5"></i>
                  <span v-else class="text-xs font-black leading-none" v-html="tool.label"></span>
                </button>
              </template>
            </div>
            <!-- Contenteditable editor -->
            <div
              ref="editor"
              contenteditable="true"
              @input="onDescInput"
              class="rich-editor w-full min-h-[144px] bg-white px-4 py-3 text-sm text-slate-800 outline-none"
              :data-placeholder="form.description ? '' : 'Enter quiz description...'"
            ></div>
          </div>
        </div>

        <!-- Visibility toggle -->
        <div class="flex items-center justify-between bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-5 py-4">
          <div>
            <p class="text-sm font-black text-slate-700">Visibility - {{ form.visibility ? 'Public' : 'Private' }}</p>
            <p class="text-[10px] text-slate-400 font-bold mt-0.5">Private (Only scheduled user groups can access). Public (Anyone can access).</p>
          </div>
          <div
            @click="form.visibility = !form.visibility"
            :class="['w-14 h-7 rounded-full p-1 cursor-pointer transition-all duration-300 relative shadow-inner', form.visibility ? 'bg-[#0891B2]' : 'bg-slate-300']"
          >
            <div class="bg-white w-5 h-5 rounded-full shadow-lg transition-all duration-300 transform" :class="form.visibility ? 'translate-x-7' : 'translate-x-0'"></div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end pt-2">
          <button @click="saveAndProceed(1)" class="px-8 py-2.5 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0891B2]/20">
            Save &amp; Proceed
          </button>
        </div>
      </div>

      <!-- ── Step 2: Settings ── -->
      <div v-if="currentStep === 2" class="p-8 space-y-6">
        <div class="grid grid-cols-2 gap-x-16 gap-y-6">
          <!-- Left Column -->
          <div class="space-y-5">
            <!-- Duration Mode -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-sm font-black text-slate-700">Duration Mode</span>
                <div class="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] text-slate-500 font-black cursor-help" title="Auto calculates based on questions, Manual lets you set a fixed time">?</div>
              </div>
              <div class="flex rounded-lg overflow-hidden border border-[#E2E8F0]">
                <button @click="settings.durationMode = 'Auto'" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', settings.durationMode === 'Auto' ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">Auto</button>
                <button @click="settings.durationMode = 'Manual'" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', settings.durationMode === 'Manual' ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">Manual</button>
              </div>
            </div>

            <!-- Marks/Points Mode -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-sm font-black text-slate-700">Marks/Points Mode</span>
                <div class="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] text-slate-500 font-black cursor-help" title="Auto uses question marks, Manual lets you set custom marks">?</div>
              </div>
              <div class="flex rounded-lg overflow-hidden border border-[#E2E8F0]">
                <button @click="settings.marksMode = 'Auto'" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', settings.marksMode === 'Auto' ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">Auto</button>
                <button @click="settings.marksMode = 'Manual'" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', settings.marksMode === 'Manual' ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">Manual</button>
              </div>
            </div>

            <!-- Negative Marking -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-sm font-black text-slate-700">Negative Marking</span>
                <div class="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] text-slate-500 font-black cursor-help" title="Deduct marks for wrong answers">?</div>
              </div>
              <div class="flex rounded-lg overflow-hidden border border-[#E2E8F0]">
                <button @click="settings.negativeMarking = true" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', settings.negativeMarking ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">Yes</button>
                <button @click="settings.negativeMarking = false" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', !settings.negativeMarking ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">No</button>
              </div>
            </div>

            <!-- Pass Percentage -->
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <label class="text-sm font-black text-slate-700">Pass Percentage <span class="text-rose-500">*</span></label>
              </div>
              <input v-model="settings.passPercentage" type="text" placeholder="60 %" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#0891B2] outline-none transition-all">
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-5">
            <div v-for="setting in rightSettings" :key="setting.key" class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-sm font-black text-slate-700">{{ setting.label }}</span>
                <div class="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] text-slate-500 font-black cursor-help" :title="setting.hint">?</div>
              </div>
              <div class="flex rounded-lg overflow-hidden border border-[#E2E8F0]">
                <button @click="settings[setting.key] = true" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', settings[setting.key] ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">Yes</button>
                <button @click="settings[setting.key] = false" :class="['px-4 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all', !settings[setting.key] ? 'bg-[#0891B2] text-white' : 'bg-white text-slate-500 hover:bg-slate-50']">No</button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-[#F1F5F9]">
          <button @click="saveAndProceed(2)" class="px-8 py-2.5 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0891B2]/20">
            Update
          </button>
        </div>
      </div>

      <!-- ── Step 3: Questions ── -->
      <div v-if="currentStep === 3" class="flex min-h-[560px]">
        <!-- Filters Panel -->
        <div class="w-72 border-r border-[#F1F5F9] p-6 space-y-4 shrink-0">
          <div class="flex items-center gap-2 text-slate-700 font-black text-sm">
            <i data-feather="filter" class="w-4 h-4"></i>
            Filters
          </div>

          <!-- Code -->
          <div class="space-y-1">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Code</label>
            <input v-model="qFilter.code" type="text" placeholder="Enter Code" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[11px] font-bold text-slate-700 focus:bg-white focus:border-[#0891B2] outline-none transition-all">
          </div>

          <!-- Type -->
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</label>
            <div v-for="t in questionTypes" :key="t" class="flex items-center gap-2">
              <input type="checkbox" :id="t" :value="t" v-model="qFilter.types" class="w-3.5 h-3.5 accent-[#0891B2] cursor-pointer">
              <label :for="t" class="text-[11px] font-bold text-slate-600 cursor-pointer">{{ t }}</label>
            </div>
          </div>

          <!-- Section -->
          <div class="space-y-1">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Section</label>
            <input v-model="qFilter.section" type="text" placeholder="Enter Section" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[11px] font-bold text-slate-700 focus:bg-white focus:border-[#0891B2] outline-none transition-all">
          </div>

          <!-- Subject -->
          <div class="space-y-1">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</label>
            <input v-model="qFilter.subject" type="text" placeholder="Enter Skill" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[11px] font-bold text-slate-700 focus:bg-white focus:border-[#0891B2] outline-none transition-all">
          </div>

          <!-- Topic -->
          <div class="space-y-1">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Topic</label>
            <input v-model="qFilter.topic" type="text" placeholder="Enter Topic" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[11px] font-bold text-slate-700 focus:bg-white focus:border-[#0891B2] outline-none transition-all">
          </div>

          <!-- By Tag -->
          <div class="space-y-1">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">By Tag</label>
            <div class="relative">
              <select v-model="qFilter.tag" class="w-full bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl px-3 py-2 text-[11px] font-bold text-slate-700 outline-none appearance-none focus:bg-white focus:border-[#0891B2] transition-all">
                <option value=""></option>
                <option>Tag 1</option>
                <option>Tag 2</option>
              </select>
              <i data-feather="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none"></i>
            </div>
          </div>

          <!-- Difficulty -->
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Difficulty Level</label>
            <div v-for="d in difficultyLevels" :key="d" class="flex items-center gap-2">
              <input type="checkbox" :id="d" :value="d" v-model="qFilter.difficulty" class="w-3.5 h-3.5 accent-[#0891B2] cursor-pointer">
              <label :for="d" class="text-[11px] font-bold text-slate-600 cursor-pointer">{{ d }}</label>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex items-center gap-2 pt-2">
            <button @click="resetFilters" class="flex-1 py-2 bg-[#CCF1F6] text-[#0891B2] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#A5E8F0] transition-all">Reset</button>
            <button @click="searchQuestions" class="flex-1 py-2 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all">Search</button>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="flex-1 p-6 space-y-4">
          <div class="bg-[#F0FFF4] border border-[#A7F3D0] rounded-xl p-4">
            <p class="text-[11px] font-black text-slate-700 uppercase tracking-widest mb-2">
              {{ addingMode ? 'Currently Adding Questions' : 'Currently Viewing Questions' }}
            </p>
            <div class="flex items-center gap-2">
              <button @click="addingMode = false" :class="['text-[11px] font-black transition-colors', !addingMode ? 'text-[#0891B2] underline' : 'text-slate-500 hover:text-[#0891B2]']">View Questions</button>
              <span class="text-slate-300 font-bold">|</span>
              <button @click="addingMode = true" :class="['text-[11px] font-black transition-colors', addingMode ? 'text-[#0891B2] underline' : 'text-slate-500 hover:text-[#0891B2]']">Add Questions</button>
            </div>
          </div>

          <!-- VIEW MODE: show already-added questions -->
          <template v-if="!addingMode">
            <div v-if="addedQuestions.length === 0" class="flex flex-col items-center justify-center py-16 text-slate-400">
              <i data-feather="inbox" class="w-10 h-10 mb-3 opacity-30"></i>
              <p class="text-xs font-black uppercase tracking-widest">No Questions Added Yet</p>
              <p class="text-[10px] font-bold mt-1 opacity-60">Switch to Add Questions to search and add.</p>
            </div>
            <div v-else class="space-y-2">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ addedQuestions.length }} question(s) in this quiz</p>
              <div v-for="(q, idx) in addedQuestions" :key="q.id" class="flex items-center justify-between px-4 py-3 bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl">
                <div class="flex items-center gap-3">
                  <span class="text-[10px] font-black text-slate-400">Q{{ idx + 1 }}</span>
                  <div>
                    <span class="text-[10px] font-black text-[#0891B2] uppercase tracking-widest mr-2">{{ q.type }}</span>
                    <span class="text-sm font-bold text-slate-700">{{ q.text }}</span>
                  </div>
                </div>
                <button @click="removeQuestion(q)" class="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors">
                  <i data-feather="x" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>
          </template>

          <!-- ADD MODE: show search results -->
          <template v-if="addingMode">
            <div v-if="!searched" class="flex flex-col items-center justify-center py-16 text-slate-400">
              <i data-feather="search" class="w-10 h-10 mb-3 opacity-30"></i>
              <p class="text-xs font-black uppercase tracking-widest">Use filters and click Search</p>
            </div>
            <div v-else-if="questionResults.length === 0" class="flex flex-col items-center justify-center py-16 text-slate-400">
              <i data-feather="inbox" class="w-10 h-10 mb-3 opacity-30"></i>
              <p class="text-xs font-black uppercase tracking-widest">0 items found for the selected criteria.</p>
            </div>
            <div v-else class="space-y-2">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ questionResults.length }} item(s) found</p>
              <div v-for="q in questionResults" :key="q.id" class="flex items-center justify-between px-4 py-3 bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl">
                <div>
                  <span class="text-[10px] font-black text-[#0891B2] uppercase tracking-widest mr-3">{{ q.type }}</span>
                  <span class="text-sm font-bold text-slate-700">{{ q.text }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-[9px] font-black text-slate-400 uppercase">Quiz Id: {{ q.quizId }}</span>
                  <button
                    @click="addQuestion(q)"
                    :disabled="isAdded(q.id)"
                    :class="['px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all', isAdded(q.id) ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-[#0891B2] text-white hover:bg-[#0D9488]']"
                  >{{ isAdded(q.id) ? 'Added' : 'Add' }}</button>
                </div>
              </div>
              <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center pt-2">No more data found for the selected criteria.</p>
            </div>
          </template>
        </div>
      </div>

      <!-- ── Step 4: Schedules ── -->
      <div v-if="currentStep === 4" class="p-8">
        <div class="flex flex-col items-center justify-center py-20 text-slate-400">
          <i data-feather="calendar" class="w-12 h-12 mb-4 text-[#0891B2] opacity-40"></i>
          <h3 class="text-sm font-black text-slate-600 uppercase tracking-widest mb-2">Schedule Management</h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center max-w-xs">Configure access windows, assign user groups, and set date-time restrictions for this quiz.</p>
          <button class="mt-6 px-6 py-2.5 bg-[#0891B2] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-lg shadow-[#0891B2]/20 flex items-center gap-2">
            <i data-feather="plus-circle" class="w-3.5 h-3.5"></i>
            Add Schedule
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'CreateQuiz',
  data() {
    return {
      currentStep: 1,
      completedSteps: [],
      steps: ['Details', 'Settings', 'Questions', 'Schedules'],
      toast: { show: false, message: '' },
      activeFormats: {},
      addingMode: false,
      searched: false,
      descTools: [
        { cmd: 'bold',                label: '<b>B</b>',       icon: null },
        { cmd: 'italic',              label: '<i>I</i>',       icon: null },
        { cmd: 'underline',           label: '<u>U</u>',       icon: null },
        { cmd: 'strikeThrough',       label: '<s>S</s>',       icon: null },
        { type: 'divider', id: 'd1' },
        { cmd: 'superscript',         label: 'X²',             icon: null },
        { cmd: 'subscript',           label: 'X₂',             icon: null },
        { type: 'divider', id: 'd2' },
        { cmd: 'insertOrderedList',   label: 'Ordered list',   icon: 'list' },
        { cmd: 'insertUnorderedList', label: 'Unordered list', icon: 'align-justify' },
        { type: 'divider', id: 'd3' },
        { cmd: 'justifyLeft',         label: 'Align left',     icon: 'align-left' },
        { cmd: 'justifyCenter',       label: 'Align center',   icon: 'align-center' },
        { cmd: 'justifyRight',        label: 'Align right',    icon: 'align-right' },
        { type: 'divider', id: 'd4' },
        { cmd: 'removeFormat',        label: 'Clear format',   icon: 'x' },
      ],
      questionTypes: [
        'Multiple Choice Single Answer',
        'Multiple Choice Multiple Answers',
        'True or False',
        'Short Answer',
        'Match the Following',
        'Ordering/Sequence',
        'Fill in the Blanks'
      ],
      difficultyLevels: ['Very Easy', 'Easy', 'Medium', 'High', 'Very High'],
      rightSettings: [
        { key: 'shuffleQuestions',    label: 'Shuffle Questions',        hint: 'Randomize question order for each attempt' },
        { key: 'restrictAttempts',    label: 'Restrict Attempts',        hint: 'Limit the number of times a user can attempt this quiz' },
        { key: 'disableFinishButton', label: 'Disable Finish Button',    hint: 'Prevent users from finishing early' },
        { key: 'enableQuestionList',  label: 'Enable Question List View', hint: 'Show question navigator panel during quiz' },
        { key: 'hideSolutions',       label: 'Hide Solutions',           hint: 'Hide correct answers after quiz completion' },
        { key: 'showLeaderboard',     label: 'Show Leaderboard',         hint: 'Display a leaderboard after completion' }
      ],
      form: {
        title: '',
        subCategory: '',
        quizType: '',
        free: false,
        description: '',
        visibility: false
      },
      settings: {
        durationMode: 'Auto',
        marksMode: 'Auto',
        negativeMarking: false,
        passPercentage: '60 %',
        shuffleQuestions: false,
        restrictAttempts: false,
        disableFinishButton: false,
        enableQuestionList: true,
        hideSolutions: false,
        showLeaderboard: true
      },
      qFilter: {
        code: '', types: [], section: '', subject: '', topic: '', tag: '', difficulty: []
      },
      questionResults: [],
      addedQuestions: []
    };
  },
  computed: {
    isEditMode() {
      return !!this.$route.params.id;
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
      const messages = ['Quiz was successfully added!', 'Quiz Settings Successfully Updated.', 'Questions saved.', 'Schedules saved.'];
      this.showToast(messages[step - 1]);
      this.currentStep = step + 1;
    },
    showToast(message) {
      this.toast = { show: true, message };
      setTimeout(() => { this.toast.show = false; }, 3000);
    },
    execFormat(cmd, value) {
      const editor = this.$refs.editor;
      if (!editor) return;

      editor.focus();

      const sel = window.getSelection();
      if (!sel.rangeCount || !editor.contains(sel.anchorNode)) {
        const range = document.createRange();
        range.selectNodeContents(editor);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      document.execCommand(cmd, false, value || null);
      this.form.description = editor.innerHTML;
      this.updateActiveFormats();
    },
    onDescInput() {
      this.form.description = this.$refs.editor ? this.$refs.editor.innerHTML : '';
      this.updateActiveFormats();
    },
    updateActiveFormats() {
      const cmds = ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript',
                    'insertOrderedList', 'insertUnorderedList', 'justifyLeft', 'justifyCenter', 'justifyRight'];
      const next = {};
      cmds.forEach(cmd => { next[cmd] = document.queryCommandState(cmd); });
      this.activeFormats = next;
    },
    resetFilters() {
      this.qFilter = { code: '', types: [], section: '', subject: '', topic: '', tag: '', difficulty: [] };
      this.questionResults = [];
      this.searched = false;
    },
    searchQuestions() {
      this.searched = true;
      this.addingMode = true;
      // Mock question bank — in production this calls an API with qFilter params
      const allQuestions = [
        { id: 1, type: 'Grammar', text: 'Q1', quizId: 1 },
        { id: 2, type: 'Multiple Choice Single Answer', text: 'Which of the following is a prime number?', quizId: 1 },
        { id: 3, type: 'True or False', text: 'The earth revolves around the sun.', quizId: 2 },
        { id: 4, type: 'Multiple Choice Multiple Answers', text: 'Select all even numbers from the list.', quizId: 2 },
        { id: 5, type: 'Short Answer', text: 'What is the capital of France?', quizId: 3 },
        { id: 6, type: 'Fill in the Blanks', text: 'The speed of light is ___ km/s.', quizId: 3 },
      ];
      // Filter by type if any selected
      this.questionResults = allQuestions.filter(q => {
        const typeMatch = this.qFilter.types.length === 0 || this.qFilter.types.includes(q.type);
        const codeMatch = !this.qFilter.code || q.id.toString().includes(this.qFilter.code);
        return typeMatch && codeMatch;
      });
    },
    addQuestion(q) {
      if (!this.addedQuestions.find(a => a.id === q.id)) {
        this.addedQuestions = [...this.addedQuestions, q];
      }
    },
    removeQuestion(q) {
      this.addedQuestions = this.addedQuestions.filter(a => a.id !== q.id);
    },
    isAdded(id) {
      return !!this.addedQuestions.find(a => a.id === id);
    }
  },
  mounted() {
    if (this.isEditMode) {
      this.form.title = 'Demo Quiz';
      this.form.subCategory = 'English Sub Category (English Category)';
      this.form.quizType = 'Quiz';
      this.form.visibility = true;
    }
    if (this.$refs.editor && this.form.description) {
      this.$refs.editor.innerHTML = this.form.description;
    }
    document.addEventListener('selectionchange', this.updateActiveFormats);
    feather.replace();
  },
  beforeDestroy() {
    document.removeEventListener('selectionchange', this.updateActiveFormats);
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

[contenteditable][data-placeholder]:empty::before {
  content: attr(data-placeholder);
  color: #94a3b8;
  pointer-events: none;
}

</style>

<!-- Non-scoped: targets execCommand-generated DOM that never gets Vue's scoped hash -->
<style>
.rich-editor ul { list-style: disc; padding-left: 1.5rem; margin: 0.25rem 0; }
.rich-editor ol { list-style: decimal; padding-left: 1.5rem; margin: 0.25rem 0; }
.rich-editor li { margin: 0.1rem 0; }
.rich-editor b, .rich-editor strong { font-weight: 700; }
.rich-editor i, .rich-editor em { font-style: italic; }
.rich-editor u { text-decoration: underline; }
.rich-editor s { text-decoration: line-through; }
</style>
