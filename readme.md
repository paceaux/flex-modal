 Flex Modal
 ===========
A modal window Flexible enough to work with your Content Management System and your content authors.

**Document**: 		FlexModal, the jQuery Plugin

**Author**: 		Frank M. Taylor

**Dependencies**: 	jQuery 1.8.3.min.js
				
**Demo**:
http://jsfiddle.net/Paceaux/wvsY2/embedded/result/

## Modal Window Basics ##

A modal window does two things to the end user: 

1 It will put a semi transparent overlay on the screen that covers the content
2 it will draw a box in the center of the screen

This modal window isn't much different. You should see some transparent black background, and then you should get a white box that's centered.
## So why another modal window?

### It's divine 
This modal window follows the golden ratio or "divine proportion"; it should occupy .618 of the window's width *and* height.  

### It's liquid
Without any dimensions,  it'll adapt to any screen size and resolution. It naturally takes up 61.8% of the width and height. 

### It's smart
You can set any properties of this modal window **from the HTML**, the jQuery method, or both. This is a modal window that was developed *with the CMS in mind*. You don't need to make a modal window from a JavaScript file any more. 

## Options with our Modal window

Virtually every aspect of the modal can be overwritten,  from the HTML. 

+ The X in the top right is optional
+ The title of the modal is optional
+ The Height and Width can be overwritten
+ The position from the top can be overwritten
+ The modal can open content that's on the page or an iframe
+ We can send parameters to the iframe, to modify how it behaves
+ The modal window can accept a css object
+ the optional iframe can also accept a css object

## The Content in the Modal Window
There are two ways to put content in a modal window

+ We can use content that's already on the page
+ we can iframe content

Let's go through these in some more detail

### Content On the Page

You'll need a code component for this, most likely. The content of the modal must be wrapped in two very special divs, in order for this to work. CSS will do the job of hiding that div.  The modal just takes the content of that div, and will toggle the modal with a show/hide functionality. If you wanted there to be a title for this div, you could set it in the content yourself. 

### Iframed Content

You've got options with how this could work. Basically, you designate a URL with a good ol' fashioned, ordinary link, or within the parameters you can create for your link. When an end user clicks the link, the JavaScript will throw it in a Modal window. 


#### Making a Modal with a Code Componen
A Code Component Modal Window requires two things: A link that's a trigger, and some content

1 create your code component content
+ Any content that needs to go inside of a modal window must be wrapped in a
+ Specifically, it must be wrapped in two divs.
+ Pay special attention that the parent div has an ID. You can only use this ID once. That div must contain one other div.
don't change the classes for these divs. They must work exactly as you see them written.

2 : Create your Trigger
+ The Id that you picked for your content is important. We will need that to make our link.
+ Keep in Mind that you don't need the link to the modal to be in the same component
+ You are using an ordinary anchor link for this. you just need to add a special attribute to this link
.

#### Exploring data-modal

the data-modal attribute is the trigger to make your content  become a modal. And, at the minimum, you must give it an empty value as `{}`

You can also provide parameters within Data-modal that can set all of the different controls for your modal. As you are creating data-modal parameters, be mindful that you must use well-formed JSON.

### Writing JSON
+ Everything is a key/value pair. The first item is the Key, the thing after the colon ( :) is the value
+ Wrap everything in quotes ("")
separate every key/value pair with a comma — but don't put a comma after the last one

### Basic Parameters ###
`"top" : "[number]"` The position from the top. The 
`"overlay": "[number bebween .01 and 1]"` The opacity of the overlay
`"closeButton": "[true/false]"` A boolean value, which determines whether to show the close button
`"src" : "[anchor or url]"` A text value for where the content should come from (useful if the trigger isn't a link)

### Intermediate Parameters ###
	`"title" : "[text]"` A title to be added to the modal window. This will overwrite the header/title in the content (if one exists).
	`"sizing": "{"height" : [number], "width: [number]"}"` you can set either the height, the width, or both. You don't need a unit

### Advanced Parameters ###
`"iframe" : "[true/false]"` If it's set to true, then the URL in the href attribute is iframed. If you're using SRC, then that will be iframed, instead
`"iframe": "{"[an attribute]" : "[a value"}"` you can add any attributes you want to an iframe


## Triggering with 