import { unref, useSSRContext, ref, mergeProps, reactive, computed } from 'vue';
import { u as useHead } from './index-88e9f29c.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

const _sfc_main$b = {
  __name: "KibaLoading",
  __ssrInlineRender: true,
  setup(__props) {
    const progress = ref(0);
    const isHidden = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["kiba-loader", { "kiba-loader-hidden": isHidden.value }]
      }, _attrs))} data-v-df406aad><div class="kiba-loader-content" data-v-df406aad><div class="kiba-loader-logo" data-v-df406aad><span class="kiba-loader-text" data-v-df406aad>Kiba</span><span class="kiba-loader-dot" data-v-df406aad>.</span><span class="kiba-loader-text" data-v-df406aad>Studio</span></div><div class="kiba-loader-bar" data-v-df406aad><div class="kiba-loader-progress" style="${ssrRenderStyle({ width: progress.value + "%" })}" data-v-df406aad></div></div><p class="kiba-loader-slogan" data-v-df406aad>Software etico, fatto per durare</p></div></div>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaLoading.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const KibaLoading = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-df406aad"]]);
const _sfc_main$a = {
  __name: "KibaNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    const navbarRef = ref(null);
    const isScrolled = ref(false);
    const isMenuOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        ref_key: "navbarRef",
        ref: navbarRef,
        class: ["navbar navbar-expand-lg kiba-navbar", { "navbar-scrolled": isScrolled.value }]
      }, _attrs))} data-v-66f464fa><div class="container" data-v-66f464fa><a href="#" class="kiba-logo" data-v-66f464fa> Kiba<span data-v-66f464fa>.</span>Studio </a><button class="navbar-toggler" type="button" aria-label="Toggle navigation" data-v-66f464fa><i class="fas fa-bars" data-v-66f464fa></i></button><div class="${ssrRenderClass([{ show: isMenuOpen.value }, "collapse navbar-collapse"])}" data-v-66f464fa><ul class="navbar-nav ms-auto" data-v-66f464fa><li class="nav-item" data-v-66f464fa><a class="nav-link" href="#chi-siamo" data-v-66f464fa> Chi Siamo </a></li><li class="nav-item" data-v-66f464fa><a class="nav-link" href="#servizi" data-v-66f464fa> Servizi </a></li><li class="nav-item" data-v-66f464fa><a class="nav-link" href="#processo" data-v-66f464fa> Processo </a></li><li class="nav-item" data-v-66f464fa><a class="nav-link" href="#tecnologie" data-v-66f464fa> Tecnologie </a></li><li class="nav-item" data-v-66f464fa><a class="nav-link" href="#portfolio" data-v-66f464fa> Portfolio </a></li><li class="nav-item" data-v-66f464fa><a class="nav-link kiba-nav-cta" href="#contatti" data-v-66f464fa> Contattaci </a></li></ul></div></div></nav>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaNavbar.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const KibaNavbar = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-66f464fa"]]);
