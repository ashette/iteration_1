<template>
  <v-app>
    <NavigationComponent />
    <v-main>
      <router-view />
    </v-main>
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
    appName: "Need for drive",
  }),
};
</script>

<style lang="scss">
@import "./scss/index.scss";
</style>