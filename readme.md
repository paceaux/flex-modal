# Flex Modal: A ridiculously flexible modal window #

A modal window flexible enough to work with your Content Management System and your content authors.

**Document**:       FlexModal, the jQuery Plugin

**Author**:         Frank M. Taylor

**Dependencies**:   jQuery 1.8.3.min.js
                
**Demo**:
http://jsfiddle.net/Paceaux/wvsY2/embedded/result/

## Modal Window Basics ##

A modal window does two things to the end user: 

 1 It will put a semi transparent overlay on the screen that covers the content
 2 it will draw a box in the center of the screen

This modal window isn't much different. You should see some transparent black background, and then you should get a white box that's centered.

## So why another modal window? ##

### It's divine 
This modal window follows the golden ratio or "divine proportion"; it should occupy .618 of the window's width *and* height.  

### It's liquid ###
Without any dimensions,  it'll adapt to any screen size and resolution. It naturally takes up 61.8% of the width and height. 

### It's smart ###
You can set *any* properties of this modal window **from the HTML**, the jQuery method, or both. This is a modal window that was developed *with the CMS in mind*. You don't need to make a modal window from a JavaScript file any more. 

## Using flexModal ##
Flex, modal, just like any other modal window, comprises of two basic steps: 
 1 Designate what will trigger the modal
 2 Designate the content that flexModal will show

### Triggering the Modal ###
flexModal is designed to be triggered by something that the end user does, whether it's clicking, hovering, or even visiting a page with a query string in the URL. flexModal's default behavior is to assume the click event is what fires it.  

#### Triggering with a button: 
````
<button class="video openModal" href="http://blog.frankmtaylor.com">View Video</button>

$('.openModal').flexModal()
````
#### Triggering with a link to an element

````
<a class="list__item__link" href="#veggies" data-modal='{"closebutton" : "false"}'>Click Me</a>

$('[data-modal]').flexModal()
````

#### Triggering with a link to an iframe
````
 <a class="list__item__link" href="http://blog.frankmtaylor.com" data-modal='{"iframe": {"seamless": "true"} }'>Click me</a>
````

#### Triggering with a query in the URL:
````
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(window.location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g," "));
}

if (window.location.search.length > 0) {
    var elId = getParameterByName('modal'),
    $el = $('#' + elId);
    $el.flexModal({
        trigger: 'query',
        src: "#video"
    });
}

````
### Setting the modal content
You have two ways to set content in flexModal:
 1 Content on the Page
 2 iframe

### Setting Content on the Page

The content of the modal can be wrapped with a flew `class`es.

 1 Wrap that content with a `class` called `modal__container`
 2 Give the `modal__container` an `id`
 3 Inside of `modal__container`, wrap the content with 'modal__content'
 4 Add a title if you feel it appropriate

flexModal.css will do the job of hiding the content if you follow this approach. 

````
<div id="content" class="modal__container">
    <h3 class="modal__header">Modal  Title</h3>
    <div class="modal__content">
        <p>Some other content that I can see an play with</p>
        <p>Kale parsnip turnip greens lotus root black-eyed pea carrot dulse chard gumbo amaranth
        brussels sprout watercress aubergine bush tomato. Chickpea chicory green bean
        water chestnut taro beetroot cucumber gram pea sprouts pea radish tomato cauliflower.
       Sierra leone bologi rutabaga amaranth broccoli tomatillo collard greens broccoli rabe corn seakale.
        </p>
    </div>
</div>  
````
flexModal does not need your modal content to be wrapped in any classes. You only need to do this if you want the content to be *hidden* - except when put in the modal.  

If you want the content to be visible, then just leave it where it is! When flexModal finishes showing your content, it returns it to where it found it on the page. 

### Iframed Content

If you want to trigger an iframe, then the modal window will use the src or href of a link or button to populate the iframe. 
````
<button class="video openModal" href="http://blog.frankmtaylor.com">View Video</button>
````

## flexModal Configuration

### Parameters
#### Required Parameters ###
`"src" : "[anchor or url]"` A text value for where the content should come from (useful if the trigger isn't a link). Only required if you don't have a `src` or `href` already on the trigger element. 

#### Appearance
`"top" : "[number]"` The position from the top. The 
`"overlay": "[number bebween .01 and 1]"` The opacity of the overlay
`"closeButton": "[true/false]"` A boolean value, which determines whether to show the close button
`"sizing": "{"height" : [number], "width: [number]"}"` you can set either the height, the width, or both. You don't need a unit

####  Content ###
`"title" : "[text]"` A title to be added to the modal window. This will overwrite the header/title in the content (if one exists).

####  Iframe ####
`"iframe" : "[true/false]"` If it's set to true, then the URL in the href attribute is iframed. If you're using SRC, then that will be iframed, instead
`"iframe": "{"[an attribute]" : "[a value"}"` you can add any attributes you want to an iframe

#### Event
`"trigger": "['event'/'query']"` Text value which is the name of an event, or the word "query". If it is a query, it will rely on the src attribute to determine which `id` to display


### Applying the configuration ### 
flexModal got its name because it's flexible in *how* you configure it. That's because you can configure it from JavaScript or HTML!


### Configuring flexModal from the HTML
If you want to configure flexModal from the HTML, this involves using an attribute called `data-modal` on the element that will trigger the modal. 

You can  provide parameters within `data-modal` that can set the parameters controls for your modal. As you are creating data-modal parameters, be mindful that you must use well-formed JSON. 


** A note on writing JSON**

+ Everything is a key/value pair. The first item is the Key, the thing after the colon ( :) is the value
+ Wrap everything in quotes ("")
separate every key/value pair with a comma — but don't put a comma after the last one


All the configurations in one attribute: 
````
<a class="list__item__link" data-modal='{"top": "20", "overlay": "0.5","sizing": {"height" : "700", "width" : "500"}, "src" : "#content"}'>Click Me</a>
````

If writing a single attribute is a little burdensome for the CMS developer, or too hard to read, then it's acceptable to use multiple `data-modal-` attributes: 

````
 <a class="list__item__link" href="#content" data-modal='{"overlay": "0.5"}' data-modal-top="20" data-modal-sizing='{"height":"700", "width": 500}' data-modal-closebutton="false">Click Me</a>
````

