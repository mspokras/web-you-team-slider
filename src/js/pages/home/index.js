import moduleManager, { Module } from "../../shared/ModuleManager/index.js";
import initStore from "./store/index.js";
import { initTeamSelectSlider, initTeamatesSliders } from "./sliders.js";
import { initContactForm } from "../../shared/contactForm.js";
import {
  fetchDepartments,
  fetchDepartmentEmployees,
} from "../../shared/services/employees.js";
import { log, error, debug } from "../../../../repo/js/libs/logger.js";

initStore();

const entry = (context, module) => {
  const { pageStore, events } = context;

  pageStore.on("update", ({ state, prevState }) =>
    console.log(state, prevState)
  );

  if (document.readyState === "interactive") {
    onDomReady();
  } else {
    window.addEventListener("DOMContentLoaded", onDomReady);
  }
  function onDomReady(event) {
    try {
      initTeamSelectSlider(pageStore, events);
      initTeamatesSliders(pageStore, events);
      initNavToProfile(pageStore, events);
      initContactForm("main-contact-form", pageStore, events);
      initContactForm("cv-request-contact-form", pageStore, events);
      initEmloyeeView(pageStore, events);
      initDepartmentView(pageStore, events);
      initDepartmentsFilter(pageStore, events);
    } catch (ex) {
      error(ex);
    }
  }
};

const page = new Module({
  name: "page",
  entry: entry,
  required: ["events", "commonStore", "pageStore"],
});
moduleManager.add(page);

function initNavToProfile(store, events) {
  $("#teamates-list-wrapper").on("click", ({ target }) => {
    const $header = $("header");
    const $profile = $("#profile");
    if (
      !target.classList.contains("teamate-card__btn") &&
      !target.closest(".teamate-card__btn")
    )
      return;
    const profileBcr = $profile.get(0).getBoundingClientRect();
    const headerHeight = $header.outerHeight();
    window.scrollTo({
      top: window.scrollY + profileBcr.top - headerHeight,
      behavior: "smooth",
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

  $profileWrapper.on("click", ({ target }) => {
    if (
      target.classList.contains("profile__download-btn") ||
      target.closest(".profile__download-btn")
    ) {
      drawers.open("cv-request-form", target);
    }
  });

  store.on("update", ({ state, prevState }) => {
    if (
      state.selectedEmployeeIdx === prevState.selectedEmployeeIdx &&
      state.employees === prevState.employees
    )
      return;
    const { status, data } = state.employees;
    if (data.length === 0) return;
    const { selectedEmployeeIdx } = state;
    const selectedEmployeeData = data[selectedEmployeeIdx];
    renderProfile(status, {
      crb_cv_photo: selectedEmployeeData.crb_cv_photo,
      crb_person_name: selectedEmployeeData.crb_person_name,
      crb_person_title: selectedEmployeeData.crb_person_title,
      crb_exp: selectedEmployeeData.crb_exp,
      crb_areas_of_exp: selectedEmployeeData.crb_areas_of_exp,
    });
    renderSkillsRates(status, selectedEmployeeData.crb_skills_list);
    renderTagsCloud(status, selectedEmployeeData);
  });
  function renderProfile(status, data) {
    const template = $("#employee-profile-template").html();
    const renderedProfile = Mustache.render(template, data);
    const $profileContainer = $("#profile-main");
    $profileContainer.html(renderedProfile);
  }
  function renderSkillsRates(status, data) {
    const finalizedData = data.map(({ crb_name, crb_rate }) => {
      return { crb_name, crb_rate: new Array(crb_rate) };
    });
    $skillsRatesWrapper.html(
      Mustache.render(skillsRatesTemplate, finalizedData)
    );
  }
  function renderTagsCloud(status, { crb_main_message, crb_tags_cloud }) {
    const sectionCut = 360 / crb_tags_cloud.length;
    const generateDegreeOffset = () =>
      -sectionCut * 0.1 + sectionCut * 0.2 * Math.random();
    const finalizedData = {
      crb_main_message,
      crb_tags_cloud: crb_tags_cloud.map((tags, idx) => {
        const thisSectionCut = idx * sectionCut;
        return {
          ...tags,
          "placing-degree": `${thisSectionCut + generateDegreeOffset()}deg`,
          "distance-shift": `${-0.05 + 0.1 * Math.random()}`,
        };
      }),
    };
    console.log(finalizedData);
    $tagsCloudWrapper.html(Mustache.render(tagsCloudTemplate, finalizedData));
  }
}
function initDepartmentView(store, events) {
  const $wrapper = $("#teamates-list-wrapper");
  const template = $("#employee-card-template").html();
  Mustache.parse(template);

  store.on("update", ({ state, prevState }) => {
    if (state.employees === prevState.employees) return;
    const { status, data } = state.employees;
    render(status, data);
  });
  store.on("update", ({ state, prevState }) => {
    if (state.selectedDepartmentId === prevState.selectedDepartmentId) return;
    fetchDepartmentEmployees(state.selectedDepartmentId);
  });

  const { status, data } = store.state.employees;
  render(status, data);

  function render(status, data) {
    $wrapper.html(Mustache.render(template, data));
    events.emit("slideToFirstEmployee");
  }
}
async function initDepartmentsFilter(store, events) {
  let activeElem = null;
  const $wrapper = $("#department-select-wrapper");
  store.on("update", ({ state, prevState }) => {
    if (state.departments === prevState.departments) return;
    const { status, data } = state.departments;
    render(status, data);
    const firstElem = $wrapper.find("[data-id]").first().get(0);
    if (firstElem) setActive(firstElem);
  });
  fetchDepartments();
  $wrapper.on("click", ({ target }) => {
    if (!target.hasAttribute("data-id")) return;
    setActive(target);
  });

  function setActive(elem) {
    if (activeElem === elem) return;
    if (activeElem) {
      activeElem.classList.remove("active");
    }
    const departmentId = elem.getAttribute("data-id");
    store.update((state) => {
      return {
        ...state,
        selectedDepartmentId: departmentId,
      };
    });
    elem.classList.add("active");
    activeElem = elem;
  }
  function render(status, data) {
    $wrapper.html(preserve(status, data));
  }
  function preserve(status, data) {
    return data
      .map(
        (item) => `<div class="swiper-slide">
															<div class="text-link section-nav__btn" data-slug="${item.slug}" data-id="${item.id}">${item.html_representation}</div>
														</div>`
      )
      .join("");
  }
}
