import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export const ContactForm = ({ getContactName, onSubmitForm }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const normalizedName = name.toLowerCase();
    const findedName = getContactName(normalizedName);
    findedName
      ? alert(`${name} is already in contacts.`)
      : onSubmitForm(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        return;
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
      </label>
      <button className={css.submit_btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  getContactName: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};
