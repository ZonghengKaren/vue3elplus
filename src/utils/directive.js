export const test = {
  mounted (el, bindling, Vnode) {
    console.log(Vnode);
    el.addEventListener('click', () => {
      console.log('el:', el);
      console.log('bindling:', bindling);
      console.log('Vnode:', Vnode);
    }, false)
  }
};