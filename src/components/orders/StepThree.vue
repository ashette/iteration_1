<template>
  <div>
    <div class="control-group__label-title">Цвет</div>
    <div class="control-group">
      <v-radio-group
        v-model="stepFields.color.value"
        class="control-group mt-0 d-block"
        mandatory
        on-icon="$vuetify.icon.radioOn"
        off-icon="$vuetify.icon.radioOn"
        row
        @change="updateColorOption"
      >
        <v-radio label="Любой" value="Любой"></v-radio>
        <v-radio
          v-for="color in colors"
          :key="color"
          :label="color"
          :value="color"
        ></v-radio>
      </v-radio-group>
    </div>
    <div class="control-group__label-title">Дата аренды</div>
    <ValidationProvider
      vid="dateFrom"
      :rules="stepFields.dateFrom.rules"
      :name="stepFields.dateFrom.name"
      v-slot="{ errors }"
    >
      <div class="control-group date-range">
        <span class="control-group__label">C</span>
        <v-datetime-picker
          v-model="stepFields.dateFrom.value"
          dateFormat="dd.MM.yyyy"
          clearText="Очистить"
          okText="Применить"
          :textFieldProps="getDateTextProps(errors)"
          :datePickerProps="{ min: nowDate }"
          :timePickerProps="{ format: '24hr' }"
          @input="updateDurationOption()"
        >
          <template slot="dateIcon"> Дата </template>
          <template slot="timeIcon"> Время </template>
        </v-datetime-picker>
      </div>
    </ValidationProvider>
    <ValidationProvider
      vid="dateTo"
      :rules="stepFields.dateTo.rules"
      :name="stepFields.dateTo.name"
      v-slot="{ errors }"
    >
      <div class="control-group date-range">
        <span class="control-group__label">По</span>
        <v-datetime-picker
          v-model="stepFields.dateTo.value"
          dateFormat="dd.MM.yyyy"
          clearText="Очистить"
          okText="Применить"
          :textFieldProps="getDateTextProps(errors)"
          :datePickerProps="{ min: nowDate }"
          :timePickerProps="{ format: '24hr' }"
          @input="updateDurationOption()"
        >
          <template slot="dateIcon"> Дата </template>
          <template slot="timeIcon"> Время </template>
        </v-datetime-picker>
      </div>
    </ValidationProvider>
    <div class="control-group__label-title">Тариф</div>
    <div class="control-group">
      <v-radio-group
        v-model="stepFields.rate.value"
        column
        class="control-group mt-0 d-block"
        mandatory
        on-icon="$vuetify.icon.radioOn"
        off-icon="$vuetify.icon.radioOn"
        @change="updateRateOption"
      >
        <v-radio
          v-for="rate in rates"
          :key="rate.rateTypeId.id"
          :label="getRateName(rate)"
          :value="rate"
          :disabled="checkRateDisabled(rate)"
        ></v-radio>
      </v-radio-group>
    </div>
    <div class="control-group__label-title">Доп услуги</div>
    <div class="control-group checkbox-group">
      <v-checkbox
        v-model="stepFields.isFullTank.value"
        label="Полный бак, 500р"
        on-icon="$vuetify.icon.checkboxBaseOn"
        off-icon="$vuetify.icon.checkboxBaseOff"
        @change="updateAdditionalOption('isFullTank', 500)"
      ></v-checkbox>
      <v-checkbox
        v-model="stepFields.isNeedChildChair.value"
        label="Детское кресло, 200р"
        on-icon="$vuetify.icon.checkboxBaseOn"
        off-icon="$vuetify.icon.checkboxBaseOff"
        @change="updateAdditionalOption('isNeedChildChair', 200)"
      ></v-checkbox>
      <v-checkbox
        v-model="stepFields.isRightWheel.value"
        label="Правый руль, 1600р"
        on-icon="$vuetify.icon.checkboxBaseOn"
        off-icon="$vuetify.icon.checkboxBaseOff"
        @change="updateAdditionalOption('isRightWheel', 1600)"
      ></v-checkbox>
    </div>
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
  data() {
    return {
      nowDate: new Date().toISOString().slice(0, 10),
      colors: [],
      rates: [],
      rateUnits: {
        "мин": 1,
        "сутки": 1440,
        "7 дней": 10080,
        "30 дней": 43200,
      },
    };
  },
  methods: {
    getDateTextProps(errors) {
      const props = {
        class: "control-group__input",
        placeholder: "Введите дату и время",
        "error-messages": errors[0],
      };
      return props;
    },
    getOptionName(option) {
      return option ? option.name : null;
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
    getRateName(rate) {
      const rateName = `${rate.rateTypeId.name}, ${rate.price}₽/${rate.rateTypeId.unit}`;
      return rateName;
    },
    getTotalRatePrice(rate, interval) {
      let newPrice;

      if (interval > 0 && rate) {
        const rateUnit = this.rateUnits[rate.rateTypeId.unit];
        const minutes = Math.floor(interval / 6e4);
        newPrice = Math.round((rate.price * minutes) / rateUnit);
      }

      return newPrice;
    },
    async getRates() {
      try {
        const rates = await MainService.getRates();
        this.rates = rates.filter((rate) => rate.rateTypeId);
      } catch (error) {
        console.log(error);
      }
    },
    updateColorOption() {
      const optionColor = {
        type: "color",
        name: this.stepFields.color.name,
        value: this.stepFields.color.value,
        stepId: this.currentStep,
      };

      this.updateOptions(optionColor);
    },
    updateRateOption() {
      const defaultOptionRate = {
        type: "rate",
        name: "",
        value: "",
        stepId: this.currentStep,
      };

      const isRateSelected = this.stepFields.rate.value !== undefined;

      if (isRateSelected) {
        this.updateOptions({
          ...defaultOptionRate,
          name: this.stepFields.rate.name,
          value: this.stepFields.rate.value.rateTypeId.name,
        });

        const newPrice = this.getTotalRatePrice(
          this.stepFields.rate.value,
          this.dateInterval
        );

        this.updatePrice({
          ...this.price,
          total: newPrice,
        });
      } else {
        this.updateOptions(defaultOptionRate);
        this.updatePrice({
          ...this.price,
          total: 0,
        });
      }
    },
    updateDurationOption() {
      const dateFrom = this.stepFields.dateFrom.value,
        dateTo = this.stepFields.dateTo.value;

      if (dateFrom && dateTo) {
        const optionDuration = {
          type: "duration",
          name: "Длительность аренды",
          value: this.getDuration(this.dateInterval),
          stepId: this.currentStep,
        };

        const newPrice = this.getTotalRatePrice(
          this.stepFields.rate.value,
          this.dateInterval
        );

        this.updatePrice({
          ...this.price,
          total: newPrice,
        });

        this.updateOptions(optionDuration);
      }
    },
    updateAdditionalOption(type, price) {
      const isFieldSelected = this.stepFields[type].value !== false;
      const optionAdditional = {
        type: type,
        name: this.stepFields[type].name,
        value: this.stepFields[type].value ? "Да" : "",
        stepId: this.currentStep,
      };

      if (isFieldSelected && this.price.total) {
        this.updatePrice({
          ...this.price,
          total: this.price.total + price,
        });
      } else {
        this.updatePrice({
          ...this.price,
          total: this.price.total - price,
        });
      }

      this.updateOptions(optionAdditional);
    },
    setColors(product) {
      if (product) {
        this.colors = [...new Set(product.colors)]
      }
    },
    checkRateDisabled(rate) {
      if (rate.rateTypeId) {
        const dateIntervalMinutes = Math.floor(this.dateInterval / 6e4);
        if (dateIntervalMinutes < this.rateUnits[rate.rateTypeId.unit]) {
          return true;
        }
      }
      return false;
    },
  },
  mounted() {
    this.getRates();
    this.setColors(this.fields.product.value);
  },
  computed: {
    dateInterval: function () {
      const interval =
        this.stepFields.dateTo.value - this.stepFields.dateFrom.value;

      return interval;
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