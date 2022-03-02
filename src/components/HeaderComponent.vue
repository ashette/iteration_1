<template>
  <v-app-bar
    id="app-bar"
    color="white"
    class="px-sm-6 px-lg-12"
    flat
    height="110"
  >
    <v-container class="py-4 px-4 py-sm-8">
      <v-row no-gutters>
        <v-col class="py-0 col-12 col-sm-auto text-right text-sm-left">
          <v-toolbar-title
            class="logo font-weight-bold primary--text"
            v-text="appName"
          />
        </v-col>
        <v-col class="text-right py-0 my-0 my-sm-2">
          <LocationSelector />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>
import LocationSelector from "@/components/LocationSelector";
export default {
  name: "App",
  props: {
    appName: String,
  },
  components: { LocationSelector }
};
</script>