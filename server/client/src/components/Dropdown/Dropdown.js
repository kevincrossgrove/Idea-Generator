import React, { useState, useRef, useEffect } from 'react';
import '../../css/Dropdown.css';

function Dropdown({items, title="Title", value, onChange}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const ref = useRef(null);

    useEffect(() => {
        ['click', 'touchend'].forEach(e => {
            document.addEventListener(e, toggle);
        });
        
        return () => ['click', 'touchend'].forEach(e => {
            document.removeEventListener(e, toggle);
        });
    }, []);

    function toggle(e) {
        setOpen(e && e.target === ref.current);
    }

    function filter(items) {
        return items.filter(
            (item) =>
            item.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    }

    function displayValue() {
        if (query.length > 0) return query
        if (value) return value;
        return "";
    }

    function selectOption(item) {
        setQuery('');
        onChange(item);
        setOpen(false);
    }

    return (
        <div className="dropdown">
            <div className="control">
                <div className="selected-value" >
                    <input
                    className="categoryInput"
                    type="text"
                    ref={ref}
                    placeholder={value ? value : title} 
                    value={displayValue()} 
                    onChange={e => {
                        setQuery(e.target.value);
                        onChange(null);
                    }}
                    onClick={toggle}
                    onTouchEnd={toggle}/>
                </div>
                <div className="arrow" className={`arrow ${open ? "open" : null}`}></div>
            </div>
            <div className={`options ${open ? "open" : null}`}>
                {filter(items).map((item, index) => 
                    <div 
                    key={index}
                    className={`option ${value === item ? "selected" : null}`}
                    onClick={() => selectOption(item)}
                    onTouchEnd={() => selectOption(item)}>
                        {item}
                    </div>)
                }
            </div>
        </div>
    )
}

export default Dropdown;
