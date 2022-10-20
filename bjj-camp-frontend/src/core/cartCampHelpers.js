export const addCamp = (item, next) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({
      ...item,
      count: 1,
    });

    // eliminate duplicates
    // new set will only allow unique values in it

    // passing the ids of each camp

    cart = Array.from(new Set(cart.map((c) => c._id))).map((id) => {
      return cart.find((c) => c._id === id);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

export const campTotal = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
  return [];
};

export const updateCamp = (campId, count) => {
  let cart = [];

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((camp, index) => {
      if (camp._id === campId) {
        cart[index].count = count;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const removeCamp = (campId) => {
  let cart = [];

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((camp, index) => {
      if (camp._id === campId) {
        cart.splice(index, 1);
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart');
    next();
  }
};
