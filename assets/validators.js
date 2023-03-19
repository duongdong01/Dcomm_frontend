export function isValidEmail (email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function isValidUserName (name) {
  // eslint-disable-next-line no-useless-escape
  const re = /^[a-zA-Z][a-zA-Z\s]*$/
  return re.test(name)
}

function removeAscent (str) {
  if (str === null || str === undefined) { return str }
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  return str
}

export function isValidNameVN (string) {
  // eslint-disable-next-line no-useless-escape
  const re = /^[a-zA-Z\s!@#\$%\^\&*\)\(+=._-]{2,}$/g // regex here
  return re.test(removeAscent(string))
}

export function isValidName (name) {
  // eslint-disable-next-line no-useless-escape
  const re = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
  return re.test(name)
}
export function isValidPassword (pass) {
  // eslint-disable-next-line no-useless-escape
  // const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  return re.test(pass)
}

export function isValidCost (price) {
  // eslint-disable-next-line no-useless-escape
  const re = /^\d+(\.\d{2})?$/
  return re.test(price)
}
export function isValidPhone (phone) {
  // eslint-disable-next-line no-useless-escape
  const re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

  return re.test(phone)
}

// map object thanh key=value

export function valiQuery (query) {
  return Object.entries(query)
    .map(([key, value]) =>
          `${key}=${value}`
    )
    .join('&')
}
