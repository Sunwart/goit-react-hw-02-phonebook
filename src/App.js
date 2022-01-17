import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactsList/ContactList';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  checkContact = name => {
    const { contacts } = this.state;
    const normilizedName = name.toLowerCase();
    return contacts.find(contact => normilizedName === contact.name.toLowerCase());
  };

  addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };
    if (this.checkContact(name)) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleNumbers = () => {
    const { contacts, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normilizedFilter));
  };

  render() {
    const { filter } = this.state;
    const visibleNumbers = this.getVisibleNumbers();
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm submit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList visibleNumbers={visibleNumbers} onDeleteContact={this.deleteContact} />
      </>
    );
  }
}

export default App;
