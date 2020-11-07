import React, {useState, useEffect} from 'react';
import shortid from 'shortid';
import motifs from "../../const/motifs";
import getDateAndHour, {addZeropadding} from "../../helpers/getDateAndHour";
import PdfViewer from "../PDF/PdfViewer";

const StepIndication = ({
    title,
    current,
    total,
                        }) => (
    <div className="stepIndication">
        <span>{current} / {total}</span>
        {title}
    </div>
)
const PeopleSelect = ({
                          people,
    checked,
    onChange,
                      }) => (
    <div className={`peopleItemInList ${checked ? 'checked' : ''}`} onClick={() => onChange(people)}>
        {/*<input type={"checkbox"} checked={checked} onChange={() => {}}/>*/}
        {/*<div className={"peopleNameSelectorItem"}>*/}
            <div className={"name"}>{people.firstname} {people.lastname}</div>
            <div className={"address"}>{people.address}</div>
        {/*</div>*/}
    </div>
)
const PageButton = ({
    next,
    back,
}) => (
    <div className={"peopleSelectorButton"}>
        {(back && (<button className="maj blackInv" onClick={() => back()} style={{ marginRight: 10 }}>Précédent</button>)) || null}
        {(next && (<button className="maj next" onClick={() => next()} style={{ marginLeft: 10 }}>Suivant</button>)) || null}
    </div>
)
const MotifSelector = ({
    motifKey,
    content,
   onChange,
    checked,
}) => (
    <div className={`motifSelectorItem ${checked ? 'checked' : ''}`} role="presentation" onClick={() => onChange(motifKey)}>
        <input type="radio" name="motif" value={motifKey} onChange={() => {}} checked={checked} hidden />
        <div>{content}</div>
    </div>
)
const MinuteValue = ({
    value,
    selected,
}) => {
    const minuteValue = `${value < 10 ? '0' : ''}${value}`;
    return (
        <option value={minuteValue} selected={minuteValue === selected}>{minuteValue}</option>
    );
}
const HourValue = ({
                         value,
                         selected,
                     }) => {
    const hourValue = `${value < 10 ? '0' : ''}${value}`;
    return (
        <option value={hourValue} selected={hourValue === selected}>{hourValue}</option>
    );
}

export default ({
    people,
    onCancel,
    preData,
}) => {
    const [attestationData, setAttestationData] = useState({ people: [], peopleId: [], motif: null, hour: addZeropadding(new Date().getHours()), minute: addZeropadding(new Date().getMinutes()) });
    const [step, setStep] = useState('pickPeople');
    useEffect(() => {
        console.log('preData', preData);
        if (preData && preData.firstname && preData.lastname) {
            const [found] = people.filter(peopleItem => peopleItem.firstname.toLowerCase()
                === preData.firstname.toLowerCase()
                && peopleItem.lastname.toLowerCase() === preData.lastname.toLowerCase());
            if (found) {
                setAttestationData({
                    ...attestationData,
                    people: [found],
                    peopleId: [found.id],
                    motif: preData.motif,
                });
                setTimeout(() => {
                    navigate.createPdf();
                }, 400);
            }
        }
    }, [preData]);
    const navigate = {
        pickPeople: () => setStep('pickPeople'),
        selectMotif: () => setStep('selectMotif'),
        selectHour: () => setStep('selectHour'),
        createPdf: () => setStep('createPdf'),
    };
    const handlePeopleChange = (people) => {
        console.log('people changed', people);
        const localData = { ...attestationData };
        if (localData.peopleId.includes(people.id)) {
            localData.people = localData.people.filter(peopleSelected => peopleSelected.id !== people.id);
            localData.peopleId = localData.peopleId.filter(peopleSelectedId => peopleSelectedId !== people.id);
        } else {
            localData.peopleId.push(people.id);
            localData.people.push(people);
        }
        setAttestationData({
            ...localData,
        });
    }
    const handleNext = () => {
      switch (step) {
          case 'pickPeople':
              navigate.selectMotif();
              break;
          case 'selectMotif':
              navigate.selectHour();
              break;
          case 'selectHour':
              navigate.createPdf();
              break;
          default:
              break;
      }
    }
    const handleBack = () => {
        switch (step) {
            case 'pickPeople':
                onCancel();
                break;
            case 'selectMotif':
                navigate.pickPeople();
                break;
            case 'selectHour':
                navigate.selectMotif();
                break;
            default:
                break;
        }
    }
    const handleMotifChange = (motifSelected) => {
        setAttestationData({
            ...attestationData,
            motif: motifSelected,
        });
    }
    const handleTime = (type, value) => {
        if (type === 'hour') {
            setAttestationData({
                ...attestationData,
                hour: value,
            });
        } else {
            setAttestationData({
                ...attestationData,
                minute: value,
            });
        }
    }
    const renderStep = () => {
        switch (step) {
            case 'pickPeople':
                return (
                    <div className="newAttestationPart">
                        <StepIndication current={1} title={'Pour qui ?'} total={3} />
                        <div className={"peopleSelectorContainer"}>
                            {people.map(peopleItem => (
                                <PeopleSelect
                                    key={shortid.generate()}
                                    people={peopleItem}
                                    onChange={handlePeopleChange}
                                    checked={attestationData.peopleId.includes(peopleItem.id)}
                                />
                            ))}
                        </div>
                        <PageButton
                            next={(attestationData.peopleId.length > 0 && handleNext) || undefined}
                            back={handleBack}
                        />
                    </div>
                );
            case 'selectMotif':
                return (
                    <div className="newAttestationPart">
                        <StepIndication current={2} title={'Motif'} total={3} />
                        <div className={"motifSelector"}>
                            {
                                Object.keys(motifs).map(motifKey => (
                                    <MotifSelector
                                        key={shortid.generate()}
                                        motifKey={motifKey}
                                        content={motifs[motifKey].join(' ')}
                                        onChange={handleMotifChange}
                                        checked={attestationData.motif === motifKey}
                                    />
                                ))
                            }
                        </div>
                        <PageButton
                            next={((attestationData.motif || '').length > 0 && handleNext) || undefined}
                            back={handleBack}
                        />
                    </div>
                );
            case 'selectHour':
                return (
                    <div className="newAttestationPart">
                        <StepIndication current={3} title={'Heure prévue de la sortie'} total={3} />
                        <div className={"horaireContainer"}>
                            <select
                                onChange={(e) => {
                                    handleTime('hour', e.target.value);
                                }}
                            >
                                {(Array.apply(null, Array(24))).map((value, hourItem) => (
                                    <HourValue value={hourItem} selected={attestationData.hour} />
                                ))}
                            </select>
                            <select
                                onChange={(e) => {
                                    handleTime('time', e.target.value);
                                }}
                            >
                                {(Array.apply(null, Array(60))).map((minuteItem, minuteValue) => (
                                    <MinuteValue value={minuteValue} selected={attestationData.minute}/>
                                ))}
                            </select>
                        </div>
                        <PageButton
                            next={((attestationData.motif || '').length > 0 && handleNext) || undefined}
                            back={handleBack}
                        />
                    </div>
                );
            case 'createPdf':
                return (
                    <PdfViewer people={attestationData.people.map(peopleItem => ({
                        ...peopleItem,
                        date: getDateAndHour().date,
                        hour: `${attestationData.hour}:${attestationData.minute}`,
                        motif: attestationData.motif,
                    }))} />
                );
            default:
                return (
                    <div>
                        OOPS !
                    </div>
                );
        }
    }
    return (
        <div className={"newAttestationContainer"}>
            {renderStep()}
        </div>
    );
}