import pagination from './pagination.js';
import modal from './modal.js';

Vue.component('pagination', pagination);
Vue.component('modal', modal)

new Vue({
  el: '#app',
  data: {
    products: [],
    pagination: {},
    tempProduct: {
      imageUrl: [],
    },
    api: {
      uuid: '8a8058c0-58d2-485b-b7fc-3c9be181cca7',
      path: 'https://course-ec-api.hexschool.io/api/',
    },
    token: '',
    loadingBtn: '',
  },
  methods: {
    updateProduct() { },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
          };
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.loadingBtn = item.id;
          const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`
          axios.get(url)
            .then(res => {
              this.tempProduct = res.data.data;
              $('#productModal').modal('show');
              this.loadingBtn = '';
            })
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
            this.tempProduct = {
              imageUrl: [],
            };
          }
        });
      }
      $('#delProductModal').modal('hide');
    },
    getProducts(num = 1) {
      //此寫法是給num一個預設值
      const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`;
      axios.get(url)
        .then(res => {
          console.log(res)
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;

          if (this.tempProduct.id) {
            this.tempProduct = {
              imageUrl: [],
            };
            $('#productModal').modal('hide');
          }
        })
    },
  },
  created() {
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)testToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    this.getProducts();
  }
})