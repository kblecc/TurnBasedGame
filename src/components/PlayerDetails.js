

const getProgress = () => {
    const value = localStorage.getItem("progress");
    return JSON.parse(value) // Return 0 if not found
};



const setValue = (key, value) => {
  localStorage.setItem(key, value)
}

const updateProgress = (area, lv) => {
  const currentValue = getProgress()
  if (area > currentValue.area && lv > currentValue.lv) setValue(key, currentValue + amount)
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
