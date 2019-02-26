<template>
  <v-app>
    <v-toolbar app>
      <v-avatar
        :tile="tile"
        :size="avatarSize"
        color="grey lighten-4"
      >
        <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar!">
      </v-avatar>
      <v-toolbar-title class="headline text-uppercase">
        <span>Quotera</span>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/" flat>Home</v-btn>
        <v-btn to="/about" flat>About</v-btn>
        <v-btn to="/quotes" flat>Quotes</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      //
    };
  },
};
</script>
