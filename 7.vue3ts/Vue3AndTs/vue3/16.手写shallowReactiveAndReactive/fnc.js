const ReactiveHandle = {
  get(target, prop) {
    console.log("Reactive 监听 获取数据", prop);
    if  (prop == "_is_reactive") {
      return true
    }
    return Reflect.get(target, prop)
  },
  set(target, prop, value) {
    console.log("Reactive 监听 修改数据", prop);
    Reflect.set(target, prop, value)
  },
  deleteProperty(target, prop) {
    console.log("Reactive 监听 删除属性", prop)
    Reflect.deleteProperty(target, prop)
  }
}
const readonlyHandle = {
  get(target, prop) {
    if (prop === "_is_readonly") {
      return true
    }
    console.log("readonly 监听获取数据", prop);
    return Reflect.get(target, prop)
  },
  set() {
    console.warn("readonly 不允许修改")
  },
  deleteProperty(target, prop) {
    console.warn("不允许删除");
    // Reflect.deleteProperty(target,prop)
  }
}
function shallowReactive(data) {
  if (typeof data === "object") {
    return new Proxy(data, ReactiveHandle)
  }
  return data
}
function Reactive(data) {
  if (typeof data === "object") {
    if (Array.isArray(data)) {
      data.forEach((item, idx) => {
        data[idx] = Reactive(item)
      })
    } else {
      let keys = Object.keys(data)
      keys.forEach((key, idx) => {
        data[key] = Reactive(data[key])
      })
    }
    return new Proxy(data, ReactiveHandle)
  }
  return data
}

function shallowReadonly(data) {
  if (typeof data === "object") {
    return new Proxy(data, readonlyHandle)
  }
  return data
}
function readonly(data) {
  if (typeof data === "object") {
    if (Array.isArray(data)) {
      data.forEach((item, idx) => {
        data[idx] = readonly(item)
      })
    } else {
      let keys = Object.keys(data)
      keys.forEach(key => {
        data[key] = readonly(data[key])
      })
    }
    return new Proxy(data, readonlyHandle)
  }
  return data
}
function shallowRef(data) {
  return {
    _value: data,
    set value(newValue) {
      console.log("shallow 修改");
      this._value = newValue
      return true
    },
    get value() {
      console.log("shallow 获得");
      return this._value
    }
  }
}

function ref(data) {
  if (typeof data === 'object') {
    data = Reactive(data)
  }
  return {
    _value: data,
    _is_ref: true,
    set value(newValue) {
      console.log("shallow 修改");
      this._value = newValue
      return true
    },
    get value() {
      console.log("shallow 获得");
      return this._value
    }
  }
}

function isRef (data) {
  return data && data["_is_ref"]
}
function isReactive (data) {
  return data && data["_is_reactive"]
}
function isReadonly (data) {
  return data && data["_is_readonly"]
}
function isProxy (data) {
  return isReactive(data) || isReadonly(data)
}