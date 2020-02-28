
import React from "react";

//style
import "./Landing.scss"
//components
import SectionHeader from "../../components/main-content/header-text/HeaderText"
import Card from "../../components/cards/Cards/Card"

export const Landing = () =>{


    return(
        <div>
            <div className="landing-parallax">
                <div className="landing-header">
                    <h1> growBank </h1>
                </div>
            </div>
            <SectionHeader>Our Mission</SectionHeader>
            <div className="" style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                <Card 
                    src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    title="Create and Review Account"
                    info="Create and use accounts"
                    
                />
                <Card 
                    src=" https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                    title="Organized Data"
                    info="View your balances, movements and  more in ordered statistics"/>
                <Card
                    src="https://images.unsplash.com/photo-1430276084627-789fe55a6da0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80"
                    title="Safety"
                    info="Protect your savings with the best hands"
                />
                <Card
                    src="https://images.unsplash.com/photo-1550645612-83f5d594b671?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    title="Hands On Control"
                    info="Keeps track of your logs"
                />
                <Card/>
                <Card/>
            </div>
                   
        </div>
    )
}

export default Landing;