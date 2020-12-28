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
import generateChart from './helper/chartGenerate';

function App() {
  const [tableList, setTableList] = useState([]) as any;
  const tableRef = useRef([]) as any;
  const [queryRes, setQueryRes] = useState([]) as any;
  const [chartData, setchartData] = useState<object>({});
  const [currChart, setCurrChart] = useState<undefined>(undefined);
  const [query, setQuery] = useState<string>('');
  const [currTable, setCurrTable] = useState<string>('');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  const [breakdown, setBreakDown] = useState<string>('');

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
    setchartData((generateChart(xAxis, yAxis, breakdown, queryRes)));
  }

  const postFile = (file):void => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:300/table', formData).then((postedTable) => {
      tableRef.current.push(postedTable.data.tableName);
      setTableList([...tableList, postedTable.data.tableName]);
    });
  }

  const postQuery = ():void => {
    const queryTable = query.split(' ').join('%20');
    axios.get(`http://localhost:300/tableData?table=${currTable}&query=${queryTable}`)
    .then((response) => {
      if(response.data.status === 'success') {
        setQueryRes(response.data.details);
      } else if(response.data.status === 'error') {
        alert(response.data.details.sqlMessage);
      }
    });
  }

  const charts: object = {
    'Line': <LineChart testData={chartData}/>,
    'Bar': <BarChart testData={chartData}/>,
    'Pie': <PieChart testData={chartData}/>
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
