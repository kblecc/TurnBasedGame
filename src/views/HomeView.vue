

<template>
  <div class="fullscreenContainer">
    <div class="row">
      <div id="assertDisplay" class="row row-cols-4">
        <div class="col">
          <div class="card">
          {{ this.gem }}</div>
        </div>
        <div class="col"><div class="card">
          {{ this.money }}
        </div>

        </div>
      </div>
      </div>
    <div class="card" @click="this.$router.push('/map')">Adventure</div>
    <div id="BottomNav" class="row row-cols-4 align-items-end">
      <div class="col">
        <div class="card" @click="this.$router.push('/tavern')">Tavern</div>
      </div>
      <div class="col">
        <div class="card" @click="this.$router.push('/map')">Store</div>
      </div>
      <div class="col">
        <div class="card" @click="this.$router.push('/map')">Mission</div>
      </div>
      <div class="col">
        <div class="card" @click="this.$router.push('/map')">Team</div>
      </div>
    </div>
  </div>
</template>

<script>
import Asserts from '@/components/Asserts';
export default {
  data() {
    return {
      money: Asserts.showMoney(),
      gem: Asserts.showGem(),
    };
  }}

</script>

<style scrope>
.fullscreenContainer {
  width: 100%;
  height: 100%;
  background-color: aqua;
}
#BottomNav {
  margin: 2px;
  padding: 2px;
  position: absolute;
  width: 100%;
  bottom: 0px;
  right: 0px;
}
#BottomNav > .col {
  padding-left: 2px;
  padding-right: 2px;
}
</style>
