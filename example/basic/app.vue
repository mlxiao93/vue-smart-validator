<template>
    <div>
        <!--<input type="text"-->
               <!--v-model="foo"-->
               <!--v-validator="[{rule: 'required', message: '必填'}]"-->
        <!--&gt;-->

        <input type="text"
               v-model="foo"
               v-validator="[{rule: 'required', message: '不能为空'}, {rule: 'number:1', message: '小于0大于10'}]"
        >

        <!--<input type="text"-->
               <!--v-model="foo"-->
               <!--v-validator="[{rule: {'number': {integer: true, max: 10}}, message: {integer: '必须是整数', max: '大于10'}}]"-->
        <!--&gt;-->

        <input type="text"
               v-model="foo"
               v-validator="[{rule: {'largerThan': 10}}]"
        >

        <!--<input type="text"-->
               <!--v-model="foo"-->
               <!--v-validator.group@a.foo.bar@10="[{rule: verify, message: '格式错误', trigger: 'blur'}]"-->
        <!--&gt;-->

        <!--<input type="text"-->
               <!--v-model="foo"-->
               <!--v-validator.foo@1="{rules: [{rule: verify, message: '格式错误', trigger: 'blur'}], group: 'a'}"-->
        <!--&gt;-->

    </div>
</template>
<script>
    export default {
        data () {
            return {
                foo: [1],
            }
        },
        methods: {
            verify () {

            }
        },
        created () {

        }
    }
</script>