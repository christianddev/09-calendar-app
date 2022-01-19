export const processErrorMessage = (errors) => {
  return Object.values(errors).map((v) => `<p>${v?.msg}</p>`).join()
}