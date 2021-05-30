import React from 'react';

class UrlEntry {
  constructor(url) {
    this.listeners = new Set();
    this.url = url; // dsx?
    this.ready = false;
    this.data = undefined;
    this.promise = undefined;
  }
  async fetch() {
    this.promise = fetch(this.url, { method: 'GET' });
    const result = await this.promise;
    const json = await result.json();
    this.data = json;
    this.ready = true;
    this.announce();
  }
  announce() {
    this.listeners.forEach((fn) => fn(this.data));
  }
  subscribe(fn) {
    this.listeners.add(fn);
  }
  unsubscribe(fn) {
    this.listeners.delete(fn);
  }
};

class Store {
  constructor() {
    this.urls = new Map();
  }
  ensure(url) {
    if (!this.urls.has(url)) {
      const newEntry = new UrlEntry(url);
      newEntry.fetch();
      this.urls.set(url, newEntry);
    }
  }
  subscribe(url, fn) {
    this.ensure(url);
    const entry = this.urls.get(url);
    entry.subscribe(fn);
  }
  unsubscribe(url, fn) {
    const entry = this.urls.get(url);
    entry?.unsubscribe(fn);
  }
  isReady(url) {
    const entry = this.urls.get(url);
    return entry?.ready || false;    
  }
  async getPromise(url) {
    this.ensure(url);
    const entry = this.urls.get(url);
    if (!entry) {
      throw 'ah no dsx';
    }
    if (!entry.promise) {
      entry.fetch();
    }
    if (!entry.promise) {
      throw 'it should be here now dsx';
    }


    return entry.promise;
  }
  getSync(url) {
    const entry = this.urls.get(url);
    return entry?.data || undefined;
  }
  refetch(url) {
    this.ensure(url);
    const entry = this.urls.get(url);
    entry.fetch();
  }
};

const store = new Store();

const useUrl = (url) => {
  const [state, setState] = React.useState(store.getSync(url));
  React.useEffect(() => {
    store.subscribe(url, setState);
    return () => {
      store.unsubscribe(url, setState);
    }
  });

  if (!store.isReady(url)) {
    throw store.getPromise(url);
  }

  return state;
}

export const useCollection = (url) => {
  const value = useUrl(url);

  const post = React.useCallback(async (obj) => {
    await fetch(url, { method: 'POST', body: JSON.stringify(obj) });
    store.refetch(url);
  }, [url]);

  return [value, { post }];
}

export const useRecord = (url) => {
  const value = useUrl(url);

  return value;
}

