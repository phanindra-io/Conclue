<template>
  <div>
    <v-app-bar
      app
      color="#fff"
      class="pl-7 pr-7 primary darken-1"
      dark
      :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <template v-if="user.loggedIn">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
          <v-btn to="/welcome" text>
            Conclue
          </v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list class="text-center">
            <v-list-item to="/settings">
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-btn @click.prevent="signOut" text>Sign out</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
          <v-btn to="/" text>
            Conclue
          </v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn to="/signin" class="hidden-sm-and-down" depressed light
          >Sign in</v-btn
        >
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="user.loggedIn"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-item
            :key="item.name"
            link
            :to="{
              name: item.link,
              params: {}
            }"
          >
            <v-list-item-avatar>
              <v-icon class="green white--text">{{ item.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const { auth } = require("@/plugins/firebase.js");

export default {
  name: "Navbar",
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-view-dashboard", name: "Dashboard", link: "Dashboard" }
    ]
  }),
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.$store.dispatch("clearData");
        this.$router.replace({
          name: "home"
        });
        window.location.assign("/");
      });
    }
  },
  beforeDestroy() {
    // Perform the teardown procedure for someLeakyProperty.
    // (In this case, effectively nothing)
    this.initialItems = null;
    this.drawer = null;

    delete this.initialItems;
    delete this.drawer;
  }
};
</script>
