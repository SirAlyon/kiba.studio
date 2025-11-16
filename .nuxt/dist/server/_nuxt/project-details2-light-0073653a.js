import { _ as __nuxt_component_0 } from "./logo-light-15a43a0f.js";
import { unref, useSSRContext } from "vue";
import { u as useHead } from "./index-88e9f29c.js";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$7 } from "./Footer-aa56144b.js";
import { _ as _sfc_main$2, P as ProjectDate, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$5, d as _sfc_main$6, N as NextProject } from "./project-details2-0f66fa94.js";
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
const _sfc_main = {
  __name: "project-details2-light",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Project Details Light`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CommonLoading = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CommonLoading, null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent));
      _push(`<div class="wrapper">`);
      _push(ssrRenderComponent(unref(_sfc_main$2), { projectHeaderData: unref(ProjectDate) }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        projectIntroductionData: unref(ProjectDate).intro
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        projectGalleryData: unref(ProjectDate).gallery
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        projectDescriptionData: unref(ProjectDate).description
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), { projectVideoData: unref(ProjectDate) }, null, _parent));
      _push(ssrRenderComponent(unref(NextProject), null, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$7), null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/project-details2/project-details2-light.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=project-details2-light-0073653a.js.map
