export class ITableMainColumns {
  constructor(target = {}) {
    this.birth = target.birth_year || null;
    this.gender = target.gender || null;
    this.name = target.name || null;
    this.detail = target.homeworld || null;
    this.height = target.height || null;
    this.content = null;
  }
}

export class ITableLinks {
  constructor(target = {}) {
    this.prev = target.previous || null;
    this.next = target.next || null;
  }
}

export class ITableDetails {
  constructor(target = {}) {
    this.name = target.name || null;
    this.population = target.population || null;
    this.terrain = target.terrain || null;
    this.climate = target.climate || null;
    this.diameter = target.diameter || null;
  }
}
