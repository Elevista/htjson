# Hyper Text JSON
Wrtie HTML in JSON  
[![npm package](https://img.shields.io/npm/v/htjson.svg?maxAge=2592000)](https://www.npmjs.com/package/htjson)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install
```bash
npm i htjson
```
## Usage
```js
const htjson = require('htjson')
let json = {...}
let html = htjson.compile(json)
```

## Format Example
### Simple tag
```html
<div>
  <h1>title</h1>
  <span>content</span>
</div>
```
equals
```js
module.exports = {
  h1:'title',
  span:'content'
}
```
### Tag with attribute
```html
<span class="foo">foo</span>
```
from
```js
module.exports = {span: {_class: 'foo', $text: 'foo'}}
```

### Multiple children without attributes
```html
<article>
  <h1>london</h1>
  <p>London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
  <p>Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.</p>
</article>
```
from
```js
module.exports = {
  article: [
    {h1: 'london'},
    {p: 'London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.'},
    {p: 'Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.'}
  ]
}
```
### Multiple children with attribute
```html
<div class="abc">
  divs
  <span>first</span>
  <div>
    <a href="#">london</a>
  </div>
  <div>
    <a href="#">Paris</a>
  </div>
  <div>
    <a href="#">Tokyo</a>
  </div>
</div>
```
from
```js
module.exports = {
  div: {
    _class: 'abc',
    $: [
      'divs',
      {span: 'first'},
      {
        div: {
          a: {_href: '#', $text: 'london'}
        }
      },
      {
        div: {
          a: {_href: '#', $text: 'Paris'}
        }
      },
      {
        div: {
          a: {_href: '#', $text: 'Tokyo'}
        }
      }
    ]
  }
}
```

# Options
## Indent
```js
const htjson = require('htjson')
htjson.indent = '\t' // default 2 spaces
```