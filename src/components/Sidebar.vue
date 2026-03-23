<template>
 <aside class="main-sidebar">
 <div class="brand-link">
 <img src="/jspark_logo.png" alt="Jspark.ai Logo" class="brand-image">
 </div>

 <div class="sidebar">
 <nav class="mt-2">
 <ul class="nav flex-column">
 <li v-for="item in menuItems" :key="item.name" class="nav-item">
 <a href="#" :class="['nav-link', { active: item.active }]">
 <i :class="['nav-icon', item.icon]"></i>
 <p>{{ item.name }}</p>
 </a>
 </li>
 </ul>
 </nav>
 </div>
 </aside>
</template>

<script>
export default {
 name: 'Sidebar',
 data() {
 return {
 menuItems: [
 { name: 'Dashboard', icon: 'fas fa-th-large', active: true },
 { name: 'Test Series', icon: 'fas fa-edit' },
 { name: 'Courses', icon: 'fas fa-book' },
 { name: 'Reports', icon: 'fas fa-chart-bar' },
 { name: 'Site Management', icon: 'fas fa-desktop' },
 { name: 'Access', icon: 'fas fa-key' },
 { name: 'Marketing', icon: 'fas fa-bullhorn' },
 { name: 'Settings', icon: 'fas fa-cog' },
 { name: 'Notifications', icon: 'fas fa-bell' },
 { name: 'Notice Board', icon: 'fas fa-clipboard-list' },
 { name: 'Payment Requests', icon: 'fas fa-money-bill-wave' },
 ]
 }
 }
}
</script>

<style lang="scss" scoped>
.main-sidebar {
 width: 250px;
 background-color: #b12524;
 height: 100vh;
 position: fixed;
 left: 0;
 top: 0;
 color: #fff;
 z-index: 1000;
 box-shadow: 4px 0 10px rgba(0,0,0,0.1);

 .brand-link {
 padding: 15px;
 height: 60px;
 display: flex;
 align-items: center;
 border-bottom: 1px solid rgba(255,255,255,0.1);
 img { max-height: 100%; }
 }

 .nav-link {
 color: rgba(255,255,255,0.8);
 padding: 12px 20px;
 display: flex;
 align-items: center;
 font-size: 14px;
 transition: all 0.3s;
 border-left: 4px solid transparent;

 i { margin-right: 15px; width: 20px; text-align: center; }
 p { margin: 0; }

 &:hover, &.active {
 color: #fff;
 background: rgba(255,255,255,0.1);
 border-left-color: #fff;
 }
 }
}
</style>
