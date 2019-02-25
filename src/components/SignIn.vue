<template>
    <div class="signin">
        <div v-if="!signedIn">
            <input v-model="username" type="text" name="" placeholder="Email"><br>
            <input v-model="password" type="password" name="" placeholder="Password"><br>
            <div v-if="newPasswordRequired">
              Please enter a new password<br>
              <input v-model="newPassword" type="password" name="" placeholder="New Password"><br>
            </div>
            <button @click="signIn">Sign in</button>
        </div>
        <div v-if="signedIn">
            <button @click="signOut">Sign Out</button>
        </div>
    </div>
</template>
<script>
import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: '',
      newPassword: '',
      newPasswordRequired: false,
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
    signIn() {
      Auth.signIn(this.username, this.password)
        .then((user) => {
          if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            this.newPasswordRequired = true;
            Auth.completeNewPassword(
              user,
              this.newPassword,
              { email: this.username }, // currently required.
            ).then((confirmedUser) => {
              this.$store.state.signedIn = !!confirmedUser;
              this.$store.state.user = confirmedUser;
              this.newPasswordRequired = false;
            }).catch((err) => {
              console.log(err);
            });
          } else {
            this.$store.state.signedIn = !!user;
            this.$store.state.user = user;
          }
        })
        .catch(err => console.log(err));
    },
    signOut() {
      Auth.signOut()
        .then((data) => {
          this.$store.state.signedIn = !!data;
          this.$store.state.user = null;
        })
        .catch(err => console.log(err));
    },
  },
};
</script>
