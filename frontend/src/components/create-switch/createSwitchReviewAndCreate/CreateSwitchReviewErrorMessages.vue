<template>

<va-alert v-for="error in createSwitchReviewErrorMessages"
    class="mb-4" 
    style="width: 80%"
    :color="error.color" 
    :icon="error.icon" 
>
    {{ error.text  }}
</va-alert>

</template>



<script setup>

// import { createSwitchReviewErrorMessages } from '../../../javascript/stateManager';

// Pinia stores
import { storeToRefs } from 'pinia'
import { useCreateSwitchStore } from '../../../javascript/stateManager';
let createSwitchStore = useCreateSwitchStore();
const { createSwitchReviewErrorMessages } = storeToRefs(createSwitchStore);

</script>



<style lang="scss" scoped>



</style>
