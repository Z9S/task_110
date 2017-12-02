'use strict';
const loadAllItems = require('../src/items');
const loadPromotions = require('../src/promotions');

function bestCharge (selectedItems) {
  let items = get_List(selectedItems);
  let total_Money = Get_Money (items);
  let get_half_price = Half_price_dishes (items);
  let printInfo =  Choose_bestCharge (total_Money, get_half_price, items);
  return printInfo;
}

//创建一个购买清单，记录顾客的购买信息
function get_List (selectedItems) {
  let items = [];
  let item = loadAllItems();

  for (let i = 0; i < selectedItems.length; i++) {
    for (let j = 0; j < item.length; j++) {
      if (item[j].id === selectedItems[i].substr(0, selectedItems[i].indexOf('x')-1)) {
        items[i] = item[j];
        items[i].num = parseInt(selectedItems[i].substr(selectedItems[i].indexOf('x')+2));
      }
    }
  }
  return items;
}

//计算订单应付金额
function Get_Money (items) {
  let total_Money = 0;

  for (let i = 0; i < items.length; i++) {
    total_Money += items[i].num * items[i].price;
  }
  console.log(total_Money);
  return parseInt(total_Money);
}

//判断订单中是否存在指定菜品半价
function Half_price_dishes (items) {
  let get_half_price = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i].id === 'ITEM0001' || items[i].id === 'ITEM0022') {
      get_half_price += items[i].price * items[i].num * 0.5;
    }
    else {
      get_half_price += items[i].price * items[i].num;
    }
  }
  return parseInt(get_half_price);
}

//选择出最合适的优惠方式，并输出打印结果
function Choose_bestCharge (total_Money, get_half_price, items) {
  let printInfo = '============= 订餐明细 =============\n';
  for (let i = 0; i < items.length; i++) {
    printInfo += items[i].name + ' x ' + items[i].num + ' = ' + parseInt(items[i].price * items[i].num) + "元\n";
  }
  printInfo += "-----------------------------------\n";
  if (total_Money === get_half_price) {
    if (total_Money < 30) {
      printInfo += "总计：" + total_Money + "元\n" +
      "===================================";
    }
    else {
      printInfo += "使用优惠:\n" +
        "满30减6元，省6元\n" +
        "-----------------------------------\n" +
        "总计：" + (total_Money-6) + "元\n" +
        "===================================";
    }
  }
  else {
    if ((total_Money >= 30 && total_Money-6 >= get_half_price) || total_Money < 30) {
      printInfo += "使用优惠:\n" + "指定菜品半价(";
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === 'ITEM0001')
          printInfo += "黄焖鸡，";
        if (items[i].id === 'ITEM0022')
          printInfo += "凉皮";
      }
      printInfo += ")，省" + (total_Money-get_half_price) + "元\n" +
        "-----------------------------------\n" +
        "总计：" + get_half_price + "元\n" +
        "===================================";
    }
    else {
      printInfo += "使用优惠:\n" +
        "满30减6元，省6元\n" +
        "-----------------------------------\n" +
        "总计：" + (total_Money-6) + "元\n" +
        "===================================";
    }
  }
  console.log(printInfo);
  return printInfo;
}


module.exports = bestCharge;
