import { _ as __nuxt_component_0 } from "./logo-light-15a43a0f.js";
import { unref, useSSRContext } from "vue";
import { u as useHead } from "./index-88e9f29c.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, F as Footer } from "./index-f241a2c0.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$6, d as _sfc_main$7, e as _sfc_main$8, f as _sfc_main$a, g as _sfc_main$b } from "./index-67880593.js";
import { _ as _sfc_main$5, a as _sfc_main$9 } from "./index-4b4e7282.js";
import { C as CallToAction } from "./index-80766df6.js";
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
import "swiper/vue";
import "swiper";
import "./ModalVideo-db24fbd8.js";
import "./client-only-29ef7f45.js";
const _sfc_main = {
  __name: "mobile-app-dark",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Mobile App Dark`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoading = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoading, null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { grLogo: "1" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$7), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$8), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$9), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent));
      _push(ssrRenderComponent(unref(CallToAction), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$b), null, null, _parent));
      _push(ssrRenderComponent(unref(Footer), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile-app/mobile-app-dark.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=mobile-app-dark-c35e1fc1.js.map
