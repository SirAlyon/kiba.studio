import { _ as __nuxt_component_0 } from "./logo-light-15a43a0f.js";
import { ref, unref, useSSRContext } from "vue";
import { u as useHead } from "./index-88e9f29c.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$b } from "./Footer-aa56144b.js";
import { _ as _sfc_main$2 } from "./SliderHeader-16942ae7.js";
import { _ as _sfc_main$3, a as _sfc_main$5, B as Blogs } from "./Blogs1-c645cf42.js";
import { _ as _sfc_main$4 } from "./Services1-ed3eb59e.js";
import { _ as _sfc_main$6 } from "./FunFacts1-ded9e3cd.js";
import { _ as _sfc_main$7 } from "./clients-f216af70.js";
import { _ as _sfc_main$8, a as _sfc_main$9 } from "./Clients1-3ccc1f9e.js";
import { _ as _sfc_main$a } from "./CallToAction-4c27f958.js";
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
import "./vue3-count-to.esm-97a09df1.js";
import "./1-62a40b4e.js";
import "./ModalVideo-db24fbd8.js";
import "./client-only-29ef7f45.js";
import "vue3-circle-progress";
const _sfc_main = {
  __name: "home1-dark",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Main Demo Dark`
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
      _push(ssrRenderComponent(unref(_sfc_main$4), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$7), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$8), { theme: "dark" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$9), { theme: "dark" }, null, _parent));
      _push(ssrRenderComponent(unref(Blogs), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$b), null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/homepage/home1-dark.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=home1-dark-70d3d3d4.js.map
