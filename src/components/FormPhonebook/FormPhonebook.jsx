import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './FormPhonebook.module.css';

const FormPhonebook = ({ onFormSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const saveData = e => {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        return;
    }
  };
  const addContact = e => {
    e.preventDefault();
    onFormSubmit(name, number);
    setName('');
    setNumber('');
  };
  return (
    <form onSubmit={addContact} className={css.form}>
      <label className={css.inputPhonebook}>
        Name:
        <input
          onChange={saveData}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.inputPhonebook}>
        Number:
        <input
          onChange={saveData}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.btnAddContact} type="submit">
        Add contact
      </button>
    </form>
  );
};

FormPhonebook.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onSubmitForm: PropTypes.func,
};
export default FormPhonebook;
