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

export const resize = {
  mounted (el, bindling) {
    let resizeObj = new ResizeObserver((entries) => {
      console.log('entries:', entries);
      // console.log('bindling:', bindling);
      bindling.value && bindling.value();
    })
    resizeObj.observe(el);
  }
};