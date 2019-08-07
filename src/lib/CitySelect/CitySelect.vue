<template>
    <div>
        <input type="text" readonly="false" placeholder="请选择" @click.stop="toggleFun()" :value="cityVal"/>
        <div class="huice" v-show="toggle" @click="toggleFun()"></div>
        <transition name="toggle">
            <div class="sheetBox" v-show="toggle">
                <div class="sheetTitle">
                    请选择
                    <span class="sheetHide" @click.stop="toggleFun()"></span>
                </div>

                <div class="scrollInner" ref="scrollInner"  @scroll="domScroll" :style="{height:domInner.scrollInner}">
                    <ul class="navSide">
                        <li
                        :class="[activeIndex===index?'active':'']"
                        v-for="(item,key,index) in cityData"
                        :key="key"
                        @click="scrollTo(index)"
                        >{{key}}</li>
                    </ul>
                    <div ref="scrollDom">
                        <template v-for="(item,key) in cityData">
                            <div class="innerDom" :key="key">
                                <p class="navTab">{{key.toUpperCase()}}</p>
                                <ul>
                                    <li v-for="(val,index) in item" @click="checkVal(val,key,index)" :class="(index+''+key)===checkIndex?'active':''" :key="index">{{val}}</li>
                                </ul>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import cityJson from '../assets/js/citys'
export default {
  name: 'CitySelect',
  props: {
  },
  data () {
    return {
      domInner: {
        scrollInner: 0,
        sideInner: 0
      },
      domHeightArr: [],
      toggle: false,
      timer: null,
      activeIndex: 0,
      cityVal: '',
      checkIndex: ''
    }
  },
  computed: {
    cityData: function () {
      return cityJson
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.mountHeight()
    })
  },
  methods: {
    toggleFun: function () {
      this.toggle = !this.toggle
      this.$emit('toggleFn', this.toggle)
      const scrollDom = this.$refs['scrollDom']
      if (scrollDom.children && scrollDom.children.length > 0 && this.toggle) {
        setTimeout(() => {
          for (let item of scrollDom.children) {
            this.domHeightArr.push(item.offsetTop)
          }
        }, 600)
      } else {
        this.domHeightArr = []
      }
    },
    scrollTo: function (index) {
      const scrollDom = this.$refs['scrollDom']
      const scrollInner = this.$refs['scrollInner']
      scrollInner.scrollTop = scrollDom.children[index].offsetTop - 40
      this.activeIndex = index
    },
    domScroll: function (e) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let curIndex = 0
        for (let i = 0; i < this.domHeightArr.length; i++) {
          if (e.target.scrollTop >= this.domHeightArr[i] - 40) {
            curIndex = i
          }
        }
        this.activeIndex = curIndex
      }, 50)
    },
    checkVal: function (val, key, index) {
      this.cityVal = val
      this.checkIndex = index + '' + key
      this.toggleFun()
      this.$emit('changeFn', val)
    },
    mountHeight: function () {
      this.domInner.scrollInner = `${window.screen.height * 0.9 - 50}px`
      this.domInner.sideInner = `${(window.screen.height * 0.9 - 50) / 26}px`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '../assets/css/reset.scss';
</style>
<style scoped lang="scss">

@import "../assets/css/style.scss";
</style>
