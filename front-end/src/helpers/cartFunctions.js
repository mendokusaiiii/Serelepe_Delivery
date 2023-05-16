function sumItems(items) {
  const map = new Map();

  items.forEach((item) => {
    const { id, name, price, quantity } = item;

    if (map.has(id)) {
      const existingItem = map.get(id);
      const newQuantity = existingItem.quantity + quantity;
      map.set(id, { id, name, price, quantity: newQuantity });
    } else {
      map.set(id, { id, name, price, quantity });
    }
  });

  return Array.from(map.values());
}

function sumItemsValue(items) {
  let total = 0;
  items.reduce((acc, curr) => {
    acc += (curr.quantity * Number(curr.price));
    total = acc;
    return acc;
  }, 0);
  return total;
}

const dateConverter = (d) => {
  const currentDate = new Date(d);
  const sliceNumber = -2;
  const day = (`0${currentDate.getDate()}`).slice(sliceNumber);
  const month = (`0${currentDate.getMonth() + 1}`).slice(sliceNumber);
  const result = `${day}/${month}/${currentDate.getFullYear()}`;
  return result;
};

export { sumItems, sumItemsValue, dateConverter };
