 <template>
  <div>
    <v-app-bar-nav-icon
      absolute
      class="mobile-menu-opener mt-2 ml-2 px-3 py-3 d-sm-none menu--text"
      @click.stop="drawer = !drawer"      
    >
      <v-icon>$vuetify.icons.menu</v-icon>
    </v-app-bar-nav-icon>
    <v-navigation-drawer
      app
      dark
      class="main-menu-mini-drawer py-5"
      color="menu"
      :fixed="$vuetify.breakpoint.mobile"
      mini-variant     
      mobile-breakpoint="768"      
      :mini-variant-width="miniNavWidth"  
    >
      <v-row class="justify-center fill-height" no-gutters>
        <v-btn class="px-3 py-3" @click.stop="drawer = !drawer" icon>
          <v-icon size="32">$vuetify.icons.menu</v-icon>
        </v-btn>

        <v-btn
          fab          
          class="lang-btn p-1 align-self-end font-weight-bold"
          color="primary"     
          outlined
          x-small     
        >
          <span>Eng</span>
        </v-btn>
      </v-row>
    </v-navigation-drawer>

    <v-navigation-drawer      
      class="main-menu-drawer py-5 d-flex"
      color="menu"
      dark
      fixed
      temporary
      overlay-color="menu"
      overlay-opacity="0.8"
      :width="listMenuWidth"      
      v-model="drawer"      
    >
      <v-btn
        absolute
        icon
        class="px-3 py-3 ml-2"        
        @click.stop="drawer = !drawer"        
      >
        <v-icon size="32">$vuetify.icons.close</v-icon>
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
            <v-list-item-title v-text="item.name"></v-list-item-title>
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
        <v-btn          
          absolute
          bottom
          color="primary"
          class="lang-btn p-1 align-self-end font-weight-bold d-block d-sm-none ml-2"     
          fab
          outlined
          x-small               
        >
          <span>Eng</span>
        </v-btn>
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
    ],
  }),
  computed: {    
    miniNavWidth() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 85;
      } else {
        return 64;
      }
    },
    navwidth() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 100;
      } else if (this.$vuetify.breakpoint.md) {
        return 60;
      } else {
        return 50;
      }
    },
    listMenuWidth(){
      return this.navwidth < 100 ? `calc(${this.navwidth}% + ${this.miniNavWidth / 2}px` : `${this.navwidth}%`;
    },
  },
};
</script>