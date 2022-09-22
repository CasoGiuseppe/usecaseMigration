export class IEmbeddTarget {
  constructor(payload = {}) {
    return payload.results;
  }
}

export class IContentTarget {
  constructor(payload = {}) {
    return new IDataTarget(payload)?.content;
  }
}

export class ILinkTarget {
  constructor(payload = {}) {
    return new IDataTarget(payload)?._links;
  }
}

export class IDataTarget {
  constructor(payload = {}) {
    return payload.data;
  }
}
