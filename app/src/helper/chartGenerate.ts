import randomColor from 'randomcolor';

const generateChart = (xAxis, yAxis, breakdown, queryRes, previousRes):object => {
    let valMap: Map<string, object> = new Map();

    //If any value empty then set that to first value
    if(xAxis === '' && queryRes.length > 0) {
      xAxis = Object.entries(queryRes[0])[0][0];
    } 
    
    if(yAxis === '' && queryRes.length > 0) {
      yAxis = Object.entries(queryRes[0])[0][0];
    }

    if(breakdown === '' && queryRes.length > 0) {
      breakdown = Object.entries(queryRes[0])[0][0];
    }
    
    for(let i = 0; i < queryRes.length; i++) {
        if(!valMap.has(queryRes[i][xAxis])) {
          let valObj: object = {};
          valObj[queryRes[i][breakdown]] = queryRes[i][yAxis];
          valMap.set(queryRes[i][xAxis], valObj);
        } else {
          let obj: object = valMap.get(queryRes[i][xAxis])!;
          if(obj![queryRes[i][breakdown]]) {
            obj![queryRes[i][breakdown]] += queryRes[i][yAxis];
          } else {
            obj[queryRes[i][breakdown]] = queryRes[i][yAxis];
          }
          valMap.set(queryRes[i][xAxis], obj!);
        }
    }

    let data : Array<number> = ([...Array(valMap.size).fill(0)]);
    let labelsData: Array<any> = [];
    let iter: number = 0;
    let dataMap: Map<string, Array<any>> = new Map();
    for(const [key, value] of valMap.entries()) {
      labelsData.push(key);
      for(const x in value) {
        if(!dataMap.has(x)) {
          let tempData = [...data];
          tempData[iter] = value[x];
          dataMap.set(x, tempData);
        } else {
          let addData = dataMap.get(x);
          addData![iter] = value[x];
          dataMap.set(x, addData!);
        }
      }
      iter++;
    }

    const colors: Array<string> = randomColor({count: dataMap.size});
    let counter: number = 0;

    let dataSets: {label: string, data: Array<number>, fill: boolean, borderColor: string, backgroundColor: string}[] = [];
    for(const [x, y] of dataMap.entries()) {
      dataSets.push({
        label: `${breakdown} ${x}`,
        data: y,
        fill: false,
        borderColor: colors[counter],
        backgroundColor: colors[counter]
      })
      counter++;
    }

    return {
        labels: labelsData,
        datasets: dataSets
    }
}
export default generateChart;