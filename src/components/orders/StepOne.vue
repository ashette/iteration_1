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
          placeholder="Начните вводить город ..."
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
          placeholder="Начните вводить пункт ..."
          @input="updateOptionPoint"
        ></v-autocomplete>
      </div>
    </ValidationProvider>
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
  props: {
    currentStep: Number,
    fields: Object,
    updateOptions: Function,
  },
  data: () => ({
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
    points: [
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
  methods: {
    updateOptionPoint() {
      const optionPoint = {
        type: "point",
        name: this.stepFields.point.name,
        value: this.stepFields.point.value,
        stepId: this.currentStep,
      };

      this.updateOptions(optionPoint);
    },
  },
  computed: {
    filteredOptions: () => {
      return this.stepOptions.filter(function (option) {
        return option.type !== "point";
      });
    },
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