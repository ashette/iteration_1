<template>
  <div>
    <v-row no-gutters>
      <v-radio-group
        v-model="category"
        class="control-group pt-0 mt-0"
        on-icon="$vuetify.icon.radioOn"
        off-icon="$vuetify.icon.radioOn"
        row
      >
        <v-radio label="Все модели" @change="getCategoryProducts()"></v-radio>
        <v-radio
          v-for="category in categories"
          :key="category.id"
          :label="category.name"
          :value="category.id"
          @change="getCategoryProducts(category.id)"
        ></v-radio>
      </v-radio-group>
    </v-row>
    <ValidationProvider
      :rules="stepFields.product.rules"
      :name="stepFields.product.name"
      :custom-messages="customMessages"
      v-slot="{ errors }"
    >
      <v-input v-model="stepFields.product.value" class="d-none"></v-input>
      <v-input :error-messages="errors" error></v-input>
      <template v-if="productsLoading">
        <div class="product-grid pt-8">
          <v-container>
            <v-row>
              <v-col v-for="n in pageLimit" :key="n" class="col-12 col-sm-6">
                <v-skeleton-loader
                  class="mx-auto"
                  max-height="200"
                  type="card-heading, text, image"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </template>
      <v-item-group
        v-else-if="products.length"
        v-model="stepFields.product.value"
        class="product-grid pt-8"
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
                  :color="active ? 'primary' : ''"
                  class="d-flex flex-column"
                  flat
                  height="224"
                  outlined
                  rounded="0"
                  @click="toggle"
                >
                  <v-card-title>{{ product.name }}</v-card-title>
                  <v-card-subtitle
                    >{{ product.priceMin }} -
                    {{ product.priceMax }}</v-card-subtitle
                  >
                  <div class="px-4">
                    <v-img
                      contain
                      class="align-self-end ml-auto"
                      max-height="120"
                      max-width="260"
                      :src="product.thumbnail.path"
                      @error="handleImgError"
                    ></v-img>
                  </div>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
        <div class="text-center">
          <v-pagination
            v-model="page"
            class="mt-4"
            :length="paginationLength"
            @input="handlePageChange"
          ></v-pagination>
        </div>
      </v-item-group>
      <v-row v-else class="justify-center py-4">
        В этой категории нет товаров
      </v-row>
    </ValidationProvider>
  </div>
</template>

<script>
import MainService from "@/service/MainService.js";
export default {
  props: {
    currentStep: Number,
    fields: Object,
    price: Object,
    updateOptions: Function,
    updatePrice: Function,
  },
  data: () => ({
    category: null,
    customMessages: {
      required: "Выберете {_field_}",
    },
    categories: null,
    page: 1,
    pageLimit: 8,
    pageCount: 0,
    products: null,
    productsLoading: true,
    no_image: require("@/assets/no_image.jpg"),
  }),
  methods: {
    getRequestParams(categoryId, page, pageSize) {
      let params = {};
      if (categoryId) {
        params["categoryId"] = categoryId;
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["limit"] = pageSize;
      }
      return params;
    },
    async getCategories() {
      try {
        this.categories = await MainService.getCategories();
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async getCategoryProducts(categoryId) {
      if (categoryId !== this.category) {
        this.page = 1;
      }

      const params = this.getRequestParams(
        categoryId,
        this.page,
        this.pageLimit
      );

      this.productsLoading = true;

      try {
        const products = await MainService.getProducts(params);
        this.products = products.data;
        this.pageCount = products.count;
      } catch (error) {
        console.log(error);
      } finally {
        this.productsLoading = false;
      }
    },
    updateOptionProduct() {
      const defaultOptionProduct = {
        type: "product",
        name: "",
        value: "",
        stepId: this.currentStep,
      };

      const isProductSelected = this.stepFields.product.value !== undefined;

      if (isProductSelected) {
        this.updateOptions({
          ...defaultOptionProduct,
          name: this.stepFields.product.name,
          value: this.stepFields.product.value.name,
        });

        this.updatePrice({
          priceMin: this.stepFields.product.value.priceMin,
          priceMax: this.stepFields.product.value.priceMax,
          total: 0
        });
      } else {
        this.updateOptions(defaultOptionProduct);
        this.updatePrice({
          ...this.price,
          priceMin: 0,
          priceMax: 0,
        });
      }
    },
    handlePageChange(value) {
      this.page = value;
      this.getCategoryProducts(this.category);
    },
    handleImgError: function (image) {
      const no_image = require("@/assets/no_image.jpg");
      this.products = this.products.map((product) => {
        if (product.thumbnail.path === image) {
          product.thumbnail.path = no_image;
        }
        return product;
      });
    },
  },
  mounted() {
    if (this.stepFields.product.value) {
      this.category = this.stepFields.product.value.categoryId.id;
    }
    this.getCategories();
    this.getCategoryProducts(this.category);
  },
  computed: {
    paginationLength: function () {
      let length = Math.round(this.pageCount / this.pageLimit);
      return length > 1 ? length : 1;
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

<style lang="scss">
.product-grid {
  max-width: 740px;
}
</style>