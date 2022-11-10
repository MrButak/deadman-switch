import { ref } from 'vue';

let userLoggedIn = ref(false);
let showLogin = ref(false);
let showSignup = ref(false);

export {
    userLoggedIn,
    showLogin, showSignup
}