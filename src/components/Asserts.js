

const getMoney = () => {
    const value = localStorage.getItem("money");
    return value ? parseInt(value, 10) : 0; // Return 0 if not found
};

const getGem = () => {
  const value = localStorage.getItem('money')
  return value ? parseInt(value, 10) : 0 // Return 0 if not found
}

const setValue = (key, value) => {
    localStorage.setItem(key, value);
};

const addMoney = (key, amount) => {
  const currentValue = getMoney()
  setValue(key, currentValue + amount)
}

const addGem = (key, amount) => {
  const currentValue = getGem()
  setValue(key, currentValue + amount)
}

const decreaseMoney = (amount) => {
  const currentValue = getMoney()
  setValue('money', Math.max(currentValue - amount, 0)) // Prevent negative values
}

const decreaseGem = (key, amount) => {
  const currentValue = addGem
  setValue("gem", Math.max(currentValue - amount, 0)) // Prevent negative values
}

const showMoney = () => {
    return getMoney()
};
const showGem = () => {
    return getGem()
};

export default {
    getGem,
    getMoney,
    setValue,
   addGem,
   addMoney,
   decreaseGem,
   decreaseMoney,
   showGem,
   showMoney
};
