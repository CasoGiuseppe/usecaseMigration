export class ITableMainColumns {
  constructor(target = {}) {
    this.birth = target.birth_year || null;
    this.gender = target.gender || null;
    this.name = target.name || null;
    this.detail = target.url || null;
  }
}

export class ITableEditColumns {
  constructor(target = {}) {
    this.codeModel = target.coModelo || null;
    this.descriptionModel = target.deModelo || null;
    this.documentPath = target.direccionDoc || null;
    this.idModel = target.idModelo || null;
    this.documentType = target.tiDocu || null;
    this.dataExtensible = null;
    this.expand = false;
  }
}
