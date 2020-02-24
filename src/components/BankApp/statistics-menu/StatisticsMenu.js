import React, {useState, useEffect} from "react"

//Dependencies
import { Line } from 'react-chartjs-2';

//Components
import ContentContainer from "../../main-content/content-container/ContentContainer"
//Libs
import benri from "../../../libs/benri"


export const StatisticMenu = (props) =>{

    const [currentMonth, setCurrentMonth] = useState(null);

    useEffect(() =>{

    
        console.log("*********** Statistics ************")

        let date = new Date();
        let firstDayOfTheMonth =  new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDayOfTheMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let currentMonthMovements = props.movements.filter(function (m) {
            let date =  benri.getDateFromLocaleString(m.date)
            return (date >= firstDayOfTheMonth && date <= lastDayOfTheMonth);
        });
        console.log(currentMonthMovements);

        let currentMonthMovementsDates = []
        let currentMonthIncome = []
        let currentMonthExpenditure = []
        for (const movement of currentMonthMovements) {
            //Format date
            let date = benri.getDateFromLocaleString(movement.date)
            date.toLocaleString()
            //Set data
            currentMonthMovementsDates.push(movement.date)
            props.account && movement.destination === props.account.accountNumber
                ? currentMonthIncome.push(movement.amount) && currentMonthExpenditure.push(0)
                : currentMonthExpenditure.push(movement.amount) && currentMonthIncome.push(0)
        }
       setCurrentMonth({
           movements: currentMonthMovements,
           dates: currentMonthMovementsDates,
           income: currentMonthIncome,
           expenditure: currentMonthExpenditure
       });
  

    }, [])


    switch(true) {
        case currentMonth !== null:
            return(
                <ContentContainer className="simple-container">
                    <h1 className="simple-container__title">Statistics</h1>
                    <Line
                        data={{
                            labels: currentMonth.dates,
                            datasets: [
                            {
                                label: `Expenditure  (${props.account.currency})`,
                                data: currentMonth.expenditure,
                                backgroundColor: "rgba(255, 107, 129,0.3)",
                                borderColor: "rgba(255, 107, 129,1.0)",
                                borderWidth: 1,

                            }, 
                            {
                                label: `Incomes  (${props.account.currency})`,
                                data: currentMonth.income,
                                backgroundColor: "rgba(46, 204, 113,0.3)",
                                borderColor: "rgba(46, 204, 113,1.0)",
                                borderWidth: 0,
                                

                            },
                            
                            ]
                        }}
                        options={{
                            title: {
                            display: true,
                            text: `Monthly Movement`,
                            fontSize: 20
                            },
                            legend: {
                            display: false,
                            position: 'top'
                            },
                            labels:{
                                display: false
                            }
                        }}
                    >
                    </Line>
                    
                </ContentContainer>
            )
        

        default:
            return(
                <ContentContainer className="simple-container">
                    <h1 className="simple-container__title">{"Statistics"}</h1>
                </ContentContainer>
            )
      }

  
}

/********************
 * Component
 * 
 ********************/
export default StatisticMenu;