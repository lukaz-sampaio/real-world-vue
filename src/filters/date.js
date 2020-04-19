/**
 * Filtros do Vue servem mais pra formatar alguma
 * do que um filtro convencional (refinação de busca).
 */

export default value => {
  const date = new Date(value);

  return date.toLocaleString(["en-US"], {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
};
