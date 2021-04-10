
export function filterCatID(objList, ID) {
    var objsFound = [];
    var i;
    for (i = 0; i < objList.length; i++) {
        if (objList[i].categoryID === ID) {
            objFound.push(objList[i]);
        }
    }
    return (
        objsFound
    );
}