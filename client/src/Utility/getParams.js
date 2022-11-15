export default function (params) {
  if (params) {
    const paramsString = params.split('?')[1]
    if (paramsString.length > 0) {
      const query = paramsString.split('&')
      const queryObj = {}
      query.forEach(queryString => {
        const keyValue = queryString.split('=')
        queryObj[keyValue[0]] = keyValue[1]
      })
      return queryObj
    }
    return {}
  }
}
