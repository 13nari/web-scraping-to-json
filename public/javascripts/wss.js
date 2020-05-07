//WEB  SCRAPING SERVICE USING NODEJS

const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

request({
    method: 'GET',
    url: 'http://www.guiatrabalhista.com.br/guia/salario_minimo.htm',
    headers: {
        "Content-Type": "text/html; charset=UTF-8",

    }

    

}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);
    var jsons = []
    var json



    $('tr').each(function (i, e) {

        var $td = $(this).find('td')

        json = {

            vigencia: $td.eq(0).text().replace(/\s\s+/g, ''),
            valor_mensal: $td.eq(1).text().replace(/\s\s+/g, ''),
            valor_diario: $td.eq(2).text().replace(/\s\s+/g, ''),
            valor_hora: $td.eq(3).text().replace(/\s\s+/g, ''),
            norma_legal: $td.eq(4).text().replace(/\s\s+/g, ''),
            
            dou: $td.eq(5).text().replace(/\s\s+/g, '')

        }
        jsons.push(json)

    });

    jsons.shift() //remove primeiro elemento da array
    jsons.length=23 //remove ultimos elementos especificando tamanho da array


    let aux1 = { "salarios": jsons }
    let str = []
    str = JSON.stringify(aux1).replace(/Provis�ria/g,'Provisória')

    fs.writeFile('webScraping.json', str, (err) => {
        if (err) throw err
        console.log('Data written to file')
    })


})