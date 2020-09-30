import { shallowMount, createLocalVue } from "@vue/test-utils";
import TheBreadCrumbsBar from "./BreadCrumbsBar.vue";

const localVue = createLocalVue();
localVue.use(TheBreadCrumbsBar);

let componentInstance;
const createComponentInstance = (propsData) =>
  shallowMount(TheBreadCrumbsBar, {
    propsData,
    stubs: ["router-link", "router-view"],
  });

describe("BreadCrumbsBar.vue", () => {
  it("has a selects property", () => {
    componentInstance = createComponentInstance({ selects: [] });
    expect(componentInstance.props().selects).toBe();
  });
});
