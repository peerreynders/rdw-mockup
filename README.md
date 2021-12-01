# Mockup site for a Responsive Design Workflow


A(n alternate) mockup tooling setup derived from [Responsive Design Workflow](https://www.responsivedesignworkflow.com/) ([code repo](https://github.com/stephenhay/rdw-code-examples)).

To install:
```shell
$ npm i
```

To generate the screen captures:
```shell
$ npm run capture
```

Once something like
```shell
screen captures complete: Tue., Nov. 30, 2021, 7:16 p.m.. OK to terminate
```
appears, use Ctrl-C to terminate the process.

To start the local server:
```shell
$ npm run start
```

Navigate to `http://localhost:8080/` to view the mockup and to `http://localhost:8080/duxstyle/` to view the design guidelines (Google translate [translates](https://translate.google.com/?sl=la&tl=en&text=dux%20style&op=translate&hl=en) the latin *dux style* to *style guide*).

This setup aims to meet similar objectives as described in [Responsive Design Workflow](https://www.responsivedesignworkflow.com/) for creating a web site mockup, using a different set of tools.

- The static site generator [dexy](https://www.dexy.it/) (with [Jinja](https://jinja.palletsprojects.com/en/3.0.x/)) has been replaced with [11ty](https://www.11ty.dev/) (with [Nunjucks](https://mozilla.github.io/nunjucks/)) and (Dart) [Sass](https://sass-lang.com/dart-sass) (with some influence from [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)). The navigation is generated with the [Navigation Plugin](https://www.11ty.dev/docs/plugins/navigation/). 
- For screen shots [CasperJS](https://github.com/casperjs/casperjs) has been replaced with [Puppeteer](https://developers.google.com/web/tools/puppeteer). The `screenshots.js` script injects the `js-screencapture` [JavaScript Hook](https://cssguidelin.es/#javascript-hooks) into the document to suppress the page notes from the design guide screen shots. 
- RDW uses the dexy [idio filter](https://www.dexy.it/ref/filters/idio.html) for code extracts and syntax highlighting used in the design guide. With 11ty:
  - the [Syntax Highlighting Plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/) ([Prism](https://prismjs.com/index.html)-based) is used for syntax highlighting.
  - the [JavaScript Data File](https://www.11ty.dev/docs/data-js/) version of a [Directory Data File](https://www.11ty.dev/docs/data-template-dir/) is used in combination with [Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to extract code snippets from the mockup site for the design guide. 
 
