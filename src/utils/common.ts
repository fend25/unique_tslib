export const parseAndCheckTheNumberIsDWORD = (n: number | string) => {
  const num: number = (typeof n === 'string') ? parseInt(n, 10) : n

  if (isNaN(num)) throw new Error(`Passed number is NaN: ${n}`)
  if (num < 0) throw new Error(`Passed number is less than 0: ${n}`)
  if (num > 0xFFFFFFFF) throw new Error(`Passed number is more than 2**32: ${n}`)

  return num
}

export const DWORDHexString = {
  fromNumber: (n: number | string): string => {
    return parseAndCheckTheNumberIsDWORD(n).toString(16).padStart(8, '0')
  },
  toNumber: (s: string): number => {
    const num: number = parseInt(s, 16)

    if (isNaN(num)) throw new Error(`Passed string is not hexadecimal: ${s}`)

    return num
  }
}

export const UInt8ArrayToHexString = (array: Uint8Array): string => {
  return Array.from(array).map(el => el.toString(16).padStart(2, '0')).join('')
}

export const vec2str = (arr: Array<number | string>) => {
  return arr
    .map(x => String.fromCharCode(typeof x === 'number' ? x : parseInt(x)))
    .join('')
}

export const str2vec = (str: string) => {
  if (typeof str !== 'string') {
    return str
  }
  return Array.from(str).map(x => x.charCodeAt(0))
}

export const checkEnvironmentIsBrowser = (safe?: boolean) => {
  if (typeof window === 'undefined') {
    if (safe) {
      return false
    } else {
      throw new Error('cannot sign with extenion not in browser')
    }
  }
  return true
}