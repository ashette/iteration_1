<template>
  <v-row no-gutters class="fill-height">
    <v-col class="d-flex flex-column">
      <HeaderComponent class="flex-grow-0" />
      <div class="order-page flex-grow-1 px-sm-6 px-lg-12">
        <v-container
          v-if="isRequesting"
          class="d-flex justify-center align-center px-4 py-0"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-container>
        <v-container class="px-4 py-0">
          <div v-if="is404Error">Order Not Found</div>
          <v-stepper
            v-else
            v-model="currentStep"
            class="d-flex flex-column"
            flat
            rounded="0"
          >
            <v-stepper-header>
              <v-stepper-step complete :step="currentStep">
                {{ orderName }}
              </v-stepper-step>
            </v-stepper-header>

            <v-row class="fill-height" no-gutters>
              <v-stepper-items
                class="
                  order-page__steps
                  col-12 col-sm-8
                  pa-4
                  pt-0
                  pl-sm-0
                  pr-md-8
                "
              >
                <v-stepper-content class="pt-8" :step="currentStep">
                  <div>
                    <v-row v-if="orderDetails" no-gutters>
                      <div class="col-12 col-sm-6 order-total-info pa-0 mb-8">
                        <div class="order-total-info__item main-title">
                          Ваш заказ подтверждён
                        </div>
                        <div class="order-total-info__item title">
                          {{ orderDetails.carId.name }}
                        </div>
                        <div class="order-total-info__item id">
                          {{ orderDetails.carId.number }}
                        </div>
                        <div
                          v-if="productGas"
                          class="order-total-info__item option"
                        >
                          <strong>Топливо: </strong>
                          <span>{{ productGas }}</span>
                        </div>
                        <div class="order-total-info__item option">
                          <strong>Доступна с </strong>
                          <span>{{ availibleFrom }}</span>
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 order-image mt-6">
                        <v-img
                          :src="orderDetails.carId.thumbnail.path"
                          contain
                          max-width="256"
                          @error="handleImgError"
                        ></v-img>
                      </div>
                    </v-row>
                  </div>
                </v-stepper-content>
              </v-stepper-items>

              <v-col
                class="
                  order-page__total
                  col-12 col-sm-4
                  pa-4
                  pr-sm-0
                  pt-md-8
                  pl-md-8
                "
              >
                <div class="order-totals">
                  <div
                    class="
                      order-totals__header
                      text-right
                      font--text font-weight-medium
                    "
                  >
                    Ваш заказ:
                  </div>
                  <ul class="order-totals__options my-8">
                    <li
                      v-for="option in options"
                      :key="option.id"
                      class="
                        order-totals__options-item
                        d-flex
                        justify-space-between
                        align-end
                      "
                    >
                      <span class="option-name font--text font-weight-light">
                        {{ option.name }}
                      </span>
                      <span class="option-divider"></span>
                      <span
                        class="option-value tertiary--text font-weight-light"
                      >
                        {{ option.value }}
                      </span>
                    </li>
                  </ul>
                  <div
                    v-if="orderPrice"
                    class="order-totals__price font--text font-weight-medium"
                  >
                    Цена:&nbsp;
                    <span class="price-value font-weight-regular">
                      {{ orderPrice }}
                    </span>
                  </div>
                  <v-btn
                    class="order-totals__button mt-8"
                    color="secondary"
                    elevation="0"
                  >
                    Отменить
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-stepper>
        </v-container>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import MainService from "@/service/MainService.js";
export default {
  name: "Order",
  components: {
    HeaderComponent,
  },

  data: () => ({
    appName: "Need for drive",
    orderDetails: null,
    currentStep: 1,
    options: [],
    noImage: require("@/assets/no_image.jpg"),
    isRequesting: true,
    is404Error: false,
  }),
  methods: {
    async getOrderDetails() {
      try {
        const data = await MainService.getOrder(this.$route.params.id);

        this.orderDetails = data;
        this.setOptions(this.orderDetails);
      } catch (error) {
        if (error.response.status === 404) {
          this.is404Error = true;
        }
        console.log(error);
      } finally {
        this.isRequesting = false;
      }
    },
    getDuration(interval) {
      const days = Math.floor(interval / 8.64e7),
        hours = Math.floor((interval / 3.6e6) % 24),
        minutes = Math.floor((interval / 6e4) % 60);

      let dateString = "";

      if (days > 0) {
        dateString = dateString + `${days}д `;
      }
      if (hours > 0) {
        dateString = dateString + `${hours}ч `;
      }
      if (minutes > 0) {
        dateString = dateString + `${minutes}м `;
      }

      return dateString;
    },
    setOptions(data) {
      if (data) {
        if (data.cityId && data.pointId) {
          const fullAddress = `${data.cityId.name}, ${data.pointId.address}`;
          this.options.push({ name: "Пункт выдачи", value: fullAddress });
        }

        if (data.carId) {
          this.options.push({ name: "Модель", value: data.carId.name });
        }

        if (data.color) {
          this.options.push({ name: "Цвет", value: data.color });
        }

        if (data.dateFrom && data.dateTo) {
          const interval = data.dateTo - data.dateFrom;
          this.options.push({
            name: "Длительность аренды",
            value: this.getDuration(interval),
          });
        }

        if (data.rateId.rateTypeId) {
          const rateName = data.rateId.rateTypeId.name;
          this.options.push({ name: "Тариф", value: rateName });
        }

        if (data.isFullTank) {
          this.options.push({
            name: "Полный бак",
            value: data.isFullTank ? "Да" : "",
          });
        }

        if (data.isNeedChildChair) {
          this.options.push({
            name: "Детское кресло",
            value: data.isNeedChildChair ? "Да" : "",
          });
        }

        if (data.isRightWheel) {
          this.options.push({
            name: "Правый руль",
            value: data.isRightWheel ? "Да" : "",
          });
        }
      }
    },
    handleImgError: function () {
      this.orderDetails.carId.thumbnail.path = this.noImage;
    },
  },
  mounted() {
    this.getOrderDetails();
  },
  computed: {
    orderPrice: function () {
      return this.orderDetails ? `${this.orderDetails.price}₽` : "";
    },
    orderName: function () {
      return this.orderDetails ? `Заказ номер ${this.orderDetails.id}` : "";
    },
    productGas: function () {
      const fullTank = this.orderDetails.isFullTank;
      const productTank = this.orderDetails.carId.tank;

      if (fullTank) {
        return "100%";
      } else if (productTank) {
        return `${productTank}%`;
      }
      return null;
    },
    availibleFrom: function () {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };

      return new Date(this.orderDetails.dateFrom).toLocaleDateString(
        "ru",
        options
      );
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/order.scss";
</style>