import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification';
import Error from './components/Error';
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [showFiltered, setShowFiltered] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [notificationMessage, setNotification] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])


    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some(p => p.name === newName)) {
            if (window.confirm(`${newName} already exists. Do you want to change the number?`)) {
                personService
                    .update(persons.find(p => p.name === newName).id, {name: newName, number: newNumber})
                    .then(updatedPerson => {
                        setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))

                        setNotification(
                            `Number for ${newName} was changed.`
                        )
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    })


            }
            setNewName('')
            setNewNumber('')

            return
        }

        const nameObj = {
            name: newName,
            number: newNumber
        }

        personService
            .create(nameObj)
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewNumber('')

                setNotification(
                    `${newName} was added to the phonebook`
                )
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
            .catch(error => {
                setErrorMessage(
                    `Error: Something happened, and ${newName} was not added to the phonebook`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const deletePerson = (id) => {
        const nameToDelete = persons.find(p => p.id === id).name

        if (window.confirm(`Delete ${nameToDelete}?`)) {
          personService
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))

                    setNotification(
                        `${nameToDelete} was deleted.`
                    )
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)

                })
              .catch(error => {
                setErrorMessage(
                    `${nameToDelete} was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                  setPersons(persons.filter(p => p.id !== id))
            })
        }
    }


    const handleFilterChange = (event) => {
        setFilter(event.target.value)

       const filterObj = persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setShowFiltered(filterObj)
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }


    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={notificationMessage} />
            <Error message={errorMessage} />

            <Filter
                onChange={handleFilterChange}
                filter={filter}
                results={showFiltered}
            />

            <h3>Add new</h3>
            <PersonForm
                onClick={addPerson}
                name={newName}
                number={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <Persons persons={persons} onClick={(id) => deletePerson(id)} />
        </div>
    )
}

export default App