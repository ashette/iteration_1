<template>
  <v-row no-gutters class="fill-height">
    <v-col class="d-flex flex-column">
      <HeaderComponent class="flex-grow-0" />
      <div class="order-page flex-grow-1 px-sm-6 px-lg-12">
        <v-container class="px-4 py-0">
          <v-stepper
            flat
            rounded="0"
            v-model="currentStep"
            class="d-flex flex-column"
          >
            <v-stepper-header>
              <v-stepper-step
                :editable="currentStep + 1 == step.id || step.id <= currentStep"
                :complete="step.id < currentStep"
                :step="step.id"
                v-for="step in steps"
                :key="step.id"
              >
                {{ step.name }}
                <v-icon v-if="step.id !== steps.length"
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
                <v-form>
                  <v-stepper-content
                    :step="step.id"
                    v-for="step in steps"
                    :key="step.id"
                    class="pt-8"
                  >
                    <component
                      v-if="step.id == currentStep"
                      :is="getStepComponent(step.id)"
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
                      class="
                        order-totals__options-item
                        d-flex
                        justify-space-between
                        align-end
                      "
                    >
                      <span class="option-name font--text font-weight-light"
                        >{option_name}</span
                      >
                      <span class="option-divider"></span>
                      <span
                        class="option-value tertiary--text font-weight-light"
                      >
                        {option_value}
                      </span>
                    </li>
                  </ul>
                  <div
                    class="order-totals__price font--text font-weight-medium"
                  >
                    Цена:&nbsp;
                    <span class="price-value font-weight-regular">
                      от {price_from} до {price_to}
                    </span>
                  </div>
                  <v-btn
                    class="order-totals__button mt-8"
                    color="primary"
                    elevation="0"
                    @click="stepActivate()"
                    >{{ actionName }}</v-btn
                  >
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
  },
  computed: {
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