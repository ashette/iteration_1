<template>
  <div>
    <v-row no-gutters>
      <div class="col-12 col-sm-6 order-total-info pa-0 mb-8">
        <div class="order-total-info__item title">{{ productName }}</div>
        <div class="order-total-info__item id">{{ productId }}</div>
        <div class="order-total-info__item option" v-if="productGas">
          <strong>Топливо:</strong> <span>{{ productGas }}</span>
        </div>
        <div class="order-total-info__item option">
          <strong>Доступна с </strong> <span>{{ availibleFrom }}</span>
        </div>
      </div>
      <div class="col-12 col-sm-6 order-image">
        <v-img :src="productImage" contain max-width="256"></v-img>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    currentStep: Number,
    fields: Object,
  },
  computed: {
    productName: function () {
      return this.fields.product.value.name;
    },
    productId: function () {
      return this.fields.product.value.id;
    },
    productGas: function () {
      return this.fields.isFullTank.value ? "100%" : null;
    },
    productImage: function () {
      return this.fields.product.value.thumbnail;
    },
    availibleFrom: function () {
      var options = {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return new Date(this.fields.dateFrom.value).toLocaleDateString(
        "ru",
        options
      );
    },
  },
};
</script>

<style lang="scss">
.order-total-info {
  &__item {
    margin-bottom: 8px;
    font-size: 14px;
  }

  .title {
    font-size: 18px;
    line-height: 22px;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--v-font-base);
  }

  .id {
    display: inline-block;
    font-size: 14px;
    padding: 4px;
    border: 1px solid var(--v-tertiary-base);
    text-transform: uppercase;
    border-radius: 4px;
  }

  .option span {
    font-weight: 300;
  }
}
</style>