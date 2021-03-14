import React from 'react';

function TableItem({item, chooseItems, choosenItems}) {
    return (
        <tr style={{
            background: choosenItems.find(el => el === item.id) ? 'grey' : ''
        }}>
            <td><input
                type="checkbox"
                checked={!!choosenItems.find(el => el === item.id)}
                onChange={(e) => chooseItems(item.id, e.target.checked)}/></td>
            <td>{item.id}</td>
            <td>{item.product}</td>
            <td>{item.calories}</td>
            <td>{item.fat}</td>
            <td>{item.carbs}</td>
            <td>{item.protein}</td>
            <td>{item.iron}</td>
        </tr>
    );
}

export default TableItem;
