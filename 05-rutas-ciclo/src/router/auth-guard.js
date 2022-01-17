const isAuthGuard = async (to, from, next) => {
  // console.log({ to, from, next });

  return new Promise(() => {
    const random = Math.random() * 100

    if (random > 50) {
      console.log(random);
      next()
    } else {
      console.log('bloqueado', random);
      next({ name: 'pokemon-home' })
    }
  })
}

export default isAuthGuard