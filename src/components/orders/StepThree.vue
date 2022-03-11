<template>
  <div>
    <div class="control-group__label-title">Цвет</div>
    <div class="control-group">
      <v-radio-group
        v-model="stepFields.color.value"
        row
        on-icon="$vuetify.icon.radioOn"
        off-icon="$vuetify.icon.radioOn"
        class="control-group mt-0 d-block"
        mandatory
        @change="updateColorOption"
      >
        <v-radio
          v-for="color in colors"
          :key="color.id"
          :label="color.name"
          :value="color.name"
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
          :textFieldProps="{
            class: 'control-group__input',
            placeholder: 'Введите дату и время',
            'error-messages': errors[0],
          }"
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
          :textFieldProps="{
            class: 'control-group__input',
            placeholder: 'Введите дату и время',
            'error-messages': errors[0],
          }"
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
        on-icon="$vuetify.icon.radioOn"
        off-icon="$vuetify.icon.radioOn"
        class="control-group mt-0 d-block"
        mandatory
        @change="updateRateOption"
      >
        <v-radio
          v-for="rate in rates"
          :key="rate.id"
          :label="rate.name"
          :value="rate.id"
        ></v-radio>
      </v-radio-group>
    </div>
    <div class="control-group__label-title">Доп услуги</div>
    <div class="control-group checkbox-group">
      <v-checkbox
        v-model="stepFields.isFullTank.value"
        on-icon="$vuetify.icon.checkboxOn"
        off-icon="$vuetify.icon.checkboxOff"
        label="Полный бак, 500р"
        @change="updateAdditionalOption('isFullTank')"
      ></v-checkbox>
      <v-checkbox
        v-model="stepFields.isNeedChildChair.value"
        on-icon="$vuetify.icon.checkboxOn"
        off-icon="$vuetify.icon.checkboxOff"
        label="Детское кресло, 200р"
        @change="updateAdditionalOption('isNeedChildChair')"
      ></v-checkbox>
      <v-checkbox
        v-model="stepFields.isRightWheel.value"
        on-icon="$vuetify.icon.checkboxOn"
        off-icon="$vuetify.icon.checkboxOff"
        label="Правый руль, 1600р"
        @change="updateAdditionalOption('isRightWheel')"
      ></v-checkbox>
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
  data() {
    return {
      nowDate: new Date().toISOString().slice(0, 10),
      colors: [
        {
          id: 1,
          name: "{color-option #1}",
        },
        {
          id: 2,
          name: "{color-option #2}",
        },
        {
          id: 3,
          name: "{color-option #3}",
        },
      ],
      rates: [
        {
          id: 1,
          name: "{rate-option #1}",
        },
        {
          id: 2,
          name: "{rate-option #2}",
        },
      ],
    };
  },
  methods: {
    getOptionName(option) {
      return option ? option.name : null;
    },

    getDuration(dateFrom, dateTo) {
      const diff = dateTo - dateFrom;
      var days = Math.floor(diff / 8.64e7);
      var hours = Math.floor((diff / 3.6e6) % 24);
      var minutes = Math.floor((diff / 6e4) % 60);

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
      const optionRate = {
        type: "rate",
        name: this.stepFields.rate.name,
        value: this.stepFields.rate.value,
        stepId: this.currentStep,
      };

      this.updateOptions(optionRate);
    },
    updateDurationOption() {
      const dateFrom = this.stepFields.dateFrom.value,
        dateTo = this.stepFields.dateTo.value;

      if (dateFrom && dateTo) {
        const optionDuration = {
          type: "duration",
          name: "Длительность аренды",
          value: this.getDuration(new Date(dateFrom), new Date(dateTo)),
          stepId: this.currentStep,
        };

        this.updateOptions(optionDuration);
      }
    },
    updateAdditionalOption(type) {
      const optionAdditional = {
        type: type,
        name: this.stepFields[type].name,
        value: this.stepFields[type].value ? "Да" : null,
        stepId: this.currentStep,
      };

      this.updateOptions(optionAdditional);
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