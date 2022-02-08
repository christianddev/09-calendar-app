export const processErrorMessage = (errors) =>
  Object.values(errors)
    .map((v) => `<p>${v?.msg}</p>`)
    .join('');
