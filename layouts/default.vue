<template>
  <div class="primary">
    <img
        class="primary__img"
        alt="logo"
        src="~assets/img/app/logo.svg"/>
    <div class="primary__header header">
      <div class="header__navigations">
        <nuxt-link class="header__navigation" to="/">Форма</nuxt-link>
        <nuxt-link class="header__navigation" to="/preview">Превью</nuxt-link>
      </div>
    </div>
    <nuxt class="primary__content"/>
    <div class="primary__footer">
      all rights reserved
    </div>
  </div>
</template>

<script>
export default {
  name: "default"
}
</script>

<style lang="scss" scoped>
  .primary {
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100vh;
    overflow-y: auto;

    font-family: 'Montserrat-regular';
    font-style: normal;
    &__img {
      position: absolute;
      left: 5%;
      top: 24px;
    }
    &__header {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 76px;
      background: #FFFFFF;
      box-shadow: 0px 1px 0px rgba(17, 17, 17, 0.1);
    }
    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 76px;

      background: #FAFAFA;
      box-shadow: 0px 1px 0px rgba(17, 17, 17, 0.1);
    }
  }
  .header {
    &__navigations {
      display: flex;
      gap: 24px;
    }
    &__navigation {
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: rgba(17, 17, 17, 0.48);
      text-decoration: none;
    }
    &__navigation:hover {
      color: rgba(16, 16, 16, 0.8);
    }
  }
</style>
