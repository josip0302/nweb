import React from 'react';
import crypto from "crypto-js";

export default function SensitiveDataExposure(){
   // const PORT = process.env.PORT
   const inputRefN = React.useRef("");
   const inputRefL = React.useRef("");
   const [unableSDE,setUnableSDE]=React.useState(false);
   const [unableSee,setUnableSee]=React.useState(false);
   const [items, setItems] = React.useState([]);
    
   const [set,setSet]=React.useState(true);

   React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    localStorage.setItem('items', JSON.stringify(items));
    console.log(items)
    if (items && set) {
        setSet(false);
     setItems(items);
    }
  }, [set]);
     
   
    function  setSDE(){
        setUnableSDE(unableSDE => !unableSDE)
    }
    function  setSee(){
        setUnableSee(unableSee => !unableSee)
    }
   

    const handleClick = () => {
       
        if(inputRefN.current.value && inputRefL.current.value){
        let str =unableSDE? crypto.SHA256(inputRefN.current.value+','+inputRefL.current.value).toString():inputRefN.current.value+','+inputRefL.current.value;
       
       
        if(!items.includes(str)){
        setItems( [...items, str] );
        
        localStorage.setItem('items', JSON.stringify( [...items, str]));
        }
       
    }
   
    }

    return(
        <>
      <h1> Nesigurna pohrana osjetljivih podataka</h1>
      <p><b>Upute:</b> Unesite bilo koje korisničko ime i lozinku koji se onda pohranjauju u localStorage, čiji sadržaj možete provjeriti ako kliknete checkbox prikaži pohranjene podatke, ako je omogućena Nesigurna pohrana tekst se pohranjuje u 
      plain text obliku, a inače se pohranjuje kriptirano SHA-256 enkripcijom, ja sam shvatio da je bitno da je najbitniji dio enkriptirana pohrana pa sam najjednostavije prikazao istu.</p>
      <label>
        <input type="checkbox" onClick={setSDE} value={unableSDE} />
       Onemogući Nesigurna pohrana osjetljivih podataka
      </label>
      <br></br>
      <br></br>
      <label>
       Korisničko ime:
        </label>
        <input type="text"  ref={inputRefN} ></input>
        <br></br>
        <br></br>
        <label>
       Lozinka:
        </label>
        <input type="text"  ref={inputRefL} ></input>
        <br></br>
        <br></br>
        <button onClick={handleClick} >Pohrani Korisničko ime i lozinku</button>     
        <label>
        <br></br>
        <br></br>
        <input type="checkbox" onClick={setSee} value={unableSee} />
      Pokaži pohranjene podatke
      </label>
      {unableSee&&<ul>
        {items.map(item => {
          return <li key={item}>{item}</li>;
        })}
      </ul>}
      </>
      
     
    )

}