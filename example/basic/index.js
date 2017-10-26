import Vue from 'vue'
import app from './app.vue'
import Validator from '../../src/index'

Vue.use(Validator);

new Vue({
    el: '#app',
    template: `<app/>`,
    components: { app }
});