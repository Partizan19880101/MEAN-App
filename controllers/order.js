const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')
const { query } = require('express')

//(get) localhost:5000/api/order?offset=2&limit=5
module.exports.getAll = async function(req, res) {
const query = {
    user: req.user.id
}
//Дата старта
    if (req.query.start) {
        query.date = {
            $gte: req.query.start //Больше или равно
        }
    }
    if (req.query.end) {
        if (!query.date) {
            query.date = {}
        }
        query.date['$lte'] = req.query.end   //меньше или
    }

    if (req.query.order) {
        query.order = +req.query.order
    }

    try {
        const orders = await Order
        .find(query)
        .sort({date: -1})  // Соритируем заказы в порядке убывания
        .skip(+req.query.offset)  // Скролл пагинации заказов на странице
        .limit(+req.query.limit)  //+ это мы привели к числу

        res.status(200).json(orders)

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
 try {
    const lastOder = await Order
    .findOne({uder: req.user.id})
    .sort({date: -1})  //заказы располагались в порядке убывания - мы получили последний заказ

    const maxOrder = lastOder ? lastOder.order : 0 //если нет последнего значения, возвращаем 0

    const order = await new Order({
        list: req.body.list,
        user: req.user.id,
        order: maxOrder + 1
    }).save()

    res.status(201).json(order)
 } catch (e){
    errorHandler(res, e)
 }
}

