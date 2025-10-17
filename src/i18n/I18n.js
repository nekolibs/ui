export class I18n {
  constructor(options = {}) {
    this.language = options.language || 'en'
    this.fallback = options.fallback || 'en'
    this.onChangeLanguage = options.onChangeLanguage
    this.resources = options.resources || {}
    this.loader = options.loader
  }

  addResources(lang, ns, data) {
    if (!this.resources[lang]) this.resources[lang] = {}
    this.resources[lang][ns] = { ...this.resources[lang][ns], ...data }
  }

  changeLanguage(lang) {
    this.language = lang
    this.onChangeLanguage?.(lang)
  }

  async tAsync(key, opts = {}) {
    const { ns = 'common' } = opts
    if (!this.resources[this.language]?.[ns] && this.loader) {
      await this._loadNamespace(this.language, ns)
    }
    return this.t(key, opts)
  }

  t(key, opts = {}) {
    let { ns = 'common', context, ...vars } = opts
    const count = vars?.count
    if (key.includes(':')) {
      const splittedKey = key.split(':')
      ns = splittedKey[0]
      key = splittedKey[1]
    }
    const langData = this.resources[this.language]?.[ns]
    let value = this._resolveKey(langData, key, count, context)
    if (context) console.log(context, value)

    if (!value) {
      const fallbackData = this.resources[this.fallback]?.[ns]
      value = this._resolveKey(fallbackData, key, count, context) || key
    }

    return this._interpolate(value, vars)
  }

  async _loadNamespace(lang, ns) {
    if (!this.loader) return
    const data = await this.loader(lang, ns)
    this.addResources(lang, ns, data)
  }

  _resolveKey(nsData, key, count, context) {
    if (!nsData) return null

    // Support for nested keys like "a.b.c"
    const parts = key.split('.')
    const basePath = parts.slice(0, -1)
    const baseKey = parts[parts.length - 1]
    const parent = basePath.reduce((acc, part) => (acc ? acc[part] : undefined), nsData) || nsData

    if (!parent) return null

    // Support for context (e.g., gender) - tries key_context
    if (context) {
      const contextKey = `${baseKey}_${context}`
      if (parent[contextKey] != null) {
        return parent[contextKey]
      }
    }

    // Support for pluralization - tries key_one for singular
    if (typeof count === 'number') {
      if (count === 0) {
        const singularKey = `${baseKey}_zero`
        if (parent[singularKey] != null) {
          return parent[singularKey]
        }
      }
      if (count === 1) {
        const singularKey = `${baseKey}_one`
        if (parent[singularKey] != null) {
          return parent[singularKey]
        }
      }
    }

    // Return the base key
    return parent[baseKey]
  }

  _interpolate(str, vars) {
    if (typeof str !== 'string') return str
    return str.replace(/\{\{(.*?)\}\}/g, (_, v) => vars[v.trim()] ?? '')
  }
}
