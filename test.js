const htjson = require('./index')

let input = `
<!DOCTYPE html>
<html>
<head>
<style>
div.container {
    width: 100%;
    border: 1px solid gray;
}
</style>
</head>
<body>

<div class="container">

  <header>
     <h1>City Gallery</h1>
  </header>
    
  <nav>
    <ul class="abc">
      <li><a href="#">London</a></li>
      <li><a href="#">Paris</a></li>
      <li><a href="#">Tokyo</a></li>
    </ul>
  </nav>
  
  <article>
    <h1>London</h1>
    <p>London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
    <p>abcd<br>efgh</p>
    <p>Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.</p>
  </article>
  
  <footer>Copyright &copy; W3Schools.com</footer>
  
  </div>

</body>
</html>`

let json = {
  html: {
    head: {
      style: `
      div.container {
        width: 100%;
        border: 1px solid gray;
      }`
    },
    body: {
      div: {
        _class: 'container',
        header: {
          h1: 'City Gallery'
        },
        nav: {
          ul: {
            _class: 'abc',
            $: [
              {li: {a: {_href: '#', $text: 'london'}}},
              {li: {a: {_href: '#', $text: 'Paris'}}},
              {li: {a: {_href: '#', $text: 'Tokyo'}}}
            ]
          }
        },
        article: [
          {h1: 'london'},
          {p: 'London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.'},
          {p: ['abcd', {br: '/'}, 'efgh']},
          {p: 'Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.'}
        ],
        footer: 'Copyright &copy; W3Schools.com'
      }
    }
  }
}
console.log(htjson.compile(json))
// console.log(htjson.compile({
//   article: [
//     {h1: 'london'},
//     {p: 'London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.'},
//     {p: ['abcd', {br: '/'}, 'efgh']},
//     {p: 'Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.'}
//   ]
// }))
// console.log(htjson.compile({footer: 'Copyright &copy; W3Schools.com'}))
// console.log(htjson.compile({html: {body: 'aa'}}))

// console.log(htjson.compile({
//   article: [
//     {p: ['abcd', {br: '/'}, 'efgh']},
//   ],
// }))
// htjson.compile({
//   article: [
//     // {h1: 'london'},
//     // {p: 'London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.'},
//     {p: ['abcd', {br: '/'}, 'efgh']},
//     // {p: 'Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.'}
//   ],
// })
// htjson.compile({
//   ul: {
//     _class: 'abc',
//     $: [
//       {li: {a: {_href: '#', $text: 'london'}}},
//       {li: {a: {_href: '#', $text: 'Paris'}}},
//       {li: {a: {_href: '#', $text: 'Tokyo'}}}
//     ]
//   }
// })
//
