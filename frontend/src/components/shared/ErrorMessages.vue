<template>
<!-- 
<v-for="error in errors"></v-for>
<error_component :error="error"></error_component>
<v-end> -->

<va-alert v-for="error in errorMessageStore.errorMessageArray"
    class="mb-4" 
    style="width: 80%"
    :color="error.color" 
    :icon="error.icon" 
>
    {{ error.text  }}
</va-alert>

</template>



<script setup>

// Pinia stores
import { useErrorMessageStore } from '../../javascript/stateManager';
const errorMessageStore = useErrorMessageStore()


</script>



<style lang="scss" scoped>



</style>
