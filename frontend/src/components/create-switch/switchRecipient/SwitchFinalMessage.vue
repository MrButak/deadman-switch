<template>

<div class="final-message-wrapper">

    <p>Final message</p>
    <va-input
        style="align-items: center;"
        class="mb-4"
        input-class="text--right"
        v-model="newSwitchData.finalMessage"
        type="textarea"
        label="What does this person need to know?"
        placeholder="Hi ma, I won't be making it home for supper tonight. You know what to do."
        :min-rows="5"
        :max-rows="20"
    />

</div>


</template>



<script setup>

import { newSwitchData } from '../../../../javascripts/stateManager';

</script>



<style lang="scss" scoped>

.final-message-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
