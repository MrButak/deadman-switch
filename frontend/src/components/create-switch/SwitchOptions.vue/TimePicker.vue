<template>

<h6>{{ doubleDigitHours }}:{{ doubleDigitMinutes }}</h6>
<va-time-picker v-model="timeValue" />

</template>



<script setup>

import { ref, computed } from 'vue';

let timeValue = ref(new Date());
let doubleDigitHours = computed(() => {
    return timeValue.value.getHours() < 10 ?
        '0' + timeValue.value.getHours() :
        timeValue.value.getHours();
});
let doubleDigitMinutes = computed(() => {
    return timeValue.value.getMinutes() < 10 ?
        '0' + timeValue.value.getMinutes() :
        timeValue.value.getMinutes();
});


</script>



<style lang="scss" scoped>



</style>
