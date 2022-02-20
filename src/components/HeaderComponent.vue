<template>
  <v-app-bar id="app-bar" color="white" class="px-sm-8 px-lg-12" flat  absolute app height="110">
    <v-container class="py-7 py-sm-8">
      <v-row>
        <v-col class="col-12 py-0 col-sm-auto text-right text-sm-left">
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
  components: { LocationSelector },
  data: () => ({
    //
  }),
};
</script>