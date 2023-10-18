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
    renderProfile(status, selectedEmployeeData);
    renderSkillsRates(status, selectedEmployeeData.crb_skills_list);
    renderTagsCloud(status, selectedEmployeeData);
  });
  function renderProfile(status, data, title) {
    $profileWrapper.html(Mustache.render(profileTemplate, data));
    $profileWrapper.find(".profile__title").text(title);
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
/******/ 	__webpack_require__.h = function() { return "f72fab39d5d3f12f86ee"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5lOThhZjgxNjM5MTBjN2FlYzdjMi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNEU7QUFDbkM7QUFDZ0M7QUFDWDtBQUlsQjtBQUMyQjtBQUV2RUUsMkRBQVMsQ0FBQyxDQUFDO0FBRVgsTUFBTVMsS0FBSyxHQUFHQSxDQUFDQyxPQUFPLEVBQUVDLE1BQU0sS0FBSztFQUNqQyxNQUFNO0lBQUVDLFNBQVM7SUFBRUM7RUFBTyxDQUFDLEdBQUdILE9BQU87RUFFckNFLFNBQVMsQ0FBQ0UsRUFBRSxDQUFDLFFBQVEsRUFBRUMsSUFBQTtJQUFBLElBQUM7TUFBRUMsS0FBSztNQUFFQztJQUFVLENBQUMsR0FBQUYsSUFBQTtJQUFBLE9BQzFDRyxPQUFPLENBQUNaLEdBQUcsQ0FBQ1UsS0FBSyxFQUFFQyxTQUFTLENBQUM7RUFBQSxDQUMvQixDQUFDO0VBRUQsSUFBSUUsUUFBUSxDQUFDQyxVQUFVLEtBQUssYUFBYSxFQUFFO0lBQ3pDQyxVQUFVLENBQUMsQ0FBQztFQUNkLENBQUMsTUFBTTtJQUNMQyxNQUFNLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFRixVQUFVLENBQUM7RUFDekQ7RUFDQSxTQUFTQSxVQUFVQSxDQUFDRyxLQUFLLEVBQUU7SUFDekIsSUFBSTtNQUNGdkIsaUVBQW9CLENBQUNXLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQ3ZDWCxnRUFBbUIsQ0FBQ1UsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFDdENZLGdCQUFnQixDQUFDYixTQUFTLEVBQUVDLE1BQU0sQ0FBQztNQUNuQ1YsdUVBQWUsQ0FBQyxtQkFBbUIsRUFBRVMsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFDdkRWLHVFQUFlLENBQUMseUJBQXlCLEVBQUVTLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQzdEYSxlQUFlLENBQUNkLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQ2xDYyxrQkFBa0IsQ0FBQ2YsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFD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dkIsSUFBSVIsVUFBVSxLQUFLUSxJQUFJLEVBQUU7SUFDekIsSUFBSVIsVUFBVSxFQUFFO01BQ2RBLFVBQVUsQ0FBQzdELFNBQVMsQ0FBQ3NFLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDdkM7SUFDQSxNQUFNQyxZQUFZLEdBQUdGLElBQUksQ0FBQ0csWUFBWSxDQUFDLFNBQVMsQ0FBQztJQUNqRDlFLEtBQUssQ0FBQytFLE1BQU0sQ0FBRWpHLEtBQUssSUFBSztNQUN0QixPQUFPO1FBQ0wsR0FBR0EsS0FBSztRQUNSbUYsb0JBQW9CLEVBQUVZO01BQ3hCLENBQUM7SUFDSCxDQUFDLENBQUM7SUFDRkYsSUFBSSxDQUFDckUsU0FBUyxDQUFDUCxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQzVCb0UsVUFBVSxHQUFHUSxJQUFJO0VBQ25CO0VBQ0EsU0FBU2pDLE1BQU1BLENBQUNULE1BQU0sRUFBRUMsSUFBSSxFQUFFO0lBQzVCMkIsUUFBUSxDQUFDekMsSUFBSSxDQUFDNEQsUUFBUSxDQUFDL0MsTUFBTSxFQUFFQyxJQUFJLENBQUMsQ0FBQztFQUN2QztFQUNBLFNBQVM4QyxRQUFRQSxDQUFDL0MsTUFBTSxFQUFFQyxJQUFJLEVBQUU7SUFDOUIsT0FBT0EsSUFBSSxDQUNSWSxHQUFHLENBQ0RtQyxJQUFJLElBQU07QUFDbkIsb0VBQW9FQSxJQUFJLENBQUNDLElBQUssY0FBYUQsSUFBSSxDQUFDRSxFQUFHLEtBQUlGLElBQUksQ0FBQ0csbUJBQW9CO0FBQ2hJLHFCQUNNLENBQUMsQ0FDQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztFQUNiO0FBQ0Y7Ozs7Ozs7O1VDck1BLHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zscy1zdGFydC8uL3NyYy9qcy9wYWdlcy9ob21lL2luZGV4LmpzIiwid2VicGFjazovL2Zscy1zdGFydC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vZHVsZU1hbmFnZXIsIHsgTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9Nb2R1bGVNYW5hZ2VyL2luZGV4LmpzXCI7XHJcbmltcG9ydCBpbml0U3RvcmUgZnJvbSBcIi4vc3RvcmUvaW5kZXguanNcIjtcclxuaW1wb3J0IHsgaW5pdFRlYW1TZWxlY3RTbGlkZXIsIGluaXRUZWFtYXRlc1NsaWRlcnMgfSBmcm9tIFwiLi9zbGlkZXJzLmpzXCI7XHJcbmltcG9ydCB7IGluaXRDb250YWN0Rm9ybSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvY29udGFjdEZvcm0uanNcIjtcclxuaW1wb3J0IHtcclxuICBmZXRjaERlcGFydG1lbnRzLFxyXG4gIGZldGNoRGVwYXJ0bWVudEVtcGxveWVlcyxcclxufSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2VtcGxveWVlcy5qc1wiO1xyXG5pbXBvcnQgeyBsb2csIGVycm9yLCBkZWJ1ZyB9IGZyb20gXCIuLi8uLi8uLi8uLi9yZXBvL2pzL2xpYnMvbG9nZ2VyLmpzXCI7XHJcblxyXG5pbml0U3RvcmUoKTtcclxuXHJcbmNvbnN0IGVudHJ5ID0gKGNvbnRleHQsIG1vZHVsZSkgPT4ge1xyXG4gIGNvbnN0IHsgcGFnZVN0b3JlLCBldmVudHMgfSA9IGNvbnRleHQ7XHJcblxyXG4gIHBhZ2VTdG9yZS5vbihcInVwZGF0ZVwiLCAoeyBzdGF0ZSwgcHJldlN0YXRlIH0pID0+XHJcbiAgICBjb25zb2xlLmxvZyhzdGF0ZSwgcHJldlN0YXRlKVxyXG4gICk7XHJcblxyXG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpIHtcclxuICAgIG9uRG9tUmVhZHkoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIG9uRG9tUmVhZHkpO1xyXG4gIH1cclxuICBmdW5jdGlvbiBvbkRvbVJlYWR5KGV2ZW50KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpbml0VGVhbVNlbGVjdFNsaWRlcihwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXRUZWFtYXRlc1NsaWRlcnMocGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0TmF2VG9Qcm9maWxlKHBhZ2VTdG9yZSwgZXZlbnRzKTtcclxuICAgICAgaW5pdENvbnRhY3RGb3JtKFwibWFpbi1jb250YWN0LWZvcm1cIiwgcGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0Q29udGFjdEZvcm0oXCJjdi1yZXF1ZXN0LWNvbnRhY3QtZm9ybVwiLCBwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXRFbWxveWVlVmlldyhwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXREZXBhcnRtZW50VmlldyhwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXREZXBhcnRtZW50c0ZpbHRlcihwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICBlcnJvcihleCk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcGFnZSA9IG5ldyBNb2R1bGUoe1xyXG4gIG5hbWU6IFwicGFnZVwiLFxyXG4gIGVudHJ5OiBlbnRyeSxcclxuICByZXF1aXJlZDogW1wiZXZlbnRzXCIsIFwiY29tbW9uU3RvcmVcIiwgXCJwYWdlU3RvcmVcIl0sXHJcbn0pO1xyXG5tb2R1bGVNYW5hZ2VyLmFkZChwYWdlKTtcclxuXHJcbmZ1bmN0aW9uIGluaXROYXZUb1Byb2ZpbGUoc3RvcmUsIGV2ZW50cykge1xyXG4gICQoXCIjdGVhbWF0ZXMtbGlzdC13cmFwcGVyXCIpLm9uKFwiY2xpY2tcIiwgKHsgdGFyZ2V0IH0pID0+IHtcclxuICAgIGNvbnN0ICRoZWFkZXIgPSAkKFwiaGVhZGVyXCIpO1xyXG4gICAgY29uc3QgJHByb2ZpbGUgPSAkKFwiI3Byb2ZpbGVcIik7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGVhbWF0ZS1jYXJkX19idG5cIikgJiZcclxuICAgICAgIXRhcmdldC5jbG9zZXN0KFwiLnRlYW1hdGUtY2FyZF9fYnRuXCIpXHJcbiAgICApXHJcbiAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHByb2ZpbGVCY3IgPSAkcHJvZmlsZS5nZXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICB0b3A6IHdpbmRvdy5zY3JvbGxZICsgcHJvZmlsZUJjci50b3AgLSBoZWFkZXJIZWlnaHQsXHJcbiAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdEVtbG95ZWVWaWV3KHN0b3JlLCBldmVudHMpIHtcclxuICBjb25zdCAkcHJvZmlsZVdyYXBwZXIgPSAkKFwiI3Byb2ZpbGUtbWFpblwiKTtcclxuICBjb25zdCBwcm9maWxlVGVtcGxhdGUgPSAkKFwiI2VtcGxveWVlLXByb2ZpbGUtdGVtcGxhdGVcIikuaHRtbCgpO1xyXG4gIGNvbnN0ICRza2lsbHNSYXRlc1dyYXBwZXIgPSAkKFwiI3Byb2ZpbGUtc2tpbGxzLXJhdGVzXCIpO1xyXG4gIGNvbnN0IHNraWxsc1JhdGVzVGVtcGxhdGUgPSAkKFwiI2VtcGxveWVlLXNraWxscy1yYXRlcy10ZW1wbGF0ZVwiKS5odG1sKCk7XHJcbiAgY29uc3QgJHRhZ3NDbG91ZFdyYXBwZXIgPSAkKFwiI3Byb2ZpbGUtdGFncy1jbG91ZFwiKTtcclxuICBjb25zdCB0YWdzQ2xvdWRUZW1wbGF0ZSA9ICQoXCIjZW1wbG95ZWUtdGFncy1jbG91ZC10ZW1wbGF0ZVwiKS5odG1sKCk7XHJcbiAgTXVzdGFjaGUucGFyc2UocHJvZmlsZVRlbXBsYXRlKTtcclxuICBNdXN0YWNoZS5wYXJzZShza2lsbHNSYXRlc1RlbXBsYXRlKTtcclxuICBNdXN0YWNoZS5wYXJzZSh0YWdzQ2xvdWRUZW1wbGF0ZSk7XHJcblxyXG4gICRwcm9maWxlV3JhcHBlci5vbihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9maWxlX19kb3dubG9hZC1idG5cIikgfHxcclxuICAgICAgdGFyZ2V0LmNsb3Nlc3QoXCIucHJvZmlsZV9fZG93bmxvYWQtYnRuXCIpXHJcbiAgICApIHtcclxuICAgICAgZHJhd2Vycy5vcGVuKFwiY3YtcmVxdWVzdC1mb3JtXCIsIHRhcmdldCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHN0b3JlLm9uKFwidXBkYXRlXCIsICh7IHN0YXRlLCBwcmV2U3RhdGUgfSkgPT4ge1xyXG4gICAgaWYgKFxyXG4gICAgICBzdGF0ZS5zZWxlY3RlZEVtcGxveWVlSWR4ID09PSBwcmV2U3RhdGUuc2VsZWN0ZWRFbXBsb3llZUlkeCAmJlxyXG4gICAgICBzdGF0ZS5lbXBsb3llZXMgPT09IHByZXZTdGF0ZS5lbXBsb3llZXNcclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgY29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IHN0YXRlLmVtcGxveWVlcztcclxuICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgY29uc3QgeyBzZWxlY3RlZEVtcGxveWVlSWR4IH0gPSBzdGF0ZTtcclxuICAgIGNvbnN0IHNlbGVjdGVkRW1wbG95ZWVEYXRhID0gZGF0YVtzZWxlY3RlZEVtcGxveWVlSWR4XTtcclxuICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkRW1wbG95ZWVEYXRhKTtcclxuXHJcbiAgICByZW5kZXJQcm9maWxlKHN0YXR1cywgc2VsZWN0ZWRFbXBsb3llZURhdGEpO1xyXG4gICAgcmVuZGVyU2tpbGxzUmF0ZXMoc3RhdHVzLCBzZWxlY3RlZEVtcGxveWVlRGF0YS5jcmJfc2tpbGxzX2xpc3QpO1xyXG4gICAgcmVuZGVyVGFnc0Nsb3VkKHN0YXR1cywgc2VsZWN0ZWRFbXBsb3llZURhdGEpO1xyXG4gIH0pO1xyXG4gIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoc3RhdHVzLCBkYXRhLCB0aXRsZSkge1xyXG4gICAgJHByb2ZpbGVXcmFwcGVyLmh0bWwoTXVzdGFjaGUucmVuZGVyKHByb2ZpbGVUZW1wbGF0ZSwgZGF0YSkpO1xyXG4gICAgJHByb2ZpbGVXcmFwcGVyLmZpbmQoXCIucHJvZmlsZV9fdGl0bGVcIikudGV4dCh0aXRsZSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlbmRlclNraWxsc1JhdGVzKHN0YXR1cywgZGF0YSkge1xyXG4gICAgY29uc3QgZmluYWxpemVkRGF0YSA9IGRhdGEubWFwKCh7IGNyYl9uYW1lLCBjcmJfcmF0ZSB9KSA9PiB7XHJcbiAgICAgIHJldHVybiB7IGNyYl9uYW1lLCBjcmJfcmF0ZTogbmV3IEFycmF5KGNyYl9yYXRlKSB9O1xyXG4gICAgfSk7XHJcbiAgICAkc2tpbGxzUmF0ZXNXcmFwcGVyLmh0bWwoXHJcbiAgICAgIE11c3RhY2hlLnJlbmRlcihza2lsbHNSYXRlc1RlbXBsYXRlLCBmaW5hbGl6ZWREYXRhKVxyXG4gICAgKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gcmVuZGVyVGFnc0Nsb3VkKHN0YXR1cywgeyBjcmJfbWFpbl9tZXNzYWdlLCBjcmJfdGFnc19jbG91ZCB9KSB7XHJcbiAgICBjb25zdCBzZWN0aW9uQ3V0ID0gMzYwIC8gY3JiX3RhZ3NfY2xvdWQubGVuZ3RoO1xyXG4gICAgY29uc3QgZ2VuZXJhdGVEZWdyZWVPZmZzZXQgPSAoKSA9PlxyXG4gICAgICAtc2VjdGlvbkN1dCAqIDAuMSArIHNlY3Rpb25DdXQgKiAwLjIgKiBNYXRoLnJhbmRvbSgpO1xyXG4gICAgY29uc3QgZmluYWxpemVkRGF0YSA9IHtcclxuICAgICAgY3JiX21haW5fbWVzc2FnZSxcclxuICAgICAgY3JiX3RhZ3NfY2xvdWQ6IGNyYl90YWdzX2Nsb3VkLm1hcCgodGFncywgaWR4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGhpc1NlY3Rpb25DdXQgPSBpZHggKiBzZWN0aW9uQ3V0O1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAuLi50YWdzLFxyXG4gICAgICAgICAgXCJwbGFjaW5nLWRlZ3JlZVwiOiBgJHt0aGlzU2VjdGlvbkN1dCArIGdlbmVyYXRlRGVncmVlT2Zmc2V0KCl9ZGVnYCxcclxuICAgICAgICAgIFwiZGlzdGFuY2Utc2hpZnRcIjogYCR7LTAuMDUgKyAwLjEgKiBNYXRoLnJhbmRvbSgpfWAsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSksXHJcbiAgICB9O1xyXG4gICAgY29uc29sZS5sb2coZmluYWxpemVkRGF0YSk7XHJcbiAgICAkdGFnc0Nsb3VkV3JhcHBlci5odG1sKE11c3RhY2hlLnJlbmRlcih0YWdzQ2xvdWRUZW1wbGF0ZSwgZmluYWxpemVkRGF0YSkpO1xyXG4gIH1cclxufVxyXG5mdW5jdGlvbiBpbml0RGVwYXJ0bWVudFZpZXcoc3RvcmUsIGV2ZW50cykge1xyXG4gIGNvbnN0ICR3cmFwcGVyID0gJChcIiN0ZWFtYXRlcy1saXN0LXdyYXBwZXJcIik7XHJcbiAgY29uc3QgdGVtcGxhdGUgPSAkKFwiI2VtcGxveWVlLWNhcmQtdGVtcGxhdGVcIikuaHRtbCgpO1xyXG4gIE11c3RhY2hlLnBhcnNlKHRlbXBsYXRlKTtcclxuXHJcbiAgc3RvcmUub24oXCJ1cGRhdGVcIiwgKHsgc3RhdGUsIHByZXZTdGF0ZSB9KSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuZW1wbG95ZWVzID09PSBwcmV2U3RhdGUuZW1wbG95ZWVzKSByZXR1cm47XHJcbiAgICBjb25zdCB7IHN0YXR1cywgZGF0YSB9ID0gc3RhdGUuZW1wbG95ZWVzO1xyXG4gICAgcmVuZGVyKHN0YXR1cywgZGF0YSk7XHJcbiAgfSk7XHJcbiAgc3RvcmUub24oXCJ1cGRhdGVcIiwgKHsgc3RhdGUsIHByZXZTdGF0ZSB9KSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuc2VsZWN0ZWREZXBhcnRtZW50SWQgPT09IHByZXZTdGF0ZS5zZWxlY3RlZERlcGFydG1lbnRJZCkgcmV0dXJuO1xyXG4gICAgZmV0Y2hEZXBhcnRtZW50RW1wbG95ZWVzKHN0YXRlLnNlbGVjdGVkRGVwYXJ0bWVudElkKTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IHN0b3JlLnN0YXRlLmVtcGxveWVlcztcclxuICByZW5kZXIoc3RhdHVzLCBkYXRhKTtcclxuXHJcbiAgZnVuY3Rpb24gcmVuZGVyKHN0YXR1cywgZGF0YSkge1xyXG4gICAgJHdyYXBwZXIuaHRtbChNdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIGRhdGEpKTtcclxuICAgIGV2ZW50cy5lbWl0KFwic2xpZGVUb0ZpcnN0RW1wbG95ZWVcIik7XHJcbiAgfVxyXG59XHJcbmFzeW5jIGZ1bmN0aW9uIGluaXREZXBhcnRtZW50c0ZpbHRlcihzdG9yZSwgZXZlbnRzKSB7XHJcbiAgbGV0IGFjdGl2ZUVsZW0gPSBudWxsO1xyXG4gIGNvbnN0ICR3cmFwcGVyID0gJChcIiNkZXBhcnRtZW50LXNlbGVjdC13cmFwcGVyXCIpO1xyXG4gIHN0b3JlLm9uKFwidXBkYXRlXCIsICh7IHN0YXRlLCBwcmV2U3RhdGUgfSkgPT4ge1xyXG4gICAgaWYgKHN0YXRlLmRlcGFydG1lbnRzID09PSBwcmV2U3RhdGUuZGVwYXJ0bWVudHMpIHJldHVybjtcclxuICAgIGNvbnN0IHsgc3RhdHVzLCBkYXRhIH0gPSBzdGF0ZS5kZXBhcnRtZW50cztcclxuICAgIHJlbmRlcihzdGF0dXMsIGRhdGEpO1xyXG4gICAgY29uc3QgZmlyc3RFbGVtID0gJHdyYXBwZXIuZmluZChcIltkYXRhLWlkXVwiKS5maXJzdCgpLmdldCgwKTtcclxuICAgIGlmIChmaXJzdEVsZW0pIHNldEFjdGl2ZShmaXJzdEVsZW0pO1xyXG4gIH0pO1xyXG4gIGZldGNoRGVwYXJ0bWVudHMoKTtcclxuICAkd3JhcHBlci5vbihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldC5oYXNBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpKSByZXR1cm47XHJcbiAgICBzZXRBY3RpdmUodGFyZ2V0KTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gc2V0QWN0aXZlKGVsZW0pIHtcclxuICAgIGlmIChhY3RpdmVFbGVtID09PSBlbGVtKSByZXR1cm47XHJcbiAgICBpZiAoYWN0aXZlRWxlbSkge1xyXG4gICAgICBhY3RpdmVFbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICBjb25zdCBkZXBhcnRtZW50SWQgPSBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XHJcbiAgICBzdG9yZS51cGRhdGUoKHN0YXRlKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgc2VsZWN0ZWREZXBhcnRtZW50SWQ6IGRlcGFydG1lbnRJZCxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgZWxlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgYWN0aXZlRWxlbSA9IGVsZW07XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlbmRlcihzdGF0dXMsIGRhdGEpIHtcclxuICAgICR3cmFwcGVyLmh0bWwocHJlc2VydmUoc3RhdHVzLCBkYXRhKSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHByZXNlcnZlKHN0YXR1cywgZGF0YSkge1xyXG4gICAgcmV0dXJuIGRhdGFcclxuICAgICAgLm1hcChcclxuICAgICAgICAoaXRlbSkgPT4gYDxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGVcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInRleHQtbGluayBzZWN0aW9uLW5hdl9fYnRuXCIgZGF0YS1zbHVnPVwiJHtpdGVtLnNsdWd9XCIgZGF0YS1pZD1cIiR7aXRlbS5pZH1cIj4ke2l0ZW0uaHRtbF9yZXByZXNlbnRhdGlvbn08L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PmBcclxuICAgICAgKVxyXG4gICAgICAuam9pbihcIlwiKTtcclxuICB9XHJcbn1cclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcImY3MmZhYjM5ZDVkM2YxMmY4NmVlXCI7IH0iXSwibmFtZXMiOlsibW9kdWxlTWFuYWdlciIsIk1vZHVsZSIsImluaXRTdG9yZSIsImluaXRUZWFtU2VsZWN0U2xpZGVyIiwiaW5pdFRlYW1hdGVzU2xpZGVycyIsImluaXRDb250YWN0Rm9ybSIsImZldGNoRGVwYXJ0bWVudHMiLCJmZXRjaERlcGFydG1lbnRFbXBsb3llZXMiLCJsb2ciLCJlcnJvciIsImRlYnVnIiwiZW50cnkiLCJjb250ZXh0IiwibW9kdWxlIiwicGFnZVN0b3JlIiwiZXZlbnRzIiwib24iLCJfcmVmIiwic3RhdGUiLCJwcmV2U3RhdGUiLCJjb25zb2xlIiwiZG9jdW1lbnQiLCJyZWFkeVN0YXRlIiwib25Eb21SZWFkeSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImluaXROYXZUb1Byb2ZpbGUiLCJpbml0RW1sb3llZVZpZXciLCJpbml0RGVwYXJ0bWVudFZpZXciLCJpbml0RGVwYXJ0bWVudHNGaWx0ZXIiLCJleCIsInBhZ2UiLCJuYW1lIiwicmVxdWlyZWQiLCJhZGQiLCJzdG9yZSIsIiQiLCJfcmVmMiIsInRhcmdldCIsIiRoZWFkZXIiLCIkcHJvZmlsZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xvc2VzdCIsInByb2ZpbGVCY3IiLCJnZXQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoZWFkZXJIZWlnaHQiLCJvdXRlckhlaWdodCIsInNjcm9sbFRvIiwidG9wIiwic2Nyb2xsWSIsImJlaGF2aW9yIiwiJHByb2ZpbGVXcmFwcGVyIiwicHJvZmlsZVRlbXBsYXRlIiwiaHRtbCIsIiRza2lsbHNSYXRlc1dyYXBwZXIiLCJza2lsbHNSYXRlc1RlbXBsYXRlIiwiJHRhZ3NDbG91ZFdyYXBwZXIiLCJ0YWdzQ2xvdWRUZW1wbGF0ZSIsIk11c3RhY2hlIiwicGFyc2UiLCJfcmVmMyIsImRyYXdlcnMiLCJvcGVuIiwiX3JlZjQiLCJzZWxlY3RlZEVtcGxveWVlSWR4IiwiZW1wbG95ZWVzIiwic3RhdHVzIiwiZGF0YSIsImxlbmd0aCIsInNlbGVjdGVkRW1wbG95ZWVEYXRhIiwicmVuZGVyUHJvZmlsZSIsInJlbmRlclNraWxsc1JhdGVzIiwiY3JiX3NraWxsc19saXN0IiwicmVuZGVyVGFnc0Nsb3VkIiwidGl0bGUiLCJyZW5kZXIiLCJmaW5kIiwidGV4dCIsImZpbmFsaXplZERhdGEiLCJtYXAiLCJfcmVmNSIsImNyYl9uYW1lIiwiY3JiX3JhdGUiLCJBcnJheSIsIl9yZWY2IiwiY3JiX21haW5fbWVzc2FnZSIsImNyYl90YWdzX2Nsb3VkIiwic2VjdGlvbkN1dCIsImdlbmVyYXRlRGVncmVlT2Zmc2V0IiwiTWF0aCIsInJhbmRvbSIsInRhZ3MiLCJpZHgiLCJ0aGlzU2VjdGlvbkN1dCIsIiR3cmFwcGVyIiwidGVtcGxhdGUiLCJfcmVmNyIsIl9yZWY4Iiwic2VsZWN0ZWREZXBhcnRtZW50SWQiLCJlbWl0IiwiYWN0aXZlRWxlbSIsIl9yZWY5IiwiZGVwYXJ0bWVudHMiLCJmaXJzdEVsZW0iLCJmaXJzdCIsInNldEFjdGl2ZSIsIl9yZWYxMCIsImhhc0F0dHJpYnV0ZSIsImVsZW0iLCJyZW1vdmUiLCJkZXBhcnRtZW50SWQiLCJnZXRBdHRyaWJ1dGUiLCJ1cGRhdGUiLCJwcmVzZXJ2ZSIsIml0ZW0iLCJzbHVnIiwiaWQiLCJodG1sX3JlcHJlc2VudGF0aW9uIiwiam9pbiJdLCJzb3VyY2VSb290IjoiIn0=