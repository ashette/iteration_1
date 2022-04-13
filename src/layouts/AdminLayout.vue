<template>
  <v-layout>
    <NavigationComponent />
    <v-main class="admin">
      <ToolBarComponent />
      <router-view />
      <FooterComponent />
    </v-main>
  </v-layout>
</template>

<style lang="scss">
@import "@/scss/admin.scss";
</style>

<script>
import NavigationComponent from "@/components/admin/Navigation";
import ToolBarComponent from "@/components/admin/ToolBarComponent";
import FooterComponent from "@/components/admin/Footer";

export default {
  components: { NavigationComponent, ToolBarComponent, FooterComponent },
};
</script>
