<template>
  <div class="storage-manager">
    <button type="button" class="btn btn-primary" @click="this.$router.push('/home')">◀</button>
    <h1>Local Storage Manager</h1>

    <!-- Display all items in local storage -->
    <div class="storage-display">
      <h2>Stored Items</h2>
      <ul>
        <li v-for="(value, key) in storageItems" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
          <button @click="deleteItem(key)">Delete</button>
        </li>
      </ul>
    </div>

    <!-- Set new local storage item -->
    <div class="set-storage">
      <h2>Add New Item</h2>
      <input
        v-model="newKey"
        placeholder="Key"
        type="text"
        required
      />
      <input
        v-model="newValue"
        placeholder="Value"
        type="text"
        required
      />
      <button @click="setItem">Add Item</button>
    </div>

    <!-- Update existing item -->
    <div class="update-storage">
      <h2>Update Existing Item</h2>
      <select v-model="selectedKey">
        <option disabled value="">Select a Key</option>
        <option v-for="key in Object.keys(storageItems)" :key="key" :value="key">
          {{ key }}
        </option>
      </select>
      <input
        v-model="updatedValue"
        placeholder="New Value"
        type="text"
        required
        :disabled="!selectedKey"
      />
      <button @click="updateItem" :disabled="!selectedKey">Update</button>
    </div>

    <!-- Clear all items -->
    <div class="clear-storage">
      <h2>Delete All Items</h2>
      <button @click="clearAll">Clear All</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storageItems: {}, // Holds local storage data
      newKey: '', // Input for new key
      newValue: '', // Input for new value
      selectedKey: '', // Dropdown selected key
      updatedValue: '', // Input for updated value
    };
  },
  mounted() {
    this.loadStorage();
  },
  methods: {
    // Load items from localStorage into storageItems
    loadStorage() {
      const items = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        items[key] = localStorage.getItem(key);
      }
      this.storageItems = items;
    },

    // Add a new item to localStorage
    setItem() {
      if (this.newKey && this.newValue) {
        localStorage.setItem(this.newKey, this.newValue);
        this.newKey = '';
        this.newValue = '';
        this.loadStorage();
      } else {
        alert('Key and value are required!');
      }
    },

    // Update an existing item's value
    updateItem() {
      if (this.selectedKey && this.updatedValue) {
        localStorage.setItem(this.selectedKey, this.updatedValue);
        this.updatedValue = '';
        this.selectedKey = '';
        this.loadStorage();
      } else {
        alert('Select a key and provide a new value!');
      }
    },

    // Delete a specific item
    deleteItem(key) {
      localStorage.removeItem(key);
      this.loadStorage();
    },

    // Clear all items from localStorage
    clearAll() {
      if (confirm('Are you sure you want to delete all items?')) {
        localStorage.clear();
        this.loadStorage();
      }
    },
  },
};
</script>

<style scoped>
.storage-manager {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  text-align: center;
}

.storage-display ul {
  list-style-type: none;
  padding: 0;
}

.storage-display li {
  margin: 5px 0;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: gray;
}

button:hover {
  background-color: #0056b3;
}

input, select {
  margin: 10px 0;
  padding: 5px;
  width: 100%;
}

div {
  margin-bottom: 20px;
}
</style>
