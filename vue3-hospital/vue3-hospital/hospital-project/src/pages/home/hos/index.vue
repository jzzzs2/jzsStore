<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-19 19:15:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-19 21:02:29
-->
<template>
  <el-card class="box-card w48"  shadow="hover">
    <div class="item">
      <div class="left">
        <h2>{{hosInfo.hosname}}</h2>
        <div class="info">
          <div class="level">
            <svg t="1689766311318" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="1480" width="16" height="16">
              <path
                d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                p-id="1481"></path>
            </svg>
            <span>{{hosInfo.param.hostypeString}}</span>
          </div>
          <div class="time">
            <svg t="1689766351568" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="3520" width="16" height="16">
              <path
                d="M120.597333 322.005333l120.682667-120.682666 30.165333 30.165333-120.682666 120.682667zM871.616 352.192L750.933333 231.509333l30.165334-30.165333 120.682666 120.682667zM533.333333 514.133333v-153.6h-42.666666V533.333333l119.466666 119.466667 29.866667-29.866667z"
                fill="#ED3F80" p-id="3521"></path>
              <path
                d="M714.666667 812.8c-55.466667 42.666667-123.733333 70.4-198.4 70.4-177.066667 0-320-142.933333-320-320s142.933333-320 320-320 320 142.933333 320 320c0 78.933333-27.733333 149.333333-74.666667 206.933333l29.866667 29.866667c55.466667-64 87.466667-145.066667 87.466666-236.8 0-192-151.466667-349.866667-341.333333-360.533333V106.666667h106.666667V64h-256v42.666667h106.666666v93.866666c-189.866667 10.666667-341.333333 168.533333-341.333333 360.533334 0 200.533333 162.133333 362.666667 362.666667 362.666666 87.466667 0 166.4-29.866667 228.266666-81.066666l-29.866666-29.866667z"
                fill="" p-id="3522"></path>
            </svg>
            <span>{{ `${hosInfo.bookingRule.releaseTime} 开放` }}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <img :src="'data:image/jpeg;base64,' + hosInfo.logoData" alt="" srcset="">
      </div>
    </div>
  </el-card>
</template>

<script lang='ts' setup>
defineProps(["hosInfo"])
</script>
<style scoped lang='scss'>
.w48 {
  width: 48%;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  .left {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    // margin-right: 10px;
    h2 {
      margin-bottom: 12px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      margin-top: 10px;
      .level {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          margin-left: 6px;
        }
      }
      .time {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          margin-left: 6px;
        }
      }
    }
  }

  .right {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
  }
}</style>