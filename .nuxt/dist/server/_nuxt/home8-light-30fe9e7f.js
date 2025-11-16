import { _ as __nuxt_component_0 } from "./logo-light-15a43a0f.js";
import { unref, useSSRContext } from "vue";
import { u as useHead } from "./index-88e9f29c.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, A as AboutUs, S as Services, b as _sfc_main$3, c as _sfc_main$4, T as Team, d as _sfc_main$5, L as LatestNews, C as ContactArcho, F as FooterArch } from "./FooterArch-4038b7aa.js";
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
import "./1-62a40b4e.js";
import "./2-fa1f2f7e.js";
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
      _push(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
      _push(ssrRenderComponent(unref(AboutUs), null, null, _parent));
      _push(ssrRenderComponent(unref(Services), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), null, null, _parent));
      _push(ssrRenderComponent(unref(Team), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), null, null, _parent));
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
export {
  _sfc_main as default
};
//# sourceMappingURL=home8-light-30fe9e7f.js.map
