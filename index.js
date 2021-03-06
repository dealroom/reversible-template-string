/**
 * A regex to match {template} strings.
 */
const templateString = /\{.+?\}/g;
const templateArray = /\[.+?\]/g;

function sanitiseVarName(variable) {
  return variable.slice(1, -1);
}
function toArray(string) {
  return string.split(",");
}

/**
 * Split a template into a regex and string names.
 * (The ES named regex proposal eventually negates the need for this)
 * @param       {String} template A template string e.g. 'my_{template}_string'
 * @return      {Object}          An array of variable names, and a regex to replace 'em
 */
function getReadRegex(template) {
  const variableNames = [];
  let regex = template;

  // Replace our strings and arrays
  [[templateString, String], [templateArray, toArray]].forEach(
    ([templateString, parse]) => {
      regex = regex.replace(templateString, (name, offset) => {
        variableNames.push({ name: sanitiseVarName(name), parse, offset });
        return "(.*)";
      });
    }
  );

  variableNames.sort((a,b) => a.offset - b.offset);
  return { variableNames, regex };
}

/**
 * Encode a template with the given variables.
 * NOTE: values must not include curly braces or commas.
 * @param  {String} template Template string
 * @param  {String} values   Object of values to insert in the string
 * @return {String}          The templatee with the values encoded
 */
export function encodeTemplate(template, values) {
  return (
    template
      // replace our strings
      .replace(templateString, name => values[sanitiseVarName(name)])
      // encode and replace our arrays
      .replace(templateArray, name => {
        const value = values[sanitiseVarName(name)];
        return Array.isArray(value) ? value.join() : value;
      })
  );
}

/**
 * Decode a template string given the given template.
 * @param  {String} template A tmplate string with curly braces for vars.
 * @param  {String} string   A string to be decoded with the given template.
 * @return {Object}          An object given the matched template values.
 */
export function decodeTemplate(template, string) {
  const { variableNames, regex } = getReadRegex(template);
  const match = String(string).match(regex);
  if (!match) return null;
  const values = {};

  // for each match, parse it using the given type.
  match.slice(1).forEach((value, index) => {
    const { name, parse } = variableNames[index];
    values[name] = parse(value);
  });
  return values;
}
