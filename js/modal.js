export default {
  template: `<div class="modal-dialog w_80" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">新增/更改商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-4">
                  <div class="form-group">
                    <label for="imageUrl">輸入圖片網址</label>
                    <input id="imageUrl" v-model="tempProduct.imageUrl[0]" type="text" class="form-control"
                      placeholder="請輸入圖片連結">
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt>
                </div>
                <div class="col-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title" v-model="tempProduct.title"
                      aria-describedby="title" placeholder="請輸入標題">
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="category">分類</label>
                        <input type="text" class="form-control" id="category" v-model="tempProduct.category"
                          placeholder="請輸入分類">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="unit">單位</label>
                        <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit"
                          placeholder="請輸入單位">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="origin_price">牌價</label>
                        <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price"
                          placeholder="請輸入牌價">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" id="price" v-model="tempProduct.price"
                          placeholder="請輸入售價">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="description">商品敘述</label>
                    <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                      placeholder="請輸入商品描述">
                                            </textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">商品說明</label>
                    <textarea id="description" v-model="tempProduct.content" type="text" class="form-control"
                      placeholder="請說明商品內容">
                                            </textarea>
                  </div>
                  <div class="form-check">
                    <input id="is_enabled" v-model="tempProduct.is_enabled" class="form-check-input" type="checkbox"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" @click="updateProduct(isNew)" class="btn btn-primary">完成</button>
          </div>
        </div>
      </div>`,
  data() {
    return {
      // tempProduct: {}
    };
  },
  props: ['tempProduct', 'api', 'isNew'],
  methods: {
    updateProduct(isNew) {
      let url = `${this.api.path}${this.api.uuid}/admin/ec/product`;
      let httpMethod = 'post';
      console.log(this.isNew)
      if(!this.isNew){
        url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
        httpMethod = 'patch';
      }
      axios[httpMethod](url, this.tempProduct)
        .then(res => {
          // console.log(res)
          $('#productModal').modal('hide');
          this.$emit('update')
        });
    }
  },
}