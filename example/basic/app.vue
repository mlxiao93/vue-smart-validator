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
        <el-select size="small" v-model="models[0]" v-validator="[{rule: 'required'}]">
            <el-option label="前台" value="前台"></el-option>
            <el-option label="预订部" value="预订部"></el-option>
            <el-option label="联系人" value="联系人"></el-option>
        </el-select>
        <br>
        <el-input v-model="models[1]" v-validator="[{rule: 'required'}]"></el-input>

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