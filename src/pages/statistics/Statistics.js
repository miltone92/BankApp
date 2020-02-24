import React, {useState, useEffect} from "react";

//API
import accountsDB from "../../api/accounts";
//Dependencies
import { Doughnut, Pie, Bar } from 'react-chartjs-2';

//Components
import SectionHeader from "../../components/main-content/header-text/HeaderText";
import ContentContainer from "../../components/main-content/content-container/ContentContainer"
import ActionNav from "../../components/BankApp/account-action-menu/AccountActionMenu"


export const Statistics = () =>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [data, setData] = useState(null);
    const [accounts, setAccounts] = useState({
        accounts: []
    })
    const [view, setView] = useState("Doughnut");

    let getAccountsData = async () =>{
        let response = await accountsDB.get(`?owner=${user.email}`);
        response = response.data;

        let accountTypes = [];
        let accountBalances = [];
        for (const a of response) {
            accountTypes.push(a.type);
            accountBalances.push(a.balance)
        }
        setAccounts({
            accounts: response,
            accountTypes: accountTypes,
            accountBalances: accountBalances
        })
    }

    //callback to send
    let viewDetails = (accountNumber) =>{
        window.location.href = `/AccountDetails?account=${accountNumber}`;
     }

    useEffect(() =>{
        console.log(user)
        // console.log(user.email)
        getAccountsData();
    }, [])

    useEffect(() => {

        accounts !== null &&
            setData({
                labels: accounts.accountTypes,
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
               

            })

    }, [accounts])

    let toggleView = (view) =>{
        setView(view);
    }


    let getView = () =>{
        
        switch (true){
            case view === "Doughnut":
                return (  
                    <Doughnut data={data} />
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
                        <h1>Overall Balance</h1>
                        {getView()}
                    </div>
                }
            </ContentContainer>
             
        </ContentContainer>
           
        )
}

export default Statistics;