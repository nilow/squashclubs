import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from "bootstrap-vue";
import Vuelidate from 'vuelidate';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from 'axios';
import infiniteScroll from 'vue-infinite-scroll';
import VueAxios from 'vue-axios';
import Login from './components/Logincomponent.vue';
import Home from './components/Homecomponent.vue';
import Clubs from './components/Clubscomponent.vue';
import Cities from './components/Citiescomponent.vue';
import Contractors from './components/Contractorscomponent.vue';
import Card from './components/Cardcomponent.vue';
import Users from './components/Userscomponent.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIdBadge, faEdit, faTrash, faStar, faHome, faUser, faUserFriends, faFile, faCheckSquare, faSquare, faPlusCircle, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faIdBadge, faEdit, faTrash, faStar, faHome, faUser, faUserFriends, faFile, faCheckSquare, faSquare, faPlusCircle, faEnvelope, faLock);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(infiniteScroll);
Vue.use(Vuelidate);


const routes = [
	{path:'/home', component: Home, meta:{requiresAuth: true}},
	{path:'/clubs', component: Clubs, meta:{requiresAuth: true}},
	{path:'/card/:contractorid', component: Card, meta:{requiresAuth: true}},
	{path:'/clubs/:provinceid/:cityid', component: Clubs, meta:{requiresAuth: true}},
	{path:'/', component: Login},
	{path:'/cities', component: Cities, meta:{requiresAuth: true}},
	{path:'/contractors', component: Contractors, meta:{requiresAuth: true}},
	{path:'/contractors/:provinceid/:cityid/:clubid', component: Contractors, meta:{requiresAuth: true}},
	{path:'/users', component: Users, meta:{requiresAuth: true}},
];
const router = new VueRouter({routes: routes, mode: 'history'});
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
  	const token = localStorage.getItem('token');
    const date = localStorage.getItem('expiration');
    //console.log(date.valueOf());
    //console.log(new Date().valueOf());
  		if(token && date && (date.valueOf() > new Date().valueOf())){
  			next();
  		}
  		else{
  			next({path:'/'});
  		}
  }
  else{
  	next();
  }
})


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
