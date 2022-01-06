import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from "@/pages/PokemonPage";

import { pokemons } from "../mocks/pokemons.mock"

describe('PokemonPage Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage)
  })

  // No ayuda mucho
  test('debe de hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  });

  test('debe de llamar el mixPokemonArr al montar', () => {
    const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
    const wrapper = shallowMount(PokemonPage)

    expect(mixPokemonArraySpy).toHaveBeenCalled()
  });

  test('debe de hacer match con el snapshot cuando cargan los pokemon', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    const pokemonPicture = wrapper.find('pokemon-picture-stub')
    const pokemonOptions = wrapper.find('pokemon-options-stub')

    expect(pokemonPicture.exists()).toBeTruthy()
    expect(pokemonOptions.exists()).toBeTruthy()

    expect(pokemonPicture.attributes('pokemonid')).toBe('1')
    expect(pokemonOptions.attributes('pokemons')).toBeTruthy()
  })

  test('prueba con checkAnswer', async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        }
      }
    })

    await wrapper.vm.checkAnswer(1)

    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.vm.showPokemon).toBeTruthy()
    expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`)

    await wrapper.vm.checkAnswer(99)

    expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`)
  });  
})