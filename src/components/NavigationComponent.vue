 <template>
  <v-layout fill-height>
    <v-navigation-drawer
      permanent
      absolute
      dark
      mini-variant
      mini-variant-width="64px"
      class="py-8"
      color="menu_background"
    >
      <v-row class="justify-center fill-height" no-gutters>
        <v-btn class="px-3 py-3" @click.stop="drawer = !drawer" icon>
          <v-icon>$vuetify.icons.menu</v-icon>
        </v-btn>

        <v-btn
          class="p-1 align-self-end font-weight-bold"
          fab
          outlined
          :ripple="false"
          color="primary"
        >
          <span>Eng</span>
        </v-btn>
      </v-row>
    </v-navigation-drawer>

    <v-navigation-drawer
      class="main-menu-drawer py-8 d-flex"
      v-model="drawer"
      absolute
      temporary
      dark
      width="50%"
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

      <div class="main-menu-drawer__container my-auto">
        <v-list
          class="main-menu-drawer-items py-0 d-flex flex-column text-uppercase"
        >
          <v-list-item
            v-for="item in menuItems"
            :key="item.name"
            :ripple="false"
            :to="item.href"
          >
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list class="social-links pb-0 pt-8 d-flex flex-wrap">
          <v-list-item
            v-for="item in socialLinks"
            :key="item.name"
            :ripple="false"
            :to="item.href"
          >
            <v-icon size="32">$vuetify.icons.{{ item.name }}</v-icon>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
  </v-layout>
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
};
</script>
