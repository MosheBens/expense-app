import { useState } from "react"
import { useAddTransaction } from "../../hooks/useAddTransaction"
import { useGetTransactions } from "../../hooks/useGetTransactions"
import { useGetUserInfo } from "../../hooks/useGetUserInfo"

import { useRemoveTransaction } from "../../hooks/useRemoveTransaction"
import "./style.css"
import { signOut } from "firebase/auth"
import { auth } from "../../config/firebase-config"
// import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export const ExpenseTracker  = () =>{
    const { removeTransaction } = useRemoveTransaction();

    const { addTransaction } = useAddTransaction();
    const { transactions ,transactionTotals} = useGetTransactions();
    const {name, profilePhoto} = useGetUserInfo();
    const navigate = useNavigate();


    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(""); // If Have Problem Replace "" To 0
    const [transactionType, setTransactionType] = useState("expense");

    const {balance,income,expenses} = transactionTotals;

    const onSubmit = async (e) =>{
        e.preventDefault();
        addTransaction({
            description,
            transactionAmount,
            transactionType,
        });

        setTransactionAmount("");
        setDescription("");
    };
    

    const remove = async (e,docSpesId) => {
        // e.preventDefault();
        removeTransaction({
            CurrentUidSpec:docSpesId,

        });
    };


    const signUserOut = async () => {
        try{
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch(err){
            console.error(err);
        }
  
    };


    return (
    <>   
        <div className="expense-track">
            <div className="container mt-4" style={{marginLeft:"10%"}}>
                <h1> {name}'s Expense Track</h1>
                <div className="balance">
                    <h3> Your Balance</h3>
                    {balance >= 0 ? (
                        <h2> ${balance} </h2>) : <h2> -${balance * -1} </h2>
                    }
                    
                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p>${income}</p>
                        </div>
                        <div className="expenses">
                            <h4>Expenses</h4>
                            <p>${expenses}</p>
                        </div>
                    </div>
                </div>
                <form className="add-transaction" onSubmit={onSubmit}>
                    <input type="text" placeholder="Descripsion" value={description} required   onChange={(e) => setDescription(e.target.value)} />
                    <input type="number" placeholder="Amount"  value={transactionAmount} required  onChange={(e) => setTransactionAmount(e.target.value)}  />

                    <br></br>
                    <input type="radio" id="expense" value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)}  />
                    <label htmlFor="expense"> Expense</label>
                    <br></br>
                    <input type="radio" id="income" value="income"  checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)}  />
                    <label htmlFor="income"> Income</label>
                    <br></br><br></br>
                    <button type="submit" style={{backgroundColor:"gold",borderRadius:"20px",fontSize:"30px",marginLeft:"auto"}}> Add Transaction</button>
                </form>
            </div>
            {profilePhoto &&  (
            <div className="profile"> 
                <img className="profile-photo" src={profilePhoto} alt="advda"/>
                <button className="sign-out-button" onClick={signUserOut}>
                    Sign Out
                </button>
            </div>
            )}
        </div>
        
        <div className="transactions">
            <h3>Transaction</h3>
            <ul>
                {transactions?.map((transaction,i) => {

                    const {description, transactionAmount, transactionType} = transaction;

                    return (  
                            
                            <li key={i}>
                                <h4> {description} </h4>

                                <p style={{fontSize:"20px"}}> 
                                
                                    ${transactionAmount} • <label style={{color:transactionType === "expense" ? "red" : "green"}}> {transactionType}</label>
                                    <button style={{marginLeft:"20px", background:"red",color:"white",borderRadius:"15px"}} onClick={event => remove(event, transaction.id)}> Delete</button>

                                </p>
                            </li>
                          );
                })}
            </ul>
        </div>
    </>     
    );
};
