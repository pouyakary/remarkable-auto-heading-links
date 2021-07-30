
# Automatic Remarkable Heading Links

This is a [Remarkable]() plugin, that transforms the headings into headings with ids and links so that you can share `#` links.

```markdown
# Hello, World!

In a normal Markdown compile, the above
title will compile to:

<h1>hello, world!</h1>

This plugin, transforms the headings and
adds ids and links to them. So the above
example, compiles to:

<h1 id="hello-world"><a href="#hello-world">Hello, World!</a></h1>

It's that simple!
```

## How to use?
Install the package:
```
npm install --save remarkable-auto-heading-id
```

Then use it like:

```js
const { Remarkable } =
    require( "remarkable" )
const { addIDToAllMarkdownHeaders } =
    require( "remarkable-auto-heading-links" )

const md =
    new Remarkable( remarkSettings )
        .use( addIDToAllMarkdownHeaders )

const html =
    md.render("# has links!")
```