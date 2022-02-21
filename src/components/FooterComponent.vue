<template>
  <v-footer
    color="transparent"
    class="px-0 px-sm-6 px-lg-12 py-0"
    :dark="$vuetify.breakpoint.xs"
  >
    <v-container class="py-4 px-4">
      <v-row no-gutters>
        <v-col
          class="col-12 col-sm-auto text-right text-sm-left py-0 px-0"
          align-self="center"
        >
          <div class="copyright tertiary--text">
            <span>© 2016-2019 «Need for drive»</span>
          </div>
        </v-col>
        <v-col
          class="text-right px-0 py-0 py-sm-3 order-first order-sm-last"
          align-self="center"
        >
          <div class="phone">
            <a class="text-decoration-none" href="tel:+74952342244"
              >8 (495) 234-22-44</a
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>