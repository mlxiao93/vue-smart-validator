<style lang="scss">
    .validator-has-error {
        /*border: 1px solid red;*/
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
        <el-radio v-model="models[0]" :label="1">1</el-radio>
        <el-radio v-model="models[0]" :label="2" v-validator="[{rule: 'required'}]">2</el-radio>
        <br>
        <el-input v-if="models[0] === 2" v-model="models[1]" v-validator="[{rule: 'required'}]"></el-input>

        <br>

        <el-button @click="handleSubmit">submit</el-button>
    </div>
</template>
<script>
    import MyInput from './MyInput.vue'
    export default {
        components: {

        },
        data () {
            return {
                models: []
            }
        },
        computed: {
        },
        watch: {
            models: {
            }
        },
        methods: {
            handleSubmit() {
                if (this.$validator.check().getError()) return;
                alert('OK');
            }
        },
        created () {
            this.$validator.options({
                appendErrorTip: true,
            })
        }
    }
</script>