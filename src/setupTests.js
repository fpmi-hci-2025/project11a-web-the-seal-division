import '@testing-library/jest-dom';
import { vi } from 'vitest'

global.URL = vi.fn(() => ({
  href: '',
  origin: '',
  protocol: '',
  host: '',
  hostname: '',
  port: '',
  pathname: '',
  search: '',
  searchParams: new Map(),
  hash: '',
  toString: () => ''
}))

global.URLSearchParams = class {
  constructor() {
    this.params = new Map()
  }

  append(key, value) {
    this.params.set(key, value)
  }

  get(key) {
    return this.params.get(key)
  }

  getAll(key) {
    return Array.from(this.params.values()).filter(v => v.key === key)
  }

  has(key) {
    return this.params.has(key)
  }

  set(key, value) {
    this.params.set(key, value)
  }

  delete(key) {
    this.params.delete(key)
  }

  entries() {
    return this.params.entries()
  }

  keys() {
    return this.params.keys()
  }

  values() {
    return this.params.values()
  }

  forEach(callback) {
    this.params.forEach((value, key) => callback(value, key))
  }

  toString() {
    return Array.from(this.params.entries())
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  }
}

global.TextEncoder = class {
  encode(str) {
    return new Uint8Array(Buffer.from(str))
  }
}

global.TextDecoder = class {
  decode(buffer) {
    return Buffer.from(buffer).toString()
  }
}