export class IEmbeddTarget {
  constructor(payload = {}) {
    return payload.data?._embedded;
  }
}

export class IContentTarget {
  constructor(payload = {}) {
    return payload.data?.content;
  }
}

export class IDataTarget {
  constructor(payload = {}) {
    return payload.data;
  }
}
