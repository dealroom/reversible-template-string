# reversible-template-string
Encode and decode data to string using mustache-like template strings

# Usage

To get started, install and import the package:

```
npm i reversible-template-string
```

```js
import { encodeTemplate, decodeTemplate } from 'reversible-template-string';
```

## Functions

<dl>
<dt><a href="#encodeTemplate">encodeTemplate(template, values)</a> ⇒ <code>String</code></dt>
<dd><p>Encode a template with the given variables.
NOTE: values must not include curly braces or commas.</p>
</dd>
<dt><a href="#decodeTemplate">decodeTemplate(template, string)</a> ⇒ <code>Object</code></dt>
<dd><p>Decode a template string given the given template.</p>
</dd>
</dl>

<a name="encodeTemplate"></a>

## encodeTemplate(template, values) ⇒ <code>String</code>
Encode a template with the given variables.
NOTE: values must not include curly braces or commas.

**Kind**: global function  
**Returns**: <code>String</code> - The template with the values encoded. E.g. `'employee_12_months_growth'`  

| Param | Type | Description |
| --- | --- | --- |
| template | <code>String</code> | Template string. E.g. `'employee_{period}_months_growth'` |
| values | <code>String</code> | Object of values to insert in the string. E.g. `{ period: 12 }` |

<a name="decodeTemplate"></a>

## decodeTemplate(template, string) ⇒ <code>Object</code>
Decode a template string given the given template.

**Kind**: global function  
**Returns**: <code>Object</code> - An object given the matched template values. E.g. `{ period: '12' }`  

| Param | Type | Description |
| --- | --- | --- |
| template | <code>String</code> | Template string. E.g. `'employee_{period}_months_growth'` |
| string | <code>String</code> | A string to be decoded with the given template. E.g. `'employee_12_months_growth'` |

