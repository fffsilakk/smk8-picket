<template>
  <div @change="changeColor">
    <DarkMoonIcon ></DarkMoonIcon>
    <LightMoonIcon ></LightMoonIcon>
  </div>
</template>

<script>
import { ref } from "vue";
import DarkMoonIcon from "./customeicons/DarkMoonIcon.vue";
import LightMoonIcon from "./customeicons/LightMoonIcon.vue";

const theme = ref("dark");

const changeColor = () => {
  if (
    theme.value === "dark" ||(!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
</script>
