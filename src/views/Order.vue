<template>
  <div>
    <NavigationComponent />
    <v-main>
      <v-row no-gutters class="fill-height">
        <v-col class="d-flex flex-column">
          <HeaderComponent class="flex-grow-0" />
          <div class="order-page flex-grow-1 px-sm-6 px-lg-12">
            <v-container class="px-4 py-0">
              <ValidationObserver v-slot="{ valid, passes }">
                <v-stepper
                  v-model="currentStep"
                  class="d-flex flex-column"
                  flat
                  rounded="0"
                >
                  <v-stepper-header>
                    <v-stepper-step
                      v-for="step in steps"
                      :key="step.id"
                      :step="step.id"
                      :editable="stepEdit(step.id, valid)"
                      :complete="step.id < currentStep"
                    >
                      {{ step.name }}
                      <v-icon v-if="showDivider(step.id)"
                        >$vuetify.icons.divider</v-icon
                      >
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
                      <v-form
                        id="order_form"
                        @submit.prevent="passes(stepActivate)"
                      >
                        <v-stepper-content
                          v-for="step in steps"
                          :key="step.id"
                          :step="step.id"
                          class="pt-8"
                        >
                          <component
                            :currentStep="currentStep"
                            :fields="fields"
                            :updateOptions="updateOptions"
                            :price="price"
                            :updatePrice="updatePrice"
                            :is="getStepComponent(step.id)"
                            v-if="step.id == currentStep"
                          ></component>
                        </v-stepper-content>
                      </v-form>
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
                            <span
                              class="option-name font--text font-weight-light"
                              >{{ option.name }}</span
                            >
                            <span class="option-divider"></span>
                            <span
                              class="
                                option-value
                                tertiary--text
                                font-weight-light
                              "
                            >
                              {{ option.value }}
                            </span>
                          </li>
                        </ul>
                        <div
                          v-if="updatedPrice"
                          class="
                            order-totals__price
                            font--text font-weight-medium
                          "
                        >
                          Цена:&nbsp;
                          <span class="price-value font-weight-regular">
                            {{ updatedPrice }}
                          </span>
                        </div>
                        <v-btn
                          class="order-totals__button mt-8"
                          color="primary"
                          :disabled="!valid"
                          elevation="0"
                          form="order_form"
                          type="submit"
                          @click="showDialog()"
                          >{{ actionName }}
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-stepper>
              </ValidationObserver>
            </v-container>
          </div>
          <v-dialog
            v-model="dialog"
            overlay-color="white"
            overlay-opacity="0.9"
            :persistent="isRequesting"
          >
            <div
              v-if="!isRequesting"
              class="
                order-sumbit-dialog
                d-flex
                align-center
                justify-center
                flex-column
              "
            >
              <v-subheader class="order-sumbit-dialog__subheader justify-center"
                >Подтвердить заказ</v-subheader
              >
              <div class="order-sumbit-dialog__buttons mt-6">
                <v-btn color="primary" elevation="0" @click="setOrderDetails()">
                  Подтвердить
                </v-btn>
                <v-btn color="secondary" elevation="0" @click="dialog = false">
                  Вернуться
                </v-btn>
              </div>
            </div>
            <div
              v-else
              class="
                order-sumbit-dialog
                d-flex
                align-center
                justify-center
                flex-column
                pa-4
              "
            >
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
          </v-dialog>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import MainService from "@/service/MainService.js";
import NavigationComponent from "@/components/NavigationComponent";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import StepOne from "@/components/orders/StepOne";
import StepTwo from "@/components/orders/StepTwo";
import StepThree from "@/components/orders/StepThree";
import StepFour from "@/components/orders/StepFour";

