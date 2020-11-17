# vue-im-menu

Vue menu horizontal vs vertical support responsive

## Module

```js
// In your main vue file - the one where you create the initial vue instance.
import Vue from "vue";
import ImMenu from "vue-im-menu.js";
import "vue-im-menu/dist/vue-im-menu.css";

Vue.use(ImMenu);
```

## Browser

In the browser you can include it as you would any other package with unpkg, along with the stylesheet:

```html
<im-menu :data="itemOptions" @clicked="clicked" :rtl="true" toggle="right">
  <template v-slot:begin>
    begin
  </template>
</im-menu>

<!-- You will also need to install the component during app creation -->
<script>
  Vue.use(ImMenu);
</script>
```
