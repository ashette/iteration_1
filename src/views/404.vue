<template>
  <div>
    <NavigationComponent />
    <v-main>
      <div>Page not found</div>
    </v-main>
  </div>
</template>
<script>
import NavigationComponent from "@/components/NavigationComponent";
export default {
  name: "PageNotFound",
  components: {
    NavigationComponent,
  },
};
</script>