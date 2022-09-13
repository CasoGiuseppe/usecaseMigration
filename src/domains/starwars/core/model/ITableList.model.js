import $date from '@/utils/date';
export class ITableMainColumns {
  constructor(target = {}) {
    this.numberOrder = target.nuOrdAct || null;
    this.descriptionAct = target.deAct || null;
    this.typeAct = target.tiDocu || null;
    this.dateAct = $date.backToFront(target.feAct) || null;
    this.codeModel = target.coModelo || null;
    this.state = target.estado || null;
    this.documentPath = target.direccionDoc || null;
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
