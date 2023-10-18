"use strict";
self["webpackHotUpdatefls_start"]("home",{

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
    const name = activeSlideElem.getAttribute("data-name");
    updateProfileSection(name);
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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "69c817fb6bb4758984b0"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bEMsY0FBYyxHQUFHNkIsV0FBVyxDQUFDO0lBQzdELE1BQU1NLFlBQVksR0FBR0wsSUFBSSxDQUFDQyxHQUFHLENBQzNCbkQsTUFBTSxDQUFDNEMsTUFBTSxFQUNieEIsY0FBYyxHQUFHNkIsV0FBVyxHQUFHLENBQ2pDLENBQUM7SUFDRGpELE1BQU0sQ0FDSHdELEtBQUssQ0FBQ0gsV0FBVyxFQUFFakMsY0FBYyxDQUFDLENBQ2xDcUMsT0FBTyxDQUFDLENBQUMsQ0FDVHRELE9BQU8sQ0FBQyxDQUFDNkMsSUFBSSxFQUFFakIsR0FBRyxLQUFLO01BQ3RCaUIsSUFBSSxDQUFDekMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxHQUFHd0IsR0FBRyxDQUFDO0lBQ3BELENBQUMsQ0FBQztJQUNKL0IsTUFBTSxDQUFDd0QsS0FBSyxDQUFDcEMsY0FBYyxHQUFHLENBQUMsRUFBRW1DLFlBQVksQ0FBQyxDQUFDcEQsT0FBTyxDQUFDLENBQUM2QyxJQUFJLEVBQUVqQixHQUFHLEtBQUs7TUFDcEVpQixJQUFJLENBQUN6QyxZQUFZLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHd0IsR0FBRyxDQUFDO0lBQ25ELENBQUMsQ0FBQztFQUNKO0FBQ0Y7Ozs7Ozs7O1VDL0tBLHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zscy1zdGFydC8uL3NyYy9qcy9wYWdlcy9ob21lL3NsaWRlcnMuanMiLCJ3ZWJwYWNrOi8vZmxzLXN0YXJ0L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2csIGVycm9yLCBkZWJ1ZyB9IGZyb20gXCIuLi8uLi8uLi8uLi9yZXBvL2pzL2xpYnMvbG9nZ2VyLmpzXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0VGVhbVNlbGVjdFNsaWRlcigpIHtcclxuICBjb25zdCB0ZWFtYXRlc1NsaWRlcnMgPSBuZXcgU3dpcGVyKFwiI3RlYW0tc2VsZWN0LXNsaWRlclwiLCB7XHJcbiAgICBvYnNlcnZlcjogdHJ1ZSxcclxuICAgIHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxyXG4gICAgc2xpZGVzUGVyVmlldzogXCJhdXRvXCIsXHJcbiAgICBncmFiQ3Vyc29yOiB0cnVlLFxyXG4gICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICBicmVha3BvaW50czoge1xyXG4gICAgICA0MjA6IHtcclxuICAgICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0VGVhbWF0ZXNTbGlkZXJzKHN0b3JlLCBldmVudHMpIHtcclxuICBsb2coXCJpbml0VGVhbWF0ZXNTbGlkZXJzXCIpO1xyXG4gIGNvbnN0IGN1cnJlbnRTbGlkZU51bWJlckVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgXCIjdGVhbWF0ZXMtc2xpZGVyLWNvdW50ZXIgLnRlYW1hdGVzLXNsaWRlcl9fY3VycmVudFwiXHJcbiAgKTtcclxuICBjb25zdCB0b3RhbFNsaWRlc051bWJlckVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgXCIjdGVhbWF0ZXMtc2xpZGVyLWNvdW50ZXIgLnRlYW1hdGVzLXNsaWRlcl9fdG90YWxcIlxyXG4gICk7XHJcbiAgY29uc3Qgc2xpZGVyID0gbmV3IFN3aXBlcihcIiN0ZWFtYXRlcy1zbGlkZXJcIiwge1xyXG4gICAgb2JzZXJ2ZXI6IHRydWUsXHJcbiAgICByZXNpemVPYnNlcnZlcjogdHJ1ZSxcclxuICAgIHNsaWRlc1BlclZpZXc6IFwiYXV0b1wiLFxyXG4gICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICBncmFiQ3Vyc29yOiB0cnVlLFxyXG4gICAgbG9vcDogdHJ1ZSxcclxuICAgIGVmZmVjdDogXCJjb3ZlcmZsb3dcIixcclxuICAgIGNvdmVyZmxvd0VmZmVjdDoge1xyXG4gICAgICByb3RhdGU6IDQwLFxyXG4gICAgICBzdHJldGNoOiAzNTAsXHJcbiAgICAgIGRlcHRoOiAzMDAsXHJcbiAgICAgIG1vZGlmaWVyOiAwLjY1LFxyXG4gICAgICBzbGlkZVNoYWRvd3M6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIGF1dG9wbGF5OiB7XHJcbiAgICAgIGRlbGF5OiAzMDAwLFxyXG4gICAgfSxcclxuICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgcHJldkVsOiBcIiN0ZWFtYXRlcy1zbGlkZXItcHJldlwiLFxyXG4gICAgICBuZXh0RWw6IFwiI3RlYW1hdGVzLXNsaWRlci1uZXh0XCIsXHJcbiAgICB9LFxyXG4gICAgLy8gcGFnaW5hdGlvbjoge1xyXG4gICAgLy8gXHRjbGlja2FibGU6IHRydWUsXHJcbiAgICAvLyBcdGVsOiBcIiN0ZWFtYXRlcy1zbGlkZXItcGFnaW5hdGlvblwiXHJcbiAgICAvLyB9LFxyXG4gICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgMTAyNDoge1xyXG4gICAgICAgIGNvdmVyZmxvd0VmZmVjdDoge1xyXG4gICAgICAgICAgcm90YXRlOiA0MCxcclxuICAgICAgICAgIHN0cmV0Y2g6IDUwMCxcclxuICAgICAgICAgIGRlcHRoOiA0MDAsXHJcbiAgICAgICAgICBtb2RpZmllcjogMC42NSxcclxuICAgICAgICAgIHNsaWRlU2hhZG93czogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBvbjoge1xyXG4gICAgICBzbGlkZUNoYW5nZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlcyA9IHRoaXMuc2xpZGVzO1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVNsaWRlID0gdGhpcy5hY3RpdmVJbmRleDtcclxuICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGluZGV4IC0gYWN0aXZlU2xpZGU7XHJcbiAgICAgICAgICBzbGlkZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNsaWRlLXBvc2l0aW9uXCIsIHBvc2l0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBbYWN0aXZlU2xpZGVFbGVtXSA9IGZpbmRBY3RpdmVTbGlkZShzbGlkZXMpO1xyXG4gICAgICAgIHByb2Nlc3NTbGlkZUNoYW5nZShhY3RpdmVTbGlkZUVsZW0pO1xyXG4gICAgICB9LFxyXG4gICAgICBhZnRlckluaXQ6IChzd2lwZXIpID0+IHtcclxuICAgICAgICBpbml0U2VsZWN0QnlDbGljayhzd2lwZXIpO1xyXG4gICAgICAgIGNvbnN0IHNsaWRlcyA9IGdldFNsaWRlcyhzd2lwZXIpO1xyXG4gICAgICAgIHNldFNsaWRlc0lkeChzbGlkZXMpO1xyXG4gICAgICAgIHNldFRvdGFsKHNsaWRlcyk7XHJcbiAgICAgICAgY29uc3QgW2FjdGl2ZVNsaWRlRWxlbV0gPSBmaW5kQWN0aXZlU2xpZGUoc2xpZGVzKTtcclxuICAgICAgICBwcm9jZXNzU2xpZGVDaGFuZ2UoYWN0aXZlU2xpZGVFbGVtKTtcclxuICAgICAgfSxcclxuICAgICAgb2JzZXJ2ZXJVcGRhdGU6IChzd2lwZXIpID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXMgPSBnZXRTbGlkZXMoc3dpcGVyKTtcclxuICAgICAgICBzZXRTbGlkZXNJZHgoc2xpZGVzKTtcclxuICAgICAgICBzZXRUb3RhbChzbGlkZXMpOyAvLyDQnNC+0LbQvdC+INCx0YvQu9C+INCx0Ysg0LfQsNC80L7RgNC+0YfQuNGC0YzRgdGPLCDQuCDQv9C10YDQtdGA0LjRgdC+0LLRi9Cy0LDRgtGMINGN0YLQviDQt9C90LDRh9C10L3QuNC1INC/0L4g0YDQtdC90LTQtdGA0YMsINCwINC90LUg0L/QviDQutCw0LbQtNC+0Lkg0L/QtdGA0LXRgdGC0YDQvtC50LrQtSBET00sINGH0YLQviDQt9C90LDRh9C40YIsINC/0L4g0LrQsNC20LTQvtC5INGB0LzQtdC90LUg0YHQu9Cw0LnQtNCwXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBbYWN0aXZlU2xpZGVFbGVtXSA9IGZpbmRBY3RpdmVTbGlkZShzbGlkZXMpO1xyXG4gICAgICAgICAgcHJvY2Vzc1NsaWRlQ2hhbmdlKGFjdGl2ZVNsaWRlRWxlbSk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgfSxcclxuICAgICAgc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQ6IChzd2lwZXIpID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHNsaWRlcyA9IGdldFNsaWRlcyhzd2lwZXIpO1xyXG4gICAgICAgICAgY29uc3QgW2FjdGl2ZVNsaWRlRWxlbSwgYWN0aXZlU2xpZGVJZHhdID0gZmluZEFjdGl2ZVNsaWRlKHNsaWRlcyk7XHJcbiAgICAgICAgICBzZXRTbGlkZXNPcmRlcihzbGlkZXMsIGFjdGl2ZVNsaWRlRWxlbSwgYWN0aXZlU2xpZGVJZHgpO1xyXG4gICAgICAgICAgcHJvY2Vzc1NsaWRlQ2hhbmdlKGFjdGl2ZVNsaWRlRWxlbSk7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIGV2ZW50cy5vbihcInNsaWRlVG9GaXJzdEVtcGxveWVlXCIsICgpID0+IHtcclxuICAgIHNsaWRlci5zbGlkZVRvKDAsIDMwMCk7XHJcbiAgICBzZXRTZWxlY3RlZEVtcGxveWVlKDApO1xyXG4gIH0pO1xyXG4gIGZ1bmN0aW9uIHByb2Nlc3NTbGlkZUNoYW5nZShhY3RpdmVTbGlkZUVsZW0pIHtcclxuICAgIGlmIChhY3RpdmVTbGlkZUVsZW0pIHtcclxuICAgICAgY29uc3QgY2FyZElkeCA9IE51bWJlcihhY3RpdmVTbGlkZUVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1jYXJkLWlkeFwiKSk7XHJcbiAgICAgIHVwZGF0ZUFjdGl2ZVNsaWRlTnVtYmVyKGNhcmRJZHggKyAxKTtcclxuICAgICAgc2V0U2VsZWN0ZWRFbXBsb3llZShjYXJkSWR4KTtcclxuICAgICAgdXBkYXRlUHJvZmlsZVNlY3Rpb25Gcm9tU2xpZGUoYWN0aXZlU2xpZGVFbGVtKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gdXBkYXRlUHJvZmlsZVNlY3Rpb25Gcm9tU2xpZGUoYWN0aXZlU2xpZGVFbGVtKSB7XHJcbiAgICBjb25zdCBuYW1lID0gYWN0aXZlU2xpZGVFbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtbmFtZVwiKTtcclxuICAgIHVwZGF0ZVByb2ZpbGVTZWN0aW9uKG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2V0U2VsZWN0ZWRFbXBsb3llZShpZHgpIHtcclxuICAgIHN0b3JlLnVwZGF0ZSgoc3RhdGUpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBzZWxlY3RlZEVtcGxveWVlSWR4OiBpZHgsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZnVuY3Rpb24gaW5pdFNlbGVjdEJ5Q2xpY2soc3dpcGVyKSB7XHJcbiAgICBzd2lwZXIud3JhcHBlckVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoeyB0YXJnZXQgfSkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0ZWFtYXRlLWNhcmRfX2J0blwiKSAmJlxyXG4gICAgICAgICF0YXJnZXQuY2xvc2VzdChcIi50ZWFtYXRlLWNhcmRfX2J0blwiKVxyXG4gICAgICApXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBjb25zdCBzbGlkZVJvb3RFbGVtID0gdGFyZ2V0LmNsb3Nlc3QoXCIuc3dpcGVyLXNsaWRlXCIpO1xyXG4gICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVJvb3RFbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtc2xpZGUtaWR4XCIpLCAzMDApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNldFRvdGFsKHNsaWRlcykge1xyXG4gICAgdG90YWxTbGlkZXNOdW1iZXJFbGVtLnRleHRDb250ZW50ID0gc2xpZGVzLmxlbmd0aDtcclxuICB9XHJcbiAgZnVuY3Rpb24gdXBkYXRlQWN0aXZlU2xpZGVOdW1iZXIobnVtYmVyKSB7XHJcbiAgICBjdXJyZW50U2xpZGVOdW1iZXJFbGVtLnRleHRDb250ZW50ID0gbnVtYmVyO1xyXG4gIH1cclxuICBmdW5jdGlvbiBnZXRTbGlkZXMoc3dpcGVyKSB7XHJcbiAgICByZXR1cm4gWy4uLnN3aXBlci53cmFwcGVyRWwucXVlcnlTZWxlY3RvckFsbChcIi5zd2lwZXItc2xpZGVcIildO1xyXG4gIH1cclxuICBmdW5jdGlvbiBmaW5kQWN0aXZlU2xpZGUoc2xpZGVzKSB7XHJcbiAgICBjb25zdCBhY3RpdmVTbGlkZUlkeCA9IHNsaWRlcy5maW5kSW5kZXgoKGVsZW0pID0+XHJcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3dpcGVyLXNsaWRlLWFjdGl2ZVwiKVxyXG4gICAgKTtcclxuICAgIHJldHVybiBbc2xpZGVzW2FjdGl2ZVNsaWRlSWR4XSwgYWN0aXZlU2xpZGVJZHhdO1xyXG4gIH1cclxuICAvLyDQndGD0LbQvdC+INCy0YvQt9GL0LLQsNGC0Ywg0LrQsNC20LTRi9C5INGA0LDQtyDQv9GA0Lgg0L7QsdC90L7QstC70LXQvdC40LggRE9NXHJcbiAgZnVuY3Rpb24gc2V0U2xpZGVzSWR4KHNsaWRlcykge1xyXG4gICAgaWYgKHNsaWRlcy5sZW5ndGggPCAxKSByZXR1cm47XHJcbiAgICBzbGlkZXMuZm9yRWFjaCgoZWxlbSwgaWR4KSA9PiBlbGVtLnNldEF0dHJpYnV0ZShcImRhdGEtc2xpZGUtaWR4XCIsIGlkeCkpO1xyXG4gIH1cclxuICAvLyDQndGD0LbQvdC+INCy0YvQt9GL0LLQsNGC0Ywg0LrQsNC20LTRi9C5INGA0LDQtyDQv9GA0Lgg0L7QsdC90L7QstC70LXQvdC40LggRE9NINC40LvQuCDQuNC30LzQtdC90LXQvdC40Lgg0LDQutGC0LjQstC90L7Qs9C+INGB0LvQsNC50LTQsFxyXG4gIGZ1bmN0aW9uIHNldFNsaWRlc09yZGVyKHNsaWRlcywgYWN0aXZlU2xpZGVFbGVtLCBhY3RpdmVTbGlkZUlkeCkge1xyXG4gICAgaWYgKHNsaWRlcy5sZW5ndGggPCAxIHx8ICFhY3RpdmVTbGlkZUVsZW0pIHJldHVybjtcclxuICAgIGFjdGl2ZVNsaWRlRWxlbS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNsaWRlLXBvc2l0aW9uXCIsIDApO1xyXG4gICAgY29uc3QgcmVjYWxjRGVwdGggPSBNYXRoLm1pbig1LCBNYXRoLmNlaWwoKHNsaWRlcy5sZW5ndGggLSAxKSAvIDIpKTtcclxuICAgIGNvbnN0IGxlZnRFZGdlSWR4ID0gTWF0aC5tYXgoMCwgYWN0aXZlU2xpZGVJZHggLSByZWNhbGNEZXB0aCk7XHJcbiAgICBjb25zdCByaWdodEVkZ2VJZHggPSBNYXRoLm1pbihcclxuICAgICAgc2xpZGVzLmxlbmd0aCxcclxuICAgICAgYWN0aXZlU2xpZGVJZHggKyByZWNhbGNEZXB0aCArIDFcclxuICAgICk7XHJcbiAgICBzbGlkZXNcclxuICAgICAgLnNsaWNlKGxlZnRFZGdlSWR4LCBhY3RpdmVTbGlkZUlkeClcclxuICAgICAgLnJldmVyc2UoKVxyXG4gICAgICAuZm9yRWFjaCgoZWxlbSwgaWR4KSA9PiB7XHJcbiAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNsaWRlLXBvc2l0aW9uXCIsIC0xIC0gaWR4KTtcclxuICAgICAgfSk7XHJcbiAgICBzbGlkZXMuc2xpY2UoYWN0aXZlU2xpZGVJZHggKyAxLCByaWdodEVkZ2VJZHgpLmZvckVhY2goKGVsZW0sIGlkeCkgPT4ge1xyXG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShcImRhdGEtc2xpZGUtcG9zaXRpb25cIiwgMSArIGlkeCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjY5YzgxN2ZiNmJiNDc1ODk4NGIwXCI7IH0iXSwibmFtZXMiOlsibG9nIiwiZXJyb3IiLCJkZWJ1ZyIsImluaXRUZWFtU2VsZWN0U2xpZGVyIiwidGVhbWF0ZXNTbGlkZXJzIiwiU3dpcGVyIiwib2JzZXJ2ZXIiLCJyZXNpemVPYnNlcnZlciIsInNsaWRlc1BlclZpZXciLCJncmFiQ3Vyc29yIiwiY2VudGVyZWRTbGlkZXMiLCJicmVha3BvaW50cyIsImluaXRUZWFtYXRlc1NsaWRlcnMiLCJzdG9yZSIsImV2ZW50cyIsImN1cnJlbnRTbGlkZU51bWJlckVsZW0iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0b3RhbFNsaWRlc051bWJlckVsZW0iLCJzbGlkZXIiLCJsb29wIiwiZWZmZWN0IiwiY292ZXJmbG93RWZmZWN0Iiwicm90YXRlIiwic3RyZXRjaCIsImRlcHRoIiwibW9kaWZpZXIiLCJzbGlkZVNoYWRvd3MiLCJhdXRvcGxheSIsImRlbGF5IiwibmF2aWdhdGlvbiIsInByZXZFbCIsIm5leHRFbCIsIm9uIiwic2xpZGVDaGFuZ2UiLCJzbGlkZXMiLCJhY3RpdmVTbGlkZSIsImFjdGl2ZUluZGV4IiwiZm9yRWFjaCIsInNsaWRlIiwiaW5kZXgiLCJwb3NpdGlvbiIsInNldEF0dHJpYnV0ZSIsImFjdGl2ZVNsaWRlRWxlbSIsImZpbmRBY3RpdmVTbGlkZSIsInByb2Nlc3NTbGlkZUNoYW5nZSIsImFmdGVySW5pdCIsInN3aXBlciIsImluaXRTZWxlY3RCeUNsaWNrIiwiZ2V0U2xpZGVzIiwic2V0U2xpZGVzSWR4Iiwic2V0VG90YWwiLCJvYnNlcnZlclVwZGF0ZSIsInNldFRpbWVvdXQiLCJzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCIsImFjdGl2ZVNsaWRlSWR4Iiwic2V0U2xpZGVzT3JkZXIiLCJzbGlkZVRvIiwic2V0U2VsZWN0ZWRFbXBsb3llZSIsImNhcmRJZHgiLCJOdW1iZXIiLCJnZXRBdHRyaWJ1dGUiLCJ1cGRhdGVBY3RpdmVTbGlkZU51bWJlciIsInVwZGF0ZVByb2ZpbGVTZWN0aW9uRnJvbVNsaWRlIiwibmFtZSIsInVwZGF0ZVByb2ZpbGVTZWN0aW9uIiwiaWR4IiwidXBkYXRlIiwic3RhdGUiLCJzZWxlY3RlZEVtcGxveWVlSWR4Iiwid3JhcHBlckVsIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9yZWYiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImNsb3Nlc3QiLCJzbGlkZVJvb3RFbGVtIiwidGV4dENvbnRlbnQiLCJsZW5ndGgiLCJudW1iZXIiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZmluZEluZGV4IiwiZWxlbSIsInJlY2FsY0RlcHRoIiwiTWF0aCIsIm1pbiIsImNlaWwiLCJsZWZ0RWRnZUlkeCIsIm1heCIsInJpZ2h0RWRnZUlkeCIsInNsaWNlIiwicmV2ZXJzZSJdLCJzb3VyY2VSb290IjoiIn0=