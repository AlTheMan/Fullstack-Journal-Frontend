// ListGroupGeneric.tsx
import React, { useState } from 'react';

interface Props<T> {
    items: T[];
    getKey: (item: T) => string;
    getLabel: (item: T) => string;
    onSelectItem: (item: T) => void;
}



function ListGroupGeneric<T>({ items, getKey, getLabel, onSelectItem }: Props<T>) {

    const [selectedIndex, setSelectedIndex]= useState<string | null>(null);


    return (
        <ul>
            {items.map((item) => (
                <li key={getKey(item)} onClick={() => {onSelectItem(item); setSelectedIndex(getKey(item));}
                    
                }
                className={getKey(item)===selectedIndex? 'list-group-item active': 'list-group-item'}
                >
                    
                    {getLabel(item)}
                </li>
            ))}
        </ul>
    );
}

export default ListGroupGeneric;
