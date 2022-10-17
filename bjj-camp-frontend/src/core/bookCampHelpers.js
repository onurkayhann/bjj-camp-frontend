export const addCamp = (item, next) => {
  let book = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('book')) {
      book = JSON.parse(localStorage.getItem('book'));
    }
    book.push({
      ...item,
      count: 1,
    });

    // eliminate duplicates
    // new set will only allow unique values in it

    // passing the ids of each camp

    book = Array.from(new Set(book.map((c) => c.id))).map((id) => {
      return book.find((c) => c._id === id);
    });

    localStorage.setItem('book', JSON.stringify(book));
    next();
  }
};
