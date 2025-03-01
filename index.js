const axios = require('axios');
const data = require('./data.json');
//untuk jadwal sholat gunakan bulan dengan 2 integer misal 8 harus 08
let provinsi = 0;
let setProvinsi=15; //jatim
let setKabupaten=6; //jember;
let sendData = new Array();
let setVerbose = false;
for(k in data){
  let idProvinsi = data[k]["ID"];
  let kabkot = 0; 
  for(l in data[k]["data"][0]){
    let idkabKot = data[k]["data"][0][l];
    if (provinsi === setProvinsi && kabkot === setKabupaten){
      sendData.push(idProvinsi);
      sendData.push(idkabKot);
      sendData.push('2025'); //tahun
    }
    if (setVerbose){
      console.log('================================================================')
      console.log('================> No Provinsi : ' +provinsi)
      console.log('================> Provinsi : '+k)
      console.log('================> ID : '+idProvinsi)
      console.log('================> No Kab/Kot : ' +kabkot)
      console.log('================> Kab/Kot : '+l)
      console.log('================> ID : '+idkabKot);
      console.log('================================================================')
    }
    kabkot++;
  }
  provinsi++;
}
//hapus salah satu
//getImsak()
getSholat()
async function getSholat(){
    const url = 'https://bimasislam.kemenag.go.id/jadwalshalat';
    const req = await axios.get(url);
    const entryCookie = req.headers['set-cookie'].join(' ');
    const epHeader = {
      "Accept" : "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding" : "gzip, deflate, br, zstd",
      "Accept-Language" : "en-US,en;q=0.9,en-GB;q=0.8",
      "Connection" : "keep-alive",
      "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
      "Host" : "bimasislam.kemenag.go.id",
      "Origin" : "https://bimasislam.kemenag.go.id",
      "Referer" : "https://bimasislam.kemenag.go.id/jadwalshalat",
      "Sec-Fetch-Dest" : "empty",
      "Sec-Fetch-Mode" : "cors",
      "Sec-Fetch-Site" : "same-origin",
      "User-Agent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/133.0.0.0",
      "X-Requested-With" : "X-Requested-With",
      "Cookie": entryCookie
  }
    const apiURL = 'https://bimasislam.kemenag.go.id/ajax/getShalatbln'
    console.log('data dari sholat')
    const sendApi = await axios.post(apiURL,{x:sendData[0],y:sendData[1],thn:sendData[2],bln:'08'},{headers:epHeader})
    console.log(sendApi.data);
}
async function getImsak(){
  const url = 'https://bimasislam.kemenag.go.id/jadwalimsakiyah';
  const req = await axios.get(url);
  const entryCookie = req.headers['set-cookie'].join(' ');
  const epHeader = {
    "Accept" : "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding" : "gzip, deflate, br, zstd",
    "Accept-Language" : "en-US,en;q=0.9,en-GB;q=0.8",
    "Connection" : "keep-alive",
    "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
    "Host" : "bimasislam.kemenag.go.id",
    "Origin" : "https://bimasislam.kemenag.go.id",
    "Referer" : "https://bimasislam.kemenag.go.id/jadwalimsakiyah",
    "Sec-Fetch-Dest" : "empty",
    "Sec-Fetch-Mode" : "cors",
    "Sec-Fetch-Site" : "same-origin",
    "User-Agent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/133.0.0.0",
    "X-Requested-With" : "X-Requested-With",
    "Cookie": entryCookie
}
  const apiURL = 'https://bimasislam.kemenag.go.id/ajax/getImsyakiyah'
  console.log('data dari imsak');
  const sendApi = await axios.post(apiURL,{x:sendData[0],y:sendData[1],thn:sendData[2]},{headers:epHeader})
  console.log(sendApi.data);
}


