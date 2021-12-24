import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision.vue";

describe('Indecision Component', () => {
  let wrapper;
  let clgSpy;

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      "answer": "yes",
      "forced": false,
      "image": "https://yesno.wtf/assets/yes/2.gif"
    })
  }));

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    clgSpy = jest.spyOn(console, 'log');

    jest.clearAllMocks();
  });

  test('should match component with snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('escribir en el input no debe de disparar nada (console.log)', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

    const input = wrapper.find('input');
    await input.setValue('Hola mundo');

    expect(clgSpy).toHaveBeenCalled();
    expect(getAnswerSpy).not.toHaveBeenCalled();

    // console.log(wrapper.vm);
  });

  test('escribir el simbolo de "?" debe de disparar el getAnswer', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

    const input = wrapper.find('input');
    await input.setValue('?');

    expect(clgSpy).toHaveBeenCalledTimes(2);
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test('pruebas en getAnswer', async () => {
    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');

    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.image).toBe('https://yesno.wtf/assets/yes/2.gif');
    expect(wrapper.vm.answer).toBe('Si');
  });

  test('pruebas en getAnswer - fallo en el api', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');

    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe('No se pudo cargar la api');
  });
})