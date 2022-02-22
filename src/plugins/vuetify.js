import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import MenuIcon from '../components/icons/MenuIcon.vue';
import CloseIcon from '../components/icons/CloseIcon.vue';
import TelegramIcon from '../components/icons/TelegramIcon.vue';
import FacebookIcon from '../components/icons/FacebookIcon.vue';
import InstagramIcon from '../components/icons/InstagramIcon.vue';
import MapPinIcon from '../components/icons/MapPinIcon.vue';
import PrevIcon from '../components/icons/PrevIcon.vue';
import NextIcon from '../components/icons/NextIcon.vue';

Vue.use(Vuetify);

const THEME_ICONS = {
    menu: { component: MenuIcon },
    close: { component: CloseIcon },
    telegram: { component: TelegramIcon },
    facebook: { component: FacebookIcon },
    instagram: { component: InstagramIcon },
    mapPin: { component: MapPinIcon },
    prev: { component: PrevIcon },
    next: { component: NextIcon }
}

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: {
                    base: '#0EC261',
                    darken1: '#0B934A',
                    darken2: '#076432',
                },
                secondary: '#7B0C3B',
                tertiary: '#999999',
                background: '#FFFFFF',
                disabled: '#EEEEEE',
                font: '#121212',
                menu: '#151B1F',
                green: {
                    base: '#0C7B1B',
                    darken1: '#13493F'
                },
                teal: {
                    base: '#0C7B67',
                    darken1: '#132949'
                },
                bordo: {
                    base: '#7B0C3B',
                    darken1: '#493013'
                },
                purple: {
                    base: '#720C7B',
                    darken1: '#281349'
                }

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
            xs: 768,
            sm: 1024,
            md: 1440,
            lg: 1920,
        },
    },
});
