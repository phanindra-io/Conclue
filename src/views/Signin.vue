<template>
  <div class="mt-12">
    <div id="firebaseui-auth-container"></div>
    <div id="loader" class="text-center">Loading...</div>
  </div>
</template>

<script>
const firebase = require("firebase/app");

const firebaseui = require("firebaseui");
require("firebaseui/dist/firebaseui.css");

export default {
  name: "Signin",
  mounted() {
    const self = this;
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          self.$router.replace({ name: "Dashboard" });
          return true;
        },
        uiShown() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById("loader").style.display = "none";
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: "/terms-of-service",
      // Privacy policy url.
      privacyPolicyUrl: "/privacy-policy",
      credentialHelper: "none"
    };
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>
