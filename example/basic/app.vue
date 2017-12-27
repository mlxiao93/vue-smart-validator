<style lang="scss">
    .validator-has-error {
        border: 1px solid red;
        & + span {
            color: red;
            margin-left: .5em;
        }
    }
    .container {
        > div {
            margin: 1em 0;
        }
        label {
            display: inline-block;
            width: 5em;
        }
    }
</style>
<template>
    <div class="container">

        <input type="text" v-model="models[1]" v-validator="[{rule: 'rule1', a: 1, b: 2}]">

        <br>
        <br>

        <input type="text" v-model="models[2]" v-validator="[{rule: 'rule2', a: 1, b: 2}]">

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
                models: []
            }
        },
        computed: {
        },
        methods: {
        },
        created () {
            this.$validator.options({
                rules: {
                    rule1: function(value, args) {
                        return /abc/.test(value)
                    },
                    rule2: /abc/
                },
                messages: {
                    rule1: 'rule1 error',
                    rule2: function(value, args) {
                        return `rule2 error  value: ${value}  args: ${JSON.stringify(args)}`
                    }
                },
                appendErrorTip: true,
            })
        }
    }
</script>