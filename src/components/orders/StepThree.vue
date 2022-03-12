<template>
  <div>
    <div class="control-group__label-title">Цвет</div>
    <div class="control-group">
      <v-radio-group
        v-model="color"
        row
        on-icon="$vuetify.icon.radioOn"
        off-icon="$vuetify.icon.radioOn"
        class="control-group mt-0 d-block"
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
    <div class="control-group date-range">
      <span class="control-group__label">C</span>
      <v-datetime-picker
        v-model="dateFrom"
        dateFormat="dd.MM.yyyy"
        :textFieldProps="{
          clearable: true,
          'clear-icon': '$vuetify.icons.close',
          class: 'control-group__input',
          placeholder: 'Введите дату и время',
        }"
        :timePickerProps="{ format: '24hr' }"
      >
        <template slot="dateIcon"> Дата </template>
        <template slot="timeIcon"> Время </template>
      </v-datetime-picker>
    </div>
    <div class="control-group date-range">
      <span class="control-group__label">По</span>
      <v-datetime-picker
        v-model="dateTo"
        dateFormat="dd.MM.yyyy"
        :textFieldProps="{
          clearable: true,
          'clear-icon': '$vuetify.icons.close',
          class: 'control-group__input',
          placeholder: 'Введите дату и время',
        }"
        :timePickerProps="{ format: '24hr' }"
      >
        <template slot="dateIcon"> Дата </template>
        <template slot="timeIcon"> Время </template>
      </v-datetime-picker>
    </div>
    <div class="control-group__label-title">Тариф</div>
    <div class="control-group">
      <v-radio-group
        v-model="rate"
        column
        on-icon="$vuetify.icon.radioOn"
        off-icon="$vuetify.icon.radioOn"
        class="control-group mt-0 d-block"
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
        v-model="isFullTank"
        on-icon="$vuetify.icon.checkboxOn"
        off-icon="$vuetify.icon.checkboxOff"
        label="Полный бак, 500р"
      ></v-checkbox>
      <v-checkbox
        v-model="isNeedChildChair"
        on-icon="$vuetify.icon.checkboxOn"
        off-icon="$vuetify.icon.checkboxOff"
        label="Детское кресло, 200р"
      ></v-checkbox>
      <v-checkbox
        v-model="isRightWheel"
        on-icon="$vuetify.icon.checkboxOn"
        off-icon="$vuetify.icon.checkboxOff"
        label="Правый руль, 1600р"
      ></v-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: "{color-option #1}",
      rate: 1,
      dateFrom: null,
      dateTo: null,
      isFullTank: false,
      isNeedChildChair: false,
      isRightWheel: false,
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
};
</script>