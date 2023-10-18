"use strict";
self["webpackHotUpdatefls_start"]("home",{

/***/ "./repo/js/libs/logger.js":
/*!********************************!*\
  !*** ./repo/js/libs/logger.js ***!
  \********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debug: function() { return /* binding */ debug; },
/* harmony export */   error: function() { return /* binding */ error; },
/* harmony export */   log: function() { return /* binding */ log; }
/* harmony export */ });
const onlyErrorsToConsole = true;
const consoleLogs = true;
const consoleDebug = true;
const alertOnError = false;
const alertOnLog = false;
function log() {
  if (!onlyErrorsToConsole) {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (consoleLogs) console.log(...args);
    if (alertOnLog) alert(args.join(" :: "));
  }
}
function debug() {
  if (!onlyErrorsToConsole && consoleDebug) console.debug(...arguments);
}
function error() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (!onlyErrorsToConsole && consoleDebug) console.error(...args);
  if (alertOnError) alert(args.join(" :: "));
}

/***/ }),

/***/ "./src/js/pages/home/index.js":
/*!************************************!*\
  !*** ./src/js/pages/home/index.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/ModuleManager/index.js */ "./src/js/shared/ModuleManager/index.js");
/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store/index.js */ "./src/js/pages/home/store/index.js");
/* harmony import */ var _sliders_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sliders.js */ "./src/js/pages/home/sliders.js");
/* harmony import */ var _shared_contactForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/contactForm.js */ "./src/js/shared/contactForm.js");
/* harmony import */ var _shared_services_employees_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/employees.js */ "./src/js/shared/services/employees.js");
/* harmony import */ var _repo_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../repo/js/libs/logger.js */ "./repo/js/libs/logger.js");






(0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
const entry = (context, module) => {
  const {
    pageStore,
    events
  } = context;
  pageStore.on("update", _ref => {
    let {
      state,
      prevState
    } = _ref;
    return console.log(state, prevState);
  });
  if (document.readyState === "interactive") {
    onDomReady();
  } else {
    window.addEventListener("DOMContentLoaded", onDomReady);
  }
  function onDomReady(event) {
    try {
      (0,_sliders_js__WEBPACK_IMPORTED_MODULE_2__.initTeamSelectSlider)(pageStore, events);
      (0,_sliders_js__WEBPACK_IMPORTED_MODULE_2__.initTeamatesSliders)(pageStore, events);
      initNavToProfile(pageStore, events);
      (0,_shared_contactForm_js__WEBPACK_IMPORTED_MODULE_3__.initContactForm)("main-contact-form", pageStore, events);
      (0,_shared_contactForm_js__WEBPACK_IMPORTED_MODULE_3__.initContactForm)("cv-request-contact-form", pageStore, events);
      initEmloyeeView(pageStore, events);
      initDepartmentView(pageStore, events);
      initDepartmentsFilter(pageStore, events);
    } catch (ex) {
      (0,_repo_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_5__.error)(ex);
    }
  }
};
const page = new _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__.Module({
  name: "page",
  entry: entry,
  required: ["events", "commonStore", "pageStore"]
});
_shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(page);
function initNavToProfile(store, events) {
  $("#teamates-list-wrapper").on("click", _ref2 => {
    let {
      target
    } = _ref2;
    const $header = $("header");
    const $profile = $("#profile");
    if (!target.classList.contains("teamate-card__btn") && !target.closest(".teamate-card__btn")) return;
    const profileBcr = $profile.get(0).getBoundingClientRect();
    const headerHeight = $header.outerHeight();
    window.scrollTo({
      top: window.scrollY + profileBcr.top - headerHeight,
      behavior: "smooth"
    });
  });
}
function initEmloyeeView(store, events) {
  const $profileWrapper = $("#profile-main");
  const profileTemplate = $("#employee-profile-template").html();
  const $skillsRatesWrapper = $("#profile-skills-rates");
  const skillsRatesTemplate = $("#employee-skills-rates-template").html();
  const $tagsCloudWrapper = $("#profile-tags-cloud");
  const tagsCloudTemplate = $("#employee-tags-cloud-template").html();
  Mustache.parse(profileTemplate);
  Mustache.parse(skillsRatesTemplate);
  Mustache.parse(tagsCloudTemplate);
  $profileWrapper.on("click", _ref3 => {
    let {
      target
    } = _ref3;
    if (target.classList.contains("profile__download-btn") || target.closest(".profile__download-btn")) {
      drawers.open("cv-request-form", target);
    }
  });
  store.on("update", _ref4 => {
    let {
      state,
      prevState
    } = _ref4;
    if (state.selectedEmployeeIdx === prevState.selectedEmployeeIdx && state.employees === prevState.employees) return;
    const {
      status,
      data
    } = state.employees;
    if (data.length === 0) return;
    const {
      selectedEmployeeIdx
    } = state;
    const selectedEmployeeData = data[selectedEmployeeIdx];
    console.log(selectedEmployeeData);
    const title = selectedEmployeeData.title.rendered;
    renderProfile(status, selectedEmployeeData, title);
    const activeSlideElem = document.querySelector(".swiper-slide-active");
    console.log(activeSlideElem);
    const titleFromSlide = activeSlideElem.getAttribute("data-title");
    document.querySelector(".profile__title").textContent = titleFromSlide;
    renderSkillsRates(status, selectedEmployeeData.crb_skills_list);
    renderTagsCloud(status, selectedEmployeeData);
  });
  function renderProfile(status, data, title) {
    $profileWrapper.html(Mustache.render(profileTemplate, {
      ...data,
      title
    }));
  }
  function renderSkillsRates(status, data) {
    const finalizedData = data.map(_ref5 => {
      let {
        crb_name,
        crb_rate
      } = _ref5;
      return {
        crb_name,
        crb_rate: new Array(crb_rate)
      };
    });
    $skillsRatesWrapper.html(Mustache.render(skillsRatesTemplate, finalizedData));
  }
  function renderTagsCloud(status, _ref6) {
    let {
      crb_main_message,
      crb_tags_cloud
    } = _ref6;
    const sectionCut = 360 / crb_tags_cloud.length;
    const generateDegreeOffset = () => -sectionCut * 0.1 + sectionCut * 0.2 * Math.random();
    const finalizedData = {
      crb_main_message,
      crb_tags_cloud: crb_tags_cloud.map((tags, idx) => {
        const thisSectionCut = idx * sectionCut;
        return {
          ...tags,
          "placing-degree": `${thisSectionCut + generateDegreeOffset()}deg`,
          "distance-shift": `${-0.05 + 0.1 * Math.random()}`
        };
      })
    };
    console.log(finalizedData);
    $tagsCloudWrapper.html(Mustache.render(tagsCloudTemplate, finalizedData));
  }
}
function initDepartmentView(store, events) {
  const $wrapper = $("#teamates-list-wrapper");
  const template = $("#employee-card-template").html();
  Mustache.parse(template);
  store.on("update", _ref7 => {
    let {
      state,
      prevState
    } = _ref7;
    if (state.employees === prevState.employees) return;
    const {
      status,
      data
    } = state.employees;
    render(status, data);
  });
  store.on("update", _ref8 => {
    let {
      state,
      prevState
    } = _ref8;
    if (state.selectedDepartmentId === prevState.selectedDepartmentId) return;
    (0,_shared_services_employees_js__WEBPACK_IMPORTED_MODULE_4__.fetchDepartmentEmployees)(state.selectedDepartmentId);
  });
  const {
    status,
    data
  } = store.state.employees;
  render(status, data);
  function render(status, data) {
    $wrapper.html(Mustache.render(template, data));
    events.emit("slideToFirstEmployee");
  }
}
async function initDepartmentsFilter(store, events) {
  let activeElem = null;
  const $wrapper = $("#department-select-wrapper");
  store.on("update", _ref9 => {
    let {
      state,
      prevState
    } = _ref9;
    if (state.departments === prevState.departments) return;
    const {
      status,
      data
    } = state.departments;
    render(status, data);
    const firstElem = $wrapper.find("[data-id]").first().get(0);
    if (firstElem) setActive(firstElem);
  });
  (0,_shared_services_employees_js__WEBPACK_IMPORTED_MODULE_4__.fetchDepartments)();
  $wrapper.on("click", _ref10 => {
    let {
      target
    } = _ref10;
    if (!target.hasAttribute("data-id")) return;
    setActive(target);
  });
  function setActive(elem) {
    if (activeElem === elem) return;
    if (activeElem) {
      activeElem.classList.remove("active");
    }
    const departmentId = elem.getAttribute("data-id");
    store.update(state => {
      return {
        ...state,
        selectedDepartmentId: departmentId
      };
    });
    elem.classList.add("active");
    activeElem = elem;
  }
  function render(status, data) {
    $wrapper.html(preserve(status, data));
  }
  function preserve(status, data) {
    return data.map(item => `<div class="swiper-slide">
															<div class="text-link section-nav__btn" data-slug="${item.slug}" data-id="${item.id}">${item.html_representation}</div>
														</div>`).join("");
  }
}

/***/ }),

/***/ "./src/js/pages/home/sliders.js":
/*!**************************************!*\
  !*** ./src/js/pages/home/sliders.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initTeamSelectSlider: function() { return /* binding */ initTeamSelectSlider; },
/* harmony export */   initTeamatesSliders: function() { return /* binding */ initTeamatesSliders; }
/* harmony export */ });
/* harmony import */ var _repo_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../repo/js/libs/logger.js */ "./repo/js/libs/logger.js");

function initTeamSelectSlider() {
  const teamatesSliders = new Swiper("#team-select-slider", {
    observer: true,
    resizeObserver: true,
    slidesPerView: "auto",
    grabCursor: true,
    centeredSlides: true,
    breakpoints: {
      420: {
        centeredSlides: false
      }
    }
  });
}
function initTeamatesSliders(store, events) {
  (0,_repo_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_0__.log)("initTeamatesSliders");
  const currentSlideNumberElem = document.querySelector("#teamates-slider-counter .teamates-slider__current");
  const totalSlidesNumberElem = document.querySelector("#teamates-slider-counter .teamates-slider__total");
  const slider = new Swiper("#teamates-slider", {
    observer: true,
    resizeObserver: true,
    slidesPerView: "auto",
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 40,
      stretch: 350,
      depth: 300,
      modifier: 0.65,
      slideShadows: false
    },
    autoplay: {
      delay: 3000
    },
    navigation: {
      prevEl: "#teamates-slider-prev",
      nextEl: "#teamates-slider-next"
    },
    // pagination: {
    // 	clickable: true,
    // 	el: "#teamates-slider-pagination"
    // },
    breakpoints: {
      1024: {
        coverflowEffect: {
          rotate: 40,
          stretch: 500,
          depth: 400,
          modifier: 0.65,
          slideShadows: false
        }
      }
    },
    on: {
      slideChange: function () {
        const slides = this.slides;
        const activeSlide = this.activeIndex;
        slides.forEach((slide, index) => {
          const position = index - activeSlide;
          slide.setAttribute("data-slide-position", position);
        });
        const [activeSlideElem] = findActiveSlide(slides);
        processSlideChange(activeSlideElem);
        updateProfileSectionFromSlide(activeSlideElem);
      },
      afterInit: swiper => {
        initSelectByClick(swiper);
        const slides = getSlides(swiper);
        setSlidesIdx(slides);
        setTotal(slides);
        const [activeSlideElem] = findActiveSlide(slides);
        processSlideChange(activeSlideElem);
      },
      observerUpdate: swiper => {
        const slides = getSlides(swiper);
        setSlidesIdx(slides);
        setTotal(slides); // Можно было бы заморочиться, и перерисовывать это значение по рендеру, а не по каждой перестройке DOM, что значит, по каждой смене слайда
        setTimeout(() => {
          const [activeSlideElem] = findActiveSlide(slides);
          processSlideChange(activeSlideElem);
        }, 300);
      },
      slideChangeTransitionStart: swiper => {
        setTimeout(() => {
          const slides = getSlides(swiper);
          const [activeSlideElem, activeSlideIdx] = findActiveSlide(slides);
          setSlidesOrder(slides, activeSlideElem, activeSlideIdx);
          processSlideChange(activeSlideElem);
        }, 300);
      }
    }
  });
  events.on("slideToFirstEmployee", () => {
    slider.slideTo(0, 300);
    setSelectedEmployee(0);
  });
  function processSlideChange(activeSlideElem) {
    if (activeSlideElem) {
      const cardIdx = Number(activeSlideElem.getAttribute("data-card-idx"));
      updateActiveSlideNumber(cardIdx + 1);
      setSelectedEmployee(cardIdx);
      updateProfileSectionFromSlide(activeSlideElem);
    }
  }
  function updateProfileSectionFromSlide(activeSlideElem) {
    console.log(activeSlideElem);
    // const title = activeSlideElem.getAttribute("data-title");
    // updateProfileSection(title);
  }

  function setSelectedEmployee(idx) {
    store.update(state => {
      return {
        ...state,
        selectedEmployeeIdx: idx
      };
    });
  }
  function initSelectByClick(swiper) {
    swiper.wrapperEl.addEventListener("click", _ref => {
      let {
        target
      } = _ref;
      if (!target.classList.contains("teamate-card__btn") && !target.closest(".teamate-card__btn")) return;
      const slideRootElem = target.closest(".swiper-slide");
      swiper.slideTo(slideRootElem.getAttribute("data-slide-idx"), 300);
    });
  }
  function setTotal(slides) {
    totalSlidesNumberElem.textContent = slides.length;
  }
  function updateActiveSlideNumber(number) {
    currentSlideNumberElem.textContent = number;
  }
  function getSlides(swiper) {
    return [...swiper.wrapperEl.querySelectorAll(".swiper-slide")];
  }
  function findActiveSlide(slides) {
    const activeSlideIdx = slides.findIndex(elem => elem.classList.contains("swiper-slide-active"));
    return [slides[activeSlideIdx], activeSlideIdx];
  }
  // Нужно вызывать каждый раз при обновлении DOM
  function setSlidesIdx(slides) {
    if (slides.length < 1) return;
    slides.forEach((elem, idx) => elem.setAttribute("data-slide-idx", idx));
  }
  // Нужно вызывать каждый раз при обновлении DOM или изменении активного слайда
  function setSlidesOrder(slides, activeSlideElem, activeSlideIdx) {
    if (slides.length < 1 || !activeSlideElem) return;
    activeSlideElem.setAttribute("data-slide-position", 0);
    const recalcDepth = Math.min(5, Math.ceil((slides.length - 1) / 2));
    const leftEdgeIdx = Math.max(0, activeSlideIdx - recalcDepth);
    const rightEdgeIdx = Math.min(slides.length, activeSlideIdx + recalcDepth + 1);
    slides.slice(leftEdgeIdx, activeSlideIdx).reverse().forEach((elem, idx) => {
      elem.setAttribute("data-slide-position", -1 - idx);
    });
    slides.slice(activeSlideIdx + 1, rightEdgeIdx).forEach((elem, idx) => {
      elem.setAttribute("data-slide-position", 1 + idx);
    });
  }
}

/***/ }),

/***/ "./src/js/pages/home/store/index.js":
/*!******************************************!*\
  !*** ./src/js/pages/home/store/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: function() { return /* binding */ init; }
/* harmony export */ });
/* harmony import */ var _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/ModuleManager/index.js */ "./src/js/shared/ModuleManager/index.js");
/* harmony import */ var _shared_store_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/store/index.js */ "./src/js/shared/store/index.js");


