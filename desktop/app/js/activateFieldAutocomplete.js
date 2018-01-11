import hideOnClickOutside from './hideOnClickOutside';

export default () => {
  const fieldAutocompleteArr = document.querySelectorAll('[data-autocomplete]');

  for (let fieldAutocomplete of fieldAutocompleteArr) {
    const fieldAutocompleteInput = fieldAutocomplete.querySelector('[data-autocomplete-input]');

    fieldAutocompleteInput.addEventListener('click', () => {
      fieldAutocomplete.classList.add('opened');
      hideOnClickOutside('[data-autocomplete]', () => {
        fieldAutocomplete.classList.remove('opened');
      });
    });
  }
};
