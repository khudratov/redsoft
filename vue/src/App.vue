<template>
  <div class="app">
    <header class="header">
      <nav class="navbar container">
        <div class="navbar__left">
          <div class="navbar__logo">
            <img src="./assets/img/logo.svg" alt="" />
          </div>
          <ComponentMenu />
        </div>
        <div class="navbar__right">
          <ComponentSearch />
        </div>
      </nav>
    </header>

    <div class="content container">
      <h1 class="h1">Картины эпохи Возрождения</h1>

      <div class="carts">
        <ComponentCart
          v-for="cart in carts"
          :id="cart.id"
          :key="cart.id"
          :img="cart.img"
          :title="cart.title"
          :price="cart.price"
          :old_price="cart.old_price"
          :status="cart.status"
          @click="changeValue"
        />
      </div>
    </div>

    <footer class="footer">
      <div class="footer__wrap container">
        <div class="footer__row">
          <div class="footer__left">
            <div class="navbar__logo">
              <img src="./assets/img/logodarker.svg" alt="" />
            </div>
            <ComponentMenu />
          </div>
          <div class="footer__right">
            <div class="address">
              <div class="address__info">
                <div class="address__info__icon">
                  <img
                    src="./assets/img/phone.svg"
                    alt="phone"
                  />
                </div>
                <div class="address__info__title">
                  +7 (495) 555-55-55
                </div>
              </div>
              <div class="address__info">
                <div class="address__info__icon">
                  <img src="./assets/img/gps.svg" alt="gps" />
                </div>
                <div class="address__info__title">
                  г. Москва, ул. Расплетина, 24
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import ComponentMenu from "./components/ComponentMenu.vue";
import ComponentSearch from "./components/ComponentSearch.vue";
import ComponentCart from "./components/ComponentCart.vue";

import "./assets/bundle.min.css";

const axios = require("axios");

export default {
  name: "App",
  components: {
    ComponentMenu,
    ComponentSearch,
    ComponentCart,
  },
  methods: {
    changeValue(id) {
      let carts = this.carts.map((cart) => {
        if (cart.id == id) {
          cart.status = "loading";
        }
        return cart;
      });

      this.$set({}, this.carts, carts);

      let _this = this;

      axios
        .get("https://jsonplaceholder.typicode.com/posts/1")
        .then(function(response) {
          console.log(response);

          //чтобы показать кнопку загрузки
          setTimeout(() => {
            let carts = _this.carts.map((cart) => {
              if (cart.id == id) {
                cart.status = "basket";
              }
              return cart;
            });
            _this.$set({}, _this.carts, carts);
          }, 1500);
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {});
    },
  },

  data() {
    return {
      carts: [
        {
          id: 1,
          img: require("@/assets/img/cart/1.png"),
          title: "«Рождение Венеры» Сандро Боттичелли",
          price: "1 000 000 $",
          old_price: "2 000 000 $",
          status: "sale",
        },
        {
          id: 2,
          img: require("@/assets/img/cart/2.png"),
          title: "«Тайная вечеря»  Леонардо да Винчи",
          price: "3 000 000 $",
          old_price: null,
          status: "sale",
        },
        {
          id: 3,
          img: require("@/assets/img/cart/3.png"),
          title: "«Сотворение Адама» Микеланджело",
          price: "5 000 000 $",
          old_price: "6 000 000 $",
          status: "basket",
        },
        {
          id: 4,
          img: require("@/assets/img/cart/4.png"),
          title: "«Урок анатомии»  Рембрандт",
          price: "1 000 000 $",
          old_price: "2 000 000 $",
          status: "sold",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
