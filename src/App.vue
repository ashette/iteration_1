<template>
  <v-app>
    <v-app-bar
      id="app-bar"
      absolute
      app
      color="transparent"
      flat
      height="75"
    ></v-app-bar>
    <NavigationComponent />

    <v-main><router-view /></v-main>
  </v-app>
</template>

<script>
import NavigationComponent from "@/components/NavigationComponent";
export default {
  name: "App",

  components: {
    NavigationComponent,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import "./assets/styles/index.scss";
</style>