module.exports = Behavior({
  data: {
    name: "jzs",
    age: 22,
    obj: {
      name: "zjc",
      age: 22,
      addr: "jinhua"
    }
  },
  lifetimes: {
    ready() {
      console.log("outer ready");
    },
    created() {
      console.log("outer created");
    }
  },
  methods: {
    getName () {
      console.log("outer");
      return this.data.name
    }
  },
  properties: {
    count: {
      type: Number,
      value: 99
    }
  }
})