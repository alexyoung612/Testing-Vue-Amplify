import Vue from 'vue';
import Vuex from 'vuex';
import { Auth } from 'aws-amplify';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    signedIn: false,
  },
  mutations: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.state.signedIn = true;
        this.state.user = user;

        console.log(user);
      } catch (err) {
        this.state.signedIn = false;
        this.state.user = null;
      }
    },
  },
  actions: {

  },
});
