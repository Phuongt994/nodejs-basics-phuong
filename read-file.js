'use strict';

const fs = require('fs');
const formatDistance = require('date-fns/formatDistance');
const format = require('date-fns/format');
const xlsx = require('xlsx');

const main = () => {
  const products = [];
  try {
    // Task 1
    const productJSON = fs.readFileSync('./common/products.json', 'utf8');
    const productParsed = JSON.parse(productJSON);

    for (let product in productParsed) {
      products.push(productParsed[product]);
    }

    countElem(products);
    convertDateUpdated(products);

  } catch (err) {
    console.log(err);
  }
};


const countElem = (products) => {
  console.log(`Product count is: ${products.length}`);
};

const convertDateUpdated = (products) => {
  products.forEach(val => {
    val.dateUpdated = new Date(val.dateUpdated);
  });

  printTemplate(products);
};

const printTemplate = (products) => {
  products.forEach(val => {
    const name = val.name;
    const price = val.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const fromNow = formatDistance(val.dateUpdated, new Date());
    console.log(`${name} – ${price}VND – Cập nhật cách đây: ${fromNow}`);
  });
  modifyDateField(products);
};

const modifyDateField = (products) => {
  products.forEach(val => {
    val.updated = format(val.dateUpdated, 'MM/dd/yyyy'); // add field 'Updated' to array
    delete val.dateUpdated;
  });

  convertWorksheet(products);
};

const convertWorksheet = (products) => {
  const prodWs = xlsx.utils.json_to_sheet(products);
  // **Taken from sheet: Optional: config columns width (character length)
    prodWs['!cols'] = [{ width: 20 }, { width: 15 }, { width: 20 }, { width: 20 }, { width: 20 }];

    const prodWb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(prodWb, prodWs, 'Products');

    const buf = xlsx.write(prodWb, { type: 'buffer', bookType: 'xlsx' });

    writeToHardDrive(buf)
};

const writeToHardDrive = (buf) => {
    fs.writeFile('products.xlsx', buf, err => {
        console.log('Write success');
      });
}

main();