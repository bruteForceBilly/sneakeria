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

/*

Integration tests

Clicking links from Nav bar

should populate breadcrumbs
should populate pills
should toggle checkboxes


!essentials then new



Toggle unchecked checkbox

should populate value in route
should populate value in breadcrumbs
should populate value in pills


Toggle checked checkbox

should remove value from route
should remove value from breadcrumbs
should remove value from pills


Clicking link from Sidebar menu

should replace route with values
should replace breadcrumbs with values
should replace pills with values
should replace toggle checkboxes with values


Clicking value in breadcrumbs

should remove all values descendants from value clicked in breadcrumbs

should remove all descendants values from route 

should remove all descendants values from pills

should untoggle all descendants in selection bar

Clicking pill

should remove value in route
should remove value from pills
should remove value from bredcrumbs
should untoggle checkbox 
*/
