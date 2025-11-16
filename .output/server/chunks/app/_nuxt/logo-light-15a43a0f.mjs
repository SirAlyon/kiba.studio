import { p as publicAssetsURL } from '../../handlers/renderer.mjs';
import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Loading",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "showX" }, _attrs))}><div class="loading"><span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span></div><div id="preloader"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Common/Loading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main;
const _imports_0 = "" + publicAssetsURL("img/logo-dark.png");
const _imports_1 = "" + publicAssetsURL("img/logo-light.png");

export { __nuxt_component_0 as _, _imports_0 as a, _imports_1 as b };
//# sourceMappingURL=logo-light-15a43a0f.mjs.map
