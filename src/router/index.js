import Vue from 'vue';
import VueRouter from 'vue-router';

// Layouts
import FrontendLayout from '../views/Frontend/FrontendLayout.vue';

// Views
import HomeView from '../views/Frontend/Home.vue';
import CourseCatalog from '../views/Frontend/CourseCatalog.vue';
import TestCatalog from '../views/Frontend/TestCatalog.vue';
import AboutUs from '../views/Frontend/AboutUs.vue';
import NoticeBoard from '../views/Frontend/NoticeBoard.vue';
import ContactUs from '../views/Frontend/ContactUs.vue';
import DiscussionForum from '../views/Frontend/DiscussionForum.vue';
import LoginPage from '../views/Frontend/LoginPage.vue';

// Test Series
import TestSeriesLayout from '../views/TestSeries/TestSeriesLayout.vue';
import TestSeriesList from '../views/TestSeries/Tests/TestSeriesList.vue';
import CreateSeries from '../views/TestSeries/Tests/CreateSeries.vue';
import ImportSeries from '../views/TestSeries/Tests/ImportSeries.vue';
import ExamList from '../views/TestSeries/Tests/ExamList.vue';
import ExamTemplateList from '../views/TestSeries/Tests/ExamTemplateList.vue';
import QuizTypeList from '../views/TestSeries/Tests/QuizTypeList.vue';
import ExamTypeList from '../views/TestSeries/Tests/ExamTypeList.vue';
import ComprehensionList from '../views/TestSeries/Questions/ComprehensionList.vue';
import QuestionList from '../views/TestSeries/Questions/QuestionList.vue';
import UserList from '../views/TestSeries/Users/UserList.vue';
import UserGroupList from '../views/TestSeries/Users/UserGroupList.vue';
import CategoryList from '../views/TestSeries/Categories/CategoryList.vue';
import SubCategoryList from '../views/TestSeries/Categories/SubCategoryList.vue';
import TagList from '../views/TestSeries/Categories/TagList.vue';
import SubjectList from '../views/TestSeries/Questions/SubjectList.vue';
import QuestionCategoryList from '../views/TestSeries/Questions/QuestionCategoryList.vue';
import GeneralSettings from '../views/TestSeries/Settings/GeneralSettings.vue';
import LocalizationSettings from '../views/TestSeries/Settings/LocalizationSettings.vue';
import Dashboard from '../views/TestSeries/Dashboard.vue';
import NotFound from '../views/Errors/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: FrontendLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'courses', name: 'courses', component: CourseCatalog },
      { path: 'tests', name: 'tests', component: TestCatalog },
      { path: 'about', name: 'about', component: AboutUs },
      { path: 'notice-board', name: 'notice-board', component: NoticeBoard },
      { path: 'contact', name: 'contact', component: ContactUs },
      { path: 'forum', name: 'forum', component: DiscussionForum, meta: { requiresAuth: true } }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/test-series',
    component: TestSeriesLayout,
    meta: { requiresAuth: true },
    redirect: { name: 'test-series-dashboard' },
    children: [
      { path: 'dashboard', name: 'test-series-dashboard', component: Dashboard },
      { path: 'list', name: 'test-series-list', component: TestSeriesList },
      { path: 'create', name: 'test-series-create', component: CreateSeries },
      { path: 'import', name: 'test-series-import', component: ImportSeries },
      { path: 'create-question', name: 'test-series-create-question', component: CreateSeries },
      { path: 'subjects', name: 'test-series-subjects', component: SubjectList }, 
      { path: 'question-categories', name: 'test-series-question-categories', component: QuestionCategoryList },
      { path: 'sections', name: 'test-series-sections', component: TestSeriesList },
      { path: 'exams', name: 'test-series-exams', component: ExamList },
      { path: 'exams/templates', name: 'test-series-exam-templates', component: ExamTemplateList },
      { path: 'quiz-types', name: 'test-series-quiz-types', component: QuizTypeList },
      { path: 'exam-types', name: 'test-series-exam-types', component: ExamTypeList },
      { path: 'comprehensions', name: 'test-series-comprehensions', component: ComprehensionList },
      { path: 'questions', name: 'test-series-questions', component: QuestionList },
      { path: 'users', name: 'test-series-users', component: UserList },
      { path: 'user-groups', name: 'test-series-user-groups', component: UserGroupList },
      { path: 'categories', name: 'test-series-categories', component: CategoryList },
      { path: 'subcategories', name: 'test-series-subcategories', component: SubCategoryList },
      { path: 'tags', name: 'test-series-tags', component: TagList },
      { path: 'settings/general', name: 'test-series-settings-general', component: GeneralSettings },
      { path: 'settings/localization', name: 'test-series-settings-localization', component: LocalizationSettings },
    ]
  },
  { path: '*', name: 'not-found', component: NotFound }
];

const router = new VueRouter({
 mode: 'history',
 routes,
 scrollBehavior() {
 return { x: 0, y: 0 };
 }
});

router.beforeEach((to, from, next) => {
 const isAuthenticated = localStorage.getItem('token');
 if (to.matched.some(record => record.meta.requiresAuth)) {
 if (!isAuthenticated) {
 next({ name: 'login' });
 } else {
 next();
 }
 } else {
 next();
 }
});

export default router;
