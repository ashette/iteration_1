<template>
  <v-carousel v-model="model" height="100vh">
    <v-carousel-item
      v-for="(slider, i) in sliders"
      :key="i"
      :src="slider.image"
    >
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data: () => ({
    model: 0,
    sliders: [
      {
        title: "Бесплатная парковка",
        subtitle:
          "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
        image: require('@/assets/slider_1.jpg'),
      },
      {
        title: "Страховка",
        subtitle: "Полная страховка страховка автомобиля",
        image: require('@/assets/slider_2.jpg'),
      },
      {
        title: "Бензин",
        subtitle: "Полный бак на любой заправке города за наш счёт",
        image: require('@/assets/slider_3.jpg'),
      },
      {
        title: "Обслуживание",
        subtitle: "Автомобиль проходит еженедельное ТО",
        image: require('@/assets/slider_4.jpg'),
      },
    ],
  }),
};
</script>