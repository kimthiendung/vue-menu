<template>
  <li :class="{ 'nav-sub': node.children }">
    <a v-on:click.passive="clicked($event.target, link)">
      <i v-if="node.icon" :class="node.icon"></i>
      {{ node.label }}
    </a>
    <List v-if="node.children" :nodes="node.children" />
  </li>
</template>
<script>
// import { debounce } from "./util.js";
// import { EventBus } from "./event.js";
export default {
  name: "menu-item",
  props: ["node"],
  components: { List: () => import("./List") },
  methods: {
    clicked(el, link) {
      let vm = this;
      const li = el.parentNode;
      li.classList.toggle("nav-active");
      //last active
      let last = document.querySelector(".im-last-click");
      if (last) last.classList.remove("im-last-click");
      li.classList.add("im-last-click");
      vm.$emit("clicked", { el, link });
    }
  },
  // mounted: debounce(function() {
  //   EventBus.$emit("imMenu:mounted");
  // }, 500),
  beforeDestroy: function() {
    // EventBus.$off("imMenu:mounted");
  }
};
</script>
