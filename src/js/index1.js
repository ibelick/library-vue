var books = [
  {id:1, name:'wey', description:'de la wey', price:30},
  {id:2, name:'titbro', description:'ba oui', price:100}
];

function findBook (bookId) {
  return books[findBookKey(bookId)];
};

function findBookKey (bookId) {
  for (var key = 0; key < books.length; key++) {
    if (books[key].id == bookId) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#book-List',
  data: function () {
    return {books: books, searchKey: ''};
  },
  computed : {
    filteredBooks: function () {
    var self = this;
    console.log()
    return self.books.filter(function (book) {
      return book.name.indexOf(self.searchKey) !== -1
    })
  }
}
});

var Book = Vue.extend({
  template: '#book',
  data: function () {
    return {book: findBook(this.$route.params.book_id)};
  }
});

var BookEdit = Vue.extend({
  template: '#book-edit',
  data: function () {
    return {book: findBook(this.$route.params.book_id)};
  },
  methods: {
    updateBook: function () {
      var book = this.book;
      books[findBookKey(book.id)] = {
        id: book.id,
        name: book.name,
        description: book.description,
        price: book.price
      };
      router.push('/');
    }
  }
});

var router = new VueRouter({
  routes: [{path: '/', component: List},
      {path: '/book/:book_id', component: Book, name: 'book'},
      {path: '/book/:book_id/edit', component: BookEdit, name: 'book-edit'},
]});

new Vue({
  el: '#app',
  router: router,
  template: '<router-view></router-view>'
});
