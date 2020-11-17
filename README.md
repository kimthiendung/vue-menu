# vue-tabs-code

Highlight Code With Tabs

## Module

```js
// In your main vue file - the one where you create the initial vue instance.
import Vue from "vue";
import TabsCode from "tabs-code";
import "tabs-code/dist/TabsCode.css";

Vue.use(TabsCode);
```

## Browser

In the browser you can include it as you would any other package with unpkg, along with the stylesheet:

```html
<script type="text/javascript" src="https://unpkg.com/vue"></script>
<script type="text/javascript" src="tabs-code.js"></script>
<link rel="stylesheet" href="tabs-code.css" />

<!-- You will also need to install the component during app creation -->
<script>
  Vue.use(TabsCode);
</script>
```
