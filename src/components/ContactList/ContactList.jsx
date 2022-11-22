import css from './ContactList.module.css';
import PropTypes from 'prop-types';
export const ContactList = ({ filteredContacts, deleteContact }) => {
  return (
    <ul className={css.contacts_list}>
      {filteredContacts.map(contact => (
        <li className={css.contact_item} key={contact.id} id={contact.name}>
          <span>
            {contact.name}: {contact.number}
          </span>
          <button
            className={css.delete_btn}
            onClick={deleteContact}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