const initialState = {
  departments: {
    status: "idle",
    data: []
  },
  selectedEmployeeIdx: null,
  selectedDepartmentId: null,
  employees: {
    status: "idle",
    data: []
  }
};
const init = () => {
  const module = new _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__.Module({
    name: "pageStore",
    entry: () => new _shared_store_index_js__WEBPACK_IMPORTED_MODULE_1__.Store(initialState)
  });
  _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(module);
};
/* harmony default export */ __webpack_exports__["default"] = (init);

/***/ }),

/***/ "./src/js/shared/ModuleManager/errors.js":
/*!***********************************************!*\
  !*** ./src/js/shared/ModuleManager/errors.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainScopeIsBusyError: function() { return /* binding */ MainScopeIsBusyError; },
/* harmony export */   ModuleIsNotReadyToUseError: function() { return /* binding */ ModuleIsNotReadyToUseError; }
/* harmony export */ });
class MainScopeIsBusyError extends Error {
  constructor() {
    super("Main scope variable is busy");
  }
}
class ModuleIsNotReadyToUseError extends Error {
  constructor(_ref) {
    let {
      name
    } = _ref;
    super(`Module Is Not Ready To Use: ${name}`);
  }
}

/***/ }),

/***/ "./src/js/shared/ModuleManager/index.js":
/*!**********************************************!*\
  !*** ./src/js/shared/ModuleManager/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Module: function() { return /* binding */ Module; },
/* harmony export */   ModuleManager: function() { return /* binding */ ModuleManager; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/js/shared/utils.js");
/* harmony import */ var _logger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger/index.js */ "./src/js/shared/logger/index.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors.js */ "./src/js/shared/ModuleManager/errors.js");
/* harmony import */ var _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../patterns/EventEmitter.js */ "./src/js/shared/patterns/EventEmitter.js");




const initialStruct = {
  __app__: true,
  context: {},
  registered: new Map(),
  ready: new Map(),
  dependencies: {}
};
class Module extends _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(props) {
    super();
    (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.debug)(`Construct module > props: ${JSON.stringify(props)}`, ` Module: ${JSON.stringify(this)};`);
    this.state = {
      registered: false,
      ready: false
    };
    Object.assign(this, props);
    const {
      name,
      entry,
      required,
      cleanup
    } = props;
  }
  get ready() {
    return this.state.ready;
  }
  set ready(value) {
    this.state.ready = value;
    this.emit("ready", this);
  }
  get registered() {
    return this.state.registered;
  }
  set registered(value) {
    this.state.registered = value;
  }
  init(context) {
    (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.debug)(`Init module > context: ${context}`, ` Module: ${this};`);
    if (!this.registered) return (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.warn)("Module is unregistered");
    this.context = this.entry(context);
    this.ready = true;
  }
  detouch() {
    (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.debug)(`Detouch module;`, ` Module: ${this};`);
    if (!this.registered) return (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.warn)("Module is unregistered");
    if (this.ready) {
      this.ready = false;
      this.cleanup();
    }
    this.registered = false;
  }
}
class ModuleManager extends _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor() {
    super();
    if (window.__app__ === undefined) {
      Object.assign(this, initialStruct);
      window.__app__ = this;
    } else {
      if (window.__app__.__app__) {
        return window.__app__;
      } else {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_2__.MainScopeIsBusyError();
      }
    }
  }
  isReady(target) {
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(target) ? this.ready.has(target) : target.every(item => this.ready.has(item));
  }
  isRegistered(target) {
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(target) ? this.registered.has(target) : target.every(item => this.registered.has(item));
  }
  setAsReady(module) {
    this.context[module.name] = module.context;
    this.ready.set(module.name, module);
    this.emit("ready", module);
  }
  setAsRegistered(module) {
    this.registered.set(module.name, module);
  }
  addDependencies(srcName, target) {
    const add = targetName => {
      if (targetName in this.dependencies) {
        this.dependencies[targetName].add(srcName);
      } else {
        this.dependencies[targetName] = new Set(srcName);
      }
    };
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(target) ? add(target) : target.forEach(item => add(item));
  }
  removeDependencies(srcName, target) {
    const remove = targetName => {
      if (targetName in this.dependencies) {
        this.dependencies[targetName].remove(srcName);
      }
    };
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(target) ? remove(target) : target.forEach(item => remove(item));
  }
  hasReferences(name) {
    return this.getReferences(name)?.size;
  }
  getReferences(name) {
    return this.dependencies[name];
  }
  get(name) {
    return this.registered.get(name);
  }
  use(name) {
    if (!this.isReady(name)) throw new _errors_js__WEBPACK_IMPORTED_MODULE_2__.ModuleIsNotReadyToUseError(module);
    return this.context[name];
  }
  add(module) {
    if (this.isRegistered(module.name)) return (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.warn)(`The module is already registered: ${module.name}`);
    module.on("ready", () => this.setAsReady(module));
    if (module.required) this.addDependencies(module.name, module.required);
    module.on("beforeDetouch", () => this.setAsReady(module));
    module.registered = true;
    this.setAsRegistered(module);
    if (!module.required || this.isReady(module.required)) {
      module.init(this.context);
    } else {
      this.on("ready", _ref => {
        let {
          name
        } = _ref;
        if (isReady(module.required)) {
          module.init(this.context);
        }
      });
    }
  }
  detouch(name) {
    let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (hasReferences(name) && !force) {
      return (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.error)(`Module can't be detouched. There are references to this module: ${Array.from(this.getReferences(name)).join(", ")}`);
    }
    get(name)?.detouch();
  }
}
/* harmony default export */ __webpack_exports__["default"] = (new ModuleManager());

/***/ }),

/***/ "./src/js/shared/contactForm.js":
/*!**************************************!*\
  !*** ./src/js/shared/contactForm.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initContactForm: function() { return /* binding */ initContactForm; }
/* harmony export */ });
/* harmony import */ var _services_contactForm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/contactForm.js */ "./src/js/shared/services/contactForm.js");

class AntispamBlock {
  constructor(duration) {
    this.duration = duration;
    this.timer = null;
  }
  unset() {
    clearInterval(this.timer);
    this.timer = null;
  }
  set(callback) {
    if (this.active) this.unset();
    this.counter = this.duration;
    this.timer = setInterval(() => {
      const lastCallback = this.counter === 1;
      callback && callback(this.counter, lastCallback);
      if (lastCallback) {
        this.unset();
      } else {
        this.counter--;
      }
    }, 1000);
  }
  get active() {
    return this.timer !== null;
  }
}
const reduceIterator = function (iterator) {
  let acc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  console.log("reduceIterator");
  let current;
  do {
    current = iterator.next();
    acc.push(current.value);
  } while (!current.done);
  return acc;
};
function initContactForm(formId, pageStore, events) {
  const antispamBlock = new AntispamBlock(5);
  const $msgDataNotSentDisclosure = $(`#${formId} [data-msg-disclosure='data-not-sent']`);
  const $msgSuccessDisclosure = $(`#${formId} [data-msg-disclosure='data-successfully-sent']`);
  const $sendBtn = $(`#${formId} .contact-form__send-btn`);
  const $watsappCallBtn = $(`#${formId} .contact-form__call-btn`);
  const $form = $(`#${formId}`);
  $watsappCallBtn.on("click", event => {
    const formData = new FormData($form.get(0));
    if (reduceIterator(formData.values()).some(value => value !== undefined && value.length > 0)) {
      showIsNotSentMsg();
    }
  });
  const validator = $form.validate({
    ignore: [],
    highlight: function (element, errorClass, validClass) {
      $(element).closest(".form-field").addClass(errorClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).closest(".form-field").removeClass(errorClass);
    },
    errorPlacement: function (error, element) {
      error.appendTo(element.closest(".form-input"));
    },
    // Отправляем данные на сервер
    submitHandler: async function (form, event) {
      event.preventDefault();
      if (antispamBlock.active) return false;
      antispamBlock.set((counter, lastCallback) => {
        if (lastCallback) enableBtns();
      });
      disableBtns();
      const formData = new FormData(form);
      if (formId == "cv-request-contact-form") {
        const {
          selectedEmployeeIdx,
          employees
        } = pageStore.state;
        if (selectedEmployeeIdx > -1 && employees.data.length) {
          formData.append("employee-id", employees.data[selectedEmployeeIdx].id);
          formData.append("employee-name", employees.data[selectedEmployeeIdx].crb_person_name);
        }
      }
      const response = (0,_services_contactForm_js__WEBPACK_IMPORTED_MODULE_0__.sendContactRequest)(formData);
      $form.get(0).reset();
      $msgDataNotSentDisclosure.removeClass("open");
      showSucccessMsg();
    }
  });
  function disableBtns() {
    $sendBtn.addClass("disabled");
    $watsappCallBtn.addClass("disabled");
  }
  function enableBtns() {
    $sendBtn.removeClass("disabled");
    $watsappCallBtn.removeClass("disabled");
  }
  function showSucccessMsg() {
    $msgSuccessDisclosure.addClass("open");
    setTimeout(() => {
      $msgSuccessDisclosure.removeClass("open");
    }, 5000);
  }
  function showIsNotSentMsg() {
    $msgDataNotSentDisclosure.addClass("open");
  }
  async function send(formData) {
    return await fetch(`${origin}/contact_request`, {
      method: "POST",
      body: formData,
      redirect: 'follow'
    });
  }
}

/***/ }),

/***/ "./src/js/shared/logger/index.js":
/*!***************************************!*\
  !*** ./src/js/shared/logger/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debug: function() { return /* binding */ debug; },
/* harmony export */   error: function() { return /* binding */ error; },
/* harmony export */   log: function() { return /* binding */ log; },
/* harmony export */   logger: function() { return /* binding */ logger; },
/* harmony export */   warn: function() { return /* binding */ warn; }
/* harmony export */ });
const devMode = false;
const consoleLogs = devMode;
const consoleWarns = devMode;
const consoleDebug = devMode;
const alertOnLog = false; // Alert on log / debug / warn
const alertOnError = devMode;

// Просто логирование какого-то события
function log() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (consoleLogs) console.log(...args);
  if (alertOnLog) alert(args.join(" :: "));
}
// Особые данные для отладки
function debug() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (consoleDebug) console.debug(...args);
  if (alertOnLog) alert(args.join(" :: "));
}
// Приложение быстрее всего продолжит работать без сбоев, но эта часть кода не ожидается к выполнению.
function warn() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }
  if (consoleWarns) console.warn(...args);
  if (alertOnLog) alert(args.join(" :: "));
}
// Критическая ошибка в приложении
function error() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }
  console.error(...args);
  if (alertOnError) alert(args.join(" :: "));
}
const logger = {
  log,
  debug,
  warn,
  error
};
/* harmony default export */ __webpack_exports__["default"] = (logger);

/***/ }),

/***/ "./src/js/shared/patterns/EventEmitter.js":
/*!************************************************!*\
  !*** ./src/js/shared/patterns/EventEmitter.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EventEmitter; }
/* harmony export */ });
class EventEmitter {
  constructor() {
    this.__subscribers = {};
  }
  on(name, callback) {
    if (!(name in this.__subscribers)) this.__subscribers[name] = [];
    this.__subscribers[name].push(callback);
  }
  off(name, callback) {
    if (name in this.__subscribers) {
      this.__subscribers[name] = this.__subscribers[name].filter(registeredCallback => registeredCallback === callback);
    }
  }
  emit(name, payload) {
    if (name in this.__subscribers) {
      this.__subscribers[name].forEach(callback => callback(payload));
    }
  }
}

/***/ }),

/***/ "./src/js/shared/services/config.js":
/*!******************************************!*\
  !*** ./src/js/shared/services/config.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiUrl: function() { return /* binding */ apiUrl; },
/* harmony export */   customApiUrl: function() { return /* binding */ customApiUrl; }
/* harmony export */ });
const origin = "https://team.web-you.pl/"; // window.origin
const apiUrl = `${origin}/wp-json/wp/v2`;
const customApiUrl = `${origin}/wp-json/custom/v1`;

/***/ }),

/***/ "./src/js/shared/services/contactForm.js":
/*!***********************************************!*\
  !*** ./src/js/shared/services/contactForm.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sendContactRequest: function() { return /* binding */ sendContactRequest; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ "./src/js/shared/services/config.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors.js */ "./src/js/shared/services/errors.js");


async function sendContactRequest(data) {
  const response = await fetch(`${_config_js__WEBPACK_IMPORTED_MODULE_0__.customApiUrl}/contact-request/`, {
    method: "POST",
    body: data
  });
  (0,_errors_js__WEBPACK_IMPORTED_MODULE_1__.errorOnBadResponce)(response);
  return response.json();
}

/***/ }),

/***/ "./src/js/shared/services/employees.js":
/*!*********************************************!*\
  !*** ./src/js/shared/services/employees.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchCategories: function() { return /* binding */ fetchCategories; },
/* harmony export */   fetchCategory: function() { return /* binding */ fetchCategory; },
/* harmony export */   fetchDepartmentEmployees: function() { return /* binding */ fetchDepartmentEmployees; },
/* harmony export */   fetchDepartments: function() { return /* binding */ fetchDepartments; },
/* harmony export */   fetchEmployees: function() { return /* binding */ fetchEmployees; }
/* harmony export */ });
/* harmony import */ var _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModuleManager/index.js */ "./src/js/shared/ModuleManager/index.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ "./src/js/shared/services/config.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors.js */ "./src/js/shared/services/errors.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./src/js/shared/utils.js");




async function fetchDepartmentEmployees(departmentId) {
  const store = _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].use("pageStore");
  const sortEmployees = (a, b) => {
    const aOrder = a.crb_order;
    const bOrder = b.crb_order;
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNotEmptyString)(aOrder) && (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNotEmptyString)(bOrder)) {
      return Number(aOrder) - Number(bOrder);
    } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNotEmptyString)(aOrder)) {
      return -1;
    } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNotEmptyString)(bOrder)) {
      return 1;
    } else {
      return 0;
    }
  };
  store.update(state => {
    return {
      ...state,
      employees: {
        ...state.employees,
        status: "loading"
      }
    };
  });
  const employees = (await fetchEmployees(`categories=${departmentId}`)).sort(sortEmployees);
  employees.forEach((data, idx) => data.__idx = idx);
  store.update(state => {
    return {
      ...state,
      employees: {
        ...state.employees,
        status: "idle",
        data: employees
      }
    };
  });
  return employees;
}
async function fetchEmployees(query) {
  const store = _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].use("pageStore");
  try {
    const response = await fetch(`${_config_js__WEBPACK_IMPORTED_MODULE_1__.apiUrl}/employees?per_page=100&${query}`, {
      method: "GET"
    });
    (0,_errors_js__WEBPACK_IMPORTED_MODULE_2__.errorOnBadResponce)(response);
    return response.json();
  } catch (ex) {
    console.error("Error while fetcheeng employees");
  }
}
async function fetchDepartments() {
  const store = _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].use("pageStore");
  const langMap = {
    "en-US": "en",
    "pl-PL": "pl"
  };
  const lang = document.documentElement.getAttribute("lang");
  console.log(lang);
  store.update(state => {
    return {
      ...state,
      departments: {
        ...state.departments,
        status: "loading"
      }
    };
  });
  console.log(langMap[lang]);
  const employeesCategory = await fetchCategory(`employees-${langMap[lang]}`);
  console.log(employeesCategory);
  const departmentsList = await fetchCategories(`parent=${employeesCategory.id}`);
  store.update(state => {
    return {
      ...state,
      departments: {
        ...state.departments,
        status: "idle",
        data: departmentsList
      }
    };
  });
}
async function fetchCategory(slug) {
  const store = _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].use("pageStore");
  console.log(`fetchCategory. slug: ${slug}`);
  const query = `slug=${slug}`;
  return (await fetchCategories(query))[0];
}
async function fetchCategories(query) {
  const store = _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].use("pageStore");
  try {
    const response = await fetch(`${_config_js__WEBPACK_IMPORTED_MODULE_1__.apiUrl}/categories?${query}`, {
      method: "GET"
    });
    (0,_errors_js__WEBPACK_IMPORTED_MODULE_2__.errorOnBadResponce)(response);
    return response.json();
  } catch (ex) {
    console.error("Error while fetching categories", ex);
  }
}

