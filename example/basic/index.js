import Vue from 'vue'
import app from './app.vue'
import Validator from '../../src/index'

Vue.use(new Validator({ rule: {
    foo: /foo/
} }));

new Vue({
    el: '#app',
    template: `<app/>`,
    components: { app }
});