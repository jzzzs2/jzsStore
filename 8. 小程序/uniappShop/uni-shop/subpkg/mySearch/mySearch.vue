<template>
  <view>
    <uni-search-bar placeholder="搜索" :focus="true"  @input="inputValue" :radius="100" cancelButton="none">
    </uni-search-bar>
    <view class="advice-goods-list">
      <view class="advice-good-item" v-for="(item,idx) in advisedList" :key="idx" @click="naviToDetail(item)">
        <view class="advice-good-text">
          {{item.goods_name}}
        </view>
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
    </view>
    <view class="history-wrap" v-if="advisedList.length===0">
      <view class="history-top">
        <text>搜索记录</text>
        <uni-icons type="trash" size="16" @click="cleanAll"></uni-icons>
      </view>
      <view class="history-content">
        <uni-tag :text="item" type="default" v-for="(item,idx) in historys" :key="idx" :circle="true" @click="naviToGoodList(item)" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timeOut: null,
        advisedList: [],
        historySearch: []
      };
    },
    computed: {
      historys() {
        return [...this.historySearch].reverse()
      }
    },
    onLoad() {
      this.historySearch = JSON.parse(uni.getStorageSync("sh"))
    },
    methods: {
      naviToGoodList(value) {
        uni.navigateTo({
          url: `/subpkg/goods_list/goods_list?query=${value}`
        })
      },
      cleanAll() {
        this.historySearch = []
        uni.setStorageSync("sh","[]")
      },
      async inputValue(e) {
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
          // console.log(e.value,"value")
          //发送请求
            this.getAdvisedList(e.value)
        },800)
      },
      async getAdvisedList(value) {
        console.log(value,value.length)
        if (value.length>0) {
            const {data: res} = await uni.$http.get("/api/public/v1/goods/qsearch",{query: value})
            this.advisedList = res.message
            this.addHistoryList(value)
        } else {
          this.advisedList = []
        }
      },
      addHistoryList(value) {
        //this.historySearch.push(value)
        //
        let set = new Set(this.historySearch)
        set.delete(value)
        set.add(value)
        this.historySearch = Array.from(set)
        uni.setStorageSync("sh",JSON.stringify(this.historySearch))
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
    .advice-good-item
      display: flex
      justify-content: space-between
      padding: 4px 12px
      margin-bottom: 6px
      & view
        font-size: 12px
      .advice-good-text
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
    .history-top
      display: flex
      justify-content: space-between
      padding: 4px 8px
      & text
        font-size: 12px
    .history-content
      display: flex
      flex-wrap: wrap
      & .uni-tag
        margin-left: 6px
</style>