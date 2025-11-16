import { _ as __nuxt_component_0 } from "./logo-light-15a43a0f.js";
import { unref, useSSRContext } from "vue";
import { u as useHead } from "./index-88e9f29c.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, F as Footer } from "./index-f241a2c0.js";
import { _ as _sfc_main$2 } from "./index-92c33e93.js";
import { _ as _sfc_main$3, a as _sfc_main$5 } from "./index-4b4e7282.js";
import { _ as _sfc_main$4 } from "./index-4bc74053.js";
import { _ as _sfc_main$6 } from "./index-4a47db00.js";
import "unhead";
import "@unhead/shared";
import "../server.mjs";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "vue-router";
import "h3";
import "ufo";
import "devalue";
import "destr";
import "defu";
import "./nuxt-link-afaf4e47.js";
const _sfc_main = {
  __name: "services-dark",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Services Dark`
    });
    const headerData = {
      title: "Popular Services",
      page: "Services"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoading = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoading, null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), { headerData }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), { theme: "dark" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), { bgGray: "1" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent));
      _push(ssrRenderComponent(unref(Footer), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile-app/services-dark.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=services-dark-8c0010ef.js.map
