const generateChart = (xAxis, yAxis, breakdown, queryRes):object => {
    let valMap: Map<string, object> = new Map();

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
      console.log(queryRes[i][xAxis])
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
    
    let dataSets: {label: string, data: Array<number>, fill: boolean, backGroundColor: string}[] = [];
    for(const [x, y] of dataMap.entries()) {
      dataSets.push({
        label: `${breakdown} ${x}`,
        data: y,
        fill: true,
        backGroundColor: "rgba(75,192,192,0.2)"
      })
    }

    return {
        labels: labelsData,
        datasets: dataSets
    }
}
export default generateChart;