const _sfc_main$9 = {
  __name: "KibaHeroModel",
  __ssrInlineRender: true,
  setup(__props) {
    const containerRef = ref(null);
    const isLoading = ref(true);
    const hasError = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "containerRef",
        ref: containerRef,
        class: "kiba-model-container"
      }, _attrs))} data-v-4e4522d1>`);
      if (isLoading.value) {
        _push(`<div class="kiba-model-loading" data-v-4e4522d1><div class="kiba-model-spinner" data-v-4e4522d1></div><p data-v-4e4522d1>Caricamento...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (hasError.value) {
        _push(`<div class="kiba-model-fallback" data-v-4e4522d1><div class="kiba-model-fallback-icon" data-v-4e4522d1><i class="fas fa-shield-alt" data-v-4e4522d1></i></div><p data-v-4e4522d1>Kiba.Studio</p><span class="kiba-model-fallback-subtitle" data-v-4e4522d1>Software etico</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaHeroModel.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const KibaHeroModel = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-4e4522d1"]]);
const _sfc_main$8 = {
  __name: "KibaHero",
  __ssrInlineRender: true,
  setup(__props) {
    const modelRef = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "kiba-hero kiba-snap-section" }, _attrs))} data-v-372cfa6a><div class="container" data-v-372cfa6a><div class="row align-items-center" data-v-372cfa6a><div class="col-lg-6 order-2 order-lg-1" data-v-372cfa6a><div class="kiba-hero-content" data-v-372cfa6a><div class="kiba-label kiba-animate-fade-up" style="${ssrRenderStyle({ "--delay": "0.1s" })}" data-v-372cfa6a> Boutique Software House </div><h1 class="kiba-heading-xl mt-20 kiba-animate-fade-up" style="${ssrRenderStyle({ "--delay": "0.2s" })}" data-v-372cfa6a> Kiba<span class="kiba-text-primary" data-v-372cfa6a>.</span>Studio </h1><h2 class="kiba-heading-md mt-10 kiba-animate-fade-up" style="${ssrRenderStyle({ "--delay": "0.3s" })}" data-v-372cfa6a> Software etico, fatto per durare </h2><p class="kiba-subtitle mt-20 kiba-animate-fade-up" style="${ssrRenderStyle({ "--delay": "0.4s" })}" data-v-372cfa6a> Siamo una boutique tecnica che mette <strong data-v-372cfa6a>privacy</strong> e <strong data-v-372cfa6a>qualit\xE0</strong> al primo posto. Il nostro codice \xE8 uno strumento di <strong data-v-372cfa6a>libert\xE0</strong>, non di dipendenza. Come un Akita fedele, proteggiamo il tuo business digitale con rigore e cura artigianale. </p><ul class="kiba-hero-bullets kiba-animate-fade-up" style="${ssrRenderStyle({ "--delay": "0.5s" })}" data-v-372cfa6a><li data-v-372cfa6a><strong data-v-372cfa6a>Privacy first</strong> \u2014 I tuoi dati sono una responsabilit\xE0, non merce </li><li data-v-372cfa6a><strong data-v-372cfa6a>Codice artigianale</strong> \u2014 Laravel, Vue.js, Node, Python </li><li data-v-372cfa6a><strong data-v-372cfa6a>Infrastruttura sicura</strong> \u2014 Docker, DevOps, cloud su misura </li><li data-v-372cfa6a><strong data-v-372cfa6a>Soluzioni durature</strong> \u2014 Scalabili, manutenibili, etiche </li></ul><div class="kiba-hero-cta mt-30 kiba-animate-fade-up" style="${ssrRenderStyle({ "--delay": "0.6s" })}" data-v-372cfa6a><a href="#contatti" class="kiba-btn kiba-btn-primary me-3 mb-3" data-v-372cfa6a> Richiedi consulenza </a><a href="#servizi" class="kiba-btn kiba-btn-secondary mb-3" data-v-372cfa6a> Scopri i servizi </a></div></div></div><div class="col-lg-6 order-1 order-lg-2" data-v-372cfa6a><div class="kiba-hero-model kiba-animate-fade-in" style="${ssrRenderStyle({ "--delay": "0.3s" })}" data-v-372cfa6a>`);
      _push(ssrRenderComponent(KibaHeroModel, {
        ref_key: "modelRef",
        ref: modelRef
      }, null, _parent));
      _push(`</div></div></div></div><div class="kiba-scroll-indicator" data-v-372cfa6a><span data-v-372cfa6a>Scorri</span><div class="kiba-scroll-arrow" data-v-372cfa6a></div></div></section>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaHero.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const KibaHero = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-372cfa6a"]]);
const _sfc_main$7 = {
  __name: "KibaAbout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "chi-siamo",
        class: "kiba-section kiba-section-surface kiba-snap-section"
      }, _attrs))} data-v-faa5a837><div class="container" data-v-faa5a837><div class="row align-items-center" data-v-faa5a837><div class="col-lg-5 mb-5 mb-lg-0" data-v-faa5a837><div class="kiba-about-visual kiba-observe" style="${ssrRenderStyle({ "--delay": "0.2s" })}" data-v-faa5a837><div class="kiba-about-box" data-v-faa5a837><div class="kiba-about-icon" data-v-faa5a837><i class="fas fa-shield-alt" data-v-faa5a837></i></div><h3 class="kiba-heading-sm mt-20" data-v-faa5a837>Kiba</h3><p class="kiba-body mt-10" data-v-faa5a837> &quot;Kiba&quot; in giapponese significa zanna. Come l&#39;Akita, razza nota per lealt\xE0 e protezione incrollabile, noi proteggiamo i tuoi dati e il tuo business digitale con rigore e dedizione. </p><div class="kiba-divider kiba-divider-center mt-20" data-v-faa5a837></div><div class="kiba-about-values mt-20" data-v-faa5a837><div class="kiba-value-item" data-v-faa5a837><i class="fas fa-lock" data-v-faa5a837></i><span data-v-faa5a837>Privacy First</span></div><div class="kiba-value-item" data-v-faa5a837><i class="fas fa-code" data-v-faa5a837></i><span data-v-faa5a837>Codice Etico</span></div><div class="kiba-value-item" data-v-faa5a837><i class="fas fa-infinity" data-v-faa5a837></i><span data-v-faa5a837>Soluzioni Durature</span></div></div><div class="kiba-about-stat mt-25" data-v-faa5a837><span class="kiba-stat-number" data-v-faa5a837>6+</span><span class="kiba-stat-label" data-v-faa5a837>Anni di esperienza</span></div></div></div></div><div class="col-lg-7" data-v-faa5a837><div class="kiba-about-content" data-v-faa5a837><div class="kiba-label kiba-observe kiba-stagger-1" data-v-faa5a837>La Nostra Filosofia</div><h2 class="kiba-heading-lg mt-15 kiba-observe kiba-stagger-2" data-v-faa5a837> Software etico, fatto per durare </h2><div class="kiba-divider kiba-observe kiba-stagger-3" data-v-faa5a837></div><p class="kiba-body mt-20 kiba-observe kiba-stagger-4" data-v-faa5a837><strong data-v-faa5a837>Kiba.Studio</strong> nasce come laboratorio etico di software. Fondata da un fullstack developer con oltre 6 anni di esperienza su <strong data-v-faa5a837>Laravel, Vue.js, Node e Python</strong>, l&#39;agenzia mette al centro i valori che altri trascurano: <strong data-v-faa5a837>privacy, trasparenza e qualit\xE0 senza compromessi</strong>. </p><p class="kiba-body mt-15 kiba-observe kiba-stagger-5" data-v-faa5a837> Non siamo una factory che produce siti in serie. Siamo una <strong data-v-faa5a837>boutique tecnica</strong> che crede nel codice come strumento di <strong data-v-faa5a837>libert\xE0</strong>, non di dipendenza. I tuoi dati sono una responsabilit\xE0 che prendiamo sul serio, non merce da monetizzare. Ogni soluzione che costruiamo \xE8 pensata per <strong data-v-faa5a837>emancipare</strong> il tuo business, non per vincolarlo. </p><p class="kiba-body mt-15 kiba-observe kiba-stagger-6" data-v-faa5a837> Lavoriamo con la <strong data-v-faa5a837>seriet\xE0 giapponese</strong>: ordine, pulizia, struttura, rigore. Il nostro codice parla per noi: testato, documentato, manutenibile. Niente scorciatoie, niente debito tecnico nascosto. Solo soluzioni scalabili, sicure e durature. </p><div class="row mt-30" data-v-faa5a837><div class="col-md-6 kiba-observe kiba-stagger-1" data-v-faa5a837><div class="kiba-about-feature" data-v-faa5a837><i class="fas fa-user-shield kiba-text-primary" data-v-faa5a837></i><h4 class="kiba-heading-sm mt-10" data-v-faa5a837>Privacy First</h4><p class="kiba-small mt-5" data-v-faa5a837> I dati dei tuoi utenti sono una responsabilit\xE0 sacra. Zero tracking invasivo, zero vendita dati. </p></div></div><div class="col-md-6 kiba-observe kiba-stagger-2" data-v-faa5a837><div class="kiba-about-feature" data-v-faa5a837><i class="fas fa-hand-holding-heart kiba-text-primary" data-v-faa5a837></i><h4 class="kiba-heading-sm mt-10" data-v-faa5a837>Tecnologia Etica</h4><p class="kiba-small mt-5" data-v-faa5a837> Software come strumento di emancipazione. Niente dark patterns, niente dipendenza forzata. </p></div></div></div><div class="kiba-ideal-clients mt-30 kiba-observe" data-v-faa5a837><h4 class="kiba-small" data-v-faa5a837><strong data-v-faa5a837>Clienti ideali:</strong> Start-up, PMI e professionisti che cercano qualit\xE0, sicurezza e affidabilit\xE0 \u2014 non progetti &quot;veloci e low-cost&quot;. </h4></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaAbout.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const KibaAbout = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-faa5a837"]]);
const _sfc_main$6 = {
  __name: "KibaServices",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "servizi",
        class: "kiba-section kiba-section-dark"
      }, _attrs))} data-v-4c311969><div class="container" data-v-4c311969><div class="kiba-section-title wow fadeInUp" data-wow-delay=".1s" data-v-4c311969><div class="kiba-label" data-v-4c311969>I Nostri Servizi</div><h2 class="kiba-heading-lg" data-v-4c311969> Soluzioni digitali complete </h2><p class="kiba-subtitle" data-v-4c311969> Dal front-end all&#39;infrastruttura, copriamo ogni aspetto dello sviluppo software moderno. Ecco come possiamo aiutarti. </p></div><div class="row" data-v-4c311969><div class="col-lg-4 col-md-6 mb-4" data-v-4c311969><div class="kiba-card wow fadeInUp" data-wow-delay=".2s" data-v-4c311969><div class="kiba-card-icon" data-v-4c311969><i class="fas fa-laptop-code" data-v-4c311969></i></div><h3 class="kiba-heading-sm" data-v-4c311969>Sviluppo Front-end</h3><p class="kiba-body mt-15" data-v-4c311969> Interfacce moderne, reattive e performanti. Specializziamo in Vue.js, React e architetture SPA/PWA. Ogni componente \xE8 ottimizzato per velocit\xE0 e accessibilit\xE0. </p><ul class="kiba-service-list mt-15" data-v-4c311969><li data-v-4c311969>Single Page Applications (SPA)</li><li data-v-4c311969>Progressive Web Apps (PWA)</li><li data-v-4c311969>UI/UX responsive e accessibile</li><li data-v-4c311969>Ottimizzazione performance</li></ul></div></div><div class="col-lg-4 col-md-6 mb-4" data-v-4c311969><div class="kiba-card wow fadeInUp" data-wow-delay=".3s" data-v-4c311969><div class="kiba-card-icon" data-v-4c311969><i class="fas fa-server" data-v-4c311969></i></div><h3 class="kiba-heading-sm" data-v-4c311969>Sviluppo Back-end</h3><p class="kiba-body mt-15" data-v-4c311969> API robuste e scalabili, architetture a microservizi e gestione database. Costruiamo il cuore tecnologico del tuo prodotto con sicurezza e performance. </p><ul class="kiba-service-list mt-15" data-v-4c311969><li data-v-4c311969>API REST e GraphQL</li><li data-v-4c311969>Microservizi e monoliti modulari</li><li data-v-4c311969>Database SQL e NoSQL</li><li data-v-4c311969>Autenticazione e sicurezza</li></ul></div></div><div class="col-lg-4 col-md-6 mb-4" data-v-4c311969><div class="kiba-card wow fadeInUp" data-wow-delay=".4s" data-v-4c311969><div class="kiba-card-icon" data-v-4c311969><i class="fas fa-cloud" data-v-4c311969></i></div><h3 class="kiba-heading-sm" data-v-4c311969>Gestione Server &amp; Cloud</h3><p class="kiba-body mt-15" data-v-4c311969> Configurazione, deploy e monitoraggio di infrastrutture cloud. Dal singolo VPS alle architetture multi-cloud, gestiamo tutto il ciclo di vita del tuo ambiente. </p><ul class="kiba-service-list mt-15" data-v-4c311969><li data-v-4c311969>Setup e configurazione server</li><li data-v-4c311969>CI/CD e automazione deploy</li><li data-v-4c311969>Monitoring e alerting</li><li data-v-4c311969>Backup e disaster recovery</li></ul></div></div><div class="col-lg-4 col-md-6 mb-4" data-v-4c311969><div class="kiba-card wow fadeInUp" data-wow-delay=".5s" data-v-4c311969><div class="kiba-card-icon" data-v-4c311969><i class="fas fa-robot" data-v-4c311969></i></div><h3 class="kiba-heading-sm" data-v-4c311969>Automazione &amp; Integrazioni</h3><p class="kiba-body mt-15" data-v-4c311969> Elimina le operazioni ripetitive e connetti i tuoi sistemi. Script personalizzati, workflow automatizzati e integrazioni tra piattaforme diverse. </p><ul class="kiba-service-list mt-15" data-v-4c311969><li data-v-4c311969>Script e bot personalizzati</li><li data-v-4c311969>Integrazione API terze parti</li><li data-v-4c311969>Workflow automation</li><li data-v-4c311969>Data sync e ETL</li></ul></div></div><div class="col-lg-4 col-md-6 mb-4" data-v-4c311969><div class="kiba-card wow fadeInUp" data-wow-delay=".6s" data-v-4c311969><div class="kiba-card-icon" data-v-4c311969><i class="fas fa-comments" data-v-4c311969></i></div><h3 class="kiba-heading-sm" data-v-4c311969>Consulenza Tecnica</h3><p class="kiba-body mt-15" data-v-4c311969> Hai bisogno di un parere esperto? Ti aiutiamo a scegliere le tecnologie giuste, valutare architetture e pianificare lo sviluppo del tuo prodotto digitale. </p><ul class="kiba-service-list mt-15" data-v-4c311969><li data-v-4c311969>Analisi requisiti</li><li data-v-4c311969>Scelta stack tecnologico</li><li data-v-4c311969>Code review e refactoring</li><li data-v-4c311969>Formazione team</li></ul></div></div><div class="col-lg-4 col-md-6 mb-4" data-v-4c311969><div class="kiba-card wow fadeInUp" data-wow-delay=".7s" data-v-4c311969><div class="kiba-card-icon" data-v-4c311969><i class="fas fa-project-diagram" data-v-4c311969></i></div><h3 class="kiba-heading-sm" data-v-4c311969>MCP &amp; Architetture</h3><p class="kiba-body mt-15" data-v-4c311969> Progettazione e implementazione di architetture software complesse. Gestiamo la comunicazione tra servizi, orchestrazione e scalabilit\xE0 del sistema. </p><ul class="kiba-service-list mt-15" data-v-4c311969><li data-v-4c311969>Design architetturale</li><li data-v-4c311969>Event-driven architecture</li><li data-v-4c311969>Message queuing</li><li data-v-4c311969>Service mesh</li></ul></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaServices.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const KibaServices = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-4c311969"]]);
const _sfc_main$5 = {
  __name: "KibaProcess",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "processo",
        class: "kiba-section kiba-section-surface"
      }, _attrs))} data-v-c740da7f><div class="container" data-v-c740da7f><div class="kiba-section-title wow fadeInUp" data-wow-delay=".1s" data-v-c740da7f><div class="kiba-label" data-v-c740da7f>Il Nostro Metodo</div><h2 class="kiba-heading-lg" data-v-c740da7f> Come lavoriamo </h2><p class="kiba-subtitle" data-v-c740da7f> Un processo strutturato garantisce risultati prevedibili e di qualit\xE0. Ecco le fasi che seguiamo per ogni progetto. </p></div><div class="row" data-v-c740da7f><div class="col-lg col-md-4 col-sm-6 mb-4" data-v-c740da7f><div class="kiba-process-step wow fadeInUp" data-wow-delay=".2s" data-v-c740da7f><div class="kiba-process-number" data-v-c740da7f>1</div><div class="kiba-process-connector d-none d-lg-block" data-v-c740da7f></div><h4 class="kiba-heading-sm" data-v-c740da7f>Analisi</h4><p class="kiba-small mt-10" data-v-c740da7f> Ascoltiamo le tue esigenze, analizziamo i requisiti e definiamo obiettivi chiari e misurabili. </p></div></div><div class="col-lg col-md-4 col-sm-6 mb-4" data-v-c740da7f><div class="kiba-process-step wow fadeInUp" data-wow-delay=".3s" data-v-c740da7f><div class="kiba-process-number" data-v-c740da7f>2</div><div class="kiba-process-connector d-none d-lg-block" data-v-c740da7f></div><h4 class="kiba-heading-sm" data-v-c740da7f>Progettazione</h4><p class="kiba-small mt-10" data-v-c740da7f> Disegniamo l&#39;architettura tecnica, scegliamo lo stack e pianifichiamo le milestone di sviluppo. </p></div></div><div class="col-lg col-md-4 col-sm-6 mb-4" data-v-c740da7f><div class="kiba-process-step wow fadeInUp" data-wow-delay=".4s" data-v-c740da7f><div class="kiba-process-number" data-v-c740da7f>3</div><div class="kiba-process-connector d-none d-lg-block" data-v-c740da7f></div><h4 class="kiba-heading-sm" data-v-c740da7f>Sviluppo</h4><p class="kiba-small mt-10" data-v-c740da7f> Scriviamo codice pulito, testato e documentato. Aggiornamenti regolari ti tengono informato. </p></div></div><div class="col-lg col-md-6 col-sm-6 mb-4" data-v-c740da7f><div class="kiba-process-step wow fadeInUp" data-wow-delay=".5s" data-v-c740da7f><div class="kiba-process-number" data-v-c740da7f>4</div><div class="kiba-process-connector d-none d-lg-block" data-v-c740da7f></div><h4 class="kiba-heading-sm" data-v-c740da7f>Testing &amp; QA</h4><p class="kiba-small mt-10" data-v-c740da7f> Test automatizzati, code review e controllo qualit\xE0. Nulla va in produzione senza essere verificato. </p></div></div><div class="col-lg col-md-6 col-sm-12 mb-4" data-v-c740da7f><div class="kiba-process-step wow fadeInUp" data-wow-delay=".6s" data-v-c740da7f><div class="kiba-process-number" data-v-c740da7f>5</div><h4 class="kiba-heading-sm" data-v-c740da7f>Delivery &amp; Supporto</h4><p class="kiba-small mt-10" data-v-c740da7f> Deploy in produzione, monitoraggio attivo e supporto continuo. Non ti lasciamo solo dopo il lancio. </p></div></div></div><div class="text-center mt-40 wow fadeInUp" data-wow-delay=".7s" data-v-c740da7f><p class="kiba-body" data-v-c740da7f><i class="fas fa-sync-alt kiba-text-primary me-2" data-v-c740da7f></i><strong data-v-c740da7f>Approccio iterativo:</strong> lavoriamo in sprint brevi con feedback costante, cos\xEC puoi vedere i progressi e correggere la rotta in tempo reale. </p></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaProcess.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const KibaProcess = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-c740da7f"]]);
const _sfc_main$4 = {
  __name: "KibaTechStack",
  __ssrInlineRender: true,
  setup(__props) {
    const frontendTech = ref([
      "Vue.js",
      "Nuxt",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "SCSS",
      "Tailwind CSS",
      "Three.js",
      "PWA"
    ]);
    const backendTech = ref([
      "Node.js",
      "Express",
      "NestJS",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GraphQL",
      "REST API",
      "Prisma",
      "TypeORM"
    ]);
    const devopsTech = ref([
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "GitLab CI",
      "Nginx",
      "Linux",
      "AWS",
      "DigitalOcean",
      "Vercel",
      "Cloudflare",
      "Prometheus",
      "Grafana"
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "tecnologie",
        class: "kiba-section kiba-section-dark"
      }, _attrs))} data-v-d962eb78><div class="container" data-v-d962eb78><div class="kiba-section-title wow fadeInUp" data-wow-delay=".1s" data-v-d962eb78><div class="kiba-label" data-v-d962eb78>Stack Tecnologico</div><h2 class="kiba-heading-lg" data-v-d962eb78> Le tecnologie che padroneggiamo </h2><p class="kiba-subtitle" data-v-d962eb78> Scegliamo sempre lo strumento giusto per il lavoro. Ecco alcune delle tecnologie con cui lavoriamo quotidianamente. </p></div><div class="row" data-v-d962eb78><div class="col-lg-4 mb-4" data-v-d962eb78><div class="kiba-tech-category wow fadeInUp" data-wow-delay=".2s" data-v-d962eb78><h3 class="kiba-heading-sm mb-20" data-v-d962eb78><i class="fas fa-palette kiba-text-primary me-2" data-v-d962eb78></i> Front-end </h3><div class="kiba-tech-tags" data-v-d962eb78><!--[-->`);
      ssrRenderList(frontendTech.value, (tech) => {
        _push(`<span class="kiba-tech-tag" data-v-d962eb78>${ssrInterpolate(tech)}</span>`);
      });
      _push(`<!--]--></div></div></div><div class="col-lg-4 mb-4" data-v-d962eb78><div class="kiba-tech-category wow fadeInUp" data-wow-delay=".3s" data-v-d962eb78><h3 class="kiba-heading-sm mb-20" data-v-d962eb78><i class="fas fa-database kiba-text-primary me-2" data-v-d962eb78></i> Back-end </h3><div class="kiba-tech-tags" data-v-d962eb78><!--[-->`);
      ssrRenderList(backendTech.value, (tech) => {
        _push(`<span class="kiba-tech-tag" data-v-d962eb78>${ssrInterpolate(tech)}</span>`);
      });
      _push(`<!--]--></div></div></div><div class="col-lg-4 mb-4" data-v-d962eb78><div class="kiba-tech-category wow fadeInUp" data-wow-delay=".4s" data-v-d962eb78><h3 class="kiba-heading-sm mb-20" data-v-d962eb78><i class="fas fa-cogs kiba-text-primary me-2" data-v-d962eb78></i> DevOps &amp; Infra </h3><div class="kiba-tech-tags" data-v-d962eb78><!--[-->`);
      ssrRenderList(devopsTech.value, (tech) => {
        _push(`<span class="kiba-tech-tag" data-v-d962eb78>${ssrInterpolate(tech)}</span>`);
      });
      _push(`<!--]--></div></div></div></div><div class="text-center mt-40 wow fadeInUp" data-wow-delay=".5s" data-v-d962eb78><p class="kiba-body" data-v-d962eb78><i class="fas fa-graduation-cap kiba-text-primary me-2" data-v-d962eb78></i><strong data-v-d962eb78>Apprendimento continuo:</strong> il mondo tech evolve rapidamente. Investiamo costantemente nel miglioramento delle nostre competenze per offrirti sempre le soluzioni pi\xF9 moderne e affidabili. </p></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaTechStack.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const KibaTechStack = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-d962eb78"]]);
const _sfc_main$3 = {
  __name: "KibaPortfolio",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "portfolio",
        class: "kiba-section kiba-section-surface"
      }, _attrs))} data-v-3e59eb7d><div class="container" data-v-3e59eb7d><div class="kiba-section-title wow fadeInUp" data-wow-delay=".1s" data-v-3e59eb7d><div class="kiba-label" data-v-3e59eb7d>Portfolio</div><h2 class="kiba-heading-lg" data-v-3e59eb7d> I nostri progetti </h2><p class="kiba-subtitle" data-v-3e59eb7d> Ogni progetto \xE8 un&#39;opportunit\xE0 per dimostrare la nostra competenza tecnica e attenzione ai dettagli. Ecco alcuni esempi del nostro lavoro. </p></div><div class="text-center mb-40 wow fadeInUp" data-wow-delay=".15s" data-v-3e59eb7d><div class="kiba-portfolio-notice" data-v-3e59eb7d><i class="fas fa-info-circle me-2" data-v-3e59eb7d></i><span data-v-3e59eb7d> Case study di esempio \u2014 progetti reali in arrivo </span></div></div><div class="row" data-v-3e59eb7d><div class="col-lg-4 col-md-6 mb-4" data-v-3e59eb7d><div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".2s" data-v-3e59eb7d><div class="kiba-portfolio-image" data-v-3e59eb7d><i class="fas fa-shopping-cart" data-v-3e59eb7d></i></div><div class="kiba-portfolio-content" data-v-3e59eb7d><span class="kiba-portfolio-tag" data-v-3e59eb7d>E-commerce</span><h3 class="kiba-heading-sm" data-v-3e59eb7d> Piattaforma E-commerce B2B </h3><p class="kiba-body mt-10" data-v-3e59eb7d> Sistema di vendita all&#39;ingrosso con gestione inventario in tempo reale, integrazione ERP e dashboard analytics avanzata. </p><div class="kiba-portfolio-tech mt-15" data-v-3e59eb7d><span class="kiba-tech-tag" data-v-3e59eb7d>Vue.js</span><span class="kiba-tech-tag" data-v-3e59eb7d>Node.js</span><span class="kiba-tech-tag" data-v-3e59eb7d>PostgreSQL</span></div></div></div></div><div class="col-lg-4 col-md-6 mb-4" data-v-3e59eb7d><div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".3s" data-v-3e59eb7d><div class="kiba-portfolio-image" data-v-3e59eb7d><i class="fas fa-mobile-alt" data-v-3e59eb7d></i></div><div class="kiba-portfolio-content" data-v-3e59eb7d><span class="kiba-portfolio-tag" data-v-3e59eb7d>PWA</span><h3 class="kiba-heading-sm" data-v-3e59eb7d> App Gestione Prenotazioni </h3><p class="kiba-body mt-10" data-v-3e59eb7d> Progressive Web App per la gestione di appuntamenti con notifiche push, sincronizzazione offline e pagamenti integrati. </p><div class="kiba-portfolio-tech mt-15" data-v-3e59eb7d><span class="kiba-tech-tag" data-v-3e59eb7d>React</span><span class="kiba-tech-tag" data-v-3e59eb7d>Firebase</span><span class="kiba-tech-tag" data-v-3e59eb7d>Stripe</span></div></div></div></div><div class="col-lg-4 col-md-6 mb-4" data-v-3e59eb7d><div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".4s" data-v-3e59eb7d><div class="kiba-portfolio-image" data-v-3e59eb7d><i class="fas fa-chart-line" data-v-3e59eb7d></i></div><div class="kiba-portfolio-content" data-v-3e59eb7d><span class="kiba-portfolio-tag" data-v-3e59eb7d>Dashboard</span><h3 class="kiba-heading-sm" data-v-3e59eb7d> Dashboard Analytics Real-time </h3><p class="kiba-body mt-10" data-v-3e59eb7d> Piattaforma di monitoraggio dati con grafici interattivi, alert automatici e report personalizzabili esportabili in PDF. </p><div class="kiba-portfolio-tech mt-15" data-v-3e59eb7d><span class="kiba-tech-tag" data-v-3e59eb7d>Vue.js</span><span class="kiba-tech-tag" data-v-3e59eb7d>D3.js</span><span class="kiba-tech-tag" data-v-3e59eb7d>WebSocket</span></div></div></div></div><div class="col-lg-4 col-md-6 mb-4" data-v-3e59eb7d><div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".5s" data-v-3e59eb7d><div class="kiba-portfolio-image" data-v-3e59eb7d><i class="fas fa-cogs" data-v-3e59eb7d></i></div><div class="kiba-portfolio-content" data-v-3e59eb7d><span class="kiba-portfolio-tag" data-v-3e59eb7d>Automazione</span><h3 class="kiba-heading-sm" data-v-3e59eb7d> Sistema di Integrazione CRM </h3><p class="kiba-body mt-10" data-v-3e59eb7d> Middleware custom per sincronizzare dati tra CRM, ERP e piattaforma marketing con trasformazioni dati automatiche. </p><div class="kiba-portfolio-tech mt-15" data-v-3e59eb7d><span class="kiba-tech-tag" data-v-3e59eb7d>Python</span><span class="kiba-tech-tag" data-v-3e59eb7d>RabbitMQ</span><span class="kiba-tech-tag" data-v-3e59eb7d>Docker</span></div></div></div></div><div class="col-lg-4 col-md-6 mb-4" data-v-3e59eb7d><div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".6s" data-v-3e59eb7d><div class="kiba-portfolio-image" data-v-3e59eb7d><i class="fas fa-cloud-upload-alt" data-v-3e59eb7d></i></div><div class="kiba-portfolio-content" data-v-3e59eb7d><span class="kiba-portfolio-tag" data-v-3e59eb7d>Cloud Migration</span><h3 class="kiba-heading-sm" data-v-3e59eb7d> Migrazione Infrastruttura AWS </h3><p class="kiba-body mt-10" data-v-3e59eb7d> Migrazione completa di applicazione legacy su cloud AWS con containerizzazione, CI/CD pipeline e monitoring avanzato. </p><div class="kiba-portfolio-tech mt-15" data-v-3e59eb7d><span class="kiba-tech-tag" data-v-3e59eb7d>AWS</span><span class="kiba-tech-tag" data-v-3e59eb7d>Docker</span><span class="kiba-tech-tag" data-v-3e59eb7d>Terraform</span></div></div></div></div><div class="col-lg-4 col-md-6 mb-4" data-v-3e59eb7d><div class="kiba-portfolio-card wow fadeInUp" data-wow-delay=".7s" data-v-3e59eb7d><div class="kiba-portfolio-image" data-v-3e59eb7d><i class="fas fa-users" data-v-3e59eb7d></i></div><div class="kiba-portfolio-content" data-v-3e59eb7d><span class="kiba-portfolio-tag" data-v-3e59eb7d>SaaS</span><h3 class="kiba-heading-sm" data-v-3e59eb7d> Piattaforma HR Management </h3><p class="kiba-body mt-10" data-v-3e59eb7d> Software SaaS per la gestione risorse umane con moduli per presenze, ferie, performance review e onboarding digitale. </p><div class="kiba-portfolio-tech mt-15" data-v-3e59eb7d><span class="kiba-tech-tag" data-v-3e59eb7d>Nuxt</span><span class="kiba-tech-tag" data-v-3e59eb7d>NestJS</span><span class="kiba-tech-tag" data-v-3e59eb7d>MongoDB</span></div></div></div></div></div><div class="text-center mt-40 wow fadeInUp" data-wow-delay=".8s" data-v-3e59eb7d><p class="kiba-body mb-20" data-v-3e59eb7d> Hai un progetto in mente? Parliamone insieme. </p><a href="#contatti" class="kiba-btn kiba-btn-primary" data-v-3e59eb7d> Discutiamo del tuo progetto </a></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaPortfolio.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const KibaPortfolio = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-3e59eb7d"]]);
const _sfc_main$2 = {
  __name: "KibaContact",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    const isSubmitting = ref(false);
    const submitSuccess = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "contatti",
        class: "kiba-section kiba-section-dark"
      }, _attrs))} data-v-32c3fa0e><div class="container" data-v-32c3fa0e><div class="row justify-content-center" data-v-32c3fa0e><div class="col-lg-8" data-v-32c3fa0e><div class="kiba-contact-box wow fadeInUp" data-wow-delay=".2s" data-v-32c3fa0e><div class="kiba-label mb-15" data-v-32c3fa0e>Iniziamo a Collaborare</div><h2 class="kiba-heading-lg" data-v-32c3fa0e> Hai un progetto in mente? </h2><div class="kiba-divider kiba-divider-center" data-v-32c3fa0e></div><p class="kiba-subtitle mt-20" data-v-32c3fa0e> Che si tratti di un piccolo progetto pilota o di una piattaforma complessa, siamo qui per ascoltarti. Raccontaci la tua idea e troviamo insieme la soluzione migliore. </p><form class="kiba-contact-form mt-40" data-v-32c3fa0e><div class="row" data-v-32c3fa0e><div class="col-md-6 mb-20" data-v-32c3fa0e><input${ssrRenderAttr("value", form.name)} type="text" class="kiba-input" placeholder="Il tuo nome" required data-v-32c3fa0e></div><div class="col-md-6 mb-20" data-v-32c3fa0e><input${ssrRenderAttr("value", form.email)} type="email" class="kiba-input" placeholder="La tua email" required data-v-32c3fa0e></div></div><div class="mb-20" data-v-32c3fa0e><input${ssrRenderAttr("value", form.subject)} type="text" class="kiba-input" placeholder="Oggetto (es. Nuovo progetto e-commerce)" data-v-32c3fa0e></div><div class="mb-20" data-v-32c3fa0e><textarea class="kiba-input" placeholder="Raccontaci il tuo progetto... Quali sono gli obiettivi? Che problema vuoi risolvere?" rows="5" required data-v-32c3fa0e>${ssrInterpolate(form.message)}</textarea></div><button type="submit" class="kiba-btn kiba-btn-primary"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-32c3fa0e>`);
      if (!isSubmitting.value) {
        _push(`<span data-v-32c3fa0e><i class="fas fa-paper-plane me-2" data-v-32c3fa0e></i> Invia Messaggio </span>`);
      } else {
        _push(`<span data-v-32c3fa0e><i class="fas fa-spinner fa-spin me-2" data-v-32c3fa0e></i> Invio in corso... </span>`);
      }
      _push(`</button></form>`);
      if (submitSuccess.value) {
        _push(`<div class="kiba-success-message mt-20" data-v-32c3fa0e><i class="fas fa-check-circle me-2" data-v-32c3fa0e></i> Grazie! Il tuo messaggio \xE8 stato inviato. Ti risponderemo presto. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="kiba-contact-info mt-40" data-v-32c3fa0e><div class="row" data-v-32c3fa0e><div class="col-md-4 mb-3" data-v-32c3fa0e><div class="kiba-contact-info-item" data-v-32c3fa0e><i class="fas fa-envelope kiba-text-primary" data-v-32c3fa0e></i><span data-v-32c3fa0e>info@kiba.studio</span></div></div><div class="col-md-4 mb-3" data-v-32c3fa0e><div class="kiba-contact-info-item" data-v-32c3fa0e><i class="fas fa-clock kiba-text-primary" data-v-32c3fa0e></i><span data-v-32c3fa0e>Risposta entro 24h</span></div></div><div class="col-md-4 mb-3" data-v-32c3fa0e><div class="kiba-contact-info-item" data-v-32c3fa0e><i class="fas fa-handshake kiba-text-primary" data-v-32c3fa0e></i><span data-v-32c3fa0e>Consulenza gratuita</span></div></div></div></div><p class="kiba-small mt-30" data-v-32c3fa0e><i class="fas fa-lightbulb kiba-text-primary me-2" data-v-32c3fa0e></i><strong data-v-32c3fa0e>Anche per piccoli progetti:</strong> non esitare a contattarci anche per progetti pilota o consulenze brevi. Ogni collaborazione inizia con una conversazione. </p></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaContact.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const KibaContact = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-32c3fa0e"]]);
const _sfc_main$1 = {
  __name: "KibaFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const currentYear = computed(() => (/* @__PURE__ */ new Date()).getFullYear());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "kiba-footer" }, _attrs))} data-v-5a29aad1><div class="container" data-v-5a29aad1><div class="row" data-v-5a29aad1><div class="col-lg-4 mb-4 mb-lg-0" data-v-5a29aad1><div class="kiba-footer-brand" data-v-5a29aad1><a href="#" class="kiba-logo" data-v-5a29aad1> Kiba<span data-v-5a29aad1>.</span>Studio </a><p class="kiba-body mt-20" data-v-5a29aad1> Sviluppo software su misura con precisione tecnica e cura artigianale. Come un Akita fedele, proteggiamo e rafforziamo il tuo business digitale. </p><div class="kiba-footer-social mt-20" data-v-5a29aad1><a href="https://github.com/kibastudio" target="_blank" rel="noopener" aria-label="GitHub" data-v-5a29aad1><i class="fab fa-github" data-v-5a29aad1></i></a><a href="https://linkedin.com/company/kibastudio" target="_blank" rel="noopener" aria-label="LinkedIn" data-v-5a29aad1><i class="fab fa-linkedin-in" data-v-5a29aad1></i></a><a href="https://twitter.com/kibastudio" target="_blank" rel="noopener" aria-label="Twitter" data-v-5a29aad1><i class="fab fa-twitter" data-v-5a29aad1></i></a></div></div></div><div class="col-lg-4 col-md-6 mb-4 mb-lg-0" data-v-5a29aad1><div class="kiba-footer-links" data-v-5a29aad1><h4 class="kiba-heading-sm mb-20" data-v-5a29aad1>Link Rapidi</h4><ul data-v-5a29aad1><li data-v-5a29aad1><a href="#chi-siamo" data-v-5a29aad1>Chi Siamo</a></li><li data-v-5a29aad1><a href="#servizi" data-v-5a29aad1>Servizi</a></li><li data-v-5a29aad1><a href="#processo" data-v-5a29aad1>Il Nostro Processo</a></li><li data-v-5a29aad1><a href="#tecnologie" data-v-5a29aad1>Stack Tecnologico</a></li><li data-v-5a29aad1><a href="#portfolio" data-v-5a29aad1>Portfolio</a></li><li data-v-5a29aad1><a href="#contatti" data-v-5a29aad1>Contattaci</a></li></ul></div></div><div class="col-lg-4 col-md-6" data-v-5a29aad1><div class="kiba-footer-contact" data-v-5a29aad1><h4 class="kiba-heading-sm mb-20" data-v-5a29aad1>Contatti</h4><ul data-v-5a29aad1><li data-v-5a29aad1><i class="fas fa-envelope kiba-text-primary me-2" data-v-5a29aad1></i><a href="mailto:info@kiba.studio" data-v-5a29aad1>info@kiba.studio</a></li><li data-v-5a29aad1><i class="fas fa-globe kiba-text-primary me-2" data-v-5a29aad1></i><a href="https://kiba.studio" target="_blank" data-v-5a29aad1> www.kiba.studio </a></li><li data-v-5a29aad1><i class="fas fa-map-marker-alt kiba-text-primary me-2" data-v-5a29aad1></i><span data-v-5a29aad1>Italia - Remote First</span></li></ul><div class="kiba-footer-badges mt-20" data-v-5a29aad1><span class="kiba-badge" data-v-5a29aad1><i class="fas fa-check-circle me-1" data-v-5a29aad1></i> P.IVA Attiva </span><span class="kiba-badge" data-v-5a29aad1><i class="fas fa-shield-alt me-1" data-v-5a29aad1></i> GDPR Compliant </span></div></div></div></div><div class="kiba-footer-bottom" data-v-5a29aad1><div class="row align-items-center" data-v-5a29aad1><div class="col-md-6 text-center text-md-start mb-2 mb-md-0" data-v-5a29aad1><p class="mb-0" data-v-5a29aad1> \xA9 ${ssrInterpolate(currentYear.value)} Kiba.Studio. Tutti i diritti riservati. </p></div><div class="col-md-6 text-center text-md-end" data-v-5a29aad1><p class="mb-0" data-v-5a29aad1> Sviluppato con <i class="fas fa-heart kiba-text-primary" data-v-5a29aad1></i> e tanta caffeina </p></div></div></div></div></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Kiba/KibaFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const KibaFooter = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5a29aad1"]]);
const _sfc_main = {
  __name: "home-kiba",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      titleTemplate: `%s - Kiba.Studio`,
      title: "Software Etico su Misura",
      meta: [
        { name: "description", content: "Kiba.Studio - Boutique di sviluppo software etico. Privacy first, codice artigianale, soluzioni durature. Laravel, Vue.js, Node, Python." },
        { name: "keywords", content: "sviluppo software, web agency, Laravel, Vue.js, Node.js, Python, privacy, etico, Italia" },
        { property: "og:title", content: "Kiba.Studio - Software Etico su Misura" },
        { property: "og:description", content: "Boutique tecnica specializzata in software etico, privacy-first e soluzioni durature." }
      ],
      link: [
        {
          rel: "stylesheet",
          href: "/assets/css/kiba-theme.css"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(KibaLoading), null, null, _parent));
      _push(ssrRenderComponent(unref(KibaNavbar), null, null, _parent));
      _push(`<div class="kiba-scroll-container">`);
      _push(ssrRenderComponent(unref(KibaHero), null, null, _parent));
      _push(ssrRenderComponent(unref(KibaAbout), null, null, _parent));
      _push(ssrRenderComponent(unref(KibaServices), null, null, _parent));
      _push(ssrRenderComponent(unref(KibaProcess), null, null, _parent));
      _push(ssrRenderComponent(unref(KibaTechStack), null, null, _parent));
      _push(ssrRenderComponent(unref(KibaPortfolio), null, null, _parent));
      _push(ssrRenderComponent(unref(KibaContact), null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(KibaFooter), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/homepage/home-kiba.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=home-kiba-57315bee.mjs.map
