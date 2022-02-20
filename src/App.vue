<template>
  <v-app>
    <HeaderComponent :appName="appName" />

    <NavigationComponent />

    <v-main>
      <v-container class="fill-height px-8 px-lg-12" fluid>
        <v-row class="fill-height flex-column flex-nowrap"  no-gutters>
          <v-container class="flex-grow-1 py-4 py-sm-8">
            <router-view />
          </v-container>

          <v-container class="py-4 py-sm-8">
            <FooterComponent />
          </v-container>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationComponent from "@/components/NavigationComponent";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
export default {
  name: "App",

  components: {
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
  },

  data: () => ({
    appName: "Need for drive",
  }),
};
</script>

<style lang="scss">
@import "./scss/index.scss";
</style>