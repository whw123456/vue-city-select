// 导入组件，组件必须声明 name
import CitySelect from './CitySelect.vue'

// 为组件添加 install 方法，用于按需引入
CitySelect.install = function (Vue) {
  Vue.component(CitySelect.name, CitySelect)
}
console.log(CitySelect)
export default CitySelect
