import { _ as __nuxt_component_0 } from "./logo-light-15a43a0f.js";
import { unref, useSSRContext } from "vue";
import { u as useHead } from "./index-88e9f29c.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$8 } from "./Footer-aa56144b.js";
import { H as Header, _ as _sfc_main$3, a as _sfc_main$6 } from "./Team2-2149861f.js";
import { _ as _sfc_main$2 } from "./Services1-ed3eb59e.js";
import { _ as _sfc_main$4 } from "./index-1daf60bb.js";
import { _ as _sfc_main$5 } from "./FullTestimonials-3f88d149.js";
import { B as Blogs } from "./Blogs2-941e7734.js";
import { _ as _sfc_main$7 } from "./CallToAction-4c27f958.js";
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
import "./2-fa1f2f7e.js";
import "./ModalVideo-db24fbd8.js";
import "./client-only-29ef7f45.js";
import "./features-1bf70970.js";
import "./5-d22ab734.js";
import "./6-f22bbc20.js";
import "./1-62a40b4e.js";
import "swiper/vue";
import "swiper";
import "./3-dce5e48a.js";
const _sfc_main = {
  __name: "home2-dark",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Creative Agency Dark`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoading = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoading, null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent));
      _push(ssrRenderComponent(unref(Header), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), { oStyle: "4item" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        grid: 3,
        filterPosition: "center"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), { noPadding: "" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent));
      _push(ssrRenderComponent(unref(Blogs), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$7), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$8), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/homepage/home2-dark.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=home2-dark-8464c7bf.js.map
