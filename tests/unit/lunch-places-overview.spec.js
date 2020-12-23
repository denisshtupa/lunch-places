import { shallowMount } from "@vue/test-utils";

import LunchPlace from "../../src/views/LunchPlacesOverview.vue";

describe("LunchPlace", () => {

  const wrapper = shallowMount(LunchPlace);

  test('is instantiated', () => {
    expect(wrapper).toBeTruthy()
  })

  it('data type', () => {
    expect(typeof LunchPlace.data).toBe('function');
  })

  it('methods type', () => {
    expect(typeof LunchPlace.methods).toBe('object');
  })

  it('created type', () => {
    expect(typeof LunchPlace.created).toBe('function');
  })

  it('renders the correct html markup', () => {
    expect(wrapper.html()).toContain('Average vote')
  })

  it('has at least a button', () => {
    expect(wrapper.find('button'))
  })

  it('is target blank', () => {
    expect(wrapper.attributes()._target) == '_blank';
  })

  it('is delete title', () => {
    expect(wrapper.attributes().title) == "Delete";
  })

  it('is delete title', () => {
    expect(wrapper.attributes().title) == "Delete";
  })

  test("is any img element", () => {
    const img = wrapper.findAll('img');
    expect(img.length).toBe(0);
  });

  test("are four svg icons", () => {
    const img = wrapper.findAll('svg');
    expect(img.length).toBe(4);
  });
});
