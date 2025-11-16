import { _ as __nuxt_component_0 } from "./logo-light-15a43a0f.js";
import { unref, useSSRContext } from "vue";
import { u as useHead } from "./index-88e9f29c.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, F as Footer } from "./index-f241a2c0.js";
import { _ as _sfc_main$2 } from "./index-92c33e93.js";
import { _ as _sfc_main$3 } from "./index-a7a15999.js";
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
  __name: "portfolio-light",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Portfolio Light`
    });
    const headerData = {
      title: "Latest Works",
      page: "Portfolio"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoading = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoading, null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { theme: "light" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), { headerData }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), { theme: "light" }, null, _parent));
      _push(ssrRenderComponent(unref(Footer), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile-app/portfolio-light.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=portfolio-light-1c5fe955.js.map
