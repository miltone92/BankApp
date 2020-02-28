import axios from "axios"

export default axios.create({
    baseURL: "http://api.currencylayer.com/live?access_key=936effdd5bdda5e1ed275b7212e30edd&currencies=USD,CRC,&format=1"
});