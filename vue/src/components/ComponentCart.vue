<template>
  <div class="cart" :class="{ opacity: status == 'sold' }">
    <div class="cart__image">
      <img :src="img" alt="" />
    </div>
    <div class="cart__body">
      <div class="cart__title">
        {{ title }}
      </div>
      <div class="cart__row">
        <div class="cart__prices" v-if="status != 'sold'">
          <div
            class="cart__price cart__price_old"
            v-if="old_price"
          >
            <del> {{ old_price }} </del>
          </div>
          <div class="cart__price">{{ price }}</div>
        </div>

        <button
          class="button"
          v-if="status == 'sale'"
          @click="$emit('click', id)"
        >
          Купить
        </button>
        <button
          class=" button button_basket "
          v-else-if="status == 'basket'"
          @click="$emit('click', id)"
        >
          <img :src="require('@/assets/img/done.svg')" alt="" />
          В корзине
        </button>
        <ComponentButtonLoading
          v-else-if="status == 'loading'"
        />

        <div v-else>
          Продана на аукционе
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentButtonLoading from "@/components/ComponentButtonLoading.vue";
export default {
  props: ["id", "img", "title", "price", "old_price", "status"],
  components: {
    ComponentButtonLoading,
  },
};
</script>
