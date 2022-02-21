<template>
  <v-row class="fill-height" no-gutters>
    <v-col class="col-12 col-md-7 col-lg-6 pa-0 d-flex flex-column">
      <HeaderComponent :appName="appName" class="flex-grow-0" />     
          <v-container class="px-4 px-sm-10 px-lg-16 pb-0 flex-grow-1">
            <v-row class="flex-column justify-sm-center fill-height" no-gutters>
              <div>
                <h1 class="text-h2 text-sm-h1 mb-4 mb-sm-8">
                  Каршеринг <br />
                  <span class="primary--text">Need for drive</span>
                </h1>
                <div class="text-subtitle-2 text-sm-subtitle-1 tertiary--text">
                  Поминутная аренда авто твоего города
                </div>
                <v-btn
                  class="btn-reserve mt-8 mt-sm-15 px-15"
                  color="primary"
                  elevation="0"
                  >Забронировать</v-btn
                >
              </div>
            </v-row>
          </v-container>
      <FooterComponent />
    </v-col>
    <v-col class="d-none d-md-block col-md-5 col-lg-6 pa-0">
      <Carousel />
    </v-col>
  </v-row>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import Carousel from "@/components/Carousel";

export default {
  name: "App",

  components: {
    HeaderComponent,
    FooterComponent,
    Carousel,
  },

  data: () => ({
    appName: "Need for drive",
  }),
};
</script>

<style lang="scss">
</style>