//      
import { prefixUrl } from './prefix-url';

let delayed         ;
let routeToHandler                   ;

function routeTo(url        ) {
  if (delayed) {
    return;
  }
  if (!routeToHandler) {
    delayed = url;
    return;
  }
  routeToHandler(url);
}

function routeToPrefixed(url        ) {
  routeTo(prefixUrl(url));
}

// Used by the Router to provide the function that actually does the routing.
// This slight awkwardness is just to enable the user to
// `require('@mapbox/batfish/modules/route-to')`.
routeTo._setRouteToHandler = (handler                  ) => {
  routeToHandler = handler;
  if (delayed) {
    routeToHandler(delayed);
    delayed = null;
  }
};

// For tests.
routeTo._clearRouteToHandler = () => {
  routeToHandler = null;
};

export { routeTo, routeToPrefixed };
