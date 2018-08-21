new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        currentProduct: ''
    },
    filters: { // 局部过滤器
        formatMoney: function (value) {
            return '¥ ' + value.toFixed(2);// js格式化小数会出现误差,尽量后端处理
        }
    },
    // mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
    mounted: function () {
        this.$nextTick(function () {
            this.cartView()
        })
    },
    methods: {
        cartView: function () {
            var _this = this;
            this.$http.get('data/cartData.json').then(function (res) {
                // _this.totalMoney = res.data.result.totalMoney;
                _this.productList = res.data.result.list;
            })
        },
        changeMoney: function (product, sign) {
            if (sign > 0) {
                product.productQuantity ++;
            } else {
                product.productQuantity --;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalMoney();
        },
        selected: function (item) {
            if (typeof item.checked === 'undefined') {
                this.$set(item, 'checked', true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalMoney();
        },
        selectAll: function (flag) {
            var _this = this;
            _this.checkAllFlag = flag;

            this.productList.forEach(function (item) {
                if (typeof item.checked === 'undefined') {
                    _this.$set(item, 'checked', flag);
                } else {
                    item.checked = flag;
                }
            });
            this.calcTotalMoney();
        },
        calcTotalMoney: function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (item) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        },
        deleteConfirm: function(item) {
            this.delFlag = true;
            this.currentProduct = item;
        },
        deleteProduct: function () {
            var index = this.productList.indexOf(this.currentProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
            this.calcTotalMoney();
        }
    }
});
// 全局过滤器
Vue.filter('money', function (value, type) {
    return '¥ ' + value.toFixed(2) + type;
});
