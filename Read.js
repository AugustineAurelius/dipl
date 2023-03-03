const XLSX = require('xlsx')

const parse = (filename) => {
    const excelData = XLSX.readFile(filename);

    return Object.keys(excelData.Sheets).map((name) =>({
        data: XLSX.utils.sheet_to_json(excelData.Sheets[name])[0],
    }));
}


let str = []
let par = parse("./Rza.xlsx");
for (let i = 0; i< par.length ; i++ ){
    str.push(par[i]['Время/Дата']+ ' ' +par[i]['Виртуальное устройство'] + ' ' + par[i]['Описание'] + ' ' + par[i]['Значение'])
}
console.log(par)
//console.log(parse("./Rza.xlsx"))//[ { name: 'Лист1', data: [ [Object], [Object] ] } ]
//console.log (par[par.length-1])
//console.log(parse("./Rza.xlsx")[0]) 
/*{
    name: 'Лист1',
    data: [
      {
        'Время/Дата': '31,01,2023',
        'Виртуальное устройство': 'T1_AUV',
        'Описание': 'В110кВТ1/АУВ/Включение выключателя',
        'Значение': 'Ушло'
      },
      {
        'Время/Дата': '31,01,2023',
        'Виртуальное устройство': 'T1_AUV',
        'Описание': 'В110кВТ1/АУВ/Включение выключателя',
        'Значение': 'Пришло'
      }
    ]
  }*/

//console.log(parse("./Rza.xlsx")[0].data) 

/*console.log(parse("./Rza.xlsx")[0])*/
/*let par = parse("./Rza.xlsx")[0].data[0];
console.log(parse("./Rza.xlsx")[0].data.length)
str.push(par['Время/Дата']+ ' ' +par['Виртуальное устройство'] + ' ' + par['Описание'] + ' ' + par['Значение'])
console.log(str)
parse("./Rza.xlsx").forEach((eLement) => {
    console.log(eLement.data);
})*/


