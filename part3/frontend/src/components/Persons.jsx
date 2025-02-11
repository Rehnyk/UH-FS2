const Persons = ({persons, onClick}) => {

    console.log(persons)
    return (
        <div>

            { persons.map(p =>
            <p key={p.id}>{p.name} {p.number} <button onClick={() => onClick(p.id)}>Delete</button>
            </p>)}
        </div>
    )
}


export default Persons