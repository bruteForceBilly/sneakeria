import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import TheBreadCrumbsBar from "./BreadCrumbsBar.vue";

let wrapper;

const localVue = createLocalVue();

const selects = [
  {
    id: 1,
    name: "select-a",
    label: "Select A",
    options: [
      {
        id: 1,
        name: "select-a",
        label: "Option A",
        value: "option-a",
        checked: true,
      },
      {
        id: 2,
        name: "select-a",
        label: "Option B",
        value: "option-b",
        checked: false,
      },
    ],
  },
  {
    id: 2,
    name: "select-b",
    label: "Select B",
    options: [
      {
        id: 1,
        name: "select-b",
        label: "Option A",
        value: "option-a",
        checked: false,
      },
      {
        id: 2,
        name: "select-b",
        label: "Option B",
        value: "option-b",
        checked: true,
      },
    ],
  },
];

const checkedOptions = [
  {
    id: 1,
    name: "select-a",
    label: "Option A",
    value: "option-a",
    checked: true,
  },
  {
    id: 2,
    name: "select-b",
    label: "Option B",
    value: "option-b",
    checked: true,
  },
];

const wrapperFactory = (localVue) => {
  return shallowMount(TheBreadCrumbsBar, {
    localVue,
    propsData: {
      selects,
    },
    stubs: {
      RouterLink: RouterLinkStub,
    },
  });
};

beforeEach(() => {
  wrapper = wrapperFactory(localVue);
});

afterEach(() => {
  wrapper.destroy();
});

describe("TheBreadCrumbsBar", () => {
  it("renders a back button", async () => {
    expect(wrapper.text()).toContain("Back");
  });
  it("renders a home button", async () => {
    expect(wrapper.text()).toContain("Home");
  });
  it("every selected option is selected", async () => {
    expect(wrapper.vm.selectedOptionsElements).toEqual(checkedOptions);
  });
  it("renders as many links as selected options", async () => {
    expect(wrapper.vm.selectedOptionsElements.length).toBe(2);
  });
});
