import express from "express";
import {orderRevanueByDate, orderRevanueByMonth, productRevenue} from "../controllers/statistic"
const routerStatistic = express.Router()

routerStatistic.get('/', productRevenue )
routerStatistic.get('/order/date', orderRevanueByDate )
routerStatistic.get('/order/month', orderRevanueByMonth )


// routerStatistic.get('/:id', get)
// routerStatistic.post('/add', create)
// routerStatistic.delete('/:id', remove)
// routerStatistic.patch('/:id', update)

export default routerStatistic