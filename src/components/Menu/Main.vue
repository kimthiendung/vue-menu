<template>
  <div
    class="im-menu"
    :class="{
      'menu-vertical': type === 'vertical',
      'nav-left': !rtl,
      'nav-right': rtl,
      'im-menu-only': !$slots.begin && !$slots.end
    }"
    v-if="isShow"
  >
    <div class="im-nav-begin" v-if="$slots.begin">
      <slot name="begin"></slot>
    </div>
    <div class="im-nav-wrap">
      <List class="im-nav" :nodes="data" @clicked="onClicked" />
    </div>
    <div class="im-nav-end" v-if="$slots.end">
      <slot name="end"></slot>
    </div>
    <div class="im-overlay" @click="toggleMenu"></div>
    <div class="im-nav-btn im-nav-btn--spin" @click="toggleMenu">
      <div class="im-nav-btn-box">
        <div class="im-nav-btn-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { EventBus } from "./event.js";
import List from "./List";
export default {
  name: "imMenu",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: "horizontal"
    },
    rtl: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: String,
      default: null
    }
  },
  components: { List },
  data() {
    return {
      isShow: false,
      menu: null
    };
  },
  methods: {
    onClicked(action) {
      this.$emit("clicked", action);
    },
    toggleMenu() {
      const body = document.body || this.$el;
      body.classList.toggle("im-toggle");
    }
  },
  created() {
    this.isShow = true;
    const body = document.body || this.$el;
    if (this.toggle === "left") {
      body.classList.add("im-left");
    }
    if (this.toggle === "right") {
      body.classList.add("im-right");
    }
  },
  mounted() {},
  beforeDestroy() {
    this.isShow = false;
  }
};
</script>
<style lang="scss">
:root {
  --bg: #26292f;
  --bgActive: #0b7285;
  --bgNested: rgba(0, 0, 0, 0.1);
  --txt: #8d97ad;
  --txtActive: #ffffff;
}
.im-menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--bg);
}
.im-menu-only {
  justify-content: space-around;
}
.im-nav,
.im-nav ul,
.im-nav li,
.im-nav a {
  margin: 0;
  padding: 0;
  line-height: normal;
  list-style: none;
  display: block;
  position: relative;
  font-family: "Times New Roman", Times, serif;
}

.im-nav a {
  cursor: pointer;
  padding: 0 16px;
  color: var(--txt);
  font-weight: normal;
  font-size: 16px;
  line-height: 50px;
  text-decoration: none;
}

/* active */
.im-nav li > a:hover {
  color: var(--txtActive);
}
.im-nav li.im-last-click > a,
.im-nav > li > a:hover {
  background: var(--bgActive);
  color: var(--txtActive);
}

.im-nav li {
  cursor: default;
  float: left;
  white-space: nowrap;
}
/* level 2^ */
.im-nav ul li {
  float: none;
}

/* arrow */
.im-nav .nav-sub > a {
  position: relative;
  padding-right: 30px;
}
.im-nav .nav-sub > a::after {
  position: absolute;
  content: "";
  width: 0.3em;
  height: 0.3em;
  border-width: 1px 0 0 1px;
  border-style: solid;
  border-color: initial;
  right: 1em;
  transform-origin: top;
  top: 50%;
  transform: rotate(225deg) translate(0, -50%);
  transition: all 0.3s ease-out;
}

.nav-left .im-nav ul .nav-sub > a::after {
  transform: rotate(135deg) translate(0, -50%);
}
.nav-right .im-nav ul .nav-sub > a::after {
  transform: rotate(315deg) translate(0, -50%);
}

/* center */

