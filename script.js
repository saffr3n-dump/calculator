(() => {
  const MAX_DIGITS = 16;

  let inp = '0';
  let mem = '';
  let op = '';
  let justCalculated = false;

  const display = document.querySelector('.display');
  const controls = document.querySelector('.controls');

  controls.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const sign = e.target.textContent;

    if (/[0-9]/.test(sign)) {
      if (justCalculated) {
        inp = '0';
        mem = '';
        justCalculated = false;
      }
      if (inp === '0') inp = sign;
      else if (inp.length < MAX_DIGITS) inp += sign;
      updateDisplay(inp);
      return;
    }

    if ('+-*/'.includes(sign)) {
      if (inp && op) {
        mem = operate(mem, inp, op);
        updateDisplay(mem);
      } else if (!mem) {
        mem = inp;
      }
      inp = '';
      op = sign;
      justCalculated = false;
      return;
    }

    if (sign === '=') {
      if (!op) return;
      mem = operate(mem, inp, op);
      updateDisplay(mem);
      inp = '';
      op = '';
      justCalculated = true;
      return;
    }

    inp = '0';
    mem = '';
    op = '';
    justCalculated = false;
    updateDisplay(inp);
  });

  function updateDisplay(content) {
    display.textContent = content;
  }

  function operate(a, b, op) {
    a = Number(a);
    b = Number(b);
    let res;
    switch (op) {
      case '+': res = add(a, b); break;
      case '-': res = sub(a, b); break;
      case '*': res = mul(a, b); break;
      case '/': res = div(a, b); break;
    }
    const wholeDigits = String(Math.floor(res)).length;
    const exp = MAX_DIGITS - wholeDigits - 1; // -1 to account for dot
    res = Math.round(res * (10 ** exp)) / (10 ** exp);
    return String(res);
  }

  function add(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }

  function mul(a, b) {
    return a * b;
  }

  function div(a, b) {
    return a / b;
  }
})();
