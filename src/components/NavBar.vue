<template>

        <v-toolbar app>
            <v-avatar
                :tile="tile"
                :size="avatarSize"
                color="grey lighten-4"
            >
                <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar!">
            </v-avatar>
            <v-toolbar-title class="headline text-uppercase mr-3">
                <span>Quotera</span>
            </v-toolbar-title>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                v-for="item in leftMenu"
                :key="item.icon"
                :to="item.link"
                flat
                >{{ item.title }}</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                v-for="item in rightMenu"
                :key="item.icon"
                :to="item.link"
                flat
                >{{ item.title }}</v-btn>
            </v-toolbar-items>
            <v-menu class="hidden-md-and-up">
                <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
                <v-list>
                <v-list-tile
                v-for="item in leftMenu.concat(rightMenu)"
                :key="item.icon"
                :to="item.link"
                >
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>

</template>
<script>

export default {
  name: 'NavBar',
  data() {
    return {
      leftMenu: [
        { icon: 'home', title: 'Home', link: '/' },
        { icon: 'info', title: 'About', link: '/about' },
        { icon: 'quotes', title: 'Quotes', link: '/quotes' },
      ],
      rightMenu: [
        { icon: 'signin', title: 'Sign In', link: '/signin' },
      ],
      tile: false,
      avatarSize: 36,
    };
  },
  computed: {
    signedIn() {
      return this.$store.state.signedIn;
    },
  },
  methods: {
    menuItems() {
      return this.leftMenu.concat(this.rightMenu);
    },
  },
};
</script>
