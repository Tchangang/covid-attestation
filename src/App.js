import logo from './logo.svg';
import './App.css';
import PdfViewerData from "./Components/PDF/PdfViewer";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import getDateAndHour from "./helpers/getDateAndHour";
import PdfViewer from "./Components/PDF/PdfViewer";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
      <Home />
        {/*<PDFDownloadLink document={PdfViewerData} fileName="boris_et_cynthia">Download</PDFDownloadLink>*/}
        {/*<PdfViewerData*/}
        {/*    people={*/}
        {/*        [*/}
        {/*            {*/}
        {/*                firstname: 'Boris-Emmanuel',*/}
        {/*                lastname: 'Tchangang',*/}
        {/*                birthDate: '17/04/1992',*/}
        {/*                birthPlace: 'Yaoundé',*/}
        {/*                address: '57 rue Gabriel Péri',*/}
        {/*                postalCode: '33110',*/}
        {/*                city: 'Le bouscat',*/}
        {/*                date: getDateAndHour().date,*/}
        {/*                hour: getDateAndHour().hour,*/}
        {/*                motif: 'missions',*/}
        {/*            },*/}
        {/*            {*/}
        {/*                firstname: 'Cynthia',*/}
        {/*                lastname: 'Cazeres',*/}
        {/*                birthDate: '16/05/1991',*/}
        {/*                birthPlace: 'Ivry sur seine',*/}
        {/*                address: '57 rue Gabriel Péri',*/}
        {/*                postalCode: '33110',*/}
        {/*                city: 'Le bouscat',*/}
        {/*                date: getDateAndHour().date,*/}
        {/*                hour: getDateAndHour().hour,*/}
        {/*                motif: 'sport_animaux',*/}
        {/*            }*/}
        {/*        ]*/}
        {/*    }*/}
        {/*/>*/}
        {/*<PDFViewer style={{ width: '100%', height: window.innerHeight}}>*/}
        {/*    {PdfViewerData({*/}
        {/*        firstname: 'Boris-Emmanuel',*/}
        {/*        lastname: 'Tchangang',*/}
        {/*        birthDate: '17/04/1992',*/}
        {/*        birthPlace: 'Yaoundé',*/}
        {/*        address: '57 rue Gabriel Péri',*/}
        {/*        postalCode: '33110',*/}
        {/*        city: 'Le bouscat',*/}
        {/*        date: '1232',*/}
        {/*        hour: '12324',*/}
        {/*    })}*/}
        {/*</PDFViewer>*/}
    </div>
  );
}

export default App;
