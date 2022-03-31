import React, {useEffect} from "react";
import '../css/adminStyle.css';
import AdminHome from "./AdminHome";
import SetMintingPrice from "./SetMintingPrice";
import {Route, Routes} from "react-router-dom";
import OwnerMinting from "./OwnerMinting";
import TokenSharing from "./TokenGiveAway";
import ReservedUsers from "./ReservedUsers";
import { loadBlockchain } from '../store/asyncActions';
import { useStore } from '../context/GlobalState';
function AdminDashboard(){

    const logout = () => {
        window.localStorage.removeItem("admin_login");
    }
    
    const [{accounts}, dispatch] = useStore();
    useEffect(async()=>{
        await loadBlockchain(dispatch);
    },[accounts[0]]);

      
    return(
        <div className="container-fluid" >
                <div className="row min-vh-100 flex-column flex-md-row admin-nav">
                        <aside className="col-sm-4" style={{backgroundColor:'#383838'}} >
                            <nav id="sidebar" className="navbar navbar-expand-lg navbar-dark flex-md-column align-items-start py-2" role= "navigation" style={{backgroundColor:'#383838'}} >
                
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="flex-md-column  navbar-nav w-100 justify-content-between">
                                        <li className="nav-item">
                                            <h2 className="nav-link  text-nowrap" style={{fontWeight:'bold',color:'#2f89fc'}}>Admin Dashboard</h2>
                                        </li>
                                        
                                        <br/>
                                    
                                        <li className="nav-item" key = {1}>
                                            <a href="/admin" className="nav-link" style={{fontWeight:'bold'}}>Dashboard</a> 
                                        </li>
                                        <li className="nav-item" key = {2}>
                                            <a href="/admin/setMintingPrice" className="nav-link" style={{fontWeight:'bold'}}>Set Minting Price</a> 
                                        </li>
                                        <li className="nav-item" key = {3}>
                                            <a href="/admin/reservedUsers" className="nav-link" style={{fontWeight:'bold'}}>Whitelisting</a> 
                                        </li>
                                        <li className="nav-item" key = {4}>
                                            <a href="/admin/ownerMinting" className="nav-link" style={{fontWeight:'bold'}}>Owner Minting</a> 
                                        </li>
                                        <li className="nav-item" key = {5}>
                                            <a href="/admin/tokenGiveAway" className="nav-link" style={{fontWeight:'bold'}}>Token GiveAway</a> 
                                        </li>
                                        <li className="nav-item" key = {6}>
                                            <a href="/admin" className="nav-link" style={{fontWeight:'bold'}} onClick={logout}>Logout</a> 
                                        </li>
                                        
                                    </ul>
                                </div>
                            </nav>
                        </aside >

                    <main class="col-md-8 py-3 flex-grow-1 admin-form">
                        <div className="row navbar navbar-expand-lg navbar-dark" style={{marginTop:"-1.5%",backgroundColor:'#383838'}}>
                            <div className="col-md-12">
                                <br/><br/><br/>
                                    {/* <br/>
                                    <img src={logo} width="150px" height="100px" style={{marginTop:'-1.5%',marginLeft:'-4%'}}></img> */}
                            </div>
                        </div>  

                        <div id="content" className="col-md-12">
                            <br/>
                            <div className="container contain">
                            <Routes>
                                <Route path="/" element={<AdminHome/>}></Route>
                                <Route path="/setMintingPrice" element={<SetMintingPrice/>}></Route>
                                <Route path="/ownerMinting" element={<OwnerMinting/>}></Route>
                                <Route path="/tokenGiveAway" element={<TokenSharing/>}></Route>
                                <Route path="/reservedUsers" element={<ReservedUsers/>}></Route>
                            </Routes> 
                            </div>
                        </div>
                    </main>
                </div>
        </div>
    );
}

export default AdminDashboard;