import express from "express";
import {orderRevanueByDate, orderRevanueByMonth, orderRevanueByWeek, orderRevenueBy7Days, orderRevenueByQuarter, productRevenue} from "../controllers/statistic"
const routerStatistic = express.Router()

routerStatistic.get('/', productRevenue )
routerStatistic.get('/order/date', orderRevanueByDate )
routerStatistic.get('/order/month', orderRevanueByMonth )
routerStatistic.get('/order/week', orderRevenueBy7Days )
routerStatistic.get('/order/quarter', orderRevenueByQuarter )




// routerStatistic.get('/:id', get)
// routerStatistic.post('/add', create)
// routerStatistic.delete('/:id', remove)
// routerStatistic.patch('/:id', update)

export default routerStatistic