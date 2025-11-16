import { _ as __nuxt_component_0 } from "./logo-light-15a43a0f.js";
import { unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { u as useHead } from "./index-88e9f29c.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$b } from "./Footer-aa56144b.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$8 } from "./MinimalArea1-bdef1c7b.js";
import { _ as _sfc_main$4 } from "./Services1-ed3eb59e.js";
import { _ as _sfc_main$5 } from "./clients-f216af70.js";
import { _ as _sfc_main$6, a as _sfc_main$9 } from "./Clients1-3ccc1f9e.js";
import { _ as _sfc_main$7 } from "./Team1-68d9b694.js";
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
import "./min-area-692b8d24.js";
import "./features-1bf70970.js";
import "./1-62a40b4e.js";
import "swiper/vue";
import "./ModalVideo-db24fbd8.js";
import "./client-only-29ef7f45.js";
import "vue3-circle-progress";
const _sfc_main = {
  __name: "about-light",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - About Light`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoading = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoading, null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), { theme: "light" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), { imageLink: "/img/slid/about.jpg" }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Our dedicated team of creatives is bursting with talent, experience and passion for what we do. `);
          } else {
            return [
              createTextVNode(" Our dedicated team of creatives is bursting with talent, experience and passion for what we do. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), { oStyle: "4item" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), { from: "aboutPage" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$7), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$8), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$9), { theme: "light" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$b), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about/about-light.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=about-light-9dc532f5.js.map
