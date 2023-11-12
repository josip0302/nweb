import React from 'react';

function XssBug() {
   
    const inputRef = React.useRef(null);
    const [word,setWord]=React.useState("")
    const [word2,setWord2]=React.useState("")
    const [unableXss,setUnableXss]=React.useState(false)
    const handleClick = () => {
      // Accessing the input field value
      //<div dangerouslySetInnerHTML={{"__html":  word2}}></div>
      
      if(unableXss){
        const str=inputRef.current.value;
       
        setWord("ispisujemo:"+str)
        setWord2("");
      }else{
       
        const str=inputRef.current.value;
        setWord2(str);
        setWord("")
      }
      //alert("helloworld");
      
    };
    function  setXSS(){
        setUnableXss(unableXss => !unableXss)
    }
   
    return(
        <>
      <h1>Xss ranjivost primjer</h1>
      <p><b>Upute:</b> Unesite dolje navedeni tekst za ranjivost i ako je xss omogućen izaći će alert, inače će se samo ispisati uneseni string jer react spriječava xss napad.</p>
      <label>
        <input type="checkbox" onClick={setXSS} value={unableXss} />
       Onemogući Xss
      </label>
      <br></br>
      <br></br>
     
      <label>
        Unesite tekst za ranjivost - na primjer : {`<img onerror='alert("Hakiranje uspjelo");' src='nevaljana slika' />`}
        </label>
        <br></br>
      <input id="in" ref={inputRef} type="text"/>
      <button onClick={handleClick} >Click me!</button>
      <br></br>
      <div dangerouslySetInnerHTML={{"__html":  word2}}></div>
      <p>{word}</p>
      </>
    )
  

}
export default XssBug;