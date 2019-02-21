<template>
    <div class="login">
        <div v-if="!signedIn">
            <amplify-authenticator></amplify-authenticator>
        </div>
        <div v-if="signedIn">
            <amplify-sign-out></amplify-sign-out>
        </div>
    </div>
</template>
<script>
import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
  name: 'Login',
  data() {
    return {
      signedIn: false,
    };
  },
  created() {
    this.findUser();

    AmplifyEventBus.$on('authState', (info) => {
      if (info === 'signedIn') {
        this.findUser();
      } else {
        this.signedIn = false;
      }
    });
  },
  methods: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.signedIn = true;
        console.log(user);
      } catch (err) {
        this.signedIn = false;
      }
    },
  },
};
</script>
