<template>
    <div>
        <input type="text" v-model="foo" v-validator>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                foo: 'hello'
            }
        }
    }
</script>