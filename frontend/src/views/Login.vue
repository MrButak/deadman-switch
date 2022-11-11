<template>

<h2 class="va-h3 va-text-center" style="padding: 8px 0">Login</h2>

<LoginForm />
<span v-if="hasRegistered">
    <RegisterSuccessMessages />
</span>

</template>



<script setup>

import { hasRegistered } from '../../javascripts/stateManager';
import LoginForm from '../components/LoginForm.vue';
import RegisterSuccessMessages from '../components/registerSuccessMessages.vue';

</script>



<style lang="scss" scoped>



</style>
