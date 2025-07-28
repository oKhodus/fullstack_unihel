export const Name = (props) => 
<div>{props.name} {props.num} <button onClick={() => 
props.onDel(props.id, props.name)}>DELETE</button>
</div>

export const Filter = (props) => 
<div>filter shown with <input onChange={props.on} /></div>


export const PersonForm = (props) => {
  return(
    <form onSubmit={props.add}>
        <div>
          name: <input value={props.v1} onChange={props.on1}/>
        </div>
        <div>
          number: <input value={props.v2} onChange={props.on2}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export const Persons = (props) => <div>{props.fil.map(person => 
<Name key={person.id} name={person.name} num={person.number} id={person.id} onDel={props.on}/>) }</div>
