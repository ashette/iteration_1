<template>
  <div>
    <v-row no-gutters>
      <div class="col-12 col-sm-6 order-total-info pa-0 mb-8">
        <div class="order-total-info__item title">{{ order.productName }}</div>
        <div class="order-total-info__item id">{{ order.productid }}</div>
        <div class="order-total-info__item option">
          <strong>Топливо:</strong> <span>{{ order.productGas }}</span>
        </div>
        <div class="order-total-info__item option">
          <strong>Доступна с </strong> <span>{{ order.availibleFrom }}</span>
        </div>
      </div>
      <div class="col-12 col-sm-6 order-image">
        <v-img :src="order.thumbnail" contain max-width="256"></v-img>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        productid: "{product id}",
        productName: "{product name}",
        productGas: "{value}",
        availibleFrom: "{value_from}",
        thumbnail: require("@/assets/car.jpg"),
      },
    };
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