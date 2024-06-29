const {google} = require("googleapis");

//const spreadsheetId = "1mswf8rjHW7OfCOZjGQgPODPzLydeLTfMtDFnMrppF-s";
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
})
const ay="2024-25"; // set current academic year by default.
async function setupSheets() {

    const client = await auth.getClient();
    const googlesheets = google.sheets({version: "v4", auth: client});
    // console.log(googlesheets);
    return googlesheets;
}

function convertToJson(arrayobj) {
    let jsonObj = [];
    // here the first row of the arrayobj is always headernames. We extract the order from it and then use the
    // names to fill in the data with the fieldname.
    let headerarray = arrayobj[0];
    let restelem = arrayobj.splice(1);
    restelem.forEach(value => {
       var item = {};
       for (var index = 0; index < headerarray.length; index++) {
           item[headerarray[index].toLowerCase()] = value[index];
       }
       jsonObj.push(item);
    });
    return jsonObj;
}

export async function readSheet(sheetId, range) {
    const sheets = await setupSheets();
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range
    });
    //return response.data.values;
    return convertToJson(response.data.values);
}

