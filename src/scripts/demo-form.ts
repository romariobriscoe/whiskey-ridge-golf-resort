/* ------------------------------------------------------------------
   Demo behavior for the inquiry forms: inline validation and a success
   state. Nothing is sent anywhere yet. At launch, post the FormData to the
   real endpoint where marked and keep the rest.

   Without JS the browser's own `required` validation still applies.
   ------------------------------------------------------------------ */
const messageFor = (input: HTMLInputElement): string => {
  if (input.validity.valueMissing) {
    return input.type === 'email'
      ? 'Enter your email so we can reply.'
      : 'Enter your name so we know who to write back to.';
  }
  return 'That email looks off. Check it and try again.';
};

const clearError = (input: HTMLInputElement) => {
  input.closest('.field')?.classList.remove('is-error');
  input.removeAttribute('aria-invalid');
  input.removeAttribute('aria-describedby');
  document.getElementById(`${input.id}-error`)?.remove();
};

const showError = (input: HTMLInputElement) => {
  clearError(input);
  const note = document.createElement('p');
  note.className = 'field__error';
  note.id = `${input.id}-error`;
  note.textContent = messageFor(input);
  input.after(note);
  input.closest('.field')?.classList.add('is-error');
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', note.id);
};

document.querySelectorAll<HTMLFormElement>('form[data-demo-form]').forEach((form) => {
  form.noValidate = true;
  const required = [...form.querySelectorAll<HTMLInputElement>('input[required]')];

  required.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.validity.valid) clearError(input);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const invalid = required.filter((input) => !input.validity.valid);
    required.forEach((input) => (input.validity.valid ? clearError(input) : showError(input)));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    // Launch: send new FormData(form) to the form endpoint here.
    const firstName = String(new FormData(form).get('name') ?? '').trim().split(/\s+/)[0];

    const done = document.createElement('div');
    done.className = 'form-done';
    done.tabIndex = -1;
    done.setAttribute('role', 'status');

    const title = document.createElement('h3');
    title.className = 'subhead';
    title.textContent = firstName ? `Got it, ${firstName}.` : 'Got it.';

    const body = document.createElement('p');
    body.textContent = form.dataset.doneBody ?? '';

    const note = document.createElement('p');
    note.className = 'meta';
    note.textContent = 'Demo only. This form does not send anything yet.';

    const again = document.createElement('button');
    again.type = 'button';
    again.className = 'btn btn--quiet';
    again.textContent = 'Start over';
    again.addEventListener('click', () => {
      done.remove();
      form.reset();
      form.hidden = false;
      required[0]?.focus();
    });

    done.append(title, body, note, again);
    form.hidden = true;
    form.after(done);
    done.focus();
  });
});
