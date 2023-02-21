
export const Online = ():boolean => {
    return navigator.onLine
}

export const darVueltaArray = (data:object[]):object[] => {
    let retorno:object[] = []

    for(let i = 0; i < data.length; i++) {
        retorno.unshift(data[i])
    }

    return retorno
}