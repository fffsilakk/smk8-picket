<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({ errors: [], propName: String });
const message = ref("");

if (props.errors && props.propName) {
    var result = props.errors.find(x => x.code === props.propName);
    message.value = result ? result.description : null;
}
</script>

<template>
    <label class="text-red-600 text-xs" v-if="message">{{ message }}</label>
</template>