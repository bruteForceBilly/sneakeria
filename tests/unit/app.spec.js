import Vuex from "vuex";
import store from "@/store";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Component from "@/App.vue";

let wrapper;

const localVue = createLocalVue();
localVue.use(Vuex, store);

const wrapperFactory = (localVue, store) => {
  return shallowMount(Component, {
    localVue,
    store,
    propsData: {},
    mocks: {},
    stubs: ["router-link", "router-view"],
    methods: {},
  });
};

beforeEach(() => {
  wrapper = wrapperFactory(localVue, store);
});

afterEach(() => {
  wrapper.destroy();
});

describe("Component", () => {
  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
});
