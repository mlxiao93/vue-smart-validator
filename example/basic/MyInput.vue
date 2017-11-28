<template>
    <div>
        <input ref="input" type="text" :value="value" @input="change">
        <!--<input type="text">-->
        <!--<textarea name="" id="" cols="30" rows="10"></textarea>-->
    </div>
</template>
<script>
    export default {
        props: ['value'],
        methods: {
            change() {
                this.$emit('input', this.$refs.input.value);
            }
        }
    }
</script>