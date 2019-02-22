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
    };
  },
  created() {
    this.findUser();

    AmplifyEventBus.$on('authState', (info) => {
      if (info === 'signedIn') {
        this.findUser();
      } else {
        this.$store.state.signedIn = false;
        this.$store.state.user = null;
      }
    });
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    },
  },
  methods: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.$store.state.signedIn = true;
        this.$store.state.user = user;

        console.log(user);
      } catch (err) {
        this.$store.state.signedIn = false;
        this.$store.state.user = null;
      }
    },
  },
};
</script>
