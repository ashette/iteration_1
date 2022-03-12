<template>
  <div>
    <div class="control-group">
      <span class="control-group__label">Город</span>
      <v-autocomplete
        v-model="cityId"
        class="control-group__input"
        clearable
        placeholder="Начните вводить город ..."
        :items="cities"
        clear-icon="$vuetify.icons.close"
        required
      ></v-autocomplete>
    </div>
    <div class="control-group">
      <span class="control-group__label">Пункт выдачи</span>
      <v-autocomplete
        v-model="pointId"
        class="control-group__input"
        clearable
        :clear-icon="$vuetify.icons.close"
        placeholder="Начните вводить пункт ..."
        required
      ></v-autocomplete>
    </div>
    <div class="control-group mt-12">
      <span class="control-group__label mb-4">Выбрать на карте:</span>
      <v-img
        lazy-src="@/assets/map.jpg"
        max-height="352"
        max-width="736"
        src="@/assets/map.jpg"
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    cityId: null,
    pointId: null,
    cities: [
      "Уфа1",
      "Уральск1",
      "Увельский1",
      "Ульяновск1",
      "Уфа",
      "Уральск",
      "Увельский",
      "Ульяновск",
    ],
  }),
  computed: {
    stepOne: {
      get: function () {
        return this.step;
      },
      set(value) {
        this.$emit("update:step", value);
      },
    },
  },
};
</script>


<style lang="scss">
</style>
