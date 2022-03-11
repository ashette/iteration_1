<template>
  <div>
    <v-row no-gutters>
      <v-radio-group
        v-model="category"
        row
        on-icon="$vuetify.icon.radioOn"
        off-icon="$vuetify.icon.radioOn"
        class="control-group pt-0 mt-0"
      >
        <v-radio
          v-for="category in categories"
          :key="category.id"
          :label="category.name"
          :value="category.id"
        ></v-radio>
      </v-radio-group>
    </v-row>
    <ValidationProvider
      :rules="stepFields.product.rules"
      :name="stepFields.product.name"
      :custom-messages="customMessages"
      v-slot="{ errors }"
    >
      <v-input :error-messages="errors" error></v-input>
      <v-item-group
        class="product-grid pt-8"
        v-model="stepFields.product.value"
        @change="updateOptionProduct"
      >
        <v-container>
          <v-row>
            <v-col
              v-for="product in products"
              :key="product.id"
              class="pa-0 col-12 col-sm-6"
            >
              <v-item v-slot="{ active, toggle }" :value="product">
                <v-card
                  outlined
                  :color="active ? 'primary' : ''"
                  class="d-flex flex-column"
                  height="224"
                  flat
                  rounded="0"
                  @click="toggle"
                >
                  <v-card-title>{{ product.name }}</v-card-title>
                  <v-card-subtitle
                    >{{ product.priceMin }} -
                    {{ product.priceMin }}</v-card-subtitle
                  >
                  <v-img
                    :src="product.thumbnail"
                    contain
                    class="align-self-end"
                  ></v-img>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  props: {
    currentStep: Number,
    fields: Object,
    updateOptions: Function
  },
  data: () => ({
    category: 1,
    customMessages: {
      required: "Выберете {_field_}",
    },
    categories: [
      {
        id: 1,
        name: "{radio-option #1}",
      },
      {
        id: 2,
        name: "{radio-option #2}",
      },
      {
        id: 3,
        name: "{radio-option #3}",
      },
    ],
    products: [
      {
        id: 1,
        name: "{product #1}",
        priceMax: 0,
        priceMin: 0,
        thumbnail: require("@/assets/car.jpg"),
      },
      {
        id: 2,
        name: "{product #2}",
        priceMax: 0,
        priceMin: 0,
        thumbnail: require("@/assets/car.jpg"),
      },
      {
        id: 3,
        name: "{product #3}",
        priceMax: 0,
        priceMin: 0,
        thumbnail: require("@/assets/car.jpg"),
      },
      {
        id: 4,
        name: "{product #1}",
        priceMax: 0,
        priceMin: 0,
        thumbnail: require("@/assets/car.jpg"),
      },
      {
        id: 5,
        name: "{product #2}",
        priceMax: 0,
        priceMin: 0,
        thumbnail: require("@/assets/car.jpg"),
      },
      {
        id: 6,
        name: "{product #3}",
        priceMax: 0,
        priceMin: 0,
        thumbnail: require("@/assets/car.jpg"),
      },
    ],
  }),
  methods: {
    getProductName(product) {
      return product ? product.name : null;
    },

    updateOptionProduct() { // Функция будет доставать нужное значение для опции Модель
      const optionProduct = {
        type: "product",
        name: this.stepFields.product.name,
        value: this.getProductName(this.stepFields.product.value),
        stepId: this.currentStep
      };

      this.updateOptions(optionProduct);
    },
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

<style lang="scss">
.product-grid {
  max-width: 740px;
}
</style>