/* level 2 */
.im-nav li li a {
  font-size: 13px;
  line-height: 36px;
}
/* level 1 */
.im-nav ul {
  min-width: 12em;
  background: var(--bg);
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  opacity: 0;
  position: absolute;
  top: 100%;
  z-index: 999;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
.nav-left .im-nav ul {
  left: -9999px;
}
.nav-right .im-nav ul {
  right: -9999px;
}
.im-nav li:hover > ul,
.im-menu:not(.menu-vertical) li.nav-active > ul {
  opacity: 1;
  z-index: 1000;
}
.nav-left .im-nav li:hover > ul {
  left: 0;
}
.nav-right .im-nav li:hover > ul {
  right: 0;
}
/* level 2 */
.im-nav ul li:hover > ul,
.im-menu .im-nav ul li.nav-active > ul {
  top: 0;
}
.nav-left .im-nav ul li:hover > ul,
.nav-left .im-menu .im-nav ul li.nav-active > ul {
  left: 100%;
}
.nav-right .im-nav ul li:hover > ul,
.nav-right .im-menu .im-nav ul li.nav-active > ul {
  right: 100%;
}

/* vertical */
.menu-vertical {
  display: block;
  max-width: 220px;
  width: 100%;
}
.nav-right .im-nav {
  width: 100%;
}
.menu-vertical .im-nav ul {
  top: 0;
}
.menu-vertical li {
  width: 100%;
  float: none;
}
.menu-vertical .nav-active > ul {
  opacity: 1;
}
.nav-left.menu-vertical .nav-active > ul,
.nav-left.menu-vertical .im-nav li:hover > ul {
  left: 100%;
}
.nav-right.menu-vertical .nav-active > ul,
.nav-right.menu-vertical .im-nav li:hover > ul {
  right: 100%;
}
.menu-vertical .im-nav li li a {
  font-size: 16px;
  line-height: 50px;
}
.menu-vertical .im-nav li.nav-active li {
  background: var(--bgNested);
}

/** menu-btn */
.im-nav-btn {
  display: none;
  font: inherit;
  overflow: visible;
  margin: 0;
  padding: 12px;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: transparent;
}

.im-nav-btn:hover {
  opacity: 0.7;
}

.im-nav-btn-box {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 22px;
}

.im-nav-btn-inner {
  top: 50%;
  display: block;
  margin-top: -2px;
}

.im-nav-btn-inner,
.im-nav-btn-inner:after,
.im-nav-btn-inner:before {
  position: absolute;
  width: 32px;
  height: 4px;
  transition-timing-function: ease;
  transition-duration: 0.15s;
  transition-property: transform;
  border-radius: 4px;
  background-color: #fff;
}

.im-nav-btn-inner:after,
.im-nav-btn-inner:before {
  display: block;
  content: "";
}

.im-nav-btn-inner:before {
  top: -10px;
}

.im-nav-btn-inner:after {
  bottom: -10px;
}

.im-nav-btn--spin .im-nav-btn-inner {
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  transition-duration: 0.22s;
}

.im-nav-btn--spin .im-nav-btn-inner:before {
  transition: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
}

.im-nav-btn--spin .im-nav-btn-inner:after {
  transition: bottom 0.1s ease-in 0.25s,
    transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.im-toggle .im-nav-btn--spin .im-nav-btn-inner {
  transition-delay: 0.12s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  transform: rotate(225deg);
}

.im-toggle .im-nav-btn--spin .im-nav-btn-inner:before {
  top: 0;
  transition: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
  opacity: 0;
}

.im-toggle .im-nav-btn--spin .im-nav-btn-inner:after {
  bottom: 0;
  transition: bottom 0.1s ease-out,
    transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  transform: rotate(-90deg);
}
.im-nav-begin,
.im-nav-end {
  position: relative;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  overflow: hidden;
  color: var(--txt);
  display: inline-block;
}
.menu-vertical .im-nav-begin,
.menu-vertical .im-nav-end {
  display: block;
}
.menu-vertical .im-nav-wrap::after {
  content: "";
  display: block;
  clear: both;
}
.im-overlay {
  display: none;
}
@media (max-width: 768px) {
  .im-menu {
    display: block;
    font-size: 0;
  }
  .menu-list li {
    width: 100%;
    float: none;
  }
  .menu-list li li a {
    font-size: 16px;
    line-height: 50px;
  }
  .menu-list ul {
    overflow: hidden;
    position: static;
    max-height: 0;
    opacity: 1;
    box-shadow: none;
    transition: max-height 0.2s ease-out;
  }
  .menu-list .nav-active > ul {
    max-height: 1024px;
    transition: max-height 0.4s ease-in;
  }
  .im-nav,
  .menu-vertical .im-nav-wrap,
  .menu-vertical .im-nav-begin,
  .menu-vertical .im-nav-end {
    float: none;
  }
  .im-nav-wrap::after {
    content: "";
    display: block;
    clear: both;
  }
  .nav-left .im-nav .nav-sub > a::after,
  .nav-left .im-nav ul .nav-sub > a::after {
    transform: rotate(315deg) translate(0, -50%);
  }
  .nav-right .im-nav .nav-sub > a::after,
  .nav-right .im-nav ul .nav-sub > a::after {
    transform: rotate(135deg) translate(0, -50%);
  }
  .im-menu .im-nav .nav-active > a::after {
    transform: rotate(225deg) translate(0, -50%) !important;
  }
  .im-menu .im-nav li.nav-active ul {
    background: var(--bgNested);
  }
  .im-left .menu-vertical,
  .im-right .menu-vertical {
    max-width: 56px;
  }
  .im-left .im-nav-btn,
  .im-right .im-nav-btn {
    display: inline-block;
  }
  .nav-left .im-nav-btn {
    float: left;
  }
  .nav-right .im-nav-btn {
    float: right;
  }
  .menu-vertical .im-nav-btn {
    float: none;
  }
  .im-left .im-nav-wrap,
  .im-right .im-nav-wrap {
    background: var(--bg);
    opacity: 0;
    z-index: 1001;
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 220px;
    min-height: 100vh;
    transition: all 0.4s ease-in;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  .im-left .im-nav-wrap {
    left: -100%;
  }
  .im-right .im-nav-wrap {
    right: -100%;
  }
  .im-toggle .im-overlay {
    display: block;
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: default;
  }
  .im-toggle .im-nav-wrap {
    opacity: 1;
    transition: all 0.6s ease-out;
  }
  .im-toggle.im-left .im-nav-wrap {
    left: 0;
  }
  .im-toggle.im-right .im-nav-wrap {
    right: 0;
  }
}
</style>
