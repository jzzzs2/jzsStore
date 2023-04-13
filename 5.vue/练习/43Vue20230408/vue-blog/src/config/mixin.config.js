export default {
  methods: {
    showModal(type) {
      console.log(type, "type");
      this.$store.dispatch("modal/openModal", { type })
    }
  }
}