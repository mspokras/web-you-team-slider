"use strict";
self["webpackHotUpdatefls_start"]("home",{

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
    const title = selectedEmployeeData.title;
    renderProfile(status, selectedEmployeeData);
    const activeSlideElem = document.querySelector(".teamates__swiper-slide-active");
    const titleFromSlide = activeSlideElem.getAttribute("data-title");
    document.querySelector(".profile__title").textContent = titleFromSlide;
    renderSkillsRates(status, selectedEmployeeData.crb_skills_list);
    renderTagsCloud(status, selectedEmployeeData);
  });
  function renderProfile(status, data, title) {
    $profileWrapper.html(Mustache.render(profileTemplate, data));
    emloyeeview;
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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "5474b98ee8da5ebb9848"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS4zZWNhNzcwZTQ4NTUwNzFiMWEyZS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNEU7QUFDbkM7QUFDZ0M7QUFDWDtBQUlsQjtBQUMyQjtBQUV2RUUsMkRBQVMsQ0FBQyxDQUFDO0FBRVgsTUFBTVMsS0FBSyxHQUFHQSxDQUFDQyxPQUFPLEVBQUVDLE1BQU0sS0FBSztFQUNqQyxNQUFNO0lBQUVDLFNBQVM7SUFBRUM7RUFBTyxDQUFDLEdBQUdILE9BQU87RUFFckNFLFNBQVMsQ0FBQ0UsRUFBRSxDQUFDLFFBQVEsRUFBRUMsSUFBQTtJQUFBLElBQUM7TUFBRUMsS0FBSztNQUFFQztJQUFVLENBQUMsR0FBQUYsSUFBQTtJQUFBLE9BQzFDRyxPQUFPLENBQUNaLEdBQUcsQ0FBQ1UsS0FBSyxFQUFFQyxTQUFTLENBQUM7RUFBQSxDQUMvQixDQUFDO0VBRUQsSUFBSUUsUUFBUSxDQUFDQyxVQUFVLEtBQUssYUFBYSxFQUFFO0lBQ3pDQyxVQUFVLENBQUMsQ0FBQztFQUNkLENBQUMsTUFBTTtJQUNMQyxNQUFNLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFRixVQUFVLENBQUM7RUFDekQ7RUFDQSxTQUFTQSxVQUFVQSxDQUFDRyxLQUFLLEVBQUU7SUFDekIsSUFBSTtNQUNGdkIsaUVBQW9CLENBQUNXLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQ3ZDWCxnRUFBbUIsQ0FBQ1UsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFDdENZLGdCQUFnQixDQUFDYixTQUFTLEVBQUVDLE1BQU0sQ0FBQztNQUNuQ1YsdUVBQWUsQ0FBQyxtQkFBbUIsRUFBRVMsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFDdkRWLHVFQUFlLENBQUMseUJBQXlCLEVBQUVTLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQzdEYSxlQUFlLENBQUNkLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQ2xDYyxrQkFBa0IsQ0FBQ2YsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFD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cy1zdGFydC8uL3NyYy9qcy9wYWdlcy9ob21lL2luZGV4LmpzIiwid2VicGFjazovL2Zscy1zdGFydC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vZHVsZU1hbmFnZXIsIHsgTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9Nb2R1bGVNYW5hZ2VyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpbml0U3RvcmUgZnJvbSBcIi4vc3RvcmUvaW5kZXguanNcIjtcclxuaW1wb3J0IHsgaW5pdFRlYW1TZWxlY3RTbGlkZXIsIGluaXRUZWFtYXRlc1NsaWRlcnMgfSBmcm9tIFwiLi9zbGlkZXJzLmpzXCI7XHJcbmltcG9ydCB7IGluaXRDb250YWN0Rm9ybSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY29udGFjdEZvcm0uanNcIjtcclxuaW1wb3J0IHtcclxuICBmZXRjaERlcGFydG1lbnRzLFxyXG4gIGZldGNoRGVwYXJ0bWVudEVtcGxveWVlcyxcclxufSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2VtcGxveWVlcy5qc1wiO1xyXG5pbXBvcnQgeyBsb2csIGVycm9yLCBkZWJ1ZyB9IGZyb20gXCIuLi8uLi8uLi8uLi9yZXBvL2pzL2xpYnMvbG9nZ2VyLmpzXCI7XHJcblxyXG5pbml0U3RvcmUoKTtcclxuXHJcbmNvbnN0IGVudHJ5ID0gKGNvbnRleHQsIG1vZHVsZSkgPT4ge1xyXG4gIGNvbnN0IHsgcGFnZVN0b3JlLCBldmVudHMgfSA9IGNvbnRleHQ7XHJcblxyXG4gIHBhZ2VTdG9yZS5vbihcInVwZGF0ZVwiLCAoeyBzdGF0ZSwgcHJldlN0YXRlIH0pID0+XHJcbiAgICBjb25zb2xlLmxvZyhzdGF0ZSwgcHJldlN0YXRlKVxyXG4gICk7XHJcblxyXG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpIHtcclxuICAgIG9uRG9tUmVhZHkoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG9uRG9tUmVhZHkpO1xyXG4gIH1cclxuICBmdW5jdGlvbiBvbkRvbVJlYWR5KGV2ZW50KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpbml0VGVhbVNlbGVjdFNsaWRlcihwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXRUZWFtYXRlc1NsaWRlcnMocGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0TmF2VG9Qcm9maWxlKHBhZ2VTdG9yZSwgZXZlbnRzKTtcclxuICAgICAgaW5pdENvbnRhY3RGb3JtKFwibWFpbi1jb250YWN0LWZvcm1cIiwgcGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0Q29udGFjdEZvcm0oXCJjdi1yZXF1ZXN0LWNvbnRhY3QtZm9ybVwiLCBwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXRFbWxveWVlVmlldyhwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXREZXBhcnRtZW50VmlldyhwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXREZXBhcnRtZW50c0ZpbHRlcihwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICBlcnJvcihleCk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcGFnZSA9IG5ldyBNb2R1bGUoe1xyXG4gIG5hbWU6IFwicGFnZVwiLFxyXG4gIGVudHJ5OiBlbnRyeSxcclxuICByZXF1aXJlZDogW1wiZXZlbnRzXCIsIFwiY29tbW9uU3RvcmVcIiwgXCJwYWdlU3RvcmVcIl0sXHJcbn0pO1xyXG5tb2R1bGVNYW5hZ2VyLmFkZChwYWdlKTtcclxuXHJcbmZ1bmN0aW9uIGluaXROYXZUb1Byb2ZpbGUoc3RvcmUsIGV2ZW50cykge1xyXG4gICQoXCIjdGVhbWF0ZXMtbGlzdC13cmFwcGVyXCIpLm9uKFwiY2xpY2tcIiwgKHsgdGFyZ2V0IH0pID0+IHtcclxuICAgIGNvbnN0ICRoZWFkZXIgPSAkKFwiaGVhZGVyXCIpO1xyXG4gICAgY29uc3QgJHByb2ZpbGUgPSAkKFwiI3Byb2ZpbGVcIik7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGVhbWF0ZS1jYXJkX19idG5cIikgJiZcclxuICAgICAgIXRhcmdldC5jbG9zZXN0KFwiLnRlYW1hdGUtY2FyZF9fYnRuXCIpXHJcbiAgICApXHJcbiAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHByb2ZpbGVCY3IgPSAkcHJvZmlsZS5nZXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICB0b3A6IHdpbmRvdy5zY3JvbGxZICsgcHJvZmlsZUJjci50b3AgLSBoZWFkZXJIZWlnaHQsXHJcbiAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdEVtbG95ZWVWaWV3KHN0b3JlLCBldmVudHMpIHtcclxuICBjb25zdCAkcHJvZmlsZVdyYXBwZXIgPSAkKFwiI3Byb2ZpbGUtbWFpblwiKTtcclxuICBjb25zdCBwcm9maWxlVGVtcGxhdGUgPSAkKFwiI2VtcGxveWVlLXByb2ZpbGUtdGVtcGxhdGVcIikuaHRtbCgpO1xyXG4gIGNvbnN0ICRza2lsbHNSYXRlc1dyYXBwZXIgPSAkKFwiI3Byb2ZpbGUtc2tpbGxzLXJhdGVzXCIpO1xyXG4gIGNvbnN0IHNraWxsc1JhdGVzVGVtcGxhdGUgPSAkKFwiI2VtcGxveWVlLXNraWxscy1yYXRlcy10ZW1wbGF0ZVwiKS5odG1sKCk7XHJcbiAgY29uc3QgJHRhZ3NDbG91ZFdyYXBwZXIgPSAkKFwiI3Byb2ZpbGUtdGFncy1jbG91ZFwiKTtcclxuICBjb25zdCB0YWdzQ2xvdWRUZW1wbGF0ZSA9ICQoXCIjZW1wbG95ZWUtdGFncy1jbG91ZC10ZW1wbGF0ZVwiKS5odG1sKCk7XHJcbiAgTXVzdGFjaGUucGFyc2UocHJvZmlsZVRlbXBsYXRlKTtcclxuICBNdXN0YWNoZS5wYXJzZShza2lsbHNSYXRlc1RlbXBsYXRlKTtcclxuICBNdXN0YWNoZS5wYXJzZSh0YWdzQ2xvdWRUZW1wbGF0ZSk7XHJcblxyXG4gICRwcm9maWxlV3JhcHBlci5vbihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9maWxlX19kb3dubG9hZC1idG5cIikgfHxcclxuICAgICAgdGFyZ2V0LmNsb3Nlc3QoXCIucHJvZmlsZV9fZG93bmxvYWQtYnRuXCIpXHJcbiAgICApIHtcclxuICAgICAgZHJhd2Vycy5vcGVuKFwiY3YtcmVxdWVzdC1mb3JtXCIsIHRhcmdldCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHN0b3JlLm9uKFwidXBkYXRlXCIsICh7IHN0YXRlLCBwcmV2U3RhdGUgfSkgPT4ge1xyXG4gICAgaWYgKFxyXG4gICAgICBzdGF0ZS5zZWxlY3RlZEVtcGxveWVlSWR4ID09PSBwcmV2U3RhdGUuc2VsZWN0ZWRFbXBsb3llZUlkeCAmJlxyXG4gICAgICBzdGF0ZS5lbXBsb3llZXMgPT09IHByZXZTdGF0ZS5lbXBsb3llZXNcclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgY29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IHN0YXRlLmVtcGxveWVlcztcclxuICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgY29uc3QgeyBzZWxlY3RlZEVtcGxveWVlSWR4IH0gPSBzdGF0ZTtcclxuICAgIGNvbnN0IHNlbGVjdGVkRW1wbG95ZWVEYXRhID0gZGF0YVtzZWxlY3RlZEVtcGxveWVlSWR4XTtcclxuICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkRW1wbG95ZWVEYXRhKTtcclxuICAgIGNvbnN0IHRpdGxlID0gc2VsZWN0ZWRFbXBsb3llZURhdGEudGl0bGU7XHJcbiAgICByZW5kZXJQcm9maWxlKHN0YXR1cywgc2VsZWN0ZWRFbXBsb3llZURhdGEpO1xyXG4gICAgY29uc3QgYWN0aXZlU2xpZGVFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIudGVhbWF0ZXNfX3N3aXBlci1zbGlkZS1hY3RpdmVcIlxyXG4gICAgKTtcclxuICAgIGNvbnN0IHRpdGxlRnJvbVNsaWRlID0gYWN0aXZlU2xpZGVFbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdGl0bGVcIik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3RpdGxlXCIpLnRleHRDb250ZW50ID0gdGl0bGVGcm9tU2xpZGU7XHJcbiAgICByZW5kZXJTa2lsbHNSYXRlcyhzdGF0dXMsIHNlbGVjdGVkRW1wbG95ZWVEYXRhLmNyYl9za2lsbHNfbGlzdCk7XHJcbiAgICByZW5kZXJUYWdzQ2xvdWQoc3RhdHVzLCBzZWxlY3RlZEVtcGxveWVlRGF0YSk7XHJcbiAgfSk7XHJcbiAgZnVuY3Rpb24gcmVuZGVyUHJvZmlsZShzdGF0dXMsIGRhdGEsIHRpdGxlKSB7XHJcbiAgICAkcHJvZmlsZVdyYXBwZXIuaHRtbChNdXN0YWNoZS5yZW5kZXIocHJvZmlsZVRlbXBsYXRlLCBkYXRhKSk7XHJcbiAgICBlbWxveWVldmlldztcclxuICB9XHJcbiAgZnVuY3Rpb24gcmVuZGVyU2tpbGxzUmF0ZXMoc3RhdHVzLCBkYXRhKSB7XHJcbiAgICBjb25zdCBmaW5hbGl6ZWREYXRhID0gZGF0YS5tYXAoKHsgY3JiX25hbWUsIGNyYl9yYXRlIH0pID0+IHtcclxuICAgICAgcmV0dXJuIHsgY3JiX25hbWUsIGNyYl9yYXRlOiBuZXcgQXJyYXkoY3JiX3JhdGUpIH07XHJcbiAgICB9KTtcclxuICAgICRza2lsbHNSYXRlc1dyYXBwZXIuaHRtbChcclxuICAgICAgTXVzdGFjaGUucmVuZGVyKHNraWxsc1JhdGVzVGVtcGxhdGUsIGZpbmFsaXplZERhdGEpXHJcbiAgICApO1xyXG4gIH1cclxuICBmdW5jdGlvbiByZW5kZXJUYWdzQ2xvdWQoc3RhdHVzLCB7IGNyYl9tYWluX21lc3NhZ2UsIGNyYl90YWdzX2Nsb3VkIH0pIHtcclxuICAgIGNvbnN0IHNlY3Rpb25DdXQgPSAzNjAgLyBjcmJfdGFnc19jbG91ZC5sZW5ndGg7XHJcbiAgICBjb25zdCBnZW5lcmF0ZURlZ3JlZU9mZnNldCA9ICgpID0+XHJcbiAgICAgIC1zZWN0aW9uQ3V0ICogMC4xICsgc2VjdGlvbkN1dCAqIDAuMiAqIE1hdGgucmFuZG9tKCk7XHJcbiAgICBjb25zdCBmaW5hbGl6ZWREYXRhID0ge1xyXG4gICAgICBjcmJfbWFpbl9tZXNzYWdlLFxyXG4gICAgICBjcmJfdGFnc19jbG91ZDogY3JiX3RhZ3NfY2xvdWQubWFwKCh0YWdzLCBpZHgpID0+IHtcclxuICAgICAgICBjb25zdCB0aGlzU2VjdGlvbkN1dCA9IGlkeCAqIHNlY3Rpb25DdXQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLnRhZ3MsXHJcbiAgICAgICAgICBcInBsYWNpbmctZGVncmVlXCI6IGAke3RoaXNTZWN0aW9uQ3V0ICsgZ2VuZXJhdGVEZWdyZWVPZmZzZXQoKX1kZWdgLFxyXG4gICAgICAgICAgXCJkaXN0YW5jZS1zaGlmdFwiOiBgJHstMC4wNSArIDAuMSAqIE1hdGgucmFuZG9tKCl9YCxcclxuICAgICAgICB9O1xyXG4gICAgICB9KSxcclxuICAgIH07XHJcbiAgICBjb25zb2xlLmxvZyhmaW5hbGl6ZWREYXRhKTtcclxuICAgICR0YWdzQ2xvdWRXcmFwcGVyLmh0bWwoTXVzdGFjaGUucmVuZGVyKHRhZ3NDbG91ZFRlbXBsYXRlLCBmaW5hbGl6ZWREYXRhKSk7XHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIGluaXREZXBhcnRtZW50VmlldyhzdG9yZSwgZXZlbnRzKSB7XHJcbiAgY29uc3QgJHdyYXBwZXIgPSAkKFwiI3RlYW1hdGVzLWxpc3Qtd3JhcHBlclwiKTtcclxuICBjb25zdCB0ZW1wbGF0ZSA9ICQoXCIjZW1wbG95ZWUtY2FyZC10ZW1wbGF0ZVwiKS5odG1sKCk7XHJcbiAgTXVzdGFjaGUucGFyc2UodGVtcGxhdGUpO1xyXG5cclxuICBzdG9yZS5vbihcInVwZGF0ZVwiLCAoeyBzdGF0ZSwgcHJldlN0YXRlIH0pID0+IHtcclxuICAgIGlmIChzdGF0ZS5lbXBsb3llZXMgPT09IHByZXZTdGF0ZS5lbXBsb3llZXMpIHJldHVybjtcclxuICAgIGNvbnN0IHsgc3RhdHVzLCBkYXRhIH0gPSBzdGF0ZS5lbXBsb3llZXM7XHJcbiAgICByZW5kZXIoc3RhdHVzLCBkYXRhKTtcclxuICB9KTtcclxuICBzdG9yZS5vbihcInVwZGF0ZVwiLCAoeyBzdGF0ZSwgcHJldlN0YXRlIH0pID0+IHtcclxuICAgIGlmIChzdGF0ZS5zZWxlY3RlZERlcGFydG1lbnRJZCA9PT0gcHJldlN0YXRlLnNlbGVjdGVkRGVwYXJ0bWVudElkKSByZXR1cm47XHJcbiAgICBmZXRjaERlcGFydG1lbnRFbXBsb3llZXMoc3RhdGUuc2VsZWN0ZWREZXBhcnRtZW50SWQpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7IHN0YXR1cywgZGF0YSB9ID0gc3RvcmUuc3RhdGUuZW1wbG95ZWVzO1xyXG4gIHJlbmRlcihzdGF0dXMsIGRhdGEpO1xyXG5cclxuICBmdW5jdGlvbiByZW5kZXIoc3RhdHVzLCBkYXRhKSB7XHJcbiAgICAkd3JhcHBlci5odG1sKE11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgZGF0YSkpO1xyXG4gICAgZXZlbnRzLmVtaXQoXCJzbGlkZVRvRmlyc3RFbXBsb3llZVwiKTtcclxuICB9XHJcbn1cclxuYXN5bmMgZnVuY3Rpb24gaW5pdERlcGFydG1lbnRzRmlsdGVyKHN0b3JlLCBldmVudHMpIHtcclxuICBsZXQgYWN0aXZlRWxlbSA9IG51bGw7XHJcbiAgY29uc3QgJHdyYXBwZXIgPSAkKFwiI2RlcGFydG1lbnQtc2VsZWN0LXdyYXBwZXJcIik7XHJcbiAgc3RvcmUub24oXCJ1cGRhdGVcIiwgKHsgc3RhdGUsIHByZXZTdGF0ZSB9KSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuZGVwYXJ0bWVudHMgPT09IHByZXZTdGF0ZS5kZXBhcnRtZW50cykgcmV0dXJuO1xyXG4gICAgY29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IHN0YXRlLmRlcGFydG1lbnRzO1xyXG4gICAgcmVuZGVyKHN0YXR1cywgZGF0YSk7XHJcbiAgICBjb25zdCBmaXJzdEVsZW0gPSAkd3JhcHBlci5maW5kKFwiW2RhdGEtaWRdXCIpLmZpcnN0KCkuZ2V0KDApO1xyXG4gICAgaWYgKGZpcnN0RWxlbSkgc2V0QWN0aXZlKGZpcnN0RWxlbSk7XHJcbiAgfSk7XHJcbiAgZmV0Y2hEZXBhcnRtZW50cygpO1xyXG4gICR3cmFwcGVyLm9uKFwiY2xpY2tcIiwgKHsgdGFyZ2V0IH0pID0+IHtcclxuICAgIGlmICghdGFyZ2V0Lmhhc0F0dHJpYnV0ZShcImRhdGEtaWRcIikpIHJldHVybjtcclxuICAgIHNldEFjdGl2ZSh0YXJnZXQpO1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBzZXRBY3RpdmUoZWxlbSkge1xyXG4gICAgaWYgKGFjdGl2ZUVsZW0gPT09IGVsZW0pIHJldHVybjtcclxuICAgIGlmIChhY3RpdmVFbGVtKSB7XHJcbiAgICAgIGFjdGl2ZUVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRlcGFydG1lbnRJZCA9IGVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgIHN0b3JlLnVwZGF0ZSgoc3RhdGUpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBzZWxlY3RlZERlcGFydG1lbnRJZDogZGVwYXJ0bWVudElkLFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBhY3RpdmVFbGVtID0gZWxlbTtcclxuICB9XHJcbiAgZnVuY3Rpb24gcmVuZGVyKHN0YXR1cywgZGF0YSkge1xyXG4gICAgJHdyYXBwZXIuaHRtbChwcmVzZXJ2ZShzdGF0dXMsIGRhdGEpKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gcHJlc2VydmUoc3RhdHVzLCBkYXRhKSB7XHJcbiAgICByZXR1cm4gZGF0YVxyXG4gICAgICAubWFwKFxyXG4gICAgICAgIChpdGVtKSA9PiBgPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGV4dC1saW5rIHNlY3Rpb24tbmF2X19idG5cIiBkYXRhLXNsdWc9XCIke2l0ZW0uc2x1Z31cIiBkYXRhLWlkPVwiJHtpdGVtLmlkfVwiPiR7aXRlbS5odG1sX3JlcHJlc2VudGF0aW9ufTwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+YFxyXG4gICAgICApXHJcbiAgICAgIC5qb2luKFwiXCIpO1xyXG4gIH1cclxufVxyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiNTQ3NGI5OGVlOGRhNWViYjk4NDhcIjsgfSJdLCJuYW1lcyI6WyJtb2R1bGVNYW5hZ2VyIiwiTW9kdWxlIiwiaW5pdFN0b3JlIiwiaW5pdFRlYW1TZWxlY3RTbGlkZXIiLCJpbml0VGVhbWF0ZXNTbGlkZXJzIiwiaW5pdENvbnRhY3RGb3JtIiwiZmV0Y2hEZXBhcnRtZW50cyIsImZldGNoRGVwYXJ0bWVudEVtcGxveWVlcyIsImxvZyIsImVycm9yIiwiZGVidWciLCJlbnRyeSIsImNvbnRleHQiLCJtb2R1bGUiLCJwYWdlU3RvcmUiLCJldmVudHMiLCJvbiIsIl9yZWYiLCJzdGF0ZSIsInByZXZTdGF0ZSIsImNvbnNvbGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJvbkRvbVJlYWR5Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiaW5pdE5hdlRvUHJvZmlsZSIsImluaXRFbWxveWVlVmlldyIsImluaXREZXBhcnRtZW50VmlldyIsImluaXREZXBhcnRtZW50c0ZpbHRlciIsImV4IiwicGFnZSIsIm5hbWUiLCJyZXF1aXJlZCIsImFkZCIsInN0b3JlIiwiJCIsIl9yZWYyIiwidGFyZ2V0IiwiJGhlYWRlciIsIiRwcm9maWxlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbG9zZXN0IiwicHJvZmlsZUJjciIsImdldCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlYWRlckhlaWdodCIsIm91dGVySGVpZ2h0Iiwic2Nyb2xsVG8iLCJ0b3AiLCJzY3JvbGxZIiwiYmVoYXZpb3IiLCIkcHJvZmlsZVdyYXBwZXIiLCJwcm9maWxlVGVtcGxhdGUiLCJodG1sIiwiJHNraWxsc1JhdGVzV3JhcHBlciIsInNraWxsc1JhdGVzVGVtcGxhdGUiLCIkdGFnc0Nsb3VkV3JhcHBlciIsInRhZ3NDbG91ZFRlbXBsYXRlIiwiTXVzdGFjaGUiLCJwYXJzZSIsIl9yZWYzIiwiZHJhd2VycyIsIm9wZW4iLCJfcmVmNCIsInNlbGVjdGVkRW1wbG95ZWVJZHgiLCJlbXBsb3llZXMiLCJzdGF0dXMiLCJkYXRhIiwibGVuZ3RoIiwic2VsZWN0ZWRFbXBsb3llZURhdGEiLCJ0aXRsZSIsInJlbmRlclByb2ZpbGUiLCJhY3RpdmVTbGlkZUVsZW0iLCJxdWVyeVNlbGVjdG9yIiwidGl0bGVGcm9tU2xpZGUiLCJnZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsInJlbmRlclNraWxsc1JhdGVzIiwiY3JiX3NraWxsc19saXN0IiwicmVuZGVyVGFnc0Nsb3VkIiwicmVuZGVyIiwiZW1sb3llZXZpZXciLCJmaW5hbGl6ZWREYXRhIiwibWFwIiwiX3JlZjUiLCJjcmJfbmFtZSIsImNyYl9yYXRlIiwiQXJyYXkiLCJfcmVmNiIsImNyYl9tYWluX21lc3NhZ2UiLCJjcmJfdGFnc19jbG91ZCIsInNlY3Rpb25DdXQiLCJnZW5lcmF0ZURlZ3JlZU9mZnNldCIsIk1hdGgiLCJyYW5kb20iLCJ0YWdzIiwiaWR4IiwidGhpc1NlY3Rpb25DdXQiLCIkd3JhcHBlciIsInRlbXBsYXRlIiwiX3JlZjciLCJfcmVmOCIsInNlbGVjdGVkRGVwYXJ0bWVudElkIiwiZW1pdCIsImFjdGl2ZUVsZW0iLCJfcmVmOSIsImRlcGFydG1lbnRzIiwiZmlyc3RFbGVtIiwiZmluZCIsImZpcnN0Iiwic2V0QWN0aXZlIiwiX3JlZjEwIiwiaGFzQXR0cmlidXRlIiwiZWxlbSIsInJlbW92ZSIsImRlcGFydG1lbnRJZCIsInVwZGF0ZSIsInByZXNlcnZlIiwiaXRlbSIsInNsdWciLCJpZCIsImh0bWxfcmVwcmVzZW50YXRpb24iLCJqb2luIl0sInNvdXJjZVJvb3QiOiIifQ==