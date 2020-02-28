import React, {useState, useEffect} from "react";

//API
import accountsDB from "../../api/accounts";
import currencyLayer from "../../api/currencyLayer"
//Dependencies
import { Doughnut, Pie, Bar } from 'react-chartjs-2';
//Components
import SectionHeader from "../../components/main-content/header-text/HeaderText";
import ContentContainer from "../../components/main-content/content-container/ContentContainer"
import ActionNav from "../../components/BankApp/account-action-menu/AccountActionMenu"


export const Statistics = () =>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    let jws = user.jwt;
    const [data, setData] = useState(null);
    const [accounts, setAccounts] = useState({
        accounts: []
    })
    const [view, setView] = useState("Doughnut");
    const [exchangeRate, setExchangeRate] = useState(null)


    let getAccountsData = async () =>{
        let response = await accountsDB.get(`?owner=${user.email}`, {
            headers: {
              jws: jws
            }
          });
        response = response.data;

        //We must filter the response
        //Depending on whether we need credit or debit
        let accountsToUse = [];
        for (const a of response) {
            a.type === "debit" && accountsToUse.push(a)
        }

        let accountNames = [];
        let accountBalances = [];
        for (const a of accountsToUse) {
            accountNames.push(a.name);
            if(a.currency === "CRC"){
               // a.balance = Math.round(a.balance / 568)
                a.balance = Math.round(a.balance / exchangeRate);
            }
            accountBalances.push(a.balance)
        }
        setAccounts({
            accounts: response,
            accountNames: accountNames,
            accountBalances: accountBalances
        })
    }

    //callback to send
    let viewDetails = (accountNumber) =>{
        window.location.href = `/AccountDetails?account=${accountNumber}`;
     }

    let getCurrencyExchangeRate = async () =>{
        let response = await currencyLayer.get();
        setExchangeRate(Math.round(response.data.quotes.USDCRC))
    }

    useEffect(() =>{
        getCurrencyExchangeRate();
    }, [])

    useEffect(() =>{

        exchangeRate !== null &&
            getAccountsData();
     
    }, [exchangeRate])

    useEffect(() => {

        accounts !== null &&
            setData({
                labels: accounts.accountNames,
                datasets: [{
                    data: accounts.accountBalances,
                    label: "",
                    backgroundColor: [
                    '#78e08f',
                    '#f6b93b',
                    '#4a69bd',
                    '#e55039',
                    '#60a3bc',
                    "#7d5fff"
                    ],
                    hoverBackgroundColor: [
                    '#38ada9',
                    '#fa983a',
                    '#1e3799',
                    '#eb2f06',
                    '#3c6382',
                    "#7158e2"
                    ]
                }],
                options:{
                            legend: {
                            display: true,
                            position: 'top',
                            labels:{
                                fontSize: 14,
                                },
                            
                            },
                        }
                
               

            })

    }, [accounts])

    let toggleView = (view) =>{
        setView(view);
    }


    let getView = () =>{
        
        switch (true){
            case view === "Doughnut":
                return (  
                    <Doughnut data={data}
                            options={data.options} />
                );
                case view === "Pie":
                    return (  
                        <Pie data={data}
                            options={data.options}
                        />
                    );
                case view === "Bar":
                    return (  
                        <Bar data={data}
                            options={{
                                legend: {
                                    display: false,
                                    position: 'top'
                                        }
                            }} />
                    );

            default:
                return (<div></div>)
        }

    }

    return(
        <ContentContainer>
            <SectionHeader>Statistics</SectionHeader>
             <ActionNav
                callback={toggleView}
                redirects={[
                    {
                        title: "Doughnut",
                        value: "Doughnut",
                    },
                    {
                        title: "Pie",
                        value: "Pie",
                    },
                    {
                        title: "Bar",
                        value: "Bar",
                    },
                  
                ]}
                view = {view}
            >
            </ActionNav>

            <ContentContainer className="simple-container">
                {data !== null &&
                    <div>
                        <h1>Overall Balance (USD)</h1>
                        {getView()}
                    </div>
                }
            </ContentContainer>
             
        </ContentContainer>
           
        )
}

export default Statistics;