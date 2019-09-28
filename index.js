//import data from './data';
var data = require('./data');

function addCancerInfoToPatients(patients, metadata) {
    for(var patient in patients) {
        patients[patient].metadata = metadata[patients[patient].patient];
    }
}

function getSumOfMutationsForEachPatient(patients) {
    var result = [];
    //console.log("getSumOfMutationsForEachPatient", patients);

    for(var patient in patients) {
        var totalMutations = 0;
        var patientMutations = patients[patient];

        for(var mutation in patientMutations) {
            totalMutations += patientMutations[mutation];
        }

        result.push({
            patient: patient,
            mutations: totalMutations           
        })
    }    

    return result;
};

function sortDescending(patients) {
    return patients.sort(function(a, b) { 
        //console.log("sorting", a, b);
        return b.mutations - a.mutations; 
    });
}

function sortAscending(patients) {
    return patients.sort(function(a, b) { 
        //console.log("sorting", a, b);
        return a.mutations - b.mutations; 
    });
}

function getPatientsWithCancer(metadata) {
    var patientsWithCancer = 0;

    for(var key in metadata) {
        if(metadata[key] == 'cancer') patientsWithCancer ++;
    }

    return patientsWithCancer;
}

function getPatientsWithControl(metadata) {
    var patientsWithControl = 0;

    for(var key in metadata) {
        if(metadata[key] == 'control') patientsWithControl ++;
    }

    return patientsWithControl;
}

function getNoOfPatientsWithCancer(patients) {
    var result = 0;
    
    patients.forEach(patient => {
        if(patient.metadata == 'cancer') result ++;
    });

    return result;
}

function getNoOfPatientsWithControl(patients) {
    var result = 0;
    
    patients.forEach(patient => {
        if(patient.metadata == 'control') result ++;
    });

    return result;
}

function calculateSensitivity(patients, metadata) {
    addCancerInfoToPatients(patients, metadata);
    sortDescending(patients);

    var noOfPatientsWithCancer = getPatientsWithCancer(data.data.metadata);

    var subSetPatients = patients.slice(0, noOfPatientsWithCancer);
    var noOfCancerPatientFromSubset = getNoOfPatientsWithCancer(subSetPatients);

    return noOfCancerPatientFromSubset/noOfPatientsWithCancer;
}

function calculateSpecificity(patients, metadata) {
    addCancerInfoToPatients(patients, metadata);
    sortAscending(patients);

    var noOfPatientsWithControl = getPatientsWithControl(metadata);
    var subSetPatients = patients.slice(0, noOfPatientsWithControl);

    var noOfControlPatientsFromSubset = getNoOfPatientsWithControl(subSetPatients);
    
    return noOfControlPatientsFromSubset/(1-noOfPatientsWithControl);
}

//console.log("data", data.data);


var myPatients = getSumOfMutationsForEachPatient(data.data.mutations);

var sensitivity = calculateSensitivity(myPatients.slice(0), data.data.metadata);
var specificity = calculateSpecificity(myPatients.slice(0), data.data.metadata);

console.log("sensitivity", sensitivity);
console.log("specificity", specificity);

//console.log("myPatients",myPatients);

//console.log("patientsWithCancer", patientsWithCancer);
//console.log("myPatientsSorted", myPatients);
//console.log("sumOfMutations", myPatients);

