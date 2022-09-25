export class ITableMainColumns {
  constructor(target = {}) {
    this.birth = target.birth_year || null;
    this.gender = target.gender || null;
    this.name = target.name || null;
    this.detail = target.url || null;
    this.height = target.height || null;
  }
}

export class ITableLinks {
  constructor(target = {}) {
    this.prev = target.previous || null;
    this.next = target.next || null;
  }
}
