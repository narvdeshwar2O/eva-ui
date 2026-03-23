import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Added this line
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/css/main.css';

// Import Bootstrap JS (can keep or remove, keeping for now if any components use it)
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
 router, // Added this line
 render: (h) => h(App),
}).$mount('#app');
