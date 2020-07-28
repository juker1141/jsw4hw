new Vue({
  el: '#app',
  data: {
    products: [],
    tempProduct: {},
    api: {
      uuid: '8a8058c0-58d2-485b-b7fc-3c9be181cca7',
      path: 'https://course-ec-api.hexschool.io/api/',
    },
    token: '',
  },
  methods: {
    updateProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          if (item.id === id) {
            this.products[i] = this.tempProduct;
          }
        })
      } else {
        const id = new Date().getTime();
        this.tempProduct.id = id;
        this.products.push(this.tempProduct);
      }
      this.tempProduct = {};
      $('#productModal').modal('hide');
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {};
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.tempProduct = Object.assign({}, item);
          $('#productModal').modal('show');
          break;
        case 'delete':
          $('#delProductModal').modal('show');
          this.tempProduct = Object.assign({}, item);
          break;
        default:
          break;
      }
    },
    deleteProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          if (item.id === id) {
            this.products.splice(i, 1);
            this.tempProduct = {};
          }
        });
      }
      $('#delProductModal').modal('hide');
    },
    getProducts() {
      const url = `${this.api.path}${this.api.uuid}/admin/ec/products`;
      axios.get(url)
        .then(res => {
          console.log(res)
          this.products = res.data.data;
        })
    },
  },
  created() {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)testToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    this.getProducts();
  }
})