/***/ }),

/***/ "./src/js/shared/services/errors.js":
/*!******************************************!*\
  !*** ./src/js/shared/services/errors.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BadResponseError: function() { return /* binding */ BadResponseError; },
/* harmony export */   errorOnBadResponce: function() { return /* binding */ errorOnBadResponce; }
/* harmony export */ });
class BadResponseError extends Error {
  constructor(response, msg) {
    super(msg || "Bad response (not ok)");
    this.response = response;
  }
}
function errorOnBadResponce(response) {
  if (!response.ok) throw new BadResponseError(response);
}

/***/ }),

/***/ "./src/js/shared/store/index.js":
/*!**************************************!*\
  !*** ./src/js/shared/store/index.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Store: function() { return /* binding */ Store; }
/* harmony export */ });
/* harmony import */ var _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../patterns/EventEmitter.js */ "./src/js/shared/patterns/EventEmitter.js");

class Store extends _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    let initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super();
    this.prevState = {};
    this.state = initialState;
  }
  update(reducer) {
    this.prevState = this.state;
    this.state = reducer(this.state);
    this.emit("update", {
      state: this.state,
      prevState: this.prevState
    });
  }
}
;

/***/ }),

/***/ "./src/js/shared/utils.js":
/*!********************************!*\
  !*** ./src/js/shared/utils.js ***!
  \********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNotEmptyString: function() { return /* binding */ isNotEmptyString; },
