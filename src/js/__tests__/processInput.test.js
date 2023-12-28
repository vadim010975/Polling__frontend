import processInput from "../processInput";

test.each([
  ["51.50851, -0.12572", { latitude: "51.50851", longitude: "-0.12572" }],
  ["51.50851,-0.12572", { latitude: "51.50851", longitude: "-0.12572" }],
  ["[51.50851, -0.12572]", { latitude: "51.50851", longitude: "-0.12572" }],
])("testing function processInput with %s argument", (inputed, expected) => {
  const result = processInput(inputed);
  expect(result).toEqual(expected);
});

test.each([
  ["(51.50851, -0.12572)", "Данные введены не корректно"],
  ["51.50851, -0.12572", undefined],
])("testing the function for correctness of input", (inputed, expected) => {
  const result = processInput(inputed);
  expect(result.error).toBe(expected);
});
