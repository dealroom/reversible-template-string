/**
 * A regex to match {template} strings.
 */
const templateString = /\{.+?\}/g;

function sanitiseVarName(variable) {
  return variable.slice(1, -1);
}

/**
 * Split a template into a regex and string names.
 * (The ES named regex proposal eventually negates the need for this)
 * @param       {String} template A template string e.g. 'my_{template}_string'
 * @return      {Object}          An array of variable names, and a regex to replace 'em
 */
function getReadRegex(template) {
  const variableNames = [];
  const regex = template.replace(templateString, name => {
    variableNames.push(sanitiseVarName(name));
    return '(.*)';
  });
  return { variableNames, regex };
}

/**
 * Encode a template with the given variables.
 * @param  {String} template Template string
 * @param  {String} values   Object of values to insert in the string
 * @return {String}          The templatee with the values encoded
 */
export function encodeTemplate(template, values) {
  return template.replace(templateString, name => {
    const value = values[sanitiseVarName(name)];
    return value;
  });
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
  if (!match) return {};
  const values = {};
  match.slice(1).forEach((value, index) => {
    values[variableNames[index]] = value;
  });
  return values;
}
