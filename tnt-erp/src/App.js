import React from 'react';
import MaterialTable from 'material-table';
import './App.css';
import firebase  from "firebase";
function App() {

    var firebaseConfig = {
        apiKey: "AIzaSyARzNyqPUHJJu1Gevojuu_lUqhXSII-hM0",
        authDomain: "tnt-erp.firebaseapp.com",
       // databaseURL: "https://tnt-erp.firebaseio.com",
        projectId: "tnt-erp",
       // storageBucket: "tnt-erp.appspot.com",
       // messagingSenderId: "19946506813",
        appId: "1:19946506813:web:f0a0352de2690114a8b854"
    };
    // Initialize Firebase
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }

    const [data, setData] =React.useState([])
    React.useEffect(async () => {
        const fn = firebase.functions()
        fn.useFunctionsEmulator('http://localhost:5001')

        const fetchERPdatabase=  fn.httpsCallable("getERPdatabase")



        const erpData = await fetchERPdatabase()
        console.log(erpData.data)


        setData(erpData.data)
    },[])
    return (
        <div className="App">
            <MaterialTable
                columns={[


                ]}

                data={data
                }/>
        </div>
    );
}

export default App;
