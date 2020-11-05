import React, { useState, useEffect } from 'react';
import apis from '../apis';
import SavePeople from "./People/SavePeople";
import PeopleList from "./People/PeopleList";
import NewAttestation from "./Attestation/NewAttestation";
import docIconSvg from '../res/document_illus.svg';
import motifs from "../const/motifs";

export default () => {
    const fetchPeople = () => {
        const list = apis.listPeople();
        setPeople(list);
        return list;
    }
    const [menu, setMenu] = useState({ nav: 'home', data: {} });
    const [preData, setPreData] = useState(null);
    const navigate = {
        home: () => setMenu({ nav: 'home', data: {} }),
        newPeople: () => setMenu({ nav: 'newPeople', data: {} }),
        editPeople: (people) => setMenu({ nav: 'editPeople', data: people }),
        deletePeople: (people) => setMenu({ nav: 'deletePeople', data: people }),
        newAttestation: () => setMenu({ nav: 'newAttestation', data: {} }),
    }
    const [people, setPeople] = useState([]);
    useEffect(() => {
        const localList = fetchPeople()
        const parsed = {};
        const query = (window.location.search || '').substr(1).split('&').map(item => {
            const [key, value] = item.split('=');
            switch (key) {
                case 'motif':
                    parsed['motif'] = value;
                    break;
                case 'firstname':
                    parsed['firstname'] = value;
                    break;
                case 'lastname':
                    parsed['lastname'] = value;
                    break;
                default:
                    break;
            }
        });
        console.log('query', query);
        console.log('parsed', parsed);
        console.log('localList', localList);
        if (parsed.motif && parsed.firstname && parsed.lastname && Object.keys(motifs).includes(parsed.motif)) {
            setPreData(parsed);
            navigate.newAttestation();
        }
    }, [0]);
    const renderApp = () => {
        switch (menu.nav) {
            case 'home':
                return (
                    <>
                        <img src={docIconSvg} alt={"Generateur covid 19"} style={{ width: '60%'}}/>
                        {people.length > 0 ? (
                            <div style={{ marginTop: 15 }}>
                                <button className={"maj black"} onClick={() => navigate.newAttestation()}>Nouvelle attestation</button>
                            </div>
                        ) : null}
                        <div style={{ marginTop: 10 }}><strong>Génère tes attestions en 3 clics</strong></div>
                        <div style={{ marginTop: 8, fontSize: 13, padding: '0px 60px', textAlign: 'center' }}>
                            Toutes tes données sont sauvegardées sur ton téléphone, même les pdfs sont créés sur ton tel.
                        </div>
                        <div style={{ marginTop: 25 }}>
                            <button className="maj blue" onClick={() => navigate.newPeople()}>Ajouter un profil</button>
                        </div>
                        {
                            people.length === 0 ? (
                                <div style={{ marginTop: 2, fontSize: 13, padding: '0px 60px', textAlign: 'center' }}>
                                    Commence par ajouter un profil pour générer tes attestations en quelques clics seulement !
                                </div>
                            ) : null
                        }
                        <PeopleList list={people} onEdit={(peopleToEdit) => {
                            navigate.editPeople(peopleToEdit);
                        }} onDelete={(peopleToDelete) => {
                            navigate.deletePeople(peopleToDelete);
                        }} />
                    </>
                );
            case 'newPeople':
                return (
                    <SavePeople
                        firstname={null}
                        lastname={null}
                        birthDate={null}
                        birthPlace={null}
                        address={null}
                        postalCode={null}
                        city={null}
                        id={null}
                        onSave={(peopleToSave) => {
                            apis.savePeople(peopleToSave);
                            fetchPeople();
                            navigate.home();
                        }}
                        onCancel={() => {
                            navigate.home();
                        }}
                    />
                );
            case 'editPeople':
                return (
                    <SavePeople
                        firstname={(menu.data && menu.data.firstname) || null}
                        lastname={(menu.data && menu.data.lastname) || null}
                        birthDate={(menu.data && menu.data.birthDate) || null}
                        birthPlace={(menu.data && menu.data.birthPlace) || null}
                        address={(menu.data && menu.data.address) || null}
                        postalCode={(menu.data && menu.data.postalCode) || null}
                        city={(menu.data && menu.data.city) || null}
                        id={(menu.data && menu.data.id) || null}
                        onSave={(peopleToSave) => {
                            apis.savePeople(peopleToSave);
                            fetchPeople();
                            navigate.home();
                        }}
                        onCancel={() => {
                            navigate.home();
                        }}
                    />
                );
            case 'deletePeople':
                return (
                    <div>Delete</div>
                );
            case 'newAttestation':
                return (
                    <NewAttestation
                        onCancel={() => {
                            alert('Cancel');
                        }}
                        people={people}
                        preData={preData}
                    />
                );
            default:
                return (
                    <div>404</div>
                );
        }
    }
    return (
        <div>
            <h1>Attestation Covid19</h1>
            {
                renderApp()
            }
        </div>
    )
}