/** @license React v16.6.0
 * react-cache.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';Object.defineProperty(exports,"__esModule",{value:!0});var l=require("react"),m=require("scheduler"),n=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;function p(c,e){var f=n.currentDispatcher;if(null===f)throw Error("react-cache: read and preload may only be called from within a component's render. They are not supported in event handlers or lifecycle methods.");return f.readContext(c,e)}function q(c){return c}
var r=function(c){function e(){!1===h&&k>g&&(h=!0,m.unstable_scheduleCallback(f))}function f(){h=!1;var d=g;if(null!==a)for(var b=a.previous;k>d&&null!==b;){var c=b.onDelete,e=b.previous;b.onDelete=null;b.previous=b.next=null;b===a?a=b=null:(a.previous=e,e.next=a,b=e);--k;c()}}var g=c,a=null,k=0,h=!1;return{add:function(d,b){d={value:d,onDelete:b,next:null,previous:null};null===a?d.previous=d.next=d:(b=a.previous,b.next=d,d.previous=b,a.previous=d,d.next=a);a=d;k+=1;return d},update:function(a,b){a.value=
b},access:function(d){var b=d.next;if(null!==b){var c=a;if(a!==d){var f=d.previous;f.next=b;b.previous=f;b=c.previous;b.next=d;d.previous=b;c.previous=d;d.next=c;a=d}}e();return d.value},setLimit:function(a){g=a;e()}}}(500),t=new Map,u=l.createContext(null);
function v(c,e,f,g){var a=t.get(c);void 0===a&&(a=new Map,t.set(c,a));var k=a.get(g);if(void 0===k){e=e(f);e.then(function(a){if(0===h.status){var b=h;b.status=1;b.value=a}},function(a){if(0===h.status){var b=h;b.status=2;b.value=a}});var h={status:0,value:e};c=r.add(h,w.bind(null,c,g));a.set(g,c);return h}return r.access(k)}function w(c,e){var f=t.get(c);void 0!==f&&(f.delete(e),0===f.size&&t.delete(c))}
exports.unstable_createResource=function(c,e){var f=void 0!==e?e:q,g={read:function(a){p(u);var e=f(a);a=v(g,c,a,e);switch(a.status){case 0:throw a.value;case 1:return a.value;case 2:throw a.value;}},preload:function(a){p(u);var e=f(a);v(g,c,a,e)}};return g};exports.unstable_setGlobalCacheLimit=function(c){r.setLimit(c)};
