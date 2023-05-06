<template>
  <view>
    <!-- goods list -->
    
    <view class="good-item" v-for="(item,idx) in goodsList" :key="idx" @click="naviToDetail(item)">
      <good-item :good="item"></good-item>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        paramObj: {
          query: "",
          cid: "",
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isLoading: false
      };
    },
    onLoad(options) {
      if (options.query) this.paramObj.query = options.query
      if (options.cid) this.paramObj.cid = options.cid
      this.getGoodList()
    },
    onReachBottom() {
      //加载新数据
      if(this.paramObj.pagenum*this.paramObj.pagesize >= this.total) return uni.$showMessage("没有了捏~~")
      if(this.isLoading) return
      // console.log("new data")
      this.paramObj.pagenum++
      this.getGoodList()
    },
    onPullDownRefresh() {
      //重置数据
      this.goodsList = []
      this.total = 0
      this.isLoading = false
      this.paramObj.pagenum = 1
      this.getGoodList(() => uni.stopPullDownRefresh())
    },
    methods: {
      async getGoodList(cb) {
        this.isLoading = true
        let {data: res} = await uni.$http.get("/api/public/v1/goods/search",this.paramObj)
        this.isLoading = false
        cb && cb()
        if(res.meta.status !== 200) return uni.$showMessage()
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
      },
      naviToDetail(item) {
        uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
        })
      }
    }
  }
</script>

<style lang="stylus">
  .good-item
    padding: 6px
    margin: 4px 8px
    margin-bottom: 4px
    border-bottom: 1rpx solid #bebebe
</style>
