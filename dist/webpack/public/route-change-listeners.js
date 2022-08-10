//      
import { prefixUrl, isUrlPrefixed } from './prefix-url';

                 
                                 
  

                                                               

const ALL_PATHS = '*';
const startListeners           = {
  [ALL_PATHS]: []
};
const endListeners           = {
  [ALL_PATHS]: []
};

function normalizePathname(pathname        )         {
  if (pathname !== ALL_PATHS && !isUrlPrefixed(pathname)) {
    pathname = prefixUrl(pathname);
  }
  return pathname.replace(/\/$/, '');
}

function addListener(
  pathnameOrListener                   ,
  maybeListener           ,
  registry          ,
  remover         
)          {
  let listener;
  let pathname;
  if (typeof pathnameOrListener === 'function') {
    listener = pathnameOrListener;
    pathname = ALL_PATHS;
  } else {
    listener = maybeListener;
    pathname = pathnameOrListener;
  }
  pathname = normalizePathname(pathname);
  if (!registry[pathname]) {
    registry[pathname] = [];
  }
  registry[pathname].push(listener || noop);
  return () => remover(pathname, listener);
}

function removeListener(
  pathnameOrListener                    ,
  maybeListener           ,
  registry          
) {
  let listener;
  let pathname;
  if (typeof pathnameOrListener === 'function' || !pathnameOrListener) {
    listener = pathnameOrListener;
    pathname = ALL_PATHS;
  } else {
    listener = maybeListener;
    pathname = pathnameOrListener;
  }
  pathname = normalizePathname(pathname);
  if (!listener) {
    registry[pathname] = [];
    return;
  }
  const listeners = registry[pathname];
  for (let i = 0, l = listeners.length; i < l; i++) {
    if (listeners[i] === listener) {
      listeners.splice(i, 1);
      return;
    }
  }
}

export function invokeCallbacks(
  nextPathname        ,
  registery          
)             {
  nextPathname = normalizePathname(nextPathname);
  let promisesToKeep = [Promise.resolve()];
  if (registery[nextPathname]) {
    registery[nextPathname].forEach((callback) => {
      promisesToKeep.push(Promise.resolve(callback(nextPathname)));
    });
  }
  registery[ALL_PATHS].forEach((callback) => {
    promisesToKeep.push(Promise.resolve(callback(nextPathname)));
  });
  return Promise.all(promisesToKeep);
}

export function addRouteChangeStartListener(
  pathnameOrListener                   ,
  maybeListener           
)          {
  return addListener(
    pathnameOrListener,
    maybeListener,
    startListeners,
    removeRouteChangeStartListener
  );
}

export function removeRouteChangeStartListener(
  pathnameOrListener                    ,
  maybeListener           
) {
  removeListener(pathnameOrListener, maybeListener, startListeners);
}

export function addRouteChangeEndListener(
  pathnameOrListener                   ,
  maybeListener           
)          {
  return addListener(
    pathnameOrListener,
    maybeListener,
    endListeners,
    removeRouteChangeEndListener
  );
}

export function removeRouteChangeEndListener(
  pathnameOrListener                    ,
  maybeListener           
) {
  removeListener(pathnameOrListener, maybeListener, endListeners);
}

export function _invokeRouteChangeStartCallbacks(
  nextPathname        
)             {
  return invokeCallbacks(nextPathname, startListeners);
}

export function _invokeRouteChangeEndCallbacks(
  nextPathname        
)             {
  return invokeCallbacks(nextPathname, endListeners);
}

function noop() {}
