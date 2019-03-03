<template>
  <v-form
    ref="signInForm"
    v-model="valid"
    lazy-validation
  >
    <div class="signin">
        <div v-if="!signedIn">
            <v-text-field
              v-model="username"
              :rules="userNameRules"
              type="text"
              name=""
              placeholder="Email"
            ></v-text-field><br>
            <v-text-field
              v-model="password"
              type="password"
              :rules="passwordRules"
              name=""
              placeholder="Password"
            ></v-text-field><br>
            <div v-if="newPasswordRequired">
              Please enter a new password<br>
              <v-text-field
                v-model="newPassword"
                :rules="newPasswordRules"
                type="password"
                name=""
                placeholder="New Password"
              ></v-text-field><br>
            </div>
            <v-btn
              color="success"
              @click="signIn"
              v-bind:loading="signInLoading"
            >Sign in</v-btn>
        </div>
        <div v-if="signedIn">
            <v-btn color="info" @click="signOut">Sign Out</v-btn>
        </div>
    </div>
  </v-form>
</template>
<script>
import { Auth } from 'aws-amplify';

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      userNameRules: [
        v => !!v || 'Email is required',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      newPassword: '',
      newPasswordRequired: false,
      newPasswordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be at least 8 characters',
        v => /\d/.test(v) || 'Password must contain at least one integer',
      ],
      signInLoading: false,
      valid: true,
    };
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    },
  },
  methods: {
    signIn() {
      this.signInLoading = true;
      Auth.signIn(this.username, this.password)
        .then((user) => {
          this.signInLoading = false;
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
        .catch((err) => {
          console.log(err);
          this.signInLoading = false;
          alert(err.message);
          this.validate();
        });
    },
    signOut() {
      Auth.signOut()
        .then((data) => {
          this.$store.state.signedIn = !!data;
          this.$store.state.user = null;
        })
        .catch(err => console.log(err));
    },
    validate() {
      this.$refs.signInForm.validate();
    },
  },
};
</script>
