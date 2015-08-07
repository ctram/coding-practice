#jQuery Lite!

## Overview
Today we will be creating most of the important functionality of the
jQuery library. jQuery is widely used for making AJAX request, handling
events, and manipulating the DOM, and guaranteeing it works across
browsers.

We will implement most of this functionality using the native DOM api
that is built right in to every browser. You will be surprised how
little you might actually need jQuery when you finish this project!

## Phase 0: Getting Started
For testing, make a new HTML document and put some content (a few divs,
links, an unordered list, etc) into the body. We will be testing our
library on this document, so give yourself some elements to experiment
with.

Make a JavaScript document, call it `jquery_lite.js` and make a `script`
tag linking it in the `head`.

In the JavaScript file, create an IFFE to contain all the code we write
in this project.

### The core function
* create a new function, call it `$l` and add it to the root namespace
* it should take one argument

## Phase 1: DOM Manipulation and Traversal
In this phase we are going to create a class to hold DOM nodes and offer
convenient methods for traversal and manipulation. We will implement
`empty`, `remove`, `attr`, `addClass`, `removeClass`, `html`, `find`,
`children`, and `parent`.

#### `$l.(selector)`
* the core function, as we know, receives one argument. If that argument
  is a string it is expected to be a `CSS` selector that we can use to
  identify nodes in the page.
* use [this method][querySelectorAll] to get an *array like* object
  (specifically a `NodeList`) that matches the selector using the native
  JavaScript API.
* once we have our `NodeList` we want to convert it into an actual
  `Array` so we can pass it as an argument to the class we will define
  next...

#### `DOMNodeCollection`

* Create a new class, call it `DOMNodeCollection`. It should receive an
**array** of [`HTMLElement`s][htmlelement] as its only argument. Store
this array as an instance variable.
* All the methods we implement will be applied to every node in the
  internal array.
* the core function should return an instance of DOMNodeCollection

#### `$l(HTMLElement)`
* we are now going to modify the core function. It will recieve one
  argument, but let's make it flexible.
* if the argument received is an `object` that is an `instanceof`
  `HTMLElement`.you should put it into an array and return an instance
  DOMNodeCollection
* this will allow a HTMLElement native element to be 'wrapped' in jQuery
  lite goodness
* so: our core function can receive either a single HTMLElement or a
  string with a CSS selector and the return value will be a
  DOMNodeCollection

#### `prototype` methods
##### `html`
* let's write the method `html` first. It can optionally receive a
  string as a parameter.
* If it receives an argument, this will become the `innerHTML` (hint
  hint) of the each of the nodes. If it does **not** receive an
  argument, it should return the `innerHTML` of the **first** node
  in the array.

##### `empty`
* this method clears out all nodes in the internal array. I set the
  `html` of all nodes to an empty string.

##### `append`
* this method should be able to accept either a jQuery-lite wrapped
  collection, an HTML element, or a string.

##### other methods
* I will leave it up to you to figure out ways to implement `attr`,
  `addClass`, and `removeClass`. All the information for how to change
  nodes is available in [this resource][htmlelement].

#### traversal
##### `children`
* `children` is a method that should return a `DOMNodeCollection` of
  **ALL** children of all nodes in the array.
* each node in the array will natively have a `children` method. Look
  [here][children] for more information.
* make sure the return value of this method is an instance of
  `DOMNodeCollection`.

##### `parent`
* return a `DOMNodeCollection` of the `parent`s of each of the nodes

##### `find`
* returns a `DOMNodeCollection` of all the nodes matching the selector
  passed in as an argument that are descendants of the nodes.
  [This might come in handy][queryselectorall].

##### `remove`
* this should `remove` all nodes in the arrray from the DOM

## Phase 2: Event Handling
Now, we are going to add `on` and `off` methods to the
`DOMNodeCollection` prototype. These methods should add and remove event
handlers, respectively. You should find [this resource
helpful][addeventlistener]. Note that this event handler should be
registered for every element in the node array!

## Phase 3: Document Ready
```javascript
$(function(){
  alert('the document is ready');
})
//$(document).ready(someCallback); would have the same effect
```

The above snippet of code should look quite familiar. Its function is to
pop up a helpful alert when the HTML has finished rendering; when the
`document` is `ready`.

For this phase of the project we will be adding this functionality to
our core `$l` function. We will need to change the code inside of our
main function, the one we used to create an instance of
`DomNodeCollection`.

* change the `$l` function so that if it receives a function it will
  it to an array of functions to be executed when the document is ready.
  If the document is already ready, trigger the function immediately.
* see if you can find a way (using your Google skillz) to check if the
  document is ready using Vanilla JavaScript. There are some VERY simple
  solutions.
* once the document has become ready, trigger all your callbacks!

## Phase 4: AJAX
### `$l.extend`
Let's implement a super simple function to merge JavaScript objects. The
arguments will be two or more objects.

For example:

```javascript
var objA = {a: 'a', b: 'a', c: 'a'};
var objB = {b: 'b', c: 'b'};
var objC = {c: 'c'};
$l.extend(objA, objB, objC); //=> {a: 'a', b: 'b', c: 'c'}
objA //=> {a: 'a', b: 'b', c: 'c'}
```
### `$l.ajax`
Finally, let's add the `ajax` function we have all been waiting for!

* add an `ajax` function to the `$l` function object. It should receive
  one options object argument.
* make a `defaults` object. Check [the jQuery `ajax` API document][jquery_ajax]
  to get a sense of what the defaults should be. Provide defaults for
`success`, `error`, `url`, `method`, `data`,  and `contentType`.
* merge the `options` onto the `defaults`
* review [this StackOverflow question][stackoverflow_ajax] to learn how
  to implement an AJAX request using the native JavaScript API. It's
  actually quite easy!
* using the options supplied by the user, make the request. Be sure to
  deliver the proper response to the success/error callback.

## Bonus Phase: Have your `ajax` function return a `Promise`
* use a [`Promise`][promise-library] to pretty up the usage of your AJAX
  function. [Read about promise usage here][promise_doc].

[promise-library]: https://raw.githubusercontent.com/jakearchibald/es6-promise/master/dist/es6-promise.js
[promise_doc]: http://www.2ality.com/2014/09/es6-promises-foundations.html
[htmlelement]: https://developer.mozilla.org/en-US/docs/Web/API/element
[children]: https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children
[queryselectorall]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
[addeventlistener]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
[jquery_ajax]: http://api.jquery.com/jquery.ajax/
[stackoverflow_ajax]: http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
