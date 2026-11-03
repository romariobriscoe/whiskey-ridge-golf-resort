/* ------------------------------------------------------------------
   "First on the sheet" email capture.

   Posts to Klaviyo's client endpoint, which is built for browsers and takes
   only the public company ID (see `klaviyo` in src/data/site.ts). While that is
   switched off the form validates and shows an honest demo state, so nothing
   pretends to subscribe.
   ------------------------------------------------------------------ */
import { klaviyo } from '../data/site';

const connected: boolean = klaviyo.enabled && Boolean(klaviyo.companyId && klaviyo.listId);

const subscribe = async (email: string, zip: string, source: string) => {
  const res = await fetch(`https://a.klaviyo.com/client/subscriptions?company_id=${encodeURIComponent(klaviyo.companyId)}`, {
    method: 'POST',
    headers: { revision: '2026-10-15', 'Content-Type': 'application/vnd.api+json' },
    body: JSON.stringify({
      data: {
        type: 'subscription',
        attributes: {
          custom_source: `Whiskey Ridge site: ${source}`,
          profile: {
            data: {
              type: 'profile',
              attributes: {
                email,
                ...(zip ? { location: { zip } } : {}),
                subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } },
              },
            },
          },
        },
        relationships: { list: { data: { type: 'list', id: klaviyo.listId } } },
      },
    }),
  });
  if (!res.ok) throw new Error(`Klaviyo responded ${res.status}`);
};

const messageFor = (input: HTMLInputElement) => {
  if (input.type === 'email') {
    return input.validity.valueMissing
      ? 'Enter your email so we can reach you.'
      : 'That email looks off. Check it and try again.';
  }
  return 'A ZIP is five digits. You can also leave it blank.';
};

const clearError = (input: HTMLInputElement) => {
  input.closest('.field')?.classList.remove('is-error');
  input.removeAttribute('aria-invalid');
  input.removeAttribute('aria-describedby');
  document.getElementById(`${input.id}-error`)?.remove();
};

const showError = (input: HTMLInputElement, message = messageFor(input)) => {
  clearError(input);
  const note = document.createElement('p');
  note.className = 'field__error';
  note.id = `${input.id}-error`;
  note.textContent = message;
  input.after(note);
  input.closest('.field')?.classList.add('is-error');
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', note.id);
};

document.querySelectorAll<HTMLFormElement>('form[data-capture]').forEach((form) => {
  form.noValidate = true;
  const email = form.querySelector<HTMLInputElement>('input[type="email"]')!;
  const zip = form.querySelector<HTMLInputElement>('input[name="zip"]')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const fields = [email, zip];

  fields.forEach((input) => input.addEventListener('input', () => {
    if (input.validity.valid) clearError(input);
  }));

  const finish = () => {
    const done = document.createElement('div');
    done.className = 'form-done';
    done.tabIndex = -1;
    done.setAttribute('role', 'status');

    const title = document.createElement('p');
    title.className = 'subhead';
    title.textContent = connected ? 'You’re on the list.' : 'You’d be on the list.';

    const body = document.createElement('p');
    body.textContent = connected
      ? 'We’ll write when there’s something worth opening.'
      : 'Demo only. This form isn’t connected yet, so your email went nowhere.';

    done.append(title, body);
    form.hidden = true;
    form.after(done);
    done.focus();
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const invalid = fields.filter((input) => !input.validity.valid);
    fields.forEach((input) => (input.validity.valid ? clearError(input) : showError(input)));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    if (!connected) {
      if (import.meta.env.DEV) console.info('[capture] not connected, would subscribe', email.value, zip.value, form.dataset.source);
      finish();
      return;
    }

    submit.disabled = true;
    try {
      await subscribe(email.value.trim(), zip.value.trim(), form.dataset.source ?? 'site');
      finish();
    } catch {
      showError(email, 'That didn’t go through. Give it another try in a minute.');
      email.focus();
    } finally {
      submit.disabled = false;
    }
  });
});
