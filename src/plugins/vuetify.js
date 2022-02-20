import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import MenuIcon from '../components/icons/MenuIcon.vue';
import CloseIcon from '../components/icons/CloseIcon.vue';
import TelegramIcon from '../components/icons/TelegramIcon.vue';
import FacebookIcon from '../components/icons/FacebookIcon.vue';
import InstagramIcon from '../components/icons/InstagramIcon.vue';
import MapPinIcon from '../components/icons/MapPinIcon.vue';

Vue.use(Vuetify);

const THEME_ICONS = {
    menu: { component: MenuIcon },
    close: { component: CloseIcon },
    telegram: { component: TelegramIcon },
    facebook: { component: FacebookIcon },
    instagram: { component: InstagramIcon },
    mapPin: { component: MapPinIcon }
}

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: {
                    base: '#0EC261',
                    darken1: '#0B934A',
                    darken2: '#076432'
                },
                secondary: '#7B0C3B',
                tertiary: '#999999',
                background: '#FFFFFF',
                background_disabled: '#EEEEEE',
                font: '#121212',                
                menu_background: '#151B1F'
            }
        },
        options: {
            customProperties: true
        },
        loader: 'sass-loader',
    },
    icons: {
        values: THEME_ICONS,
    },
    breakpoint: {
        thresholds: {
          xs: 720,
          sm: 1024,
          md: 1440,
          lg: 1920,
        },
      },
});
