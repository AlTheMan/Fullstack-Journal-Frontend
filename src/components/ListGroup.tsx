
import {MouseEvent} from "react";
import { useState } from "react";

//{items:  [], heading, string}
interface Props{
    items: string[];
    heading: string; 
    onSelectItem: (item:string) => void; 
}

function ListGroup({items, heading, onSelectItem}: Props){
  
    //let selectedIndex=-1;
    //Hook 
    const [selectedIndex, setSelectedIndex]= useState(-1);
    //const [name, setName] = useState('');

    const getMessage= ()=>{
        return items.length===0 ? <p> no item found </p>: null;
    }

    //event: MouseEvent är type annotation, man anger vilken typ eventet är.
    //event handler
    //const handleClick = (event: MouseEvent) => console.log('clicked ' + item + ' ' + index );
    const handleClick2 = (event: MouseEvent) => console.log(event);


    return(
        <><h1> {heading}</h1>
            {items.length===0 ? <p> no item found </p>: null}
            {items.length===0 && <p> no item found </p>}
            <ul class="list-group">
            {items.map((item, index) =>
                <li className={selectedIndex===index ? 'list-group-item active': 'list-group-item'} //alt. bara  list-group-item active
                    key={item}
                    onClick={()=> {
                        setSelectedIndex(index);
                        onSelectItem(item);
                    }}
                >
                    {item}
                </li>)
            }
            </ul>
        </>
    );
}
export default ListGroup;