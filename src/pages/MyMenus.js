import React from "react";
import PropTypes from "prop-types";

 function MyMenu(props){
    return(
        <div className="white-color">
            <h1>My Menus</h1>
            <div className="Json">
                <ul>
                    {props.jsonData.map((item) => {
                        return <li key={item.id}><input type ="checkbox"/>{item.id} - {item.title}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}
MyMenu.PropTypes ={
    jsonData: PropTypes.array
}
//объект со ключом = свойству
//определяем тип

export default MyMenu;