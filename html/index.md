# What is HTML?
- HTML stands for **HyperText Markup Language**.
- It is a markup language that defines structure of a web page.
- It give a skeleton that sets the content of websites.
- No web page can exist without it


## Difference between HTML and HTML5?
Ans: HTML5 is latest version of HTML, with significant improvements like semantic tags, built-in support for multimedia.


## What is semantic HTML and why it is important?
- Semantic HTML are the tags that convey the purpose or the meaning of the content they enclose.
- Eg: Instead of `<div>` for header and footer, we may use the tags -> `<header>` and `<footer>`.
- It helps in accessibility, SEO and maintainability.

<br>

## `<!DOCTYPE>`
- Tells which HTML version is we using

## HTML SEO TAGS
- `<title>` - tells what this page is about
- `<meta name="description">` - summary of page content
- `<h1>` to `<h6>` tags - tags that defines subtopics 
- `<img alt>` - seo can't see images, so it is used to understand img.

## Non Semantic tags
- `<div>`, `<span>`
These do not describe their content's meaning


## Web Crawlers
- A web crawler is a small program that automatically browses websites to collect and index information for search engunes.
<br>
- Question: How do we control them?
<br>
Answer: We can control them using meta tags or robots.txt file.
<br> 1. Meta Tags: ```<meta name="robots" content="noindex nofollow">``` 
<br> noindex  = dont show this page in search results.
<br> nofollow = dont follow links on this page.
<br> 2. Robots.txt: ```User-Agent: *```

## Anchor tag
- This is used for hyperlinks, to link internal or external resources 
```html
<a href="https://some link.com" rel="noopener noreferer" target="_blank">
```
- href -> url of target
- target="_blank" -> open url in new tab
- title -> tooltip for mouse hover
- rel="noopener" -> prevents new page from accessing `window.openner` property for (js) security purposes.
- rel="noreferrer" -> hides the referrer info
<br>

## Image tag
```html
<img src="jpg" alt="cat" width="300" height="300" loading="lazy">
```
- loading="lazy" -> delays loading until the image is about to enter the viewport 
<br>

## picture tag
- Gives multiple options for images and let browser choose the best one
```html
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpg">
    <img src="image.jpg" alt="Responsive Image">
</picture>
```
- Works as if-else conditions for images