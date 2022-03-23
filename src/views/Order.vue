<template>
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
                        {{ option.point }}
                        <span
                          class="option-name font--text font-weight-light"
                          >{{ option.name }}</span
                        >
                        <span class="option-divider"></span>
                        <span
                          class="option-value tertiary--text font-weight-light"
                        >
                          {{ option.value }}
                        </span>
                      </li>
                    </ul>
                    <div
                      v-if="updatedPrice"
                      class="order-totals__price font--text font-weight-medium"
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
                      >{{ actionName }}</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-stepper>
          </ValidationObserver>
        </v-container>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import StepOne from "@/components/orders/StepOne";
import StepTwo from "@/components/orders/StepTwo";
import StepThree from "@/components/orders/StepThree";
import StepFour from "@/components/orders/StepFour";

export default {
  name: "Order",
  components: {
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