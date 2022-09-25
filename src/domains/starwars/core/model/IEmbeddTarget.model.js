export class IEmbeddTarget {
  constructor(payload = {}) {
    return payload.results;
  }
}

export class IDataTarget {
  constructor(payload = {}) {
    return payload;
  }
}