export default {
  name: "Order",
  components: {
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
  },

  data: () => ({
    appName: "Need for drive",
    currentStep: 1,
    options: [],
    dialog: false,
    orderDetails: {},
    isRequesting: false,
    price: {
      priceMin: 0,
      priceMax: 0,
      total: 0,
    },
    fields: {
      city: {
        value: null,
        name: "Город",
        rules: "required",
        stepId: 1,
      },
      point: {
        value: null,
        name: "Пункт выдачи",
        rules: "required",
        stepId: 1,
      },
      product: {
        value: null,
        name: "Модель",
        rules: "required",
        stepId: 2,
      },
      color: {
        value: null,
        name: "Цвет",
        rules: "required",
        stepId: 3,
      },
      dateFrom: {
        value: null,
        name: "Начало аренды",
        rules: "required",
        stepId: 3,
      },
      dateTo: {
        value: null,
        name: "Конец аренды",
        rules: "required|after:@dateFrom",
        stepId: 3,
      },
      rate: {
        value: null,
        name: "Тариф",
        rules: "required",
        stepId: 3,
      },
      isFullTank: {
        value: null,
        name: "Полный бак",
        stepId: 3,
      },
      isNeedChildChair: {
        value: null,
        name: "Детское кресло",
        stepId: 3,
      },
      isRightWheel: {
        value: null,
        name: "Правый руль",
        stepId: 3,
      },
    },
    steps: [
      {
        id: 1,
        name: "Местоположение",
        buttonActionName: "Выбрать модель",
      },
      {
        id: 2,
        name: "Модель",
        buttonActionName: "Дополнительно",
      },
      {
        id: 3,
        name: "Дополнительно",
        buttonActionName: "Итого",
      },
      {
        id: 4,
        name: "Итого",
        buttonActionName: "Заказать",
      },
    ],
  }),
  methods: {
    stepActivate() {
      return this.currentStep < this.steps.length
        ? (this.currentStep = this.currentStep + 1)
        : false;
    },
    getStepComponent(step) {
      switch (step) {
        case 1:
          return "StepOne";
        case 2:
          return "StepTwo";
        case 3:
          return "StepThree";
        case 4:
          return "StepFour";
        default:
          return "StepOne";
      }
    },
    stepEdit(stepId, valid) {
      const isEditable =
        (this.currentStep + 1 == stepId && valid) || stepId <= this.currentStep;
      return isEditable;
    },
    showDivider(stepId) {
      return stepId !== this.steps.length;
    },
    showDialog() {
      if (this.currentStep == this.steps.length) {
        this.dialog = !this.dialog;
      }
    },
    updateOptions(updatedOption) {
      this.options = this.options.filter((option) => {
        return (
          option.type !== updatedOption.type &&
          option.stepId <= this.currentStep
        );
      });

      this.clearFields(updatedOption.stepId);

      if (updatedOption.value) {
        this.options.push(updatedOption);
      }
    },
    updatePrice(price) {
      this.price = price;
    },
    clearFields(currentStep) {
      for (let field in this.fields) {
        if (this.fields.hasOwnProperty(field)) {
          if (this.fields[field].stepId > currentStep) {
            this.fields[field].value = null;
          }
        }
      }
    },
    async setOrderDetails() {
      let orderData = {
        cityId: this.fields.city.value,
        pointId: this.fields.point.value,
        carId: this.fields.product.value,
        color: this.fields.color.value,
        dateFrom: new Date(this.fields.dateFrom.value).valueOf(),
        dateTo: new Date(this.fields.dateTo.value).valueOf(),
        rateId: this.fields.rate.value,
        price: this.price.total,
        isFullTank: this.fields.isFullTank.value,
        isNeedChildChair: this.fields.isNeedChildChair.value,
        isRightWheel: this.fields.isRightWheel.value,
      };

      const newStatusName = "Новые";

      try {
        const statusData = await MainService.getOrderStatus();
        const orderStatus = statusData.find(
          (status) => status.name === newStatusName
        );

        this.isRequesting = true;

        if (orderStatus) {
          orderData = { ...orderData, orderStatusId: orderStatus };
        }

        const newOrderData = await MainService.addOrder(orderData);

        if (newOrderData) {
          this.$router.push({
            name: "OrderDetails",
            params: {
              id: newOrderData.id,
            },
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isRequesting = false;
      }
    },
  },
  computed: {
    updatedPrice() {
      if (this.price.total) {
        return `${this.price.total}₽`;
      } else if (this.price.priceMin && this.price.priceMax) {
        return `от ${this.price.priceMin} до ${this.price.priceMax}₽`;
      }
      return null;
    },
    actionName() {
      return this.steps.find((step) => step.id === this.currentStep)
        .buttonActionName;
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/order.scss";
</style>