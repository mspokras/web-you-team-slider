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
    const activeSlideElem = document.querySelector(".swiper-slide-active");
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
/******/ 	__webpack_require__.h = function() { return "3eca770e4855071b1a2e"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS43NGZjYTY3NWJlNWQ0YzA1ZWZmYS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNEU7QUFDbkM7QUFDZ0M7QUFDWDtBQUlsQjtBQUMyQjtBQUV2RUUsMkRBQVMsQ0FBQyxDQUFDO0FBRVgsTUFBTVMsS0FBSyxHQUFHQSxDQUFDQyxPQUFPLEVBQUVDLE1BQU0sS0FBSztFQUNqQyxNQUFNO0lBQUVDLFNBQVM7SUFBRUM7RUFBTyxDQUFDLEdBQUdILE9BQU87RUFFckNFLFNBQVMsQ0FBQ0UsRUFBRSxDQUFDLFFBQVEsRUFBRUMsSUFBQTtJQUFBLElBQUM7TUFBRUMsS0FBSztNQUFFQztJQUFVLENBQUMsR0FBQUYsSUFBQTtJQUFBLE9BQzFDRyxPQUFPLENBQUNaLEdBQUcsQ0FBQ1UsS0FBSyxFQUFFQyxTQUFTLENBQUM7RUFBQSxDQUMvQixDQUFDO0VBRUQsSUFBSUUsUUFBUSxDQUFDQyxVQUFVLEtBQUssYUFBYSxFQUFFO0lBQ3pDQyxVQUFVLENBQUMsQ0FBQztFQUNkLENBQUMsTUFBTTtJQUNMQyxNQUFNLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFRixVQUFVLENBQUM7RUFDekQ7RUFDQSxTQUFTQSxVQUFVQSxDQUFDRyxLQUFLLEVBQUU7SUFDekIsSUFBSTtNQUNGdkIsaUVBQW9CLENBQUNXLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQ3ZDWCxnRUFBbUIsQ0FBQ1UsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFDdENZLGdCQUFnQixDQUFDYixTQUFTLEVBQUVDLE1BQU0sQ0FBQztNQUNuQ1YsdUVBQWUsQ0FBQyxtQkFBbUIsRUFBRVMsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFDdkRWLHVFQUFlLENBQUMseUJBQXlCLEVBQUVTLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQzdEYSxlQUFlLENBQUNkLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQ2xDYyxrQkFBa0IsQ0FBQ2YsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFD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bHMtc3RhcnQvLi9zcmMvanMvcGFnZXMvaG9tZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9mbHMtc3RhcnQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb2R1bGVNYW5hZ2VyLCB7IE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvTW9kdWxlTWFuYWdlci9pbmRleC5qc1wiO1xyXG5pbXBvcnQgaW5pdFN0b3JlIGZyb20gXCIuL3N0b3JlL2luZGV4LmpzXCI7XHJcbmltcG9ydCB7IGluaXRUZWFtU2VsZWN0U2xpZGVyLCBpbml0VGVhbWF0ZXNTbGlkZXJzIH0gZnJvbSBcIi4vc2xpZGVycy5qc1wiO1xyXG5pbXBvcnQgeyBpbml0Q29udGFjdEZvcm0gfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2NvbnRhY3RGb3JtLmpzXCI7XHJcbmltcG9ydCB7XHJcbiAgZmV0Y2hEZXBhcnRtZW50cyxcclxuICBmZXRjaERlcGFydG1lbnRFbXBsb3llZXMsXHJcbn0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9lbXBsb3llZXMuanNcIjtcclxuaW1wb3J0IHsgbG9nLCBlcnJvciwgZGVidWcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vcmVwby9qcy9saWJzL2xvZ2dlci5qc1wiO1xyXG5cclxuaW5pdFN0b3JlKCk7XHJcblxyXG5jb25zdCBlbnRyeSA9IChjb250ZXh0LCBtb2R1bGUpID0+IHtcclxuICBjb25zdCB7IHBhZ2VTdG9yZSwgZXZlbnRzIH0gPSBjb250ZXh0O1xyXG5cclxuICBwYWdlU3RvcmUub24oXCJ1cGRhdGVcIiwgKHsgc3RhdGUsIHByZXZTdGF0ZSB9KSA9PlxyXG4gICAgY29uc29sZS5sb2coc3RhdGUsIHByZXZTdGF0ZSlcclxuICApO1xyXG5cclxuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XHJcbiAgICBvbkRvbVJlYWR5KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBvbkRvbVJlYWR5KTtcclxuICB9XHJcbiAgZnVuY3Rpb24gb25Eb21SZWFkeShldmVudCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaW5pdFRlYW1TZWxlY3RTbGlkZXIocGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0VGVhbWF0ZXNTbGlkZXJzKHBhZ2VTdG9yZSwgZXZlbnRzKTtcclxuICAgICAgaW5pdE5hdlRvUHJvZmlsZShwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXRDb250YWN0Rm9ybShcIm1haW4tY29udGFjdC1mb3JtXCIsIHBhZ2VTdG9yZSwgZXZlbnRzKTtcclxuICAgICAgaW5pdENvbnRhY3RGb3JtKFwiY3YtcmVxdWVzdC1jb250YWN0LWZvcm1cIiwgcGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0RW1sb3llZVZpZXcocGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0RGVwYXJ0bWVudFZpZXcocGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0RGVwYXJ0bWVudHNGaWx0ZXIocGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgZXJyb3IoZXgpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHBhZ2UgPSBuZXcgTW9kdWxlKHtcclxuICBuYW1lOiBcInBhZ2VcIixcclxuICBlbnRyeTogZW50cnksXHJcbiAgcmVxdWlyZWQ6IFtcImV2ZW50c1wiLCBcImNvbW1vblN0b3JlXCIsIFwicGFnZVN0b3JlXCJdLFxyXG59KTtcclxubW9kdWxlTWFuYWdlci5hZGQocGFnZSk7XHJcblxyXG5mdW5jdGlvbiBpbml0TmF2VG9Qcm9maWxlKHN0b3JlLCBldmVudHMpIHtcclxuICAkKFwiI3RlYW1hdGVzLWxpc3Qtd3JhcHBlclwiKS5vbihcImNsaWNrXCIsICh7IHRhcmdldCB9KSA9PiB7XHJcbiAgICBjb25zdCAkaGVhZGVyID0gJChcImhlYWRlclwiKTtcclxuICAgIGNvbnN0ICRwcm9maWxlID0gJChcIiNwcm9maWxlXCIpO1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRlYW1hdGUtY2FyZF9fYnRuXCIpICYmXHJcbiAgICAgICF0YXJnZXQuY2xvc2VzdChcIi50ZWFtYXRlLWNhcmRfX2J0blwiKVxyXG4gICAgKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBjb25zdCBwcm9maWxlQmNyID0gJHByb2ZpbGUuZ2V0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG4gICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgdG9wOiB3aW5kb3cuc2Nyb2xsWSArIHByb2ZpbGVCY3IudG9wIC0gaGVhZGVySGVpZ2h0LFxyXG4gICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGluaXRFbWxveWVlVmlldyhzdG9yZSwgZXZlbnRzKSB7XHJcbiAgY29uc3QgJHByb2ZpbGVXcmFwcGVyID0gJChcIiNwcm9maWxlLW1haW5cIik7XHJcbiAgY29uc3QgcHJvZmlsZVRlbXBsYXRlID0gJChcIiNlbXBsb3llZS1wcm9maWxlLXRlbXBsYXRlXCIpLmh0bWwoKTtcclxuICBjb25zdCAkc2tpbGxzUmF0ZXNXcmFwcGVyID0gJChcIiNwcm9maWxlLXNraWxscy1yYXRlc1wiKTtcclxuICBjb25zdCBza2lsbHNSYXRlc1RlbXBsYXRlID0gJChcIiNlbXBsb3llZS1za2lsbHMtcmF0ZXMtdGVtcGxhdGVcIikuaHRtbCgpO1xyXG4gIGNvbnN0ICR0YWdzQ2xvdWRXcmFwcGVyID0gJChcIiNwcm9maWxlLXRhZ3MtY2xvdWRcIik7XHJcbiAgY29uc3QgdGFnc0Nsb3VkVGVtcGxhdGUgPSAkKFwiI2VtcGxveWVlLXRhZ3MtY2xvdWQtdGVtcGxhdGVcIikuaHRtbCgpO1xyXG4gIE11c3RhY2hlLnBhcnNlKHByb2ZpbGVUZW1wbGF0ZSk7XHJcbiAgTXVzdGFjaGUucGFyc2Uoc2tpbGxzUmF0ZXNUZW1wbGF0ZSk7XHJcbiAgTXVzdGFjaGUucGFyc2UodGFnc0Nsb3VkVGVtcGxhdGUpO1xyXG5cclxuICAkcHJvZmlsZVdyYXBwZXIub24oXCJjbGlja1wiLCAoeyB0YXJnZXQgfSkgPT4ge1xyXG4gICAgaWYgKFxyXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJvZmlsZV9fZG93bmxvYWQtYnRuXCIpIHx8XHJcbiAgICAgIHRhcmdldC5jbG9zZXN0KFwiLnByb2ZpbGVfX2Rvd25sb2FkLWJ0blwiKVxyXG4gICAgKSB7XHJcbiAgICAgIGRyYXdlcnMub3BlbihcImN2LXJlcXVlc3QtZm9ybVwiLCB0YXJnZXQpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBzdG9yZS5vbihcInVwZGF0ZVwiLCAoeyBzdGF0ZSwgcHJldlN0YXRlIH0pID0+IHtcclxuICAgIGlmIChcclxuICAgICAgc3RhdGUuc2VsZWN0ZWRFbXBsb3llZUlkeCA9PT0gcHJldlN0YXRlLnNlbGVjdGVkRW1wbG95ZWVJZHggJiZcclxuICAgICAgc3RhdGUuZW1wbG95ZWVzID09PSBwcmV2U3RhdGUuZW1wbG95ZWVzXHJcbiAgICApXHJcbiAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHsgc3RhdHVzLCBkYXRhIH0gPSBzdGF0ZS5lbXBsb3llZXM7XHJcbiAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgIGNvbnN0IHsgc2VsZWN0ZWRFbXBsb3llZUlkeCB9ID0gc3RhdGU7XHJcbiAgICBjb25zdCBzZWxlY3RlZEVtcGxveWVlRGF0YSA9IGRhdGFbc2VsZWN0ZWRFbXBsb3llZUlkeF07XHJcbiAgICBjb25zb2xlLmxvZyhzZWxlY3RlZEVtcGxveWVlRGF0YSk7XHJcbiAgICBjb25zdCB0aXRsZSA9IHNlbGVjdGVkRW1wbG95ZWVEYXRhLnRpdGxlO1xyXG4gICAgcmVuZGVyUHJvZmlsZShzdGF0dXMsIHNlbGVjdGVkRW1wbG95ZWVEYXRhKTtcclxuICAgIGNvbnN0IGFjdGl2ZVNsaWRlRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLXNsaWRlLWFjdGl2ZVwiKTtcclxuICAgIGNvbnN0IHRpdGxlRnJvbVNsaWRlID0gYWN0aXZlU2xpZGVFbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdGl0bGVcIik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3RpdGxlXCIpLnRleHRDb250ZW50ID0gdGl0bGVGcm9tU2xpZGU7XHJcbiAgICByZW5kZXJTa2lsbHNSYXRlcyhzdGF0dXMsIHNlbGVjdGVkRW1wbG95ZWVEYXRhLmNyYl9za2lsbHNfbGlzdCk7XHJcbiAgICByZW5kZXJUYWdzQ2xvdWQoc3RhdHVzLCBzZWxlY3RlZEVtcGxveWVlRGF0YSk7XHJcbiAgfSk7XHJcbiAgZnVuY3Rpb24gcmVuZGVyUHJvZmlsZShzdGF0dXMsIGRhdGEsIHRpdGxlKSB7XHJcbiAgICAkcHJvZmlsZVdyYXBwZXIuaHRtbChNdXN0YWNoZS5yZW5kZXIocHJvZmlsZVRlbXBsYXRlLCBkYXRhKSk7XHJcbiAgICBlbWxveWVldmlldztcclxuICB9XHJcbiAgZnVuY3Rpb24gcmVuZGVyU2tpbGxzUmF0ZXMoc3RhdHVzLCBkYXRhKSB7XHJcbiAgICBjb25zdCBmaW5hbGl6ZWREYXRhID0gZGF0YS5tYXAoKHsgY3JiX25hbWUsIGNyYl9yYXRlIH0pID0+IHtcclxuICAgICAgcmV0dXJuIHsgY3JiX25hbWUsIGNyYl9yYXRlOiBuZXcgQXJyYXkoY3JiX3JhdGUpIH07XHJcbiAgICB9KTtcclxuICAgICRza2lsbHNSYXRlc1dyYXBwZXIuaHRtbChcclxuICAgICAgTXVzdGFjaGUucmVuZGVyKHNraWxsc1JhdGVzVGVtcGxhdGUsIGZpbmFsaXplZERhdGEpXHJcbiAgICApO1xyXG4gIH1cclxuICBmdW5jdGlvbiByZW5kZXJUYWdzQ2xvdWQoc3RhdHVzLCB7IGNyYl9tYWluX21lc3NhZ2UsIGNyYl90YWdzX2Nsb3VkIH0pIHtcclxuICAgIGNvbnN0IHNlY3Rpb25DdXQgPSAzNjAgLyBjcmJfdGFnc19jbG91ZC5sZW5ndGg7XHJcbiAgICBjb25zdCBnZW5lcmF0ZURlZ3JlZU9mZnNldCA9ICgpID0+XHJcbiAgICAgIC1zZWN0aW9uQ3V0ICogMC4xICsgc2VjdGlvbkN1dCAqIDAuMiAqIE1hdGgucmFuZG9tKCk7XHJcbiAgICBjb25zdCBmaW5hbGl6ZWREYXRhID0ge1xyXG4gICAgICBjcmJfbWFpbl9tZXNzYWdlLFxyXG4gICAgICBjcmJfdGFnc19jbG91ZDogY3JiX3RhZ3NfY2xvdWQubWFwKCh0YWdzLCBpZHgpID0+IHtcclxuICAgICAgICBjb25zdCB0aGlzU2VjdGlvbkN1dCA9IGlkeCAqIHNlY3Rpb25DdXQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLnRhZ3MsXHJcbiAgICAgICAgICBcInBsYWNpbmctZGVncmVlXCI6IGAke3RoaXNTZWN0aW9uQ3V0ICsgZ2VuZXJhdGVEZWdyZWVPZmZzZXQoKX1kZWdgLFxyXG4gICAgICAgICAgXCJkaXN0YW5jZS1zaGlmdFwiOiBgJHstMC4wNSArIDAuMSAqIE1hdGgucmFuZG9tKCl9YCxcclxuICAgICAgICB9O1xyXG4gICAgICB9KSxcclxuICAgIH07XHJcbiAgICBjb25zb2xlLmxvZyhmaW5hbGl6ZWREYXRhKTtcclxuICAgICR0YWdzQ2xvdWRXcmFwcGVyLmh0bWwoTXVzdGFjaGUucmVuZGVyKHRhZ3NDbG91ZFRlbXBsYXRlLCBmaW5hbGl6ZWREYXRhKSk7XHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIGluaXREZXBhcnRtZW50VmlldyhzdG9yZSwgZXZlbnRzKSB7XHJcbiAgY29uc3QgJHdyYXBwZXIgPSAkKFwiI3RlYW1hdGVzLWxpc3Qtd3JhcHBlclwiKTtcclxuICBjb25zdCB0ZW1wbGF0ZSA9ICQoXCIjZW1wbG95ZWUtY2FyZC10ZW1wbGF0ZVwiKS5odG1sKCk7XHJcbiAgTXVzdGFjaGUucGFyc2UodGVtcGxhdGUpO1xyXG5cclxuICBzdG9yZS5vbihcInVwZGF0ZVwiLCAoeyBzdGF0ZSwgcHJldlN0YXRlIH0pID0+IHtcclxuICAgIGlmIChzdGF0ZS5lbXBsb3llZXMgPT09IHByZXZTdGF0ZS5lbXBsb3llZXMpIHJldHVybjtcclxuICAgIGNvbnN0IHsgc3RhdHVzLCBkYXRhIH0gPSBzdGF0ZS5lbXBsb3llZXM7XHJcbiAgICByZW5kZXIoc3RhdHVzLCBkYXRhKTtcclxuICB9KTtcclxuICBzdG9yZS5vbihcInVwZGF0ZVwiLCAoeyBzdGF0ZSwgcHJldlN0YXRlIH0pID0+IHtcclxuICAgIGlmIChzdGF0ZS5zZWxlY3RlZERlcGFydG1lbnRJZCA9PT0gcHJldlN0YXRlLnNlbGVjdGVkRGVwYXJ0bWVudElkKSByZXR1cm47XHJcbiAgICBmZXRjaERlcGFydG1lbnRFbXBsb3llZXMoc3RhdGUuc2VsZWN0ZWREZXBhcnRtZW50SWQpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7IHN0YXR1cywgZGF0YSB9ID0gc3RvcmUuc3RhdGUuZW1wbG95ZWVzO1xyXG4gIHJlbmRlcihzdGF0dXMsIGRhdGEpO1xyXG5cclxuICBmdW5jdGlvbiByZW5kZXIoc3RhdHVzLCBkYXRhKSB7XHJcbiAgICAkd3JhcHBlci5odG1sKE11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgZGF0YSkpO1xyXG4gICAgZXZlbnRzLmVtaXQoXCJzbGlkZVRvRmlyc3RFbXBsb3llZVwiKTtcclxuICB9XHJcbn1cclxuYXN5bmMgZnVuY3Rpb24gaW5pdERlcGFydG1lbnRzRmlsdGVyKHN0b3JlLCBldmVudHMpIHtcclxuICBsZXQgYWN0aXZlRWxlbSA9IG51bGw7XHJcbiAgY29uc3QgJHdyYXBwZXIgPSAkKFwiI2RlcGFydG1lbnQtc2VsZWN0LXdyYXBwZXJcIik7XHJcbiAgc3RvcmUub24oXCJ1cGRhdGVcIiwgKHsgc3RhdGUsIHByZXZTdGF0ZSB9KSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuZGVwYXJ0bWVudHMgPT09IHByZXZTdGF0ZS5kZXBhcnRtZW50cykgcmV0dXJuO1xyXG4gICAgY29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IHN0YXRlLmRlcGFydG1lbnRzO1xyXG4gICAgcmVuZGVyKHN0YXR1cywgZGF0YSk7XHJcbiAgICBjb25zdCBmaXJzdEVsZW0gPSAkd3JhcHBlci5maW5kKFwiW2RhdGEtaWRdXCIpLmZpcnN0KCkuZ2V0KDApO1xyXG4gICAgaWYgKGZpcnN0RWxlbSkgc2V0QWN0aXZlKGZpcnN0RWxlbSk7XHJcbiAgfSk7XHJcbiAgZmV0Y2hEZXBhcnRtZW50cygpO1xyXG4gICR3cmFwcGVyLm9uKFwiY2xpY2tcIiwgKHsgdGFyZ2V0IH0pID0+IHtcclxuICAgIGlmICghdGFyZ2V0Lmhhc0F0dHJpYnV0ZShcImRhdGEtaWRcIikpIHJldHVybjtcclxuICAgIHNldEFjdGl2ZSh0YXJnZXQpO1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBzZXRBY3RpdmUoZWxlbSkge1xyXG4gICAgaWYgKGFjdGl2ZUVsZW0gPT09IGVsZW0pIHJldHVybjtcclxuICAgIGlmIChhY3RpdmVFbGVtKSB7XHJcbiAgICAgIGFjdGl2ZUVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRlcGFydG1lbnRJZCA9IGVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgIHN0b3JlLnVwZGF0ZSgoc3RhdGUpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBzZWxlY3RlZERlcGFydG1lbnRJZDogZGVwYXJ0bWVudElkLFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBhY3RpdmVFbGVtID0gZWxlbTtcclxuICB9XHJcbiAgZnVuY3Rpb24gcmVuZGVyKHN0YXR1cywgZGF0YSkge1xyXG4gICAgJHdyYXBwZXIuaHRtbChwcmVzZXJ2ZShzdGF0dXMsIGRhdGEpKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gcHJlc2VydmUoc3RhdHVzLCBkYXRhKSB7XHJcbiAgICByZXR1cm4gZGF0YVxyXG4gICAgICAubWFwKFxyXG4gICAgICAgIChpdGVtKSA9PiBgPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGV4dC1saW5rIHNlY3Rpb24tbmF2X19idG5cIiBkYXRhLXNsdWc9XCIke2l0ZW0uc2x1Z31cIiBkYXRhLWlkPVwiJHtpdGVtLmlkfVwiPiR7aXRlbS5odG1sX3JlcHJlc2VudGF0aW9ufTwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+YFxyXG4gICAgICApXHJcbiAgICAgIC5qb2luKFwiXCIpO1xyXG4gIH1cclxufVxyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiM2VjYTc3MGU0ODU1MDcxYjFhMmVcIjsgfSJdLCJuYW1lcyI6WyJtb2R1bGVNYW5hZ2VyIiwiTW9kdWxlIiwiaW5pdFN0b3JlIiwiaW5pdFRlYW1TZWxlY3RTbGlkZXIiLCJpbml0VGVhbWF0ZXNTbGlkZXJzIiwiaW5pdENvbnRhY3RGb3JtIiwiZmV0Y2hEZXBhcnRtZW50cyIsImZldGNoRGVwYXJ0bWVudEVtcGxveWVlcyIsImxvZyIsImVycm9yIiwiZGVidWciLCJlbnRyeSIsImNvbnRleHQiLCJtb2R1bGUiLCJwYWdlU3RvcmUiLCJldmVudHMiLCJvbiIsIl9yZWYiLCJzdGF0ZSIsInByZXZTdGF0ZSIsImNvbnNvbGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJvbkRvbVJlYWR5Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiaW5pdE5hdlRvUHJvZmlsZSIsImluaXRFbWxveWVlVmlldyIsImluaXREZXBhcnRtZW50VmlldyIsImluaXREZXBhcnRtZW50c0ZpbHRlciIsImV4IiwicGFnZSIsIm5hbWUiLCJyZXF1aXJlZCIsImFkZCIsInN0b3JlIiwiJCIsIl9yZWYyIiwidGFyZ2V0IiwiJGhlYWRlciIsIiRwcm9maWxlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbG9zZXN0IiwicHJvZmlsZUJjciIsImdldCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlYWRlckhlaWdodCIsIm91dGVySGVpZ2h0Iiwic2Nyb2xsVG8iLCJ0b3AiLCJzY3JvbGxZIiwiYmVoYXZpb3IiLCIkcHJvZmlsZVdyYXBwZXIiLCJwcm9maWxlVGVtcGxhdGUiLCJodG1sIiwiJHNraWxsc1JhdGVzV3JhcHBlciIsInNraWxsc1JhdGVzVGVtcGxhdGUiLCIkdGFnc0Nsb3VkV3JhcHBlciIsInRhZ3NDbG91ZFRlbXBsYXRlIiwiTXVzdGFjaGUiLCJwYXJzZSIsIl9yZWYzIiwiZHJhd2VycyIsIm9wZW4iLCJfcmVmNCIsInNlbGVjdGVkRW1wbG95ZWVJZHgiLCJlbXBsb3llZXMiLCJzdGF0dXMiLCJkYXRhIiwibGVuZ3RoIiwic2VsZWN0ZWRFbXBsb3llZURhdGEiLCJ0aXRsZSIsInJlbmRlclByb2ZpbGUiLCJhY3RpdmVTbGlkZUVsZW0iLCJxdWVyeVNlbGVjdG9yIiwidGl0bGVGcm9tU2xpZGUiLCJnZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsInJlbmRlclNraWxsc1JhdGVzIiwiY3JiX3NraWxsc19saXN0IiwicmVuZGVyVGFnc0Nsb3VkIiwicmVuZGVyIiwiZW1sb3llZXZpZXciLCJmaW5hbGl6ZWREYXRhIiwibWFwIiwiX3JlZjUiLCJjcmJfbmFtZSIsImNyYl9yYXRlIiwiQXJyYXkiLCJfcmVmNiIsImNyYl9tYWluX21lc3NhZ2UiLCJjcmJfdGFnc19jbG91ZCIsInNlY3Rpb25DdXQiLCJnZW5lcmF0ZURlZ3JlZU9mZnNldCIsIk1hdGgiLCJyYW5kb20iLCJ0YWdzIiwiaWR4IiwidGhpc1NlY3Rpb25DdXQiLCIkd3JhcHBlciIsInRlbXBsYXRlIiwiX3JlZjciLCJfcmVmOCIsInNlbGVjdGVkRGVwYXJ0bWVudElkIiwiZW1pdCIsImFjdGl2ZUVsZW0iLCJfcmVmOSIsImRlcGFydG1lbnRzIiwiZmlyc3RFbGVtIiwiZmluZCIsImZpcnN0Iiwic2V0QWN0aXZlIiwiX3JlZjEwIiwiaGFzQXR0cmlidXRlIiwiZWxlbSIsInJlbW92ZSIsImRlcGFydG1lbnRJZCIsInVwZGF0ZSIsInByZXNlcnZlIiwiaXRlbSIsInNsdWciLCJpZCIsImh0bWxfcmVwcmVzZW50YXRpb24iLCJqb2luIl0sInNvdXJjZVJvb3QiOiIifQ==