export function buildQuery(query?: object) {
  return query ? `?${Object.entries(query).filter(e => !!e[1]).map(e => `${e[0]}=${e[1]}`).join('&')}` : ''
}
