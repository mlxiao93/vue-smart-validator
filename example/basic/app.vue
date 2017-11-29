<template>
    <div>
        <!--<input type="text"-->
               <!--v-model="foo"-->
               <!--v-validator="[{rule: 'required', message: '必填'}]"-->
        <!--&gt;-->

        <!--<input type="text"-->
               <!--v-model="a"-->
               <!--v-validator.trigger@blur="[{rule: 'required', message: '不能为空'}, {rule: 'number', message: '必须是数字'}, {rule: /123/, message: '必须是123'}]"-->
        <!--&gt;-->

        <!--<span v-if="$validator && $validator.getError('a')[0]">{{$validator.getError('a')[0]}}</span>-->
        <!--{{$validator && $validator}}-->
        <!--<br>-->

        <br>

        <!--<el-input v-model="a"-->
                  <!--v-validator.trigger@blur="[{rule: 'required', message: '不能为空'}, {rule: 'number', message: '必须是数字'}, {rule: /123/, message: '必须是123'}]">-->

        <!--</el-input>-->

        <br>
        <my-input v-model="a"
                  v-validator.trigger@change="[{rule: 'required', message: '不能为空'}, {rule: 'number'}, {rule: /123/, message: '必须是123'}]"></my-input>


        <textarea v-model="c" v-validator="[{rule: 'required', message: '不能为空'}, {rule: 'bar'}, {rule: isHaha}]"></textarea>


        <select v-model="d" v-validator="[{rule: 'required', message: '不能为空'}]"> <!--Supplement an id here instead of using 'name'-->
            <option value="1">Value 1</option>
            <option value="2">Value 2</option>
            <option value="3">Value 3</option>
        </select>

        <!--<input type="text"-->
               <!--v-model="b"-->
               <!--v-validator.group@a.trigger@input="[{rule: 'required', message: '不能为空'} , {rule: /^[a-z]*$/, message: '必须是小写字母'}]"-->
        <!--&gt;-->

        <!--<br>-->

        <!--<input type="text"-->
               <!--v-model="c"-->
               <!--v-validator.group@b.trigger@input="[{rule: 'required', message: '不能为空'} , {rule: /^[a-z]*$/, message: '必须是大写字母'}]"-->
        <!--&gt;-->

        <!--<br>-->

        <!--<input type="text"-->
               <!--v-model="d"-->
               <!--v-validator.group@b.trigger@input="[{rule: 'required', message: '不能为空'} , {rule: /^abc$/, message: '必须是abc'}]"-->
        <!--&gt;-->

        <!--<br>-->

        <!--<div v-show="$validator.getError('foo.required')">不能为空</div>-->

        <!--<div>必须是数字</div>-->

        <!--<input type="text"-->
               <!--v-model="foo"-->
               <!--v-validator="[{rule: {'number': {integer: true, max: 10}}, message: {integer: '必须是整数', max: '大于10'}}]"-->
        <!--&gt;-->

        <!--<input type="text"-->
               <!--v-model="foo"-->
               <!--v-validator="[{rule: {'largerThan': 10}}]"-->
        <!--&gt;-->

        <!--<input type="text"-->
               <!--v-model="foo"-->
               <!--v-validator.group@a.foo.bar@10="[{rule: verify, message: '格式错误', trigger: 'blur'}]"-->
        <!--&gt;-->

        <input type="text"
               v-model="b"
               v-validator="{rules: [{rule: 'required', message: '格式错误', trigger: 'blur'}], group: 'a'}"
        >

        <div>
            <button @click="submit">submit</button>
        </div>

    </div>
</template>
<script>
    import MyInput from './MyInput.vue'
    export default {
        components: {
            MyInput
        },
        data () {
            return {
                foo: [1],
                bar: {
                    a: 1
                },
                a: 1,
                b: 2,
                c: 3,
                d: '',
                flag: true
            }
        },
        computed: {
        },
        methods: {
            isHaha(val) {
                return val === 'haha';
            },
            submit() {
                let { $validator } = this;
                $validator.check();
                console.log($validator.getError());
            }
        },
        created () {
            this.$validator.options({
                rules: {
                    bar: /bar/
                },
                messages: {
                    bar: 'hahaah'
                },
                appendErrorTip: false
            })
        }
    }
</script>