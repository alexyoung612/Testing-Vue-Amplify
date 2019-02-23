<template>
  <div class="quotes">
    <h1>This is the quotes page</h1>
    <h2>{{info.data}}</h2>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      info: '',
    };
  },
  mounted() {
    if (this.$store.state.user) {
      const jwt = this.$store.state.user
        .getSignInUserSession()
        .getIdToken()
        .getJwtToken();

      const config = {
        headers: {
          authorization: jwt,
        },
      };

      axios.get('https://eju292snv5.execute-api.us-west-2.amazonaws.com/v1/quotes', config)
        .then((val) => { this.info = val; })
        .catch(err => console.log(err));
    }
  },
};
</script>
