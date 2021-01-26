# gridsome-remark-embed-code
### plugin for Gridsome that allows the integration of code from external files into markdown documents.
#### The problem
* Markdown (grisome-remark) perfectly renders the code that needs to be rendered. Nevertheless: 
  * You need to put the code contained in the markdown which could lead to semantic or tabulation errors that are easier to control with an IDE and the source code.
  * It is tedious to repeat that content, which does not change, to make a web of several languages.
* The existing plugin [gridsome-remark-embed-snippet](https://github.com/mrinalini-m/gridsome-remark-embed-snippet):
  * asks for a file per code to be included. I have articles with a lot of integrated code which would require me to create many reference files
  * Takes the language of the file extension. If I created a complete file of html + css + js for complete examples the language not associated with the extension (css, js) would be difficult to be distinguished.
  * Despite these facts, it is the code that was taken as a base for the creation of this plugin (thanks to its creator).
### The proposed solution:
* A plugin capable of obtaining the code from a file and display it in the markdown.
  * The beginning and end of the code is marked in the file. 
    * The markings are configurable.
    * It will take the line following the initial mark until the line before the final mark.
    * Infinite marks are allowed in the code. That's why you need a unique name for each one.
    * Nesting is allowed. Nested marks will be skipped when requesting parent marks.
    * Several formats are allowed
    * The language can be selected for a correct renderization.
  * You can configure a default directory. You can use an absolute or relative path.
    * Even if the default path exists, you can reference a path (from that path or in an absolute way) to the destination file
### Installation
**Careful!:** This plugin depends on the [@gridsome/transformer-remark](https://github.com/gridsome/gridsome/tree/master/packages/transformer-remark) plugin.
```bash
npm install gridsome-remark-embed-code
yarn add gridsome-remark-embed-code
```
#### Basic configuration.
The plugin must be put **before** the **@gridsome/remark-prismjs** plugin in the **gridsome.config.js** configuration to work properly.
This is because primjs will transpose the markdown code to html and then the markups necessary for the plugin to work will be lost.
Example:
```javascript
transformers: {
  remark: {
   ...
    plugins: [
        'gridsome-remark-embed-code',
        ....
        '@gridsome/remark-prismjs',
      ....
    ]
  }
}
```
#### Basic operation:
Structure of example folders.

![image example](images/plugin-gridsome-code-draw.png)

Using above example structure, the code added in our markdown would be:

```
embed: ./snippets/jquery-vue1/jQueryInputSimple.html#input
```
#### Explanation:
`Embed` is the keyword to indicate that content will be embedded. 
Then you write the path and the name of the file.
`#input` is a reference to a piece of code marked in the file: 

```html
  <!-- gridsome_start: input -->
  <input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">
  <!-- gridsome_end: input -->
```
The markdown will process: 
```html
<input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">
```
### Advanced. Usage. Configuration. Customization.
The plugin allows to set 8 parameters and uses 9 in total.
#### Plugin configuration in Gridsome:
When we pass parameters to a plugin in **gridsome** the way to write it in **gridsome.config.js** changes slightly:
```javascript
transformers: {
  remark: {
   ...
    plugins: [
        [
            'gridsome-remark-embed-code',
            {
                parameter: value
            }
         ],
        ....
        '@gridsome/remark-prismjs',
      ....
    ]
  }
}
```
#### Parameters used in the markdown:
* **embed**: Is the keyword to indicate the use of the plugin. It is configurable as follows:
__embedKey: string__ // where string is any valid word. This means that you should not use spaces.
Visual example (we will skip visual example, in order to not be repetitive)
```javascript
transformers: {
  remark: {
   ...
    plugins: [
        [
            'gridsome-remark-embed-code',
            {
                embedKey: 'myembed'
            }
         ],
        ....
        '@gridsome/remark-prismjs',
      ....
    ]
  }
}
```
This setting would change the code previously shown in the following way:
```
`myembed: ./snippets/jquery-vue1/jQueryInputSimple.html#input`
```
* **Lang: string** // The language to be used. It is recommended to follow the list below: [highlight.js](https://github.com/highl)
  Example:
  **Lang: html**
```
`embed: ./snippets/jquery-vue1/jQueryInputSimple.html#input Lang: html`
```
It is not necessary if the language matches the file extension.
* **Separator: 'symbol' || 'key'** // by default and when the word is not understood it is **'symbol'**
This parameter is as indicated by the name of the snippet to bring. In previous examples we have seen the following code:
```
`embed: ./snippets/jquery-vue1/jQueryInputSimple.html#input`
```
where **#input** is the name of the snippet. That's the default setting selected **separator** as **symbol**. If the key option (**key**) is used it would change as follows:
```
`embed: ./snippets/jquery-vue1/jQueryInputSimple.html{input}`
```
with a start key and a final key to be able to place the name of the snippet.
Both **key** and **symbol** allow you to configure the characters to be used.  If you choose **symbol** the modifiable value of the character is **separatorSymbol**. And if you select **key** the character values are **separatorKeyStart** and **separatorKeyEnd**.
The default configuration is: 
```javascript
[
  gridsome-remark-embed-code',
   {
     separator: 'symbol',
     separatorSymbol: '#'.
   }
],
```
***<u>No corrections are made becuse of possible conflicts with alphanumeric characters or possible characters used in paths and file names. Using such characters would break the function. We recommend common sense.</u>***

One parameter that is not used within the markdown but affects it directly is 

* **directory: string** => The default directory where to start looking for the file with the snippets. The file can be relative by putting the point before the first bar, or absolute to the site by ignoring that detail. By default there is no directory defined.
Inside the file that contains the snippets we talk before the following format: 
```html
  <!-- gridsome_start: input -->
  <input type="text" class="form-control" id="exampleInput" aria-describedby="inputHelp">
  <!-- gridsome_end: input -->
```
The keywords are configurable with the parameters **startKey** and **endKey** by default are
**start-key: 'gridsome_start'**
**endKey: 'gridsome_end'**
The snippets allow for infinite nesting.
In short, the following configuration: 
```javascript
transformers: {
  remark: {
   ...
    plugins: [
        'gridsome-remark-embed-code',
        ....
        '@gridsome/remark-prismjs',
      ....
    ]
  }
}
```
is equal to:
```javascript
transformers: {
  remark: {
   ...
    plugins: [
        [
            'gridsome-remark-embed-code',
         {
             embedKey: 'embed',
             separator: 'symbol',
             separatorSymbol: '#',
             startKey: 'gridsome_start',
             endKey: 'gridsome_end',
             directory: ''
          }
         ]
        ....
        '@gridsome/remark-prismjs',
      ....
    ]
  }
}
```
### Spaces and comment marks.
The snippets marked in the file with the code do not have to be in a comment or any kind of comment can be used. This decision allows you to use any file format, for example: a list of snippets in .txt or any file of any language that the markdown understands to be code.
#### Valid
```txt
gridsome_start: namesnippet
code
gridsome_end: namesnippet
```
```
// /* <!-- (or any comment format) gridsome_start: namesnippet --> */ 
code
// /* <!-- gridsome_end: namesnippet --> */
```
The marks must be in a line that does not contain code since the plugin removes the entire line of the mark and the nested snippets, if any.
The main idea is to preserve the integrity of the whole code within the file, without having to cut out parts of it for a long article or series of articles.
We have tried to give free way to the spacing to avoid an opinionated format.  The following examples are equally valid:
```
`embed: ./snippets/jquery-vue1/jQueryInputSimple.html #input Lang: html`
```
```
`embed: ./snippets/jquery-vue1/jQueryInputSimple.html#input Lang:html`
```
```
` embed: ./snippets/jquery-vue1/jQueryInputSimple.html #input Lang: html `
```
 ### Rendering
![rendering image](images/render.png)
The image is blank, which is automatically deleted. The start and end marks, the nested marks and the space to the right before the first character of the first line keeping the tabs.
### Collaboration.
Problems, comments, improvements, adaptations, etc. are open through the issues. PR will be welcome with appropriate commentary and/or documentation.
