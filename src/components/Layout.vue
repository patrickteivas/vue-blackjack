<template>
  <v-app id="inspire">
    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
    >
      <v-list dense>
        <v-list-item link @click="startGame">
          <v-list-item-action>
            <v-icon>mdi-gamepad-variant-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>New game</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
            app
            clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Blackjack</v-toolbar-title>
      <v-spacer />
      {{$store.state.resultTitle}}
      <v-spacer />
    </v-app-bar>

    <v-content>
      <slot />
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    async startGame() {
      await this.$store.dispatch('startGame');
    }
  }
};
</script>