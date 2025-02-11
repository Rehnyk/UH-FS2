const Filter = ({ onChange, filter, results }) => (
    <>
        <input value={filter} onChange={onChange} />
        {filter && results.map(m => <p key={m.name}>{m.name} {m.number}</p>)}
    </>
);

export default Filter