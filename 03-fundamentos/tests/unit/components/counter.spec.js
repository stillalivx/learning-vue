import { shallowMount } from "@vue/test-utils"
import Counter from "@/components/Counter.vue"

describe('Counter Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  // test('debe de hacer match con el snapshot', () => {
  //   const wrapper = shallowMount(Counter)

  //   expect(wrapper.html).toMatchSnapshot()
  // })

  test('h2 debe de tener el valor por defecto', () => {
    expect(wrapper.find('h2').exists()).toBeTruthy()

    const h2 = wrapper.find('h2')

    expect(h2.text()).toBe('Counter')
  })

  test('el valor por defecto debe de ser 100 en el p', async () => {
    // pTags
    const value = wrapper.find('[data-test-id="counter"]').text();
    // expect segundo p === 100
    expect(value).toBe('100');
  })

  test('debe de incrementar y decrementar el contador', async () => {
    const [increaseBtn, decreaseBtn] = wrapper.findAll('button');

    increaseBtn.trigger('click');
    increaseBtn.trigger('click');

    decreaseBtn.trigger('click');
    decreaseBtn.trigger('click');

    const value = wrapper.find('[data-test-id="counter"]').text();

    expect(value).toBe('100');
  });

  test('debe de establecer el valor por defecto', () => {
    const start = wrapper.props('start');
    const value = wrapper.find('[data-test-id="counter"]').text();

    expect(Number(value)).toBe(start);
  });

  test('debe de mostrar la prop title', () => {
    const title = 'Hola mundo!!';
    const wrapper = shallowMount(Counter, {
      props: {
        title
      }
    });

    expect(wrapper.find('h2').text()).toBe(title);
  });
})