<h1>mdne - Markdown Neo Edit</h1>

![alt text](https://shellyln.github.io/assets/image/mdne-logo.svg "Logo" =200x200)

<h3>

A simple markdown and code editor powered by [Markdown-it](https://github.com/markdown-it/markdown-it),
[Ace](https://ace.c9.io/) and [Carlo](https://github.com/GoogleChromeLabs/carlo).

</h3>

* [npm](https://www.npmjs.com/package/mdne)
* [github](https://github.com/shellyln/mdne)


<h2>Table of contents</h2>

[[TOC]]


# Live demo restrictions

* Rendering / exporting to PDF is not available.
* You can only open files by dropping local files.
* Save and SaveAs commands download the file being edited.


# Live demo browser requirements

* Google Chrome: latest
* Firefox: latest


# Heading

# h1
## h2
### h3
#### h4
##### h5
###### h6



# Horizontal Rules

___

---

***



# Links
[I'm an inline-style link](https://shellyln.github.io)

[I'm an inline-style link with title](https://shellyln.github.io "shellyln")



# Images
![alt text](https://shellyln.github.io/assets/image/mdne-logo.svg "Logo" =200x200)



# Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

++This is inserted text++

==This is marked text==



# Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.



# Lists

1. First ordered list item
2. Another item
    * Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
    1. Ordered sub-list
4. And another item.

    You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

    To have a line break without a paragraph, you will need to use two trailing spaces.  
    Note that this line is separate, but within the same paragraph.  
    (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses



# Tables

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |



# Syntax highlighting

```javascript
function foo(x) {
    return x;
}
```


# Cheeckbox

[ ] foo
[X] bar
[ ] baz



# PlantUML
[https://github.com/gmunguia/markdown-it-plantuml](https://github.com/gmunguia/markdown-it-plantuml)

@startuml
Bob -> Alice : Hello
@enduml



# Footnotes

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.



# Definition lists

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b



# Abbreviations

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language



# Math (supported browsers: Firefix, Safari)
[https://github.com/runarberg/markdown-it-math](https://github.com/runarberg/markdown-it-math)

Pythagoran theorem is $$a^2 + b^2 = c^2$$.

Bayes theorem:

$$$
P(A | B) = (P(B | A)P(A)) / P(B)
P(A | B) = (P(B | A)P(A)) / P(B)
$$$

$$$
P(A | B) = (P(B | A)P(A)) / P(B)
$$$

$$$
P(A | B) = (P(B | A)P(A)) / P(B)
$$$

$$$
P(A | B) = (P(B | A)P(A)) / P(B)
$$$

<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"
    crossorigin="anonymous" async></script>


# Scripting

In the markdown or HTML documents,
you can start `Lisp LSX` block. The block starts with <code>&#x0025;&#x0025;&#x0025;(</code> and ends with pair parenthesis `)` .

See [https://github.com/shellyln/menneu#lisp-block-expansion](https://github.com/shellyln/menneu#lisp-block-expansion).

To evaluate the following scripts, turn on the `scripting` switch at the top of the screen.


%%%($last
    ($let table-data '(1 2 3 4 5 6 7 8 9))
    nil)

| Left align           | Right align             | Center align                               |
|:---------------------|------------------------:|:------------------------------------------:| %%%($=for table-data """
| %%%($get $data)      | %%%($get $index)        | %%%($get $array ($get $index))             | """)
| %%%(+ ...table-data) | %%%($length table-data) | %%%($reduce table-data (-> (a b) (+ a b))) |


# Macro

In this demo, `replacementMacros` are preconfigured.  
`replacementMacros` use RegExp to replace source strings before the scripting and markdown evaluation phases.

See [https://github.com/shellyln/menneu#config-file](https://github.com/shellyln/menneu#config-file).


### Preconfigured macro

* <code>&#x0021;&#x0021;&#x0021;lsx (...) &#x0021;&#x0021;&#x0021;</code>
  * Evaluate as independent lisp LSX code.


!!!lsx (Qr (@ (cellSize 0.8) (data "Hello"))) !!!

Fibonacci number: !!!lsx
($local ()
    ($let fib-sub (-> (n a b)
        ($if (< n 3)
            ($cond (=== n 2) (+ a b)
                   (=== n 1) a
                   true      0)
            ($self (- n 1) (+ a b) a) ) ))
    ($capture (fib-sub)
        ($defun fib (n) (fib-sub n 1 0)) ))

($join ($map ($range 0 20) (<- fib)) ",")
!!!
