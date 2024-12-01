<template>
  <div class="container mt-4">
    <div id="assertDisplay" class="row row-cols-4">
      <div class="col">
        <div class="card">
          {{ this.gem }}
        </div>
      </div>
      <div class="col">
        <div class="card">
          {{ this.money }}
        </div>
      </div>
    </div>
    <h1 class="text-center">Store</h1>
    <ul class="nav nav-tabs" id="storeTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="in-game-tab"
          data-bs-toggle="tab"
          data-bs-target="#in-game"
          type="button"
          role="tab"
          aria-controls="in-game"
          aria-selected="true"
        >
          In-Game Items
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="purchase-tab"
          data-bs-toggle="tab"
          data-bs-target="#purchase"
          type="button"
          role="tab"
          aria-controls="purchase"
          aria-selected="false"
        >
          Purchase Gems/Money
        </button>
      </li>
    </ul>

    <div class="tab-content" id="storeTabsContent">
      <!-- In-Game Items Tab -->
      <div
        class="tab-pane fade show active"
        id="in-game"
        role="tabpanel"
        aria-labelledby="in-game-tab"
      >
        <div class="row mt-3">
          <div v-for="item in inGameItems" :key="item.id" class="col-md-4 mb-4">
            <div class="card h-100">
              <img v-if="item.img" :src="item.img" class="card-img-top" alt="Item image" />
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text">{{ item.description }}</p>
                <p class="card-text">
                  <strong>Qty:</strong> {{ item.qty }} <br />
                  <strong>Price:</strong>
                  <span v-if="item.price.money">💰 {{ item.price.money }}</span>
                  <span v-if="item.price.gem">💎 {{ item.price.gem }}</span>
                </p>
                <button
                  class="btn btn-primary"
                  :disabled="item.limit === 0"
                  @click="purchaseItem(item)"
                >
                  Purchase
                </button>
                <p class="mt-2 text-muted">Limit: {{ item.limit }} remaining</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Purchase Gems/Money Tab -->
      <div class="tab-pane fade" id="purchase" role="tabpanel" aria-labelledby="purchase-tab">
        <div class="row mt-3">
          <div v-for="option in purchaseOptions" :key="option.id" class="col-md-4 mb-4">
            <div class="card h-100">
              <img v-if="option.img" :src="option.img" class="card-img-top" alt="Option image" />
              <div class="card-body">
                <h5 class="card-title">{{ option.name }}</h5>
                <p class="card-text">{{ option.description }}</p>
                <p class="card-text"><strong>Qty:</strong> {{ option.qty }}</p>
                <button class="btn btn-success" @click="addCurrency(option)">Add to Player</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Asserts from '@/components/Asserts' // Replace with your storage script path

export default {
  data() {
    return {
      inGameItems: [
        {
          id: '1',
          name: 'Item 1',
          qty: 5,
          price: { money: 99 },
          limit: 1,
          description: 'Useful item for gameplay.',
          img: 'item1.png',
        },
        {
          id: '2',
          name: 'Item 2',
          qty: 5,
          price: { gem: 99 },
          limit: 99,
          description: 'Another useful item.',
          img: 'item2.png',
        },
      ],
      purchaseOptions: [
        {
          id: 'gem5',
          name: 'Gem Pack',
          qty: 5,
          description: 'Small gem pack.',
          img: 'gem5.png',
        },
        {
          id: 'gem99',
          name: 'Gem Pack',
          qty: 99,
          description: 'Large gem pack.',
          img: 'gem99.png',
        },
      ],
      money: Asserts.showMoney(),
      gem: Asserts.showGem(),
    }
  },
  computed: {},
  methods: {
    purchaseItem(item) {
      const { price, id, qty } = item
      const key = price.money ? 'money' : 'gem'
      const amount = price.money || price.gem

      // Check balance and process purchase
      const balance = key === 'money' ? Asserts.getMoney() : Asserts.getGem()
      if (balance >= amount && item.limit > 0) {
        Asserts.setValue(key, balance - amount)
        item.limit -= 1 // Decrease purchase limit
        alert(`Purchased ${qty} x ${item.name}`)
      } else {
        alert('Insufficient funds or purchase limit reached.')
      }
    },
    addCurrency(option) {
      const { name, qty } = option
      const key = name.toLowerCase()
      Asserts.setValue(key, Asserts[key === 'gem' ? 'getGem' : 'getMoney']() + qty)
      alert(`${qty} ${name} added to your account.`)
    },
  },
}
</script>

<style scoped>
.card {
  text-align: center;
}
</style>
