import Notiflix from 'notiflix'

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmitPromise);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const data = { position, delay }
 
  return new Promise ((res, rej) => {
  setTimeout(() => {
    if (shouldResolve) {
      res({ position, delay });
    } else {
      rej({ position, delay });
    }
  }, delay);
})
}

function onSubmitPromise(e)  {
  e.preventDefault()

  const formElements = e.currentTarget.elements;
  const step = parseInt(formElements.step.value);
  const amount = parseInt(formElements.amount.value);
  let delay = parseInt(formElements.delay.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      })

    delay += step
  }
}


