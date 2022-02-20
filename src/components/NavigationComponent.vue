 <template>
  <div>
    <v-navigation-drawer
      permanent
      dark
      mini-variant
      :mini-variant-width="miniNavWidth"
      class="main-menu-mini-drawer py-5"
      color="menu_background"
      app
      fixed
    >
      <v-row class="justify-center fill-height" no-gutters>
        <v-btn class="px-3 py-3" @click.stop="drawer = !drawer" icon>
          <v-icon>$vuetify.icons.menu</v-icon>
        </v-btn>

        <v-btn
          class="lang-btn p-1 align-self-end font-weight-bold"
          fab
          outlined
          color="primary"
          x-small
        >
          <span>Eng</span>
        </v-btn>
      </v-row>
    </v-navigation-drawer>

    <v-navigation-drawer
      class="main-menu-drawer py-8 d-flex"
      v-model="drawer"
      fixed
      temporary
      dark
      :width="navwidth"
      color="menu_background"
    >
      <v-btn
        class="px-3 py-3 ml-2"
        absolute
        @click.stop="drawer = !drawer"
        icon
      >
        <v-icon>$vuetify.icons.close</v-icon>
      </v-btn>

      <div class="main-menu-drawer__container pl-2 pl-sm-8 mt-12 my-sm-auto">
        <v-list
          class="main-menu-drawer-items py-0 d-flex flex-column text-uppercase"
        >
          <v-list-item
            v-for="item in menuItems"
            :key="item.name"
            :to="item.href"
          >
            <v-list-item-title
              v-text="item.name"
            ></v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list class="social-links pb-0 pt-8 d-flex flex-wrap">
          <v-list-item
            v-for="item in socialLinks"
            :key="item.name"
            :to="item.href"
          >
            <v-icon size="32">$vuetify.icons.{{ item.name }}</v-icon>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    menuItems: [
      {
        name: "Парковка",
        href: "/",
      },
      {
        name: "Страховка",
        href: "/",
      },
      {
        name: "Бензин",
        href: "/",
      },
      {
        name: "Обслуживание",
        href: "/",
      },
    ],
    socialLinks: [
      {
        name: "telegram",
        href: "/",
      },
      {
        name: "facebook",
        href: "/",
      },
      {
        name: "instagram",
        href: "/",
      },
    ],
  }),
  computed: {
    miniNavWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "85px";
        case "sm":
          return "85px";
        case "md":
          return "85px";
        case "lg":
          return "64px";
        default:
          return "64px";
      }
    },
    navwidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100%";
        case "sm":
          return "100%";
        case "md":
          return "60%";
        case "lg":
          return "50%";
        default:
          return "50%";
      }
    },
  },
};
</script>