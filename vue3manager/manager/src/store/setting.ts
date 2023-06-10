import {defineStore} from "pinia"
export default defineStore("setting",{
  state: () => {
    return {
      color: localStorage.getItem("color") || "",
      dark: localStorage.getItem("dark") === "true",
    }
  }
})