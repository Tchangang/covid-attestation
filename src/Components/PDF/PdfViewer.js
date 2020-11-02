import React, { useEffect, useState } from "react";
import {  PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import shortid from 'shortid';
import QRCode from 'qrcode';
import motifs from '../../const/motifs';
import downloadSvg from '../../res/downloadIllustration.svg';
import generateQrCodeContent from "../../helpers/generateQrCodeContent";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        padding: 20,
        paddingLeft: 60,
        paddingRight: 60
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    section: {
        padding: 20
    },
    line: {
        margin: 0,
        paddingBottom: 6,
        flexDirection: 'column'
    },
    lineRow: {
        margin: 0,
        marginTop: 5,
        paddingBottom: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'flex-start'
    },
    lineInRow: {
        margin: 0,
        paddingBottom: 2,
        flexDirection: 'column'
    },
    text: {
        fontSize: 10,
        lineHeight: 1.5,
    },
    textMotif: {
        fontSize: 10,
        lineHeight: 1.5,
        paddingLeft: 15,
    },
    selected: {
        width: 16,
        fontSize: 13,
        textAlign: 'center'
    }
});


export default ({
    people,
                }) => {
    const [qrCodes, setQrCodes] = useState(null);
    useEffect(() => {
        const promises = [];
        people.forEach(peopleItem => promises.push(
            new Promise((resolve) => {
                QRCode.toDataURL(generateQrCodeContent(peopleItem), { type: "png", errorCorrectionLevel: 'H' })
                    .then((url) => {
                        resolve(url);
                    })
                    .catch((e) => {
                        resolve(null);
                    });
            })
        ));
        Promise.all(promises)
            .then((qrCodesResolved) => {
                setQrCodes(qrCodesResolved);
            })
            .catch((e) => {
                setQrCodes([]);
            });
        return () => {};
    }, [0]);
    if (!qrCodes) {
        return (
            <div>Génération des formulaires en cours</div>
        )
    } else {
        const documentData = (
            <Document>
                {
                    people.map((peopleItem, peopleIndex) => (
                        <Page size="A4" style={styles.page} key={shortid.generate()}>
                            <View style={styles.section}>
                                <Text style={styles.title}>ATTESTATION DE DÉPLACEMENT DÉROGATOIRE</Text>
                            </View>
                            <View style={styles.line}>
                                <Text style={styles.text}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;En application du décret n°2020-1310 du 29
                                    octobre 2020 prescrivant les mesures générales
                                    nécessaires</Text>
                                <Text style={styles.text}>pour faire face à l'épidémie de Covid19 dans le cadre de l'état d'urgence
                                    sanitaire</Text>
                            </View>
                            <View style={styles.line}>
                                <Text style={styles.text}>Je soussigné(e), </Text>
                            </View>
                            <View style={styles.line}>
                                <Text style={styles.text}>Mme/M.: {peopleItem.lastname} {peopleItem.firstname}</Text>
                            </View>
                            <View style={styles.line}>
                                <Text style={styles.text}>Né le: {peopleItem.birthDate} à {peopleItem.birthPlace} </Text>
                            </View>
                            <View style={styles.line}>
                                <Text style={styles.text}>Demeurant: {peopleItem.address}, {peopleItem.postalCode}, {peopleItem.city} </Text>
                            </View>
                            <View style={styles.line}>
                                <Text style={styles.text}>
                                    certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par le décret
                                </Text>
                                <Text style={styles.text}>
                                    n°2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à
                                </Text>
                                <Text style={styles.text}>
                                    l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire :
                                </Text>
                            </View>
                            {
                                Object.keys(motifs).map(motifKey => {
                                    return (
                                        <>
                                            <View style={styles.lineRow}>
                                                <View style={{borderWidth: 2, width: 20, height: 'auto'}}>
                                                    <Text key={shortid.generate()} style={styles.selected}>
                                                        {motifKey === peopleItem.motif ? 'X' : ' '}
                                                    </Text>
                                                </View>
                                                <View>
                                                    {motifs[motifKey].map(motifLine => (
                                                        <View style={styles.lineInRow}>
                                                            <Text key={shortid.generate()} style={styles.textMotif}>
                                                                {motifLine}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                        </>
                                    )
                                })
                            }
                            <View style={styles.lineRow}>
                                <View>
                                    <View style={styles.lineInRow}>
                                        <Text style={styles.text}>Fait à: {peopleItem.city}</Text>
                                    </View>
                                    <View style={styles.lineInRow}>
                                        <Text style={styles.text}>Le {peopleItem.date} à {peopleItem.hour}</Text>
                                    </View>
                                    <View style={styles.lineInRow}>
                                        <Text style={styles.text}>Signature</Text>
                                    </View>
                                </View>
                                {qrCodes[peopleIndex] ? (
                                    <View style={{ flexGrow: 1, paddingLeft: 200 }}>
                                        <Image src={qrCodes[peopleIndex]} style={{ width: 150 }}/>
                                    </View>
                                ) : null}
                            </View>
                        </Page>
                    ))
                }
            </Document>
        );
        return (
            <div style={{ flexDirection: 'column'}}>
                <div style={{ marginBottom: 40 }}>
                    <img src={downloadSvg} alt={"Telechargez votre attestation"} style={{ width: '30%', marginBottom: 10 }}/>
                </div>
                <PDFDownloadLink
                    document={documentData}
                    className={"download"}
                    fileName={`attestation-${new Date().getTime()}.pdf`}
                >
                    Téléchargez
                </PDFDownloadLink>
                <div style={{ textAlign: 'center', fontSize: 13, marginTop: 30 }}>
                    En cas de contrôle, vous aurez votre attestation valide.
                </div>
                <div style={{ fontSize: 13, marginTop: 20 }}>
                    <div>Ce générateur a été réalisé à partir du formulaire du gouvernement disponible <a href={"https://www.interieur.gouv.fr/Actualites/L-actu-du-Ministere/Attestations-de-deplacement"} target={"_blank"}>ici</a></div>
                    <div>Réalisé à Bordeaux ♥️ par Boris ☺️</div>
                    <div>Le code source est entièrement disponible ici</div>
                </div>
            </div>
        );
    }
};
