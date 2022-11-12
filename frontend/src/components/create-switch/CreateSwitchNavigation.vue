<template>

<va-tabs 
    :center="true"
    v-model="defaultTabPosition"
    color="primary"
>
    <template #tabs>
        <va-tab v-for="view in createSwitchNavigationViews" 
            :label="view.text"
            :icon="view.icon"
            @click="handleCreateSwitchView(view.text)"
            >
        </va-tab>
    </template>
</va-tabs>

</template>



<script setup>

import { ref } from 'vue';
import { createSwitchNavigationViews } from '../../../javascripts/stateManager';

let defaultTabPosition = ref(0)



function handleCreateSwitchView() {

    console.log(defaultTabPosition.value)
};

</script>



<style lang="scss" scoped>



</style>
