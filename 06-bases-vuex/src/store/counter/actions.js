import getRandomInt from "../../helpers/getRandomInt";

export const incrementRandomInt = async ({ commit }) => {
  commit('setLoading', true)

  const randomInt = await getRandomInt()

  commit('setLoading', false)
  commit('incrementBy', randomInt)
}