import { u as useHead } from './index-88e9f29c.mjs';
import { ssrRenderSlot } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import 'unhead';
import '@unhead/shared';

const _sfc_main = {
  __name: "blank",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      link: [
        // Load Kiba theme variables
        { rel: "stylesheet", href: "/assets/css/kiba-theme.css" },
        // Load Font Awesome
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        },
        // Load Bootstrap
        { rel: "stylesheet", href: "/assets/css/bootstrap.min.css" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/blank.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=blank-94678218.mjs.map
