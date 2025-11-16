import { _ as __nuxt_component_0 } from "./logo-light-15a43a0f.js";
import { unref, useSSRContext } from "vue";
import { u as useHead } from "./index-88e9f29c.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./NavbarFullMenu-c5f0dd04.js";
import { _ as _sfc_main$2 } from "./FullscreenCircleSide-03fbb9d1.js";
import "unhead";
import "@unhead/shared";
import "./nuxt-link-afaf4e47.js";
import "ufo";
import "hookable";
import "../server.mjs";
import "ofetch";
import "#internal/nitro";
import "unctx";
import "vue-router";
import "h3";
import "devalue";
import "destr";
import "defu";
import "swiper/vue";
import "swiper";
import "./fullScreen-9d269b59.js";
const _sfc_main = {
  __name: "showcase2-light",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Showcase 2 Light`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoading = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoading, null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { theme: "light" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/showcase2/showcase2-light.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=showcase2-light-c6d017e2.js.map
