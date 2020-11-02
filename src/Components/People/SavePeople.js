import React, { useState, useEffect } from 'react';
import shortid from 'shortid';

export default ({
    firstname,
    lastname,
    birthDate,
    birthPlace,
    address,
    postalCode,
    city,
    id,
    onSave,
    onCancel,
}) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        firstname: firstname || '',
        lastname: lastname || '',
        birthDate: birthDate || '',
        birthPlace: birthPlace || '',
        address: address || '',
        postalCode: postalCode || '',
        city: city || '',
        id: id || shortid.generate(),
    });
    const set = (attribute, value) => {
        const localData = { ...data };
        localData[attribute] = value;
        setData(localData);
        if (error) {
            setError(null);
        }
    };
    const save = () => {
        // check data there
        console.log(data);
        if (!data.lastname) {
            setError('Entrez votre nom de famille');
            return;
        }
        if (!data.firstname) {
            setError('Entrez votre prénom');
            return;
        }
        if (!data.birthDate) {
            setError('Entrez votre date de naissance');
            return;
        }
        const birthDate = (data.birthDate.trim()).split('/');
        if (birthDate.length !== 3 || birthDate[0].length !== 2 || birthDate[1].length !== 2 || birthDate[2].length !== 4
            || !/^\d+$/.test(birthDate[0]) || !/^\d+$/.test(birthDate[1]) || !/^\d+$/.test(birthDate[2])) {
            setError('Votre date de naissance doit être au format DD/MM/YYYY. Pour le 10 Janvier 1980, entrez 10/01/1980');
            return;
        }
        if (!data.birthPlace) {
            setError('Entrez votre lieu de naissance');
            return;
        }
        if (!data.address) {
            setError('Entrez votre adresse de résidence');
            return;
        }
        if (!data.city) {
            setError('Entrez votre ville de résidence');
            return;
        }
        if (!data.postalCode) {
            setError('Entrez votre code postal de résidence');
            return;
        }
        onSave(data);
    }
    return (
        <div className={"formContainer"}>
            <div className={"formContainerTitle"}>
                Ajouter / Éditer un profil
            </div>
            <div className={"inputContainer"}>
                <label>Nom</label>
                <input type="text" value={data.lastname} onChange={(e) => set('lastname', e.target.value)} />
            </div>
            <div className={"inputContainer"}>
                <label>Prénom(s)</label>
                <input type="text" value={data.firstname} onChange={(e) => set('firstname', e.target.value)} />
            </div>
            <div className={"inputContainer"}>
                <label>Date de naissance</label>
                <input type="text"
                       value={data.birthDate}
                       onChange={(e) => set('birthDate', e.target.value)}
                       placeholder={"01/09/1970"}
                />
            </div>
            <div className={"inputContainer"}>
                <label>Lieu de naissance</label>
                <input type="text" value={data.birthPlace} onChange={(e) => set('birthPlace', e.target.value)} />
            </div>
            <div className={"inputContainer"}>
                <label>Adresse du domicile</label>
                <input type="text" value={data.address} onChange={(e) => set('address', e.target.value)} />
            </div>
            <div className={"inputContainer"}>
                <label>Ville</label>
                <input type="text" value={data.city} onChange={(e) => set('city', e.target.value)} />
            </div>
            <div className={"inputContainer"}>
                <label>Code postal</label>
                <input type="text" value={data.postalCode} onChange={(e) => set('postalCode', e.target.value)} />
            </div>
            {(error && (
                <div className={"error"}>
                    {error}
                </div>
            )) || null}
            <div style={{ marginTop: 20 }}>
                <button onClick={onCancel} className={"blackInv maj"} style={{ marginRight: 10 }}>
                    Annuler
                </button>
                <button className="black maj" onClick={save} style={{ marginLeft: 10 }}>
                    Sauvegarder
                </button>
            </div>
        </div>
    )
}