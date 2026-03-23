<template>
 <div class="card stat-card shadow-sm border-0 mb-4">
 <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-3">
 <h6 class="text-danger font-weight-bold mb-0 text-uppercase">{{ title }}</h6>
 <div v-if="hasToggle" class="btn-group btn-group-sm toggle-btn-group">
 <button class="btn btn-danger active">NUMBER</button>
 <button class="btn btn-outline-secondary">GRAPH</button>
 </div>
 </div>
 <div class="card-body">
 <div class="row text-center">
 <slot></slot>
 </div>
 </div>
 </div>
</template>

<script>
export default {
 name: 'StatCard',
 props: {
 title: String,
 hasToggle: { type: Boolean, default: false }
 }
}
</script>

<style lang="scss" scoped>
.stat-card {
 border-radius: 12px;
 .toggle-btn-group {
 border-radius: 50px;
 overflow: hidden;
 background: #f8f9fa;
 border: 1px solid #ddd;
 .btn {
 font-size: 10px;
 padding: 2px 10px;
 font-weight: 600;
 border: none;
 &.btn-danger { background: #b12524; }
 }
 }
}
</style>
