# RawJS

Utility library to extend javascript primitives.

---

## API
<api></api>

## Concepts
- Extends Object with `map`, `reduce`, `filter`, `find`
  ```js
  import raw from 'raw' // Once imported, you have access to the primitive APIs
  Object.filter({ k1: 1, k2: 2 }, v => v > 1)
  raw() // but objects are not extended until you call the raw() function
  ({ k1: 1, k2: 2 }).filter(v => v > 1)
  ```
- Extends Array, Function, String, Number, Date, RegExp
  ```js
  [2, 3, 5, 8, 11].sum()
  (() => console.log('Oh yeah')).every(1000)
  'Python calls this {}'.format('f-string')
  1002.3004.format('fr')
  new Date().end('month')
  /be-LESS-insensitive/i.minus('i')
  ```
- Immutability
  ```js
  const a = [5, 3, 11, 8, 2]
  const b = a.sort() // every functions are immutable, even sort (overridden)
  console.log(a, b) // [5, 3, 11, 8, 2], [2, 3, 5, 8, 11]
  ```
- Chaining
  ```js
  new Date()
    .plus('4 months')
    .minus('3 days')
    .format('year,month,day', 'fr')
  ```
- Extensibility
  ```js
  Number.chaos = num => num * Math.random() // add a function to a primitive
  raw() // extend prototypes
  (3).chaos() // between 0 and 3
  delete Number.chaos // remove a function from a primitive
  delete Number.prototype.chaos // remove an extension from a primitive
  ```
- Short Codebase, single file, simple functions, no dependencies
  - [~250 loc](https://github.com/vbrajon/rawjs/blob/master/raw.js)
  - [~100 tests](https://github.com/vbrajon/rawjs/blob/master/test-unit.js)
  - [3 benchmarks](https://github.com/vbrajon/rawjs/blob/master/test-perf.js)

---

```css
.api { margin: 20px 0; }
.api [colspan] { padding: 0; }
.api tr td:nth-child(2) { padding: 8px; }
.api pre { margin: 0;border-top-left-radius: 0;border-top-right-radius: 0;white-space: pre-wrap; }
.api :not(pre) > code { cursor: pointer;user-select: none;margin: 4px;border: 1px solid #eee; }
.api :not(pre) > code.active { background: hsl(49, 100%, 83%);border-color: #fd4; }
.api .tab { cursor: pointer;display: inline-block;padding: 12px;background: var(--text);color: white; }
.api .tab:hover, .api .tab.active { background: hsl(49, 100%, 43%); }
.api .tab.active { border-bottom: 4px solid #fd4;padding-bottom: 8px; }
```

```js
document.title = 'RawJS'
document.querySelector('[rel=icon]').href = 'https://vbrajon.github.io/rawjs/r.png'

import('https://vbrajon.github.io/rawjs/raw.js')
.then(m => window.raw = m.default)
.then(() => raw())
.then(() => $('main').__vue__.file = $('main').__vue__.file + ' ') // HACK force reload

Vue.component('api', {
  template: `<table class="api">
  <tr>
    <th>Primitive</th>
    <th>Function</th>
  </tr>
  <tr v-for="primitive in [Object, Array, Function, String, Number, Date, RegExp]">
    <td>{{ primitive.name }}</td>
    <td><code :class="{ active: pname === primitive.name && fname == fn }" @click="pname = primitive.name;fname = fn;" v-for="fn in primitive.name === 'Number' ? ['format', '[math]'] : Object.keys(primitive)">{{ fn }}</code></td>
  </tr>
  <tr>
    <td colspan="2"><pre><code lang="language-js" v-html="fstring">}</code></pre></td>
  <tr>
</table>`,
  data() {
    return {
      pname: 'Object',
      fname: 'map',
    }
  },
  computed: {
    fstring() {
      if (this.fname === '[math]') return Prism.highlight(Object.getOwnPropertyNames(Math).filter(k => typeof Math[k] === 'function').map(k => 'Math.' + k).join(', '), Prism.languages.javascript, 'js')
      return Prism.highlight('' + window[this.pname][this.fname], Prism.languages.javascript, 'js')
    },
  },
})
```

---
