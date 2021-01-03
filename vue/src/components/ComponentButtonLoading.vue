<template>
  <div class="button button_loading button_disabled">
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "classes"],
};
</script>

<style lang="scss">
.button_loading {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lds-facebook {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80px;
  height: 40px;
  margin: 0;
}
.lds-facebook div {
  display: inline-block;
  width: 12px;
  background: rgba(158, 98, 98, 0.315);
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1)
    infinite;
}
.lds-facebook div:nth-child(1) {
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 44px;
  }
  50%,
  100% {
    top: 24px;
    height: 22px;
  }
}
</style>
