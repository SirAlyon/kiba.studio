import { _ as __nuxt_component_0 } from './logo-light-15a43a0f.mjs';
import { unref, useSSRContext } from 'vue';
import { u as useHead } from './index-88e9f29c.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$a, a as _sfc_main$9, A as AboutUs, S as Services, b as _sfc_main$6, c as _sfc_main$4, T as Team, d as _sfc_main$3, L as LatestNews, C as ContactArcho, F as FooterArch } from './FooterArch-4038b7aa.mjs';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import './nuxt-link-afaf4e47.mjs';
import '../server.mjs';
import 'vue-router';
import 'swiper/vue';
import 'swiper';
import './1-62a40b4e.mjs';
import './2-fa1f2f7e.mjs';

const _sfc_main = {
  __name: "home8-light",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Architecture Light`,
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Khand:wght@300;400;500;600;700&display=swap"
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoading = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoading, null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$9), null, null, _parent));
      _push(ssrRenderComponent(unref(AboutUs), null, null, _parent));
      _push(ssrRenderComponent(unref(Services), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), null, null, _parent));
      _push(ssrRenderComponent(unref(Team), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
      _push(ssrRenderComponent(unref(LatestNews), null, null, _parent));
      _push(ssrRenderComponent(unref(ContactArcho), null, null, _parent));
      _push(ssrRenderComponent(unref(FooterArch), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/homepage/home8-light.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=home8-light-30fe9e7f.mjs.map
