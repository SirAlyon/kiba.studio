import { useSSRContext, computed, mergeProps, ref, watch, reactive, nextTick } from 'vue';
import { u as useHead } from './index-88e9f29c.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderTeleport, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import 'unhead';
import '@unhead/shared';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'vue-router';

let gsapInstance = null;
let ScrollTriggerInstance = null;
function useGSAP() {
  const isLoaded = ref(false);
  const currentSection = ref(0);
  const totalSections = ref(7);
  const loadGSAP = async () => {
    if (gsapInstance) {
      isLoaded.value = true;
      return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance };
    }
    try {
      const gsapModule = await import('gsap');
      const scrollTriggerModule = await import('../../ScrollTrigger.mjs');
      gsapInstance = gsapModule.gsap;
      ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger;
      gsapInstance.registerPlugin(ScrollTriggerInstance);
      gsapInstance.defaults({
        ease: "power3.out",
        duration: 0.8
      });
      isLoaded.value = true;
      return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance };
    } catch (error) {
      console.error("Errore caricamento GSAP:", error);
      return null;
    }
  };
  const animateSectionIn = (sectionId, options = {}) => {
    if (!gsapInstance)
      return;
    const {
      duration = 0.8,
      stagger = 0.1,
      y = 40,
      opacity = 0
    } = options;
    const section = document.querySelector(`#${sectionId}`);
    if (!section)
      return;
    const elements = section.querySelectorAll(".gsap-animate");
    gsapInstance.fromTo(
      elements,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: "power3.out"
      }
    );
  };
  const createScrollSnapTimeline = (sections) => {
    if (!gsapInstance || !ScrollTriggerInstance)
      return;
    sections.forEach((sectionId, index) => {
      ScrollTriggerInstance.create({
        trigger: `#${sectionId}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          currentSection.value = index;
          animateSectionIn(sectionId);
        },
        onEnterBack: () => {
          currentSection.value = index;
        }
      });
    });
  };
  const navigateToSection = (index, sectionId) => {
    if (!gsapInstance)
      return;
    const section = document.querySelector(`#${sectionId}`);
    if (!section)
      return;
    gsapInstance.to(window, {
      duration: 1,
      scrollTo: { y: `#${sectionId}`, offsetY: 0 },
      ease: "power3.inOut"
    });
    currentSection.value = index;
  };
  const animateAccordion = (element, isOpen) => {
    if (!gsapInstance)
      return;
    if (isOpen) {
      gsapInstance.fromTo(
        element,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }
      );
    } else {
      gsapInstance.to(element, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    }
  };
  const createModel3DScrollAnimation = (model, camera) => {
    if (!gsapInstance || !ScrollTriggerInstance || !model)
      return;
    const tl = gsapInstance.timeline({
      scrollTrigger: {
        trigger: ".kiba-spa-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
        // Sincronizza con scroll
      }
    });
    tl.to(model.rotation, {
      y: Math.PI * 0.5,
      // 90°
      x: 0.2,
      // Leggera inclinazione
      duration: 1
    });
    if (camera) {
      tl.to(
        camera.position,
        {
          z: 7,
          duration: 1
        },
        0
      );
    }
    return tl;
  };
  const animateLoader = (onComplete) => {
    if (!gsapInstance) {
      onComplete == null ? void 0 : onComplete();
      return;
    }
    const tl = gsapInstance.timeline({
      onComplete
    });
    tl.to(".kiba-loader-progress", {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut"
    }).to(".kiba-loader-content", {
      opacity: 0,
      y: -20,
      duration: 0.4
    }).to(".kiba-loader", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        const loader = document.querySelector(".kiba-loader");
        if (loader)
          loader.style.display = "none";
      }
    });
    return tl;
  };
  const animateHeroReveal = () => {
    if (!gsapInstance)
      return;
    const tl = gsapInstance.timeline();
    tl.from(".kiba-hero-content > *", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    }).from(
      ".kiba-hero-model",
      {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.5"
    );
    return tl;
  };
  return {
    loadGSAP,
    isLoaded,
    currentSection,
    totalSections,
    animateSectionIn,
    createScrollSnapTimeline,
    navigateToSection,
    animateAccordion,
    createModel3DScrollAnimation,
    animateLoader,
    animateHeroReveal,
    gsap: () => gsapInstance,
    ScrollTrigger: () => ScrollTriggerInstance
  };
}
const _sfc_main$e = {
  __name: "KibaIcon",
  __ssrInlineRender: true,
  props: {
    size: {
      type: [Number, String],
      default: 40
    },
    variant: {
      type: String,
      default: "default",
      // 'default', 'mono', 'light'
      validator: (v) => ["default", "mono", "light"].includes(v)
    },
    animated: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const fillColor = computed(() => {
      switch (props.variant) {
        case "mono":
          return "currentColor";
        case "light":
          return "#f0f0f0";
        default:
          return "var(--kiba-primary, #c94c4c)";
      }
    });
    const strokeColor = computed(() => {
      switch (props.variant) {
        case "mono":
          return "none";
        case "light":
          return "none";
        default:
          return "none";
      }
    });
    const strokeWidth = computed(() => "0");
    const accentColor = computed(() => {
      switch (props.variant) {
        case "mono":
          return "currentColor";
        case "light":
          return "#e8e8e8";
        default:
          return "var(--kiba-primary-light, #e06666)";
      }
    });
    const maskColor = computed(() => {
      switch (props.variant) {
        case "mono":
          return "rgba(255,255,255,0.3)";
        case "light":
          return "#ffffff";
        default:
          return "var(--kiba-secondary, #f5e6d3)";
      }
    });
    const eyeColor = computed(() => {
      switch (props.variant) {
        case "mono":
          return "currentColor";
        case "light":
          return "#1a1a1a";
        default:
          return "var(--kiba-bg-dark, #1a1a1a)";
      }
    });
    const noseColor = computed(() => {
      switch (props.variant) {
        case "mono":
          return "currentColor";
        case "light":
          return "#1a1a1a";
        default:
          return "var(--kiba-bg-dark, #1a1a1a)";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        width: __props.size,
        height: __props.size,
        viewBox: "0 0 100 100",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        class: ["kiba-icon", { "kiba-icon-animated": __props.animated }]
      }, _attrs))} data-v-fc5071e5><path d="M50 10L20 35V65L50 90L80 65V35L50 10Z"${ssrRenderAttr("fill", fillColor.value)}${ssrRenderAttr("stroke", strokeColor.value)}${ssrRenderAttr("stroke-width", strokeWidth.value)} class="kiba-icon-head" data-v-fc5071e5></path><path d="M20 35L10 15L30 25L20 35Z"${ssrRenderAttr("fill", accentColor.value)} class="kiba-icon-ear kiba-icon-ear-left" data-v-fc5071e5></path><path d="M80 35L90 15L70 25L80 35Z"${ssrRenderAttr("fill", accentColor.value)} class="kiba-icon-ear kiba-icon-ear-right" data-v-fc5071e5></path><path d="M50 30L35 45V60L50 70L65 60V45L50 30Z"${ssrRenderAttr("fill", maskColor.value)} class="kiba-icon-mask" data-v-fc5071e5></path><circle cx="40" cy="48" r="4"${ssrRenderAttr("fill", eyeColor.value)} class="kiba-icon-eye kiba-icon-eye-left" data-v-fc5071e5></circle><circle cx="60" cy="48" r="4"${ssrRenderAttr("fill", eyeColor.value)} class="kiba-icon-eye kiba-icon-eye-right" data-v-fc5071e5></circle><path d="M50 58L46 65H54L50 58Z"${ssrRenderAttr("fill", noseColor.value)} class="kiba-icon-nose" data-v-fc5071e5></path></svg>`);
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaIcon.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const KibaIcon = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-fc5071e5"]]);
const _sfc_main$d = {
  __name: "KibaLoaderGSAP",
  __ssrInlineRender: true,
  emits: ["complete"],
  setup(__props, { emit }) {
    const loaderRef = ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    useGSAP();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "loaderRef",
        ref: loaderRef,
        class: "kiba-loader-gsap"
      }, _attrs))} data-v-344cbfd4><div class="kiba-loader-content" data-v-344cbfd4><div class="kiba-loader-logo" data-v-344cbfd4>`);
      _push(ssrRenderComponent(KibaIcon, {
        size: 60,
        variant: "light",
        animated: false
      }, null, _parent));
      _push(`</div><div class="kiba-loader-brand" data-v-344cbfd4><span class="kiba-loader-text" data-v-344cbfd4>Kiba</span><span class="kiba-loader-dot" data-v-344cbfd4>.</span><span class="kiba-loader-text" data-v-344cbfd4>Studio</span></div><div class="kiba-loader-progress" data-v-344cbfd4><div class="kiba-loader-progress-fill" data-v-344cbfd4></div></div><div class="kiba-loader-status" data-v-344cbfd4> Caricamento... </div></div></div>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaLoaderGSAP.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const KibaLoaderGSAP = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-344cbfd4"]]);
const _sfc_main$c = {
  __name: "KibaSideNav",
  __ssrInlineRender: true,
  props: {
    currentSection: {
      type: Number,
      default: 0
    }
  },
  emits: ["navigate"],
  setup(__props, { emit }) {
    const sections = ref([
      { id: "hero", label: "Home", icon: "fas fa-home" },
      { id: "manifesto", label: "Chi Siamo", icon: "fas fa-shield-alt" },
      { id: "servizi", label: "Servizi", icon: "fas fa-code" },
      { id: "processo", label: "Processo", icon: "fas fa-project-diagram" },
      { id: "stack", label: "Stack", icon: "fas fa-layer-group" },
      { id: "portfolio", label: "Portfolio", icon: "fas fa-briefcase" },
      { id: "contatti", label: "Contatti", icon: "fas fa-envelope" }
    ]);
    ref(null);
    useGSAP();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "kiba-sidenav" }, _attrs))} data-v-dcd4114a><div class="kiba-sidenav-logo" data-v-dcd4114a>`);
      _push(ssrRenderComponent(KibaIcon, {
        size: 32,
        variant: "default",
        animated: true
      }, null, _parent));
      _push(`</div><div class="kiba-sidenav-links" data-v-dcd4114a><!--[-->`);
      ssrRenderList(sections.value, (section, index) => {
        _push(`<button class="${ssrRenderClass([{ active: __props.currentSection === index }, "kiba-sidenav-item"])}"${ssrRenderAttr("title", section.label)} data-v-dcd4114a><i class="${ssrRenderClass(section.icon)}" data-v-dcd4114a></i><span class="kiba-sidenav-tooltip" data-v-dcd4114a>${ssrInterpolate(section.label)}</span></button>`);
      });
      _push(`<!--]--></div><div class="kiba-sidenav-indicator" data-v-dcd4114a><span data-v-dcd4114a>${ssrInterpolate(__props.currentSection + 1)}</span><span class="separator" data-v-dcd4114a>/</span><span data-v-dcd4114a>${ssrInterpolate(sections.value.length)}</span></div></nav>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaSideNav.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const KibaSideNav = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-dcd4114a"]]);
const _sfc_main$b = {
  __name: "KibaMobileNav",
  __ssrInlineRender: true,
  props: {
    currentSection: {
      type: Number,
      default: 0
    }
  },
  emits: ["navigate"],
  setup(__props, { emit }) {
    const isMenuOpen = ref(false);
    const sections = ref([
      { id: "hero", label: "Home" },
      { id: "manifesto", label: "Chi Siamo" },
      { id: "servizi", label: "Servizi" },
      { id: "processo", label: "Processo" },
      { id: "stack", label: "Stack" },
      { id: "portfolio", label: "Portfolio" },
      { id: "contatti", label: "Contatti" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kiba-mobile-nav" }, _attrs))} data-v-0415ea67><div class="kiba-mobile-header" data-v-0415ea67><div class="kiba-mobile-logo" data-v-0415ea67>`);
      _push(ssrRenderComponent(KibaIcon, {
        size: 28,
        variant: "default",
        animated: false
      }, null, _parent));
      _push(`<span class="kiba-mobile-brand" data-v-0415ea67>Kiba.Studio</span></div><button class="kiba-mobile-menu-toggle"${ssrRenderAttr("aria-expanded", isMenuOpen.value)} aria-label="Toggle menu" data-v-0415ea67><span class="kiba-menu-bar" data-v-0415ea67></span><span class="kiba-menu-bar" data-v-0415ea67></span><span class="kiba-menu-bar" data-v-0415ea67></span></button></div>`);
      if (isMenuOpen.value) {
        _push(`<div class="kiba-mobile-overlay" data-v-0415ea67><div class="kiba-mobile-menu" data-v-0415ea67><button class="kiba-mobile-close" aria-label="Close menu" data-v-0415ea67><i class="fas fa-times" data-v-0415ea67></i></button><nav class="kiba-mobile-menu-items" data-v-0415ea67><!--[-->`);
        ssrRenderList(sections.value, (section, index) => {
          _push(`<button class="${ssrRenderClass([{ active: __props.currentSection === index }, "kiba-mobile-menu-item"])}" data-v-0415ea67><span class="kiba-mobile-menu-number" data-v-0415ea67>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span><span class="kiba-mobile-menu-label" data-v-0415ea67>${ssrInterpolate(section.label)}</span></button>`);
        });
        _push(`<!--]--></nav><div class="kiba-mobile-menu-footer" data-v-0415ea67><p class="kiba-mobile-tagline" data-v-0415ea67>Software etico e sicuro</p><div class="kiba-mobile-contact" data-v-0415ea67><a href="mailto:info@kiba.studio" data-v-0415ea67>info@kiba.studio</a></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaMobileNav.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const KibaMobileNav = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-0415ea67"]]);
const _sfc_main$a = {
  __name: "KibaSPAHero",
  __ssrInlineRender: true,
  emits: ["navigate"],
  setup(__props, { emit }) {
    ref(null);
    const isModelLoading = ref(true);
    useGSAP();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kiba-hero-spa" }, _attrs))} data-v-3b01178b><div class="container h-100" data-v-3b01178b><div class="row h-100 align-items-center" data-v-3b01178b><div class="col-lg-6" data-v-3b01178b><div class="kiba-hero-content" data-v-3b01178b><div class="kiba-hero-label gsap-animate" data-v-3b01178b>Web Agency Etica</div><h1 class="kiba-hero-title gsap-animate" data-v-3b01178b> Software che<br data-v-3b01178b><span class="kiba-text-gradient" data-v-3b01178b>protegge</span> il tuo business </h1><p class="kiba-hero-subtitle gsap-animate" data-v-3b01178b> Sviluppiamo soluzioni digitali con la seriet\xE0 giapponese e la protezione di un Akita. Privacy first, codice etico, qualit\xE0 senza compromessi. </p><div class="kiba-hero-cta gsap-animate" data-v-3b01178b><button class="kiba-btn kiba-btn-primary" data-v-3b01178b> Inizia il progetto <i class="fas fa-arrow-right ms-2" data-v-3b01178b></i></button><button class="kiba-btn kiba-btn-outline" data-v-3b01178b> Scopri di pi\xF9 </button></div><div class="kiba-hero-stats gsap-animate" data-v-3b01178b><div class="kiba-stat" data-v-3b01178b><span class="kiba-stat-value" data-v-3b01178b>6+</span><span class="kiba-stat-label" data-v-3b01178b>Anni esperienza</span></div><div class="kiba-stat" data-v-3b01178b><span class="kiba-stat-value" data-v-3b01178b>100%</span><span class="kiba-stat-label" data-v-3b01178b>Privacy First</span></div><div class="kiba-stat" data-v-3b01178b><span class="kiba-stat-value" data-v-3b01178b>0</span><span class="kiba-stat-label" data-v-3b01178b>Dark Patterns</span></div></div></div></div><div class="col-lg-6 d-none d-lg-block" data-v-3b01178b><div class="kiba-hero-model" data-v-3b01178b>`);
      if (isModelLoading.value) {
        _push(`<div class="kiba-model-loader" data-v-3b01178b><div class="kiba-model-spinner" data-v-3b01178b></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="kiba-hero-scroll gsap-animate" data-v-3b01178b><span data-v-3b01178b>Scorri</span><i class="fas fa-chevron-down" data-v-3b01178b></i></div></div>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaSPAHero.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const KibaSPAHero = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-3b01178b"]]);
const _sfc_main$9 = {
  __name: "KibaSPAManifesto",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kiba-manifesto-spa" }, _attrs))} data-v-0ffbff7b><div class="container" data-v-0ffbff7b><div class="row align-items-center" data-v-0ffbff7b><div class="col-lg-5 mb-5 mb-lg-0" data-v-0ffbff7b><div class="kiba-manifesto-visual gsap-animate" data-v-0ffbff7b><div class="kiba-manifesto-card" data-v-0ffbff7b><div class="kiba-manifesto-icon" data-v-0ffbff7b><i class="fas fa-shield-alt" data-v-0ffbff7b></i></div><h3 class="kiba-manifesto-brand" data-v-0ffbff7b>Kiba</h3><p class="kiba-manifesto-meaning" data-v-0ffbff7b> &quot;Kiba&quot; in giapponese significa <strong data-v-0ffbff7b>zanna</strong>. Come l&#39;Akita, razza nota per lealt\xE0 e protezione incrollabile, noi proteggiamo i tuoi dati e il tuo business digitale. </p><div class="kiba-manifesto-divider" data-v-0ffbff7b></div><div class="kiba-manifesto-values" data-v-0ffbff7b><div class="kiba-value" data-v-0ffbff7b><i class="fas fa-lock" data-v-0ffbff7b></i><span data-v-0ffbff7b>Privacy First</span></div><div class="kiba-value" data-v-0ffbff7b><i class="fas fa-code" data-v-0ffbff7b></i><span data-v-0ffbff7b>Codice Etico</span></div><div class="kiba-value" data-v-0ffbff7b><i class="fas fa-infinity" data-v-0ffbff7b></i><span data-v-0ffbff7b>Soluzioni Durature</span></div></div><div class="kiba-manifesto-years" data-v-0ffbff7b><span class="kiba-years-number" data-v-0ffbff7b>6+</span><span class="kiba-years-label" data-v-0ffbff7b>Anni di esperienza</span></div></div></div></div><div class="col-lg-7" data-v-0ffbff7b><div class="kiba-manifesto-content" data-v-0ffbff7b><div class="kiba-section-label gsap-animate" data-v-0ffbff7b>Il Nostro Manifesto</div><h2 class="kiba-section-title gsap-animate" data-v-0ffbff7b> Software etico,<br data-v-0ffbff7b>fatto per durare </h2><div class="kiba-section-divider gsap-animate" data-v-0ffbff7b></div><div class="kiba-manifesto-text gsap-animate" data-v-0ffbff7b><p data-v-0ffbff7b><strong data-v-0ffbff7b>Kiba.Studio</strong> nasce come laboratorio etico di software. Fondata da un fullstack developer con oltre 6 anni di esperienza su <strong data-v-0ffbff7b>Laravel, Vue.js, Node e Python</strong>, l&#39;agenzia mette al centro i valori che altri trascurano: <strong data-v-0ffbff7b>privacy, trasparenza e qualit\xE0 senza compromessi</strong>. </p><p data-v-0ffbff7b> Non siamo una factory che produce siti in serie. Siamo una <strong data-v-0ffbff7b>boutique tecnica</strong> che crede nel codice come strumento di <strong data-v-0ffbff7b>libert\xE0</strong>, non di dipendenza. I tuoi dati sono una responsabilit\xE0 che prendiamo sul serio, non merce da monetizzare. </p><p data-v-0ffbff7b> Lavoriamo con la <strong data-v-0ffbff7b>seriet\xE0 giapponese</strong>: ordine, pulizia, struttura, rigore. Il nostro codice parla per noi: testato, documentato, manutenibile. Niente scorciatoie, niente debito tecnico nascosto. </p></div><div class="row mt-4" data-v-0ffbff7b><div class="col-md-6 gsap-animate" data-v-0ffbff7b><div class="kiba-manifesto-feature" data-v-0ffbff7b><i class="fas fa-user-shield" data-v-0ffbff7b></i><h4 data-v-0ffbff7b>Privacy First</h4><p data-v-0ffbff7b> I dati dei tuoi utenti sono una responsabilit\xE0 sacra. Zero tracking invasivo, zero vendita dati. </p></div></div><div class="col-md-6 gsap-animate" data-v-0ffbff7b><div class="kiba-manifesto-feature" data-v-0ffbff7b><i class="fas fa-hand-holding-heart" data-v-0ffbff7b></i><h4 data-v-0ffbff7b>Tecnologia Etica</h4><p data-v-0ffbff7b> Software come strumento di emancipazione. Niente dark patterns, niente dipendenza forzata. </p></div></div></div><div class="kiba-manifesto-target gsap-animate" data-v-0ffbff7b><strong data-v-0ffbff7b>Clienti ideali:</strong> Start-up, PMI e professionisti che cercano qualit\xE0, sicurezza e affidabilit\xE0 \u2014 non progetti &quot;veloci e low-cost&quot;. </div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaSPAManifesto.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const KibaSPAManifesto = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-0ffbff7b"]]);
const _sfc_main$8 = {
  __name: "KibaSPAServices",
  __ssrInlineRender: true,
  setup(__props) {
    useGSAP();
    const openService = ref(null);
    ref([]);
    const services = [
      {
        id: "frontend",
        icon: "fas fa-palette",
        title: "Frontend Development",
        subtitle: "Interfacce moderne e performanti",
        description: "Creiamo interfacce utente reattive e accessibili con Vue.js 3, React e Nuxt. Design responsive, animazioni fluide, performance ottimizzate per ogni device.",
        features: [
          "Single Page Applications (SPA)",
          "Progressive Web Apps (PWA)",
          "Design responsive mobile-first",
          "Accessibilit\xE0 WCAG 2.1",
          "Animazioni GSAP professionali"
        ],
        technologies: ["Vue.js 3", "Nuxt 3", "React", "TailwindCSS", "GSAP"]
      },
      {
        id: "backend",
        icon: "fas fa-server",
        title: "Backend Development",
        subtitle: "API robuste e sicure",
        description: "Sviluppiamo backend scalabili con Laravel e Node.js. API RESTful, autenticazione sicura, gestione database ottimizzata, architettura pulita e testata.",
        features: [
          "API RESTful documentate",
          "Autenticazione JWT/OAuth",
          "Database optimization",
          "Caching e performance",
          "Testing automatizzato"
        ],
        technologies: ["Laravel", "Node.js", "Python", "PostgreSQL", "Redis"]
      },
      {
        id: "fullstack",
        icon: "fas fa-layer-group",
        title: "Applicazioni Full-Stack",
        subtitle: "Soluzioni end-to-end",
        description: "Progettiamo e sviluppiamo applicazioni web complete, dal database all'interfaccia utente. Architettura modulare, codice manutenibile, deployment automatizzato.",
        features: [
          "Architettura MVC/MVVM",
          "CI/CD pipelines",
          "Monitoraggio e logging",
          "Backup automatici",
          "Documentazione completa"
        ],
        technologies: ["Laravel + Vue.js", "TALL Stack", "Docker", "GitHub Actions"]
      },
      {
        id: "server",
        icon: "fas fa-cloud",
        title: "Server & DevOps",
        subtitle: "Infrastruttura affidabile",
        description: "Configuriamo e gestiamo server Linux, containerizzazione Docker, orchestrazione con Kubernetes. Monitoring, sicurezza, scalabilit\xE0 automatica.",
        features: [
          "Server Linux administration",
          "Docker containerization",
          "Nginx/Apache configuration",
          "SSL/TLS certificates",
          "Firewall e sicurezza"
        ],
        technologies: ["Ubuntu", "Docker", "Nginx", "Let's Encrypt", "Fail2ban"]
      },
      {
        id: "automation",
        icon: "fas fa-robot",
        title: "Automazione & Script",
        subtitle: "Efficienza operativa",
        description: "Automatizziamo processi ripetitivi con Python e Bash. Scraping etico, data processing, task scheduling, integrazione API di terze parti.",
        features: [
          "Web scraping etico",
          "Data processing pipelines",
          "Task automation",
          "API integrations",
          "Report automatici"
        ],
        technologies: ["Python", "Bash", "Selenium", "Pandas", "Cron"]
      },
      {
        id: "consulting",
        icon: "fas fa-comments",
        title: "Consulenza Tecnica",
        subtitle: "Strategia e architettura",
        description: "Offriamo consulenza su architettura software, scelta tecnologica, code review, refactoring. Aiutiamo team interni a migliorare qualit\xE0 e processi.",
        features: [
          "Architettura software",
          "Code review approfondite",
          "Refactoring legacy code",
          "Best practices training",
          "Sicurezza applicativa"
        ],
        technologies: ["Clean Code", "SOLID", "Design Patterns", "Security Audit"]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kiba-services-spa" }, _attrs))} data-v-7a32cd82><div class="container" data-v-7a32cd82><div class="text-center mb-5" data-v-7a32cd82><div class="kiba-section-label gsap-animate" data-v-7a32cd82>I Nostri Servizi</div><h2 class="kiba-section-title gsap-animate" data-v-7a32cd82> Soluzioni digitali<br data-v-7a32cd82><span class="kiba-text-gradient" data-v-7a32cd82>complete</span></h2><p class="kiba-section-subtitle gsap-animate" data-v-7a32cd82> Dalla progettazione al deployment, costruiamo software etico e scalabile </p></div><div class="kiba-services-accordion" data-v-7a32cd82><!--[-->`);
      ssrRenderList(services, (service, index) => {
        _push(`<div class="${ssrRenderClass([{ "is-open": openService.value === index }, "kiba-service-item gsap-animate"])}" data-v-7a32cd82><button class="kiba-service-header"${ssrRenderAttr("aria-expanded", openService.value === index)} data-v-7a32cd82><div class="kiba-service-header-content" data-v-7a32cd82><div class="kiba-service-icon" data-v-7a32cd82><i class="${ssrRenderClass(service.icon)}" data-v-7a32cd82></i></div><div class="kiba-service-title-wrapper" data-v-7a32cd82><h3 class="kiba-service-title" data-v-7a32cd82>${ssrInterpolate(service.title)}</h3><span class="kiba-service-subtitle" data-v-7a32cd82>${ssrInterpolate(service.subtitle)}</span></div></div><div class="kiba-service-toggle" data-v-7a32cd82><i class="fas fa-plus" data-v-7a32cd82></i></div></button><div class="kiba-service-content"${ssrRenderAttr("data-index", index)} data-v-7a32cd82><div class="kiba-service-content-inner" data-v-7a32cd82><p class="kiba-service-description" data-v-7a32cd82>${ssrInterpolate(service.description)}</p><ul class="kiba-service-features" data-v-7a32cd82><!--[-->`);
        ssrRenderList(service.features, (feature) => {
          _push(`<li data-v-7a32cd82><i class="fas fa-check" data-v-7a32cd82></i> ${ssrInterpolate(feature)}</li>`);
        });
        _push(`<!--]--></ul><div class="kiba-service-tech" data-v-7a32cd82><span class="kiba-tech-label" data-v-7a32cd82>Stack:</span><div class="kiba-tech-tags" data-v-7a32cd82><!--[-->`);
        ssrRenderList(service.technologies, (tech) => {
          _push(`<span class="kiba-tech-tag" data-v-7a32cd82>${ssrInterpolate(tech)}</span>`);
        });
        _push(`<!--]--></div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaSPAServices.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const KibaSPAServices = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-7a32cd82"]]);
const _sfc_main$7 = {
  __name: "KibaSPAProcess",
  __ssrInlineRender: true,
  emits: ["navigate"],
  setup(__props, { emit }) {
    const sectionRef = ref(null);
    ref(null);
    ref(null);
    ref(null);
    const activeStepIndex = ref(0);
    useGSAP();
    const steps = [
      {
        id: "discovery",
        label: "Analisi",
        title: "Discovery & Strategy",
        description: "Iniziamo con un'analisi approfondita delle tue esigenze di business, obiettivi e vincoli tecnici. Definiamo insieme la strategia migliore, lo scope del progetto, timeline realistica e budget sostenibile. Ogni dettaglio viene documentato per garantire trasparenza.",
        icon: "fas fa-compass",
        accentColor: "#c94c4c",
        duration: "1-2 settimane",
        highlights: [
          "Workshop di scoperta con stakeholder",
          "Analisi competitors e mercato",
          "Definizione KPI e metriche di successo",
          "Documentazione requisiti completa"
        ]
      },
      {
        id: "design",
        label: "Progettazione",
        title: "Design & Architecture",
        description: "Creiamo wireframe dettagliati, mockup interattivi e definiamo l'architettura tecnica scalabile. Il design non \xE8 solo estetica: \xE8 usabilit\xE0, accessibilit\xE0, performance. Validiamo ogni scelta con te prima di scrivere una singola riga di codice.",
        icon: "fas fa-drafting-compass",
        accentColor: "#e06666",
        duration: "2-3 settimane",
        highlights: [
          "Wireframe e prototipi interattivi",
          "Design system componibile",
          "Architettura cloud-ready",
          "Review e approvazione iterativa"
        ]
      },
      {
        id: "development",
        label: "Sviluppo",
        title: "Development Sprint",
        description: "Sviluppiamo in sprint agili con demo settimanali. Codice pulito, testato, documentato. Utilizziamo Git per versionamento, CI/CD per deploy automatici, code review per qualit\xE0. Trasparenza totale: hai sempre accesso al repository e progress.",
        icon: "fas fa-code",
        accentColor: "#d45555",
        duration: "4-12 settimane",
        highlights: [
          "Sprint settimanali con demo",
          "Test automatizzati (TDD)",
          "Code review sistematica",
          "Deploy continuo su staging"
        ]
      },
      {
        id: "testing",
        label: "Qualit\xE0",
        title: "Testing & Security",
        description: "Test funzionali, di performance, di sicurezza. Ogni feature viene validata su diversi dispositivi e browser. Security audit completo, penetration testing, OWASP compliance. Correggiamo bug e ottimizziamo prima del lancio.",
        icon: "fas fa-shield-alt",
        accentColor: "#c94c4c",
        duration: "1-2 settimane",
        highlights: [
          "Test automatizzati end-to-end",
          "Security audit professionale",
          "Performance optimization",
          "Compatibilit\xE0 cross-platform"
        ]
      },
      {
        id: "deployment",
        label: "Lancio",
        title: "Deploy & Support",
        description: "Deploy su infrastruttura sicura e scalabile. Configuriamo monitoring 24/7, backup automatici, disaster recovery. Il supporto post-lancio include manutenzione, aggiornamenti di sicurezza e assistenza continua. Il tuo successo \xE8 il nostro.",
        icon: "fas fa-rocket",
        accentColor: "#e06666",
        duration: "Ongoing",
        highlights: [
          "Deploy zero-downtime",
          "Monitoring e alerting 24/7",
          "Backup automatici giornalieri",
          "Supporto e manutenzione continua"
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "kiba-process-spa",
        ref_key: "sectionRef",
        ref: sectionRef
      }, _attrs))} data-v-016ad8a6><div class="container-fluid h-100" data-v-016ad8a6><div class="row h-100 align-items-center" data-v-016ad8a6><div class="col-lg-4 col-md-4" data-v-016ad8a6><div class="kiba-process-counter" data-v-016ad8a6><div class="kiba-process-counter-label" data-v-016ad8a6>Step</div><div class="kiba-process-counter-number" data-v-016ad8a6>${ssrInterpolate(String(activeStepIndex.value + 1).padStart(2, "0"))}</div><div class="kiba-process-counter-title" data-v-016ad8a6>${ssrInterpolate(steps[activeStepIndex.value].title)}</div><div class="kiba-process-counter-progress" data-v-016ad8a6><div class="kiba-process-counter-progress-fill" style="${ssrRenderStyle({ width: `${(activeStepIndex.value + 1) / steps.length * 100}%` })}" data-v-016ad8a6></div></div><div class="kiba-process-counter-nav" data-v-016ad8a6><span class="current" data-v-016ad8a6>${ssrInterpolate(activeStepIndex.value + 1)}</span><span class="separator" data-v-016ad8a6>/</span><span class="total" data-v-016ad8a6>${ssrInterpolate(steps.length)}</span></div></div></div><div class="col-lg-8 col-md-8" data-v-016ad8a6><div class="kiba-process-content" data-v-016ad8a6><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(`<div class="${ssrRenderClass([{ "is-active": index === activeStepIndex.value }, "kiba-process-step"])}"${ssrRenderAttr("data-step-index", index)} data-v-016ad8a6><div class="kiba-process-step-icon" style="${ssrRenderStyle({ color: step.accentColor })}" data-v-016ad8a6><i class="${ssrRenderClass(step.icon)}" data-v-016ad8a6></i></div><div class="kiba-process-step-label" data-v-016ad8a6>${ssrInterpolate(step.label)}</div><h2 class="kiba-process-step-title" data-v-016ad8a6>${ssrInterpolate(step.title)}</h2><p class="kiba-process-step-description" data-v-016ad8a6>${ssrInterpolate(step.description)}</p>`);
        if (step.highlights) {
          _push(`<div class="kiba-process-step-highlights" data-v-016ad8a6><!--[-->`);
          ssrRenderList(step.highlights, (highlight, hIndex) => {
            _push(`<div class="kiba-process-highlight" data-v-016ad8a6><i class="fas fa-check-circle" data-v-016ad8a6></i><span data-v-016ad8a6>${ssrInterpolate(highlight)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="kiba-process-step-duration" data-v-016ad8a6><i class="fas fa-clock" data-v-016ad8a6></i><span data-v-016ad8a6>${ssrInterpolate(step.duration)}</span></div></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
      if (activeStepIndex.value < steps.length - 1) {
        _push(`<div class="kiba-process-scroll-hint" data-v-016ad8a6><i class="fas fa-chevron-down" data-v-016ad8a6></i><span data-v-016ad8a6>Prossimo step</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaSPAProcess.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const KibaSPAProcess = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-016ad8a6"]]);
const _sfc_main$6 = {
  __name: "KibaSPAStack",
  __ssrInlineRender: true,
  setup(__props) {
    const techStack = [
      {
        name: "Frontend",
        icon: "fas fa-desktop",
        technologies: [
          { name: "Vue.js 3", icon: "fab fa-vuejs", level: "Expert" },
          { name: "Nuxt 3", icon: "fas fa-n", level: "Expert" },
          { name: "React", icon: "fab fa-react", level: "Advanced" },
          { name: "TailwindCSS", icon: "fas fa-wind", level: "Expert" },
          { name: "GSAP", icon: "fas fa-magic", level: "Advanced" }
        ]
      },
      {
        name: "Backend",
        icon: "fas fa-server",
        technologies: [
          { name: "Laravel", icon: "fab fa-laravel", level: "Expert" },
          { name: "Node.js", icon: "fab fa-node-js", level: "Advanced" },
          { name: "Python", icon: "fab fa-python", level: "Advanced" },
          { name: "PHP", icon: "fab fa-php", level: "Expert" },
          { name: "REST APIs", icon: "fas fa-plug", level: "Expert" }
        ]
      },
      {
        name: "Database & DevOps",
        icon: "fas fa-database",
        technologies: [
          { name: "PostgreSQL", icon: "fas fa-database", level: "Expert" },
          { name: "MySQL", icon: "fas fa-database", level: "Expert" },
          { name: "Redis", icon: "fas fa-memory", level: "Advanced" },
          { name: "Docker", icon: "fab fa-docker", level: "Advanced" },
          { name: "Linux/Ubuntu", icon: "fab fa-ubuntu", level: "Expert" }
        ]
      }
    ];
    const additionalSkills = [
      "Git/GitHub",
      "CI/CD",
      "Nginx",
      "Apache",
      "SSL/TLS",
      "OAuth",
      "JWT",
      "WebSocket",
      "Three.js",
      "PWA",
      "SEO",
      "WCAG",
      "Agile",
      "Clean Code",
      "SOLID",
      "Design Patterns",
      "Security Best Practices",
      "Performance Optimization"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kiba-stack-spa" }, _attrs))} data-v-be2fcc17><div class="container" data-v-be2fcc17><div class="text-center mb-5" data-v-be2fcc17><div class="kiba-section-label gsap-animate" data-v-be2fcc17>Tech Stack</div><h2 class="kiba-section-title gsap-animate" data-v-be2fcc17> Tecnologie<br data-v-be2fcc17><span class="kiba-text-gradient" data-v-be2fcc17>moderne</span></h2><p class="kiba-section-subtitle gsap-animate" data-v-be2fcc17> Stack testato, affidabile e scalabile per ogni tipo di progetto </p></div><div class="row" data-v-be2fcc17><!--[-->`);
      ssrRenderList(techStack, (category) => {
        _push(`<div class="col-lg-4 col-md-6 mb-4" data-v-be2fcc17><div class="kiba-stack-category gsap-animate" data-v-be2fcc17><div class="kiba-stack-category-header" data-v-be2fcc17><i class="${ssrRenderClass(category.icon)}" data-v-be2fcc17></i><h3 data-v-be2fcc17>${ssrInterpolate(category.name)}</h3></div><div class="kiba-stack-tech-list" data-v-be2fcc17><!--[-->`);
        ssrRenderList(category.technologies, (tech) => {
          _push(`<div class="kiba-stack-tech-item" data-v-be2fcc17><div class="kiba-stack-tech-icon" data-v-be2fcc17><i class="${ssrRenderClass(tech.icon)}" data-v-be2fcc17></i></div><div class="kiba-stack-tech-info" data-v-be2fcc17><span class="kiba-stack-tech-name" data-v-be2fcc17>${ssrInterpolate(tech.name)}</span><span class="kiba-stack-tech-level" data-v-be2fcc17>${ssrInterpolate(tech.level)}</span></div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div><div class="kiba-stack-additional gsap-animate" data-v-be2fcc17><h4 class="kiba-stack-additional-title" data-v-be2fcc17>Competenze aggiuntive</h4><div class="kiba-stack-tags" data-v-be2fcc17><!--[-->`);
      ssrRenderList(additionalSkills, (skill) => {
        _push(`<span class="kiba-stack-tag" data-v-be2fcc17>${ssrInterpolate(skill)}</span>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaSPAStack.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const KibaSPAStack = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-be2fcc17"]]);
const _sfc_main$5 = {
  __name: "KibaProjectModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    project: {
      type: Object,
      required: true
    }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    const modalRef = ref(null);
    useGSAP();
    let gsap = null;
    watch(() => props.isOpen, (newVal) => {
      if (newVal && gsap && modalRef.value) {
        document.body.style.overflow = "hidden";
        gsap.fromTo(
          modalRef.value,
          {
            scale: 0.9,
            opacity: 0,
            y: 50
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.4)"
          }
        );
      } else if (!newVal) {
        document.body.style.overflow = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.isOpen) {
          _push2(`<div class="kiba-modal-overlay" data-v-19706213><div class="kiba-modal-content" data-v-19706213><button class="kiba-modal-close" aria-label="Chiudi modale" data-v-19706213><i class="fas fa-times" data-v-19706213></i></button><div class="kiba-modal-header" data-v-19706213><div class="kiba-modal-type" data-v-19706213>${ssrInterpolate(__props.project.type)}</div><h2 class="kiba-modal-title" data-v-19706213>${ssrInterpolate(__props.project.title)}</h2><p class="kiba-modal-subtitle" data-v-19706213>${ssrInterpolate(__props.project.subtitle)}</p><div class="kiba-modal-privacy" data-v-19706213><i class="fas fa-shield-alt" data-v-19706213></i><span data-v-19706213>Dettagli anonimizzati per tutelare la privacy del cliente</span></div></div><div class="kiba-modal-body" data-v-19706213><div class="kiba-modal-section" data-v-19706213><h3 data-v-19706213>Panoramica del Progetto</h3><p data-v-19706213>${ssrInterpolate(__props.project.fullDescription)}</p></div><div class="kiba-modal-section" data-v-19706213><h3 data-v-19706213>Sfide e Soluzioni</h3><div class="kiba-modal-challenges" data-v-19706213><!--[-->`);
          ssrRenderList(__props.project.challenges, (challenge, index) => {
            _push2(`<div class="kiba-modal-challenge" data-v-19706213><i class="fas fa-check-circle" data-v-19706213></i><div data-v-19706213><strong data-v-19706213>${ssrInterpolate(challenge.title)}</strong><p data-v-19706213>${ssrInterpolate(challenge.solution)}</p></div></div>`);
          });
          _push2(`<!--]--></div></div><div class="kiba-modal-section" data-v-19706213><h3 data-v-19706213>Stack Tecnologico</h3><div class="kiba-modal-tags" data-v-19706213><!--[-->`);
          ssrRenderList(__props.project.technologies, (tech) => {
            _push2(`<span class="kiba-modal-tag" data-v-19706213>${ssrInterpolate(tech)}</span>`);
          });
          _push2(`<!--]--></div></div><div class="kiba-modal-section" data-v-19706213><h3 data-v-19706213>Focus su Privacy &amp; Sicurezza</h3><ul class="kiba-modal-features" data-v-19706213><!--[-->`);
          ssrRenderList(__props.project.privacyFeatures, (feature) => {
            _push2(`<li data-v-19706213><i class="fas fa-lock" data-v-19706213></i> ${ssrInterpolate(feature)}</li>`);
          });
          _push2(`<!--]--></ul></div><div class="kiba-modal-section" data-v-19706213><h3 data-v-19706213>Preview</h3><div class="kiba-modal-images" data-v-19706213><div class="kiba-modal-image-placeholder" data-v-19706213><i class="fas fa-image" data-v-19706213></i><span data-v-19706213>Screenshot anonimizzato</span></div><div class="kiba-modal-image-placeholder" data-v-19706213><i class="fas fa-mobile-alt" data-v-19706213></i><span data-v-19706213>Vista mobile</span></div></div></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaProjectModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const KibaProjectModal = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-19706213"]]);
const _sfc_main$4 = {
  __name: "KibaSPAPortfolio",
  __ssrInlineRender: true,
  setup(__props) {
    const isModalOpen = ref(false);
    const selectedProject = ref(null);
    const projects = ref([
      {
        id: 1,
        type: "Web Application",
        icon: "fas fa-globe",
        title: "Pannello di controllo per marketplace B2B",
        description: "Sistema completo di gestione ordini, inventario e logistica per un marketplace europeo con oltre 500 venditori attivi.",
        subtitle: "Soluzione enterprise per e-commerce B2B",
        fullDescription: "Abbiamo sviluppato un pannello di controllo completo per un marketplace B2B europeo che gestisce transazioni per oltre 10M\u20AC/anno. Il sistema permette la gestione completa di ordini, inventario, logistica e fatturazione, con particolare attenzione alla sicurezza dei dati e alla conformit\xE0 GDPR. Ogni transazione \xE8 crittografata end-to-end e i dati sensibili sono segregati con accessi basati su ruoli granulari.",
        mainTech: ["Laravel", "Vue.js", "PostgreSQL", "Redis", "Docker"],
        technologies: ["Laravel", "Vue.js", "PostgreSQL", "Redis", "Docker", "Elasticsearch", "RabbitMQ", "Kubernetes"],
        challenges: [
          {
            title: "Gestione di alto volume",
            solution: "Architettura microservizi con caching distribuito per gestire oltre 10.000 richieste/minuto"
          },
          {
            title: "Multi-tenancy sicuro",
            solution: "Segregazione dati per tenant con crittografia a livello di database e audit log completo"
          },
          {
            title: "Conformit\xE0 GDPR",
            solution: "Sistema di anonimizzazione dati, export GDPR automatico e diritto all'oblio implementato"
          }
        ],
        privacyFeatures: [
          "Crittografia end-to-end per tutte le transazioni",
          "Audit log immutabile con blockchain privata",
          "Sistema di ruoli e permessi granulare",
          "Anonimizzazione automatica dati personali",
          "Export GDPR compliance in un click"
        ]
      },
      {
        id: 2,
        type: "Intranet",
        icon: "fas fa-building",
        title: "Portale interno per studio legale",
        description: "Sistema di gestione documentale e pratiche per uno studio legale con sedi multiple e requisiti di massima riservatezza.",
        subtitle: "Gestione documentale sicura e conforme",
        fullDescription: "Portale interno sviluppato per uno studio legale internazionale con 200+ professionisti. Il sistema gestisce documenti sensibili, pratiche legali, timesheet e fatturazione. Particolare focus sulla sicurezza: tutti i documenti sono crittografati a riposo e in transito, con sistema di versioning e audit trail completo. Accesso con autenticazione a due fattori e VPN dedicata.",
        mainTech: ["Next.js", "Node.js", "MongoDB", "AWS S3"],
        technologies: ["Next.js", "Node.js", "MongoDB", "AWS S3", "Nginx", "OpenVPN", "Elastic Stack"],
        challenges: [
          {
            title: "Sicurezza documentale",
            solution: "Crittografia AES-256 per storage, firma digitale per integrit\xE0 documenti"
          },
          {
            title: "Ricerca full-text sicura",
            solution: "Elasticsearch con indici crittografati e ricerca su dati sensibili mascherati"
          },
          {
            title: "Compliance normativa",
            solution: "Sistema conforme a normative professionali e conservazione a norma"
          }
        ],
        privacyFeatures: [
          "Crittografia AES-256 per tutti i documenti",
          "Autenticazione multi-fattore obbligatoria",
          "VPN dedicata per accesso remoto",
          "Watermark dinamici sui documenti",
          "Distruzione sicura documenti scaduti"
        ]
      },
      {
        id: 3,
        type: "Dashboard SaaS",
        icon: "fas fa-chart-line",
        title: "Dashboard analytics privacy-first",
        description: "Piattaforma di analytics che non traccia utenti individuali, completamente GDPR-compliant by design.",
        subtitle: "Analytics etico senza cookie di tracciamento",
        fullDescription: "Dashboard di analytics sviluppata per una startup SaaS che voleva un'alternativa etica a Google Analytics. Il sistema raccoglie metriche aggregate senza mai tracciare singoli utenti. Non utilizza cookie, fingerprinting o altre tecniche invasive. Tutti i dati sono aggregati in tempo reale e le informazioni personali vengono automaticamente rimosse.",
        mainTech: ["React", "Go", "ClickHouse", "TimescaleDB"],
        technologies: ["React", "Go", "ClickHouse", "TimescaleDB", "Kafka", "Grafana", "Prometheus"],
        challenges: [
          {
            title: "Analytics senza tracking",
            solution: "Aggregazione in tempo reale con hash one-way per sessioni anonime"
          },
          {
            title: "Performance real-time",
            solution: "Pipeline di streaming con Kafka e database time-series ottimizzati"
          },
          {
            title: "Privacy by design",
            solution: "Nessun dato personale salvato, solo metriche aggregate"
          }
        ],
        privacyFeatures: [
          "Zero cookie di tracciamento",
          "Nessun fingerprinting o tracking cross-site",
          "Dati aggregati in tempo reale",
          "IP anonimizzati automaticamente",
          "Conformit\xE0 GDPR by design"
        ]
      },
      {
        id: 4,
        type: "Mobile App",
        icon: "fas fa-mobile-alt",
        title: "App sanitaria con crittografia E2E",
        description: "Applicazione mobile per gestione dati sanitari con crittografia end-to-end e zero-knowledge architecture.",
        subtitle: "Telemedicina sicura e privata",
        fullDescription: "App mobile sviluppata per una clinica privata che gestisce consultazioni remote e cartelle cliniche digitali. Implementa una zero-knowledge architecture dove nemmeno noi sviluppatori possiamo accedere ai dati dei pazienti. Ogni informazione \xE8 crittografata lato client prima di essere trasmessa. Sistema di backup sicuro con recovery key gestite dal paziente.",
        mainTech: ["React Native", "Node.js", "PostgreSQL", "WebRTC"],
        technologies: ["React Native", "Node.js", "PostgreSQL", "WebRTC", "Signal Protocol", "Jitsi Meet", "MinIO"],
        challenges: [
          {
            title: "Crittografia end-to-end",
            solution: "Implementazione Signal Protocol per messaggistica e file sharing sicuri"
          },
          {
            title: "Videochiamate sicure",
            solution: "WebRTC con server STUN/TURN self-hosted e crittografia DTLS-SRTP"
          },
          {
            title: "Compliance sanitaria",
            solution: "Conformit\xE0 HIPAA/GDPR con audit log e data retention policies"
          }
        ],
        privacyFeatures: [
          "Zero-knowledge architecture",
          "Crittografia E2E per tutti i dati",
          "Videochiamate P2P crittografate",
          "Backup con client-side encryption",
          "Cancellazione sicura dei dati"
        ]
      },
      {
        id: 5,
        type: "E-commerce",
        icon: "fas fa-shopping-cart",
        title: "Piattaforma e-commerce privacy-conscious",
        description: "Shop online che minimizza la raccolta dati e offre checkout anonimo con criptovalute.",
        subtitle: "E-commerce che rispetta la privacy",
        fullDescription: "Piattaforma e-commerce sviluppata per un brand che voleva offrire un'esperienza di acquisto rispettosa della privacy. Il sistema permette acquisti anonimi, supporta pagamenti in criptovaluta, e minimizza la raccolta di dati personali. Analytics interno senza tracciamento, sistema di recensioni anonime verificate, e opzione di cancellazione completa account con un click.",
        mainTech: ["Nuxt.js", "Strapi", "PostgreSQL", "BTCPay"],
        technologies: ["Nuxt.js", "Strapi", "PostgreSQL", "BTCPay Server", "IPFS", "Tor", "Monero"],
        challenges: [
          {
            title: "Pagamenti anonimi",
            solution: "Integrazione BTCPay Server per crypto e gift card anonime"
          },
          {
            title: "Spedizioni private",
            solution: "Sistema di drop-shipping con dati segregati e cancellati post-consegna"
          },
          {
            title: "Anti-fraud senza tracking",
            solution: "Sistema di reputazione basato su proof-of-purchase crittografici"
          }
        ],
        privacyFeatures: [
          "Checkout ospite senza registrazione",
          "Pagamenti in criptovaluta",
          "Dati di spedizione cancellati automaticamente",
          "No tracking o remarketing",
          "Accesso via Tor supportato"
        ]
      },
      {
        id: 6,
        type: "API Platform",
        icon: "fas fa-plug",
        title: "Piattaforma API con data governance",
        description: "Sistema di API management con controllo granulare su data access e privacy compliance automatica.",
        subtitle: "API Gateway con privacy controls integrati",
        fullDescription: "Piattaforma API sviluppata per un'azienda che gestisce dati sensibili di terze parti. Il sistema implementa un API gateway intelligente con data masking automatico, rate limiting per prevenire data scraping, e audit log completo. Ogni richiesta API viene validata contro policy di privacy configurabili e i dati sensibili vengono automaticamente oscurati basandosi sul livello di autorizzazione del chiamante.",
        mainTech: ["Kong", "FastAPI", "Cassandra", "Vault"],
        technologies: ["Kong Gateway", "FastAPI", "Cassandra", "HashiCorp Vault", "OPA", "Jaeger", "Prometheus"],
        challenges: [
          {
            title: "Data masking dinamico",
            solution: "Policy engine con OPA per mascheramento real-time basato su contesto"
          },
          {
            title: "Secret management",
            solution: "Vault per rotazione automatica credenziali e encryption keys"
          },
          {
            title: "Compliance multi-tenant",
            solution: "Policy di privacy per tenant con inheritance e override rules"
          }
        ],
        privacyFeatures: [
          "Data masking automatico per PII",
          "Audit log immutabile di tutti gli accessi",
          "Encryption at rest e in transit",
          "API key rotation automatica",
          "Rate limiting anti-scraping"
        ]
      }
    ]);
    const closeModal = () => {
      isModalOpen.value = false;
      setTimeout(() => {
        selectedProject.value = null;
      }, 300);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kiba-portfolio-spa" }, _attrs))} data-v-2b6f8cb7><div class="container" data-v-2b6f8cb7><div class="kiba-portfolio-header" data-v-2b6f8cb7><div class="kiba-section-label gsap-animate" data-v-2b6f8cb7>Portfolio</div><h2 class="kiba-section-title gsap-animate" data-v-2b6f8cb7> Esempi del nostro lavoro<br data-v-2b6f8cb7><span class="kiba-text-gradient" data-v-2b6f8cb7>Privacy dei clienti sempre rispettata</span></h2><p class="kiba-section-subtitle gsap-animate" data-v-2b6f8cb7> I progetti sono presentati in forma anonima per tutelare la riservatezza dei nostri clienti. Nessun dato sensibile, solo la qualit\xE0 del nostro lavoro. </p></div><div class="kiba-portfolio-grid" data-v-2b6f8cb7><!--[-->`);
      ssrRenderList(projects.value, (project) => {
        _push(`<div class="kiba-portfolio-card gsap-animate" data-v-2b6f8cb7><div class="kiba-portfolio-card-header" data-v-2b6f8cb7><div class="kiba-portfolio-card-type" data-v-2b6f8cb7>${ssrInterpolate(project.type)}</div><div class="kiba-portfolio-card-icon" data-v-2b6f8cb7><i class="${ssrRenderClass(project.icon)}" data-v-2b6f8cb7></i></div></div><h3 class="kiba-portfolio-card-title" data-v-2b6f8cb7>${ssrInterpolate(project.title)}</h3><p class="kiba-portfolio-card-description" data-v-2b6f8cb7>${ssrInterpolate(project.description)}</p><div class="kiba-portfolio-card-tags" data-v-2b6f8cb7><!--[-->`);
        ssrRenderList(project.mainTech.slice(0, 3), (tag) => {
          _push(`<span class="kiba-portfolio-card-tag" data-v-2b6f8cb7>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div><div class="kiba-portfolio-card-action" data-v-2b6f8cb7><span data-v-2b6f8cb7>Scopri di pi\xF9</span><i class="fas fa-arrow-right" data-v-2b6f8cb7></i></div></div>`);
      });
      _push(`<!--]--></div><div class="kiba-portfolio-note gsap-animate" data-v-2b6f8cb7><i class="fas fa-shield-alt" data-v-2b6f8cb7></i><p data-v-2b6f8cb7><strong data-v-2b6f8cb7>Privacy First:</strong> Tutti i dettagli sensibili sono stati rimossi. I progetti sono descritti preservando completamente l&#39;anonimato dei clienti. </p></div></div>`);
      _push(ssrRenderComponent(KibaProjectModal, {
        "is-open": isModalOpen.value,
        project: selectedProject.value,
        onClose: closeModal
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaSPAPortfolio.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const KibaSPAPortfolio = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-2b6f8cb7"]]);
const _sfc_main$3 = {
  __name: "KibaSPAContact",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      name: "",
      email: "",
      company: "",
      budget: "",
      message: "",
      privacy: false
    });
    const isSubmitting = ref(false);
    const submitSuccess = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kiba-contact-spa" }, _attrs))} data-v-b62fc3c8><div class="container" data-v-b62fc3c8><div class="text-center mb-5" data-v-b62fc3c8><div class="kiba-section-label gsap-animate" data-v-b62fc3c8>Contatti</div><h2 class="kiba-section-title gsap-animate" data-v-b62fc3c8> Iniziamo a<br data-v-b62fc3c8><span class="kiba-text-gradient" data-v-b62fc3c8>parlare</span></h2><p class="kiba-section-subtitle gsap-animate" data-v-b62fc3c8> Raccontaci il tuo progetto. Nessun impegno, solo una conversazione onesta. </p></div><div class="row" data-v-b62fc3c8><div class="col-lg-7 mb-4 mb-lg-0" data-v-b62fc3c8><div class="kiba-contact-form-wrapper gsap-animate" data-v-b62fc3c8><form class="kiba-contact-form" data-v-b62fc3c8><div class="row" data-v-b62fc3c8><div class="col-md-6 mb-3" data-v-b62fc3c8><label for="name" class="kiba-form-label" data-v-b62fc3c8>Nome *</label><input id="name"${ssrRenderAttr("value", form.name)} type="text" class="kiba-form-input" required placeholder="Il tuo nome" data-v-b62fc3c8></div><div class="col-md-6 mb-3" data-v-b62fc3c8><label for="email" class="kiba-form-label" data-v-b62fc3c8>Email *</label><input id="email"${ssrRenderAttr("value", form.email)} type="email" class="kiba-form-input" required placeholder="email@esempio.com" data-v-b62fc3c8></div></div><div class="mb-3" data-v-b62fc3c8><label for="company" class="kiba-form-label" data-v-b62fc3c8>Azienda</label><input id="company"${ssrRenderAttr("value", form.company)} type="text" class="kiba-form-input" placeholder="Nome azienda (opzionale)" data-v-b62fc3c8></div><div class="mb-3" data-v-b62fc3c8><label for="budget" class="kiba-form-label" data-v-b62fc3c8>Budget indicativo</label><select id="budget" class="kiba-form-select" data-v-b62fc3c8><option value="" data-v-b62fc3c8>Seleziona un range</option><option value="5k-10k" data-v-b62fc3c8>\u20AC5.000 - \u20AC10.000</option><option value="10k-25k" data-v-b62fc3c8>\u20AC10.000 - \u20AC25.000</option><option value="25k-50k" data-v-b62fc3c8>\u20AC25.000 - \u20AC50.000</option><option value="50k+" data-v-b62fc3c8>\u20AC50.000+</option><option value="discuss" data-v-b62fc3c8>Da discutere</option></select></div><div class="mb-3" data-v-b62fc3c8><label for="message" class="kiba-form-label" data-v-b62fc3c8>Messaggio *</label><textarea id="message" class="kiba-form-textarea" required rows="5" placeholder="Descrivi il tuo progetto, esigenze, timeline..." data-v-b62fc3c8>${ssrInterpolate(form.message)}</textarea></div><div class="kiba-form-privacy mb-4" data-v-b62fc3c8><input id="privacy"${ssrIncludeBooleanAttr(Array.isArray(form.privacy) ? ssrLooseContain(form.privacy, null) : form.privacy) ? " checked" : ""} type="checkbox" required class="kiba-form-checkbox" data-v-b62fc3c8><label for="privacy" data-v-b62fc3c8> Acconsento al trattamento dei dati personali secondo la <a href="#" class="kiba-link" data-v-b62fc3c8>Privacy Policy</a></label></div><button type="submit" class="kiba-btn kiba-btn-primary kiba-btn-block"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-b62fc3c8>`);
      if (!isSubmitting.value) {
        _push(`<span data-v-b62fc3c8> Invia messaggio <i class="fas fa-paper-plane ms-2" data-v-b62fc3c8></i></span>`);
      } else {
        _push(`<span data-v-b62fc3c8> Invio in corso... <i class="fas fa-spinner fa-spin ms-2" data-v-b62fc3c8></i></span>`);
      }
      _push(`</button>`);
      if (submitSuccess.value) {
        _push(`<div class="kiba-form-success" data-v-b62fc3c8><i class="fas fa-check-circle" data-v-b62fc3c8></i> Messaggio inviato! Ti risponderemo entro 24 ore. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div></div><div class="col-lg-5" data-v-b62fc3c8><div class="kiba-contact-info gsap-animate" data-v-b62fc3c8><div class="kiba-contact-info-item" data-v-b62fc3c8><div class="kiba-contact-info-icon" data-v-b62fc3c8><i class="fas fa-envelope" data-v-b62fc3c8></i></div><div class="kiba-contact-info-content" data-v-b62fc3c8><h4 data-v-b62fc3c8>Email</h4><a href="mailto:info@kiba.studio" data-v-b62fc3c8>info@kiba.studio</a></div></div><div class="kiba-contact-info-item" data-v-b62fc3c8><div class="kiba-contact-info-icon" data-v-b62fc3c8><i class="fas fa-clock" data-v-b62fc3c8></i></div><div class="kiba-contact-info-content" data-v-b62fc3c8><h4 data-v-b62fc3c8>Risposta</h4><p data-v-b62fc3c8>Entro 24 ore lavorative</p></div></div><div class="kiba-contact-info-item" data-v-b62fc3c8><div class="kiba-contact-info-icon" data-v-b62fc3c8><i class="fas fa-map-marker-alt" data-v-b62fc3c8></i></div><div class="kiba-contact-info-content" data-v-b62fc3c8><h4 data-v-b62fc3c8>Location</h4><p data-v-b62fc3c8>Italia - Lavoriamo in remoto</p></div></div><div class="kiba-contact-values" data-v-b62fc3c8><h4 data-v-b62fc3c8>I nostri valori</h4><div class="kiba-contact-value" data-v-b62fc3c8><i class="fas fa-shield-alt" data-v-b62fc3c8></i><span data-v-b62fc3c8>Privacy dei tuoi dati garantita</span></div><div class="kiba-contact-value" data-v-b62fc3c8><i class="fas fa-handshake" data-v-b62fc3c8></i><span data-v-b62fc3c8>Nessun impegno per la consulenza iniziale</span></div><div class="kiba-contact-value" data-v-b62fc3c8><i class="fas fa-file-contract" data-v-b62fc3c8></i><span data-v-b62fc3c8>Preventivo dettagliato e trasparente</span></div></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaSPAContact.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const KibaSPAContact = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b62fc3c8"]]);
const _sfc_main$2 = {
  __name: "KibaSPAFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const currentYear = computed(() => (/* @__PURE__ */ new Date()).getFullYear());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kiba-footer-spa" }, _attrs))} data-v-e7ee934c><div class="container" data-v-e7ee934c><div class="kiba-footer-brand" data-v-e7ee934c><div class="kiba-footer-logo" data-v-e7ee934c>`);
      _push(ssrRenderComponent(KibaIcon, {
        size: 48,
        variant: "default",
        animated: false
      }, null, _parent));
      _push(`</div><h3 class="kiba-footer-name" data-v-e7ee934c>Kiba.Studio</h3><p class="kiba-footer-payoff" data-v-e7ee934c> Software etico, sicuro e fatto per durare. </p></div><div class="kiba-footer-content" data-v-e7ee934c><div class="row" data-v-e7ee934c><div class="col-md-3 col-6 mb-4 mb-md-0" data-v-e7ee934c><h4 class="kiba-footer-title" data-v-e7ee934c>Servizi</h4><ul class="kiba-footer-links" data-v-e7ee934c><li data-v-e7ee934c><a href="#servizi" data-v-e7ee934c>Web Development</a></li><li data-v-e7ee934c><a href="#servizi" data-v-e7ee934c>App Mobile</a></li><li data-v-e7ee934c><a href="#servizi" data-v-e7ee934c>API &amp; Backend</a></li><li data-v-e7ee934c><a href="#servizi" data-v-e7ee934c>Consulenza</a></li></ul></div><div class="col-md-3 col-6 mb-4 mb-md-0" data-v-e7ee934c><h4 class="kiba-footer-title" data-v-e7ee934c>Azienda</h4><ul class="kiba-footer-links" data-v-e7ee934c><li data-v-e7ee934c><a href="#manifesto" data-v-e7ee934c>Chi Siamo</a></li><li data-v-e7ee934c><a href="#processo" data-v-e7ee934c>Come Lavoriamo</a></li><li data-v-e7ee934c><a href="#stack" data-v-e7ee934c>Tech Stack</a></li><li data-v-e7ee934c><a href="#portfolio" data-v-e7ee934c>Portfolio</a></li></ul></div><div class="col-md-3 col-6" data-v-e7ee934c><h4 class="kiba-footer-title" data-v-e7ee934c>Privacy First</h4><ul class="kiba-footer-links" data-v-e7ee934c><li data-v-e7ee934c><a href="#" data-v-e7ee934c>Privacy Policy</a></li><li data-v-e7ee934c><a href="#" data-v-e7ee934c>Cookie Policy</a></li><li data-v-e7ee934c><a href="#" data-v-e7ee934c>GDPR Compliance</a></li><li data-v-e7ee934c><a href="#" data-v-e7ee934c>Security</a></li></ul></div><div class="col-md-3 col-6" data-v-e7ee934c><h4 class="kiba-footer-title" data-v-e7ee934c>Contatti</h4><div class="kiba-footer-contact" data-v-e7ee934c><a href="mailto:info@kiba.studio" class="kiba-footer-email" data-v-e7ee934c><i class="fas fa-envelope" data-v-e7ee934c></i> info@kiba.studio </a><div class="kiba-footer-social" data-v-e7ee934c><a href="#" aria-label="GitHub" data-v-e7ee934c><i class="fab fa-github" data-v-e7ee934c></i></a><a href="#" aria-label="LinkedIn" data-v-e7ee934c><i class="fab fa-linkedin" data-v-e7ee934c></i></a><a href="#" aria-label="Twitter" data-v-e7ee934c><i class="fab fa-twitter" data-v-e7ee934c></i></a></div></div></div></div></div><div class="kiba-footer-divider" data-v-e7ee934c></div><div class="kiba-footer-bottom" data-v-e7ee934c><p class="kiba-footer-copyright" data-v-e7ee934c> \xA9 ${ssrInterpolate(currentYear.value)} Kiba.Studio. Tutti i diritti riservati. </p><p class="kiba-footer-legal" data-v-e7ee934c> P.IVA 00000000000 | Sviluppato con <span class="kiba-footer-heart" data-v-e7ee934c>\u2665</span> e rispetto per la privacy </p></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaSPAFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const KibaSPAFooter = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e7ee934c"]]);
const _sfc_main$1 = {
  __name: "KibaSPA",
  __ssrInlineRender: true,
  setup(__props) {
    const containerRef = ref(null);
    const heroRef = ref(null);
    const isLoaded = ref(false);
    const currentSectionIndex = ref(0);
    const showBackToTop = ref(false);
    useGSAP();
    const onLoaderComplete = async () => {
      isLoaded.value = true;
      await nextTick();
    };
    const handleNavigation = ({ index, sectionId }) => {
      if (!containerRef.value)
        return;
      const section = document.querySelector(`#${sectionId}`);
      if (!section)
        return;
      {
        section.scrollIntoView({ behavior: "smooth" });
        currentSectionIndex.value = index;
        return;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "kiba-spa-wrapper" }, _attrs))} data-v-5e9eb027>`);
      if (!isLoaded.value) {
        _push(ssrRenderComponent(KibaLoaderGSAP, { onComplete: onLoaderComplete }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(KibaSideNav, {
        "current-section": currentSectionIndex.value,
        onNavigate: handleNavigation
      }, null, _parent));
      _push(ssrRenderComponent(KibaMobileNav, {
        "current-section": currentSectionIndex.value,
        onNavigate: handleNavigation
      }, null, _parent));
      _push(`<main class="kiba-spa-container" data-v-5e9eb027><section id="hero" class="kiba-spa-section" data-v-5e9eb027>`);
      _push(ssrRenderComponent(KibaSPAHero, {
        ref_key: "heroRef",
        ref: heroRef,
        onNavigate: handleNavigation
      }, null, _parent));
      _push(`</section><section id="manifesto" class="kiba-spa-section" data-v-5e9eb027>`);
      _push(ssrRenderComponent(KibaSPAManifesto, null, null, _parent));
      _push(`</section><section id="servizi" class="kiba-spa-section" data-v-5e9eb027>`);
      _push(ssrRenderComponent(KibaSPAServices, null, null, _parent));
      _push(`</section><section id="processo" class="kiba-spa-section" data-v-5e9eb027>`);
      _push(ssrRenderComponent(KibaSPAProcess, { onNavigate: handleNavigation }, null, _parent));
      _push(`</section><section id="stack" class="kiba-spa-section" data-v-5e9eb027>`);
      _push(ssrRenderComponent(KibaSPAStack, null, null, _parent));
      _push(`</section><section id="portfolio" class="kiba-spa-section" data-v-5e9eb027>`);
      _push(ssrRenderComponent(KibaSPAPortfolio, null, null, _parent));
      _push(`</section><section id="contatti" class="kiba-spa-section" data-v-5e9eb027>`);
      _push(ssrRenderComponent(KibaSPAContact, null, null, _parent));
      _push(`</section><section id="footer" class="kiba-spa-section" data-v-5e9eb027>`);
      _push(ssrRenderComponent(KibaSPAFooter, null, null, _parent));
      _push(`</section></main><button style="${ssrRenderStyle(showBackToTop.value ? null : { display: "none" })}" class="kiba-back-to-top" aria-label="Torna in alto" data-v-5e9eb027><i class="fas fa-arrow-up" data-v-5e9eb027></i></button></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaSPA.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const KibaSPA = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5e9eb027"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Kiba.Studio - Web Agency Etica",
      meta: [
        {
          name: "description",
          content: "Kiba.Studio - Software etico fatto per durare. Privacy first, codice pulito, qualit\xE0 senza compromessi. Laravel, Vue.js, Node, Python."
        },
        {
          name: "keywords",
          content: "web agency, sviluppo software, Laravel, Vue.js, Node.js, Python, privacy first, etica digitale"
        },
        {
          property: "og:title",
          content: "Kiba.Studio - Web Agency Etica"
        },
        {
          property: "og:description",
          content: "Software etico fatto per durare. Privacy first, qualit\xE0 senza compromessi."
        },
        {
          property: "og:type",
          content: "website"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(KibaSPA, _attrs, null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-18591c54.mjs.map
