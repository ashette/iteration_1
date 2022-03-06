<template>
  <v-carousel v-model="model" height="100vh">
    <template v-slot:prev="{ on, attrs }">
      <v-btn class="prev" color="primary" icon v-bind="attrs" v-on="on"
        ><v-icon>$vuetify.icons.prev</v-icon></v-btn
      >
    </template>
    <template v-slot:next="{ on, attrs }">
      <v-btn class="next" color="primary" icon v-bind="attrs" v-on="on"
        ><v-icon>$vuetify.icons.next</v-icon></v-btn
      >
    </template>
    <v-carousel-item
      v-for="slider in sliders"
      :key="slider.id"
      :src="slider.image"
    >
      <template>
        <v-container fill-height class="px-8 px-lg-16 py-0">
          <v-row
            class="px-8 flex-column justify-sm-center"
            fill-height
            no-gutters
          >
            <div class="slider-content">
              <div
                class="
                  slider-content__title
                  font-weight-medium
                  white--text
                  mb-2
                "
              >
                {{ slider.title }}
              </div>
              <div
                class="
                  slider-content__subtitle
                  font-weight-light
                  disabled--text
                "
              >
                {{ slider.subtitle }}
              </div>
              <v-btn
                class="slider-content__button btn-more mt-8 px-15"
                color="primary"
                elevation="0"
                v-bind:class="`btn-more--${slider.color}`"
                >Подробнее</v-btn
              >
            </div>
          </v-row>
        </v-container>
      </template>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data: () => ({
    model: 0,
    sliders: [
      {
        id: 1,
        title: "Бесплатная парковка",
        subtitle:
          "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
        image: require("@/assets/slider_1.jpg"),
        color: "green",
      },
      {
        id: 2,
        title: "Страховка",
        subtitle: "Полная страховка страховка автомобиля",
        image: require("@/assets/slider_2.jpg"),
        color: "teal",
      },
      {
        id: 3,
        title: "Бензин",
        subtitle: "Полный бак на любой заправке города за наш счёт",
        image: require("@/assets/slider_3.jpg"),
        color: "bordo",
      },
      {
        id: 4,
        title: "Обслуживание",
        subtitle: "Автомобиль проходит еженедельное ТО",
        image: require("@/assets/slider_4.jpg"),
        color: "purple",
      },
    ],
  }),
};
</script>

<style lang="scss">
.v-carousel {
  .v-btn {
    &.prev,
    &.next {
      border-radius: 0;
      padding: 0 28px;
      width: 64px;
    }
  }
}
.v-window {
  .v-carousel &__prev,
  .v-carousel &__next {
    background: none;
    border-radius: 0;
    margin: 0;
    height: 100%;
    top: 0;

    .v-btn {
      height: inherit;

      &:hover:before,
      &:focus:before {
        opacity: 0.2;
      }

      &__content {
        color: white;
      }
    }
  }

  .v-carousel {
    &__controls {
      background: none;
      height: 64px;

      &__item {
        width: 8px;
        height: 8px;
        margin: 0 4px;

        &::before {
          opacity: 1 !important;
        }

        .v-icon {
          opacity: 1;
        }

        &.v-item--active {
          color: var(--v-primary-base);
        }
      }
    }
  }
}

.slider-content {
  min-height: 250px;

  &__title {
    font-size: 40px;
  }

  &__subtitle {
    font-size: 24px;
    line-height: 22px;
  }

  &__button {
    max-width: 164px;
  }
}

.v-application {
  .btn-more--green {
    background: linear-gradient(
      90deg,
      var(--v-green-darken1),
      var(--v-green-base)
    ) !important;
  }

  .btn-more--teal {
    background: linear-gradient(
      90deg,
      var(--v-teal-darken1),
      var(--v-teal-base)
    ) !important;
  }

  .btn-more--bordo {
    background: linear-gradient(
      90deg,
      var(--v-bordo-darken1),
      var(--v-bordo-base)
    ) !important;
  }

  .btn-more--purple {
    background: linear-gradient(
      90deg,
      var(--v-purple-darken1),
      var(--v-purple-base)
    ) !important;
  }
}

@media #{map-get($display-breakpoints, 'lg-and-down')} {
  .slider-content {
    &__title {
      font-size: 32px;
      line-height: 37px;
    }

    &__subtitle {
      font-size: 22px;
    }
  }

  .v-carousel {
    .v-btn {
      &.prev,
      &.next {
        padding: 0 12px;
        width: 32px;
      }
    }
  }
}
</style>