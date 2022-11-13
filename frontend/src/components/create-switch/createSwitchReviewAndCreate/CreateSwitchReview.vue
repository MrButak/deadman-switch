<template>

<div class="review-switch-wrapper row row">
    <div class="flex md6 lg4">
      <va-card>
        <va-card-title>Recipient information</va-card-title>
        <va-card-actions align="between">
          <p style="padding: 0 1rem 0 0">First name</p>
          <p style="padding: 0 0 0 1rem" class="va-text-warning">Placeholder{{ newSwitchData.recipientFirstName }}</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p style="padding: 0 1rem 0 0">Last name</p>
          <p style="padding: 0 0 0 1rem" class="va-text-warning">Placeholder{{ newSwitchData.recipientLastName }}</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p style="padding: 0 1rem 0 0">Email</p>
          <p style="padding: 0 0 0 1rem" class="va-text-warning">Placeholder{{ newSwitchData.recipientEmail }}</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p style="padding: 0 1rem 0 0">Final message</p>
          <va-icon
            @click="showModalWithFixedLayout = !showModalWithFixedLayout"
            class="mr-2"
            name="preview"
            size="2rem"
            color="active"
        />

        </va-card-actions>

        <va-card-title>Switch settings</va-card-title>
        <va-card-actions align="between">
          <p>Check in every</p>
          <p class="va-text-warning">{{ newSwitchData.checkInIntervalInDays }} day</p>
        </va-card-actions>
        <va-card-actions align="between">
          <p>No later than</p>
          <!-- <p style="padding: 0 0 0 1rem">Placeholder{{ newSwitchData.checkInTime }}</p> -->
          <p class="va-text-warning">10:00</p>
        </va-card-actions>
      </va-card>
    </div>
</div>
    <!-- Final message popup modal -->
<va-modal
    v-model="showModalWithFixedLayout"
    title="Final message"
    :message="finalMessage"
    fixed-layout
/>

</template>



<script setup>

import { ref, computed } from 'vue';
import { newSwitchData } from '../../../../javascripts/stateManager';

let finalMessage = computed(() => {
    return !newSwitchData.finalMessage ?
        'Hi ma, I won\'t be making it home for supper tonight. You know what to do.' :
        newSwitchData.finalMessage;
});

let showModalWithFixedLayout = ref(false);

</script>



<style lang="scss">

.review-switch-wrapper {
    justify-content: center;
}

</style>
    