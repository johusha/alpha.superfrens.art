export default class entityFactory {
  constructor(builder) {
    this.builder = builder
  }

  setName(name) {
    this.name = name
    return this
  }

  build() {
    return new this.builder(this)
  }
}