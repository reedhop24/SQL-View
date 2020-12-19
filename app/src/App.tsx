import React, {useState, useEffect, useRef} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './App.css';
import LineChart from './components/charts/line';
import BarChart from './components/charts/bar';
import PieChart from './components/charts/pie';
import Options from './components/charOptions';
import Query from './components/query';
import TableSelect from './components/tableSelect';
import BreakDown from './components/breakdown';
import axios from 'axios';
import ModalUpload from './components/modalUpload';

function App() {
  const [currChart, setCurrChart] = useState(undefined);
  const [query, setQuery] = useState('');
  const [tableList, setTableList] = useState([]) as any;
  const tableRef = useRef([]) as any;
  const [currTable, setCurrTable] = useState('');
  const [queryRes, setQueryRes] = useState([]) as any;
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [breakdown, setBreakDown] = useState('');
  const [lineTestData, setLineTestData] = useState({});

  if(currTable === '' && tableRef.current.length === 1) {
    setCurrTable(tableRef.current[0]);
  }

  // I cannot access the HTML in the modal I am using in React so I have to access via the DOM
  useEffect(():void => {
    let curr = document.getElementById('upload') as HTMLInputElement;
    let save = document.getElementById('save') as HTMLButtonElement;
    save.addEventListener('click', () => {
      postFile(curr!.files![0]);
      curr.value = '';
    });
  }, []);

  const generateChartData = ():void => {
    let valMap: Map<string, object> = new Map();
    if(xAxis === '' && queryRes.length > 0) {
      setXAxis(Object.entries(queryRes[0])[0][0]);
    } 
    
    if(yAxis === '' && queryRes.length > 0) {
      setYAxis(Object.entries(queryRes[0])[0][0]);
    }

    if(breakdown === '' && queryRes.length > 0) {
      setBreakDown(Object.entries(queryRes[0])[0][0]);
    }

    console.log(breakdown, xAxis, yAxis);
    for(let i = 0; i < queryRes.length; i++) {
      if(!valMap.has(queryRes[i][xAxis])) {
        let valObj: object = {};
        valObj[queryRes[i][breakdown]] = queryRes[i][yAxis];
        valMap.set(queryRes[i][xAxis], valObj);
      } else {
        let obj: object = valMap.get(queryRes[i][xAxis])!;
        if(obj![queryRes[i][breakdown]]) {
          obj![queryRes[i][breakdown]] += queryRes[i][yAxis];
        }
        valMap.set(queryRes[i][xAxis], obj!);
      }
    }

    let data : Array<number> = ([...Array(valMap.size).fill(0)]);
    let labelsData: Array<any> = [];
    let iter: number = 0;
    let dataMap = new Map();
    for(const [key, value] of valMap.entries()) {
      labelsData.push(key);
      for(const x in value) {
        if(!dataMap.has(x)) {
          let tempData = [...data];
          tempData[iter] = value[x];
          dataMap.set(x, tempData);
        } else {
          let addData = dataMap.get(x);
          addData[iter] = value[x];
          dataMap.set(x, addData);
        }
      }
      iter++;
    }

    let dataSets: {label: string, data: Array<number>, fill: boolean, backGroundColor: string}[] = [];
    for(const [x, y] of dataMap.entries()) {
      dataSets.push({
        label: `${breakdown} ${x}`,
        data: y,
        fill: true,
        backGroundColor: "rgba(75,192,192,0.2)"
      })
    }

    setLineTestData({
      labels: labelsData,
      datasets: dataSets
    });
  }

  const postFile = (file):void => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:300/table', formData).then((postedTable) => {
      // setTableList([...tableList, postedTable.data.tableName]);
      tableRef.current.push(postedTable.data.tableName);
      setTableList([...tableList, postedTable.data.tableName]);
      // setCurrTable(postedTable.data.tableName);
    });
  }

  const postQuery = () => {
    const queryTable = query.split(' ').join('%20');

    axios.get(`http://localhost:300/tableData?table=${currTable}&query=${queryTable}`)
    .then((response) => {
      if(response.data.status === 'success') {
        setQueryRes(response.data.details);
        console.log(response.data.details);
      } else if(response.data.status === 'error') {
        alert(response.data.details.sqlMessage);
      }
    });
  }

  const charts: object = {
    'Line': <LineChart testData={lineTestData}/>,
    'Bar': <BarChart testData={lineTestData}/>,
    'Pie': <PieChart testData={lineTestData}/>
  }

  return (
    <Container className="App">
      <Row className="header">
        <Col>
            <h1>SQL View</h1>
            <a href="#file-modal" rel="modal:open"><i className='far fa-file icon'></i></a>
            <ModalUpload/>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <Container>
            <Row className="justify-content-md-center row">
              <Options changeChart={(x) => setCurrChart(x)} current={currChart}/>
              <TableSelect tableOptions={tableRef.current} selectTable={(selectedTable) => setCurrTable(selectedTable)} currentTable={currTable}/>
            </Row>
            <Row className="justify-content-md-center row" id="sql-container">
              <Query changeQuery={(x) => setQuery(x)} runQuery={() => postQuery()}/>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12}>
                <BreakDown breakdownVals={queryRes} xAxis={(x) => setXAxis(x)} yAxis={(y) => setYAxis(y)} breakD={(b) => setBreakDown(b)} createTable={() => generateChartData()}/>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="chart-container">
            {charts[currChart!]}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
