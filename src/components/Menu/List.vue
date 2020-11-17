<template>
  <ul class="menu-list">
    <MenuItem v-for="(n, k) of nodes" :node="n" :key="k" @clicked="onClicked" />
  </ul>
</template>

<script>
import MenuItem from "./Item";
export default {
  props: ["nodes"],
  components: { MenuItem },
  methods: {
    onClicked(el, link) {
      this.$emit("clicked", { el, link });
    }
  }
};
</script>
