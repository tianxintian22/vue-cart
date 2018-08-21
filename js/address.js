new Vue({
    el: '#address',
    data: {
        limitNum: 3,
        addressList: [],
        currentIndex: 0,
        shippingMethod: 1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.addressView();
        })
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        addressView: function () {
            var _this = this;
            this.$http.get('data/address.json').then(function(res){
                if (res.data.status === 0) {
                    _this.addressList = res.data.result;
                }
            })
        },
        setDefault: function (addressId) {
            this.addressList.forEach(function (item) {
                if (item.addressId === addressId) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            });
        }
    }
});
