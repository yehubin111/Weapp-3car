import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store

/**
 * components
 */ 
// common
import pageNav from './components/nav'
// index
import indexSearch from './components/index/search'
import indexSort from './components/index/sort'
import carList from './components/index/carlist'
import brandType from './components/index/brandtype'
import filtrateBox from './components/index/filtratebox'
import carSearch from './components/index/carsearch'
// selledcar
import selledCar from './components/selledcar/carlist'
// mycar
import mineSearch from './components/owncar/search'
import mineSort from './components/owncar/sort'
import mineCar from './components/owncar/carlist'
import inputFirm from './components/owncar/confirm'
// result
import resultContract from './components/result/contract'
import resultSignature from './components/result/signature'
// form
import brand from './components/form/brand'
import list from './components/form/list'
import date from './components/form/date'
import input from './components/form/input'
import area from './components/form/area'
import radio from './components/form/radio'
// public
import publicUpload from './components/public/upload'
// contract
import contractFirm from './components/contract/confirm'


Vue.component('contract-firm', contractFirm);
Vue.component('page-nav', pageNav);
Vue.component('index-search', indexSearch);
Vue.component('index-sort', indexSort);
Vue.component('car-list', carList);
Vue.component('brand-type', brandType);
Vue.component('filtrate-box', filtrateBox);
Vue.component('car-search', carSearch);
Vue.component('selled-car', selledCar);
Vue.component('mine-search', mineSearch);
Vue.component('mine-sort', mineSort);
Vue.component('mine-car', mineCar);
Vue.component('cv-confirm', inputFirm);
Vue.component('result-contract', resultContract);
Vue.component('result-signature', resultSignature);
Vue.component('public-upload', publicUpload);
// form组件
Vue.component('cv-brand', brand);
Vue.component('cv-list', list);
Vue.component('cv-date', date);
Vue.component('cv-input', input);
Vue.component('cv-area', area);
Vue.component('cv-radio', radio);
// form组件


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
