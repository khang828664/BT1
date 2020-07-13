import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Pagging from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'
import 'animate.css'
import {connect} from 'react-redux'

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' }
]
const data = [{
  "url":"https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
  "name": "khang"
},
{
  "url":"https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
  "name": "khang"
},
{
  "url":"https://homepages.cae.wisc.edu/~ece533/images/boat.png",
  "name": "khang"
},
{
  "url":"https://homepages.cae.wisc.edu/~ece533/images/boat.png",
  "name": "khang"
}
]

function App () {

  const [isPop, setIsPop] = useState(false )
 
  const [currentPage, setCurrentPage] = useState(0)
  const [listData, setListData] = useState(data)
  const [getBy, setGetby] = useState(2)
  const [dataCurrent, setCurrentData] = useState([])
  const handleClose = () => setIsPop(false);
  useEffect(() => {
    pushCurrentPage(getBy)
  }, [currentPage])
  useEffect(() => {
    setUpFirstPage(getBy)
  }, [getBy])
  const pushCurrentPage = (getBy : any) => {
    let listItem : any = []     
    let startCut = getBy*currentPage
    let endCut =  (getBy*currentPage + getBy < listData.length ) ? getBy*currentPage + getBy : listData.length
    for (let index = startCut ; index < endCut ; index++ )
            {
              listItem.push(listData[index])
              console.log(listData[index])
            }
        setCurrentData(listItem)
    } 
  
  const setUpFirstPage = (getBy : any) => {
    let listItem : any = []
    for(let index = 0; index < getBy ; index++ )
    { 
      listItem.push(listData[index])
    }
     setCurrentData(listItem)
  }

  const RenderItemPagging = () => {
        let Active :number = currentPage
        let items : any = []
        let degree : number = parseInt((listData.length/getBy).toFixed(0))
    for (let index : number = 0 ; index  < degree+1 ;  index++ )
        {
        items.push(
            <PageItem key = {index} active ={index === Active} onClick = {()=> setCurrentPage(index)}>
                {index + 1}
            </PageItem>
        )
        }
    return(
     <Pagging>{items}</Pagging>
    )
  }
 const  renderItem =(listData : any []) =>  {
      return (
        listData.map((item : any , index:any )=> (
            
            <img  key = {index} src={item.url} alt ="image" style ={{height:"20em", width:"20em", margin:"20px"}}></img>
        ))
      )
  } 
  const checkCurrentPageAdd = (currentPage: number) => {
    let index = currentPage 
    if (index +1  >   parseInt((listData.length/getBy).toFixed(0))-1){
     return index
    
    }
    else {return index+1}
  }
  const checkCurrentPageMinus = (currentPage: number) => {
    let index = currentPage 
    if (index - 1 <  0) {
     return index
    
    }
    else {return index-1}
  }
  const renderItemSelect = (data: any[]) => {
    return (
        data.map(({item, index})=> (
          <>
         <option key = {index}>KHANG</option>
          </>
         ))
    )
  }
  return (
    <div className="App" > 
    <Button  variant ="primary" onClick = {()=> setIsPop(true)}>
      CLICK ME ! to popUp
    </Button>
      <Modal 
        show={isPop} onHide={handleClose} 
        animation={true}
        centered
        size ="lg"
        dialogClassName="animate__animated animate__slideInLeft"
        backdrop ="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Picture Silde</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className="div_main"> 
             <div style={{flexDirection:"row"}}>
               {renderItem(dataCurrent)}
             </div>
              <Pagging>
                <Pagging.Item onClick = {()=>setCurrentPage(checkCurrentPageMinus(currentPage))}>Next</Pagging.Item>
                 <RenderItemPagging/>
                <Pagging.Item onClick = {()=>setCurrentPage(checkCurrentPageAdd(currentPage))}>Pre</Pagging.Item>
              </Pagging>   
             </div>     
              
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
const mapStatetoProp = (state :any ) => {
    getBy :  state.getBy
    currentPage  : state.currentPage

} 
export default connect (App) {
  mapStatetoProp
}