import { shallowMount, createLocalVue } from "@vue/test-utils";
import TheBreadCrumbsBar from "./BreadCrumbsBar.vue";

const localVue = createLocalVue();
localVue.use(TheBreadCrumbsBar);

const selects = [
  {
    id: 1,
    name: "section",
    label: "Section",
    options: [
      {
        id: 1,
        name: "section",
        label: "Men",
        value: "men",
        checked: false,
      },
      {
        id: 2,
        name: "section",
        label: "Women",
        value: "women",
        checked: false,
      },
    ],
  },
  {
    id: 2,
    name: "category",
    label: "Category",
    options: [
      {
        id: 1,
        name: "category",
        label: "Shoes",
        value: "shoes",
        checked: false,
      },
      {
        id: 2,
        name: "category",
        label: "Clothing",
        value: "clothing",
        checked: false,
      },
    ],
  },
];

describe("BreadCrumbsBar.vue", () => {
  it("has a property named selects that takes an array", () => {
    let component = shallowMount(TheBreadCrumbsBar, {
      propsData: {
        selects,
      },
      stubs: ["router-link", "router-view"],
    });
    expect(component.isVueInstance).toBeTruthy();
  });
});
