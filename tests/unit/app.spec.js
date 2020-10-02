import { createLocalVue, shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

let wrapper;

const localVue = createLocalVue();

const wrapperFactory = (localVue) => {
  return shallowMount(App, {
    localVue,
    propsData: {},
    mocks: {},
    stubs: ["router-link", "router-view"],
  });
};

beforeEach(() => {
  wrapper = wrapperFactory(localVue);
});

afterEach(() => {
  wrapper.destroy();
});

describe("App.vue", () => {
  it("is a Vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  it("is renders TheHeader", () => {
    expect(wrapper.findComponent({ name: "TheHeader" }).exists()).toBe(true);
  });
});