/* harmony export */   isString: function() { return /* binding */ isString; }
/* harmony export */ });
function isString(value) {
  return typeof value === "string";
}
function isNotEmptyString(value) {
  return isString(value) && value.length > 0;
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "daa5c210548cbd408a2d"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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InNvdXJjZXMiOlsid2VicGFjazovL2Zscy1zdGFydC8uL3JlcG8vanMvbGlicy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vZmxzLXN0YXJ0Ly4vc3JjL2pzL3BhZ2VzL2hvbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZmxzLXN0YXJ0Ly4vc3JjL2pzL3BhZ2VzL2hvbWUvc2xpZGVycy5qcyIsIndlYnBhY2s6Ly9mbHMtc3RhcnQvLi9zcmMvanMvcGFnZXMvaG9tZS9zdG9yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9mbHMtc3RhcnQvLi9zcmMvanMvc2hhcmVkL01vZHVsZU1hbmFnZXIvZXJyb3JzLmpzIiwid2VicGFjazovL2Zscy1zdGFydC8uL3NyYy9qcy9zaGFyZWQvTW9kdWxlTWFuYWdlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9mbHMtc3RhcnQvLi9zcmMvanMvc2hhcmVkL2NvbnRhY3RGb3JtLmpzIiwid2VicGFjazovL2Zscy1zdGFydC8uL3NyYy9qcy9zaGFyZWQvbG9nZ2VyL2luZGV4LmpzIiwid2VicGFjazovL2Zscy1zdGFydC8uL3NyYy9qcy9zaGFyZWQvcGF0dGVybnMvRXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovL2Zscy1zdGFydC8uL3NyYy9qcy9zaGFyZWQvc2VydmljZXMvY29uZmlnLmpzIiwid2VicGFjazovL2Zscy1zdGFydC8uL3NyYy9qcy9zaGFyZWQvc2VydmljZXMvY29udGFjdEZvcm0uanMiLCJ3ZWJwYWNrOi8vZmxzLXN0YXJ0Ly4vc3JjL2pzL3NoYXJlZC9zZXJ2aWNlcy9lbXBsb3llZXMuanMiLCJ3ZWJwYWNrOi8vZmxzLXN0YXJ0Ly4vc3JjL2pzL3NoYXJlZC9zZXJ2aWNlcy9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vZmxzLXN0YXJ0Ly4vc3JjL2pzL3NoYXJlZC9zdG9yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9mbHMtc3RhcnQvLi9zcmMvanMvc2hhcmVkL3V0aWxzLmpzIiwid2VicGFjazovL2Zscy1zdGFydC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgb25seUVycm9yc1RvQ29uc29sZSA9IHRydWU7XHJcbmNvbnN0IGNvbnNvbGVMb2dzID0gdHJ1ZTtcclxuY29uc3QgY29uc29sZURlYnVnID0gdHJ1ZTtcclxuY29uc3QgYWxlcnRPbkVycm9yID0gZmFsc2U7XHJcbmNvbnN0IGFsZXJ0T25Mb2cgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2coLi4uYXJncykge1xyXG5cdGlmICghb25seUVycm9yc1RvQ29uc29sZSkge1xyXG5cdFx0aWYgKGNvbnNvbGVMb2dzKSBjb25zb2xlLmxvZyguLi5hcmdzKTtcclxuXHRcdGlmIChhbGVydE9uTG9nKSBhbGVydChhcmdzLmpvaW4oXCIgOjogXCIpKTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnKC4uLmFyZ3MpIHtcclxuXHRpZiAoIW9ubHlFcnJvcnNUb0NvbnNvbGUgJiYgY29uc29sZURlYnVnKSBjb25zb2xlLmRlYnVnKC4uLmFyZ3MpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBlcnJvciguLi5hcmdzKSB7XHJcblx0aWYgKCFvbmx5RXJyb3JzVG9Db25zb2xlICYmIGNvbnNvbGVEZWJ1ZykgY29uc29sZS5lcnJvciguLi5hcmdzKTtcclxuXHRpZiAoYWxlcnRPbkVycm9yKSBhbGVydChhcmdzLmpvaW4oXCIgOjogXCIpKTtcclxufSIsImltcG9ydCBtb2R1bGVNYW5hZ2VyLCB7IE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvTW9kdWxlTWFuYWdlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaW5pdFN0b3JlIGZyb20gXCIuL3N0b3JlL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IGluaXRUZWFtU2VsZWN0U2xpZGVyLCBpbml0VGVhbWF0ZXNTbGlkZXJzIH0gZnJvbSBcIi4vc2xpZGVycy5qc1wiO1xyXG5pbXBvcnQgeyBpbml0Q29udGFjdEZvcm0gfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2NvbnRhY3RGb3JtLmpzXCI7XHJcbmltcG9ydCB7XHJcbiAgZmV0Y2hEZXBhcnRtZW50cyxcclxuICBmZXRjaERlcGFydG1lbnRFbXBsb3llZXMsXHJcbn0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9lbXBsb3llZXMuanNcIjtcclxuaW1wb3J0IHsgbG9nLCBlcnJvciwgZGVidWcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vcmVwby9qcy9saWJzL2xvZ2dlci5qc1wiO1xyXG5cclxuaW5pdFN0b3JlKCk7XHJcblxyXG5jb25zdCBlbnRyeSA9IChjb250ZXh0LCBtb2R1bGUpID0+IHtcclxuICBjb25zdCB7IHBhZ2VTdG9yZSwgZXZlbnRzIH0gPSBjb250ZXh0O1xyXG5cclxuICBwYWdlU3RvcmUub24oXCJ1cGRhdGVcIiwgKHsgc3RhdGUsIHByZXZTdGF0ZSB9KSA9PlxyXG4gICAgY29uc29sZS5sb2coc3RhdGUsIHByZXZTdGF0ZSlcclxuICApO1xyXG5cclxuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XHJcbiAgICBvbkRvbVJlYWR5KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBvbkRvbVJlYWR5KTtcclxuICB9XHJcbiAgZnVuY3Rpb24gb25Eb21SZWFkeShldmVudCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaW5pdFRlYW1TZWxlY3RTbGlkZXIocGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0VGVhbWF0ZXNTbGlkZXJzKHBhZ2VTdG9yZSwgZXZlbnRzKTtcclxuICAgICAgaW5pdE5hdlRvUHJvZmlsZShwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXRDb250YWN0Rm9ybShcIm1haW4tY29udGFjdC1mb3JtXCIsIHBhZ2VTdG9yZSwgZXZlbnRzKTtcclxuICAgICAgaW5pdENvbnRhY3RGb3JtKFwiY3YtcmVxdWVzdC1jb250YWN0LWZvcm1cIiwgcGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0RW1sb3llZVZpZXcocGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0RGVwYXJ0bWVudFZpZXcocGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0RGVwYXJ0bWVudHNGaWx0ZXIocGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgZXJyb3IoZXgpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHBhZ2UgPSBuZXcgTW9kdWxlKHtcclxuICBuYW1lOiBcInBhZ2VcIixcclxuICBlbnRyeTogZW50cnksXHJcbiAgcmVxdWlyZWQ6IFtcImV2ZW50c1wiLCBcImNvbW1vblN0b3JlXCIsIFwicGFnZVN0b3JlXCJdLFxyXG59KTtcclxubW9kdWxlTWFuYWdlci5hZGQocGFnZSk7XHJcblxyXG5mdW5jdGlvbiBpbml0TmF2VG9Qcm9maWxlKHN0b3JlLCBldmVudHMpIHtcclxuICAkKFwiI3RlYW1hdGVzLWxpc3Qtd3JhcHBlclwiKS5vbihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XHJcbiAgICBjb25zdCAkaGVhZGVyID0gJChcImhlYWRlclwiKTtcclxuICAgIGNvbnN0ICRwcm9maWxlID0gJChcIiNwcm9maWxlXCIpO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRlYW1hdGUtY2FyZF9fYnRuXCIpICYmXHJcbiAgICAgICF0YXJnZXQuY2xvc2VzdChcIi50ZWFtYXRlLWNhcmRfX2J0blwiKVxyXG4gICAgKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBjb25zdCBwcm9maWxlQmNyID0gJHByb2ZpbGUuZ2V0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG4gICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgdG9wOiB3aW5kb3cuc2Nyb2xsWSArIHByb2ZpbGVCY3IudG9wIC0gaGVhZGVySGVpZ2h0LFxyXG4gICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGluaXRFbWxveWVlVmlldyhzdG9yZSwgZXZlbnRzKSB7XHJcbiAgY29uc3QgJHByb2ZpbGVXcmFwcGVyID0gJChcIiNwcm9maWxlLW1haW5cIik7XHJcbiAgY29uc3QgcHJvZmlsZVRlbXBsYXRlID0gJChcIiNlbXBsb3llZS1wcm9maWxlLXRlbXBsYXRlXCIpLmh0bWwoKTtcclxuICBjb25zdCAkc2tpbGxzUmF0ZXNXcmFwcGVyID0gJChcIiNwcm9maWxlLXNraWxscy1yYXRlc1wiKTtcclxuICBjb25zdCBza2lsbHNSYXRlc1RlbXBsYXRlID0gJChcIiNlbXBsb3llZS1za2lsbHMtcmF0ZXMtdGVtcGxhdGVcIikuaHRtbCgpO1xyXG4gIGNvbnN0ICR0YWdzQ2xvdWRXcmFwcGVyID0gJChcIiNwcm9maWxlLXRhZ3MtY2xvdWRcIik7XHJcbiAgY29uc3QgdGFnc0Nsb3VkVGVtcGxhdGUgPSAkKFwiI2VtcGxveWVlLXRhZ3MtY2xvdWQtdGVtcGxhdGVcIikuaHRtbCgpO1xyXG4gIE11c3RhY2hlLnBhcnNlKHByb2ZpbGVUZW1wbGF0ZSk7XHJcbiAgTXVzdGFjaGUucGFyc2Uoc2tpbGxzUmF0ZXNUZW1wbGF0ZSk7XHJcbiAgTXVzdGFjaGUucGFyc2UodGFnc0Nsb3VkVGVtcGxhdGUpO1xyXG5cclxuICAkcHJvZmlsZVdyYXBwZXIub24oXCJjbGlja1wiLCAoeyB0YXJnZXQgfSkgPT4ge1xyXG4gICAgaWYgKFxyXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJvZmlsZV9fZG93bmxvYWQtYnRuXCIpIHx8XHJcbiAgICAgIHRhcmdldC5jbG9zZXN0KFwiLnByb2ZpbGVfX2Rvd25sb2FkLWJ0blwiKVxyXG4gICAgKSB7XHJcbiAgICAgIGRyYXdlcnMub3BlbihcImN2LXJlcXVlc3QtZm9ybVwiLCB0YXJnZXQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBzdG9yZS5vbihcInVwZGF0ZVwiLCAoeyBzdGF0ZSwgcHJldlN0YXRlIH0pID0+IHtcclxuICAgIGlmIChcclxuICAgICAgc3RhdGUuc2VsZWN0ZWRFbXBsb3llZUlkeCA9PT0gcHJldlN0YXRlLnNlbGVjdGVkRW1wbG95ZWVJZHggJiZcclxuICAgICAgc3RhdGUuZW1wbG95ZWVzID09PSBwcmV2U3RhdGUuZW1wbG95ZWVzXHJcbiAgICApXHJcbiAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHsgc3RhdHVzLCBkYXRhIH0gPSBzdGF0ZS5lbXBsb3llZXM7XHJcbiAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgIGNvbnN0IHsgc2VsZWN0ZWRFbXBsb3llZUlkeCB9ID0gc3RhdGU7XHJcbiAgICBjb25zdCBzZWxlY3RlZEVtcGxveWVlRGF0YSA9IGRhdGFbc2VsZWN0ZWRFbXBsb3llZUlkeF07XHJcbiAgICBjb25zb2xlLmxvZyhzZWxlY3RlZEVtcGxveWVlRGF0YSk7XHJcbiAgICBjb25zdCB0aXRsZSA9IHNlbGVjdGVkRW1wbG95ZWVEYXRhLnRpdGxlLnJlbmRlcmVkO1xyXG4gICAgcmVuZGVyUHJvZmlsZShzdGF0dXMsIHNlbGVjdGVkRW1wbG95ZWVEYXRhLCB0aXRsZSk7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1zbGlkZS1hY3RpdmVcIik7XHJcbiAgICBjb25zb2xlLmxvZyhhY3RpdmVTbGlkZUVsZW0pO1xyXG4gICAgY29uc3QgdGl0bGVGcm9tU2xpZGUgPSBhY3RpdmVTbGlkZUVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS10aXRsZVwiKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fdGl0bGVcIikudGV4dENvbnRlbnQgPSB0aXRsZUZyb21TbGlkZTtcclxuICAgIHJlbmRlclNraWxsc1JhdGVzKHN0YXR1cywgc2VsZWN0ZWRFbXBsb3llZURhdGEuY3JiX3NraWxsc19saXN0KTtcclxuICAgIHJlbmRlclRhZ3NDbG91ZChzdGF0dXMsIHNlbGVjdGVkRW1wbG95ZWVEYXRhKTtcclxuICB9KTtcclxuICBmdW5jdGlvbiByZW5kZXJQcm9maWxlKHN0YXR1cywgZGF0YSwgdGl0bGUpIHtcclxuICAgICRwcm9maWxlV3JhcHBlci5odG1sKE11c3RhY2hlLnJlbmRlcihwcm9maWxlVGVtcGxhdGUsIHsgLi4uZGF0YSwgdGl0bGUgfSkpO1xyXG4gIH1cclxuICBmdW5jdGlvbiByZW5kZXJTa2lsbHNSYXRlcyhzdGF0dXMsIGRhdGEpIHtcclxuICAgIGNvbnN0IGZpbmFsaXplZERhdGEgPSBkYXRhLm1hcCgoeyBjcmJfbmFtZSwgY3JiX3JhdGUgfSkgPT4ge1xyXG4gICAgICByZXR1cm4geyBjcmJfbmFtZSwgY3JiX3JhdGU6IG5ldyBBcnJheShjcmJfcmF0ZSkgfTtcclxuICAgIH0pO1xyXG4gICAgJHNraWxsc1JhdGVzV3JhcHBlci5odG1sKFxyXG4gICAgICBNdXN0YWNoZS5yZW5kZXIoc2tpbGxzUmF0ZXNUZW1wbGF0ZSwgZmluYWxpemVkRGF0YSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlbmRlclRhZ3NDbG91ZChzdGF0dXMsIHsgY3JiX21haW5fbWVzc2FnZSwgY3JiX3RhZ3NfY2xvdWQgfSkge1xyXG4gICAgY29uc3Qgc2VjdGlvbkN1dCA9IDM2MCAvIGNyYl90YWdzX2Nsb3VkLmxlbmd0aDtcclxuICAgIGNvbnN0IGdlbmVyYXRlRGVncmVlT2Zmc2V0ID0gKCkgPT5cclxuICAgICAgLXNlY3Rpb25DdXQgKiAwLjEgKyBzZWN0aW9uQ3V0ICogMC4yICogTWF0aC5yYW5kb20oKTtcclxuICAgIGNvbnN0IGZpbmFsaXplZERhdGEgPSB7XHJcbiAgICAgIGNyYl9tYWluX21lc3NhZ2UsXHJcbiAgICAgIGNyYl90YWdzX2Nsb3VkOiBjcmJfdGFnc19jbG91ZC5tYXAoKHRhZ3MsIGlkeCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRoaXNTZWN0aW9uQ3V0ID0gaWR4ICogc2VjdGlvbkN1dDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4udGFncyxcclxuICAgICAgICAgIFwicGxhY2luZy1kZWdyZWVcIjogYCR7dGhpc1NlY3Rpb25DdXQgKyBnZW5lcmF0ZURlZ3JlZU9mZnNldCgpfWRlZ2AsXHJcbiAgICAgICAgICBcImRpc3RhbmNlLXNoaWZ0XCI6IGAkey0wLjA1ICsgMC4xICogTWF0aC5yYW5kb20oKX1gLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pLFxyXG4gICAgfTtcclxuICAgIGNvbnNvbGUubG9nKGZpbmFsaXplZERhdGEpO1xyXG4gICAgJHRhZ3NDbG91ZFdyYXBwZXIuaHRtbChNdXN0YWNoZS5yZW5kZXIodGFnc0Nsb3VkVGVtcGxhdGUsIGZpbmFsaXplZERhdGEpKTtcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gaW5pdERlcGFydG1lbnRWaWV3KHN0b3JlLCBldmVudHMpIHtcclxuICBjb25zdCAkd3JhcHBlciA9ICQoXCIjdGVhbWF0ZXMtbGlzdC13cmFwcGVyXCIpO1xyXG4gIGNvbnN0IHRlbXBsYXRlID0gJChcIiNlbXBsb3llZS1jYXJkLXRlbXBsYXRlXCIpLmh0bWwoKTtcclxuICBNdXN0YWNoZS5wYXJzZSh0ZW1wbGF0ZSk7XHJcblxyXG4gIHN0b3JlLm9uKFwidXBkYXRlXCIsICh7IHN0YXRlLCBwcmV2U3RhdGUgfSkgPT4ge1xyXG4gICAgaWYgKHN0YXRlLmVtcGxveWVlcyA9PT0gcHJldlN0YXRlLmVtcGxveWVlcykgcmV0dXJuO1xyXG4gICAgY29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IHN0YXRlLmVtcGxveWVlcztcclxuICAgIHJlbmRlcihzdGF0dXMsIGRhdGEpO1xyXG4gIH0pO1xyXG4gIHN0b3JlLm9uKFwidXBkYXRlXCIsICh7IHN0YXRlLCBwcmV2U3RhdGUgfSkgPT4ge1xyXG4gICAgaWYgKHN0YXRlLnNlbGVjdGVkRGVwYXJ0bWVudElkID09PSBwcmV2U3RhdGUuc2VsZWN0ZWREZXBhcnRtZW50SWQpIHJldHVybjtcclxuICAgIGZldGNoRGVwYXJ0bWVudEVtcGxveWVlcyhzdGF0ZS5zZWxlY3RlZERlcGFydG1lbnRJZCk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgc3RhdHVzLCBkYXRhIH0gPSBzdG9yZS5zdGF0ZS5lbXBsb3llZXM7XHJcbiAgcmVuZGVyKHN0YXR1cywgZGF0YSk7XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlcihzdGF0dXMsIGRhdGEpIHtcclxuICAgICR3cmFwcGVyLmh0bWwoTXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCBkYXRhKSk7XHJcbiAgICBldmVudHMuZW1pdChcInNsaWRlVG9GaXJzdEVtcGxveWVlXCIpO1xyXG4gIH1cclxufVxyXG5hc3luYyBmdW5jdGlvbiBpbml0RGVwYXJ0bWVudHNGaWx0ZXIoc3RvcmUsIGV2ZW50cykge1xyXG4gIGxldCBhY3RpdmVFbGVtID0gbnVsbDtcclxuICBjb25zdCAkd3JhcHBlciA9ICQoXCIjZGVwYXJ0bWVudC1zZWxlY3Qtd3JhcHBlclwiKTtcclxuICBzdG9yZS5vbihcInVwZGF0ZVwiLCAoeyBzdGF0ZSwgcHJldlN0YXRlIH0pID0+IHtcclxuICAgIGlmIChzdGF0ZS5kZXBhcnRtZW50cyA9PT0gcHJldlN0YXRlLmRlcGFydG1lbnRzKSByZXR1cm47XHJcbiAgICBjb25zdCB7IHN0YXR1cywgZGF0YSB9ID0gc3RhdGUuZGVwYXJ0bWVudHM7XHJcbiAgICByZW5kZXIoc3RhdHVzLCBkYXRhKTtcclxuICAgIGNvbnN0IGZpcnN0RWxlbSA9ICR3cmFwcGVyLmZpbmQoXCJbZGF0YS1pZF1cIikuZmlyc3QoKS5nZXQoMCk7XHJcbiAgICBpZiAoZmlyc3RFbGVtKSBzZXRBY3RpdmUoZmlyc3RFbGVtKTtcclxuICB9KTtcclxuICBmZXRjaERlcGFydG1lbnRzKCk7XHJcbiAgJHdyYXBwZXIub24oXCJjbGlja1wiLCAoeyB0YXJnZXQgfSkgPT4ge1xyXG4gICAgaWYgKCF0YXJnZXQuaGFzQXR0cmlidXRlKFwiZGF0YS1pZFwiKSkgcmV0dXJuO1xyXG4gICAgc2V0QWN0aXZlKHRhcmdldCk7XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIHNldEFjdGl2ZShlbGVtKSB7XHJcbiAgICBpZiAoYWN0aXZlRWxlbSA9PT0gZWxlbSkgcmV0dXJuO1xyXG4gICAgaWYgKGFjdGl2ZUVsZW0pIHtcclxuICAgICAgYWN0aXZlRWxlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZGVwYXJ0bWVudElkID0gZWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG4gICAgc3RvcmUudXBkYXRlKChzdGF0ZSkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIHNlbGVjdGVkRGVwYXJ0bWVudElkOiBkZXBhcnRtZW50SWQsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIGVsZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGFjdGl2ZUVsZW0gPSBlbGVtO1xyXG4gIH1cclxuICBmdW5jdGlvbiByZW5kZXIoc3RhdHVzLCBkYXRhKSB7XHJcbiAgICAkd3JhcHBlci5odG1sKHByZXNlcnZlKHN0YXR1cywgZGF0YSkpO1xyXG4gIH1cclxuICBmdW5jdGlvbiBwcmVzZXJ2ZShzdGF0dXMsIGRhdGEpIHtcclxuICAgIHJldHVybiBkYXRhXHJcbiAgICAgIC5tYXAoXHJcbiAgICAgICAgKGl0ZW0pID0+IGA8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXh0LWxpbmsgc2VjdGlvbi1uYXZfX2J0blwiIGRhdGEtc2x1Zz1cIiR7aXRlbS5zbHVnfVwiIGRhdGEtaWQ9XCIke2l0ZW0uaWR9XCI+JHtpdGVtLmh0bWxfcmVwcmVzZW50YXRpb259PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5gXHJcbiAgICAgIClcclxuICAgICAgLmpvaW4oXCJcIik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IGxvZywgZXJyb3IsIGRlYnVnIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3JlcG8vanMvbGlicy9sb2dnZXIuanNcIjtcclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUZWFtU2VsZWN0U2xpZGVyKCkge1xyXG4gIGNvbnN0IHRlYW1hdGVzU2xpZGVycyA9IG5ldyBTd2lwZXIoXCIjdGVhbS1zZWxlY3Qtc2xpZGVyXCIsIHtcclxuICAgIG9ic2VydmVyOiB0cnVlLFxyXG4gICAgcmVzaXplT2JzZXJ2ZXI6IHRydWUsXHJcbiAgICBzbGlkZXNQZXJWaWV3OiBcImF1dG9cIixcclxuICAgIGdyYWJDdXJzb3I6IHRydWUsXHJcbiAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgIDQyMDoge1xyXG4gICAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRUZWFtYXRlc1NsaWRlcnMoc3RvcmUsIGV2ZW50cykge1xyXG4gIGxvZyhcImluaXRUZWFtYXRlc1NsaWRlcnNcIik7XHJcbiAgY29uc3QgY3VycmVudFNsaWRlTnVtYmVyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICBcIiN0ZWFtYXRlcy1zbGlkZXItY291bnRlciAudGVhbWF0ZXMtc2xpZGVyX19jdXJyZW50XCJcclxuICApO1xyXG4gIGNvbnN0IHRvdGFsU2xpZGVzTnVtYmVyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICBcIiN0ZWFtYXRlcy1zbGlkZXItY291bnRlciAudGVhbWF0ZXMtc2xpZGVyX190b3RhbFwiXHJcbiAgKTtcclxuICBjb25zdCBzbGlkZXIgPSBuZXcgU3dpcGVyKFwiI3RlYW1hdGVzLXNsaWRlclwiLCB7XHJcbiAgICBvYnNlcnZlcjogdHJ1ZSxcclxuICAgIHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxyXG4gICAgc2xpZGVzUGVyVmlldzogXCJhdXRvXCIsXHJcbiAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcclxuICAgIGdyYWJDdXJzb3I6IHRydWUsXHJcbiAgICBsb29wOiB0cnVlLFxyXG4gICAgZWZmZWN0OiBcImNvdmVyZmxvd1wiLFxyXG4gICAgY292ZXJmbG93RWZmZWN0OiB7XHJcbiAgICAgIHJvdGF0ZTogNDAsXHJcbiAgICAgIHN0cmV0Y2g6IDM1MCxcclxuICAgICAgZGVwdGg6IDMwMCxcclxuICAgICAgbW9kaWZpZXI6IDAuNjUsXHJcbiAgICAgIHNsaWRlU2hhZG93czogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgYXV0b3BsYXk6IHtcclxuICAgICAgZGVsYXk6IDMwMDAsXHJcbiAgICB9LFxyXG4gICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICBwcmV2RWw6IFwiI3RlYW1hdGVzLXNsaWRlci1wcmV2XCIsXHJcbiAgICAgIG5leHRFbDogXCIjdGVhbWF0ZXMtc2xpZGVyLW5leHRcIixcclxuICAgIH0sXHJcbiAgICAvLyBwYWdpbmF0aW9uOiB7XHJcbiAgICAvLyBcdGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgIC8vIFx0ZWw6IFwiI3RlYW1hdGVzLXNsaWRlci1wYWdpbmF0aW9uXCJcclxuICAgIC8vIH0sXHJcbiAgICBicmVha3BvaW50czoge1xyXG4gICAgICAxMDI0OiB7XHJcbiAgICAgICAgY292ZXJmbG93RWZmZWN0OiB7XHJcbiAgICAgICAgICByb3RhdGU6IDQwLFxyXG4gICAgICAgICAgc3RyZXRjaDogNTAwLFxyXG4gICAgICAgICAgZGVwdGg6IDQwMCxcclxuICAgICAgICAgIG1vZGlmaWVyOiAwLjY1LFxyXG4gICAgICAgICAgc2xpZGVTaGFkb3dzOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIG9uOiB7XHJcbiAgICAgIHNsaWRlQ2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gdGhpcy5zbGlkZXM7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlU2xpZGUgPSB0aGlzLmFjdGl2ZUluZGV4O1xyXG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gaW5kZXggLSBhY3RpdmVTbGlkZTtcclxuICAgICAgICAgIHNsaWRlLnNldEF0dHJpYnV0ZShcImRhdGEtc2xpZGUtcG9zaXRpb25cIiwgcG9zaXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IFthY3RpdmVTbGlkZUVsZW1dID0gZmluZEFjdGl2ZVNsaWRlKHNsaWRlcyk7XHJcbiAgICAgICAgcHJvY2Vzc1NsaWRlQ2hhbmdlKGFjdGl2ZVNsaWRlRWxlbSk7XHJcbiAgICAgICAgdXBkYXRlUHJvZmlsZVNlY3Rpb25Gcm9tU2xpZGUoYWN0aXZlU2xpZGVFbGVtKTtcclxuICAgICAgfSxcclxuICAgICAgYWZ0ZXJJbml0OiAoc3dpcGVyKSA9PiB7XHJcbiAgICAgICAgaW5pdFNlbGVjdEJ5Q2xpY2soc3dpcGVyKTtcclxuICAgICAgICBjb25zdCBzbGlkZXMgPSBnZXRTbGlkZXMoc3dpcGVyKTtcclxuICAgICAgICBzZXRTbGlkZXNJZHgoc2xpZGVzKTtcclxuICAgICAgICBzZXRUb3RhbChzbGlkZXMpO1xyXG4gICAgICAgIGNvbnN0IFthY3RpdmVTbGlkZUVsZW1dID0gZmluZEFjdGl2ZVNsaWRlKHNsaWRlcyk7XHJcbiAgICAgICAgcHJvY2Vzc1NsaWRlQ2hhbmdlKGFjdGl2ZVNsaWRlRWxlbSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9ic2VydmVyVXBkYXRlOiAoc3dpcGVyKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gZ2V0U2xpZGVzKHN3aXBlcik7XHJcbiAgICAgICAgc2V0U2xpZGVzSWR4KHNsaWRlcyk7XHJcbiAgICAgICAgc2V0VG90YWwoc2xpZGVzKTsgLy8g0JzQvtC20L3QviDQsdGL0LvQviDQsdGLINC30LDQvNC+0YDQvtGH0LjRgtGM0YHRjywg0Lgg0L/QtdGA0LXRgNC40YHQvtCy0YvQstCw0YLRjCDRjdGC0L4g0LfQvdCw0YfQtdC90LjQtSDQv9C+INGA0LXQvdC00LXRgNGDLCDQsCDQvdC1INC/0L4g0LrQsNC20LTQvtC5INC/0LXRgNC10YHRgtGA0L7QudC60LUgRE9NLCDRh9GC0L4g0LfQvdCw0YfQuNGCLCDQv9C+INC60LDQttC00L7QuSDRgdC80LXQvdC1INGB0LvQsNC50LTQsFxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgW2FjdGl2ZVNsaWRlRWxlbV0gPSBmaW5kQWN0aXZlU2xpZGUoc2xpZGVzKTtcclxuICAgICAgICAgIHByb2Nlc3NTbGlkZUNoYW5nZShhY3RpdmVTbGlkZUVsZW0pO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0OiAoc3dpcGVyKSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBzbGlkZXMgPSBnZXRTbGlkZXMoc3dpcGVyKTtcclxuICAgICAgICAgIGNvbnN0IFthY3RpdmVTbGlkZUVsZW0sIGFjdGl2ZVNsaWRlSWR4XSA9IGZpbmRBY3RpdmVTbGlkZShzbGlkZXMpO1xyXG4gICAgICAgICAgc2V0U2xpZGVzT3JkZXIoc2xpZGVzLCBhY3RpdmVTbGlkZUVsZW0sIGFjdGl2ZVNsaWRlSWR4KTtcclxuICAgICAgICAgIHByb2Nlc3NTbGlkZUNoYW5nZShhY3RpdmVTbGlkZUVsZW0pO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBldmVudHMub24oXCJzbGlkZVRvRmlyc3RFbXBsb3llZVwiLCAoKSA9PiB7XHJcbiAgICBzbGlkZXIuc2xpZGVUbygwLCAzMDApO1xyXG4gICAgc2V0U2VsZWN0ZWRFbXBsb3llZSgwKTtcclxuICB9KTtcclxuICBmdW5jdGlvbiBwcm9jZXNzU2xpZGVDaGFuZ2UoYWN0aXZlU2xpZGVFbGVtKSB7XHJcbiAgICBpZiAoYWN0aXZlU2xpZGVFbGVtKSB7XHJcbiAgICAgIGNvbnN0IGNhcmRJZHggPSBOdW1iZXIoYWN0aXZlU2xpZGVFbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtY2FyZC1pZHhcIikpO1xyXG4gICAgICB1cGRhdGVBY3RpdmVTbGlkZU51bWJlcihjYXJkSWR4ICsgMSk7XHJcbiAgICAgIHNldFNlbGVjdGVkRW1wbG95ZWUoY2FyZElkeCk7XHJcbiAgICAgIHVwZGF0ZVByb2ZpbGVTZWN0aW9uRnJvbVNsaWRlKGFjdGl2ZVNsaWRlRWxlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHVwZGF0ZVByb2ZpbGVTZWN0aW9uRnJvbVNsaWRlKGFjdGl2ZVNsaWRlRWxlbSkge1xyXG4gICAgY29uc29sZS5sb2coYWN0aXZlU2xpZGVFbGVtKTtcclxuICAgIC8vIGNvbnN0IHRpdGxlID0gYWN0aXZlU2xpZGVFbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdGl0bGVcIik7XHJcbiAgICAvLyB1cGRhdGVQcm9maWxlU2VjdGlvbih0aXRsZSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZXRTZWxlY3RlZEVtcGxveWVlKGlkeCkge1xyXG4gICAgc3RvcmUudXBkYXRlKChzdGF0ZSkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIHNlbGVjdGVkRW1wbG95ZWVJZHg6IGlkeCxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBmdW5jdGlvbiBpbml0U2VsZWN0QnlDbGljayhzd2lwZXIpIHtcclxuICAgIHN3aXBlci53cmFwcGVyRWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRlYW1hdGUtY2FyZF9fYnRuXCIpICYmXHJcbiAgICAgICAgIXRhcmdldC5jbG9zZXN0KFwiLnRlYW1hdGUtY2FyZF9fYnRuXCIpXHJcbiAgICAgIClcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNvbnN0IHNsaWRlUm9vdEVsZW0gPSB0YXJnZXQuY2xvc2VzdChcIi5zd2lwZXItc2xpZGVcIik7XHJcbiAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlUm9vdEVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1zbGlkZS1pZHhcIiksIDMwMCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZnVuY3Rpb24gc2V0VG90YWwoc2xpZGVzKSB7XHJcbiAgICB0b3RhbFNsaWRlc051bWJlckVsZW0udGV4dENvbnRlbnQgPSBzbGlkZXMubGVuZ3RoO1xyXG4gIH1cclxuICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVTbGlkZU51bWJlcihudW1iZXIpIHtcclxuICAgIGN1cnJlbnRTbGlkZU51bWJlckVsZW0udGV4dENvbnRlbnQgPSBudW1iZXI7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdldFNsaWRlcyhzd2lwZXIpIHtcclxuICAgIHJldHVybiBbLi4uc3dpcGVyLndyYXBwZXJFbC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN3aXBlci1zbGlkZVwiKV07XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGZpbmRBY3RpdmVTbGlkZShzbGlkZXMpIHtcclxuICAgIGNvbnN0IGFjdGl2ZVNsaWRlSWR4ID0gc2xpZGVzLmZpbmRJbmRleCgoZWxlbSkgPT5cclxuICAgICAgZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzd2lwZXItc2xpZGUtYWN0aXZlXCIpXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIFtzbGlkZXNbYWN0aXZlU2xpZGVJZHhdLCBhY3RpdmVTbGlkZUlkeF07XHJcbiAgfVxyXG4gIC8vINCd0YPQttC90L4g0LLRi9C30YvQstCw0YLRjCDQutCw0LbQtNGL0Lkg0YDQsNC3INC/0YDQuCDQvtCx0L3QvtCy0LvQtdC90LjQuCBET01cclxuICBmdW5jdGlvbiBzZXRTbGlkZXNJZHgoc2xpZGVzKSB7XHJcbiAgICBpZiAoc2xpZGVzLmxlbmd0aCA8IDEpIHJldHVybjtcclxuICAgIHNsaWRlcy5mb3JFYWNoKChlbGVtLCBpZHgpID0+IGVsZW0uc2V0QXR0cmlidXRlKFwiZGF0YS1zbGlkZS1pZHhcIiwgaWR4KSk7XHJcbiAgfVxyXG4gIC8vINCd0YPQttC90L4g0LLRi9C30YvQstCw0YLRjCDQutCw0LbQtNGL0Lkg0YDQsNC3INC/0YDQuCDQvtCx0L3QvtCy0LvQtdC90LjQuCBET00g0LjQu9C4INC40LfQvNC10L3QtdC90LjQuCDQsNC60YLQuNCy0L3QvtCz0L4g0YHQu9Cw0LnQtNCwXHJcbiAgZnVuY3Rpb24gc2V0U2xpZGVzT3JkZXIoc2xpZGVzLCBhY3RpdmVTbGlkZUVsZW0sIGFjdGl2ZVNsaWRlSWR4KSB7XHJcbiAgICBpZiAoc2xpZGVzLmxlbmd0aCA8IDEgfHwgIWFjdGl2ZVNsaWRlRWxlbSkgcmV0dXJuO1xyXG4gICAgYWN0aXZlU2xpZGVFbGVtLnNldEF0dHJpYnV0ZShcImRhdGEtc2xpZGUtcG9zaXRpb25cIiwgMCk7XHJcbiAgICBjb25zdCByZWNhbGNEZXB0aCA9IE1hdGgubWluKDUsIE1hdGguY2VpbCgoc2xpZGVzLmxlbmd0aCAtIDEpIC8gMikpO1xyXG4gICAgY29uc3QgbGVmdEVkZ2VJZHggPSBNYXRoLm1heCgwLCBhY3RpdmVTbGlkZUlkeCAtIHJlY2FsY0RlcHRoKTtcclxuICAgIGNvbnN0IHJpZ2h0RWRnZUlkeCA9IE1hdGgubWluKFxyXG4gICAgICBzbGlkZXMubGVuZ3RoLFxyXG4gICAgICBhY3RpdmVTbGlkZUlkeCArIHJlY2FsY0RlcHRoICsgMVxyXG4gICAgKTtcclxuICAgIHNsaWRlc1xyXG4gICAgICAuc2xpY2UobGVmdEVkZ2VJZHgsIGFjdGl2ZVNsaWRlSWR4KVxyXG4gICAgICAucmV2ZXJzZSgpXHJcbiAgICAgIC5mb3JFYWNoKChlbGVtLCBpZHgpID0+IHtcclxuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShcImRhdGEtc2xpZGUtcG9zaXRpb25cIiwgLTEgLSBpZHgpO1xyXG4gICAgICB9KTtcclxuICAgIHNsaWRlcy5zbGljZShhY3RpdmVTbGlkZUlkeCArIDEsIHJpZ2h0RWRnZUlkeCkuZm9yRWFjaCgoZWxlbSwgaWR4KSA9PiB7XHJcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKFwiZGF0YS1zbGlkZS1wb3NpdGlvblwiLCAxICsgaWR4KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgbW9kdWxlTWFuYWdlciwgeyBNb2R1bGUgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL01vZHVsZU1hbmFnZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3N0b3JlL2luZGV4LmpzXCI7XHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcblx0ZGVwYXJ0bWVudHM6IHtcclxuXHRcdHN0YXR1czogXCJpZGxlXCIsXHJcblx0XHRkYXRhOiBbXSxcclxuXHR9LFxyXG5cdHNlbGVjdGVkRW1wbG95ZWVJZHg6IG51bGwsXHJcblx0c2VsZWN0ZWREZXBhcnRtZW50SWQ6IG51bGwsXHJcblx0ZW1wbG95ZWVzOiB7XHJcblx0XHRzdGF0dXM6IFwiaWRsZVwiLFxyXG5cdFx0ZGF0YTogW10sXHJcblx0fSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0ID0gKCkgPT4ge1xyXG5cdGNvbnN0IG1vZHVsZSA9IG5ldyBNb2R1bGUoe1xyXG5cdFx0bmFtZTogXCJwYWdlU3RvcmVcIixcclxuXHRcdGVudHJ5OiAoKSA9PiBuZXcgU3RvcmUoaW5pdGlhbFN0YXRlKSxcclxuXHR9KTtcclxuXHRtb2R1bGVNYW5hZ2VyLmFkZChtb2R1bGUpO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGluaXQ7IiwiZXhwb3J0IGNsYXNzIE1haW5TY29wZUlzQnVzeUVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoXCJNYWluIHNjb3BlIHZhcmlhYmxlIGlzIGJ1c3lcIik7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBjbGFzcyBNb2R1bGVJc05vdFJlYWR5VG9Vc2VFcnJvciBleHRlbmRzIEVycm9yIHtcclxuXHRjb25zdHJ1Y3Rvcih7IG5hbWUgfSkge1xyXG5cdFx0c3VwZXIoYE1vZHVsZSBJcyBOb3QgUmVhZHkgVG8gVXNlOiAke25hbWV9YCk7XHJcblx0fVxyXG59IiwiaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tIFwiLi4vdXRpbHMuanNcIjtcclxuaW1wb3J0IHsgZXJyb3IsIHdhcm4sIGRlYnVnIH0gZnJvbSBcIi4uL2xvZ2dlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyBNYWluU2NvcGVJc0J1c3lFcnJvciwgTW9kdWxlSXNOb3RSZWFkeVRvVXNlRXJyb3IgfSBmcm9tIFwiLi9lcnJvcnMuanNcIjtcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiLi4vcGF0dGVybnMvRXZlbnRFbWl0dGVyLmpzXCI7XHJcbmNvbnN0IGluaXRpYWxTdHJ1Y3QgPSB7XHJcblx0X19hcHBfXzogdHJ1ZSxcclxuXHRjb250ZXh0OiB7fSxcclxuXHRyZWdpc3RlcmVkOiBuZXcgTWFwKCksXHJcblx0cmVhZHk6IG5ldyBNYXAoKSxcclxuXHRkZXBlbmRlbmNpZXM6IHt9LFxyXG59O1xyXG5leHBvcnQgY2xhc3MgTW9kdWxlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdFx0ZGVidWcoYENvbnN0cnVjdCBtb2R1bGUgPiBwcm9wczogJHtKU09OLnN0cmluZ2lmeShwcm9wcyl9YCwgYCBNb2R1bGU6ICR7SlNPTi5zdHJpbmdpZnkodGhpcyl9O2ApO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IHtcclxuXHRcdFx0cmVnaXN0ZXJlZDogZmFsc2UsXHJcblx0XHRcdHJlYWR5OiBmYWxzZSxcclxuXHRcdH07XHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcclxuXHRcdGNvbnN0IHsgbmFtZSwgZW50cnksIHJlcXVpcmVkLCBjbGVhbnVwIH0gPSBwcm9wcztcclxuXHR9XHJcblx0Z2V0IHJlYWR5KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUucmVhZHk7XHJcblx0fVxyXG5cdHNldCByZWFkeSh2YWx1ZSkge1xyXG5cdFx0dGhpcy5zdGF0ZS5yZWFkeSA9IHZhbHVlO1xyXG5cdFx0dGhpcy5lbWl0KFwicmVhZHlcIiwgdGhpcyk7XHJcblx0fVxyXG5cdGdldCByZWdpc3RlcmVkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUucmVnaXN0ZXJlZDtcclxuXHR9XHJcblx0c2V0IHJlZ2lzdGVyZWQodmFsdWUpIHtcclxuXHRcdHRoaXMuc3RhdGUucmVnaXN0ZXJlZCA9IHZhbHVlO1xyXG5cdH1cclxuXHRpbml0KGNvbnRleHQpIHtcclxuXHRcdFx0ZGVidWcoYEluaXQgbW9kdWxlID4gY29udGV4dDogJHtjb250ZXh0fWAsIGAgTW9kdWxlOiAke3RoaXN9O2ApO1xyXG5cdFx0aWYgKCF0aGlzLnJlZ2lzdGVyZWQpIHJldHVybiB3YXJuKFwiTW9kdWxlIGlzIHVucmVnaXN0ZXJlZFwiKTtcclxuXHRcdHRoaXMuY29udGV4dCA9IHRoaXMuZW50cnkoY29udGV4dCk7XHJcblx0XHR0aGlzLnJlYWR5ID0gdHJ1ZTtcclxuXHR9XHJcblx0ZGV0b3VjaCgpIHtcclxuXHRcdFx0ZGVidWcoYERldG91Y2ggbW9kdWxlO2AsIGAgTW9kdWxlOiAke3RoaXN9O2ApO1xyXG5cdFx0aWYgKCF0aGlzLnJlZ2lzdGVyZWQpIHJldHVybiB3YXJuKFwiTW9kdWxlIGlzIHVucmVnaXN0ZXJlZFwiKTtcclxuXHRcdGlmICh0aGlzLnJlYWR5KSB7XHJcblx0XHRcdHRoaXMucmVhZHkgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5jbGVhbnVwKCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnJlZ2lzdGVyZWQgPSBmYWxzZTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGNsYXNzIE1vZHVsZU1hbmFnZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdGlmICh3aW5kb3cuX19hcHBfXyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdE9iamVjdC5hc3NpZ24odGhpcywgaW5pdGlhbFN0cnVjdCk7XHJcblx0XHRcdHdpbmRvdy5fX2FwcF9fID0gdGhpcztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh3aW5kb3cuX19hcHBfXy5fX2FwcF9fKSB7XHJcblx0XHRcdFx0cmV0dXJuIHdpbmRvdy5fX2FwcF9fO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRocm93IG5ldyBNYWluU2NvcGVJc0J1c3lFcnJvcigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdGlzUmVhZHkodGFyZ2V0KSB7XHJcblx0XHRyZXR1cm4gaXNTdHJpbmcodGFyZ2V0KSA/IHRoaXMucmVhZHkuaGFzKHRhcmdldCkgOiB0YXJnZXQuZXZlcnkoaXRlbSA9PiB0aGlzLnJlYWR5LmhhcyhpdGVtKSk7XHJcblx0fVxyXG5cdGlzUmVnaXN0ZXJlZCh0YXJnZXQpIHtcclxuXHRcdHJldHVybiBpc1N0cmluZyh0YXJnZXQpID8gdGhpcy5yZWdpc3RlcmVkLmhhcyh0YXJnZXQpIDogdGFyZ2V0LmV2ZXJ5KGl0ZW0gPT4gdGhpcy5yZWdpc3RlcmVkLmhhcyhpdGVtKSk7XHJcblx0fVxyXG5cdHNldEFzUmVhZHkobW9kdWxlKSB7XHJcblx0XHR0aGlzLmNvbnRleHRbbW9kdWxlLm5hbWVdID0gbW9kdWxlLmNvbnRleHQ7XHJcblx0XHR0aGlzLnJlYWR5LnNldChtb2R1bGUubmFtZSwgbW9kdWxlKTtcclxuXHRcdHRoaXMuZW1pdChcInJlYWR5XCIsIG1vZHVsZSk7XHJcblx0fVxyXG5cdHNldEFzUmVnaXN0ZXJlZChtb2R1bGUpIHtcclxuXHRcdHRoaXMucmVnaXN0ZXJlZC5zZXQobW9kdWxlLm5hbWUsIG1vZHVsZSk7XHJcblx0fVxyXG5cdGFkZERlcGVuZGVuY2llcyhzcmNOYW1lLCB0YXJnZXQpIHtcclxuXHRcdGNvbnN0IGFkZCA9ICh0YXJnZXROYW1lKSA9PiB7XHJcblx0XHRcdGlmICh0YXJnZXROYW1lIGluIHRoaXMuZGVwZW5kZW5jaWVzKSB7XHJcblx0XHRcdFx0dGhpcy5kZXBlbmRlbmNpZXNbdGFyZ2V0TmFtZV0uYWRkKHNyY05hbWUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZGVwZW5kZW5jaWVzW3RhcmdldE5hbWVdID0gbmV3IFNldChzcmNOYW1lKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGlzU3RyaW5nKHRhcmdldCkgPyBhZGQodGFyZ2V0KSA6IHRhcmdldC5mb3JFYWNoKGl0ZW0gPT4gYWRkKGl0ZW0pKTtcclxuXHR9XHJcblx0cmVtb3ZlRGVwZW5kZW5jaWVzKHNyY05hbWUsIHRhcmdldCkge1xyXG5cdFx0Y29uc3QgcmVtb3ZlID0gKHRhcmdldE5hbWUpID0+IHtcclxuXHRcdFx0aWYgKHRhcmdldE5hbWUgaW4gdGhpcy5kZXBlbmRlbmNpZXMpIHtcclxuXHRcdFx0XHR0aGlzLmRlcGVuZGVuY2llc1t0YXJnZXROYW1lXS5yZW1vdmUoc3JjTmFtZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBpc1N0cmluZyh0YXJnZXQpID8gcmVtb3ZlKHRhcmdldCkgOiB0YXJnZXQuZm9yRWFjaChpdGVtID0+IHJlbW92ZShpdGVtKSk7XHJcblx0fVxyXG5cdGhhc1JlZmVyZW5jZXMobmFtZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0UmVmZXJlbmNlcyhuYW1lKT8uc2l6ZTtcclxuXHR9XHJcblx0Z2V0UmVmZXJlbmNlcyhuYW1lKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5kZXBlbmRlbmNpZXNbbmFtZV07XHJcblx0fVxyXG5cdGdldChuYW1lKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWdpc3RlcmVkLmdldChuYW1lKTtcclxuXHR9XHJcblx0dXNlKG5hbWUpIHtcclxuXHRcdGlmICghdGhpcy5pc1JlYWR5KG5hbWUpKSB0aHJvdyBuZXcgTW9kdWxlSXNOb3RSZWFkeVRvVXNlRXJyb3IobW9kdWxlKTtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRleHRbbmFtZV07XHJcblx0fVxyXG5cdGFkZChtb2R1bGUpIHtcclxuXHRcdGlmICh0aGlzLmlzUmVnaXN0ZXJlZChtb2R1bGUubmFtZSkpIHJldHVybiB3YXJuKGBUaGUgbW9kdWxlIGlzIGFscmVhZHkgcmVnaXN0ZXJlZDogJHttb2R1bGUubmFtZX1gKTtcclxuXHRcdG1vZHVsZS5vbihcInJlYWR5XCIsICgpID0+IHRoaXMuc2V0QXNSZWFkeShtb2R1bGUpKTtcclxuXHRcdGlmIChtb2R1bGUucmVxdWlyZWQpIHRoaXMuYWRkRGVwZW5kZW5jaWVzKG1vZHVsZS5uYW1lLCBtb2R1bGUucmVxdWlyZWQpO1xyXG5cdFx0bW9kdWxlLm9uKFwiYmVmb3JlRGV0b3VjaFwiLCAoKSA9PiB0aGlzLnNldEFzUmVhZHkobW9kdWxlKSk7XHJcblx0XHRtb2R1bGUucmVnaXN0ZXJlZCA9IHRydWU7XHJcblx0XHR0aGlzLnNldEFzUmVnaXN0ZXJlZChtb2R1bGUpO1xyXG5cdFx0aWYgKCFtb2R1bGUucmVxdWlyZWQgfHwgdGhpcy5pc1JlYWR5KG1vZHVsZS5yZXF1aXJlZCkpIHtcclxuXHRcdFx0bW9kdWxlLmluaXQodGhpcy5jb250ZXh0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMub24oXCJyZWFkeVwiLCAoeyBuYW1lIH0pID0+IHtcclxuXHRcdFx0XHRpZiAoaXNSZWFkeShtb2R1bGUucmVxdWlyZWQpKSB7XHJcblx0XHRcdFx0XHRtb2R1bGUuaW5pdCh0aGlzLmNvbnRleHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGRldG91Y2gobmFtZSwgZm9yY2UgPSB0cnVlKSB7XHJcblx0XHRpZiAoaGFzUmVmZXJlbmNlcyhuYW1lKSAmJiAhZm9yY2UpIHtcclxuXHRcdFx0cmV0dXJuIGVycm9yKGBNb2R1bGUgY2FuJ3QgYmUgZGV0b3VjaGVkLiBUaGVyZSBhcmUgcmVmZXJlbmNlcyB0byB0aGlzIG1vZHVsZTogJHtBcnJheS5mcm9tKHRoaXMuZ2V0UmVmZXJlbmNlcyhuYW1lKSkuam9pbihcIiwgXCIpfWApO1xyXG5cdFx0fVxyXG5cdFx0Z2V0KG5hbWUpPy5kZXRvdWNoKCk7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBNb2R1bGVNYW5hZ2VyKCk7IiwiaW1wb3J0ICB7IHNlbmRDb250YWN0UmVxdWVzdCB9IGZyb20gXCIuL3NlcnZpY2VzL2NvbnRhY3RGb3JtLmpzXCI7XHJcblxyXG5jbGFzcyBBbnRpc3BhbUJsb2NrIHtcclxuXHRjb25zdHJ1Y3RvcihkdXJhdGlvbikge1xyXG5cdFx0dGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG5cdFx0dGhpcy50aW1lciA9IG51bGw7XHJcblx0fVxyXG5cdHVuc2V0KCkge1xyXG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcclxuXHRcdHRoaXMudGltZXIgPSBudWxsO1xyXG5cdH1cclxuXHRzZXQoY2FsbGJhY2spIHtcclxuXHRcdGlmICh0aGlzLmFjdGl2ZSkgdGhpcy51bnNldCgpO1xyXG5cdFx0dGhpcy5jb3VudGVyID0gdGhpcy5kdXJhdGlvbjtcclxuXHRcdHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdGNvbnN0IGxhc3RDYWxsYmFjayA9IHRoaXMuY291bnRlciA9PT0gMTtcclxuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2sodGhpcy5jb3VudGVyLCBsYXN0Q2FsbGJhY2spO1xyXG5cdFx0XHRpZiAobGFzdENhbGxiYWNrKSB7XHJcblx0XHRcdFx0dGhpcy51bnNldCgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY291bnRlci0tO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAxMDAwKTtcclxuXHR9XHJcblx0Z2V0IGFjdGl2ZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLnRpbWVyICE9PSBudWxsO1xyXG5cdH1cclxufVxyXG5jb25zdCByZWR1Y2VJdGVyYXRvciA9IChpdGVyYXRvciwgYWNjID0gW10pID0+IHtcclxuXHRcdGNvbnNvbGUubG9nKFwicmVkdWNlSXRlcmF0b3JcIik7XHJcblx0bGV0IGN1cnJlbnQ7XHJcblx0ZG8ge1xyXG5cdFx0Y3VycmVudCA9IGl0ZXJhdG9yLm5leHQoKTtcclxuXHRcdGFjYy5wdXNoKGN1cnJlbnQudmFsdWUpO1xyXG5cdH0gd2hpbGUgKCFjdXJyZW50LmRvbmUpO1xyXG5cdHJldHVybiBhY2M7XHJcbn07XHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0Q29udGFjdEZvcm0oZm9ybUlkLCBwYWdlU3RvcmUsIGV2ZW50cykge1xyXG5cdGNvbnN0IGFudGlzcGFtQmxvY2sgPSBuZXcgQW50aXNwYW1CbG9jayg1KTtcclxuXHRjb25zdCAkbXNnRGF0YU5vdFNlbnREaXNjbG9zdXJlID0gJChgIyR7Zm9ybUlkfSBbZGF0YS1tc2ctZGlzY2xvc3VyZT0nZGF0YS1ub3Qtc2VudCddYCk7XHJcblx0Y29uc3QgJG1zZ1N1Y2Nlc3NEaXNjbG9zdXJlID0gJChgIyR7Zm9ybUlkfSBbZGF0YS1tc2ctZGlzY2xvc3VyZT0nZGF0YS1zdWNjZXNzZnVsbHktc2VudCddYCk7XHJcblx0Y29uc3QgJHNlbmRCdG4gPSAkKGAjJHtmb3JtSWR9IC5jb250YWN0LWZvcm1fX3NlbmQtYnRuYCk7XHJcblx0Y29uc3QgJHdhdHNhcHBDYWxsQnRuID0gJChgIyR7Zm9ybUlkfSAuY29udGFjdC1mb3JtX19jYWxsLWJ0bmApO1xyXG5cdGNvbnN0ICRmb3JtID0gJChgIyR7Zm9ybUlkfWApO1xyXG5cdCR3YXRzYXBwQ2FsbEJ0bi5vbihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG5cdFx0Y29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoJGZvcm0uZ2V0KDApKTtcclxuXHRcdGlmIChyZWR1Y2VJdGVyYXRvcihmb3JtRGF0YS52YWx1ZXMoKSkuc29tZSh2YWx1ZSA9PiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLmxlbmd0aCA+IDApKSB7XHJcblx0XHRcdHNob3dJc05vdFNlbnRNc2coKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRjb25zdCB2YWxpZGF0b3IgPSAkZm9ybS52YWxpZGF0ZSh7XHJcblx0XHRpZ25vcmU6IFtdLFxyXG5cdFx0aGlnaGxpZ2h0OiBmdW5jdGlvbihlbGVtZW50LCBlcnJvckNsYXNzLCB2YWxpZENsYXNzKSB7XHJcblx0XHRcdCQoZWxlbWVudCkuY2xvc2VzdChcIi5mb3JtLWZpZWxkXCIpLmFkZENsYXNzKGVycm9yQ2xhc3MpO1xyXG5cdFx0fSxcclxuXHRcdHVuaGlnaGxpZ2h0OiBmdW5jdGlvbihlbGVtZW50LCBlcnJvckNsYXNzLCB2YWxpZENsYXNzKSB7XHJcblx0XHRcdCQoZWxlbWVudCkuY2xvc2VzdChcIi5mb3JtLWZpZWxkXCIpLnJlbW92ZUNsYXNzKGVycm9yQ2xhc3MpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbihlcnJvciwgZWxlbWVudCkge1xyXG5cdFx0XHRlcnJvci5hcHBlbmRUbyhlbGVtZW50LmNsb3Nlc3QoXCIuZm9ybS1pbnB1dFwiKSk7XHJcblx0XHR9LFxyXG5cdFx0Ly8g0J7RgtC/0YDQsNCy0LvRj9C10Lwg0LTQsNC90L3Ri9C1INC90LAg0YHQtdGA0LLQtdGAXHJcblx0XHRzdWJtaXRIYW5kbGVyOiBhc3luYyBmdW5jdGlvbihmb3JtLCBldmVudCkge1xyXG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0aWYgKGFudGlzcGFtQmxvY2suYWN0aXZlKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdGFudGlzcGFtQmxvY2suc2V0KChjb3VudGVyLCBsYXN0Q2FsbGJhY2spID0+IHsgaWYgKGxhc3RDYWxsYmFjaykgZW5hYmxlQnRucygpIH0pO1xyXG5cdFx0XHRkaXNhYmxlQnRucygpO1xyXG5cdFx0XHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcclxuXHRcdFx0aWYgKGZvcm1JZCA9PSBcImN2LXJlcXVlc3QtY29udGFjdC1mb3JtXCIpIHtcclxuXHRcdFx0XHRjb25zdCB7IHNlbGVjdGVkRW1wbG95ZWVJZHgsIGVtcGxveWVlcyB9ID0gcGFnZVN0b3JlLnN0YXRlO1xyXG5cdFx0XHRcdGlmIChzZWxlY3RlZEVtcGxveWVlSWR4ID4gLTEgJiYgZW1wbG95ZWVzLmRhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoXCJlbXBsb3llZS1pZFwiLCBlbXBsb3llZXMuZGF0YVtzZWxlY3RlZEVtcGxveWVlSWR4XS5pZCk7XHJcblx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoXCJlbXBsb3llZS1uYW1lXCIsIGVtcGxveWVlcy5kYXRhW3NlbGVjdGVkRW1wbG95ZWVJZHhdLmNyYl9wZXJzb25fbmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gc2VuZENvbnRhY3RSZXF1ZXN0KGZvcm1EYXRhKTtcclxuXHRcdFx0JGZvcm0uZ2V0KDApLnJlc2V0KCk7XHJcblx0XHRcdCRtc2dEYXRhTm90U2VudERpc2Nsb3N1cmUucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xyXG5cdFx0XHRzaG93U3VjY2Nlc3NNc2coKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRmdW5jdGlvbiBkaXNhYmxlQnRucygpIHtcclxuXHRcdCRzZW5kQnRuLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XHJcblx0XHQkd2F0c2FwcENhbGxCdG4uYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcclxuXHR9XHJcblx0ZnVuY3Rpb24gZW5hYmxlQnRucygpIHtcclxuXHRcdCRzZW5kQnRuLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XHJcblx0XHQkd2F0c2FwcENhbGxCdG4ucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcclxuXHR9XHJcblx0ZnVuY3Rpb24gc2hvd1N1Y2NjZXNzTXNnKCkge1xyXG5cdFx0JG1zZ1N1Y2Nlc3NEaXNjbG9zdXJlLmFkZENsYXNzKFwib3BlblwiKTtcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHQkbXNnU3VjY2Vzc0Rpc2Nsb3N1cmUucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xyXG5cdFx0fSwgNTAwMCk7XHJcblx0fVxyXG5cdGZ1bmN0aW9uIHNob3dJc05vdFNlbnRNc2coKSB7XHJcblx0XHQkbXNnRGF0YU5vdFNlbnREaXNjbG9zdXJlLmFkZENsYXNzKFwib3BlblwiKTtcclxuXHR9XHJcblx0YXN5bmMgZnVuY3Rpb24gc2VuZChmb3JtRGF0YSkge1xyXG5cdFx0cmV0dXJuIGF3YWl0IGZldGNoKGAke29yaWdpbn0vY29udGFjdF9yZXF1ZXN0YCwge1xyXG5cdFx0XHRtZXRob2Q6IFwiUE9TVFwiLFxyXG5cdFx0XHRib2R5OiBmb3JtRGF0YSxcclxuXHRcdFx0cmVkaXJlY3Q6ICdmb2xsb3cnXHJcblx0XHR9KTtcclxuXHR9XHJcbn0iLCJjb25zdCBkZXZNb2RlID0gZmFsc2U7XHJcbmNvbnN0IGNvbnNvbGVMb2dzID0gZGV2TW9kZTtcclxuY29uc3QgY29uc29sZVdhcm5zID0gZGV2TW9kZTtcclxuY29uc3QgY29uc29sZURlYnVnID0gZGV2TW9kZTtcclxuY29uc3QgYWxlcnRPbkxvZyA9IGZhbHNlOyAvLyBBbGVydCBvbiBsb2cgLyBkZWJ1ZyAvIHdhcm5cclxuY29uc3QgYWxlcnRPbkVycm9yID0gZGV2TW9kZTtcclxuXHJcbi8vINCf0YDQvtGB0YLQviDQu9C+0LPQuNGA0L7QstCw0L3QuNC1INC60LDQutC+0LPQvi3RgtC+INGB0L7QsdGL0YLQuNGPXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2coLi4uYXJncykge1xyXG5cdGlmIChjb25zb2xlTG9ncykgY29uc29sZS5sb2coLi4uYXJncyk7XHJcblx0aWYgKGFsZXJ0T25Mb2cpIGFsZXJ0KGFyZ3Muam9pbihcIiA6OiBcIikpO1xyXG59XHJcbi8vINCe0YHQvtCx0YvQtSDQtNCw0L3QvdGL0LUg0LTQu9GPINC+0YLQu9Cw0LTQutC4XHJcbmV4cG9ydCBmdW5jdGlvbiBkZWJ1ZyguLi5hcmdzKSB7XHJcblx0aWYgKGNvbnNvbGVEZWJ1ZykgY29uc29sZS5kZWJ1ZyguLi5hcmdzKTtcclxuXHRpZiAoYWxlcnRPbkxvZykgYWxlcnQoYXJncy5qb2luKFwiIDo6IFwiKSk7XHJcbn1cclxuLy8g0J/RgNC40LvQvtC20LXQvdC40LUg0LHRi9GB0YLRgNC10LUg0LLRgdC10LPQviDQv9GA0L7QtNC+0LvQttC40YIg0YDQsNCx0L7RgtCw0YLRjCDQsdC10Lcg0YHQsdC+0LXQsiwg0L3QviDRjdGC0LAg0YfQsNGB0YLRjCDQutC+0LTQsCDQvdC1INC+0LbQuNC00LDQtdGC0YHRjyDQuiDQstGL0L/QvtC70L3QtdC90LjRji5cclxuZXhwb3J0IGZ1bmN0aW9uIHdhcm4oLi4uYXJncykge1xyXG5cdGlmIChjb25zb2xlV2FybnMpIGNvbnNvbGUud2FybiguLi5hcmdzKTtcclxuXHRpZiAoYWxlcnRPbkxvZykgYWxlcnQoYXJncy5qb2luKFwiIDo6IFwiKSk7XHJcbn1cclxuLy8g0JrRgNC40YLQuNGH0LXRgdC60LDRjyDQvtGI0LjQsdC60LAg0LIg0L/RgNC40LvQvtC20LXQvdC40LhcclxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yKC4uLmFyZ3MpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoLi4uYXJncyk7XHJcblx0aWYgKGFsZXJ0T25FcnJvcikgYWxlcnQoYXJncy5qb2luKFwiIDo6IFwiKSk7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGxvZ2dlciA9IHtcclxuXHRsb2csXHJcblx0ZGVidWcsXHJcblx0d2FybixcclxuXHRlcnJvclxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5fX3N1YnNjcmliZXJzID0ge307XHJcblx0fVxyXG5cdG9uKG5hbWUsIGNhbGxiYWNrKSB7XHJcblx0XHRpZiAoIShuYW1lIGluIHRoaXMuX19zdWJzY3JpYmVycykpIHRoaXMuX19zdWJzY3JpYmVyc1tuYW1lXSA9IFtdO1xyXG5cdFx0dGhpcy5fX3N1YnNjcmliZXJzW25hbWVdLnB1c2goY2FsbGJhY2spO1xyXG5cdH1cclxuXHRvZmYobmFtZSwgY2FsbGJhY2spIHtcclxuXHRcdGlmIChuYW1lIGluIHRoaXMuX19zdWJzY3JpYmVycykge1xyXG5cdFx0XHR0aGlzLl9fc3Vic2NyaWJlcnNbbmFtZV0gPSB0aGlzLl9fc3Vic2NyaWJlcnNbbmFtZV0uZmlsdGVyKHJlZ2lzdGVyZWRDYWxsYmFjayA9PiByZWdpc3RlcmVkQ2FsbGJhY2sgPT09IGNhbGxiYWNrKTtcclxuXHRcdH1cclxuXHR9XHJcblx0ZW1pdChuYW1lLCBwYXlsb2FkKSB7XHJcblx0XHRpZiAobmFtZSBpbiB0aGlzLl9fc3Vic2NyaWJlcnMpIHtcclxuXHRcdFx0dGhpcy5fX3N1YnNjcmliZXJzW25hbWVdLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2socGF5bG9hZCkpO1xyXG5cdFx0fVxyXG5cdH1cclxufSIsImNvbnN0IG9yaWdpbiA9IFwiaHR0cHM6Ly90ZWFtLndlYi15b3UucGwvXCI7IC8vIHdpbmRvdy5vcmlnaW5cclxuZXhwb3J0IGNvbnN0IGFwaVVybCA9IGAke29yaWdpbn0vd3AtanNvbi93cC92MmA7XHJcbmV4cG9ydCBjb25zdCBjdXN0b21BcGlVcmwgPSBgJHtvcmlnaW59L3dwLWpzb24vY3VzdG9tL3YxYDsiLCJpbXBvcnQgeyBjdXN0b21BcGlVcmwgfSBmcm9tIFwiLi9jb25maWcuanNcIjtcclxuaW1wb3J0ICB7IGVycm9yT25CYWRSZXNwb25jZSB9IGZyb20gXCIuL2Vycm9ycy5qc1wiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRDb250YWN0UmVxdWVzdChkYXRhKSB7XHJcblx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtjdXN0b21BcGlVcmx9L2NvbnRhY3QtcmVxdWVzdC9gLCB7XHJcblx0XHRtZXRob2Q6IFwiUE9TVFwiLFxyXG5cdFx0Ym9keTogZGF0YSxcclxuXHR9KTtcclxuXHRlcnJvck9uQmFkUmVzcG9uY2UocmVzcG9uc2UpO1xyXG5cdHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbn0iLCJpbXBvcnQgbW9kdWxlTWFuYWdlciBmcm9tIFwiLi4vTW9kdWxlTWFuYWdlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyBhcGlVcmwgfSBmcm9tIFwiLi9jb25maWcuanNcIjtcclxuaW1wb3J0ICB7IGVycm9yT25CYWRSZXNwb25jZSB9IGZyb20gXCIuL2Vycm9ycy5qc1wiO1xyXG5pbXBvcnQgeyBpc05vdEVtcHR5U3RyaW5nIH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hEZXBhcnRtZW50RW1wbG95ZWVzKGRlcGFydG1lbnRJZCkge1xyXG5cdGNvbnN0IHN0b3JlID0gbW9kdWxlTWFuYWdlci51c2UoXCJwYWdlU3RvcmVcIik7XHJcblx0Y29uc3Qgc29ydEVtcGxveWVlcyA9IChhLCBiKSA9PiB7XHJcblx0XHRcdGNvbnN0IGFPcmRlciA9IGEuY3JiX29yZGVyO1xyXG5cdFx0XHRjb25zdCBiT3JkZXIgPSBiLmNyYl9vcmRlcjtcclxuXHRcdFx0aWYgKGlzTm90RW1wdHlTdHJpbmcoYU9yZGVyKSAmJiBpc05vdEVtcHR5U3RyaW5nKGJPcmRlcikpIHtcclxuXHRcdFx0XHRyZXR1cm4gTnVtYmVyKGFPcmRlcikgLSBOdW1iZXIoYk9yZGVyKTtcclxuXHRcdFx0fSBlbHNlIGlmIChpc05vdEVtcHR5U3RyaW5nKGFPcmRlcikpIHtcclxuXHRcdFx0XHRyZXR1cm4gLTE7XHJcblx0XHRcdH0gZWxzZSBpZiAoaXNOb3RFbXB0eVN0cmluZyhiT3JkZXIpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIDA7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0c3RvcmUudXBkYXRlKChzdGF0ZSkgPT4ge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Li4uc3RhdGUsXHJcblx0XHRcdGVtcGxveWVlczogeyAuLi5zdGF0ZS5lbXBsb3llZXMsIHN0YXR1czogXCJsb2FkaW5nXCIgfVxyXG5cdFx0fTtcclxuXHR9KTtcclxuXHRjb25zdCBlbXBsb3llZXMgPSAoYXdhaXQgZmV0Y2hFbXBsb3llZXMoYGNhdGVnb3JpZXM9JHtkZXBhcnRtZW50SWR9YCkpLnNvcnQoc29ydEVtcGxveWVlcyk7XHJcblx0ZW1wbG95ZWVzLmZvckVhY2goKGRhdGEsIGlkeCkgPT4gZGF0YS5fX2lkeCA9IGlkeCk7XHJcblx0c3RvcmUudXBkYXRlKChzdGF0ZSkgPT4ge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Li4uc3RhdGUsXHJcblx0XHRcdGVtcGxveWVlczogeyAuLi5zdGF0ZS5lbXBsb3llZXMsIHN0YXR1czogXCJpZGxlXCIsIGRhdGE6IGVtcGxveWVlcyB9XHJcblx0XHR9O1xyXG5cdH0pO1xyXG5cdHJldHVybiBlbXBsb3llZXM7XHJcbn1cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoRW1wbG95ZWVzKHF1ZXJ5KSB7XHJcblx0Y29uc3Qgc3RvcmUgPSBtb2R1bGVNYW5hZ2VyLnVzZShcInBhZ2VTdG9yZVwiKTtcclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHthcGlVcmx9L2VtcGxveWVlcz9wZXJfcGFnZT0xMDAmJHtxdWVyeX1gLCB7XHJcblx0XHRcdG1ldGhvZDogXCJHRVRcIlxyXG5cdFx0fSk7XHJcblx0XHRlcnJvck9uQmFkUmVzcG9uY2UocmVzcG9uc2UpO1xyXG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuXHR9IGNhdGNoIChleCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIHdoaWxlIGZldGNoZWVuZyBlbXBsb3llZXNcIik7XHJcblx0fVxyXG59XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaERlcGFydG1lbnRzKCkge1xyXG5cdGNvbnN0IHN0b3JlID0gbW9kdWxlTWFuYWdlci51c2UoXCJwYWdlU3RvcmVcIik7XHJcblx0Y29uc3QgbGFuZ01hcCA9IHtcclxuXHRcdFwiZW4tVVNcIjogXCJlblwiLFxyXG5cdFx0XCJwbC1QTFwiOiBcInBsXCIsXHJcblx0fTtcclxuXHRjb25zdCBsYW5nID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImxhbmdcIik7XHJcblx0XHRjb25zb2xlLmxvZyhsYW5nKTtcclxuXHRzdG9yZS51cGRhdGUoKHN0YXRlKSA9PiB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQuLi5zdGF0ZSxcclxuXHRcdFx0ZGVwYXJ0bWVudHM6IHsgLi4uc3RhdGUuZGVwYXJ0bWVudHMsIHN0YXR1czogXCJsb2FkaW5nXCIgfVxyXG5cdFx0fTtcclxuXHR9KTtcclxuXHRcdGNvbnNvbGUubG9nKGxhbmdNYXBbbGFuZ10pO1xyXG5cdGNvbnN0IGVtcGxveWVlc0NhdGVnb3J5ID0gYXdhaXQgZmV0Y2hDYXRlZ29yeShgZW1wbG95ZWVzLSR7bGFuZ01hcFtsYW5nXX1gKTtcclxuXHRcdGNvbnNvbGUubG9nKGVtcGxveWVlc0NhdGVnb3J5KTtcclxuXHRjb25zdCBkZXBhcnRtZW50c0xpc3QgPSBhd2FpdCBmZXRjaENhdGVnb3JpZXMoYHBhcmVudD0ke2VtcGxveWVlc0NhdGVnb3J5LmlkfWApO1xyXG5cdHN0b3JlLnVwZGF0ZSgoc3RhdGUpID0+IHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdC4uLnN0YXRlLFxyXG5cdFx0XHRkZXBhcnRtZW50czogeyAuLi5zdGF0ZS5kZXBhcnRtZW50cywgc3RhdHVzOiBcImlkbGVcIiwgZGF0YTogZGVwYXJ0bWVudHNMaXN0IH1cclxuXHRcdH07XHJcblx0fSk7XHJcbn1cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQ2F0ZWdvcnkoc2x1Zykge1xyXG5cdGNvbnN0IHN0b3JlID0gbW9kdWxlTWFuYWdlci51c2UoXCJwYWdlU3RvcmVcIik7XHJcblx0XHRjb25zb2xlLmxvZyhgZmV0Y2hDYXRlZ29yeS4gc2x1ZzogJHtzbHVnfWApO1xyXG5cdGNvbnN0IHF1ZXJ5ID0gYHNsdWc9JHtzbHVnfWA7XHJcblx0cmV0dXJuIChhd2FpdCBmZXRjaENhdGVnb3JpZXMocXVlcnkpKVswXTtcclxufVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hDYXRlZ29yaWVzKHF1ZXJ5KSB7XHJcblx0Y29uc3Qgc3RvcmUgPSBtb2R1bGVNYW5hZ2VyLnVzZShcInBhZ2VTdG9yZVwiKTtcclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHthcGlVcmx9L2NhdGVnb3JpZXM/JHtxdWVyeX1gLCB7XHJcblx0XHRcdG1ldGhvZDogXCJHRVRcIlxyXG5cdFx0fSk7XHJcblx0XHRlcnJvck9uQmFkUmVzcG9uY2UocmVzcG9uc2UpO1xyXG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuXHR9IGNhdGNoIChleCkge1xyXG5cdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIHdoaWxlIGZldGNoaW5nIGNhdGVnb3JpZXNcIiwgZXgpO1xyXG5cdH1cclxufSIsImV4cG9ydCBjbGFzcyBCYWRSZXNwb25zZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG5cdGNvbnN0cnVjdG9yKHJlc3BvbnNlLCBtc2cpIHtcclxuXHRcdHN1cGVyKG1zZyB8fCBcIkJhZCByZXNwb25zZSAobm90IG9rKVwiKTtcclxuXHRcdHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGVycm9yT25CYWRSZXNwb25jZShyZXNwb25zZSkge1xyXG5cdGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBCYWRSZXNwb25zZUVycm9yKHJlc3BvbnNlKTtcclxufSIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcIi4uL3BhdHRlcm5zL0V2ZW50RW1pdHRlci5qc1wiO1xyXG5leHBvcnQgY2xhc3MgU3RvcmUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cdGNvbnN0cnVjdG9yKGluaXRpYWxTdGF0ZSA9IHt9KSB7XHJcblx0XHRzdXBlcigpO1xyXG5cdFx0dGhpcy5wcmV2U3RhdGUgPSB7fTtcclxuXHRcdHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XHJcblx0fVxyXG5cdHVwZGF0ZShyZWR1Y2VyKSB7XHJcblx0XHR0aGlzLnByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XHJcblx0XHR0aGlzLnN0YXRlID0gcmVkdWNlcih0aGlzLnN0YXRlKTtcclxuXHRcdHRoaXMuZW1pdChcInVwZGF0ZVwiLCB7IHN0YXRlOiB0aGlzLnN0YXRlLCBwcmV2U3RhdGU6IHRoaXMucHJldlN0YXRlIH0pO1xyXG5cdH1cclxufTsiLCJleHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcclxuXHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc05vdEVtcHR5U3RyaW5nKHZhbHVlKSB7XHJcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPiAwO1xyXG59IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcImRhYTVjMjEwNTQ4Y2JkNDA4YTJkXCI7IH0iXSwibmFtZXMiOlsib25seUVycm9yc1RvQ29uc29sZSIsImNvbnNvbGVMb2dzIiwiY29uc29sZURlYnVnIiwiYWxlcnRPbkVycm9yIiwiYWxlcnRPbkxvZyIsImxvZyIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiY29uc29sZSIsImFsZXJ0Iiwiam9pbiIsImRlYnVnIiwiZXJyb3IiLCJfbGVuMiIsIl9rZXkyIiwibW9kdWxlTWFuYWdlciIsIk1vZHVsZSIsImluaXRTdG9yZSIsImluaXRUZWFtU2VsZWN0U2xpZGVyIiwiaW5pdFRlYW1hdGVzU2xpZGVycyIsImluaXRDb250YWN0Rm9ybSIsImZldGNoRGVwYXJ0bWVudHMiLCJmZXRjaERlcGFydG1lbnRFbXBsb3llZXMiLCJlbnRyeSIsImNvbnRleHQiLCJtb2R1bGUiLCJwYWdlU3RvcmUiLCJldmVudHMiLCJvbiIsIl9yZWYiLCJzdGF0ZSIsInByZXZTdGF0ZSIsImRvY3VtZW50IiwicmVhZHlTdGF0ZSIsIm9uRG9tUmVhZHkiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJpbml0TmF2VG9Qcm9maWxlIiwiaW5pdEVtbG95ZWVWaWV3IiwiaW5pdERlcGFydG1lbnRWaWV3IiwiaW5pdERlcGFydG1lbnRzRmlsdGVyIiwiZXgiLCJwYWdlIiwibmFtZSIsInJlcXVpcmVkIiwiYWRkIiwic3RvcmUiLCIkIiwiX3JlZjIiLCJ0YXJnZXQiLCIkaGVhZGVyIiwiJHByb2ZpbGUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImNsb3Nlc3QiLCJwcm9maWxlQmNyIiwiZ2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaGVhZGVySGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJzY3JvbGxUbyIsInRvcCIsInNjcm9sbFkiLCJiZWhhdmlvciIsIiRwcm9maWxlV3JhcHBlciIsInByb2ZpbGVUZW1wbGF0ZSIsImh0bWwiLCIkc2tpbGxzUmF0ZXNXcmFwcGVyIiwic2tpbGxzUmF0ZXNUZW1wbGF0ZSIsIiR0YWdzQ2xvdWRXcmFwcGVyIiwidGFnc0Nsb3VkVGVtcGxhdGUiLCJNdXN0YWNoZSIsInBhcnNlIiwiX3JlZjMiLCJkcmF3ZXJzIiwib3BlbiIsIl9yZWY0Iiwic2VsZWN0ZWRFbXBsb3llZUlkeCIsImVtcGxveWVlcyIsInN0YXR1cyIsImRhdGEiLCJzZWxlY3RlZEVtcGxveWVlRGF0YSIsInRpdGxlIiwicmVuZGVyZWQiLCJyZW5kZXJQcm9maWxlIiwiYWN0aXZlU2xpZGVFbGVtIiwicXVlcnlTZWxlY3RvciIsInRpdGxlRnJvbVNsaWRlIiwiZ2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJyZW5kZXJTa2lsbHNSYXRlcyIsImNyYl9za2lsbHNfbGlzdCIsInJlbmRlclRhZ3NDbG91ZCIsInJlbmRlciIsImZpbmFsaXplZERhdGEiLCJtYXAiLCJfcmVmNSIsImNyYl9uYW1lIiwiY3JiX3JhdGUiLCJfcmVmNiIsImNyYl9tYWluX21lc3NhZ2UiLCJjcmJfdGFnc19jbG91ZCIsInNlY3Rpb25DdXQiLCJnZW5lcmF0ZURlZ3JlZU9mZnNldCIsIk1hdGgiLCJyYW5kb20iLCJ0YWdzIiwiaWR4IiwidGhpc1NlY3Rpb25DdXQiLCIkd3JhcHBlciIsInRlbXBsYXRlIiwiX3JlZjciLCJfcmVmOCIsInNlbGVjdGVkRGVwYXJ0bWVudElkIiwiZW1pdCIsImFjdGl2ZUVsZW0iLCJfcmVmOSIsImRlcGFydG1lbnRzIiwiZmlyc3RFbGVtIiwiZmluZCIsImZpcnN0Iiwic2V0QWN0aXZlIiwiX3JlZjEwIiwiaGFzQXR0cmlidXRlIiwiZWxlbSIsInJlbW92ZSIsImRlcGFydG1lbnRJZCIsInVwZGF0ZSIsInByZXNlcnZlIiwiaXRlbSIsInNsdWciLCJpZCIsImh0bWxfcmVwcmVzZW50YXRpb24iLCJ0ZWFtYXRlc1NsaWRlcnMiLCJTd2lwZXIiLCJvYnNlcnZlciIsInJlc2l6ZU9ic2VydmVyIiwic2xpZGVzUGVyVmlldyIsImdyYWJDdXJzb3IiLCJjZW50ZXJlZFNsaWRlcyIsImJyZWFrcG9pbnRzIiwiY3VycmVudFNsaWRlTnVtYmVyRWxlbSIsInRvdGFsU2xpZGVzTnVtYmVyRWxlbSIsInNsaWRlciIsImxvb3AiLCJlZmZlY3QiLCJjb3ZlcmZsb3dFZmZlY3QiLCJyb3RhdGUiLCJzdHJldGNoIiwiZGVwdGgiLCJtb2RpZmllciIsInNsaWRlU2hhZG93cyIsImF1dG9wbGF5IiwiZGVsYXkiLCJuYXZpZ2F0aW9uIiwicHJldkVsIiwibmV4dEVsIiwic2xpZGVDaGFuZ2UiLCJzbGlkZXMiLCJhY3RpdmVTbGlkZSIsImFjdGl2ZUluZGV4IiwiZm9yRWFjaCIsInNsaWRlIiwiaW5kZXgiLCJwb3NpdGlvbiIsInNldEF0dHJpYnV0ZSIsImZpbmRBY3RpdmVTbGlkZSIsInByb2Nlc3NTbGlkZUNoYW5nZSIsInVwZGF0ZVByb2ZpbGVTZWN0aW9uRnJvbVNsaWRlIiwiYWZ0ZXJJbml0Iiwic3dpcGVyIiwiaW5pdFNlbGVjdEJ5Q2xpY2siLCJnZXRTbGlkZXMiLCJzZXRTbGlkZXNJZHgiLCJzZXRUb3RhbCIsIm9ic2VydmVyVXBkYXRlIiwic2V0VGltZW91dCIsInNsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0IiwiYWN0aXZlU2xpZGVJZHgiLCJzZXRTbGlkZXNPcmRlciIsInNsaWRlVG8iLCJzZXRTZWxlY3RlZEVtcGxveWVlIiwiY2FyZElkeCIsIk51bWJlciIsInVwZGF0ZUFjdGl2ZVNsaWRlTnVtYmVyIiwid3JhcHBlckVsIiwic2xpZGVSb290RWxlbSIsIm51bWJlciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmaW5kSW5kZXgiLCJyZWNhbGNEZXB0aCIsIm1pbiIsImNlaWwiLCJsZWZ0RWRnZUlkeCIsIm1heCIsInJpZ2h0RWRnZUlkeCIsInNsaWNlIiwicmV2ZXJzZSIsIlN0b3JlIiwiaW5pdGlhbFN0YXRlIiwiaW5pdCIsIk1haW5TY29wZUlzQnVzeUVycm9yIiwiRXJyb3IiLCJjb25zdHJ1Y3RvciIsIk1vZHVsZUlzTm90UmVhZHlUb1VzZUVycm9yIiwiaXNTdHJpbmciLCJ3YXJuIiwiRXZlbnRFbWl0dGVyIiwiaW5pdGlhbFN0cnVjdCIsIl9fYXBwX18iLCJyZWdpc3RlcmVkIiwiTWFwIiwicmVhZHkiLCJkZXBlbmRlbmNpZXMiLCJwcm9wcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJPYmplY3QiLCJhc3NpZ24iLCJjbGVhbnVwIiwidmFsdWUiLCJkZXRvdWNoIiwiTW9kdWxlTWFuYWdlciIsInVuZGVmaW5lZCIsImlzUmVhZHkiLCJoYXMiLCJldmVyeSIsImlzUmVnaXN0ZXJlZCIsInNldEFzUmVhZHkiLCJzZXQiLCJzZXRBc1JlZ2lzdGVyZWQiLCJhZGREZXBlbmRlbmNpZXMiLCJzcmNOYW1lIiwidGFyZ2V0TmFtZSIsIlNldCIsInJlbW92ZURlcGVuZGVuY2llcyIsImhhc1JlZmVyZW5jZXMiLCJnZXRSZWZlcmVuY2VzIiwic2l6ZSIsInVzZSIsImZvcmNlIiwiZnJvbSIsInNlbmRDb250YWN0UmVxdWVzdCIsIkFudGlzcGFtQmxvY2siLCJkdXJhdGlvbiIsInRpbWVyIiwidW5zZXQiLCJjbGVhckludGVydmFsIiwiY2FsbGJhY2siLCJhY3RpdmUiLCJjb3VudGVyIiwic2V0SW50ZXJ2YWwiLCJsYXN0Q2FsbGJhY2siLCJyZWR1Y2VJdGVyYXRvciIsIml0ZXJhdG9yIiwiYWNjIiwiY3VycmVudCIsIm5leHQiLCJwdXNoIiwiZG9uZSIsImZvcm1JZCIsImFudGlzcGFtQmxvY2siLCIkbXNnRGF0YU5vdFNlbnREaXNjbG9zdXJlIiwiJG1zZ1N1Y2Nlc3NEaXNjbG9zdXJlIiwiJHNlbmRCdG4iLCIkd2F0c2FwcENhbGxCdG4iLCIkZm9ybSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJ2YWx1ZXMiLCJzb21lIiwic2hvd0lzTm90U2VudE1zZyIsInZhbGlkYXRvciIsInZhbGlkYXRlIiwiaWdub3JlIiwiaGlnaGxpZ2h0IiwiZWxlbWVudCIsImVycm9yQ2xhc3MiLCJ2YWxpZENsYXNzIiwiYWRkQ2xhc3MiLCJ1bmhpZ2hsaWdodCIsInJlbW92ZUNsYXNzIiwiZXJyb3JQbGFjZW1lbnQiLCJhcHBlbmRUbyIsInN1Ym1pdEhhbmRsZXIiLCJmb3JtIiwicHJldmVudERlZmF1bHQiLCJlbmFibGVCdG5zIiwiZGlzYWJsZUJ0bnMiLCJhcHBlbmQiLCJjcmJfcGVyc29uX25hbWUiLCJyZXNwb25zZSIsInJlc2V0Iiwic2hvd1N1Y2NjZXNzTXNnIiwic2VuZCIsImZldGNoIiwib3JpZ2luIiwibWV0aG9kIiwiYm9keSIsInJlZGlyZWN0IiwiZGV2TW9kZSIsImNvbnNvbGVXYXJucyIsIl9sZW4zIiwiX2tleTMiLCJfbGVuNCIsIl9rZXk0IiwibG9nZ2VyIiwiX19zdWJzY3JpYmVycyIsIm9mZiIsImZpbHRlciIsInJlZ2lzdGVyZWRDYWxsYmFjayIsInBheWxvYWQiLCJhcGlVcmwiLCJjdXN0b21BcGlVcmwiLCJlcnJvck9uQmFkUmVzcG9uY2UiLCJqc29uIiwiaXNOb3RFbXB0eVN0cmluZyIsInNvcnRFbXBsb3llZXMiLCJhIiwiYiIsImFPcmRlciIsImNyYl9vcmRlciIsImJPcmRlciIsImZldGNoRW1wbG95ZWVzIiwic29ydCIsIl9faWR4IiwicXVlcnkiLCJsYW5nTWFwIiwibGFuZyIsImRvY3VtZW50RWxlbWVudCIsImVtcGxveWVlc0NhdGVnb3J5IiwiZmV0Y2hDYXRlZ29yeSIsImRlcGFydG1lbnRzTGlzdCIsImZldGNoQ2F0ZWdvcmllcyIsIkJhZFJlc3BvbnNlRXJyb3IiLCJtc2ciLCJvayIsInJlZHVjZXIiXSwic291cmNlUm9vdCI6IiJ9