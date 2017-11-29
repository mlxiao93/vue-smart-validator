import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import app from './app.vue'
import Validator from '../../src/index'

Vue.use(ElementUI);

Vue.use(new Validator({
    rules: {
        foo: /foo/
    },
    messages: {
        number: '数字数字数字aaa'
    },
    appendErrorTip: true
}));

new Vue({
    el: '#app',
    template: `<app/>`,
    components: { app }
});