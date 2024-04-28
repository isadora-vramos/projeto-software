import { useState } from 'react'

const Filter = (props) => {
  const {newSearch, handleSearchChange} = props;
  return (
    <>
      <input value={newSearch} 
        onChange={handleSearchChange} 
        placeholder='Pesquise na lista'></input>
    </>
  );
}

const Person = (props) => {
  const {person} = props;
  return (
    <>
      <p key={person.name}>{person.name} - {person.phone}</p>
    </>
  );
}

const PersonForm = (props) => {
  const {addName, newName, newPhone, handleNameChange, handlePhoneChange} = props;
  return (
    <form onSubmit={addName}>
        <div>
          Nome: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Número: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">Adicionar</button>
        </div>
      </form>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Pessoa exemplo', phone:'(51) 9999-9999', id: 1}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName, 
      phone: newPhone,
      id: persons.length + 1
    };
    const filteredPersonList = persons.filter(person => person.name === newName);
    if(filteredPersonList.length === 0){
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhone('')
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const filteredPhone = 
    newSearch.length >= 1? 
    persons.filter(x => x.name.toLowerCase().includes(newSearch.toLowerCase())) :
    persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} value={newSearch}></Filter>
      <PersonForm addName={addName} 
        newName={newName} 
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}></PersonForm>
      <h2>Numbers</h2>
      <div>
        {filteredPhone.map(person => 
          <Person person={person}></Person>
        )}
      </div>
    </div>
  )
}

export default App
