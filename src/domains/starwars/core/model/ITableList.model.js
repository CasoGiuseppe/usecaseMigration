export class ITableMainColumns {
  constructor(target = {}) {
    this.birth = target.birth_year || null;
    this.gender = target.gender || null;
    this.name = target.name || null;
    this.detail = target.url || null;
  }
}
