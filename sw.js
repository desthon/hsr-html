import{NetworkFirst as k,CacheFirst as I}from"workbox-strategies";try{self["workbox:core:6.6.0"]&&_()}catch{}const O=(a,...e)=>{let t=a;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},W=O;class h extends Error{constructor(e,t){const s=W(e,t);super(s),this.name=e,this.details=t}}const M=new Set,f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},L=a=>[f.prefix,a,f.suffix].filter(e=>e&&e.length>0).join("-"),S=a=>{for(const e of Object.keys(f))a(e)},R={updateDetails:a=>{S(e=>{typeof a[e]=="string"&&(f[e]=a[e])})},getGoogleAnalyticsName:a=>a||L(f.googleAnalytics),getPrecacheName:a=>a||L(f.precache),getPrefix:()=>f.prefix,getRuntimeName:a=>a||L(f.runtime),getSuffix:()=>f.suffix};function N(a,e){const t=new URL(a);for(const s of e)t.searchParams.delete(s);return t.href}async function D(a,e,t,s){const n=N(e.url,t);if(e.url===n)return a.match(e,s);const c=Object.assign(Object.assign({},s),{ignoreSearch:!0}),r=await a.keys(e,c);for(const i of r){const o=N(i.url,t);if(n===o)return a.match(i,s)}}let y;function j(){if(y===void 0){const a=new Response("");if("body"in a)try{new Response(a.body),y=!0}catch{y=!1}y=!1}return y}class A{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function q(){for(const a of M)await a()}const F=a=>new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),"");function H(a){return new Promise(e=>setTimeout(e,a))}function x(a,e){const t=e();return a.waitUntil(t),t}async function $(a,e){let t=null;if(a.url&&(t=new URL(a.url).origin),t!==self.location.origin)throw new h("cross-origin-copy-response",{origin:t});const s=a.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},c=e?e(n):n,r=j()?s.body:await s.blob();return new Response(r,c)}function B(){self.addEventListener("activate",()=>self.clients.claim())}function V(a){R.updateDetails(a)}function G(){self.skipWaiting()}try{self["workbox:precaching:6.6.0"]&&_()}catch{}const Q="__WB_REVISION__";function z(a){if(!a)throw new h("add-to-cache-list-unexpected-type",{entry:a});if(typeof a=="string"){const c=new URL(a,location.href);return{cacheKey:c.href,url:c.href}}const{revision:e,url:t}=a;if(!t)throw new h("add-to-cache-list-unexpected-type",{entry:a});if(!e){const c=new URL(t,location.href);return{cacheKey:c.href,url:c.href}}const s=new URL(t,location.href),n=new URL(t,location.href);return s.searchParams.set(Q,e),{cacheKey:s.href,url:n.href}}class J{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const n=t.originalRequest.url;s?this.notUpdatedURLs.push(n):this.updatedURLs.push(n)}return s}}}class X{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:s})=>{const n=s?.cacheKey||this._precacheController.getCacheKeyForURL(t.url);return n?new Request(n,{headers:t.headers}):t},this._precacheController=e}}try{self["workbox:strategies:6.6.0"]&&_()}catch{}function b(a){return typeof a=="string"?new Request(a):a}class Y{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new A,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=b(e);if(s.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const r=await t.preloadResponse;if(r)return r}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const r of this.iterateCallbacks("requestWillFetch"))s=await r({request:s.clone(),event:t})}catch(r){if(r instanceof Error)throw new h("plugin-error-request-will-fetch",{thrownErrorMessage:r.message})}const c=s.clone();try{let r;r=await fetch(s,s.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const i of this.iterateCallbacks("fetchDidSucceed"))r=await i({event:t,request:c,response:r});return r}catch(r){throw n&&await this.runCallbacks("fetchDidFail",{error:r,event:t,originalRequest:n.clone(),request:c.clone()}),r}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=b(e);let s;const{cacheName:n,matchOptions:c}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},c),{cacheName:n});s=await caches.match(r,i);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await o({cacheName:n,matchOptions:c,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,t){const s=b(e);await H(0);const n=await this.getCacheKey(s,"write");if(!t)throw new h("cache-put-with-no-response",{url:F(n.url)});const c=await this._ensureResponseSafeToCache(t);if(!c)return!1;const{cacheName:r,matchOptions:i}=this._strategy,o=await self.caches.open(r),l=this.hasCallback("cacheDidUpdate"),g=l?await D(o,n.clone(),["__WB_REVISION__"],i):null;try{await o.put(n,l?c.clone():c)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await q(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:r,oldResponse:g,newResponse:c.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const c of this.iterateCallbacks("cacheKeyWillBeUsed"))n=b(await c({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const s=this._pluginStateMap.get(t);yield c=>{const r=Object.assign(Object.assign({},c),{state:s});return t[e](r)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&t.status!==200&&(t=void 0),t}}class Z{constructor(e={}){this.cacheName=R.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s=typeof e.request=="string"?new Request(e.request):e.request,n="params"in e?e.params:void 0,c=new Y(this,{event:t,request:s,params:n}),r=this._getResponse(c,s,t),i=this._awaitComplete(r,c,s,t);return[r,i]}async _getResponse(e,t,s){await e.runCallbacks("handlerWillStart",{event:s,request:t});let n;try{if(n=await this._handle(t,e),!n||n.type==="error")throw new h("no-response",{url:t.url})}catch(c){if(c instanceof Error){for(const r of e.iterateCallbacks("handlerDidError"))if(n=await r({error:c,event:s,request:t}),n)break}if(!n)throw c}for(const c of e.iterateCallbacks("handlerWillRespond"))n=await c({event:s,request:t,response:n});return n}async _awaitComplete(e,t,s,n){let c,r;try{c=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:c}),await t.doneWaiting()}catch(i){i instanceof Error&&(r=i)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:c,error:r}),t.destroy(),r)throw r}}class d extends Z{constructor(e={}){e.cacheName=R.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const n=t.params||{};if(this._fallbackToNetwork){const c=n.integrity,r=e.integrity,i=!r||r===c;s=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?r||c:void 0})),c&&i&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new h("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new h("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==d.copyRedirectedCacheableResponsesPlugin&&(n===d.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);t===0?this.plugins.push(d.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}d.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:a}){return!a||a.status>=400?null:a}};d.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:a}){return a.redirected?await $(a):a}};class ee{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new d({cacheName:R.getPrecacheName(e),plugins:[...t,new X({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){typeof s=="string"?t.push(s):s&&s.revision===void 0&&t.push(s.url);const{cacheKey:n,url:c}=z(s),r=typeof s!="string"&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(c)&&this._urlsToCacheKeys.get(c)!==n)throw new h("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(c),secondEntry:n});if(typeof s!="string"&&s.integrity){if(this._cacheKeysToIntegrities.has(n)&&this._cacheKeysToIntegrities.get(n)!==s.integrity)throw new h("add-to-cache-list-conflicting-integrities",{url:c});this._cacheKeysToIntegrities.set(n,s.integrity)}if(this._urlsToCacheKeys.set(c,n),this._urlsToCacheModes.set(c,r),t.length>0){const i=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(i)}}}install(e){return x(e,async()=>{const t=new J;this.strategy.plugins.push(t);for(const[c,r]of this._urlsToCacheKeys){const i=this._cacheKeysToIntegrities.get(r),o=this._urlsToCacheModes.get(c),l=new Request(c,{integrity:i,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:l,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}})}activate(e){return x(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),s=await t.keys(),n=new Set(this._urlsToCacheKeys.values()),c=[];for(const r of s)n.has(r.url)||(await t.delete(r),c.push(r.url));return{deletedURLs:c}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new h("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let P;const T=()=>(P||(P=new ee),P);try{self["workbox:routing:6.6.0"]&&_()}catch{}const v="GET",U=a=>a&&typeof a=="object"?a:{handle:a};class m{constructor(e,t,s=v){this.handler=U(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=U(e)}}class te extends m{constructor(e,t,s){const n=({url:c})=>{const r=e.exec(c.href);if(r&&!(c.origin!==location.origin&&r.index!==0))return r.slice(1)};super(n,t,s)}}class se{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(n=>{typeof n=="string"&&(n=[n]);const c=new Request(...n);return this.handleRequest({request:c,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:c,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=r&&r.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return;let l;try{l=i.handle({url:s,request:e,event:t,params:c})}catch(u){l=Promise.reject(u)}const g=r&&r.catchHandler;return l instanceof Promise&&(this._catchHandler||g)&&(l=l.catch(async u=>{if(g)try{return await g.handle({url:s,request:e,event:t,params:c})}catch(K){K instanceof Error&&(u=K)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw u})),l}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const c=this._routes.get(s.method)||[];for(const r of c){let i;const o=r.match({url:e,sameOrigin:t,request:s,event:n});if(o)return i=o,(Array.isArray(i)&&i.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(e,t=v){this._defaultHandlerMap.set(t,U(e))}setCatchHandler(e){this._catchHandler=U(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new h("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new h("unregister-route-route-not-registered")}}let w;const ae=()=>(w||(w=new se,w.addFetchListener(),w.addCacheListener()),w);function p(a,e,t){let s;if(typeof a=="string"){const c=new URL(a,location.href),r=({url:i})=>i.href===c.href;s=new m(r,e,t)}else if(a instanceof RegExp)s=new te(a,e,t);else if(typeof a=="function")s=new m(a,e,t);else if(a instanceof m)s=a;else throw new h("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return ae().registerRoute(s),s}function ne(a,e=[]){for(const t of[...a.searchParams.keys()])e.some(s=>s.test(t))&&a.searchParams.delete(t);return a}function*ce(a,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={}){const c=new URL(a,location.href);c.hash="",yield c.href;const r=ne(c,e);if(yield r.href,t&&r.pathname.endsWith("/")){const i=new URL(r.href);i.pathname+=t,yield i.href}if(s){const i=new URL(r.href);i.pathname+=".html",yield i.href}if(n){const i=n({url:c});for(const o of i)yield o.href}}class re extends m{constructor(e,t){const s=({request:n})=>{const c=e.getURLsToCacheKeys();for(const r of ce(n.url,t)){const i=c.get(r);if(i){const o=e.getIntegrityForCacheKey(i);return{cacheKey:i,integrity:o}}}};super(s,e.strategy)}}function ie(a){const e=T(),t=new re(e,a);p(t)}const oe="-precache-",he=async(a,e=oe)=>{const s=(await self.caches.keys()).filter(n=>n.includes(e)&&n.includes(self.registration.scope)&&n!==a);return await Promise.all(s.map(n=>self.caches.delete(n))),s};function le(){self.addEventListener("activate",a=>{const e=R.getPrecacheName();a.waitUntil(he(e).then(t=>{}))})}function ue(a){T().precache(a)}function fe(a,e){ue(a),ie(e)}try{self["workbox:cacheable-response:6.6.0"]&&_()}catch{}class de{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(s=>e.headers.get(s)===this._headers[s])),t}}class pe{constructor(e){this.cacheWillUpdate=async({response:t})=>this._cacheableResponse.isResponseCacheable(t)?t:null,this._cacheableResponse=new de(e)}}const C="v1";B();G();le();V({prefix:"WarpSim",precache:"Core",suffix:C});let E=[{"revision":"ba926ba0e90d4147a9c069b1614c47d3","url":"icons.css"},{"revision":null,"url":"internal/immutable/assets/0.3e167df9.css"},{"revision":null,"url":"internal/immutable/assets/2.a298dc3d.css"},{"revision":null,"url":"internal/immutable/assets/3.434c7282.css"},{"revision":null,"url":"internal/immutable/assets/4.812295c8.css"},{"revision":null,"url":"internal/immutable/assets/6.38811b6b.css"},{"revision":null,"url":"internal/immutable/assets/ButtonIcon.30d2e585.css"},{"revision":null,"url":"internal/immutable/assets/Header.36882038.css"},{"revision":null,"url":"internal/immutable/assets/index.1b41039c.css"},{"revision":null,"url":"internal/immutable/assets/index.3f7f7a05.css"},{"revision":null,"url":"internal/immutable/assets/index.3fa28f34.css"},{"revision":null,"url":"internal/immutable/assets/index.55362e55.css"},{"revision":null,"url":"internal/immutable/assets/index.a915f925.css"},{"revision":null,"url":"internal/immutable/assets/index.d4263939.css"},{"revision":null,"url":"internal/immutable/assets/ModalConvert.e2ac132c.css"},{"revision":null,"url":"internal/immutable/assets/ObtainedItem.3971c7d5.css"},{"revision":null,"url":"internal/immutable/assets/Toast.3b980dba.css"},{"revision":null,"url":"internal/immutable/assets/WarpResult.824b5bea.css"},{"revision":null,"url":"internal/immutable/chunks/1.0.12c1fcdb.js"},{"revision":null,"url":"internal/immutable/chunks/1.1.d76eee84.js"},{"revision":null,"url":"internal/immutable/chunks/1.2.4ca36a49.js"},{"revision":null,"url":"internal/immutable/chunks/1.3.d8a4e051.js"},{"revision":null,"url":"internal/immutable/chunks/1.4.6a57c821.js"},{"revision":null,"url":"internal/immutable/chunks/1.5.ed5bf7fd.js"},{"revision":null,"url":"internal/immutable/chunks/1.6.33589d37.js"},{"revision":null,"url":"internal/immutable/chunks/1000000.0.d0f7631a.js"},{"revision":null,"url":"internal/immutable/chunks/2.0.befdcc95.js"},{"revision":null,"url":"internal/immutable/chunks/2.1.88575270.js"},{"revision":null,"url":"internal/immutable/chunks/2.7ae1556a.js"},{"revision":null,"url":"internal/immutable/chunks/api-indexeddb.9daa6b03.js"},{"revision":null,"url":"internal/immutable/chunks/api-localstorage.1037570d.js"},{"revision":null,"url":"internal/immutable/chunks/ButtonIcon.de0b31e0.js"},{"revision":null,"url":"internal/immutable/chunks/en-US.1b473d78.js"},{"revision":null,"url":"internal/immutable/chunks/en-US.8fc1a40f.js"},{"revision":null,"url":"internal/immutable/chunks/Header.0786e3c0.js"},{"revision":null,"url":"internal/immutable/chunks/id-ID.6ba2d165.js"},{"revision":null,"url":"internal/immutable/chunks/index.118a4037.js"},{"revision":null,"url":"internal/immutable/chunks/index.1aa50b20.js"},{"revision":null,"url":"internal/immutable/chunks/index.20b8206d.js"},{"revision":null,"url":"internal/immutable/chunks/index.4b7c07aa.js"},{"revision":null,"url":"internal/immutable/chunks/index.5ba60b09.js"},{"revision":null,"url":"internal/immutable/chunks/index.5bb76ec7.js"},{"revision":null,"url":"internal/immutable/chunks/index.ed65f74a.js"},{"revision":null,"url":"internal/immutable/chunks/index.f3cdcb59.js"},{"revision":null,"url":"internal/immutable/chunks/ja-JP.0aa87c30.js"},{"revision":null,"url":"internal/immutable/chunks/ja-JP.3aa2d0c3.js"},{"revision":null,"url":"internal/immutable/chunks/light-cones.717b3371.js"},{"revision":null,"url":"internal/immutable/chunks/ModalConvert.72cae927.js"},{"revision":null,"url":"internal/immutable/chunks/navigation.d94ce14b.js"},{"revision":null,"url":"internal/immutable/chunks/ObtainedItem.7e5dde6a.js"},{"revision":null,"url":"internal/immutable/chunks/preload-helper.a4192956.js"},{"revision":null,"url":"internal/immutable/chunks/singletons.5fa13339.js"},{"revision":null,"url":"internal/immutable/chunks/site-setup.5d35e9ce.js"},{"revision":null,"url":"internal/immutable/chunks/stores.63a04d0e.js"},{"revision":null,"url":"internal/immutable/chunks/Toast.60a9508a.js"},{"revision":null,"url":"internal/immutable/chunks/WarpResult.3483ab70.js"},{"revision":null,"url":"internal/immutable/chunks/workbox-window.prod.es5.42ea5fe7.js"},{"revision":null,"url":"internal/immutable/chunks/zh-CN.35f14539.js"},{"revision":null,"url":"internal/immutable/chunks/zh-CN.a0bf21df.js"},{"revision":null,"url":"internal/immutable/chunks/zh-TW.5aba5f4a.js"},{"revision":null,"url":"internal/immutable/chunks/zh-TW.a40bfd3d.js"},{"revision":null,"url":"internal/immutable/entry/app.39969496.js"},{"revision":null,"url":"internal/immutable/entry/start.35f48985.js"},{"revision":null,"url":"internal/immutable/nodes/0.0fb210de.js"},{"revision":null,"url":"internal/immutable/nodes/1.bb0f0ece.js"},{"revision":null,"url":"internal/immutable/nodes/2.0d66fc08.js"},{"revision":null,"url":"internal/immutable/nodes/3.dde48575.js"},{"revision":null,"url":"internal/immutable/nodes/4.abaf1c4d.js"},{"revision":null,"url":"internal/immutable/nodes/5.72d222f5.js"},{"revision":null,"url":"internal/immutable/nodes/6.4af63a83.js"},{"revision":null,"url":"internal/immutable/nodes/7.63e4373e.js"},{"revision":null,"url":"internal/immutable/nodes/8.72d222f5.js"},{"revision":"1535e0cbf4d85419d59d78bbf1df306d","url":"./icons/icon-32x32.png"},{"revision":"8c07aa86c34c009816422f0b6f65a6e5","url":"./icons/icon-72x72.png"},{"revision":"64b00f24d7388233c072487c7078188d","url":"./icons/icon-96x96.png"},{"revision":"669f7c22d78111d359a21a0105d388ba","url":"./icons/icon-128x128.png"},{"revision":"92a2d68b11b921ea077d734611121d4f","url":"./icons/icon-144x144.png"},{"revision":"659aca266a41f952156c36883222070d","url":"./icons/icon-152x152.png"},{"revision":"0b9d11f4b81c63486b655fd1dfe6ac98","url":"./icons/icon-192x192.png"},{"revision":"2094d71d5a97f8cf3b381b09bffa101a","url":"./icons/icon-256x256.png"},{"revision":"c5d6273e4a026b3c0027cb030d35076c","url":"./icons/icon-384x384.png"},{"revision":"03c9a2f99daf319aa22bf5a1b3306439","url":"./icons/icon-512x512.png"},{"revision":"f612c3f7ce5a9294465705d997c19513","url":"appmanifest.json"}];E=[];fe(E,{ignoreURLParametersMatching:[/.*/]});p("/",new k({cacheName:`Static-${C}`}));p(new RegExp(".(?:/?pwa=true|/?pwasc)"),new k({cacheName:`Static-${C}`,plugins:[{cachedResponseWillBeUsed:({cachedResponse:a})=>a||caches.match("/"),cacheWillUpdate:()=>null}]}));p(({url:a,request:e})=>{const t=a.href.includes("audiofx"),s=a.href.includes("/videos"),n=a.pathname.startsWith("/internal/immutable/assets"),c=a.pathname.startsWith("/icons"),i=(a.href.match(new RegExp(".(?:svg|webp|jpg|png|jpeg)"))||[]).length>0,o=(e.destination==="image"||i)&&(n||c);return t||o||s},new I({cacheName:`Static-${C}`}));p(({url:a})=>(a.href.match(new RegExp(".(?:woff|woff2|ttf)$"))||[]).length>0,new k({cacheName:`Static-${C}`,plugins:[new pe({statuses:[0,200]})]}));p(new RegExp(".(?:css|js|json)$"),new k({cacheName:"Chunks"}));
