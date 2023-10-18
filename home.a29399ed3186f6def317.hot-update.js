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
    const activeSlideElem = document.querySelector(".swiper-slide-active"); // You may need to adapt this selector based on your HTML structure
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
/******/ 	__webpack_require__.h = function() { return "74fca675be5d4c05effa"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5hMjkzOTllZDMxODZmNmRlZjMxNy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNEU7QUFDbkM7QUFDZ0M7QUFDWDtBQUlsQjtBQUMyQjtBQUV2RUUsMkRBQVMsQ0FBQyxDQUFDO0FBRVgsTUFBTVMsS0FBSyxHQUFHQSxDQUFDQyxPQUFPLEVBQUVDLE1BQU0sS0FBSztFQUNqQyxNQUFNO0lBQUVDLFNBQVM7SUFBRUM7RUFBTyxDQUFDLEdBQUdILE9BQU87RUFFckNFLFNBQVMsQ0FBQ0UsRUFBRSxDQUFDLFFBQVEsRUFBRUMsSUFBQTtJQUFBLElBQUM7TUFBRUMsS0FBSztNQUFFQztJQUFVLENBQUMsR0FBQUYsSUFBQTtJQUFBLE9BQzFDRyxPQUFPLENBQUNaLEdBQUcsQ0FBQ1UsS0FBSyxFQUFFQyxTQUFTLENBQUM7RUFBQSxDQUMvQixDQUFDO0VBRUQsSUFBSUUsUUFBUSxDQUFDQyxVQUFVLEtBQUssYUFBYSxFQUFFO0lBQ3pDQyxVQUFVLENBQUMsQ0FBQztFQUNkLENBQUMsTUFBTTtJQUNMQyxNQUFNLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFRixVQUFVLENBQUM7RUFDekQ7RUFDQSxTQUFTQSxVQUFVQSxDQUFDRyxLQUFLLEVBQUU7SUFDekIsSUFBSTtNQUNGdkIsaUVBQW9CLENBQUNXLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQ3ZDWCxnRUFBbUIsQ0FBQ1UsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFDdENZLGdCQUFnQixDQUFDYixTQUFTLEVBQUVDLE1BQU0sQ0FBQztNQUNuQ1YsdUVBQWUsQ0FBQyxtQkFBbUIsRUFBRVMsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFDdkRWLHVFQUFlLENBQUMseUJBQXlCLEVBQUVTLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQzdEYSxlQUFlLENBQUNkLFNBQVMsRUFBRUMsTUFBTSxDQUFDO01BQ2xDYyxrQkFBa0IsQ0FBQ2YsU0FBUyxFQUFFQyxNQUFNLENBQUM7TUFD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ZWJwYWNrOi8vZmxzLXN0YXJ0Ly4vc3JjL2pzL3BhZ2VzL2hvbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZmxzLXN0YXJ0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9kdWxlTWFuYWdlciwgeyBNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL01vZHVsZU1hbmFnZXIvaW5kZXguanNcIjtcclxuaW1wb3J0IGluaXRTdG9yZSBmcm9tIFwiLi9zdG9yZS9pbmRleC5qc1wiO1xyXG5pbXBvcnQgeyBpbml0VGVhbVNlbGVjdFNsaWRlciwgaW5pdFRlYW1hdGVzU2xpZGVycyB9IGZyb20gXCIuL3NsaWRlcnMuanNcIjtcclxuaW1wb3J0IHsgaW5pdENvbnRhY3RGb3JtIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb250YWN0Rm9ybS5qc1wiO1xyXG5pbXBvcnQge1xyXG4gIGZldGNoRGVwYXJ0bWVudHMsXHJcbiAgZmV0Y2hEZXBhcnRtZW50RW1wbG95ZWVzLFxyXG59IGZyb20gXCIuLi8uLi9zaGFyZWQvc2VydmljZXMvZW1wbG95ZWVzLmpzXCI7XHJcbmltcG9ydCB7IGxvZywgZXJyb3IsIGRlYnVnIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3JlcG8vanMvbGlicy9sb2dnZXIuanNcIjtcclxuXHJcbmluaXRTdG9yZSgpO1xyXG5cclxuY29uc3QgZW50cnkgPSAoY29udGV4dCwgbW9kdWxlKSA9PiB7XHJcbiAgY29uc3QgeyBwYWdlU3RvcmUsIGV2ZW50cyB9ID0gY29udGV4dDtcclxuXHJcbiAgcGFnZVN0b3JlLm9uKFwidXBkYXRlXCIsICh7IHN0YXRlLCBwcmV2U3RhdGUgfSkgPT5cclxuICAgIGNvbnNvbGUubG9nKHN0YXRlLCBwcmV2U3RhdGUpXHJcbiAgKTtcclxuXHJcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiaW50ZXJhY3RpdmVcIikge1xyXG4gICAgb25Eb21SZWFkeSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgb25Eb21SZWFkeSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIG9uRG9tUmVhZHkoZXZlbnQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGluaXRUZWFtU2VsZWN0U2xpZGVyKHBhZ2VTdG9yZSwgZXZlbnRzKTtcclxuICAgICAgaW5pdFRlYW1hdGVzU2xpZGVycyhwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXROYXZUb1Byb2ZpbGUocGFnZVN0b3JlLCBldmVudHMpO1xyXG4gICAgICBpbml0Q29udGFjdEZvcm0oXCJtYWluLWNvbnRhY3QtZm9ybVwiLCBwYWdlU3RvcmUsIGV2ZW50cyk7XHJcbiAgICAgIGluaXRDb250YWN0Rm9ybShcImN2LXJlcXVlc3QtY29udGFjdC1mb3JtXCIsIHBhZ2VTdG9yZSwgZXZlbnRzKTtcclxuICAgICAgaW5pdEVtbG95ZWVWaWV3KHBhZ2VTdG9yZSwgZXZlbnRzKTtcclxuICAgICAgaW5pdERlcGFydG1lbnRWaWV3KHBhZ2VTdG9yZSwgZXZlbnRzKTtcclxuICAgICAgaW5pdERlcGFydG1lbnRzRmlsdGVyKHBhZ2VTdG9yZSwgZXZlbnRzKTtcclxuICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgIGVycm9yKGV4KTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBwYWdlID0gbmV3IE1vZHVsZSh7XHJcbiAgbmFtZTogXCJwYWdlXCIsXHJcbiAgZW50cnk6IGVudHJ5LFxyXG4gIHJlcXVpcmVkOiBbXCJldmVudHNcIiwgXCJjb21tb25TdG9yZVwiLCBcInBhZ2VTdG9yZVwiXSxcclxufSk7XHJcbm1vZHVsZU1hbmFnZXIuYWRkKHBhZ2UpO1xyXG5cclxuZnVuY3Rpb24gaW5pdE5hdlRvUHJvZmlsZShzdG9yZSwgZXZlbnRzKSB7XHJcbiAgJChcIiN0ZWFtYXRlcy1saXN0LXdyYXBwZXJcIikub24oXCJjbGlja1wiLCAoeyB0YXJnZXQgfSkgPT4ge1xyXG4gICAgY29uc3QgJGhlYWRlciA9ICQoXCJoZWFkZXJcIik7XHJcbiAgICBjb25zdCAkcHJvZmlsZSA9ICQoXCIjcHJvZmlsZVwiKTtcclxuICAgIGlmIChcclxuICAgICAgIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0ZWFtYXRlLWNhcmRfX2J0blwiKSAmJlxyXG4gICAgICAhdGFyZ2V0LmNsb3Nlc3QoXCIudGVhbWF0ZS1jYXJkX19idG5cIilcclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG4gICAgY29uc3QgcHJvZmlsZUJjciA9ICRwcm9maWxlLmdldCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IGhlYWRlckhlaWdodCA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcclxuICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgIHRvcDogd2luZG93LnNjcm9sbFkgKyBwcm9maWxlQmNyLnRvcCAtIGhlYWRlckhlaWdodCxcclxuICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCIsXHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5mdW5jdGlvbiBpbml0RW1sb3llZVZpZXcoc3RvcmUsIGV2ZW50cykge1xyXG4gIGNvbnN0ICRwcm9maWxlV3JhcHBlciA9ICQoXCIjcHJvZmlsZS1tYWluXCIpO1xyXG4gIGNvbnN0IHByb2ZpbGVUZW1wbGF0ZSA9ICQoXCIjZW1wbG95ZWUtcHJvZmlsZS10ZW1wbGF0ZVwiKS5odG1sKCk7XHJcbiAgY29uc3QgJHNraWxsc1JhdGVzV3JhcHBlciA9ICQoXCIjcHJvZmlsZS1za2lsbHMtcmF0ZXNcIik7XHJcbiAgY29uc3Qgc2tpbGxzUmF0ZXNUZW1wbGF0ZSA9ICQoXCIjZW1wbG95ZWUtc2tpbGxzLXJhdGVzLXRlbXBsYXRlXCIpLmh0bWwoKTtcclxuICBjb25zdCAkdGFnc0Nsb3VkV3JhcHBlciA9ICQoXCIjcHJvZmlsZS10YWdzLWNsb3VkXCIpO1xyXG4gIGNvbnN0IHRhZ3NDbG91ZFRlbXBsYXRlID0gJChcIiNlbXBsb3llZS10YWdzLWNsb3VkLXRlbXBsYXRlXCIpLmh0bWwoKTtcclxuICBNdXN0YWNoZS5wYXJzZShwcm9maWxlVGVtcGxhdGUpO1xyXG4gIE11c3RhY2hlLnBhcnNlKHNraWxsc1JhdGVzVGVtcGxhdGUpO1xyXG4gIE11c3RhY2hlLnBhcnNlKHRhZ3NDbG91ZFRlbXBsYXRlKTtcclxuXHJcbiAgJHByb2ZpbGVXcmFwcGVyLm9uKFwiY2xpY2tcIiwgKHsgdGFyZ2V0IH0pID0+IHtcclxuICAgIGlmIChcclxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInByb2ZpbGVfX2Rvd25sb2FkLWJ0blwiKSB8fFxyXG4gICAgICB0YXJnZXQuY2xvc2VzdChcIi5wcm9maWxlX19kb3dubG9hZC1idG5cIilcclxuICAgICkge1xyXG4gICAgICBkcmF3ZXJzLm9wZW4oXCJjdi1yZXF1ZXN0LWZvcm1cIiwgdGFyZ2V0KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgc3RvcmUub24oXCJ1cGRhdGVcIiwgKHsgc3RhdGUsIHByZXZTdGF0ZSB9KSA9PiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHN0YXRlLnNlbGVjdGVkRW1wbG95ZWVJZHggPT09IHByZXZTdGF0ZS5zZWxlY3RlZEVtcGxveWVlSWR4ICYmXHJcbiAgICAgIHN0YXRlLmVtcGxveWVlcyA9PT0gcHJldlN0YXRlLmVtcGxveWVlc1xyXG4gICAgKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBjb25zdCB7IHN0YXR1cywgZGF0YSB9ID0gc3RhdGUuZW1wbG95ZWVzO1xyXG4gICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICBjb25zdCB7IHNlbGVjdGVkRW1wbG95ZWVJZHggfSA9IHN0YXRlO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRFbXBsb3llZURhdGEgPSBkYXRhW3NlbGVjdGVkRW1wbG95ZWVJZHhdO1xyXG4gICAgY29uc29sZS5sb2coc2VsZWN0ZWRFbXBsb3llZURhdGEpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBzZWxlY3RlZEVtcGxveWVlRGF0YS50aXRsZTtcclxuICAgIHJlbmRlclByb2ZpbGUoc3RhdHVzLCBzZWxlY3RlZEVtcGxveWVlRGF0YSk7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1zbGlkZS1hY3RpdmVcIik7IC8vIFlvdSBtYXkgbmVlZCB0byBhZGFwdCB0aGlzIHNlbGVjdG9yIGJhc2VkIG9uIHlvdXIgSFRNTCBzdHJ1Y3R1cmVcclxuICAgIGNvbnN0IHRpdGxlRnJvbVNsaWRlID0gYWN0aXZlU2xpZGVFbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdGl0bGVcIik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX3RpdGxlXCIpLnRleHRDb250ZW50ID0gdGl0bGVGcm9tU2xpZGU7XHJcbiAgICByZW5kZXJTa2lsbHNSYXRlcyhzdGF0dXMsIHNlbGVjdGVkRW1wbG95ZWVEYXRhLmNyYl9za2lsbHNfbGlzdCk7XHJcbiAgICByZW5kZXJUYWdzQ2xvdWQoc3RhdHVzLCBzZWxlY3RlZEVtcGxveWVlRGF0YSk7XHJcbiAgfSk7XHJcbiAgZnVuY3Rpb24gcmVuZGVyUHJvZmlsZShzdGF0dXMsIGRhdGEsIHRpdGxlKSB7XHJcbiAgICAkcHJvZmlsZVdyYXBwZXIuaHRtbChNdXN0YWNoZS5yZW5kZXIocHJvZmlsZVRlbXBsYXRlLCBkYXRhKSk7XHJcbiAgICBlbWxveWVldmlldztcclxuICB9XHJcbiAgZnVuY3Rpb24gcmVuZGVyU2tpbGxzUmF0ZXMoc3RhdHVzLCBkYXRhKSB7XHJcbiAgICBjb25zdCBmaW5hbGl6ZWREYXRhID0gZGF0YS5tYXAoKHsgY3JiX25hbWUsIGNyYl9yYXRlIH0pID0+IHtcclxuICAgICAgcmV0dXJuIHsgY3JiX25hbWUsIGNyYl9yYXRlOiBuZXcgQXJyYXkoY3JiX3JhdGUpIH07XHJcbiAgICB9KTtcclxuICAgICRza2lsbHNSYXRlc1dyYXBwZXIuaHRtbChcclxuICAgICAgTXVzdGFjaGUucmVuZGVyKHNraWxsc1JhdGVzVGVtcGxhdGUsIGZpbmFsaXplZERhdGEpXHJcbiAgICApO1xyXG4gIH1cclxuICBmdW5jdGlvbiByZW5kZXJUYWdzQ2xvdWQoc3RhdHVzLCB7IGNyYl9tYWluX21lc3NhZ2UsIGNyYl90YWdzX2Nsb3VkIH0pIHtcclxuICAgIGNvbnN0IHNlY3Rpb25DdXQgPSAzNjAgLyBjcmJfdGFnc19jbG91ZC5sZW5ndGg7XHJcbiAgICBjb25zdCBnZW5lcmF0ZURlZ3JlZU9mZnNldCA9ICgpID0+XHJcbiAgICAgIC1zZWN0aW9uQ3V0ICogMC4xICsgc2VjdGlvbkN1dCAqIDAuMiAqIE1hdGgucmFuZG9tKCk7XHJcbiAgICBjb25zdCBmaW5hbGl6ZWREYXRhID0ge1xyXG4gICAgICBjcmJfbWFpbl9tZXNzYWdlLFxyXG4gICAgICBjcmJfdGFnc19jbG91ZDogY3JiX3RhZ3NfY2xvdWQubWFwKCh0YWdzLCBpZHgpID0+IHtcclxuICAgICAgICBjb25zdCB0aGlzU2VjdGlvbkN1dCA9IGlkeCAqIHNlY3Rpb25DdXQ7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLnRhZ3MsXHJcbiAgICAgICAgICBcInBsYWNpbmctZGVncmVlXCI6IGAke3RoaXNTZWN0aW9uQ3V0ICsgZ2VuZXJhdGVEZWdyZWVPZmZzZXQoKX1kZWdgLFxyXG4gICAgICAgICAgXCJkaXN0YW5jZS1zaGlmdFwiOiBgJHstMC4wNSArIDAuMSAqIE1hdGgucmFuZG9tKCl9YCxcclxuICAgICAgICB9O1xyXG4gICAgICB9KSxcclxuICAgIH07XHJcbiAgICBjb25zb2xlLmxvZyhmaW5hbGl6ZWREYXRhKTtcclxuICAgICR0YWdzQ2xvdWRXcmFwcGVyLmh0bWwoTXVzdGFjaGUucmVuZGVyKHRhZ3NDbG91ZFRlbXBsYXRlLCBmaW5hbGl6ZWREYXRhKSk7XHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIGluaXREZXBhcnRtZW50VmlldyhzdG9yZSwgZXZlbnRzKSB7XHJcbiAgY29uc3QgJHdyYXBwZXIgPSAkKFwiI3RlYW1hdGVzLWxpc3Qtd3JhcHBlclwiKTtcclxuICBjb25zdCB0ZW1wbGF0ZSA9ICQoXCIjZW1wbG95ZWUtY2FyZC10ZW1wbGF0ZVwiKS5odG1sKCk7XHJcbiAgTXVzdGFjaGUucGFyc2UodGVtcGxhdGUpO1xyXG5cclxuICBzdG9yZS5vbihcInVwZGF0ZVwiLCAoeyBzdGF0ZSwgcHJldlN0YXRlIH0pID0+IHtcclxuICAgIGlmIChzdGF0ZS5lbXBsb3llZXMgPT09IHByZXZTdGF0ZS5lbXBsb3llZXMpIHJldHVybjtcclxuICAgIGNvbnN0IHsgc3RhdHVzLCBkYXRhIH0gPSBzdGF0ZS5lbXBsb3llZXM7XHJcbiAgICByZW5kZXIoc3RhdHVzLCBkYXRhKTtcclxuICB9KTtcclxuICBzdG9yZS5vbihcInVwZGF0ZVwiLCAoeyBzdGF0ZSwgcHJldlN0YXRlIH0pID0+IHtcclxuICAgIGlmIChzdGF0ZS5zZWxlY3RlZERlcGFydG1lbnRJZCA9PT0gcHJldlN0YXRlLnNlbGVjdGVkRGVwYXJ0bWVudElkKSByZXR1cm47XHJcbiAgICBmZXRjaERlcGFydG1lbnRFbXBsb3llZXMoc3RhdGUuc2VsZWN0ZWREZXBhcnRtZW50SWQpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7IHN0YXR1cywgZGF0YSB9ID0gc3RvcmUuc3RhdGUuZW1wbG95ZWVzO1xyXG4gIHJlbmRlcihzdGF0dXMsIGRhdGEpO1xyXG5cclxuICBmdW5jdGlvbiByZW5kZXIoc3RhdHVzLCBkYXRhKSB7XHJcbiAgICAkd3JhcHBlci5odG1sKE11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgZGF0YSkpO1xyXG4gICAgZXZlbnRzLmVtaXQoXCJzbGlkZVRvRmlyc3RFbXBsb3llZVwiKTtcclxuICB9XHJcbn1cclxuYXN5bmMgZnVuY3Rpb24gaW5pdERlcGFydG1lbnRzRmlsdGVyKHN0b3JlLCBldmVudHMpIHtcclxuICBsZXQgYWN0aXZlRWxlbSA9IG51bGw7XHJcbiAgY29uc3QgJHdyYXBwZXIgPSAkKFwiI2RlcGFydG1lbnQtc2VsZWN0LXdyYXBwZXJcIik7XHJcbiAgc3RvcmUub24oXCJ1cGRhdGVcIiwgKHsgc3RhdGUsIHByZXZTdGF0ZSB9KSA9PiB7XHJcbiAgICBpZiAoc3RhdGUuZGVwYXJ0bWVudHMgPT09IHByZXZTdGF0ZS5kZXBhcnRtZW50cykgcmV0dXJuO1xyXG4gICAgY29uc3QgeyBzdGF0dXMsIGRhdGEgfSA9IHN0YXRlLmRlcGFydG1lbnRzO1xyXG4gICAgcmVuZGVyKHN0YXR1cywgZGF0YSk7XHJcbiAgICBjb25zdCBmaXJzdEVsZW0gPSAkd3JhcHBlci5maW5kKFwiW2RhdGEtaWRdXCIpLmZpcnN0KCkuZ2V0KDApO1xyXG4gICAgaWYgKGZpcnN0RWxlbSkgc2V0QWN0aXZlKGZpcnN0RWxlbSk7XHJcbiAgfSk7XHJcbiAgZmV0Y2hEZXBhcnRtZW50cygpO1xyXG4gICR3cmFwcGVyLm9uKFwiY2xpY2tcIiwgKHsgdGFyZ2V0IH0pID0+IHtcclxuICAgIGlmICghdGFyZ2V0Lmhhc0F0dHJpYnV0ZShcImRhdGEtaWRcIikpIHJldHVybjtcclxuICAgIHNldEFjdGl2ZSh0YXJnZXQpO1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBzZXRBY3RpdmUoZWxlbSkge1xyXG4gICAgaWYgKGFjdGl2ZUVsZW0gPT09IGVsZW0pIHJldHVybjtcclxuICAgIGlmIChhY3RpdmVFbGVtKSB7XHJcbiAgICAgIGFjdGl2ZUVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRlcGFydG1lbnRJZCA9IGVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcclxuICAgIHN0b3JlLnVwZGF0ZSgoc3RhdGUpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBzZWxlY3RlZERlcGFydG1lbnRJZDogZGVwYXJ0bWVudElkLFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICBlbGVtLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBhY3RpdmVFbGVtID0gZWxlbTtcclxuICB9XHJcbiAgZnVuY3Rpb24gcmVuZGVyKHN0YXR1cywgZGF0YSkge1xyXG4gICAgJHdyYXBwZXIuaHRtbChwcmVzZXJ2ZShzdGF0dXMsIGRhdGEpKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gcHJlc2VydmUoc3RhdHVzLCBkYXRhKSB7XHJcbiAgICByZXR1cm4gZGF0YVxyXG4gICAgICAubWFwKFxyXG4gICAgICAgIChpdGVtKSA9PiBgPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGV4dC1saW5rIHNlY3Rpb24tbmF2X19idG5cIiBkYXRhLXNsdWc9XCIke2l0ZW0uc2x1Z31cIiBkYXRhLWlkPVwiJHtpdGVtLmlkfVwiPiR7aXRlbS5odG1sX3JlcHJlc2VudGF0aW9ufTwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+YFxyXG4gICAgICApXHJcbiAgICAgIC5qb2luKFwiXCIpO1xyXG4gIH1cclxufVxyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiNzRmY2E2NzViZTVkNGMwNWVmZmFcIjsgfSJdLCJuYW1lcyI6WyJtb2R1bGVNYW5hZ2VyIiwiTW9kdWxlIiwiaW5pdFN0b3JlIiwiaW5pdFRlYW1TZWxlY3RTbGlkZXIiLCJpbml0VGVhbWF0ZXNTbGlkZXJzIiwiaW5pdENvbnRhY3RGb3JtIiwiZmV0Y2hEZXBhcnRtZW50cyIsImZldGNoRGVwYXJ0bWVudEVtcGxveWVlcyIsImxvZyIsImVycm9yIiwiZGVidWciLCJlbnRyeSIsImNvbnRleHQiLCJtb2R1bGUiLCJwYWdlU3RvcmUiLCJldmVudHMiLCJvbiIsIl9yZWYiLCJzdGF0ZSIsInByZXZTdGF0ZSIsImNvbnNvbGUiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJvbkRvbVJlYWR5Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiaW5pdE5hdlRvUHJvZmlsZSIsImluaXRFbWxveWVlVmlldyIsImluaXREZXBhcnRtZW50VmlldyIsImluaXREZXBhcnRtZW50c0ZpbHRlciIsImV4IiwicGFnZSIsIm5hbWUiLCJyZXF1aXJlZCIsImFkZCIsInN0b3JlIiwiJCIsIl9yZWYyIiwidGFyZ2V0IiwiJGhlYWRlciIsIiRwcm9maWxlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbG9zZXN0IiwicHJvZmlsZUJjciIsImdldCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlYWRlckhlaWdodCIsIm91dGVySGVpZ2h0Iiwic2Nyb2xsVG8iLCJ0b3AiLCJzY3JvbGxZIiwiYmVoYXZpb3IiLCIkcHJvZmlsZVdyYXBwZXIiLCJwcm9maWxlVGVtcGxhdGUiLCJodG1sIiwiJHNraWxsc1JhdGVzV3JhcHBlciIsInNraWxsc1JhdGVzVGVtcGxhdGUiLCIkdGFnc0Nsb3VkV3JhcHBlciIsInRhZ3NDbG91ZFRlbXBsYXRlIiwiTXVzdGFjaGUiLCJwYXJzZSIsIl9yZWYzIiwiZHJhd2VycyIsIm9wZW4iLCJfcmVmNCIsInNlbGVjdGVkRW1wbG95ZWVJZHgiLCJlbXBsb3llZXMiLCJzdGF0dXMiLCJkYXRhIiwibGVuZ3RoIiwic2VsZWN0ZWRFbXBsb3llZURhdGEiLCJ0aXRsZSIsInJlbmRlclByb2ZpbGUiLCJhY3RpdmVTbGlkZUVsZW0iLCJxdWVyeVNlbGVjdG9yIiwidGl0bGVGcm9tU2xpZGUiLCJnZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsInJlbmRlclNraWxsc1JhdGVzIiwiY3JiX3NraWxsc19saXN0IiwicmVuZGVyVGFnc0Nsb3VkIiwicmVuZGVyIiwiZW1sb3llZXZpZXciLCJmaW5hbGl6ZWREYXRhIiwibWFwIiwiX3JlZjUiLCJjcmJfbmFtZSIsImNyYl9yYXRlIiwiQXJyYXkiLCJfcmVmNiIsImNyYl9tYWluX21lc3NhZ2UiLCJjcmJfdGFnc19jbG91ZCIsInNlY3Rpb25DdXQiLCJnZW5lcmF0ZURlZ3JlZU9mZnNldCIsIk1hdGgiLCJyYW5kb20iLCJ0YWdzIiwiaWR4IiwidGhpc1NlY3Rpb25DdXQiLCIkd3JhcHBlciIsInRlbXBsYXRlIiwiX3JlZjciLCJfcmVmOCIsInNlbGVjdGVkRGVwYXJ0bWVudElkIiwiZW1pdCIsImFjdGl2ZUVsZW0iLCJfcmVmOSIsImRlcGFydG1lbnRzIiwiZmlyc3RFbGVtIiwiZmluZCIsImZpcnN0Iiwic2V0QWN0aXZlIiwiX3JlZjEwIiwiaGFzQXR0cmlidXRlIiwiZWxlbSIsInJlbW92ZSIsImRlcGFydG1lbnRJZCIsInVwZGF0ZSIsInByZXNlcnZlIiwiaXRlbSIsInNsdWciLCJpZCIsImh0bWxfcmVwcmVzZW50YXRpb24iLCJqb2luIl0sInNvdXJjZVJvb3QiOiIifQ==