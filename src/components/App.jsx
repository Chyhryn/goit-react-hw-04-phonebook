import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getLocalStorageContacts = JSON.parse(
      localStorage.getItem('contacts')
    );

    if (getLocalStorageContacts) {
      setContacts([...getLocalStorageContacts]);
    }
  }, []);

  useEffect(() => {
    if (contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const submitFormHendler = (name, number) => {
    const newContact = { name, number, id: nanoid() };
    contacts
      ? setContacts([...contacts, newContact])
      : setContacts([newContact]);
  };

  const handleChange = e => {
    switch (e.target.name) {
      case 'contacts':
        setContacts(e.target.value);
        break;
      case 'filter':
        setFilter(e.target.value);
        break;
      default:
        return;
    }
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
      );
    });
    return filteredContacts;
  };

  const getContactName = name => {
    if (contacts) {
      const isContactName = contacts.find(
        contact => contact.name.toLowerCase() === name
      );
      return isContactName;
    }
  };

  const deleteContact = e => {
    const contactName = e.target.parentNode.id;
    const filteredContacts = contacts.filter(contact => {
      return contact.name !== contactName;
    });
    return setContacts([...filteredContacts]);
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm
        getContactName={getContactName}
        onSubmitForm={submitFormHendler}
      />
      <h2 className={css.title}>Contacts</h2>
      <Filter handleChange={handleChange} filter={filter} />
      {contacts && (
        <ContactList
          filteredContacts={getFilteredContacts()}
          deleteContact={deleteContact}
        />
      )}
    </div>
  );
};
