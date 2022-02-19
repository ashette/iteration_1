import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import MenuIcon from '../components/icons/MenuIcon.vue';
import CloseIcon from '../components/icons/CloseIcon.vue';
import TelegramIcon from '../components/icons/TelegramIcon.vue';
import FacebookIcon from '../components/icons/FacebookIcon.vue';
import InstagramIcon from '../components/icons/InstagramIcon.vue';

Vue.use(Vuetify);

const THEME_ICONS = {
    menu: { component: MenuIcon },
    close: { component: CloseIcon },
    telegram: { component: TelegramIcon },
    facebook: { component: FacebookIcon },
    instagram: { component: InstagramIcon },
}

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#0EC261',
                secondary: '#7B0C3B',
                background: '#FFFFFF',
                background_disabled: '#EEEEEE',
                font: '#121212',
                font_disabled: '#999999',
                menu_background: '#151B1F'
            }
        },
        options: {
            customProperties: true
        },
    },
    icons: {
        values: THEME_ICONS,
    },
});
