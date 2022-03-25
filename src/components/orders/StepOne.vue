<template>
  <div>
    <ValidationProvider
      :rules="fields.city.rules"
      :name="fields.city.name"
      v-slot="{ errors }"
    >
      <div class="control-group">
        <span class="control-group__label">Город</span>
        <v-autocomplete
          v-model="stepFields.city.value"
          class="control-group__input"
          clearable
          clear-icon="$vuetify.icons.close"
          :error-messages="errors[0]"
          :items="cities"
          item-text="name"
          return-object
          :loading="citiesLoading"
          no-data-text="Городов не найдено"
          placeholder="Начните вводить город ..."
          @input="loadPoints"
        ></v-autocomplete>
      </div>
    </ValidationProvider>
    <ValidationProvider
      :rules="fields.point.rules"
      :name="fields.point.name"
      v-slot="{ errors }"
    >
      <div class="control-group">
        <span class="control-group__label">Пункт выдачи</span>
        <v-autocomplete
          v-model="stepFields.point.value"
          class="control-group__input"
          clearable
          clear-icon="$vuetify.icons.close"
          :error-messages="errors[0]"
          :items="points"
          :loading="pointsLoading"
          item-text="address"
          return-object
          placeholder="Начните вводить пункт ..."
          no-data-text="Пунктов выдачи не найдено"
          @input="updateOptionPoint"
        ></v-autocomplete>
      </div>
    </ValidationProvider>
    <div class="control-group mt-12">
      <span class="control-group__label mb-4">Выбрать на карте:</span>
      <yandex-map
        :coords="centerCoords"
        :settings="mapSettings"
        :controls="mapControls"
        style="width: 100%; max-width: 736px; height: 352px"
        zoom="10"
        @map-was-initialized="mapWasInitializedHandler"
      ></yandex-map>
    </div>
  </div>
</template>

<script>
import MainService from "@/service/MainService.js";
import { yandexMap, loadYmap } from "vue-yandex-maps";

export default {
  components: { yandexMap },
  props: {
    currentStep: Number,
    fields: Object,
    updateOptions: Function,
  },
  data: () => ({
    cities: null,
    points: null,
    map: null,
    centerCoords: [55.76, 37.64],
    mapPin: require("@/assets/mapPin.png"),
    mapSettings: {
      apiKey: process.env.VUE_APP_YA_MAPS_KEY,
      lang: "ru_RU",
      coordorder: "latlong",
      enterprise: false,
      version: "2.1",
      load: "package.full",
    },
    mapControls: ["zoomControl"],
    citiesLoading: true,
    pointsLoading: false,
  }),
  methods: {
    getPointAddress(option) {
      let optionCity;
      if (option.value) {
        if (option.value.cityId) {
          optionCity = `${option.value.cityId.name}`;
        }
        return `${optionCity}, ${option.value.address}`;
      }

      return;
    },
    updateOptionPoint() {
      const optionPoint = {
        type: "point",
        name: this.stepFields.point.name,
        value: this.getPointAddress(this.stepFields.point),
        stepId: this.currentStep,
      };

      this.updateOptions(optionPoint);

      if (this.stepFields.point.value) {
        this.map.setCenter(this.stepFields.point.value.coords);
      }
    },
    async loadPoints() {
      this.clearMapObjects(this.map);
      try {
        this.pointsLoading = true;
        if(this.stepFields.city.value){
          this.points = await MainService.getPoints(this.stepFields.city.value.id);
        }
        if (this.points) {
          this.points = await this.getPointCoordinates(this.points);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.pointsLoading = false;
      }
    },
    async getPointCoordinates(points) {
      const updatedPoints = points
        .filter((point) => point)
        .map(async (point) => {
          if (point.cityId && point.address) {
            const fullAddress = `${point.cityId.name}, ${point.address}`;
            const result = await ymaps
              .geocode(fullAddress, {
                results: 1,
              })
              .then((res) => res);

            const firstGeoObject = result.geoObjects.get(0),
              coords = firstGeoObject.geometry.getCoordinates(),
              bounds = firstGeoObject.properties.get("boundedBy");

            if (coords) {
              this.map.geoObjects.add(
                new ymaps.Placemark(
                  coords,
                  {
                    balloonContentHeader: firstGeoObject.properties.get("name"),
                    balloonContent: firstGeoObject.getAddressLine(),
                  },
                  {
                    iconLayout: "default#image",
                    iconImageHref: this.mapPin,
                    iconImageSize: [18, 18],
                  }
                )
              );
            }

            this.map.setBounds(bounds, {
              checkZoomRange: true,
            });

            return {
              ...point,
              fullAddress,
              coords,
            };
          }
          return null;
        });

      return await Promise.all(updatedPoints).then((point) => point);
    },
    clearMapObjects(map) {
      return map.geoObjects.removeAll();
    },
    mapWasInitializedHandler(map) {
      this.map = map;
    },
  },
  async mounted() {
    try {
      await loadYmap({ ...this.mapSettings });
      this.cities = await MainService.getCities();
      this.loadPoints();
    } catch (error) {
      console.log(error);
    } finally {
      this.citiesLoading = false;
    }
  },
  computed: {
    stepFields: {
      get() {
        return this.fields;
      },
      set(value) {
        this.$emit("update:fields", value);
      },
    },
  },
};
</script>

<style>
.ymaps-2-1-79-ground-pane {
  filter: grayscale(1);
}
.ymaps-2-1-79-copyrights-pane {
  display: none;
}
</style>