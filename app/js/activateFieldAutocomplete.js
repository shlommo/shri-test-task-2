import hideOnClickOutside from './hideOnClickOutside';
import {addListenerMulti} from './helpers';


export default () => {
  const fieldAutocompleteArr = document.querySelectorAll('[data-autocomplete]');

  for (let fieldAutocomplete of fieldAutocompleteArr) {
    const fieldAutocompleteInput = fieldAutocomplete.querySelector('[data-autocomplete-input]');

    const fieldAutocompleteInputHandler = () => {
      fieldAutocomplete.classList.add('opened');
      hideOnClickOutside('[data-autocomplete-input]', () => {
        fieldAutocomplete.classList.remove('opened');
      });
    };

    addListenerMulti(fieldAutocompleteInput, 'click touchstart', fieldAutocompleteInputHandler);
  }
};
