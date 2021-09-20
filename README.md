# vue3-progress

A vue3 plugin to show a progress bar while waiting for something.

# Demo

Find a demo at [https://vue3-progress-demo.netlify.app/](https://vue3-progress-demo.netlify.app/).

# Setup

    npm install @marcoschulte/vue3-progress

Add plugin
```typescript
// main.ts

import {createApp} from 'vue';
import App from './App.vue';
import {Vue3ProgressPlugin} from '@marcoschulte/vue3-progress';

createApp(App)
    .use(Vue3ProgressPlugin)
    .mount('#app');
```

Import style
```scss
// in an .scss file
@import "~@marcoschulte/vue3-progress/dist/";

// alternatively the pre-compiled css can be imported from @marcoschulte/vue3-progress/dist/index.css
```

Add progress bar component

```html
<!-- App.vue -->

<template>
  <vue3-progress-bar></vue3-progress-bar>
  
  <!-- snip -->
  
</template>
```

# Usage

There are different ways to use the plugin

```typescript
import {useProgress} from '@marcoschulte/vue3-progress';

// via useProgress()
const progress = useProgress().start();
progress.finish();

// via global property
const progress = this.$progress.start();
progress.finish();
```

Alternatively the progress plugin can be attached to a `Promise`:

```typescript
const promise: Promise<any> = loadUsers();
const attached = useProgess().attach(promise);
const thisIsTrue = attached === promise;
```

### Multiple simultaneous progresses

```typescript
// the plugin tracks how many "progresses" are active.
// progress.finish() can safely be called multiple times
const progress1 = useProgress().start(); // progress bar appears
const progress2 = useProgress().start();

progress1.finish();
progress1.finish(); // progress bar is still shown, calling multiple times is safe
progress2.finish(); // progress bar disappears
```

### On the scope of useProgress()

`useProgress()` can be used from everywhere, not only from vue functional components such as `setup`.
This is possible because a reference to the plugins instance is globally registered. This behavior can be deactivated
through installing the plugin as `.use(Vue3ProgressPlugin, {disableGlobalInstance: true})`. The plugin will now use vue's
inject/provide mechanism.

# Examples

### Usage with axios

```typescript
import {ProgressFinisher, useProgress} from '@marcoschulte/vue3-progress';

const progresses = [] as ProgressFinisher[];

axios.interceptors.request.use(config => {
  progresses.push(useProgress().start());
  return config;
});

axios.interceptors.response.use(resp => {
  progresses.pop()?.finish();
  return resp;
}, (error) => {
  progresses.pop()?.finish();
  return Promise.reject(error);
});
```

# Customizing

### Customizing the style

Some scss variables are exposed which can be customized as follows. Check `ProgressBar.vue` for all variables. 

```scss
$vue3-progress-bar-color: #ff0000;
@import "~@marcoschulte/vue3-progress/dist/";
```

Alternatively the css classes can be overriden in your own style.

### Customizing the ProgressBar Component

If customizing the style is not sufficient, you can easily write your own progress bar component instead of using the provided one.
The trickling effect can be reused if wanted, it is provided as a composable. Check `ProgressBar.vue` as a reference to create your own.
