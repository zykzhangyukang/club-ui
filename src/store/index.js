import { createStore } from 'vuex'
const modulesFiles = require.context('./module', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default createStore({
  modules,
  state() {
    return {
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
})
