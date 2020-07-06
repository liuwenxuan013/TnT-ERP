import React from 'react';
import MaterialTable from 'material-table';
import './App.css';
import firebase  from "firebase";


function App() {
    var firebaseConfig = {
        apiKey: "AIzaSyARzNyqPUHJJu1Gevojuu_lUqhXSII-hM0",
        authDomain: "tnt-erp.firebaseapp.com",
       // databaseURL: "https://tnt-erp.firebaseio.com",
        projectId: "dictionary",
       // storageBucket: "tnt-erp.appspot.com",
       // messagingSenderId: "19946506813",
        appId: "1:19946506813:web:f0a0352de2690114a8b854"
    };
    const cors = require('cors')({origin: true});
    // Initialize Firebase
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }

    const fn = firebase.functions();
    fn.useFunctionsEmulator('http://localhost:5001')
    const fetchERPdatabase = fn.httpsCallable("getERPdatabase")
    const updateRecord = fn.httpsCallable("updateRecord")
    const [data, setData] =React.useState([])
    const updateTable= (async()=>{
    const erpData = await fetchERPdatabase()
    setData(erpData.data)
})

    React.useEffect(() => {
updateTable()
    },[])

            return (
        <div className="App">
            <MaterialTable
                title="Data review"
                columns={[
                    { title: 'Id', field: 'id' },
                    { title: 'Term', field: 'term' },
                    { title: 'Definition', field: 'def' },
                    {title:'Addition',field:'addition'}
                ]}
                data={data}
                editable={
                    {onRowUpdate:async (newState,preState)=>{
                        await updateRecord(newState)
                        console.log(preState,'\n',newState);
                        return updateTable();


                    }


                    }
                }
            />
        </div>
    );
}

export default App;
