import { _ as __nuxt_component_0 } from "./logo-light-15a43a0f.js";
import { ref, unref, useSSRContext } from "vue";
import { u as useHead } from "./index-88e9f29c.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$b } from "./Footer-aa56144b.js";
import { _ as _sfc_main$2 } from "./SliderHeader-16942ae7.js";
import { _ as _sfc_main$3, a as _sfc_main$7 } from "./Clients2-0686e0f7.js";
import { _ as _sfc_main$4 } from "./Services1-ed3eb59e.js";
import { _ as _sfc_main$5 } from "./index-1daf60bb.js";
import { _ as _sfc_main$6 } from "./clients-f216af70.js";
import { _ as _sfc_main$8 } from "./Team1-68d9b694.js";
import { _ as _sfc_main$9 } from "./Blogs4-d807cb26.js";
import { _ as _sfc_main$a } from "./ContactFormS-fe221cca.js";
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
import "swiper/vue";
import "swiper";
import "./features-1bf70970.js";
import "./5-d22ab734.js";
import "./6-f22bbc20.js";
import "./1-62a40b4e.js";
import "./ModalVideo-db24fbd8.js";
import "./client-only-29ef7f45.js";
const _sfc_main = {
  __name: "home4-light",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Business One Page Light`
    });
    const fixedSlider = ref();
    ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoading = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoading, null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        ref_key: "fixedSlider",
        ref: fixedSlider
      }, null, _parent));
      _push(`<div class="main-content">`);
      _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), { lines: "" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        grid: "2",
        filterPosition: "left"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$7), {
        theme: "light",
        length: "4"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$8), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$9), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$b), { hideBGCOLOR: "" }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/homepage/home4-light.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=home4-light-e773c75c.js.map
