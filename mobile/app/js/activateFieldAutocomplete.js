export default () => {
  const fieldAutocompleteArr = document.querySelectorAll('[data-autocomplete]');

  if (fieldAutocompleteArr === null) {
    return;
  }

  for (let fieldAutocomplete of fieldAutocompleteArr) {
    const fieldAutocompleteInput = fieldAutocomplete.querySelector('[data-autocomplete-input]');

    fieldAutocompleteInput.addEventListener('click', () => {
      fieldAutocomplete.classList.add('opened');
    });
  }
};
