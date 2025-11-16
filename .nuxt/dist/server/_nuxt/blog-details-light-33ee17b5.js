import { _ as __nuxt_component_0 } from "./logo-light-15a43a0f.js";
import { unref, useSSRContext } from "vue";
import { u as useHead } from "./index-88e9f29c.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$4 } from "./Footer-aa56144b.js";
import { _ as _sfc_main$2 } from "./PageHeader-9dc113ff.js";
import { _ as _sfc_main$3 } from "./BlogDetails-feaf691c.js";
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
import "./3-dce5e48a.js";
const _sfc_main = {
  __name: "blog-details-light",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Blog Details Light`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoading = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoading, null, null, _parent));
      _push(`<div class="circle-bg"><div class="circle-color fixed"><div class="gradient-circle"></div><div class="gradient-circle two"></div></div></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { theme: "light" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        title: "Blog Details.",
        paragraph: "All the most current news and events of our creative team."
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog-details/blog-details-light.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=blog-details-light-33ee17b5.js.map
