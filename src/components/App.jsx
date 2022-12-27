import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import FormPhonebook from './FormPhonebook/FormPhonebook';
import Filter from './Contacts/Filter';
import Contacts from './Contacts/Contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  const filterArr = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onFormSubmit = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      name: `${name}`,
      number: `${number}`,
      id: nanoid(),
    };
    setContacts(prev => [...prev, contact]);
  };
  const filterContacts = e => {
    setFilter(e.target.value);
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  return (
    <div>
      <h1 style={{ marginLeft: '50px' }}>Phonebook</h1>
      <FormPhonebook onFormSubmit={onFormSubmit} />
      <h2 style={{ marginLeft: '50px' }}>Contacts</h2>
      <Filter query={filter} filterContact={filterContacts} />
      {contacts.length === 0 ? (
        <p style={{ marginLeft: '30px' }}>There are no contact</p>
      ) : (
        <Contacts
          contacts={filter !== '' ? filterArr : contacts}
          onDeleteContact={deleteContact}
        />
      )}
    </div>
  );
};
